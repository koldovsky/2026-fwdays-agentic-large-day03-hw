# i18n Architecture

This document describes the internationalization (i18n) system as observed in the repository source code.
It covers the two-layer architecture (library + app), translation engine, language gating, Crowdin integration, and runtime behavior.

## System Overview

Excalidraw's i18n is split into two layers:

1. **Library layer** (`packages/excalidraw/`) -- translation engine, locale data, language filtering, and reactive hooks. Ships with the published `@excalidraw/excalidraw` package.
2. **App layer** (`excalidraw-app/app-language/`) -- browser language detection, localStorage persistence, and the language selector UI. Lives only in the host application.

Translation source-of-truth is managed externally via **Crowdin** (`crowdin.yml`). The English locale (`en.json`) is the Crowdin source file; all other locale JSON files are Crowdin translation outputs.

### Scale

- 59 locale JSON files in `packages/excalidraw/locales/`
- ~595 flattened translation keys (derived from `en.json` structure)
- Languages visible to users are gated by an 85% translation-completion threshold

## Core Components

### 1. Translation Engine (`packages/excalidraw/i18n.ts`)

#### `t()` function (line 127)

The primary translation API. Accepts a dot-notation key path, optional replacement map, and optional fallback string.

Resolution order (three-level fallback):
1. Current language data (`currentLangData`)
2. English fallback data (`fallbackLangData` -- statically imported from `en.json`)
3. Explicit `fallback` parameter

Key behaviors:
- Dot-notation paths are split and traversed through nested objects via `findPartsForData()`
- Variable substitution uses `{{key}}` syntax -- replaced with values from the `replacement` map
- In production (`import.meta.env.PROD`), missing keys log a warning and return `""` instead of throwing
- In development, missing keys throw an `Error`

#### `useI18n()` hook (line 169)

Returns `{ t, langCode }`. Re-renders consumers when language changes via the Jotai `editorLangCodeAtom`.

Use cases:
- Components rendered as `<Excalidraw>` children
- Memoized components that don't otherwise receive `langCode` or `AppState` updates

#### `setLanguage()` (line 92)

Async function that:
1. Sets `currentLang` module variable
2. Updates `document.documentElement.dir` (`"rtl"` or `"ltr"`)
3. Updates `document.documentElement.lang` to the locale code
4. Dynamically imports the locale JSON file (`./locales/${code}.json`)
5. On import failure, falls back to `fallbackLangData` (English)
6. Updates `editorLangCodeAtom` in the Jotai store, triggering re-renders

#### `languages[]` array (line 21)

Statically defined array of `{ code, label, rtl? }` objects. Filtered at **module load time** using:

```typescript
.filter(
  (lang) =>
    (percentages as Record<string, number>)[lang.code] >=
    COMPLETION_THRESHOLD,   // 85
)
.sort((left, right) => (left.label > right.label ? 1 : -1))
```

English (`defaultLang`) is prepended before filtering, so it always appears first regardless of percentage.

#### `COMPLETION_THRESHOLD` (line 9)

Constant value: `85`. A locale must have `>= 85%` of keys translated (non-empty) to appear in the language selector. The comparison is `>=`, not `>`.

### 2. Language Selector UI (`excalidraw-app/app-language/LanguageList.tsx`)

A `<select>` dropdown that:
- Renders each entry from the filtered `languages` array as an `<option>`
- Reads current language via `useI18n()` hook
- Writes new selection to `appLangCodeAtom` (app-level Jotai atom)
- Mounted in `excalidraw-app/components/AppMainMenu.tsx` as a custom menu item

### 3. Language Detection & Persistence (`excalidraw-app/app-language/`)

#### `language-detector.ts`

Uses `i18next-browser-languagedetector` library. Detection order:
1. **localStorage** (key: `i18nextLng`) -- cached user preference
2. **`navigator.language`** -- browser language setting
3. **Fallback** to `defaultLang` (`"en"`)

Partial matching: detected language `"de"` will match `"de-DE"` via `lang.code.startsWith(detectedLanguage)`.

#### `language-state.ts`

- `appLangCodeAtom`: Jotai atom initialized with `getPreferredLanguage()`
- `useAppLangCode()`: hook that returns `[langCode, setLangCode]` and caches the language to localStorage via `languageDetector.cacheUserLanguage(langCode)` on every change

### 4. Translation Coverage Scripts (`scripts/`)

#### `scripts/build-locales-coverage.js`

Generates `packages/excalidraw/locales/percentages.json`:
1. Reads all locale JSON files from the locales directory
2. Flattens nested JSON into flat key-value pairs
3. Counts non-empty string values as "translated"
4. Calculates: `Math.floor((100 * translatedKeys) / allKeys)`
5. Writes result as JSON

Run via: `yarn locales-coverage`

#### `scripts/locales-coverage-description.js`

Generates a markdown table of language coverage with:
- Flags, language names, completion percentages
- Links to Crowdin translation pages via `crowdinMap` (BCP 47 code -> Crowdin project code)
- Bold formatting for languages meeting the threshold

Run via: `yarn locales-coverage:description`

### 5. Trans Component (`packages/excalidraw/components/Trans.tsx`)

JSX-aware translation interpolation for complex markup. Supports:

- **Variable substitution**: `{{varName}}` replaced with prop values
- **Tag wrapping**: `<link>text</link>` where `link` prop is a `(el) => ReactNode` function
- **Nesting**: tags and variables can be combined

Uses a stack-based parser that splits translation strings on `{{key}}`, `<tag>`, `</tag>` patterns.

Example:
```jsx
<Trans
  i18nKey="encrypted.tooltip"
  link={(el) => <a href={url}>{el}</a>}
/>
```

### 6. InitializeApp (`packages/excalidraw/components/InitializeApp.tsx`)

Bridges the app-level `langCode` prop to the library-level `setLanguage()`:
1. Receives `langCode` as a prop from the host app
2. Finds matching `Language` object in `languages` array (or falls back to `defaultLang`)
3. Calls `await setLanguage(currentLang)` in a `useEffect`
4. Shows `<LoadingMessage>` until language is loaded

## Data Flow

```
User selects language in LanguageList
  |
  v
appLangCodeAtom updates (app Jotai store)
  |
  v
useAppLangCode() effect fires --> languageDetector.cacheUserLanguage()
  |                                 (persists to localStorage as i18nextLng)
  v
App.tsx reads langCode, passes to <Excalidraw langCode={langCode} />
  |
  v
InitializeApp.tsx useEffect triggers
  |
  v
setLanguage(currentLang) called:
  - Sets document.documentElement.dir (rtl/ltr)
  - Sets document.documentElement.lang
  - Dynamic import: ./locales/${code}.json
  - Updates editorLangCodeAtom (library Jotai store)
  |
  v
useI18n() consumers re-render
  |
  v
t() calls resolve against new currentLangData
```

## RTL Support

Three languages are flagged as RTL:
- `ar-SA` (Arabic)
- `fa-IR` (Persian)
- `he-IL` (Hebrew)

### DOM level

`setLanguage()` sets `document.documentElement.dir` to `"rtl"` or `"ltr"`.

### CSS level

25+ SCSS files use `:root[dir="rtl"] &` selectors for RTL-specific layout adjustments:
- `packages/excalidraw/css/styles.scss` -- dropdown background positioning, utility class `.rtl-mirror`
- `packages/excalidraw/components/Actions.scss` -- icon mirroring via `transform: scaleX(-1)`
- Component-specific files: `ColorPicker.scss`, `Sidebar.scss`, `LayerUI.scss`, `CommandPalette.scss`, etc.

The `.rtl-mirror` utility class (defined in `styles.scss`) applies `scaleX(-1)` under `:root[dir="rtl"]` for directional icons.

## Crowdin Integration

### Configuration (`crowdin.yml`)

```yaml
files:
  - source: /packages/excalidraw/locales/en.json
    translation: /packages/excalidraw/locales/%locale%.json
```

- **Source**: `en.json` is the single source file uploaded to Crowdin
- **Output**: Crowdin writes translations back as `%locale%.json` files (e.g., `fr-FR.json`, `pt-BR.json`)
- **Language codes**: BCP 47 format (e.g., `pt-BR`, `zh-CN`, `de-DE`)

### Crowdin-to-BCP 47 mapping

`scripts/locales-coverage-description.js` contains a `crowdinMap` that translates BCP 47 codes to Crowdin project language codes for generating direct links to translation pages (e.g., `"pt-BR"` -> `"en-ptbr"` -> `https://crowdin.com/translate/excalidraw/10/en-ptbr`).

## Translation Key Structure

Keys are organized as a nested JSON object in `en.json`. Top-level categories include:
- `labels` -- UI element labels (paste, copy, tools, properties)
- `buttons` -- button text and aria labels
- `toolBar` -- toolbar-specific labels
- `stats` -- statistics panel
- `toast` -- toast notification messages
- `errors` -- error messages
- `encrypted` -- encryption-related messages
- `roomDialog` -- collaboration room UI
- `library` -- library panel

The `t()` function navigates these using dot notation: `t("labels.paste")`, `t("buttons.selectLanguage")`.

## Locale File Conventions

Each locale file mirrors the exact nested structure of `en.json`:
- Empty string `""` means "not yet translated" (counted as missing by coverage script)
- Non-empty string means translated
- All keys from `en.json` are present in every locale file (Crowdin maintains structural parity)

## Hidden Invariants and Gotchas

1. **Static filtering**: The `languages` array is filtered at module load time. Changes to `percentages.json` require a rebuild/reload to take effect. There is no runtime reactivity to percentage changes.

2. **Test language**: In development mode (`isDevEnv()`), two test languages (`__test__` and `__test__.rtl`) are injected at the start of the `languages` array. These render all translation keys as `[[path.to.key]]` for visual verification of untranslated strings.

3. **Production error handling**: Missing translation keys in production log `console.warn()` and return `""`. In development, they throw an `Error` -- this makes untranslated keys immediately visible during development.

4. **`percentages.json` is a build artifact**: Generated by `scripts/build-locales-coverage.js`, not manually edited. Must be regenerated after Crowdin syncs new translations.

5. **No app-level locale overrides**: The excalidraw-app layer has no mechanism to add, modify, or override translations from the library. All translations come from `packages/excalidraw/locales/`.

6. **`>=` threshold comparison**: The filter uses `>=`, not `>`. A locale at exactly 85% passes the threshold.

7. **Partial language detection match**: `getPreferredLanguage()` uses `startsWith()`, so browser language `"pt"` would match `"pt-BR"` (whichever appears first in the filtered array). If neither Portuguese locale passes the threshold, the match fails and English is used.

8. **Module-level state**: `currentLang` and `currentLangData` are module-level variables (not React state or Jotai atoms). Only `editorLangCodeAtom` triggers React re-renders. The `t()` function reads from module state directly.

## Relevant Issue: excalidraw/excalidraw#10847

Both Portuguese locales (`pt-BR` and `pt-PT`) are at 84% translation coverage. The threshold is 85%. As a result:
- Locale files exist and contain functional translations
- Both locales are defined in the `languages` array with correct labels
- Both are filtered out before rendering in the language selector
- Users searching for Portuguese in the language dropdown will not find it

Possible resolutions:
1. **Complete translations** on Crowdin to reach >= 85%, then regenerate `percentages.json`
2. **Lower threshold** from 85 to 84 (affects all locales at 84%: `ar-SA`, `ca-ES`, `fa-IR`, `he-IL`, `id-ID`, `mr-IN`, `nb-NO`, `pt-BR`, `pt-PT`, `sl-SI`, `uk-UA`, `zh-TW`)
3. **Add an allowlist** for strategic locales that should appear regardless of threshold
