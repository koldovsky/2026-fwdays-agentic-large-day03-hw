This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.
The content has been processed where comments have been removed, empty lines have been removed, content has been compressed (code blocks are separated by ⋮---- delimiter).

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: packages/**/*.{ts,tsx,js}
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Empty lines have been removed from all files
- Content has been compressed - code blocks are separated by ⋮---- delimiter
- Long base64 data strings (e.g., data:image/png;base64,...) have been truncated to reduce token count
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
packages/
  common/
    src/
      appEventBus.test.ts
      appEventBus.ts
      binary-heap.ts
      bounds.ts
      colors.test.ts
      colors.ts
      constants.ts
      editorInterface.ts
      emitter.ts
      font-metadata.ts
      index.ts
      keys.ts
      points.ts
      promise-pool.ts
      queue.ts
      random.ts
      url.ts
      utility-types.ts
      utils.test.ts
      utils.ts
      versionedSnapshotStore.ts
    tests/
      keys.test.ts
      queue.test.ts
      url.test.tsx
    debug.ts
    global.d.ts
  element/
    src/
      __tests__/
        transform.test.ts
      arrows/
        focus.ts
        helpers.ts
      align.ts
      arrowheads.ts
      binding.ts
      bounds.ts
      collision.ts
      comparisons.ts
      containerCache.ts
      cropElement.ts
      delta.ts
      distance.ts
      distribute.ts
      dragElements.ts
      duplicate.ts
      elbowArrow.ts
      elementLink.ts
      embeddable.ts
      flowchart.ts
      fractionalIndex.ts
      frame.ts
      groups.ts
      heading.ts
      image.ts
      index.ts
      linearElementEditor.ts
      mutateElement.ts
      newElement.ts
      positionElementsOnGrid.ts
      renderElement.ts
      resizeElements.ts
      resizeTest.ts
      Scene.ts
      selection.ts
      shape.ts
      showSelectedShapeActions.ts
      sizeHelpers.ts
      sortElements.ts
      store.ts
      textElement.ts
      textMeasurements.ts
      textWrapping.ts
      transform.ts
      transformHandles.ts
      typeChecks.ts
      types.ts
      utils.ts
      visualdebug.ts
      zindex.ts
    tests/
      align.test.tsx
      binding.test.tsx
      bounds.test.ts
      collision.test.tsx
      cropElement.test.tsx
      delta.test.tsx
      distribute.test.tsx
      duplicate.test.tsx
      elbowArrow.test.tsx
      embeddable.test.ts
      flowchart.test.tsx
      fractionalIndex.test.ts
      frame.test.tsx
      linearElementEditor.test.tsx
      resize.test.tsx
      selection.test.ts
      sizeHelpers.test.ts
      sortElements.test.ts
      textElement.test.ts
      textWrapping.test.ts
      typeChecks.test.ts
      zindex.test.tsx
    global.d.ts
  excalidraw/
    actions/
      actionAddToLibrary.ts
      actionAlign.tsx
      actionBoundText.tsx
      actionCanvas.tsx
      actionClipboard.tsx
      actionCropEditor.tsx
      actionDeleteSelected.test.tsx
      actionDeleteSelected.tsx
      actionDistribute.tsx
      actionDuplicateSelection.test.tsx
      actionDuplicateSelection.tsx
      actionElementLink.ts
      actionElementLock.test.tsx
      actionElementLock.ts
      actionEmbeddable.ts
      actionExport.tsx
      actionFinalize.tsx
      actionFlip.test.tsx
      actionFlip.ts
      actionFrame.ts
      actionGroup.tsx
      actionHistory.tsx
      actionLinearEditor.tsx
      actionLink.tsx
      actionMenu.tsx
      actionNavigate.tsx
      actionProperties.test.tsx
      actionProperties.tsx
      actionSelectAll.ts
      actionStyles.ts
      actionTextAutoResize.ts
      actionToggleArrowBinding.tsx
      actionToggleGridMode.tsx
      actionToggleMidpointSnapping.tsx
      actionToggleObjectsSnapMode.tsx
      actionToggleSearchMenu.ts
      actionToggleShapeSwitch.tsx
      actionToggleStats.tsx
      actionToggleViewMode.tsx
      actionToggleZenMode.tsx
      actionZindex.tsx
      index.ts
      manager.tsx
      register.ts
      shortcuts.ts
      types.ts
    charts/
      charts.bar.ts
      charts.constants.ts
      charts.helpers.ts
      charts.line.ts
      charts.parse.ts
      charts.radar.ts
      charts.types.ts
      index.ts
    components/
      canvases/
        index.tsx
        InteractiveCanvas.tsx
        NewElementCanvas.tsx
        StaticCanvas.tsx
      ColorPicker/
        ColorInput.tsx
        ColorPicker.tsx
        colorPickerUtils.ts
        CustomColorList.tsx
        HotkeyLabel.tsx
        keyboardNavHandlers.ts
        Picker.tsx
        PickerColorList.tsx
        PickerHeading.tsx
        ShadeList.tsx
        TopPicks.tsx
      CommandPalette/
        CommandPalette.tsx
        defaultCommandPaletteItems.ts
        types.ts
      DiagramToCodePlugin/
        DiagramToCodePlugin.tsx
      dropdownMenu/
        common.ts
        DropdownMenu.test.tsx
        DropdownMenu.tsx
        DropdownMenuContent.tsx
        DropdownMenuGroup.tsx
        DropdownMenuItem.tsx
        DropdownMenuItemCheckbox.tsx
        DropdownMenuItemContent.tsx
        DropdownMenuItemContentRadio.tsx
        DropdownMenuItemCustom.tsx
        DropdownMenuItemLink.tsx
        DropdownMenuSeparator.tsx
        DropdownMenuSub.tsx
        DropdownMenuSubContent.tsx
        DropdownMenuSubTrigger.tsx
        DropdownMenuTrigger.tsx
        dropdownMenuUtils.ts
      FollowMode/
        FollowMode.tsx
      FontPicker/
        FontPicker.test.tsx
        FontPicker.tsx
        FontPickerList.tsx
        FontPickerTrigger.tsx
        keyboardNavHandlers.ts
      footer/
        Footer.tsx
        FooterCenter.tsx
      hoc/
        withInternalFallback.test.tsx
        withInternalFallback.tsx
      hyperlink/
        helpers.ts
        Hyperlink.tsx
      live-collaboration/
        LiveCollaborationTrigger.tsx
      main-menu/
        DefaultItems.tsx
        MainMenu.tsx
      OverwriteConfirm/
        OverwriteConfirm.tsx
        OverwriteConfirmActions.tsx
        OverwriteConfirmState.ts
      Sidebar/
        common.ts
        Sidebar.test.tsx
        Sidebar.tsx
        SidebarHeader.tsx
        SidebarTab.tsx
        SidebarTabs.tsx
        SidebarTabTrigger.tsx
        SidebarTabTriggers.tsx
        SidebarTrigger.tsx
        siderbar.test.helpers.tsx
      Stats/
        Angle.tsx
        CanvasGrid.tsx
        Collapsible.tsx
        Dimension.tsx
        DragInput.tsx
        FontSize.tsx
        index.tsx
        MultiAngle.tsx
        MultiDimension.tsx
        MultiFontSize.tsx
        MultiPosition.tsx
        Position.tsx
        stats.test.tsx
        utils.ts
      TTDDialog/
        Chat/
          ChatHistoryMenu.tsx
          ChatInterface.tsx
          ChatMessage.tsx
          index.ts
          TTDChatPanel.tsx
          useChatAgent.ts
        hooks/
          useChatManagement.ts
          useMermaidRenderer.ts
          useTextGeneration.ts
        utils/
          chat.test.ts
          chat.ts
          mermaidAutoFix.test.ts
          mermaidAutoFix.ts
          mermaidError.test.ts
          mermaidError.ts
          mermaidValidation.test.ts
          mermaidValidation.ts
          TTDstreamFetch.test.ts
          TTDStreamFetch.ts
        CodeMirrorEditor.tsx
        common.test.ts
        common.ts
        mermaid-lang-lite.ts
        MermaidToExcalidraw.tsx
        TextToDiagram.tsx
        TTDContext.tsx
        TTDDialog.tsx
        TTDDialogInput.tsx
        TTDDialogOutput.tsx
        TTDDialogPanel.tsx
        TTDDialogPanels.tsx
        TTDDialogSubmitShortcut.tsx
        TTDDialogTab.tsx
        TTDDialogTabs.tsx
        TTDDialogTabTrigger.tsx
        TTDDialogTabTriggers.tsx
        TTDDialogTrigger.tsx
        TTDPreviewPanel.tsx
        TTDWelcomeMessage.tsx
        types.ts
        useTTDChatStorage.ts
      welcome-screen/
        WelcomeScreen.Center.tsx
        WelcomeScreen.Hints.tsx
        WelcomeScreen.tsx
      Actions.tsx
      ActiveConfirmDialog.tsx
      App.tsx
      AppStateObserver.ts
      Avatar.tsx
      BraveMeasureTextError.tsx
      Button.tsx
      ButtonIcon.tsx
      ButtonIconCycle.tsx
      ButtonSeparator.tsx
      Card.tsx
      CheckboxItem.tsx
      ConfirmDialog.tsx
      ContextMenu.tsx
      ConvertElementTypePopup.tsx
      DarkModeToggle.tsx
      DefaultSidebar.test.tsx
      DefaultSidebar.tsx
      Dialog.tsx
      DialogActionButton.tsx
      ElementCanvasButtons.tsx
      ElementLinkDialog.tsx
      Ellipsify.tsx
      ErrorDialog.tsx
      ExcalidrawLogo.tsx
      EyeDropper.tsx
      FilledButton.tsx
      FixedSideContainer.tsx
      HandButton.tsx
      HelpButton.tsx
      HelpDialog.tsx
      HintViewer.tsx
      IconPicker.tsx
      icons.tsx
      ImageExportDialog.tsx
      InitializeApp.tsx
      InlineIcon.tsx
      Island.tsx
      JSONExportDialog.tsx
      LaserPointerButton.tsx
      LayerUI.tsx
      LibraryMenu.tsx
      LibraryMenuBrowseButton.tsx
      LibraryMenuControlButtons.tsx
      LibraryMenuHeaderContent.tsx
      LibraryMenuItems.tsx
      LibraryMenuSection.tsx
      LibraryUnit.tsx
      LinkButton.tsx
      LoadingMessage.tsx
      LockButton.tsx
      MagicButton.tsx
      MobileMenu.tsx
      MobileToolBar.tsx
      Modal.tsx
      Paragraph.tsx
      PasteChartDialog.tsx
      PenModeButton.tsx
      Popover.tsx
      ProjectName.tsx
      PropertiesPopover.tsx
      PublishLibrary.tsx
      QuickSearch.tsx
      RadioGroup.tsx
      RadioSelection.tsx
      Range.tsx
      ScrollableList.tsx
      SearchMenu.tsx
      Section.tsx
      shapes.tsx
      ShareableLinkDialog.tsx
      Spinner.tsx
      Stack.tsx
      SVGLayer.tsx
      Switch.tsx
      TextField.tsx
      Toast.tsx
      ToolButton.tsx
      ToolPopover.tsx
      Tooltip.tsx
      Trans.test.tsx
      Trans.tsx
      UnlockPopup.tsx
      UserList.tsx
    context/
      tunnels.ts
      ui-appState.ts
    data/
      ai/
        types.ts
      blob.ts
      EditorLocalStorage.ts
      encode.ts
      encryption.ts
      filesystem.ts
      image.ts
      index.ts
      json.ts
      library.test.ts
      library.ts
      reconcile.ts
      resave.ts
      restore.ts
      types.ts
    eraser/
      index.ts
    fonts/
      Cascadia/
        index.ts
      ComicShanns/
        index.ts
      Emoji/
        index.ts
      Excalifont/
        index.ts
      Helvetica/
        index.ts
      Liberation/
        index.ts
      Lilita/
        index.ts
      Nunito/
        index.ts
      Virgil/
        index.ts
      Xiaolai/
        index.ts
      ExcalidrawFontFace.ts
      Fonts.ts
      index.ts
    hooks/
      useAppStateValue.ts
      useCallbackRefState.ts
      useCopiedIndicator.ts
      useCreatePortalContainer.ts
      useEmitter.ts
      useLibraryItemSvg.ts
      useOutsideClick.ts
      useScrollPosition.ts
      useStable.ts
      useStableCallback.ts
      useTextEditorFocus.ts
      useTransition.ts
    lasso/
      index.ts
      utils.ts
    renderer/
      animation.ts
      helpers.ts
      interactiveScene.ts
      renderNewElementScene.ts
      renderSnaps.ts
      roundRect.ts
      staticScene.ts
      staticSvgScene.ts
    scene/
      export.ts
      index.ts
      normalize.ts
      Renderer.ts
      scroll.ts
      scrollbars.ts
      types.ts
      zoom.ts
    subset/
      harfbuzz/
        harfbuzz-bindings.ts
        harfbuzz-loader.ts
        harfbuzz-wasm.ts
      woff2/
        woff2-bindings.ts
        woff2-loader.ts
        woff2-wasm.ts
      subset-main.ts
      subset-shared.chunk.ts
      subset-worker.chunk.ts
    tests/
      data/
        reconcile.test.ts
        restore.test.ts
      fixtures/
        constants.ts
        diagramFixture.ts
        elementFixture.ts
      helpers/
        api.ts
        colorize.ts
        constants.ts
        mocks.ts
        polyfills.ts
        ui.ts
      packages/
        events.test.tsx
      queries/
        dom.ts
        toolQueries.ts
      scene/
        export.test.ts
      actionStyles.test.tsx
      App.test.tsx
      appState.test.tsx
      appStateHooks.test.tsx
      arrowBinding.test.tsx
      charts.test.tsx
      clients.test.ts
      clipboard.test.tsx
      colorInput.test.ts
      contextmenu.test.tsx
      dragCreate.test.tsx
      elementLocking.test.tsx
      excalidraw.test.tsx
      export.test.tsx
      fitToContent.test.tsx
      flip.test.tsx
      history.test.tsx
      image.test.tsx
      laser.test.tsx
      lasso.test.tsx
      library.test.tsx
      MermaidToExcalidraw.test.tsx
      move.test.tsx
      multiPointCreate.test.tsx
      regressionTests.test.tsx
      rotate.test.tsx
      scroll.test.tsx
      search.test.tsx
      selection.test.tsx
      shortcuts.test.tsx
      test-utils.ts
      tool.test.tsx
      viewMode.test.tsx
    wysiwyg/
      textWysiwyg.test.tsx
      textWysiwyg.tsx
    analytics.ts
    animated-trail.ts
    animation-frame-handler.ts
    appState.ts
    charts.test.ts
    clients.ts
    clipboard.test.ts
    clipboard.ts
    css.d.ts
    cursor.ts
    deburr.ts
    editor-jotai.ts
    errors.ts
    gesture.ts
    global.d.ts
    history.ts
    i18n.ts
    index-node.ts
    index.tsx
    laser-trails.ts
    mermaid.test.ts
    mermaid.ts
    polyfill.ts
    pwacompat.d.ts
    react-app-env.d.ts
    reactUtils.ts
    shortcut.ts
    snapping.ts
    textAutoResizeHandle.ts
    types.ts
    vite-env.d.ts
    workers.ts
  math/
    src/
      angle.ts
      constants.ts
      curve.ts
      ellipse.ts
      index.ts
      line.ts
      point.ts
      polygon.ts
      range.ts
      rectangle.ts
      segment.ts
      triangle.ts
      types.ts
      utils.ts
      vector.ts
    tests/
      curve.test.ts
      ellipse.test.ts
      line.test.ts
      point.test.ts
      range.test.ts
      segment.test.ts
      vector.test.ts
    global.d.ts
  utils/
    src/
      bbox.ts
      export.ts
      index.ts
      shape.ts
      test-utils.ts
      withinBounds.ts
    tests/
      export.test.ts
      geometry.test.ts
      utils.unmocked.test.ts
      withinBounds.test.ts
    global.d.ts
```

# Files

## File: packages/common/src/appEventBus.test.ts
```typescript
import { AppEventBus } from "./appEventBus";
type TestEvents = {
  initialize: [api: number];
  pointerUp: [pointerId: string];
  viewState: [zoom: number];
};
⋮----
const flushMicrotasks = async ()
```

## File: packages/common/src/appEventBus.ts
```typescript
import type { UnsubscribeCallback } from "@excalidraw/excalidraw/types";
import { Emitter } from "./emitter";
import { isProdEnv } from "./utils";
export type AppEventPayloadMap = Record<string, unknown[]>;
export type AppEventBehavior = {
  cardinality: "once" | "many";
  replay: "none" | "last";
};
export type AppEventBehaviorMap<Events extends AppEventPayloadMap> = {
  [K in keyof Events]: AppEventBehavior;
};
type AwaitableAppEventKeys<
  Events extends AppEventPayloadMap,
  Behavior extends AppEventBehaviorMap<Events>,
> = {
  [K in keyof Events]: Behavior[K]["cardinality"] extends "once"
    ? Behavior[K]["replay"] extends "last"
      ? K
      : never
    : never;
}[keyof Events];
type AppEventPromiseValue<Args extends any[]> = Args extends [infer Only]
  ? Only
  : Args;
export class AppEventBus<
Events extends AppEventPayloadMap,
⋮----
constructor(private readonly behavior: Behavior)
private getEmitter<K extends keyof Events>(name: K): Emitter<Events[K]>
private toPromiseValue<Args extends any[]>(
    args: Args,
): AppEventPromiseValue<Args>
public on<K extends keyof Events>(
    name: K,
    callback: (...args: Events[K]) => void,
  ): UnsubscribeCallback;
public on<K extends AwaitableAppEventKeys<Events, Behavior>>(
    name: K,
  ): Promise<AppEventPromiseValue<Events[K]>>;
public on<K extends keyof Events>(
    name: K,
    callback?: (...args: Events[K]) => void,
): UnsubscribeCallback | Promise<AppEventPromiseValue<Events[K]>>
public emit<K extends keyof Events>(name: K, ...args: Events[K])
public clear()
```

## File: packages/common/src/binary-heap.ts
```typescript
export class BinaryHeap<T>
⋮----
constructor(private scoreFunction: (node: T) => number)
sinkDown(idx: number)
bubbleUp(idx: number)
push(node: T)
pop(): T | null
remove(node: T)
size(): number
rescoreElement(node: T)
```

## File: packages/common/src/bounds.ts
```typescript
export type Bounds = readonly [
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
];
export const isBounds = (box: unknown): box is Bounds
```

## File: packages/common/src/colors.test.ts
```typescript
import {
  applyDarkModeFilter,
  COLOR_PALETTE,
  rgbToHex,
} from "@excalidraw/common";
```

## File: packages/common/src/colors.ts
```typescript
import tinycolor from "tinycolor2";
import { clamp } from "@excalidraw/math";
import { degreesToRadians } from "@excalidraw/math";
import type { Degrees } from "@excalidraw/math";
⋮----
function cssHueRotate(
  red: number,
  green: number,
  blue: number,
  degrees: Degrees,
):
const cssInvert = (
  r: number,
  g: number,
  b: number,
  percent: number,
):
⋮----
const invertComponent = (color: number): number =>
⋮----
export const applyDarkModeFilter = (color: string): string =>
const pick = <R extends Record<string, any>, K extends readonly (keyof R)[]>(
  source: R,
  keys: K,
) =>
export type ColorTuple = readonly [string, string, string, string, string];
export type ColorPaletteCustom = { [key: string]: ColorTuple | string };
export type ColorShadesIndexes = [number, number, number, number, number];
⋮----
export type ColorPalette = typeof COLOR_PALETTE;
export type ColorPickerColor = keyof typeof COLOR_PALETTE;
⋮----
export const getAllColorsSpecificShade = (index: 0 | 1 | 2 | 3 | 4)
export const rgbToHex = (r: number, g: number, b: number, a?: number) =>
export const colorToHex = (color: string): string | null =>
export const isTransparent = (color: string) =>
⋮----
const calculateContrast = (r: number, g: number, b: number): number =>
export const isColorDark = (color: string, threshold = 160): boolean =>
export const normalizeInputColor = (color: string): string | null =>
```

## File: packages/common/src/constants.ts
```typescript
import type {
  ExcalidrawElement,
  FontFamilyValues,
} from "@excalidraw/element/types";
import type { AppProps, AppState } from "@excalidraw/excalidraw/types";
import { COLOR_PALETTE } from "./colors";
⋮----
export enum EVENT {
  COPY = "copy",
  PASTE = "paste",
  CUT = "cut",
  KEYDOWN = "keydown",
  KEYUP = "keyup",
  MOUSE_MOVE = "mousemove",
  RESIZE = "resize",
  UNLOAD = "unload",
  FOCUS = "focus",
  BLUR = "blur",
  DRAG_OVER = "dragover",
  DROP = "drop",
  GESTURE_END = "gestureend",
  BEFORE_UNLOAD = "beforeunload",
  GESTURE_START = "gesturestart",
  GESTURE_CHANGE = "gesturechange",
  POINTER_MOVE = "pointermove",
  POINTER_DOWN = "pointerdown",
  POINTER_UP = "pointerup",
  STATE_CHANGE = "statechange",
  WHEEL = "wheel",
  TOUCH_START = "touchstart",
  TOUCH_END = "touchend",
  HASHCHANGE = "hashchange",
  VISIBILITY_CHANGE = "visibilitychange",
  SCROLL = "scroll",
  EXCALIDRAW_LINK = "excalidraw-link",
  MENU_ITEM_SELECT = "menu.itemSelect",
  MESSAGE = "message",
  FULLSCREENCHANGE = "fullscreenchange",
}
⋮----
export function getGenericFontFamilyFallback(
  fontFamily: number,
): keyof typeof FONT_FAMILY_GENERIC_FALLBACKS
export const getFontFamilyFallbacks = (
  fontFamily: number,
): Array<keyof typeof FONT_FAMILY_FALLBACKS> =>
⋮----
export const getExportSource = ()
⋮----
export enum UserIdleState {
  ACTIVE = "active",
  AWAY = "away",
  IDLE = "idle",
}
```

## File: packages/common/src/editorInterface.ts
```typescript
export type StylesPanelMode = "compact" | "full" | "mobile";
export type EditorInterface = Readonly<{
  formFactor: "phone" | "tablet" | "desktop";
  desktopUIMode: "compact" | "full";
  userAgent: Readonly<{
    isMobileDevice: boolean;
    platform: "ios" | "android" | "other" | "unknown";
  }>;
  isTouchScreen: boolean;
  canFitSidebar: boolean;
  isLandscape: boolean;
}>;
⋮----
export const isBrave = ()
export const isMobileBreakpoint = (width: number, height: number) =>
export const isTabletBreakpoint = (
  editorWidth: number,
  editorHeight: number,
) =>
const isMobileOrTablet = (): boolean =>
⋮----
// --- 1) chromium: prefer ua client hints -------------------------------
⋮----
export const getFormFactor = (
  editorWidth: number,
  editorHeight: number,
): EditorInterface["formFactor"] =>
export const deriveStylesPanelMode = (
  editorInterface: EditorInterface,
): StylesPanelMode =>
export const createUserAgentDescriptor = (
  userAgentString: string,
): EditorInterface["userAgent"] =>
export const loadDesktopUIModePreference = () =>
const persistDesktopUIMode = (mode: EditorInterface["desktopUIMode"]) =>
export const setDesktopUIMode = (mode: EditorInterface["desktopUIMode"]) =>
```

## File: packages/common/src/emitter.ts
```typescript
import type { UnsubscribeCallback } from "@excalidraw/excalidraw/types";
type Subscriber<T extends any[]> = (...payload: T) => void;
export class Emitter<T extends any[] = []>
⋮----
on(...handlers: Subscriber<T>[] | Subscriber<T>[][]): UnsubscribeCallback
once(...handlers: Subscriber<T>[] | Subscriber<T>[][]): UnsubscribeCallback
off(...handlers: Subscriber<T>[] | Subscriber<T>[][])
trigger(...payload: T)
clear()
```

## File: packages/common/src/font-metadata.ts
```typescript
import type {
  ExcalidrawTextElement,
  FontFamilyValues,
} from "@excalidraw/element/types";
import { FONT_FAMILY, FONT_FAMILY_FALLBACKS } from "./constants";
export interface FontMetadata {
  metrics: {
    unitsPerEm: 1000 | 1024 | 2048;
    ascender: number;
    descender: number;
    lineHeight: number;
  };
  deprecated?: true;
  private?: true;
  local?: true;
  fallback?: true;
}
⋮----
export const getVerticalOffset = (
  fontFamily: ExcalidrawTextElement["fontFamily"],
  fontSize: ExcalidrawTextElement["fontSize"],
  lineHeightPx: number,
) =>
export const getLineHeight = (fontFamily: FontFamilyValues) =>
```

## File: packages/common/src/index.ts
```typescript

```

## File: packages/common/src/keys.ts
```typescript
import { isDarwin } from "./editorInterface";
import type { ValueOf } from "./utility-types";
⋮----
export type Key = keyof typeof KEYS;
⋮----
export const isLatinChar = (key: string)
export const matchKey = (
  event: KeyboardEvent | React.KeyboardEvent<Element>,
  key: ValueOf<typeof KEYS>,
): boolean =>
export const isArrowKey = (key: string)
export const shouldResizeFromCenter = (event: MouseEvent | KeyboardEvent)
export const shouldMaintainAspectRatio = (event: MouseEvent | KeyboardEvent)
export const shouldRotateWithDiscreteAngle = (
  event: MouseEvent | KeyboardEvent | React.PointerEvent<HTMLCanvasElement>,
)
```

## File: packages/common/src/points.ts
```typescript
import {
  pointFromPair,
  type GlobalPoint,
  type LocalPoint,
} from "@excalidraw/math";
import type { NullableGridSize } from "@excalidraw/excalidraw/types";
export const getSizeFromPoints = (
  points: readonly (GlobalPoint | LocalPoint)[],
) =>
export const rescalePoints = <Point extends GlobalPoint | LocalPoint>(
  dimension: 0 | 1,
  newSize: number,
  points: readonly Point[],
  normalize: boolean,
): Point[] =>
export const getGridPoint = (
  x: number,
  y: number,
  gridSize: NullableGridSize,
): [number, number] =>
```

## File: packages/common/src/promise-pool.ts
```typescript
import Pool from "es6-promise-pool";
type TPromisePool<T, Index = number> = Pool<[Index, T][]> & {
  addEventListener: (
    type: "fulfilled",
    listener: (event: { data: { result: [Index, T] } }) => void,
  ) => (event: { data: { result: [Index, T] } }) => void;
  removeEventListener: (
    type: "fulfilled",
    listener: (event: { data: { result: [Index, T] } }) => void,
  ) => void;
};
export class PromisePool<T>
⋮----
constructor(
    source: IterableIterator<Promise<void | readonly [number, T]>>,
    concurrency: number,
)
public all()
⋮----
const listener = (event:
```

## File: packages/common/src/queue.ts
```typescript
import { promiseTry, resolvablePromise } from ".";
import type { ResolvablePromise } from ".";
import type { MaybePromise } from "./utility-types";
type Job<T, TArgs extends unknown[]> = (...args: TArgs) => MaybePromise<T>;
type QueueJob<T, TArgs extends unknown[]> = {
  jobFactory: Job<T, TArgs>;
  promise: ResolvablePromise<T>;
  args: TArgs;
};
export class Queue
⋮----
private tick()
push<TValue, TArgs extends unknown[]>(
    jobFactory: Job<TValue, TArgs>,
    ...args: TArgs
): Promise<TValue>
```

## File: packages/common/src/random.ts
```typescript
import { nanoid } from "nanoid";
import { Random } from "roughjs/bin/math";
import { isTestEnv } from "./utils";
⋮----
export const randomInteger = ()
export const reseed = (seed: number) =>
export const randomId = () => (isTestEnv() ? `id$
```

## File: packages/common/src/url.ts
```typescript
import { sanitizeUrl } from "@braintree/sanitize-url";
import { escapeDoubleQuotes } from "./utils";
export const normalizeLink = (link: string) =>
export const isLocalLink = (link: string | null) =>
export const toValidURL = (link: string) =>
```

## File: packages/common/src/utility-types.ts
```typescript
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
export type ValueOf<T> = T[keyof T];
export type Merge<M, N> = Omit<M, keyof N> & N;
export type SubtypeOf<Supertype, Subtype extends Supertype> = Subtype;
export type ResolutionType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;
export type MarkOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
export type MarkRequired<T, RK extends keyof T> = Exclude<T, RK> &
  Required<Pick<T, RK>>;
export type MarkNonNullable<T, K extends keyof T> = {
  [P in K]-?: P extends K ? NonNullable<T[P]> : T[P];
} & { [P in keyof T]: T[P] };
export type NonOptional<T> = Exclude<T, undefined>;
export type SignatureType<T> = T extends (...args: infer R) => any ? R : never;
export type CallableType<T extends (...args: any[]) => any> = (
  ...args: SignatureType<T>
) => ReturnType<T>;
export type ForwardRef<T, P = any> = Parameters<
  CallableType<React.ForwardRefRenderFunction<T, P>>
>[1];
export type ExtractSetType<T extends Set<any>> = T extends Set<infer U>
  ? U
  : never;
export type SameType<T, U> = T extends U ? (U extends T ? true : false) : false;
export type Assert<T extends true> = T;
export type NestedKeyOf<T, K = keyof T> = K extends keyof T & (string | number)
  ? `${K}` | (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : never)
  : never;
export type SetLike<T> = Set<T> | T[];
export type ReadonlySetLike<T> = ReadonlySet<T> | readonly T[];
export type MakeBrand<T extends string> = {
  [K in `~brand~${T}`]: T;
};
export type MaybePromise<T> = T | Promise<T>;
export type AllPossibleKeys<T> = T extends any ? keyof T : never;
export type DTO<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
export type MapEntry<M extends Map<any, any>> = M extends Map<infer K, infer V>
  ? [K, V]
  : never;
```

## File: packages/common/src/utils.test.ts
```typescript
import {
  isTransparent,
  mapFind,
  reduceToCommonValue,
} from "@excalidraw/common";
import { vi } from "vitest";
import { throttleRAF } from "./utils";
type RafCallback = FrameRequestCallback;
⋮----
const runScheduledFrame = (timestamp = 16) =>
```

## File: packages/common/src/utils.ts
```typescript
import { average } from "@excalidraw/math";
import type { GlobalCoord } from "@excalidraw/math";
import type { FontFamilyValues, FontString } from "@excalidraw/element/types";
import type {
  ActiveTool,
  AppState,
  ToolType,
  UnsubscribeCallback,
  Zoom,
} from "@excalidraw/excalidraw/types";
import {
  DEFAULT_VERSION,
  ENV,
  FONT_FAMILY,
  getFontFamilyFallbacks,
  WINDOWS_EMOJI_FALLBACK_FONT,
} from "./constants";
import type { MaybePromise, ResolutionType } from "./utility-types";
import type { EVENT } from "./constants";
⋮----
export const setDateTimeForTests = (dateTime: string) =>
export const getDateTime = () =>
export const capitalizeString = (str: string)
export const isToolIcon = (
  target: Element | EventTarget | null,
): target is HTMLElement
export const isInputLike = (
export const isInteractive = (target: Element | EventTarget | null) =>
export const isWritableElement = (
  target: Element | EventTarget | null,
): target is
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLBRElement
  | HTMLDivElement =>
  (target instanceof HTMLElement && target.dataset.type === "wysiwyg") ||
  target instanceof HTMLBRElement ||
  target instanceof HTMLTextAreaElement ||
  (target instanceof HTMLInputElement &&
    (target.type === "text" ||
      target.type === "number" ||
      target.type === "password" ||
      target.type === "search")) ||
  (target instanceof HTMLElement && target.closest(".cm-editor") !== null);
export const getFontFamilyString = ({
  fontFamily,
}: {
  fontFamily: FontFamilyValues;
}) =>
export const getFontString = ({
  fontSize,
  fontFamily,
}: {
  fontSize: number;
  fontFamily: FontFamilyValues;
}) =>
export const nextAnimationFrame = async (cb: () => any) =>
export const debounce = <T extends any[]>(
  fn: (...args: T) => void,
  timeout: number,
) =>
⋮----
const ret = (...args: T) =>
⋮----
export const throttleRAF = <T extends any[]>(fn: (...args: T) => void) =>
⋮----
const scheduleFunc = () =>
⋮----
export const easeOut = (k: number) =>
const easeOutInterpolate = (from: number, to: number, progress: number) =>
export const easeToValuesRAF = <
  T extends Record<keyof T, number>,
  K extends keyof T,
>({
  fromValues,
  toValues,
  onStep,
  duration = 250,
  interpolateValue,
  onStart,
  onEnd,
  onCancel,
}: {
  fromValues: T;
  toValues: T;
  interpolateValue?: (
    fromValue: number,
    toValue: number,
    progress: number,
    key: K,
)
⋮----
function step(timestamp: number)
⋮----
export const chunk = <T extends any>(
  array: readonly T[],
  size: number,
): T[][] =>
export const selectNode = (node: Element) =>
export const removeSelection = () =>
export const distance = (x: number, y: number)
export const isSelectionLikeTool = (type: ToolType | "custom") =>
export const updateActiveTool = (
  appState: Pick<AppState, "activeTool">,
  data: ((
    | {
        type: ToolType;
      }
    | { type: "custom"; customType: string }
) &
export const isFullScreen = ()
export const allowFullScreen = ()
export const exitFullScreen = ()
export const viewportCoordsToSceneCoords = (
  { clientX, clientY }: { clientX: number; clientY: number },
  {
    zoom,
    offsetLeft,
    offsetTop,
    scrollX,
    scrollY,
  }: {
    zoom: Zoom;
    offsetLeft: number;
    offsetTop: number;
    scrollX: number;
    scrollY: number;
  },
) =>
export const sceneCoordsToViewportCoords = (
  { sceneX, sceneY }: { sceneX: number; sceneY: number },
  {
    zoom,
    offsetLeft,
    offsetTop,
    scrollX,
    scrollY,
  }: {
    zoom: Zoom;
    offsetLeft: number;
    offsetTop: number;
    scrollX: number;
    scrollY: number;
  },
) =>
export const getGlobalCSSVariable = (name: string)
⋮----
export const isRTL = (text: string)
export const tupleToCoors = (
  xyTuple: readonly [number, number],
):
export const muteFSAbortError = (error?: Error) =>
export const findIndex = <T>(
  array: readonly T[],
  cb: (element: T, index: number, array: readonly T[]) => boolean,
  fromIndex: number = 0,
) =>
export const findLastIndex = <T>(
  array: readonly T[],
  cb: (element: T, index: number, array: readonly T[]) => boolean,
  fromIndex: number = array.length - 1,
) =>
export const mapFind = <T, K>(
  collection: readonly T[],
  iteratee: (value: T, index: number) => K | undefined | null,
): K | undefined =>
export type ResolvablePromise<T> = Promise<T> & {
  resolve: [T] extends [undefined]
    ? (value?: MaybePromise<Awaited<T>>) => void
    : (value: MaybePromise<Awaited<T>>) => void;
  reject: (error: Error) => void;
};
export const resolvablePromise = <T>() =>
export const nFormatter = (num: number, digits: number): string =>
export const getVersion = () =>
export const supportsEmoji = () =>
export const getNearestScrollableContainer = (
  element: HTMLElement,
): HTMLElement | Document =>
export const focusNearestParent = (element: HTMLInputElement) =>
export const preventUnload = (event: BeforeUnloadEvent) =>
export const bytesToHexString = (bytes: Uint8Array) =>
export const getUpdatedTimestamp = ()
/**
 * Transforms array of objects containing `id` attribute,
 * or array of ids (strings), into a Map, keyd by `id`.
 */
export const arrayToMap = <T extends { id: string } | string>(
  items: readonly T[] | Map<string, T>,
) =>
export const arrayToMapWithIndex = <T extends { id: string }>(
  elements: readonly T[],
)
export const arrayToObject = <T>(
  array: readonly T[],
  groupBy?: (value: T) => string | number,
)
export type Node<T> = T & {
  prev: Node<T> | null;
  next: Node<T> | null;
};
export const arrayToList = <T>(array: readonly T[]): Node<T>[]
export const toIterable = <T>(
  values: readonly T[] | ReadonlyMap<string, T>,
): Iterable<T> =>
export const toArray = <T>(
  values: readonly T[] | ReadonlyMap<string, T>,
): T[] =>
export const isTestEnv = ()
export const isDevEnv = ()
export const isProdEnv = ()
export const isServerEnv = ()
export const wrapEvent = <T extends Event>(name: EVENT, nativeEvent: T) =>
export const updateObject = <T extends Record<string, any>>(
  obj: T,
  updates: Partial<T>,
): T =>
export const isPrimitive = (val: any) =>
export const getFrame = () =>
export const isRunningInIframe = ()
export const isPromiseLike = (
  value: any,
): value is Promise<ResolutionType<typeof value>> =>
export const queryFocusableElements = (container: HTMLElement | null) =>
const _defaultIsShallowComparatorFallback = (a: any, b: any): boolean =>
export const isShallowEqual = <
  T extends Record<string, any>,
  K extends readonly unknown[],
>(
  objA: T,
  objB: T,
  comparators?:
    | { [key in keyof T]?: (a: T[key], b: T[key]) => boolean }
    | (keyof T extends K[number]
        ? K extends readonly (keyof T)[]
          ? K
          : {
              _error: "keys are either missing or include keys not in compared obj";
            }
        : {
            _error: "keys are either missing or include keys not in compared obj";
          }),
  debug = false,
) =>
export const composeEventHandlers = <E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) =>
export const assertNever = (
  value: never,
  message: string | null,
  softAssert?: boolean,
): never =>
export function invariant(condition: any, message: string): asserts condition
export const memoize = <T extends Record<string, any>, R extends any>(
  func: (opts: T) => R,
) =>
export const isMemberOf = <T extends string>(
  collection: Set<T> | readonly T[] | Record<T, any> | Map<T, any>,
  value: string,
): value is T =>
export const cloneJSON = <T>(obj: T): T
export const updateStable = <T extends any[] | Record<string, any>>(
  prevValue: T,
  nextValue: T,
) =>
export function addEventListener<K extends keyof WindowEventMap>(
  target: Window & typeof globalThis,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): UnsubscribeCallback;
export function addEventListener(
  target: Window & typeof globalThis,
  type: string,
  listener: (this: Window, ev: Event) => any,
  options?: boolean | AddEventListenerOptions,
): UnsubscribeCallback;
export function addEventListener<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): UnsubscribeCallback;
export function addEventListener(
  target: Document,
  type: string,
  listener: (this: Document, ev: Event) => any,
  options?: boolean | AddEventListenerOptions,
): UnsubscribeCallback;
export function addEventListener<K extends keyof FontFaceSetEventMap>(
  target: FontFaceSet,
  type: K,
  listener: (this: FontFaceSet, ev: FontFaceSetEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): UnsubscribeCallback;
export function addEventListener<K extends keyof HTMLElementEventMap>(
  target:
    | Document
    | (Window & typeof globalThis)
    | HTMLElement
    | undefined
    | null
    | false,
  type: K,
  listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
): UnsubscribeCallback;
export function addEventListener(
  target:
    | Document
    | (Window & typeof globalThis)
    | FontFaceSet
    | HTMLElement
    | undefined
    | null
    | false,
  type: keyof WindowEventMap | keyof DocumentEventMap | string,
  listener: (ev: Event) => any,
  options?: boolean | AddEventListenerOptions,
): UnsubscribeCallback
export function getSvgPathFromStroke(points: number[][], closed = true)
export const normalizeEOL = (str: string) =>
export type HasBrand<T> = {
  [K in keyof T]: K extends `~brand${infer _}` | "_brand" ? true : never;
}[keyof T];
type RemoveAllBrands<T> = HasBrand<T> extends true
  ? {
      [K in keyof T as K extends `~brand~${infer _}` | "_brand"
        ? never
        : K]: T[K];
    }
  : T;
type UnbrandForValue<T> = T extends Map<infer E, infer F>
  ? Map<UnbrandForValue<E>, UnbrandForValue<F>>
  : T extends Set<infer E>
  ? Set<UnbrandForValue<E>>
  : T extends readonly any[]
  ? T extends any[]
    ? unknown[]
    : readonly unknown[]
  : RemoveAllBrands<T>;
export type Unbrand<T> = T extends Map<infer E, infer F>
  ? Map<Unbrand<E>, Unbrand<F>>
  : T extends Set<infer E>
  ? Set<Unbrand<E>>
  : T extends readonly (infer E)[]
  ? Array<Unbrand<E>>
  : RemoveAllBrands<T>;
export type CombineBrands<BrandedType, CurrentType> =
  BrandedType extends readonly (infer BE)[]
    ? CurrentType extends readonly (infer CE)[]
      ? Array<CE & BE>
      : CurrentType & BrandedType
    : CurrentType & BrandedType;
export type CombineBrandsIfNeeded<T, Required> = [T] extends [Required]
  ? T[]
  : HasBrand<T> extends true
  ? CombineBrands<T, Required>[]
  : Required[];
export function toBrandedType<BrandedType>(
  value: UnbrandForValue<BrandedType>,
): BrandedType;
export function toBrandedType<BrandedType, CurrentType>(
  value: CurrentType,
): CombineBrands<BrandedType, CurrentType>;
export function toBrandedType(value: unknown)
export const promiseTry = async <TValue, TArgs extends unknown[]>(
  fn: (...args: TArgs) => PromiseLike<TValue> | TValue,
  ...args: TArgs
): Promise<TValue> =>
export const isAnyTrue = (...args: boolean[]): boolean
export const safelyParseJSON = (json: string): Record<string, any> | null =>
export const escapeDoubleQuotes = (str: string) =>
export const castArray = <T>(value: T | T[]): T[]
/** hack for Array.isArray type guard not working with readonly value[] */
export const isReadonlyArray = (value?: any): value is readonly any[] =>
export const sizeOf = (
  value:
    | readonly unknown[]
    | Readonly<Map<string, unknown>>
    | Readonly<Record<string, unknown>>
    | ReadonlySet<unknown>,
): number =>
export const reduceToCommonValue = <T, R = T>(
  collection: readonly T[] | ReadonlySet<T>,
  getValue?: (item: T) => R,
): R | null =>
type FEATURE_FLAGS = {
  COMPLEX_BINDINGS: boolean;
};
⋮----
export const getFeatureFlag = <F extends keyof FEATURE_FLAGS>(
  flag: F,
): FEATURE_FLAGS[F] =>
export const setFeatureFlag = <F extends keyof FEATURE_FLAGS>(
  flag: F,
  value: FEATURE_FLAGS[F],
) =>
export const oneOf = <N extends string | number | symbol | null, H extends N>(
  needle: N,
  haystack: readonly H[],
): needle is H =>
```

## File: packages/common/src/versionedSnapshotStore.ts
```typescript
export type VersionedSnapshot<T> = Readonly<{
  version: number;
  value: T;
}>;
export class VersionedSnapshotStore<T>
⋮----
constructor(
    initialValue: T,
    private readonly isEqual: (prev: T, next: T) => boolean = Object.is,
)
public getSnapshot(): VersionedSnapshot<T>
public set(nextValue: T): boolean
public update(updater: (prev: T) => T): boolean
public subscribe(
    subscriber: (snapshot: VersionedSnapshot<T>) => void,
): () => void
public pull(sinceVersion = -1): Promise<VersionedSnapshot<T>>
```

## File: packages/common/tests/keys.test.ts
```typescript
import { KEYS, matchKey } from "../src/keys";
```

## File: packages/common/tests/queue.test.ts
```typescript
import { Queue } from "../src/queue";
⋮----
const createJobFactory =
    <T>(
      resolutionOrRejectionValue: T,
      ms = 1,
)
```

## File: packages/common/tests/url.test.tsx
```typescript
import { normalizeLink } from "../src/url";
```

## File: packages/common/debug.ts
```typescript
const lessPrecise = (num: number, precision = 5)
const getAvgFrameTime = (times: number[])
export class Debug
⋮----
public static logChanged(name: string, obj: Record<string, unknown>)
⋮----
function deepEqual(a: unknown, b: unknown): boolean
```

## File: packages/common/global.d.ts
```typescript

```

## File: packages/element/src/__tests__/transform.test.ts
```typescript
import { pointFrom } from "@excalidraw/math";
import { vi } from "vitest";
import {
  convertToExcalidrawElements,
  type ExcalidrawElementSkeleton,
} from "../transform";
import type { ExcalidrawArrowElement } from "../types";
```

## File: packages/element/src/arrows/focus.ts
```typescript
import { pointDistance, pointFrom, type GlobalPoint } from "@excalidraw/math";
import { invariant } from "@excalidraw/common";
import type { AppState, NullableGridSize } from "@excalidraw/excalidraw/types";
import {
  bindBindingElement,
  calculateFixedPointForNonElbowArrowBinding,
  FOCUS_POINT_SIZE,
  getBindingGap,
  getGlobalFixedPointForBindableElement,
  isBindingEnabled,
  maxBindingDistance_simple,
  unbindBindingElement,
  updateBoundPoint,
} from "../binding";
import {
  isBindableElement,
  isBindingElement,
  isElbowArrow,
} from "../typeChecks";
import { LinearElementEditor } from "../linearElementEditor";
import { getHoveredElementForFocusPoint, hitElementItself } from "../collision";
import { moveArrowAboveBindable } from "../zindex";
import type {
  ElementsMap,
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  NonDeletedSceneElementsMap,
  PointsPositionUpdates,
} from "../types";
import type { Scene } from "../Scene";
export const isFocusPointVisible = (
  focusPoint: GlobalPoint,
  arrow: ExcalidrawArrowElement,
  bindableElement: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  appState: {
    isBindingEnabled: AppState["isBindingEnabled"];
    zoom: AppState["zoom"];
  },
  startOrEnd: "start" | "end",
  ignoreOverlap = false,
): boolean =>
const focusPointUpdate = (
  arrow: ExcalidrawArrowElement,
  bindableElement: ExcalidrawBindableElement | null,
  isStartBinding: boolean,
  elementsMap: NonDeletedSceneElementsMap,
  scene: Scene,
  appState: AppState,
  switchToInsideBinding: boolean,
) =>
export const handleFocusPointDrag = (
  linearElementEditor: LinearElementEditor,
  elementsMap: NonDeletedSceneElementsMap,
  pointerCoords: { x: number; y: number },
  scene: Scene,
  appState: AppState,
  gridSize: NullableGridSize,
  switchToInsideBinding: boolean,
) =>
export const handleFocusPointPointerDown = (
  arrow: ExcalidrawArrowElement,
  pointerDownState: { origin: { x: number; y: number } },
  elementsMap: NonDeletedSceneElementsMap,
  appState: AppState,
):
export const handleFocusPointPointerUp = (
  linearElementEditor: LinearElementEditor,
  scene: Scene,
) =>
export const handleFocusPointHover = (
  arrow: ExcalidrawArrowElement,
  scenePointerX: number,
  scenePointerY: number,
  scene: Scene,
  appState: AppState,
): "start" | "end" | null =>
```

## File: packages/element/src/arrows/helpers.ts
```typescript
import type { App } from "@excalidraw/excalidraw/types";
import { LinearElementEditor } from "../linearElementEditor";
import { handleFocusPointDrag } from "./focus";
export const maybeHandleArrowPointlikeDrag = ({
  app,
  event,
}: {
  app: App;
  event: KeyboardEvent | React.KeyboardEvent<Element> | PointerEvent;
}): boolean =>
```

## File: packages/element/src/align.ts
```typescript
import type { AppState } from "@excalidraw/excalidraw/types";
import { updateBoundElements } from "./binding";
import { getCommonBoundingBox } from "./bounds";
import { getSelectedElementsByGroup } from "./groups";
import type { Scene } from "./Scene";
import type { BoundingBox } from "./bounds";
import type { ExcalidrawElement } from "./types";
export interface Alignment {
  position: "start" | "center" | "end";
  axis: "x" | "y";
}
export const alignElements = (
  selectedElements: ExcalidrawElement[],
  alignment: Alignment,
  scene: Scene,
  appState: Readonly<AppState>,
): ExcalidrawElement[] =>
const calculateTranslation = (
  group: ExcalidrawElement[],
  selectionBoundingBox: BoundingBox,
  { axis, position }: Alignment,
):
```

## File: packages/element/src/arrowheads.ts
```typescript
import type { Arrowhead, AnyArrowhead } from "./types";
export const normalizeArrowhead = (
  arrowhead: AnyArrowhead | null | undefined,
): Arrowhead | null =>
export const getArrowheadForPicker = (
  arrowhead: AnyArrowhead | null | undefined,
): Arrowhead | null =>
```

## File: packages/element/src/binding.ts
```typescript
import {
  arrayToMap,
  getFeatureFlag,
  invariant,
  isTransparent,
} from "@excalidraw/common";
import {
  PRECISION,
  clamp,
  lineSegment,
  pointDistance,
  pointDistanceSq,
  pointFrom,
  pointFromVector,
  pointRotateRads,
  pointsEqual,
  vectorFromPoint,
  vectorNormalize,
  vectorScale,
  type GlobalPoint,
} from "@excalidraw/math";
import type { LineSegment, LocalPoint, Radians } from "@excalidraw/math";
import type { AppState } from "@excalidraw/excalidraw/types";
import type { MapEntry, Mutable } from "@excalidraw/common/utility-types";
import type { Bounds } from "@excalidraw/common";
import { getCenterForBounds } from "./bounds";
import {
  getAllHoveredElementAtPoint,
  getHoveredElementForBinding,
  hitElementItself,
  intersectElementWithLineSegment,
  isBindableElementInsideOtherBindable,
  isPointInElement,
} from "./collision";
import { distanceToElement } from "./distance";
import {
  headingForPointFromElement,
  headingIsHorizontal,
  vectorToHeading,
  type Heading,
} from "./heading";
import { LinearElementEditor } from "./linearElementEditor";
import { mutateElement } from "./mutateElement";
import { getBoundTextElement, handleBindTextResize } from "./textElement";
import {
  isArrowElement,
  isBindableElement,
  isBoundToContainer,
  isElbowArrow,
  isRectangularElement,
  isRectanguloidElement,
  isTextElement,
} from "./typeChecks";
import { aabbForElement, elementCenterPoint } from "./bounds";
import { updateElbowArrowPoints } from "./elbowArrow";
import {
  deconstructDiamondElement,
  deconstructRectanguloidElement,
  projectFixedPointOntoDiagonal,
} from "./utils";
import type { Scene } from "./Scene";
import type { ElementUpdate } from "./mutateElement";
import type {
  BindMode,
  ElementsMap,
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  ExcalidrawElbowArrowElement,
  ExcalidrawElement,
  ExcalidrawRectanguloidElement,
  ExcalidrawTextElement,
  FixedPoint,
  FixedPointBinding,
  NonDeleted,
  NonDeletedExcalidrawElement,
  NonDeletedSceneElementsMap,
  Ordered,
  PointsPositionUpdates,
} from "./types";
export type BindingStrategy =
  | {
      mode: BindMode;
      element: NonDeleted<ExcalidrawBindableElement>;
      focusPoint: GlobalPoint;
    }
  | {
      mode: null;
      element?: undefined;
      focusPoint?: undefined;
    }
  | {
      mode: undefined;
      element?: undefined;
      focusPoint?: undefined;
    };
⋮----
export const getBindingGap = (
  bindTarget: ExcalidrawBindableElement,
  opts: Pick<ExcalidrawArrowElement, "elbowed">,
): number =>
export const maxBindingDistance_simple = (zoom?: AppState["zoom"]): number =>
export const isBindingEnabled = (appState: {
  isBindingEnabled: AppState["isBindingEnabled"];
}): boolean =>
export const bindOrUnbindBindingElement = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  draggingPoints: PointsPositionUpdates,
  scenePointerX: number,
  scenePointerY: number,
  scene: Scene,
  appState: AppState,
  opts?: {
    newArrow?: boolean;
    altKey?: boolean;
    angleLocked?: boolean;
    initialBinding?: boolean;
  },
) =>
const bindOrUnbindBindingElementEdge = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  { mode, element, focusPoint }: BindingStrategy,
  startOrEnd: "start" | "end",
  scene: Scene,
  shouldSnapToOutline = true,
): void =>
const bindingStrategyForElbowArrowEndpointDragging = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  draggingPoints: PointsPositionUpdates,
  elementsMap: NonDeletedSceneElementsMap,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  zoom?: AppState["zoom"],
):
const bindingStrategyForNewSimpleArrowEndpointDragging = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  draggingPoints: PointsPositionUpdates,
  elementsMap: NonDeletedSceneElementsMap,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  startDragged: boolean,
  endDragged: boolean,
  startIdx: number,
  endIdx: number,
  appState: AppState,
  globalBindMode?: AppState["bindMode"],
  shiftKey?: boolean,
):
const bindingStrategyForSimpleArrowEndpointDragging_complex = (
  point: GlobalPoint,
  currentBinding: FixedPointBinding | null,
  oppositeBinding: FixedPointBinding | null,
  elementsMap: NonDeletedSceneElementsMap,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  globalBindMode: AppState["bindMode"],
  arrow: NonDeleted<ExcalidrawArrowElement>,
  finalize?: boolean,
):
export const getBindingStrategyForDraggingBindingElementEndpoints = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  draggingPoints: PointsPositionUpdates,
  screenPointerX: number,
  screenPointerY: number,
  elementsMap: NonDeletedSceneElementsMap,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  appState: AppState,
  opts?: {
    newArrow?: boolean;
    angleLocked?: boolean;
    altKey?: boolean;
    finalize?: boolean;
    initialBinding?: boolean;
    zoom?: AppState["zoom"];
  },
):
const getBindingStrategyForDraggingBindingElementEndpoints_simple = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  draggingPoints: PointsPositionUpdates,
  scenePointerX: number,
  scenePointerY: number,
  elementsMap: NonDeletedSceneElementsMap,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  appState: AppState,
  opts?: {
    newArrow?: boolean;
    angleLocked?: boolean;
    altKey?: boolean;
    finalize?: boolean;
    initialBinding?: boolean;
    zoom?: AppState["zoom"];
  },
):
const getBindingStrategyForDraggingBindingElementEndpoints_complex = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  draggingPoints: PointsPositionUpdates,
  elementsMap: NonDeletedSceneElementsMap,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  appState: AppState,
  opts?: {
    newArrow?: boolean;
    shiftKey?: boolean;
    finalize?: boolean;
    initialBinding?: boolean;
  },
):
export const bindOrUnbindBindingElements = (
  selectedArrows: NonDeleted<ExcalidrawArrowElement>[],
  scene: Scene,
  appState: AppState,
): void =>
export const bindBindingElement = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  hoveredElement: ExcalidrawBindableElement,
  mode: BindMode,
  startOrEnd: "start" | "end",
  scene: Scene,
  focusPoint?: GlobalPoint,
  shouldSnapToOutline = true,
): void =>
export const unbindBindingElement = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  startOrEnd: "start" | "end",
  scene: Scene,
): ExcalidrawBindableElement["id"] | null =>
export const updateBoundElements = (
  changedElement: NonDeletedExcalidrawElement,
  scene: Scene,
  options?: {
    simultaneouslyUpdated?: readonly ExcalidrawElement[];
    changedElements?: Map<string, ExcalidrawElement>;
  },
) =>
⋮----
const visitor = (element: ExcalidrawElement | undefined) =>
⋮----
const updateArrowBindings = (
  latestElement: ExcalidrawArrowElement,
  startOrEnd: "startBinding" | "endBinding",
  elementsMap: NonDeletedSceneElementsMap,
  scene: Scene,
  appState: AppState,
) =>
export const updateBindings = (
  latestElement: ExcalidrawElement,
  scene: Scene,
  appState: AppState,
  options?: {
    simultaneouslyUpdated?: readonly ExcalidrawElement[];
    newSize?: { width: number; height: number };
  },
) =>
const doesNeedUpdate = (
  boundElement: NonDeleted<ExcalidrawArrowElement>,
  changedElement: ExcalidrawBindableElement,
) =>
const getSimultaneouslyUpdatedElementIds = (
  simultaneouslyUpdated: readonly ExcalidrawElement[] | undefined,
): Set<ExcalidrawElement["id"]> =>
export const getHeadingForElbowArrowSnap = (
  p: Readonly<GlobalPoint>,
  otherPoint: Readonly<GlobalPoint>,
  bindableElement: ExcalidrawBindableElement | undefined | null,
  aabb: Bounds | undefined | null,
  origPoint: GlobalPoint,
  elementsMap: ElementsMap,
  zoom?: AppState["zoom"],
): Heading =>
const getDistanceForBinding = (
  point: Readonly<GlobalPoint>,
  bindableElement: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  zoom?: AppState["zoom"],
) =>
export const bindPointToSnapToElementOutline = (
  arrowElement: ExcalidrawArrowElement,
  bindableElement: ExcalidrawBindableElement,
  startOrEnd: "start" | "end",
  elementsMap: ElementsMap,
  customIntersector?: LineSegment<GlobalPoint>,
  isMidpointSnappingEnabled = true,
): GlobalPoint =>
export const avoidRectangularCorner = (
  arrowElement: ExcalidrawArrowElement,
  bindTarget: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  p: GlobalPoint,
): GlobalPoint =>
export const snapToMid = (
  bindTarget: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  p: GlobalPoint,
  tolerance: number = 0.05,
  arrowElement?: ExcalidrawArrowElement,
): GlobalPoint | undefined =>
const extractBinding = (
  arrow: ExcalidrawArrowElement,
  startOrEnd: "startBinding" | "endBinding",
  elementsMap: ElementsMap,
) =>
const elementArea = (element: ExcalidrawBindableElement)
export const updateBoundPoint = (
  arrow: NonDeleted<ExcalidrawArrowElement>,
  startOrEnd: "startBinding" | "endBinding",
  binding: FixedPointBinding | null | undefined,
  bindableElement: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  dragging?: boolean,
): LocalPoint | null =>
export const calculateFixedPointForElbowArrowBinding = (
  linearElement: NonDeleted<ExcalidrawElbowArrowElement>,
  hoveredElement: ExcalidrawBindableElement,
  startOrEnd: "start" | "end",
  elementsMap: ElementsMap,
  shouldSnapToOutline = true,
  isMidpointSnappingEnabled = true,
):
export const calculateFixedPointForNonElbowArrowBinding = (
  linearElement: NonDeleted<ExcalidrawArrowElement>,
  hoveredElement: ExcalidrawBindableElement,
  startOrEnd: "start" | "end",
  elementsMap: ElementsMap,
  focusPoint?: GlobalPoint,
):
export const fixDuplicatedBindingsAfterDuplication = (
  duplicatedElements: ExcalidrawElement[],
  origIdToDuplicateId: Map<ExcalidrawElement["id"], ExcalidrawElement["id"]>,
  duplicateElementsMap: NonDeletedSceneElementsMap,
) =>
export const fixBindingsAfterDeletion = (
  sceneElements: readonly ExcalidrawElement[],
  deletedElements: readonly ExcalidrawElement[],
): void =>
const newBoundElements = (
  boundElements: ExcalidrawElement["boundElements"],
  idsToRemove: Set<ExcalidrawElement["id"]>,
  elementsToAdd: Array<ExcalidrawElement> = [],
) =>
⋮----
export type BindableProp = "boundElements";
export type BindingProp =
  | "frameId"
  | "containerId"
  | "startBinding"
  | "endBinding";
type BoundElementsVisitingFunc = (
  boundElement: ExcalidrawElement | undefined,
  bindingProp: BindableProp,
  bindingId: string,
) => void;
type BindableElementVisitingFunc<T> = (
  bindableElement: ExcalidrawElement | undefined,
  bindingProp: BindingProp,
  bindingId: string,
) => T;
const boundElementsVisitor = (
  elements: ElementsMap,
  element: ExcalidrawElement,
  visit: BoundElementsVisitingFunc,
) =>
const bindableElementsVisitor = <T>(
  elements: ElementsMap,
  element: ExcalidrawElement,
  visit: BindableElementVisitingFunc<T>,
): T[] =>
export class BoundElement
⋮----
public static unbindAffected(
    elements: ElementsMap,
    boundElement: ExcalidrawElement | undefined,
    updateElementWith: (
      affected: ExcalidrawElement,
      updates: ElementUpdate<ExcalidrawElement>,
    ) => void,
)
⋮----
export class BindableElement
⋮----
public static unbindAffected(
    elements: ElementsMap,
    bindableElement: ExcalidrawElement | undefined,
    updateElementWith: (
      affected: ExcalidrawElement,
      updates: ElementUpdate<ExcalidrawElement>,
    ) => void,
)
⋮----
export const getGlobalFixedPointForBindableElement = (
  fixedPointRatio: FixedPoint,
  element: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
): GlobalPoint =>
export const getGlobalFixedPoints = (
  arrow: ExcalidrawArrowElement,
  elementsMap: ElementsMap,
): [GlobalPoint, GlobalPoint] =>
export const getArrowLocalFixedPoints = (
  arrow: ExcalidrawElbowArrowElement,
  elementsMap: ElementsMap,
) =>
export const isFixedPoint = (
  fixedPoint: any,
): fixedPoint is FixedPointBinding["fixedPoint"] =>
export const normalizeFixedPoint = <T extends FixedPoint>(
  fixedPoint: T,
): FixedPoint =>
type Side =
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left";
type ShapeType = "rectangle" | "ellipse" | "diamond";
const getShapeType = (element: ExcalidrawBindableElement): ShapeType =>
interface SectorConfig {
  centerAngle: number;
  sectorWidth: number;
  side: Side;
}
⋮----
const getSectorBoundaries = (
  config: SectorConfig[],
): Array<
const getShapeSideAdaptive = (
  fixedPoint: FixedPoint,
  shapeType: ShapeType,
): Side =>
export const getBindingSideMidPoint = (
  binding: FixedPointBinding,
  elementsMap: ElementsMap,
) =>
const getMidPoint = (p1: GlobalPoint, p2: GlobalPoint): GlobalPoint =>
```

## File: packages/element/src/bounds.ts
```typescript
import rough from "roughjs/bin/rough";
import {
  arrayToMap,
  type Bounds,
  invariant,
  rescalePoints,
  sizeOf,
} from "@excalidraw/common";
import {
  degreesToRadians,
  lineSegment,
  pointDistance,
  pointFrom,
  pointFromArray,
  pointRotateRads,
} from "@excalidraw/math";
import { getCurvePathOps } from "@excalidraw/utils/shape";
import { pointsOnBezierCurves } from "points-on-curve";
import type {
  Curve,
  Degrees,
  GlobalPoint,
  LineSegment,
  LocalPoint,
  Radians,
} from "@excalidraw/math";
import type { AppState } from "@excalidraw/excalidraw/types";
import type { Mutable } from "@excalidraw/common/utility-types";
import { generateRoughOptions } from "./shape";
import { ShapeCache } from "./shape";
import { LinearElementEditor } from "./linearElementEditor";
import { getBoundTextElement, getContainerElement } from "./textElement";
import {
  isArrowElement,
  isBoundToContainer,
  isFreeDrawElement,
  isLinearElement,
  isLineElement,
  isTextElement,
} from "./typeChecks";
import { getElementShape } from "./shape";
import {
  deconstructDiamondElement,
  deconstructRectanguloidElement,
} from "./utils";
import type { Drawable, Op } from "roughjs/bin/core";
import type { Point as RoughPoint } from "roughjs/bin/geometry";
import type {
  Arrowhead,
  ElementsMap,
  ElementsMapOrArray,
  ExcalidrawElement,
  ExcalidrawEllipseElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawLinearElement,
  ExcalidrawRectanguloidElement,
  ExcalidrawTextElementWithContainer,
  NonDeleted,
} from "./types";
export type RectangleBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
};
type MaybeQuadraticSolution = [number | null, number | null] | false;
export type SceneBounds = readonly [
  sceneX: number,
  sceneY: number,
  sceneX2: number,
  sceneY2: number,
];
export class ElementBounds
⋮----
static getBounds(
    element: ExcalidrawElement,
    elementsMap: ElementsMap,
    nonRotated: boolean = false,
)
private static calculateBounds(
    element: ExcalidrawElement,
    elementsMap: ElementsMap,
): Bounds
⋮----
export const getElementAbsoluteCoords = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  includeBoundText: boolean = false,
): [number, number, number, number, number, number] =>
export const getElementLineSegments = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
): LineSegment<GlobalPoint>[] =>
const _isRectanguloidElement = (
  element: ExcalidrawElement,
): element is ExcalidrawRectanguloidElement =>
const getRotatedSides = (
  sides: LineSegment<GlobalPoint>[],
  center: GlobalPoint,
  angle: Radians,
) =>
const getSegmentsOnCurve = (
  curve: Curve<GlobalPoint>,
  center: GlobalPoint,
  angle: Radians,
): LineSegment<GlobalPoint>[] =>
const getSegmentsOnEllipse = (
  ellipse: ExcalidrawEllipseElement,
): LineSegment<GlobalPoint>[] =>
export const getRectangleBoxAbsoluteCoords = (boxSceneCoords: RectangleBox) =>
export const getDiamondPoints = (element: ExcalidrawElement) =>
const getBezierValueForT = (
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number,
) =>
const solveQuadratic = (
  p0: number,
  p1: number,
  p2: number,
  p3: number,
): MaybeQuadraticSolution =>
export const getCubicBezierCurveBound = (
  p0: GlobalPoint,
  p1: GlobalPoint,
  p2: GlobalPoint,
  p3: GlobalPoint,
): Bounds =>
export const getMinMaxXYFromCurvePathOps = (
  ops: Op[],
  transformXY?: (p: GlobalPoint) => GlobalPoint,
): Bounds =>
export const getBoundsFromPoints = (
  points: ExcalidrawFreeDrawElement["points"],
): Bounds =>
const getFreeDrawElementAbsoluteCoords = (
  element: ExcalidrawFreeDrawElement,
): [number, number, number, number, number, number] =>
⋮----
export const getArrowheadSize = (arrowhead: Arrowhead): number =>
export const getArrowheadAngle = (arrowhead: Arrowhead): Degrees =>
export const getArrowheadPoints = (
  element: ExcalidrawLinearElement,
  shape: Drawable[],
  position: "start" | "end",
  arrowhead: Arrowhead,
  offsetMultiplier = 0,
) =>
⋮----
const equation = (t: number, idx: number)
⋮----
const generateLinearElementShape = (
  element: ExcalidrawLinearElement,
): Drawable =>
const getLinearElementRotatedBounds = (
  element: ExcalidrawLinearElement,
  cx: number,
  cy: number,
  elementsMap: ElementsMap,
): Bounds =>
⋮----
const transformXY = ([x, y]: GlobalPoint)
⋮----
export const getElementBounds = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  nonRotated: boolean = false,
): Bounds =>
export const getCommonBounds = (
  elements: ElementsMapOrArray,
  elementsMap?: ElementsMap,
): Bounds =>
export const getDraggedElementsBounds = (
  elements: ExcalidrawElement[],
  dragOffset: { x: number; y: number },
) =>
export const getResizedElementAbsoluteCoords = (
  element: ExcalidrawElement,
  nextWidth: number,
  nextHeight: number,
  normalizePoints: boolean,
): Bounds =>
export const getElementPointsCoords = (
  element: ExcalidrawLinearElement,
  points: readonly (readonly [number, number])[],
): Bounds =>
export const getClosestElementBounds = (
  elements: readonly ExcalidrawElement[],
  from: { x: number; y: number },
): Bounds =>
export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  midX: number;
  midY: number;
  width: number;
  height: number;
}
export const getCommonBoundingBox = (
  elements:
    | readonly ExcalidrawElement[]
    | readonly NonDeleted<ExcalidrawElement>[],
): BoundingBox =>
export const getVisibleSceneBounds = ({
  scrollX,
  scrollY,
  width,
  height,
  zoom,
}: AppState): SceneBounds =>
export const getCenterForBounds = (bounds: Bounds): GlobalPoint
export const aabbForElement = (
  element: Readonly<ExcalidrawElement>,
  elementsMap: ElementsMap,
  offset?: [number, number, number, number],
) =>
export const pointInsideBounds = <P extends GlobalPoint | LocalPoint>(
  p: P,
  bounds: Bounds,
): boolean
export const doBoundsIntersect = (
  bounds1: Bounds | null,
  bounds2: Bounds | null,
): boolean =>
export const elementCenterPoint = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  xOffset: number = 0,
  yOffset: number = 0,
) =>
```

## File: packages/element/src/collision.ts
```typescript
import { invariant, isTransparent, type Bounds } from "@excalidraw/common";
import {
  curveIntersectLineSegment,
  isPointWithinBounds,
  lineSegment,
  lineSegmentIntersectionPoints,
  pointFrom,
  pointFromVector,
  pointRotateRads,
  pointsEqual,
  vectorFromPoint,
  vectorNormalize,
  vectorScale,
} from "@excalidraw/math";
import {
  ellipse,
  ellipseSegmentInterceptPoints,
} from "@excalidraw/math/ellipse";
import type {
  Curve,
  GlobalPoint,
  LineSegment,
  Radians,
} from "@excalidraw/math";
import type { FrameNameBounds } from "@excalidraw/excalidraw/types";
import { isPathALoop } from "./utils";
import {
  doBoundsIntersect,
  elementCenterPoint,
  getCenterForBounds,
  getCubicBezierCurveBound,
  getDiamondPoints,
  getElementBounds,
  pointInsideBounds,
} from "./bounds";
import {
  hasBoundTextElement,
  isBindableElement,
  isFrameLikeElement,
  isFreeDrawElement,
  isIframeLikeElement,
  isImageElement,
  isLinearElement,
  isTextElement,
} from "./typeChecks";
import {
  deconstructDiamondElement,
  deconstructLinearOrFreeDrawElement,
  deconstructRectanguloidElement,
} from "./utils";
import { getBoundTextElement } from "./textElement";
import { LinearElementEditor } from "./linearElementEditor";
import { distanceToElement } from "./distance";
import { getBindingGap } from "./binding";
import type {
  ElementsMap,
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  ExcalidrawDiamondElement,
  ExcalidrawElement,
  ExcalidrawEllipseElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawLinearElement,
  ExcalidrawRectanguloidElement,
  NonDeleted,
  NonDeletedExcalidrawElement,
  NonDeletedSceneElementsMap,
  Ordered,
} from "./types";
export const shouldTestInside = (element: ExcalidrawElement) =>
export type HitTestArgs = {
  point: GlobalPoint;
  element: ExcalidrawElement;
  threshold: number;
  elementsMap: ElementsMap;
  frameNameBound?: FrameNameBounds | null;
  overrideShouldTestInside?: boolean;
};
⋮----
export const hitElementItself = ({
  point,
  element,
  threshold,
  elementsMap,
  frameNameBound = null,
  overrideShouldTestInside = false,
}: HitTestArgs) =>
export const hitElementBoundingBox = (
  point: GlobalPoint,
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  tolerance = 0,
) =>
export const hitElementBoundingBoxOnly = (
  hitArgs: HitTestArgs,
  elementsMap: ElementsMap,
)
export const hitElementBoundText = (
  point: GlobalPoint,
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
): boolean =>
const bindingBorderTest = (
  element: NonDeleted<ExcalidrawBindableElement>,
  [x, y]: Readonly<GlobalPoint>,
  elementsMap: NonDeletedSceneElementsMap,
  tolerance: number = 0,
): boolean =>
export const getAllHoveredElementAtPoint = (
  point: Readonly<GlobalPoint>,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  elementsMap: NonDeletedSceneElementsMap,
  tolerance?: number,
): NonDeleted<ExcalidrawBindableElement>[] =>
export const getHoveredElementForBinding = (
  point: Readonly<GlobalPoint>,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  elementsMap: NonDeletedSceneElementsMap,
  tolerance?: number,
): NonDeleted<ExcalidrawBindableElement> | null =>
export const getHoveredElementForFocusPoint = (
  point: GlobalPoint,
  arrow: ExcalidrawArrowElement,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  elementsMap: NonDeletedSceneElementsMap,
  tolerance?: number,
): ExcalidrawBindableElement | null =>
export const intersectElementWithLineSegment = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  line: LineSegment<GlobalPoint>,
  offset: number = 0,
  onlyFirst = false,
): GlobalPoint[] =>
const curveIntersections = (
  curves: Curve<GlobalPoint>[],
  segment: LineSegment<GlobalPoint>,
  intersections: GlobalPoint[],
  center: GlobalPoint,
  angle: Radians,
  onlyFirst = false,
) =>
const lineIntersections = (
  lines: LineSegment<GlobalPoint>[],
  segment: LineSegment<GlobalPoint>,
  intersections: GlobalPoint[],
  center: GlobalPoint,
  angle: Radians,
  onlyFirst = false,
) =>
const intersectLinearOrFreeDrawWithLineSegment = (
  element: ExcalidrawLinearElement | ExcalidrawFreeDrawElement,
  segment: LineSegment<GlobalPoint>,
  onlyFirst = false,
): GlobalPoint[] =>
const intersectRectanguloidWithLineSegment = (
  element: ExcalidrawRectanguloidElement,
  elementsMap: ElementsMap,
  segment: LineSegment<GlobalPoint>,
  offset: number = 0,
  onlyFirst = false,
): GlobalPoint[] =>
const intersectDiamondWithLineSegment = (
  element: ExcalidrawDiamondElement,
  elementsMap: ElementsMap,
  l: LineSegment<GlobalPoint>,
  offset: number = 0,
  onlyFirst = false,
): GlobalPoint[] =>
const intersectEllipseWithLineSegment = (
  element: ExcalidrawEllipseElement,
  elementsMap: ElementsMap,
  l: LineSegment<GlobalPoint>,
  offset: number = 0,
): GlobalPoint[] =>
const isPointOnElementOutline = (
  point: GlobalPoint,
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  tolerance = 1,
)
export const isPointInElement = (
  point: GlobalPoint,
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
) =>
export const isBindableElementInsideOtherBindable = (
  innerElement: ExcalidrawBindableElement,
  outerElement: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
): boolean =>
⋮----
const getCornerPoints = (
    element: ExcalidrawElement,
    offset: number,
): GlobalPoint[] =>
```

## File: packages/element/src/comparisons.ts
```typescript
import type { ElementOrToolType } from "@excalidraw/excalidraw/types";
export const hasBackground = (type: ElementOrToolType)
export const hasStrokeColor = (type: ElementOrToolType)
export const hasStrokeWidth = (type: ElementOrToolType)
export const hasStrokeStyle = (type: ElementOrToolType)
export const canChangeRoundness = (type: ElementOrToolType)
export const toolIsArrow = (type: ElementOrToolType)
export const canHaveArrowheads = (type: ElementOrToolType)
```

## File: packages/element/src/containerCache.ts
```typescript
import type { ExcalidrawTextContainer } from "./types";
⋮----
export const updateOriginalContainerCache = (
  id: ExcalidrawTextContainer["id"],
  height: ExcalidrawTextContainer["height"],
) =>
export const resetOriginalContainerCache = (
  id: ExcalidrawTextContainer["id"],
) =>
export const getOriginalContainerHeightFromCache = (
  id: ExcalidrawTextContainer["id"],
) =>
```

## File: packages/element/src/cropElement.ts
```typescript
import {
  type Radians,
  pointFrom,
  pointCenter,
  pointRotateRads,
  vectorFromPoint,
  vectorNormalize,
  vectorSubtract,
  vectorAdd,
  vectorScale,
  pointFromVector,
  clamp,
  isCloseTo,
} from "@excalidraw/math";
import { type Point } from "points-on-curve";
import {
  elementCenterPoint,
  getElementAbsoluteCoords,
  getResizedElementAbsoluteCoords,
} from "./bounds";
import type { TransformHandleType } from "./transformHandles";
import type {
  ElementsMap,
  ExcalidrawElement,
  ExcalidrawImageElement,
  ImageCrop,
  NonDeleted,
} from "./types";
⋮----
export const cropElement = (
  element: ExcalidrawImageElement,
  elementsMap: ElementsMap,
  transformHandle: TransformHandleType,
  naturalWidth: number,
  naturalHeight: number,
  pointerX: number,
  pointerY: number,
  widthAspectRatio?: number,
) =>
⋮----
const updateCropWidthAndHeight = (crop: ImageCrop) =>
⋮----
const adjustFlipForHandle = (
    handle: TransformHandleType,
    crop: ImageCrop,
) =>
⋮----
const recomputeOrigin = (
  stateAtCropStart: NonDeleted<ExcalidrawElement>,
  transformHandle: TransformHandleType,
  width: number,
  height: number,
  shouldMaintainAspectRatio?: boolean,
) =>
export const getUncroppedImageElement = (
  element: ExcalidrawImageElement,
  elementsMap: ElementsMap,
) =>
export const getUncroppedWidthAndHeight = (element: ExcalidrawImageElement) =>
const adjustCropPosition = (
  crop: ImageCrop,
  scale: ExcalidrawImageElement["scale"],
) =>
export const getFlipAdjustedCropPosition = (
  element: ExcalidrawImageElement,
  natural = false,
) =>
```

## File: packages/element/src/delta.ts
```typescript
import {
  arrayToMap,
  arrayToObject,
  assertNever,
  isDevEnv,
  isShallowEqual,
  isTestEnv,
  randomInteger,
} from "@excalidraw/common";
import type {
  ExcalidrawElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
  NonDeleted,
  Ordered,
  OrderedExcalidrawElement,
  SceneElementsMap,
} from "@excalidraw/element/types";
import type {
  DTO,
  Mutable,
  SubtypeOf,
  ValueOf,
} from "@excalidraw/common/utility-types";
import type {
  AppState,
  ObservedAppState,
  ObservedElementsAppState,
  ObservedStandaloneAppState,
} from "@excalidraw/excalidraw/types";
import { getObservedAppState } from "./store";
import {
  BoundElement,
  BindableElement,
  bindingProperties,
  updateBoundElements,
} from "./binding";
import { LinearElementEditor } from "./linearElementEditor";
import { mutateElement, newElementWith } from "./mutateElement";
import { getBoundTextElementId, redrawTextBoundingBox } from "./textElement";
import {
  hasBoundTextElement,
  isBindableElement,
  isBoundToContainer,
  isTextElement,
} from "./typeChecks";
import { getNonDeletedGroupIds } from "./groups";
import { orderByFractionalIndex, syncMovedIndices } from "./fractionalIndex";
import { StoreSnapshot } from "./store";
import { Scene } from "./Scene";
import type { BindableProp, BindingProp } from "./binding";
import type { ElementUpdate } from "./mutateElement";
export class Delta<T>
⋮----
private constructor(
public static create<T>(
    deleted: Partial<T>,
    inserted: Partial<T>,
    modifier?: (
      delta: Partial<T>,
      partialType: "deleted" | "inserted",
    ) => Partial<T>,
    modifierOptions?: "deleted" | "inserted" | "both",
)
public static calculate<T extends { [key: string]: any }>(
    prevObject: T,
    nextObject: T,
    modifier?: (partial: Partial<T>) => Partial<T>,
    postProcess?: (
      deleted: Partial<T>,
      inserted: Partial<T>,
    ) => [Partial<T>, Partial<T>],
): Delta<T>
public static empty()
public static isEmpty<T>(delta: Delta<T>): boolean
public static merge<T>(
    delta1: Delta<T>,
    delta2: Delta<T>,
    delta3: Delta<T> = Delta.empty(),
)
public static mergeObjects<T extends { [key: string]: unknown }>(
    prev: T,
    added: T,
    removed: T = {} as T,
)
public static mergeArrays<T>(
    prev: readonly T[] | null,
    added: readonly T[] | null | undefined,
    removed: readonly T[] | null | undefined,
    predicate?: (value: T) => string,
)
public static diffObjects<T, K extends keyof T, V extends ValueOf<T[K]>>(
    deleted: Partial<T>,
    inserted: Partial<T>,
    property: K,
    setValue: (prevValue: V | undefined) => V,
)
⋮----
type RecordLike = Record<string, V | undefined>;
⋮----
public static diffArrays<T, K extends keyof T, V extends T[K]>(
    deleted: Partial<T>,
    inserted: Partial<T>,
    property: K,
    groupBy: (value: V extends ArrayLike<infer T> ? T : never) => string,
)
public static isLeftDifferent<T extends {}>(
    object1: T,
    object2: T,
    skipShallowCompare = false,
): boolean
public static isRightDifferent<T extends {}>(
    object1: T,
    object2: T,
    skipShallowCompare = false,
): boolean
public static isInnerDifferent<T extends {}>(
    object1: T,
    object2: T,
    skipShallowCompare = false,
): boolean
public static isDifferent<T extends {}>(
    object1: T,
    object2: T,
    skipShallowCompare = false,
): boolean
public static getLeftDifferences<T extends {}>(
    object1: T,
    object2: T,
    skipShallowCompare = false,
)
public static getRightDifferences<T extends {}>(
    object1: T,
    object2: T,
    skipShallowCompare = false,
)
public static getInnerDifferences<T extends {}>(
    object1: T,
    object2: T,
    skipShallowCompare = false,
)
public static getDifferences<T extends {}>(
    object1: T,
    object2: T,
    skipShallowCompare = false,
)
private static *distinctKeysIterator<T extends {}>(
    join: "left" | "right" | "inner" | "full",
    object1: T,
    object2: T,
    skipShallowCompare = false,
)
⋮----
export interface DeltaContainer<T> {
  inverse(): DeltaContainer<T>;
  applyTo(previous: T, ...options: unknown[]): [T, boolean];
  squash(delta: DeltaContainer<T>): this;
  isEmpty(): boolean;
}
⋮----
inverse(): DeltaContainer<T>;
applyTo(previous: T, ...options: unknown[]): [T, boolean];
squash(delta: DeltaContainer<T>): this;
isEmpty(): boolean;
⋮----
export class AppStateDelta implements DeltaContainer<AppState>
⋮----
private constructor(public delta: Delta<ObservedAppState>)
public static create(delta: Delta<ObservedAppState>): AppStateDelta
public static calculate<T extends ObservedAppState>(
    prevAppState: T,
    nextAppState: T,
): AppStateDelta
public static restore(appStateDeltaDTO: DTO<AppStateDelta>): AppStateDelta
⋮----
public inverse(): AppStateDelta
public squash(delta: AppStateDelta): this
public applyTo(
    appState: AppState,
    nextElements: SceneElementsMap,
): [AppState, boolean]
public isEmpty(): boolean
private filterInvisibleChanges(
    prevAppState: AppState,
    nextAppState: AppState,
    nextElements: SceneElementsMap,
): boolean
private static filterSelectedElements(
    selectedElementIds: AppState["selectedElementIds"],
    elements: SceneElementsMap,
    visibleDifferenceFlag: { value: boolean },
)
private static filterSelectedGroups(
    selectedGroupIds: AppState["selectedGroupIds"],
    nonDeletedGroupIds: Set<string>,
    visibleDifferenceFlag: { value: boolean },
)
private static stripElementsProps(
    delta: Partial<ObservedAppState>,
): Partial<ObservedStandaloneAppState>
private static stripStandaloneProps(
    delta: Partial<ObservedAppState>,
): Partial<ObservedElementsAppState>
private static postProcess<T extends ObservedAppState>(
    deleted: Partial<T>,
    inserted: Partial<T>,
): [Partial<T>, Partial<T>]
private static orderAppStateKeys(partial: Partial<ObservedAppState>)
⋮----
type ElementPartial<TElement extends ExcalidrawElement = ExcalidrawElement> =
  Omit<Partial<Ordered<TElement>>, "id" | "updated" | "seed">;
export type ApplyToOptions = {
  excludedProperties?: Set<keyof ElementPartial>;
};
type ApplyToFlags = {
  containsVisibleDifference: boolean;
  containsZindexDifference: boolean;
  applyDirection: "forward" | "backward" | undefined;
};
export class ElementsDelta implements DeltaContainer<SceneElementsMap>
⋮----
public static create(
    added: Record<string, Delta<ElementPartial>>,
    removed: Record<string, Delta<ElementPartial>>,
    updated: Record<string, Delta<ElementPartial>>,
    options: {
      shouldRedistribute: boolean;
    } = {
      shouldRedistribute: false,
    },
)
public static restore(elementsDeltaDTO: DTO<ElementsDelta>): ElementsDelta
⋮----
private static validate(
    elementsDelta: ElementsDelta,
    type: "added" | "removed" | "updated",
    satifiesSpecialInvariants: (delta: Delta<ElementPartial>) => boolean,
)
public static calculate<T extends OrderedExcalidrawElement>(
    prevElements: Map<string, T>,
    nextElements: Map<string, T>,
): ElementsDelta
⋮----
public inverse(): ElementsDelta
⋮----
const inverseInternal = (deltas: Record<string, Delta<ElementPartial>>) =>
⋮----
public applyLatestChanges(
    prevElements: SceneElementsMap,
    nextElements: SceneElementsMap,
    modifierOptions?: "deleted" | "inserted",
): ElementsDelta
⋮----
const modifier =
      (
        prevElement: OrderedExcalidrawElement | undefined,
        nextElement: OrderedExcalidrawElement | undefined,
)
const applyLatestChangesInternal = (
      deltas: Record<string, Delta<ElementPartial>>,
) =>
⋮----
public applyTo(
    elements: SceneElementsMap,
    snapshot: StoreSnapshot["elements"] = StoreSnapshot.empty().elements,
    options?: ApplyToOptions,
): [SceneElementsMap, boolean]
public squash(delta: ElementsDelta): this
⋮----
const mergeBoundElements = (
      prevDelta: Delta<ElementPartial>,
      nextDelta: Delta<ElementPartial>,
) =>
⋮----
private static applyDelta(
    element: OrderedExcalidrawElement,
    delta: Delta<ElementPartial>,
    flags: ApplyToFlags,
    options?: ApplyToOptions,
)
private static checkForVisibleDifference(
    element: OrderedExcalidrawElement,
    partial: ElementPartial,
)
private resolveConflicts(
    prevElements: SceneElementsMap,
    nextElements: SceneElementsMap,
    applyDirection: "forward" | "backward" = "forward",
)
⋮----
const updater = (
      element: ExcalidrawElement,
      updates: ElementUpdate<ExcalidrawElement>,
) =>
⋮----
private static unbindAffected(
    prevElements: SceneElementsMap,
    nextElements: SceneElementsMap,
    id: string,
    updater: (
      element: ExcalidrawElement,
      updates: ElementUpdate<ExcalidrawElement>,
    ) => void,
)
⋮----
const prevElement = ()
const nextElement = ()
⋮----
private static rebindAffected(
    prevElements: SceneElementsMap,
    nextElements: SceneElementsMap,
    id: string,
    updater: (
      element: ExcalidrawElement,
      updates: ElementUpdate<ExcalidrawElement>,
    ) => void,
)
public static redrawElements(
    nextElements: SceneElementsMap,
    changedElements: Map<string, OrderedExcalidrawElement>,
)
private static redrawTextBoundingBoxes(
    scene: Scene,
    changed: Map<string, OrderedExcalidrawElement>,
)
private static redrawBoundArrows(
    scene: Scene,
    changed: Map<string, OrderedExcalidrawElement>,
)
private static reorderElements(
    elements: SceneElementsMap,
    changed: Map<string, OrderedExcalidrawElement>,
    flags: {
      containsVisibleDifference: boolean;
      containsZindexDifference: boolean;
    },
)
private static postProcess(
    deleted: ElementPartial,
    inserted: ElementPartial,
): [ElementPartial, ElementPartial]
private static stripIrrelevantProps(
    partial: Partial<OrderedExcalidrawElement>,
): ElementPartial
```

## File: packages/element/src/distance.ts
```typescript
import {
  curvePointDistance,
  distanceToLineSegment,
  pointRotateRads,
} from "@excalidraw/math";
import { ellipse, ellipseDistanceFromPoint } from "@excalidraw/math/ellipse";
import type { GlobalPoint, Radians } from "@excalidraw/math";
import {
  deconstructDiamondElement,
  deconstructLinearOrFreeDrawElement,
  deconstructRectanguloidElement,
} from "./utils";
import { elementCenterPoint } from "./bounds";
import type {
  ElementsMap,
  ExcalidrawDiamondElement,
  ExcalidrawElement,
  ExcalidrawEllipseElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawLinearElement,
  ExcalidrawRectanguloidElement,
} from "./types";
export const distanceToElement = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  p: GlobalPoint,
): number =>
const distanceToRectanguloidElement = (
  element: ExcalidrawRectanguloidElement,
  elementsMap: ElementsMap,
  p: GlobalPoint,
) =>
const distanceToDiamondElement = (
  element: ExcalidrawDiamondElement,
  elementsMap: ElementsMap,
  p: GlobalPoint,
): number =>
const distanceToEllipseElement = (
  element: ExcalidrawEllipseElement,
  elementsMap: ElementsMap,
  p: GlobalPoint,
): number =>
const distanceToLinearOrFreeDraElement = (
  element: ExcalidrawLinearElement | ExcalidrawFreeDrawElement,
  p: GlobalPoint,
) =>
```

## File: packages/element/src/distribute.ts
```typescript
import type { AppState } from "@excalidraw/excalidraw/types";
import { updateBoundElements } from "./binding";
import { getCommonBoundingBox } from "./bounds";
import { getSelectedElementsByGroup } from "./groups";
import type { Scene } from "./Scene";
import type { ElementsMap, ExcalidrawElement } from "./types";
export interface Distribution {
  space: "between";
  axis: "x" | "y";
}
export const distributeElements = (
  selectedElements: ExcalidrawElement[],
  elementsMap: ElementsMap,
  distribution: Distribution,
  appState: Readonly<AppState>,
  scene: Scene,
): ExcalidrawElement[] =>
```

## File: packages/element/src/dragElements.ts
```typescript
import {
  type Bounds,
  TEXT_AUTOWRAP_THRESHOLD,
  getGridPoint,
  getFontString,
  DRAGGING_THRESHOLD,
} from "@excalidraw/common";
import type {
  AppState,
  NormalizedZoomValue,
  NullableGridSize,
  PointerDownState,
} from "@excalidraw/excalidraw/types";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { unbindBindingElement, updateBoundElements } from "./binding";
import { getCommonBounds } from "./bounds";
import { getPerfectElementSize } from "./sizeHelpers";
import { getBoundTextElement } from "./textElement";
import { getMinTextElementWidth } from "./textMeasurements";
import {
  isArrowElement,
  isElbowArrow,
  isFrameLikeElement,
  isImageElement,
  isTextElement,
} from "./typeChecks";
import type { Scene } from "./Scene";
import type { ExcalidrawElement } from "./types";
export const dragSelectedElements = (
  pointerDownState: PointerDownState,
  _selectedElements: NonDeletedExcalidrawElement[],
  offset: { x: number; y: number },
  scene: Scene,
  snapOffset: {
    x: number;
    y: number;
  },
  gridSize: NullableGridSize,
) =>
const calculateOffset = (
  commonBounds: Bounds,
  dragOffset: { x: number; y: number },
  snapOffset: { x: number; y: number },
  gridSize: NullableGridSize,
):
const updateElementCoords = (
  pointerDownState: PointerDownState,
  element: NonDeletedExcalidrawElement,
  scene: Scene,
  dragOffset: { x: number; y: number },
) =>
export const getDragOffsetXY = (
  selectedElements: NonDeletedExcalidrawElement[],
  x: number,
  y: number,
): [number, number] =>
export const dragNewElement = ({
  newElement,
  elementType,
  originX,
  originY,
  x,
  y,
  width,
  height,
  shouldMaintainAspectRatio,
  shouldResizeFromCenter,
  zoom,
  scene,
  widthAspectRatio = null,
  originOffset = null,
  informMutation = true,
}: {
  newElement: NonDeletedExcalidrawElement;
  elementType: AppState["activeTool"]["type"];
  originX: number;
  originY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  shouldMaintainAspectRatio: boolean;
  shouldResizeFromCenter: boolean;
  zoom: NormalizedZoomValue;
  scene: Scene;
  widthAspectRatio?: number | null;
  originOffset?: {
    x: number;
    y: number;
  } | null;
  informMutation?: boolean;
}) =>
```

## File: packages/element/src/duplicate.ts
```typescript
import {
  ORIG_ID,
  randomId,
  randomInteger,
  arrayToMap,
  castArray,
  findLastIndex,
  getUpdatedTimestamp,
  isTestEnv,
} from "@excalidraw/common";
import type { Mutable } from "@excalidraw/common/utility-types";
import type { AppState } from "@excalidraw/excalidraw/types";
import {
  getElementsInGroup,
  getNewGroupIdsForDuplication,
  getSelectedGroupForElement,
} from "./groups";
import {
  bindElementsToFramesAfterDuplication,
  getFrameChildren,
} from "./frame";
import { normalizeElementOrder } from "./sortElements";
import { bumpVersion } from "./mutateElement";
import {
  hasBoundTextElement,
  isBoundToContainer,
  isFrameLikeElement,
} from "./typeChecks";
import { getBoundTextElement, getContainerElement } from "./textElement";
import { fixDuplicatedBindingsAfterDuplication } from "./binding";
import type {
  ElementsMap,
  ExcalidrawElement,
  GroupId,
  NonDeletedSceneElementsMap,
} from "./types";
export const duplicateElement = <TElement extends ExcalidrawElement>(
  editingGroupId: AppState["editingGroupId"],
  groupIdMapForOperation: Map<GroupId, GroupId>,
  element: TElement,
  randomizeSeed?: boolean,
): Readonly<TElement> =>
export const duplicateElements = (
  opts: {
    elements: readonly ExcalidrawElement[];
    randomizeSeed?: boolean;
    overrides?: (data: {
      duplicateElement: ExcalidrawElement;
      origElement: ExcalidrawElement;
      origIdToDuplicateId: Map<
        ExcalidrawElement["id"],
        ExcalidrawElement["id"]
      >;
})
⋮----
const copyElements = <T extends ExcalidrawElement | ExcalidrawElement[]>(
    element: T,
  ): T extends ExcalidrawElement[]
    ? ExcalidrawElement[]
    : ExcalidrawElement | null => {
    const elements = castArray(element);
const insertBeforeOrAfterIndex = (
    index: number,
    elements: ExcalidrawElement | null | ExcalidrawElement[],
) =>
⋮----
const _deepCopyElement = (val: any, depth: number = 0) =>
export const deepCopyElement = <T extends ExcalidrawElement>(
  val: T,
): Mutable<T> =>
const __test__defineOrigId = (clonedObj: object, origId: string) =>
```

## File: packages/element/src/elbowArrow.ts
```typescript
import {
  clamp,
  pointDistance,
  pointFrom,
  pointScaleFromOrigin,
  pointsEqual,
  pointTranslate,
  vector,
  vectorCross,
  vectorFromPoint,
  vectorScale,
  type GlobalPoint,
  type LocalPoint,
} from "@excalidraw/math";
import {
  type Bounds,
  BinaryHeap,
  invariant,
  isAnyTrue,
  getSizeFromPoints,
  isDevEnv,
  arrayToMap,
} from "@excalidraw/common";
import type { AppState } from "@excalidraw/excalidraw/types";
import {
  bindPointToSnapToElementOutline,
  getHeadingForElbowArrowSnap,
  getGlobalFixedPointForBindableElement,
  getBindingGap,
  maxBindingDistance_simple,
  BASE_BINDING_GAP_ELBOW,
} from "./binding";
import { distanceToElement } from "./distance";
import {
  compareHeading,
  flipHeading,
  HEADING_DOWN,
  HEADING_LEFT,
  HEADING_RIGHT,
  HEADING_UP,
  headingForPointIsHorizontal,
  headingIsHorizontal,
  vectorToHeading,
  headingForPoint,
} from "./heading";
import { type ElementUpdate } from "./mutateElement";
import { isBindableElement } from "./typeChecks";
import {
  type ExcalidrawElbowArrowElement,
  type NonDeletedSceneElementsMap,
} from "./types";
import { aabbForElement, pointInsideBounds } from "./bounds";
import { getHoveredElementForBinding } from "./collision";
import type { Heading } from "./heading";
import type {
  Arrowhead,
  ElementsMap,
  ExcalidrawBindableElement,
  FixedPointBinding,
  FixedSegment,
  NonDeletedExcalidrawElement,
  Ordered,
} from "./types";
type GridAddress = [number, number] & { _brand: "gridaddress" };
type Node = {
  f: number;
  g: number;
  h: number;
  closed: boolean;
  visited: boolean;
  parent: Node | null;
  pos: GlobalPoint;
  addr: GridAddress;
};
type Grid = {
  row: number;
  col: number;
  data: (Node | null)[];
};
type ElbowArrowState = {
  x: number;
  y: number;
  startBinding: FixedPointBinding | null;
  endBinding: FixedPointBinding | null;
  startArrowhead: Arrowhead | null;
  endArrowhead: Arrowhead | null;
};
type ElbowArrowData = {
  dynamicAABBs: Bounds[];
  startDonglePosition: GlobalPoint | null;
  startGlobalPoint: GlobalPoint;
  startHeading: Heading;
  endDonglePosition: GlobalPoint | null;
  endGlobalPoint: GlobalPoint;
  endHeading: Heading;
  commonBounds: Bounds;
  hoveredStartElement: ExcalidrawBindableElement | null;
  hoveredEndElement: ExcalidrawBindableElement | null;
};
⋮----
const handleSegmentRenormalization = (
  arrow: ExcalidrawElbowArrowElement,
  elementsMap: NonDeletedSceneElementsMap,
) =>
const handleSegmentRelease = (
  arrow: ExcalidrawElbowArrowElement,
  fixedSegments: readonly FixedSegment[],
  elementsMap: NonDeletedSceneElementsMap,
) =>
const handleSegmentMove = (
  arrow: ExcalidrawElbowArrowElement,
  fixedSegments: readonly FixedSegment[],
  startHeading: Heading,
  endHeading: Heading,
  hoveredStartElement: ExcalidrawBindableElement | null,
  hoveredEndElement: ExcalidrawBindableElement | null,
): ElementUpdate<ExcalidrawElbowArrowElement> =>
const handleEndpointDrag = (
  arrow: ExcalidrawElbowArrowElement,
  updatedPoints: readonly LocalPoint[],
  fixedSegments: readonly FixedSegment[],
  startHeading: Heading,
  endHeading: Heading,
  startGlobalPoint: GlobalPoint,
  endGlobalPoint: GlobalPoint,
  hoveredStartElement: ExcalidrawBindableElement | null,
  hoveredEndElement: ExcalidrawBindableElement | null,
): ElementUpdate<ExcalidrawElbowArrowElement> =>
⋮----
export const updateElbowArrowPoints = (
  arrow: Readonly<ExcalidrawElbowArrowElement>,
  elementsMap: NonDeletedSceneElementsMap,
  updates: {
    points?: readonly LocalPoint[];
    fixedSegments?: readonly FixedSegment[] | null;
    startBinding?: FixedPointBinding | null;
    endBinding?: FixedPointBinding | null;
  },
  options?: {
    isDragging?: boolean;
    isBindingEnabled?: boolean;
    isMidpointSnappingEnabled?: boolean;
  },
): ElementUpdate<ExcalidrawElbowArrowElement> =>
const getElbowArrowData = (
  arrow: {
    x: number;
    y: number;
    startBinding: FixedPointBinding | null;
    endBinding: FixedPointBinding | null;
    startArrowhead: Arrowhead | null;
    endArrowhead: Arrowhead | null;
    points: readonly LocalPoint[];
  },
  elementsMap: NonDeletedSceneElementsMap,
  nextPoints: readonly LocalPoint[],
  options?: {
    isDragging?: boolean;
    zoom?: AppState["zoom"];
    isBindingEnabled?: boolean;
    isMidpointSnappingEnabled?: boolean;
  },
) =>
const routeElbowArrow = (
  arrow: ElbowArrowState,
  elbowArrowData: ElbowArrowData,
): GlobalPoint[] | null =>
const offsetFromHeading = (
  heading: Heading,
  head: number,
  side: number,
): [number, number, number, number] =>
const astar = (
  start: Node,
  end: Node,
  grid: Grid,
  startHeading: Heading,
  endHeading: Heading,
  aabbs: Bounds[],
) =>
const pathTo = (start: Node, node: Node) =>
const m_dist = (a: GlobalPoint | LocalPoint, b: GlobalPoint | LocalPoint)
const generateDynamicAABBs = (
  a: Bounds,
  b: Bounds,
  common: Bounds,
  startDifference?: [number, number, number, number],
  endDifference?: [number, number, number, number],
  disableSideHack?: boolean,
  startElementBounds?: Bounds | null,
  endElementBounds?: Bounds | null,
): Bounds[] =>
const calculateGrid = (
  aabbs: Bounds[],
  start: GlobalPoint,
  startHeading: Heading,
  end: GlobalPoint,
  endHeading: Heading,
  common: Bounds,
): Grid =>
const getDonglePosition = (
  bounds: Bounds,
  heading: Heading,
  p: GlobalPoint,
): GlobalPoint =>
const estimateSegmentCount = (
  start: Node,
  end: Node,
  startHeading: Heading,
  endHeading: Heading,
) =>
const getNeighbors = ([col, row]: [number, number], grid: Grid)
const gridNodeFromAddr = (
  [col, row]: [col: number, row: number],
  grid: Grid,
): Node | null =>
const pointToGridNode = (point: GlobalPoint, grid: Grid): Node | null =>
const commonAABB = (aabbs: Bounds[]): Bounds
const getBindableElementForId = (
  id: string,
  elementsMap: ElementsMap,
): ExcalidrawBindableElement | null =>
const normalizeArrowElementUpdate = (
  global: GlobalPoint[],
  nextFixedSegments: readonly FixedSegment[] | null,
  startIsSpecial?: ExcalidrawElbowArrowElement["startIsSpecial"],
  endIsSpecial?: ExcalidrawElbowArrowElement["startIsSpecial"],
): ElementUpdate<ExcalidrawElbowArrowElement> =>
const getElbowArrowCornerPoints = (points: GlobalPoint[]): GlobalPoint[] =>
const removeElbowArrowShortSegments = (
  points: GlobalPoint[],
): GlobalPoint[] =>
const neighborIndexToHeading = (idx: number): Heading =>
const getGlobalPoint = (
  arrow: ExcalidrawElbowArrowElement,
  startOrEnd: "start" | "end",
  fixedPointRatio: [number, number] | undefined | null,
  initialPoint: GlobalPoint,
  element?: ExcalidrawBindableElement | null,
  elementsMap?: ElementsMap,
  isDragging?: boolean,
  isBindingEnabled = true,
  isMidpointSnappingEnabled = true,
): GlobalPoint =>
const getBindPointHeading = (
  p: GlobalPoint,
  otherPoint: GlobalPoint,
  hoveredElement: ExcalidrawBindableElement | null | undefined,
  origPoint: GlobalPoint,
  elementsMap: ElementsMap,
  zoom?: AppState["zoom"],
): Heading
const getHoveredElement = (
  origPoint: GlobalPoint,
  elementsMap: NonDeletedSceneElementsMap,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  zoom?: AppState["zoom"],
) =>
const gridAddressesEqual = (a: GridAddress, b: GridAddress): boolean
export const validateElbowPoints = <P extends GlobalPoint | LocalPoint>(
  points: readonly P[],
  tolerance: number = DEDUP_TRESHOLD,
)
```

## File: packages/element/src/elementLink.ts
```typescript
import { ELEMENT_LINK_KEY, normalizeLink } from "@excalidraw/common";
import type { AppProps, AppState } from "@excalidraw/excalidraw/types";
import { elementsAreInSameGroup } from "./groups";
import type { ExcalidrawElement } from "./types";
export const defaultGetElementLinkFromSelection: Exclude<
  AppProps["generateLinkForSelection"],
  undefined
> = (id, type) =>
export const getLinkIdAndTypeFromSelection = (
  selectedElements: ExcalidrawElement[],
  appState: AppState,
):
export const canCreateLinkFromElements = (
  selectedElements: ExcalidrawElement[],
) =>
export const isElementLink = (url: string) =>
export const parseElementLinkFromURL = (url: string) =>
```

## File: packages/element/src/embeddable.ts
```typescript
import {
  FONT_FAMILY,
  VERTICAL_ALIGN,
  escapeDoubleQuotes,
  getFontString,
} from "@excalidraw/common";
import type { ExcalidrawProps } from "@excalidraw/excalidraw/types";
import type { MarkRequired } from "@excalidraw/common/utility-types";
import { newTextElement } from "./newElement";
import { wrapText } from "./textWrapping";
import { isIframeElement } from "./typeChecks";
import type {
  ExcalidrawElement,
  ExcalidrawIframeLikeElement,
  IframeData,
} from "./types";
type IframeDataWithSandbox = MarkRequired<IframeData, "sandbox">;
⋮----
// not anchored to start to allow <blockquote> twitter embeds
⋮----
const parseYouTubeLikeTimestamp = (url: string): number =>
const parseGoogleDriveVideoLink = (
  url: string,
):
⋮----
export const createSrcDoc = (body: string) =>
export const getEmbedLink = (
  link: string | null | undefined,
): IframeDataWithSandbox | null =>
⋮----
link = `https://www.youtube.com/embed/videoseries?list=${ytLink[2]}&enablejsapi=1${time}`;
⋮----
export const createPlaceholderEmbeddableLabel = (
  element: ExcalidrawIframeLikeElement,
): ExcalidrawElement =>
const matchHostname = (
  url: string,
  allowedHostnames: Set<string> | string,
): string | null =>
⋮----
// ignore
⋮----
export const maybeParseEmbedSrc = (str: string): string =>
export const embeddableURLValidator = (
  url: string | null | undefined,
  validateEmbeddable: ExcalidrawProps["validateEmbeddable"],
): boolean =>
```

## File: packages/element/src/flowchart.ts
```typescript
import { KEYS, invariant, toBrandedType } from "@excalidraw/common";
import { type GlobalPoint, pointFrom, type LocalPoint } from "@excalidraw/math";
import type {
  AppState,
  PendingExcalidrawElements,
} from "@excalidraw/excalidraw/types";
import { bindBindingElement } from "./binding";
import { updateElbowArrowPoints } from "./elbowArrow";
import {
  HEADING_DOWN,
  HEADING_LEFT,
  HEADING_RIGHT,
  HEADING_UP,
  compareHeading,
  headingForPointFromElement,
  type Heading,
} from "./heading";
import { LinearElementEditor } from "./linearElementEditor";
import { mutateElement } from "./mutateElement";
import { newArrowElement, newElement } from "./newElement";
import { aabbForElement } from "./bounds";
import { elementsAreInFrameBounds, elementOverlapsWithFrame } from "./frame";
import {
  isBindableElement,
  isElbowArrow,
  isFrameElement,
  isFlowchartNodeElement,
} from "./typeChecks";
import {
  type ElementsMap,
  type ExcalidrawBindableElement,
  type ExcalidrawElement,
  type ExcalidrawFlowchartNodeElement,
  type NonDeletedSceneElementsMap,
  type Ordered,
  type OrderedExcalidrawElement,
} from "./types";
import type { Scene } from "./Scene";
type LinkDirection = "up" | "right" | "down" | "left";
⋮----
export const getLinkDirectionFromKey = (key: string): LinkDirection =>
const getNodeRelatives = (
  type: "predecessors" | "successors",
  node: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  direction: LinkDirection,
) =>
const getSuccessors = (
  node: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  direction: LinkDirection,
) =>
export const getPredecessors = (
  node: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  direction: LinkDirection,
) =>
const getOffsets = (
  element: ExcalidrawFlowchartNodeElement,
  linkedNodes: ExcalidrawElement[],
  direction: LinkDirection,
) =>
const addNewNode = (
  element: ExcalidrawFlowchartNodeElement,
  appState: AppState,
  direction: LinkDirection,
  scene: Scene,
) =>
export const addNewNodes = (
  startNode: ExcalidrawFlowchartNodeElement,
  appState: AppState,
  direction: LinkDirection,
  scene: Scene,
  numberOfNodes: number,
) =>
const createBindingArrow = (
  startBindingElement: ExcalidrawFlowchartNodeElement,
  endBindingElement: ExcalidrawFlowchartNodeElement,
  direction: LinkDirection,
  appState: AppState,
  scene: Scene,
) =>
export class FlowChartNavigator
⋮----
clear()
exploreByDirection(
    element: ExcalidrawElement,
    elementsMap: ElementsMap,
    direction: LinkDirection,
): ExcalidrawElement["id"] | null
⋮----
export class FlowChartCreator
⋮----
createNodes(
    startNode: ExcalidrawFlowchartNodeElement,
    appState: AppState,
    direction: LinkDirection,
    scene: Scene,
)
⋮----
export const isNodeInFlowchart = (
  element: ExcalidrawFlowchartNodeElement,
  elementsMap: ElementsMap,
) =>
```

## File: packages/element/src/fractionalIndex.ts
```typescript
import { generateNKeysBetween } from "fractional-indexing";
import { arrayToMap } from "@excalidraw/common";
import { mutateElement, newElementWith } from "./mutateElement";
import { getBoundTextElement } from "./textElement";
import { hasBoundTextElement } from "./typeChecks";
import type {
  ElementsMap,
  ExcalidrawElement,
  FractionalIndex,
  OrderedExcalidrawElement,
  SceneElementsMap,
} from "./types";
export class InvalidFractionalIndexError extends Error
export const validateFractionalIndices = (
  elements: readonly ExcalidrawElement[],
  {
    shouldThrow = false,
    includeBoundTextValidation = false,
    ignoreLogs,
    reconciliationContext,
  }: {
    shouldThrow: boolean;
    includeBoundTextValidation: boolean;
    ignoreLogs?: true;
    reconciliationContext?: {
      localElements: ReadonlyArray<ExcalidrawElement>;
      remoteElements: ReadonlyArray<ExcalidrawElement>;
    };
  },
) =>
⋮----
const stringifyElement = (element: ExcalidrawElement | void)
⋮----
export const orderByFractionalIndex = (
  elements: OrderedExcalidrawElement[],
) =>
export const syncMovedIndices = (
  elements: readonly ExcalidrawElement[],
  movedElements: ElementsMap,
): OrderedExcalidrawElement[] =>
export const syncInvalidIndices = (
  elements: readonly ExcalidrawElement[],
): OrderedExcalidrawElement[] =>
export const syncInvalidIndicesImmutable = (
  elements: readonly ExcalidrawElement[],
): SceneElementsMap | undefined =>
const getMovedIndicesGroups = (
  elements: readonly ExcalidrawElement[],
  movedElements: ElementsMap,
) =>
const getInvalidIndicesGroups = (elements: readonly ExcalidrawElement[]) =>
⋮----
const getLowerBound = (
    index: number,
): [ExcalidrawElement["index"] | undefined, number] =>
const getUpperBound = (
    index: number,
): [ExcalidrawElement["index"] | undefined, number] =>
⋮----
const isValidFractionalIndex = (
  index: ExcalidrawElement["index"] | undefined,
  predecessor: ExcalidrawElement["index"] | undefined,
  successor: ExcalidrawElement["index"] | undefined,
) =>
const generateIndices = (
  elements: readonly ExcalidrawElement[],
  indicesGroups: number[][],
) =>
const isOrderedElement = (
  element: ExcalidrawElement,
): element is OrderedExcalidrawElement =>
```

## File: packages/element/src/frame.ts
```typescript
import { arrayToMap } from "@excalidraw/common";
import { isPointWithinBounds, pointFrom } from "@excalidraw/math";
import { doLineSegmentsIntersect } from "@excalidraw/utils/bbox";
import { elementsOverlappingBBox } from "@excalidraw/utils/withinBounds";
import type {
  AppClassProperties,
  AppState,
  StaticCanvasAppState,
} from "@excalidraw/excalidraw/types";
import type { ReadonlySetLike } from "@excalidraw/common/utility-types";
import { getElementsWithinSelection, getSelectedElements } from "./selection";
import { getElementsInGroup, selectGroupsFromGivenElements } from "./groups";
import {
  getElementLineSegments,
  getCommonBounds,
  getElementAbsoluteCoords,
} from "./bounds";
import { mutateElement } from "./mutateElement";
import { getBoundTextElement, getContainerElement } from "./textElement";
import {
  isFrameElement,
  isFrameLikeElement,
  isTextElement,
} from "./typeChecks";
import type { ExcalidrawElementsIncludingDeleted } from "./Scene";
import type {
  ElementsMap,
  ElementsMapOrArray,
  ExcalidrawElement,
  ExcalidrawFrameLikeElement,
  NonDeleted,
  NonDeletedExcalidrawElement,
} from "./types";
export const bindElementsToFramesAfterDuplication = (
  nextElements: readonly ExcalidrawElement[],
  origElements: readonly ExcalidrawElement[],
  origIdToDuplicateId: Map<ExcalidrawElement["id"], ExcalidrawElement["id"]>,
) =>
export function isElementIntersectingFrame(
  element: ExcalidrawElement,
  frame: ExcalidrawFrameLikeElement,
  elementsMap: ElementsMap,
)
export const getElementsCompletelyInFrame = (
  elements: readonly ExcalidrawElement[],
  frame: ExcalidrawFrameLikeElement,
  elementsMap: ElementsMap,
)
export const isElementContainingFrame = (
  element: ExcalidrawElement,
  frame: ExcalidrawFrameLikeElement,
  elementsMap: ElementsMap,
) =>
export const getElementsIntersectingFrame = (
  elements: readonly ExcalidrawElement[],
  frame: ExcalidrawFrameLikeElement,
) =>
export const elementsAreInFrameBounds = (
  elements: readonly ExcalidrawElement[],
  frame: ExcalidrawFrameLikeElement,
  elementsMap: ElementsMap,
) =>
export const elementOverlapsWithFrame = (
  element: ExcalidrawElement,
  frame: ExcalidrawFrameLikeElement,
  elementsMap: ElementsMap,
) =>
export const isCursorInFrame = (
  cursorCoords: {
    x: number;
    y: number;
  },
  frame: NonDeleted<ExcalidrawFrameLikeElement>,
  elementsMap: ElementsMap,
) =>
export const groupsAreAtLeastIntersectingTheFrame = (
  elements: readonly NonDeletedExcalidrawElement[],
  groupIds: readonly string[],
  frame: ExcalidrawFrameLikeElement,
) =>
export const groupsAreCompletelyOutOfFrame = (
  elements: readonly NonDeletedExcalidrawElement[],
  groupIds: readonly string[],
  frame: ExcalidrawFrameLikeElement,
) =>
export const groupByFrameLikes = (elements: readonly ExcalidrawElement[]) =>
export const getFrameChildren = (
  allElements: ElementsMapOrArray,
  frameId: string,
) =>
export const getFrameLikeElements = (
  allElements: ExcalidrawElementsIncludingDeleted,
): ExcalidrawFrameLikeElement[] =>
export const getRootElements = (
  allElements: ExcalidrawElementsIncludingDeleted,
) =>
export const getElementsInResizingFrame = (
  allElements: ExcalidrawElementsIncludingDeleted,
  frame: ExcalidrawFrameLikeElement,
  appState: AppState,
  elementsMap: ElementsMap,
): ExcalidrawElement[] =>
export const getElementsInNewFrame = (
  elements: ExcalidrawElementsIncludingDeleted,
  frame: ExcalidrawFrameLikeElement,
  elementsMap: ElementsMap,
) =>
export const omitPartialGroups = (
  elements: ExcalidrawElement[],
  frame: ExcalidrawFrameLikeElement,
  allElementsMap: ElementsMap,
) =>
export const getContainingFrame = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
) =>
export const filterElementsEligibleAsFrameChildren = (
  elements: readonly ExcalidrawElement[],
  frame: ExcalidrawFrameLikeElement,
) =>
export const addElementsToFrame = <T extends ElementsMapOrArray>(
  allElements: T,
  elementsToAdd: NonDeletedExcalidrawElement[],
  frame: ExcalidrawFrameLikeElement,
  appState: AppState,
): T =>
export const removeElementsFromFrame = (
  elementsToRemove: ReadonlySetLike<NonDeletedExcalidrawElement>,
  elementsMap: ElementsMap,
) =>
export const removeAllElementsFromFrame = <T extends ExcalidrawElement>(
  allElements: readonly T[],
  frame: ExcalidrawFrameLikeElement,
) =>
export const replaceAllElementsInFrame = <T extends ExcalidrawElement>(
  allElements: readonly T[],
  nextElementsInFrame: ExcalidrawElement[],
  frame: ExcalidrawFrameLikeElement,
  app: AppClassProperties,
): T[] =>
export const updateFrameMembershipOfSelectedElements = <
  T extends ElementsMapOrArray,
>(
  allElements: T,
  appState: AppState,
  app: AppClassProperties,
) =>
export const omitGroupsContainingFrameLikes = (
  allElements: ElementsMapOrArray,
  selectedElements?: readonly ExcalidrawElement[],
) =>
export const getTargetFrame = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  appState: StaticCanvasAppState,
) =>
export const isElementInFrame = (
  element: ExcalidrawElement,
  allElementsMap: ElementsMap,
  appState: StaticCanvasAppState,
  opts?: {
    targetFrame?: ExcalidrawFrameLikeElement;
    checkedGroups?: Map<string, boolean>;
  },
) =>
⋮----
const setGroupsInFrame = (isInFrame: boolean) =>
⋮----
export const shouldApplyFrameClip = (
  element: ExcalidrawElement,
  frame: ExcalidrawFrameLikeElement,
  appState: StaticCanvasAppState,
  elementsMap: ElementsMap,
  checkedGroups?: Map<string, boolean>,
) =>
⋮----
export const getDefaultFrameName = (element: ExcalidrawFrameLikeElement) =>
export const getFrameLikeTitle = (element: ExcalidrawFrameLikeElement) =>
export const getElementsOverlappingFrame = (
  elements: readonly ExcalidrawElement[],
  frame: ExcalidrawFrameLikeElement,
) =>
export const frameAndChildrenSelectedTogether = (
  selectedElements: readonly ExcalidrawElement[],
) =>
```

## File: packages/element/src/groups.ts
```typescript
import type {
  AppClassProperties,
  AppState,
  InteractiveCanvasAppState,
} from "@excalidraw/excalidraw/types";
import type { Mutable } from "@excalidraw/common/utility-types";
import { getBoundTextElement } from "./textElement";
import { isBoundToContainer } from "./typeChecks";
import { makeNextSelectedElementIds, getSelectedElements } from "./selection";
import type {
  GroupId,
  ExcalidrawElement,
  NonDeleted,
  NonDeletedExcalidrawElement,
  ElementsMapOrArray,
  ElementsMap,
} from "./types";
export const selectGroup = (
  groupId: GroupId,
  appState: InteractiveCanvasAppState,
  elements: readonly NonDeleted<ExcalidrawElement>[],
): Pick<
  InteractiveCanvasAppState,
  "selectedGroupIds" | "selectedElementIds" | "editingGroupId"
> => {
  const elementsInGroup = elements.reduce(
(acc: Record<string, true>, element) =>
⋮----
type SelectGroupsReturnType = Pick<
    InteractiveCanvasAppState,
    "selectedGroupIds" | "editingGroupId" | "selectedElementIds"
  >;
⋮----
const _selectGroups = (
    selectedElements: readonly NonDeleted<ExcalidrawElement>[],
    elements: readonly NonDeleted<ExcalidrawElement>[],
    appState: Pick<AppState, "selectedElementIds" | "editingGroupId">,
    prevAppState: InteractiveCanvasAppState,
): SelectGroupsReturnType =>
const selectGroupsForSelectedElements = (
    appState: Pick<AppState, "selectedElementIds" | "editingGroupId">,
    elements: readonly NonDeletedExcalidrawElement[],
    prevAppState: InteractiveCanvasAppState,
    app: AppClassProperties | null,
  ): Mutable<
    Pick<
      InteractiveCanvasAppState,
      "selectedGroupIds" | "editingGroupId" | "selectedElementIds"
    >
  > => {
    const selectedElements = app
      ? app.scene.getSelectedElements({
          selectedElementIds: appState.selectedElementIds,
          elements,
        })
      : getSelectedElements(elements, appState);
⋮----
export const isSelectedViaGroup = (
  appState: InteractiveCanvasAppState,
  element: ExcalidrawElement,
)
export const getSelectedGroupForElement = (
  appState: Pick<
    InteractiveCanvasAppState,
    "editingGroupId" | "selectedGroupIds"
  >,
  element: ExcalidrawElement,
)
export const getSelectedGroupIds = (
  appState: InteractiveCanvasAppState,
): GroupId[]
export const selectGroupsFromGivenElements = (
  elements: readonly NonDeleted<ExcalidrawElement>[],
  appState: InteractiveCanvasAppState,
) =>
export const editGroupForSelectedElement = (
  appState: AppState,
  element: NonDeleted<ExcalidrawElement>,
): AppState =>
export const isElementInGroup = (element: ExcalidrawElement, groupId: string)
export const getElementsInGroup = (
  elements: ElementsMapOrArray,
  groupId: string,
) =>
export const getSelectedGroupIdForElement = (
  element: ExcalidrawElement,
  selectedGroupIds: { [groupId: string]: boolean },
)
export const addToGroup = (
  prevGroupIds: ExcalidrawElement["groupIds"],
  newGroupId: GroupId,
  editingGroupId: AppState["editingGroupId"],
) =>
export const removeFromSelectedGroups = (
  groupIds: ExcalidrawElement["groupIds"],
  selectedGroupIds: { [groupId: string]: boolean },
)
export const getMaximumGroups = (
  elements: ExcalidrawElement[],
  elementsMap: ElementsMap,
): ExcalidrawElement[][] =>
export const getNonDeletedGroupIds = (elements: ElementsMap) =>
export const elementsAreInSameGroup = (
  elements: readonly ExcalidrawElement[],
) =>
export const isInGroup = (element: NonDeletedExcalidrawElement) =>
export const getNewGroupIdsForDuplication = (
  groupIds: ExcalidrawElement["groupIds"],
  editingGroupId: AppState["editingGroupId"],
  mapper: (groupId: GroupId) => GroupId,
) =>
export const getSelectedElementsByGroup = (
  selectedElements: ExcalidrawElement[],
  elementsMap: ElementsMap,
  appState: Readonly<AppState>,
): ExcalidrawElement[][] =>
⋮----
const addToElementsMap = (element: ExcalidrawElement) =>
const addToGroupsMap = (element: ExcalidrawElement, groupId: string) =>
const handleSingleSelectedGroupCase = (
    element: ExcalidrawElement,
    selectedGroupId: GroupId,
) =>
```

## File: packages/element/src/heading.ts
```typescript
import {
  invariant,
  isDevEnv,
  isTestEnv,
  type Bounds,
} from "@excalidraw/common";
import {
  pointFrom,
  pointFromVector,
  pointRotateRads,
  pointScaleFromOrigin,
  pointsEqual,
  triangleIncludesPoint,
  vectorCross,
  vectorFromPoint,
  vectorScale,
} from "@excalidraw/math";
import type {
  LocalPoint,
  GlobalPoint,
  Triangle,
  Vector,
} from "@excalidraw/math";
import { getCenterForBounds } from "./bounds";
import type { ExcalidrawBindableElement } from "./types";
⋮----
export type Heading = [1, 0] | [0, 1] | [-1, 0] | [0, -1];
export const vectorToHeading = (vec: Vector): Heading =>
export const headingForPoint = <P extends GlobalPoint | LocalPoint>(
  p: P,
  o: P,
)
export const headingForPointIsHorizontal = <P extends GlobalPoint | LocalPoint>(
  p: P,
  o: P,
)
export const compareHeading = (a: Heading, b: Heading)
export const headingIsHorizontal = (a: Heading)
export const headingIsVertical = (a: Heading)
const headingForPointFromDiamondElement = (
  element: Readonly<ExcalidrawBindableElement>,
  aabb: Readonly<Bounds>,
  point: Readonly<GlobalPoint>,
): Heading =>
export const headingForPointFromElement = <Point extends GlobalPoint>(
  element: Readonly<ExcalidrawBindableElement>,
  aabb: Readonly<Bounds>,
  p: Readonly<Point>,
): Heading =>
export const flipHeading = (h: Heading): Heading
```

## File: packages/element/src/image.ts
```typescript
import { MIME_TYPES, SVG_NS } from "@excalidraw/common";
import type {
  AppClassProperties,
  DataURL,
  BinaryFiles,
} from "@excalidraw/excalidraw/types";
import { isInitializedImageElement } from "./typeChecks";
import type {
  ExcalidrawElement,
  FileId,
  InitializedExcalidrawImageElement,
} from "./types";
export const loadHTMLImageElement = (dataURL: DataURL) =>
export const updateImageCache = async ({
  fileIds,
  files,
  imageCache,
}: {
  fileIds: FileId[];
  files: BinaryFiles;
  imageCache: AppClassProperties["imageCache"];
}) =>
export const getInitializedImageElements = (
  elements: readonly ExcalidrawElement[],
)
export const isHTMLSVGElement = (node: Node | null): node is SVGElement =>
export const normalizeSVG = (SVGString: string) =>
```

## File: packages/element/src/index.ts
```typescript
import { toIterable } from "@excalidraw/common";
import { isInvisiblySmallElement } from "./sizeHelpers";
import type {
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
  NonDeleted,
  ElementsMapOrArray,
} from "./types";
export const getSceneVersion = (elements: readonly ExcalidrawElement[])
export const hashElementsVersion = (elements: ElementsMapOrArray): number =>
export const hashString = (s: string): number =>
export const getVisibleElements = (elements: readonly ExcalidrawElement[])
export const getNonDeletedElements = <T extends ExcalidrawElement>(
  elements: readonly T[],
)
export const isNonDeletedElement = <T extends ExcalidrawElement>(
  element: T,
): element is NonDeleted<T>
```

## File: packages/element/src/linearElementEditor.ts
```typescript
import {
  pointCenter,
  pointFrom,
  pointRotateRads,
  pointsEqual,
  type GlobalPoint,
  type LocalPoint,
  pointDistance,
  vectorFromPoint,
  curveLength,
  curvePointAtLength,
} from "@excalidraw/math";
import { getCurvePathOps } from "@excalidraw/utils/shape";
import {
  DRAGGING_THRESHOLD,
  KEYS,
  shouldRotateWithDiscreteAngle,
  getGridPoint,
  invariant,
  isShallowEqual,
  getFeatureFlag,
} from "@excalidraw/common";
import {
  deconstructLinearOrFreeDrawElement,
  getSnapOutlineMidPoint,
  isPathALoop,
  moveArrowAboveBindable,
  projectFixedPointOntoDiagonal,
  type Store,
} from "@excalidraw/element";
import type { Radians } from "@excalidraw/math";
import type {
  AppState,
  PointerCoords,
  InteractiveCanvasAppState,
  AppClassProperties,
  NullableGridSize,
  Zoom,
} from "@excalidraw/excalidraw/types";
import type { Bounds } from "@excalidraw/common";
import {
  calculateFixedPointForNonElbowArrowBinding,
  getBindingStrategyForDraggingBindingElementEndpoints,
  isBindingEnabled,
  snapToMid,
  updateBoundPoint,
} from "./binding";
import {
  getElementAbsoluteCoords,
  getElementPointsCoords,
  getMinMaxXYFromCurvePathOps,
} from "./bounds";
import { headingIsHorizontal, vectorToHeading } from "./heading";
import { mutateElement } from "./mutateElement";
import { getBoundTextElement, handleBindTextResize } from "./textElement";
import { isArrowElement, isBindingElement, isElbowArrow } from "./typeChecks";
import { ShapeCache, toggleLinePolygonState } from "./shape";
import { getLockedLinearCursorAlignSize } from "./sizeHelpers";
import { isLineElement } from "./typeChecks";
import type { Scene } from "./Scene";
import type {
  NonDeleted,
  ExcalidrawLinearElement,
  ExcalidrawElement,
  ExcalidrawTextElementWithContainer,
  ElementsMap,
  NonDeletedSceneElementsMap,
  FixedPointBinding,
  FixedSegment,
  ExcalidrawElbowArrowElement,
  PointsPositionUpdates,
  NonDeletedExcalidrawElement,
  Ordered,
  ExcalidrawBindableElement,
} from "./types";
const getNormalizedPoints = ({
  points,
}: {
  points: ExcalidrawLinearElement["points"];
}):
type PointMoveOtherUpdates = {
  startBinding?: FixedPointBinding | null;
  endBinding?: FixedPointBinding | null;
  moveMidPointsWithElement?: boolean | null;
  suggestedBinding?: AppState["suggestedBinding"] | null;
};
export class LinearElementEditor
⋮----
constructor(
    element: NonDeleted<ExcalidrawLinearElement>,
    elementsMap: ElementsMap,
    isEditing: boolean = false,
)
⋮----
static getElement<T extends ExcalidrawLinearElement>(
    id: InstanceType<typeof LinearElementEditor>["elementId"],
    elementsMap: ElementsMap,
): T | null
static handleBoxSelection(
    event: PointerEvent,
    appState: AppState,
    setState: React.Component<any, AppState>["setState"],
    elementsMap: NonDeletedSceneElementsMap,
)
static handlePointerMove(
    event: PointerEvent,
    app: AppClassProperties,
    scenePointerX: number,
    scenePointerY: number,
    linearElementEditor: LinearElementEditor,
): Pick<AppState, "suggestedBinding" | "selectedLinearElement"> | null
static handlePointDragging(
    event: PointerEvent,
    app: AppClassProperties,
    scenePointerX: number,
    scenePointerY: number,
    linearElementEditor: LinearElementEditor,
): Pick<AppState, "suggestedBinding" | "selectedLinearElement"> | null
static handlePointerUp(
    event: PointerEvent,
    editingLinearElement: LinearElementEditor,
    appState: AppState,
    scene: Scene,
): LinearElementEditor
⋮----
static isSegmentTooShort<P extends GlobalPoint | LocalPoint>(
    element: NonDeleted<ExcalidrawLinearElement>,
    startPoint: P,
    endPoint: P,
    index: number,
    zoom: Zoom,
)
static getSegmentMidPoint(
    element: NonDeleted<ExcalidrawLinearElement>,
    index: number,
): GlobalPoint
static getSegmentMidPointIndex(
    linearElementEditor: LinearElementEditor,
    appState: AppState,
    midPoint: GlobalPoint,
    elementsMap: ElementsMap,
)
static handlePointerDown(
    event: React.PointerEvent<HTMLElement>,
    app: AppClassProperties,
    store: Store,
    scenePointer: { x: number; y: number },
    linearElementEditor: LinearElementEditor,
    scene: Scene,
):
static arePointsEqual<Point extends LocalPoint | GlobalPoint>(
    point1: Point | null,
    point2: Point | null,
)
static handlePointerMoveInEditMode(
    event: React.PointerEvent<HTMLCanvasElement>,
    scenePointerX: number,
    scenePointerY: number,
    app: AppClassProperties,
): LinearElementEditor | null
static getPointGlobalCoordinates(
    element: NonDeleted<ExcalidrawLinearElement>,
    p: LocalPoint,
    elementsMap: ElementsMap,
): GlobalPoint
static getPointsGlobalCoordinates(
    element: NonDeleted<ExcalidrawLinearElement>,
    elementsMap: ElementsMap,
): GlobalPoint[]
static getPointAtIndexGlobalCoordinates(
    element: NonDeleted<ExcalidrawLinearElement>,
    indexMaybeFromEnd: number,
    elementsMap: ElementsMap,
): GlobalPoint
static pointFromAbsoluteCoords(
    element: NonDeleted<ExcalidrawLinearElement>,
    absoluteCoords: GlobalPoint,
    elementsMap: ElementsMap,
): LocalPoint
static getPointIndexUnderCursor(
    element: NonDeleted<ExcalidrawLinearElement>,
    elementsMap: ElementsMap,
    zoom: AppState["zoom"],
    x: number,
    y: number,
)
static createPointAt(
    element: NonDeleted<ExcalidrawLinearElement>,
    elementsMap: ElementsMap,
    scenePointerX: number,
    scenePointerY: number,
    gridSize: NullableGridSize,
): LocalPoint
static getNormalizeElementPointsAndCoords(element: ExcalidrawLinearElement)
static duplicateSelectedPoints(appState: AppState, scene: Scene): AppState
static deletePoints(
    element: NonDeleted<ExcalidrawLinearElement>,
    app: AppClassProperties,
    pointIndices: readonly number[],
)
static addPoints(
    element: NonDeleted<ExcalidrawLinearElement>,
    scene: Scene,
    addedPoints: LocalPoint[],
)
static movePoints(
    element: NonDeleted<ExcalidrawLinearElement>,
    scene: Scene,
    pointUpdates: PointsPositionUpdates,
    otherUpdates?: {
      startBinding?: FixedPointBinding | null;
      endBinding?: FixedPointBinding | null;
      moveMidPointsWithElement?: boolean | null;
    },
    options?: {
      isBindingEnabled?: boolean;
      isMidpointSnappingEnabled?: boolean;
    },
)
static shouldAddMidpoint(
    linearElementEditor: LinearElementEditor,
    pointerCoords: PointerCoords,
    appState: AppState,
    elementsMap: ElementsMap,
)
static addMidpoint(
    linearElementEditor: LinearElementEditor,
    pointerCoords: PointerCoords,
    app: AppClassProperties,
    snapToGrid: boolean,
    scene: Scene,
)
private static _updatePoints(
    element: NonDeleted<ExcalidrawLinearElement>,
    scene: Scene,
    nextPoints: readonly LocalPoint[],
    offsetX: number,
    offsetY: number,
    otherUpdates?: {
      startBinding?: FixedPointBinding | null;
      endBinding?: FixedPointBinding | null;
    },
    options?: {
      isDragging?: boolean;
      zoom?: AppState["zoom"];
      sceneElementsMap?: NonDeletedSceneElementsMap;
      isBindingEnabled?: boolean;
      isMidpointSnappingEnabled?: boolean;
    },
)
private static _getShiftLockedDelta(
    element: NonDeleted<ExcalidrawLinearElement>,
    elementsMap: ElementsMap,
    referencePoint: LocalPoint,
    scenePointer: GlobalPoint,
    gridSize: NullableGridSize,
    customLineAngle?: number,
)
⋮----
static moveFixedSegment(
    linearElement: LinearElementEditor,
    index: number,
    x: number,
    y: number,
    scene: Scene,
  ): Pick<
    LinearElementEditor,
    "segmentMidPointHoveredCoords" | "initialState"
  > {
    const elementsMap = scene.getNonDeletedElementsMap();
static deleteFixedSegment(
    element: ExcalidrawElbowArrowElement,
    scene: Scene,
    index: number,
): void
⋮----
const normalizeSelectedPoints = (
  points: (number | null)[],
): number[] | null =>
const pointDraggingUpdates = (
  selectedPointsIndices: readonly number[],
  deltaX: number,
  deltaY: number,
  scenePointerX: number,
  scenePointerY: number,
  elementsMap: NonDeletedSceneElementsMap,
  element: NonDeleted<ExcalidrawLinearElement>,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  app: AppClassProperties,
  angleLocked: boolean,
  altKey: boolean,
  linearElementEditor: LinearElementEditor,
):
const determineCustomLinearAngle = (
  pivotPoint: LocalPoint,
  draggedPoint: LocalPoint,
)
```

## File: packages/element/src/mutateElement.ts
```typescript
import {
  getSizeFromPoints,
  randomInteger,
  getUpdatedTimestamp,
} from "@excalidraw/common";
import type { Radians } from "@excalidraw/math";
import type { Mutable } from "@excalidraw/common/utility-types";
import { ShapeCache } from "./shape";
import { updateElbowArrowPoints } from "./elbowArrow";
import { isElbowArrow } from "./typeChecks";
import type {
  ElementsMap,
  ExcalidrawElbowArrowElement,
  ExcalidrawElement,
  NonDeletedSceneElementsMap,
} from "./types";
export type ElementUpdate<TElement extends ExcalidrawElement> = Omit<
  Partial<TElement>,
  "id" | "updated"
>;
export const mutateElement = <TElement extends Mutable<ExcalidrawElement>>(
  element: TElement,
  elementsMap: ElementsMap,
  updates: ElementUpdate<TElement>,
  options?: {
    isDragging?: boolean;
    isBindingEnabled?: boolean;
    isMidpointSnappingEnabled?: boolean;
  },
) =>
export const newElementWith = <TElement extends ExcalidrawElement>(
  element: TElement,
  updates: ElementUpdate<TElement>,
  force = false,
): TElement =>
export const bumpVersion = <T extends Mutable<ExcalidrawElement>>(
  element: T,
  version?: ExcalidrawElement["version"],
) =>
```

## File: packages/element/src/newElement.ts
```typescript
import {
  DEFAULT_ELEMENT_PROPS,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_VERTICAL_ALIGN,
  VERTICAL_ALIGN,
  randomInteger,
  randomId,
  getFontString,
  getUpdatedTimestamp,
  getLineHeight,
} from "@excalidraw/common";
import type { Radians } from "@excalidraw/math";
import type { MarkOptional, Merge } from "@excalidraw/common/utility-types";
import {
  getElementAbsoluteCoords,
  getResizedElementAbsoluteCoords,
} from "./bounds";
import { newElementWith } from "./mutateElement";
import { getBoundTextMaxWidth } from "./textElement";
import { normalizeText, measureText } from "./textMeasurements";
import { wrapText } from "./textWrapping";
import { isLineElement } from "./typeChecks";
import type {
  ExcalidrawElement,
  ExcalidrawImageElement,
  ExcalidrawTextElement,
  ExcalidrawLinearElement,
  ExcalidrawGenericElement,
  NonDeleted,
  TextAlign,
  VerticalAlign,
  Arrowhead,
  ExcalidrawFreeDrawElement,
  FontFamilyValues,
  ExcalidrawTextContainer,
  ExcalidrawFrameElement,
  ExcalidrawEmbeddableElement,
  ExcalidrawMagicFrameElement,
  ExcalidrawIframeElement,
  ElementsMap,
  ExcalidrawArrowElement,
  ExcalidrawElbowArrowElement,
  ExcalidrawLineElement,
} from "./types";
export type ElementConstructorOpts = MarkOptional<
  Omit<ExcalidrawGenericElement, "id" | "type" | "isDeleted" | "updated">,
  | "width"
  | "height"
  | "angle"
  | "groupIds"
  | "frameId"
  | "index"
  | "boundElements"
  | "seed"
  | "version"
  | "versionNonce"
  | "link"
  | "strokeStyle"
  | "fillStyle"
  | "strokeColor"
  | "backgroundColor"
  | "roughness"
  | "strokeWidth"
  | "roundness"
  | "locked"
  | "opacity"
  | "customData"
>;
const _newElementBase = <T extends ExcalidrawElement>(
  type: T["type"],
  {
    x,
    y,
    strokeColor = DEFAULT_ELEMENT_PROPS.strokeColor,
    backgroundColor = DEFAULT_ELEMENT_PROPS.backgroundColor,
    fillStyle = DEFAULT_ELEMENT_PROPS.fillStyle,
    strokeWidth = DEFAULT_ELEMENT_PROPS.strokeWidth,
    strokeStyle = DEFAULT_ELEMENT_PROPS.strokeStyle,
    roughness = DEFAULT_ELEMENT_PROPS.roughness,
    opacity = DEFAULT_ELEMENT_PROPS.opacity,
    width = 0,
    height = 0,
    angle = 0 as Radians,
    groupIds = [],
    frameId = null,
    index = null,
    roundness = null,
    boundElements = null,
    link = null,
    locked = DEFAULT_ELEMENT_PROPS.locked,
    ...rest
  }: ElementConstructorOpts & Omit<Partial<ExcalidrawGenericElement>, "type">,
) =>
export const newElement = (
  opts: {
    type: ExcalidrawGenericElement["type"];
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawGenericElement>
export const newEmbeddableElement = (
  opts: {
    type: "embeddable";
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawEmbeddableElement> =>
export const newIframeElement = (
  opts: {
    type: "iframe";
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawIframeElement> =>
export const newFrameElement = (
  opts: {
    name?: string;
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawFrameElement> =>
export const newMagicFrameElement = (
  opts: {
    name?: string;
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawMagicFrameElement> =>
const getTextElementPositionOffsets = (
  opts: {
    textAlign: ExcalidrawTextElement["textAlign"];
    verticalAlign: ExcalidrawTextElement["verticalAlign"];
  },
  metrics: {
    width: number;
    height: number;
  },
) =>
export const newTextElement = (
  opts: {
    text: string;
    originalText?: string;
    fontSize?: number;
    fontFamily?: FontFamilyValues;
    textAlign?: TextAlign;
    verticalAlign?: VerticalAlign;
    containerId?: ExcalidrawTextContainer["id"] | null;
    lineHeight?: ExcalidrawTextElement["lineHeight"];
    autoResize?: ExcalidrawTextElement["autoResize"];
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawTextElement> =>
const getAdjustedDimensions = (
  element: ExcalidrawTextElement,
  elementsMap: ElementsMap,
  nextText: string,
):
const adjustXYWithRotation = (
  sides: {
    n?: boolean;
    e?: boolean;
    s?: boolean;
    w?: boolean;
  },
  x: number,
  y: number,
  angle: number,
  deltaX1: number,
  deltaY1: number,
  deltaX2: number,
  deltaY2: number,
): [number, number] =>
export const refreshTextDimensions = (
  textElement: ExcalidrawTextElement,
  container: ExcalidrawTextContainer | null,
  elementsMap: ElementsMap,
  text = textElement.text,
) =>
export const newFreeDrawElement = (
  opts: {
    type: "freedraw";
    points?: ExcalidrawFreeDrawElement["points"];
    simulatePressure: boolean;
    pressures?: ExcalidrawFreeDrawElement["pressures"];
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawFreeDrawElement> =>
export const newLinearElement = (
  opts: {
    type: ExcalidrawLinearElement["type"];
    points?: ExcalidrawLinearElement["points"];
    polygon?: ExcalidrawLineElement["polygon"];
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawLinearElement> =>
export const newArrowElement = <T extends boolean>(
  opts: {
    type: ExcalidrawArrowElement["type"];
    startArrowhead?: Arrowhead | null;
    endArrowhead?: Arrowhead | null;
    points?: ExcalidrawArrowElement["points"];
    elbowed?: T;
    fixedSegments?: ExcalidrawElbowArrowElement["fixedSegments"] | null;
  } & ElementConstructorOpts,
): T extends true
  ? NonDeleted<ExcalidrawElbowArrowElement>
  : NonDeleted<ExcalidrawArrowElement> => {
if (opts.elbowed)
export const newImageElement = (
  opts: {
    type: ExcalidrawImageElement["type"];
    status?: ExcalidrawImageElement["status"];
    fileId?: ExcalidrawImageElement["fileId"];
    scale?: ExcalidrawImageElement["scale"];
    crop?: ExcalidrawImageElement["crop"];
  } & ElementConstructorOpts,
): NonDeleted<ExcalidrawImageElement> =>
```

## File: packages/element/src/positionElementsOnGrid.ts
```typescript
import { getCommonBounds } from "./bounds";
import { type ElementUpdate, newElementWith } from "./mutateElement";
import type { ExcalidrawElement } from "./types";
export const positionElementsOnGrid = <TElement extends ExcalidrawElement>(
  elements: TElement[] | TElement[][],
  centerX: number,
  centerY: number,
  padding = 50,
): TElement[] =>
```

## File: packages/element/src/renderElement.ts
```typescript
import rough from "roughjs/bin/rough";
import {
  type GlobalPoint,
  isRightAngleRads,
  lineSegment,
  pointFrom,
  pointRotateRads,
  type Radians,
} from "@excalidraw/math";
import {
  BOUND_TEXT_PADDING,
  DEFAULT_REDUCED_GLOBAL_ALPHA,
  ELEMENT_READY_TO_ERASE_OPACITY,
  FRAME_STYLE,
  DARK_THEME_FILTER,
  MIME_TYPES,
  THEME,
  distance,
  getFontString,
  isRTL,
  getVerticalOffset,
  invariant,
  applyDarkModeFilter,
  isSafari,
} from "@excalidraw/common";
import type {
  AppState,
  StaticCanvasAppState,
  Zoom,
  InteractiveCanvasAppState,
  ElementsPendingErasure,
  PendingExcalidrawElements,
  NormalizedZoomValue,
} from "@excalidraw/excalidraw/types";
import type {
  StaticCanvasRenderConfig,
  RenderableElementsMap,
  InteractiveCanvasRenderConfig,
} from "@excalidraw/excalidraw/scene/types";
import { getElementAbsoluteCoords, getElementBounds } from "./bounds";
import { getUncroppedImageElement } from "./cropElement";
import { LinearElementEditor } from "./linearElementEditor";
import {
  getBoundTextElement,
  getContainerCoords,
  getContainerElement,
  getBoundTextMaxHeight,
  getBoundTextMaxWidth,
} from "./textElement";
import { getLineHeightInPx } from "./textMeasurements";
import {
  isTextElement,
  isLinearElement,
  isFreeDrawElement,
  isInitializedImageElement,
  isArrowElement,
  hasBoundTextElement,
  isMagicFrameElement,
  isImageElement,
} from "./typeChecks";
import { getContainingFrame } from "./frame";
import { getCornerRadius } from "./utils";
import { ShapeCache } from "./shape";
import type {
  ExcalidrawElement,
  ExcalidrawTextElement,
  NonDeletedExcalidrawElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawImageElement,
  ExcalidrawTextElementWithContainer,
  ExcalidrawFrameLikeElement,
  NonDeletedSceneElementsMap,
  ElementsMap,
} from "./types";
import type { RoughCanvas } from "roughjs/bin/canvas";
const isPendingImageElement = (
  element: ExcalidrawElement,
  renderConfig: StaticCanvasRenderConfig,
)
const getCanvasPadding = (element: ExcalidrawElement) =>
export const getRenderOpacity = (
  element: ExcalidrawElement,
  containingFrame: ExcalidrawFrameLikeElement | null,
  elementsPendingErasure: ElementsPendingErasure,
  pendingNodes: Readonly<PendingExcalidrawElements> | null,
  globalAlpha: number = 1,
) =>
export interface ExcalidrawElementWithCanvas {
  element: ExcalidrawElement | ExcalidrawTextElement;
  canvas: HTMLCanvasElement;
  theme: AppState["theme"];
  scale: number;
  angle: number;
  zoomValue: AppState["zoom"]["value"];
  canvasOffsetX: number;
  canvasOffsetY: number;
  boundTextElementVersion: number | null;
  imageCrop: ExcalidrawImageElement["crop"] | null;
  containingFrameOpacity: number;
  boundTextCanvas: HTMLCanvasElement;
}
const cappedElementCanvasSize = (
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  zoom: Zoom,
):
const generateElementCanvas = (
  element: NonDeletedExcalidrawElement,
  elementsMap: NonDeletedSceneElementsMap,
  zoom: Zoom,
  renderConfig: StaticCanvasRenderConfig,
  appState: StaticCanvasAppState | InteractiveCanvasAppState,
): ExcalidrawElementWithCanvas | null =>
⋮----
: ({ src: "" } as HTMLImageElement); // mock image element outside of browser
⋮----
: ({ src: "" } as HTMLImageElement); // mock image element outside of browser
⋮----
const drawImagePlaceholder = (
  element: ExcalidrawImageElement,
  context: CanvasRenderingContext2D,
  theme: StaticCanvasRenderConfig["theme"],
) =>
const drawElementOnCanvas = (
  element: NonDeletedExcalidrawElement,
  rc: RoughCanvas,
  context: CanvasRenderingContext2D,
  renderConfig: StaticCanvasRenderConfig,
) =>
⋮----
const generateElementWithCanvas = (
  element: NonDeletedExcalidrawElement,
  elementsMap: NonDeletedSceneElementsMap,
  renderConfig: StaticCanvasRenderConfig,
  appState: StaticCanvasAppState | InteractiveCanvasAppState,
) =>
const drawElementFromCanvas = (
  elementWithCanvas: ExcalidrawElementWithCanvas,
  context: CanvasRenderingContext2D,
  renderConfig: StaticCanvasRenderConfig,
  appState: StaticCanvasAppState | InteractiveCanvasAppState,
  allElementsMap: NonDeletedSceneElementsMap,
) =>
export const renderSelectionElement = (
  element: NonDeletedExcalidrawElement,
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  selectionColor: InteractiveCanvasRenderConfig["selectionColor"],
) =>
export const renderElement = (
  element: NonDeletedExcalidrawElement,
  elementsMap: RenderableElementsMap,
  allElementsMap: NonDeletedSceneElementsMap,
  rc: RoughCanvas,
  context: CanvasRenderingContext2D,
  renderConfig: StaticCanvasRenderConfig,
  appState: StaticCanvasAppState | InteractiveCanvasAppState,
) =>
export function getFreedrawOutlineAsSegments(
  element: ExcalidrawFreeDrawElement,
  points: [number, number][],
  elementsMap: ElementsMap,
)
```

## File: packages/element/src/resizeElements.ts
```typescript
import {
  pointCenter,
  normalizeRadians,
  pointFrom,
  pointRotateRads,
  type Radians,
  type LocalPoint,
} from "@excalidraw/math";
import {
  MIN_FONT_SIZE,
  SHIFT_LOCKING_ANGLE,
  rescalePoints,
  getFontString,
} from "@excalidraw/common";
import type { GlobalPoint } from "@excalidraw/math";
import type { PointerDownState } from "@excalidraw/excalidraw/types";
import type { Mutable } from "@excalidraw/common/utility-types";
import {
  getArrowLocalFixedPoints,
  unbindBindingElement,
  updateBoundElements,
} from "./binding";
import {
  getElementAbsoluteCoords,
  getCommonBounds,
  getResizedElementAbsoluteCoords,
  getCommonBoundingBox,
  getElementBounds,
} from "./bounds";
import { LinearElementEditor } from "./linearElementEditor";
import {
  getBoundTextElement,
  getBoundTextElementId,
  getContainerElement,
  handleBindTextResize,
  getBoundTextMaxWidth,
  computeBoundTextPosition,
} from "./textElement";
import {
  getMinTextElementWidth,
  measureText,
  getApproxMinLineWidth,
  getApproxMinLineHeight,
} from "./textMeasurements";
import { wrapText } from "./textWrapping";
import {
  isArrowElement,
  isBindingElement,
  isBoundToContainer,
  isElbowArrow,
  isFrameLikeElement,
  isFreeDrawElement,
  isImageElement,
  isLinearElement,
  isTextElement,
} from "./typeChecks";
import { isInGroup } from "./groups";
import type { Scene } from "./Scene";
import type { BoundingBox } from "./bounds";
import type {
  MaybeTransformHandleType,
  TransformHandleDirection,
} from "./transformHandles";
import type {
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
  NonDeletedExcalidrawElement,
  NonDeleted,
  ExcalidrawElement,
  ExcalidrawTextElementWithContainer,
  ExcalidrawImageElement,
  ElementsMap,
  ExcalidrawElbowArrowElement,
  ExcalidrawArrowElement,
} from "./types";
import type { ElementUpdate } from "./mutateElement";
export const transformElements = (
  originalElements: PointerDownState["originalElements"],
  transformHandleType: MaybeTransformHandleType,
  selectedElements: readonly NonDeletedExcalidrawElement[],
  scene: Scene,
  shouldRotateWithDiscreteAngle: boolean,
  shouldResizeFromCenter: boolean,
  shouldMaintainAspectRatio: boolean,
  pointerX: number,
  pointerY: number,
  centerX: number,
  centerY: number,
): boolean =>
const rotateSingleElement = (
  element: NonDeletedExcalidrawElement,
  scene: Scene,
  pointerX: number,
  pointerY: number,
  shouldRotateWithDiscreteAngle: boolean,
) =>
export const rescalePointsInElement = (
  element: NonDeletedExcalidrawElement,
  width: number,
  height: number,
  normalizePoints: boolean,
)
export const measureFontSizeFromWidth = (
  element: NonDeleted<ExcalidrawTextElement>,
  elementsMap: ElementsMap,
  nextWidth: number,
):
export const resizeSingleTextElement = (
  origElement: NonDeleted<ExcalidrawTextElement>,
  element: NonDeleted<ExcalidrawTextElement>,
  scene: Scene,
  transformHandleType: TransformHandleDirection,
  shouldResizeFromCenter: boolean,
  nextWidth: number,
  nextHeight: number,
) =>
const rotateMultipleElements = (
  originalElements: PointerDownState["originalElements"],
  elements: readonly NonDeletedExcalidrawElement[],
  scene: Scene,
  pointerX: number,
  pointerY: number,
  shouldRotateWithDiscreteAngle: boolean,
  centerX: number,
  centerY: number,
) =>
export const getResizeOffsetXY = (
  transformHandleType: MaybeTransformHandleType,
  selectedElements: NonDeletedExcalidrawElement[],
  elementsMap: ElementsMap,
  x: number,
  y: number,
): [number, number] =>
export const getResizeArrowDirection = (
  transformHandleType: MaybeTransformHandleType,
  element: NonDeleted<ExcalidrawLinearElement>,
): "origin" | "end" =>
type ResizeAnchor =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "west-side"
  | "north-side"
  | "east-side"
  | "south-side"
  | "center";
const getResizeAnchor = (
  handleDirection: TransformHandleDirection,
  shouldMaintainAspectRatio: boolean,
  shouldResizeFromCenter: boolean,
): ResizeAnchor =>
const getResizedOrigin = (
  prevOrigin: GlobalPoint,
  prevWidth: number,
  prevHeight: number,
  newWidth: number,
  newHeight: number,
  angle: number,
  handleDirection: TransformHandleDirection,
  shouldMaintainAspectRatio: boolean,
  shouldResizeFromCenter: boolean,
):
export const resizeSingleElement = (
  nextWidth: number,
  nextHeight: number,
  latestElement: ExcalidrawElement,
  origElement: ExcalidrawElement,
  originalElementsMap: ElementsMap,
  scene: Scene,
  handleDirection: TransformHandleDirection,
  {
    shouldInformMutation = true,
    shouldMaintainAspectRatio = false,
    shouldResizeFromCenter = false,
  }: {
    shouldMaintainAspectRatio?: boolean;
    shouldResizeFromCenter?: boolean;
    shouldInformMutation?: boolean;
  } = {},
) =>
const getNextSingleWidthAndHeightFromPointer = (
  latestElement: ExcalidrawElement,
  origElement: ExcalidrawElement,
  handleDirection: TransformHandleDirection,
  pointerX: number,
  pointerY: number,
  {
    shouldMaintainAspectRatio = false,
    shouldResizeFromCenter = false,
  }: {
    shouldMaintainAspectRatio?: boolean;
    shouldResizeFromCenter?: boolean;
  } = {},
) =>
const getNextMultipleWidthAndHeightFromPointer = (
  selectedElements: readonly NonDeletedExcalidrawElement[],
  originalElementsMap: ElementsMap,
  elementsMap: ElementsMap,
  handleDirection: TransformHandleDirection,
  pointerX: number,
  pointerY: number,
  {
    shouldMaintainAspectRatio = false,
    shouldResizeFromCenter = false,
  }: {
    shouldResizeFromCenter?: boolean;
    shouldMaintainAspectRatio?: boolean;
  } = {},
) =>
export const resizeMultipleElements = (
  selectedElements: readonly NonDeletedExcalidrawElement[],
  elementsMap: ElementsMap,
  handleDirection: TransformHandleDirection,
  scene: Scene,
  originalElementsMap: ElementsMap,
  {
    shouldMaintainAspectRatio = false,
    shouldResizeFromCenter = false,
    flipByX = false,
    flipByY = false,
    nextHeight,
    nextWidth,
    originalBoundingBox,
  }: {
    nextWidth?: number;
    nextHeight?: number;
    shouldMaintainAspectRatio?: boolean;
    shouldResizeFromCenter?: boolean;
    flipByX?: boolean;
    flipByY?: boolean;
    originalBoundingBox?: BoundingBox;
  } = {},
) =>
```

## File: packages/element/src/resizeTest.ts
```typescript
import {
  pointFrom,
  pointOnLineSegment,
  pointRotateRads,
  type Radians,
} from "@excalidraw/math";
import {
  SIDE_RESIZING_THRESHOLD,
  type EditorInterface,
} from "@excalidraw/common";
import type { GlobalPoint, LineSegment, LocalPoint } from "@excalidraw/math";
import type { AppState, Zoom } from "@excalidraw/excalidraw/types";
import type { Bounds } from "@excalidraw/common";
import { getElementAbsoluteCoords } from "./bounds";
import {
  getTransformHandlesFromCoords,
  getTransformHandles,
  getOmitSidesForEditorInterface,
  canResizeFromSides,
} from "./transformHandles";
import { isImageElement, isLinearElement } from "./typeChecks";
import type {
  TransformHandleType,
  TransformHandle,
  MaybeTransformHandleType,
} from "./transformHandles";
import type {
  ExcalidrawElement,
  PointerType,
  NonDeletedExcalidrawElement,
  ElementsMap,
} from "./types";
const isInsideTransformHandle = (
  transformHandle: TransformHandle,
  x: number,
  y: number,
)
export const resizeTest = <Point extends GlobalPoint | LocalPoint>(
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  appState: AppState,
  x: number,
  y: number,
  zoom: Zoom,
  pointerType: PointerType,
  editorInterface: EditorInterface,
): MaybeTransformHandleType =>
export const getElementWithTransformHandleType = (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: AppState,
  scenePointerX: number,
  scenePointerY: number,
  zoom: Zoom,
  pointerType: PointerType,
  elementsMap: ElementsMap,
  editorInterface: EditorInterface,
) =>
export const getTransformHandleTypeFromCoords = <
  Point extends GlobalPoint | LocalPoint,
>(
  [x1, y1, x2, y2]: Bounds,
  scenePointerX: number,
  scenePointerY: number,
  zoom: Zoom,
  pointerType: PointerType,
  editorInterface: EditorInterface,
): MaybeTransformHandleType =>
⋮----
const rotateResizeCursor = (cursor: string, angle: number) =>
export const getCursorForResizingElement = (resizingElement: {
  element?: ExcalidrawElement;
  transformHandleType: MaybeTransformHandleType;
}): string =>
const getSelectionBorders = <Point extends LocalPoint | GlobalPoint>(
  [x1, y1]: Point,
  [x2, y2]: Point,
  center: Point,
  angle: Radians,
) =>
```

## File: packages/element/src/Scene.ts
```typescript
import throttle from "lodash.throttle";
import {
  randomInteger,
  arrayToMap,
  toBrandedType,
  isDevEnv,
  isTestEnv,
  toArray,
} from "@excalidraw/common";
import { isNonDeletedElement } from "@excalidraw/element";
import { isFrameLikeElement } from "@excalidraw/element";
import { getElementsInGroup } from "@excalidraw/element";
import {
  syncInvalidIndices,
  syncMovedIndices,
  validateFractionalIndices,
} from "@excalidraw/element";
import { getSelectedElements } from "@excalidraw/element";
import { mutateElement, type ElementUpdate } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
  NonDeleted,
  ExcalidrawFrameLikeElement,
  ElementsMapOrArray,
  SceneElementsMap,
  NonDeletedSceneElementsMap,
  OrderedExcalidrawElement,
  Ordered,
} from "@excalidraw/element/types";
import type {
  Assert,
  Mutable,
  SameType,
} from "@excalidraw/common/utility-types";
import type { AppState } from "../../excalidraw/types";
type SceneStateCallback = () => void;
type SceneStateCallbackRemover = () => void;
type SelectionHash = string & { __brand: "selectionHash" };
const getNonDeletedElements = <T extends ExcalidrawElement>(
  allElements: readonly T[],
) =>
⋮----
const hashSelectionOpts = (
  opts: Parameters<InstanceType<typeof Scene>["getSelectedElements"]>[0],
) =>
⋮----
type HashableKeys = Omit<typeof opts, "selectedElementIds" | "elements">;
type _ = Assert<
    SameType<
      Required<HashableKeys>,
      Pick<Required<HashableKeys>, typeof keys[number]>
    >
  >;
⋮----
// ideally this would be a branded type but it'd be insanely hard to work with
// in our codebase
export type ExcalidrawElementsIncludingDeleted = readonly ExcalidrawElement[];
export class Scene
⋮----
// ---------------------------------------------------------------------------
// instance methods/props
// ---------------------------------------------------------------------------
⋮----
// ideally all elements within the scene should be wrapped around with `Ordered` type, but right now there is no real benefit doing so
⋮----
getSceneNonce()
getNonDeletedElementsMap()
getElementsIncludingDeleted()
getElementsMapIncludingDeleted()
getNonDeletedElements()
getFramesIncludingDeleted()
constructor(
    elements: ElementsMapOrArray | null = null,
    options?: {
      skipValidation?: true;
    },
)
getSelectedElements(opts: {
    selectedElementIds: AppState["selectedElementIds"];
    elements?: ElementsMapOrArray;
    includeBoundTextElement?: boolean;
    includeElementsInFrames?: boolean;
}): NonDeleted<ExcalidrawElement>[]
getNonDeletedFramesLikes(): readonly NonDeleted<ExcalidrawFrameLikeElement>[]
getElement<T extends ExcalidrawElement>(id: T["id"]): T | null
getNonDeletedElement(
    id: ExcalidrawElement["id"],
): NonDeleted<ExcalidrawElement> | null
mapElements(
    iteratee: (element: ExcalidrawElement) => ExcalidrawElement,
): boolean
replaceAllElements(
    nextElements: ElementsMapOrArray,
    options?: {
      skipValidation?: true;
    },
)
triggerUpdate()
onUpdate(cb: SceneStateCallback): SceneStateCallbackRemover
destroy()
insertElementAtIndex(element: ExcalidrawElement, index: number)
insertElementsAtIndex(elements: ExcalidrawElement[], index: number)
⋮----
getElementIndex(elementId: string)
⋮----
mutateElement<TElement extends Mutable<ExcalidrawElement>>(
    element: TElement,
    updates: ElementUpdate<TElement>,
    options: {
      informMutation: boolean;
      isDragging: boolean;
      isBindingEnabled?: boolean;
      isMidpointSnappingEnabled?: boolean;
    } = {
      informMutation: true,
      isDragging: false,
    },
)
```

## File: packages/element/src/selection.ts
```typescript
import { arrayToMap, isShallowEqual } from "@excalidraw/common";
import type {
  AppState,
  InteractiveCanvasAppState,
} from "@excalidraw/excalidraw/types";
import { getElementAbsoluteCoords, getElementBounds } from "./bounds";
import { isElementInViewport } from "./sizeHelpers";
import {
  isBoundToContainer,
  isFrameLikeElement,
  isLinearElement,
  isTextElement,
} from "./typeChecks";
import {
  elementOverlapsWithFrame,
  getContainingFrame,
  getFrameChildren,
} from "./frame";
import { LinearElementEditor } from "./linearElementEditor";
import { selectGroupsForSelectedElements } from "./groups";
import type {
  ElementsMap,
  ElementsMapOrArray,
  ExcalidrawElement,
  NonDeleted,
  NonDeletedExcalidrawElement,
} from "./types";
export const excludeElementsInFramesFromSelection = <
  T extends ExcalidrawElement,
>(
  selectedElements: readonly T[],
) =>
export const getElementsWithinSelection = (
  elements: readonly NonDeletedExcalidrawElement[],
  selection: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  excludeElementsInFrames: boolean = true,
) =>
export const getVisibleAndNonSelectedElements = (
  elements: readonly NonDeletedExcalidrawElement[],
  selectedElements: readonly NonDeletedExcalidrawElement[],
  appState: AppState,
  elementsMap: ElementsMap,
) =>
⋮----
const ret = (
    elements: readonly NonDeletedExcalidrawElement[],
    appState: Pick<AppState, "selectedElementIds">,
): boolean =>
⋮----
export const getSelectedElements = (
  elements: ElementsMapOrArray,
  appState: Pick<InteractiveCanvasAppState, "selectedElementIds">,
  opts?: {
    includeBoundTextElement?: boolean;
    includeElementsInFrames?: boolean;
  },
) =>
export const getTargetElements = (
  elements: ElementsMapOrArray,
  appState: Pick<
    AppState,
    "selectedElementIds" | "editingTextElement" | "newElement"
  >,
)
export const makeNextSelectedElementIds = (
  nextSelectedElementIds: AppState["selectedElementIds"],
  prevState: Pick<AppState, "selectedElementIds">,
) =>
const _getLinearElementEditor = (
  targetElements: readonly ExcalidrawElement[],
  allElements: readonly NonDeletedExcalidrawElement[],
) =>
export const getSelectionStateForElements = (
  targetElements: readonly ExcalidrawElement[],
  allElements: readonly NonDeletedExcalidrawElement[],
  appState: AppState,
) =>
export const getActiveTextElement = (
  selectedElements: readonly NonDeleted<ExcalidrawElement>[],
  appState: Pick<AppState, "editingTextElement">,
) =>
```

## File: packages/element/src/shape.ts
```typescript
import { simplify } from "points-on-curve";
import { getStroke } from "perfect-freehand";
import {
  type GeometricShape,
  getClosedCurveShape,
  getCurveShape,
  getEllipseShape,
  getFreedrawShape,
  getPolygonShape,
} from "@excalidraw/utils/shape";
import {
  pointFrom,
  pointDistance,
  type LocalPoint,
  pointRotateRads,
} from "@excalidraw/math";
import {
  ROUGHNESS,
  THEME,
  isTransparent,
  assertNever,
  COLOR_PALETTE,
  LINE_POLYGON_POINT_MERGE_DISTANCE,
  applyDarkModeFilter,
} from "@excalidraw/common";
import { RoughGenerator } from "roughjs/bin/generator";
import type { GlobalPoint } from "@excalidraw/math";
import type { Mutable } from "@excalidraw/common/utility-types";
import type {
  AppState,
  EmbedsValidationStatus,
} from "@excalidraw/excalidraw/types";
import type {
  ElementShape,
  ElementShapes,
  SVGPathString,
} from "@excalidraw/excalidraw/scene/types";
import { elementWithCanvasCache } from "./renderElement";
import {
  canBecomePolygon,
  isElbowArrow,
  isEmbeddableElement,
  isIframeElement,
  isIframeLikeElement,
  isLinearElement,
} from "./typeChecks";
import { getCornerRadius, isPathALoop } from "./utils";
import { headingForPointIsHorizontal } from "./heading";
import { canChangeRoundness } from "./comparisons";
import {
  getArrowheadPoints,
  getCenterForBounds,
  getDiamondPoints,
  getElementAbsoluteCoords,
} from "./bounds";
import { shouldTestInside } from "./collision";
import type {
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
  ExcalidrawSelectionElement,
  ExcalidrawLinearElement,
  ExcalidrawFreeDrawElement,
  ElementsMap,
  ExcalidrawLineElement,
  Arrowhead,
} from "./types";
import type { Drawable, Options } from "roughjs/bin/core";
import type { Point as RoughPoint } from "roughjs/bin/geometry";
export class ShapeCache
const getDashArrayDashed = (strokeWidth: number)
const getDashArrayDotted = (strokeWidth: number)
function adjustRoughness(element: ExcalidrawElement): number
export const generateRoughOptions = (
  element: ExcalidrawElement,
  continuousPath = false,
  isDarkMode: boolean = false,
): Options =>
const modifyIframeLikeForRoughOptions = (
  element: NonDeletedExcalidrawElement,
  isExporting: boolean,
  embedsValidationStatus: EmbedsValidationStatus | null,
) =>
const generateArrowheadCardinalityOne = (
  generator: RoughGenerator,
  arrowheadPoints: number[] | null,
  lineOptions: Options,
) =>
const generateArrowheadLinesToTip = (
  generator: RoughGenerator,
  arrowheadPoints: number[] | null,
  lineOptions: Options,
) =>
const getArrowheadLineOptions = (
  element: ExcalidrawLinearElement,
  options: Options,
) =>
const generateArrowheadOutlineCircle = (
  generator: RoughGenerator,
  options: Options,
  strokeColor: string,
  arrowheadPoints: number[] | null,
  fill: string,
  diameterScale = 1,
) =>
const getArrowheadShapes = (
  element: ExcalidrawLinearElement,
  shape: Drawable[],
  position: "start" | "end",
  arrowhead: Arrowhead,
  generator: RoughGenerator,
  options: Options,
  canvasBackgroundColor: string,
  isDarkMode: boolean,
) =>
export const generateLinearCollisionShape = (
  element: ExcalidrawLinearElement | ExcalidrawFreeDrawElement,
) =>
const _generateElementShape = (
  element: Exclude<NonDeletedExcalidrawElement, ExcalidrawSelectionElement>,
  generator: RoughGenerator,
  {
    isExporting,
    canvasBackgroundColor,
    embedsValidationStatus,
    theme,
  }: {
    isExporting: boolean;
    canvasBackgroundColor: string;
    embedsValidationStatus: EmbedsValidationStatus | null;
    theme?: AppState["theme"];
  },
): ElementShape =>
const generateElbowArrowShape = (
  points: readonly LocalPoint[],
  radius: number,
) =>
export const getElementShape = <Point extends GlobalPoint | LocalPoint>(
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
): GeometricShape<Point> =>
export const toggleLinePolygonState = (
  element: ExcalidrawLineElement,
  nextPolygonState: boolean,
):
const getFreeDrawSvgPath = (element: ExcalidrawFreeDrawElement) =>
export const getFreedrawOutlinePoints = (
  element: ExcalidrawFreeDrawElement,
) =>
const med = (A: number[], B: number[]) =>
⋮----
const getSvgPathFromStroke = (points: number[][]): string =>
```

## File: packages/element/src/showSelectedShapeActions.ts
```typescript
import type { UIAppState } from "@excalidraw/excalidraw/types";
import { getSelectedElements } from "./selection";
import type { NonDeletedExcalidrawElement } from "./types";
export const showSelectedShapeActions = (
  appState: UIAppState,
  elements: readonly NonDeletedExcalidrawElement[],
)
```

## File: packages/element/src/sizeHelpers.ts
```typescript
import {
  SHIFT_LOCKING_ANGLE,
  viewportCoordsToSceneCoords,
} from "@excalidraw/common";
import {
  normalizeRadians,
  radiansBetweenAngles,
  radiansDifference,
  type Radians,
} from "@excalidraw/math";
import { pointsEqual } from "@excalidraw/math";
import type { AppState, Offsets, Zoom } from "@excalidraw/excalidraw/types";
import { getCommonBounds, getElementBounds } from "./bounds";
import {
  isArrowElement,
  isFreeDrawElement,
  isLinearElement,
} from "./typeChecks";
import type { ElementsMap, ExcalidrawElement } from "./types";
⋮----
export const isInvisiblySmallElement = (
  element: ExcalidrawElement,
): boolean =>
export const isElementInViewport = (
  element: ExcalidrawElement,
  width: number,
  height: number,
  viewTransformations: {
    zoom: Zoom;
    offsetLeft: number;
    offsetTop: number;
    scrollX: number;
    scrollY: number;
  },
  elementsMap: ElementsMap,
) =>
export const isElementCompletelyInViewport = (
  elements: ExcalidrawElement[],
  width: number,
  height: number,
  viewTransformations: {
    zoom: Zoom;
    offsetLeft: number;
    offsetTop: number;
    scrollX: number;
    scrollY: number;
  },
  elementsMap: ElementsMap,
  padding?: Offsets,
) =>
export const getPerfectElementSize = (
  elementType: AppState["activeTool"]["type"],
  width: number,
  height: number,
):
export const getLockedLinearCursorAlignSize = (
  originX: number,
  originY: number,
  x: number,
  y: number,
  customAngle?: number,
) =>
export const getNormalizedDimensions = (
  element: Pick<ExcalidrawElement, "width" | "height" | "x" | "y">,
):
```

## File: packages/element/src/sortElements.ts
```typescript
import { arrayToMapWithIndex } from "@excalidraw/common";
import type { ExcalidrawElement } from "./types";
const normalizeGroupElementOrder = (elements: readonly ExcalidrawElement[]) =>
⋮----
const orderInnerGroups = (
    elements: readonly ExcalidrawElement[],
): ExcalidrawElement[] =>
⋮----
// if there's a bug which resulted in losing some of the elements, return
// original instead as that's better than losing data
⋮----
/**
 * In theory, when we have text elements bound to a container, they
 * should be right after the container element in the elements array.
 * However, this is not guaranteed due to old and potential future bugs.
 *
 * This function sorts containers and their bound texts together. It prefers
 * original z-index of container (i.e. it moves bound text elements after
 * containers).
 */
const normalizeBoundElementsOrder = (
  elements: readonly ExcalidrawElement[],
) =>
export const normalizeElementOrder = (
  elements: readonly ExcalidrawElement[],
) =>
```

## File: packages/element/src/store.ts
```typescript
import {
  assertNever,
  COLOR_PALETTE,
  isDevEnv,
  isTestEnv,
  randomId,
  Emitter,
  toIterable,
} from "@excalidraw/common";
import type App from "@excalidraw/excalidraw/components/App";
import type { DTO, ValueOf } from "@excalidraw/common/utility-types";
import type { AppState, ObservedAppState } from "@excalidraw/excalidraw/types";
import { deepCopyElement } from "./duplicate";
import { newElementWith } from "./mutateElement";
import { ElementsDelta, AppStateDelta, Delta } from "./delta";
import {
  syncInvalidIndicesImmutable,
  hashElementsVersion,
  hashString,
  isInitializedImageElement,
  isImageElement,
} from "./index";
import type { ApplyToOptions } from "./delta";
import type {
  ExcalidrawElement,
  OrderedExcalidrawElement,
  SceneElementsMap,
} from "./types";
⋮----
export type CaptureUpdateActionType = ValueOf<typeof CaptureUpdateAction>;
type MicroActionsQueue = (() => void)[];
export class Store
⋮----
public get snapshot()
public set snapshot(snapshot: StoreSnapshot)
constructor(private readonly app: App)
public scheduleAction(action: CaptureUpdateActionType)
public scheduleCapture()
public scheduleMicroAction(
    params:
      | {
          action: CaptureUpdateActionType;
          elements: readonly ExcalidrawElement[] | undefined;
          appState: AppState | ObservedAppState | undefined;
        }
      | {
          action: typeof CaptureUpdateAction.IMMEDIATELY;
          change: StoreChange;
          delta: StoreDelta;
        }
      | {
          action:
            | typeof CaptureUpdateAction.NEVER
            | typeof CaptureUpdateAction.EVENTUALLY;
          change: StoreChange;
        },
)
public commit(
    elements: SceneElementsMap | undefined,
    appState: AppState | ObservedAppState | undefined,
): void
public clear(): void
private emitDurableIncrement(
    snapshot: StoreSnapshot,
    change: StoreChange | undefined = undefined,
    delta: StoreDelta | undefined = undefined,
)
private emitEphemeralIncrement(
    snapshot: StoreSnapshot,
    change: StoreChange | undefined = undefined,
)
private applyChangeToSnapshot(change: StoreChange)
private maybeCloneSnapshot(
    action: CaptureUpdateActionType,
    elements: SceneElementsMap | undefined,
    appState: AppState | ObservedAppState | undefined,
)
private flushMicroActions()
private processAction(
    params:
      | {
          action: CaptureUpdateActionType;
          elements: SceneElementsMap | undefined;
          appState: AppState | ObservedAppState | undefined;
        }
      | {
          action: CaptureUpdateActionType;
          change: StoreChange;
          delta: StoreDelta | undefined;
        },
)
private getScheduledMacroAction()
private satisfiesScheduledActionsInvariant()
⋮----
export class StoreChange
⋮----
private constructor(
public static create(
    prevSnapshot: StoreSnapshot,
    nextSnapshot: StoreSnapshot,
)
⋮----
export abstract class StoreIncrement
⋮----
protected constructor(
public static isDurable(
    increment: StoreIncrement,
): increment is DurableIncrement
public static isEphemeral(
    increment: StoreIncrement,
): increment is EphemeralIncrement
⋮----
export class DurableIncrement extends StoreIncrement
⋮----
constructor(
    public readonly change: StoreChange,
    public readonly delta: StoreDelta,
)
⋮----
export class EphemeralIncrement extends StoreIncrement
⋮----
constructor(public readonly change: StoreChange)
⋮----
export class StoreDelta
⋮----
public static create(
    elements: ElementsDelta,
    appState: AppStateDelta,
    opts: {
      id: string;
    } = {
      id: randomId(),
    },
)
public static calculate(
    prevSnapshot: StoreSnapshot,
    nextSnapshot: StoreSnapshot,
)
public static restore(storeDeltaDTO: DTO<StoreDelta>)
public static load({
    id,
    elements: { added, removed, updated },
    appState: { delta: appStateDelta },
}: DTO<StoreDelta>)
public static squash(...deltas: StoreDelta[])
public static inverse(delta: StoreDelta)
public static applyTo(
    delta: StoreDelta,
    elements: SceneElementsMap,
    appState: AppState,
    options?: ApplyToOptions,
): [SceneElementsMap, AppState, boolean]
public static applyLatestChanges(
    delta: StoreDelta,
    prevElements: SceneElementsMap,
    nextElements: SceneElementsMap,
    modifierOptions?: "deleted" | "inserted",
): StoreDelta
public static empty()
public isEmpty()
⋮----
export class StoreSnapshot
⋮----
public static create(
    elements: SceneElementsMap,
    appState: AppState | ObservedAppState,
    metadata: {
      didElementsChange: boolean;
      didAppStateChange: boolean;
    } = {
      didElementsChange: false,
      didAppStateChange: false,
    },
)
⋮----
public getChangedElements(prevSnapshot: StoreSnapshot)
public getChangedAppState(
    prevSnapshot: StoreSnapshot,
): Partial<ObservedAppState>
⋮----
public applyChange(change: StoreChange): StoreSnapshot
public maybeClone(
    action: CaptureUpdateActionType,
    elements: SceneElementsMap | undefined,
    appState: AppState | ObservedAppState | undefined,
)
private maybeCreateAppStateSnapshot(
    appState: AppState | ObservedAppState | undefined,
    options: {
      shouldCompareHashes: boolean;
    } = {
      shouldCompareHashes: false,
    },
): ObservedAppState
private maybeCreateElementsSnapshot(
    elements: SceneElementsMap | undefined,
    options: {
      shouldCompareHashes: boolean;
    } = {
      shouldCompareHashes: false,
    },
): SceneElementsMap
private detectChangedAppState(
    nextObservedAppState: ObservedAppState,
    options: {
      shouldCompareHashes: boolean;
    } = {
      shouldCompareHashes: false,
    },
): boolean | undefined
private detectChangedElements(
    nextElements: SceneElementsMap,
    options: {
      shouldCompareHashes: boolean;
    } = {
      shouldCompareHashes: false,
    },
): SceneElementsMap | undefined
private createElementsSnapshot(changedElements: SceneElementsMap)
⋮----
const getDefaultObservedAppState = (): ObservedAppState =>
export const getObservedAppState = (
  appState: AppState | ObservedAppState,
): ObservedAppState =>
const isObservedAppState = (
  appState: AppState | ObservedAppState,
): appState is ObservedAppState
```

## File: packages/element/src/textElement.ts
```typescript
import {
  ARROW_LABEL_FONT_SIZE_TO_MIN_WIDTH_RATIO,
  ARROW_LABEL_WIDTH_FRACTION,
  BOUND_TEXT_PADDING,
  DEFAULT_FONT_SIZE,
  TEXT_ALIGN,
  VERTICAL_ALIGN,
  getFontString,
  isProdEnv,
  invariant,
} from "@excalidraw/common";
import { pointFrom, pointRotateRads, type Radians } from "@excalidraw/math";
import type { AppState } from "@excalidraw/excalidraw/types";
import type { ExtractSetType } from "@excalidraw/common/utility-types";
import {
  resetOriginalContainerCache,
  updateOriginalContainerCache,
} from "./containerCache";
import { LinearElementEditor } from "./linearElementEditor";
import { measureText } from "./textMeasurements";
import { wrapText } from "./textWrapping";
import {
  isBoundToContainer,
  isArrowElement,
  isTextElement,
} from "./typeChecks";
import type { Scene } from "./Scene";
import type { MaybeTransformHandleType } from "./transformHandles";
import type {
  ElementsMap,
  ExcalidrawElement,
  ExcalidrawElementType,
  ExcalidrawTextContainer,
  ExcalidrawTextElement,
  ExcalidrawTextElementWithContainer,
  NonDeletedExcalidrawElement,
} from "./types";
export const redrawTextBoundingBox = (
  textElement: ExcalidrawTextElement,
  container: ExcalidrawElement | null,
  scene: Scene,
) =>
export const handleBindTextResize = (
  container: NonDeletedExcalidrawElement,
  scene: Scene,
  transformHandleType: MaybeTransformHandleType,
  shouldMaintainAspectRatio = false,
) =>
export const computeBoundTextPosition = (
  container: ExcalidrawElement,
  boundTextElement: ExcalidrawTextElementWithContainer,
  elementsMap: ElementsMap,
) =>
export const getBoundTextElementId = (container: ExcalidrawElement | null) =>
export const getBoundTextElement = (
  element: ExcalidrawElement | null,
  elementsMap: ElementsMap,
) =>
export const getContainerElement = (
  element: ExcalidrawTextElement | null,
  elementsMap: ElementsMap,
): ExcalidrawTextContainer | null =>
export const getContainerCenter = (
  container: ExcalidrawElement,
  appState: AppState,
  elementsMap: ElementsMap,
) =>
export const getContainerCoords = (container: NonDeletedExcalidrawElement) =>
export const getTextElementAngle = (
  textElement: ExcalidrawTextElement,
  container: ExcalidrawTextContainer | null,
) =>
export const getBoundTextElementPosition = (
  container: ExcalidrawElement,
  boundTextElement: ExcalidrawTextElementWithContainer,
  elementsMap: ElementsMap,
) =>
export const shouldAllowVerticalAlign = (
  selectedElements: NonDeletedExcalidrawElement[],
  elementsMap: ElementsMap,
) =>
export const suppportsHorizontalAlign = (
  selectedElements: NonDeletedExcalidrawElement[],
  elementsMap: ElementsMap,
) =>
⋮----
export const isValidTextContainer = (element: {
  type: ExcalidrawElementType;
}): element is ExcalidrawTextContainer
export const computeContainerDimensionForBoundText = (
  dimension: number,
  containerType: ExtractSetType<typeof VALID_CONTAINER_TYPES>,
) =>
export const getBoundTextMaxWidth = (
  container: ExcalidrawElement,
  boundTextElement: ExcalidrawTextElement | null,
) =>
export const getBoundTextMaxHeight = (
  container: ExcalidrawElement,
  boundTextElement: ExcalidrawTextElementWithContainer,
) =>
export const getTextFromElements = (
  elements: readonly ExcalidrawElement[],
  separator = "\n\n",
) =>
```

## File: packages/element/src/textMeasurements.ts
```typescript
import {
  BOUND_TEXT_PADDING,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  getFontString,
  isTestEnv,
  normalizeEOL,
} from "@excalidraw/common";
import type { FontString, ExcalidrawTextElement } from "./types";
export const measureText = (
  text: string,
  font: FontString,
  lineHeight: ExcalidrawTextElement["lineHeight"],
) =>
⋮----
export const getApproxMinLineWidth = (
  font: FontString,
  lineHeight: ExcalidrawTextElement["lineHeight"],
) =>
export const getMinTextElementWidth = (
  font: FontString,
  lineHeight: ExcalidrawTextElement["lineHeight"],
) =>
export const isMeasureTextSupported = () =>
export const normalizeText = (text: string) =>
⋮----
// replace tabs with spaces so they render and measure correctly
⋮----
const splitIntoLines = (text: string) =>
export const detectLineHeight = (textElement: ExcalidrawTextElement) =>
export const getLineHeightInPx = (
  fontSize: ExcalidrawTextElement["fontSize"],
  lineHeight: ExcalidrawTextElement["lineHeight"],
) =>
export const getApproxMinLineHeight = (
  fontSize: ExcalidrawTextElement["fontSize"],
  lineHeight: ExcalidrawTextElement["lineHeight"],
) =>
⋮----
export const setCustomTextMetricsProvider = (provider: TextMetricsProvider) =>
export interface TextMetricsProvider {
  getLineWidth(text: string, fontString: FontString): number;
}
⋮----
getLineWidth(text: string, fontString: FontString): number;
⋮----
class CanvasTextMetricsProvider implements TextMetricsProvider
⋮----
constructor()
public getLineWidth(text: string, fontString: FontString): number
⋮----
export const getLineWidth = (text: string, font: FontString) =>
export const getTextWidth = (text: string, font: FontString) =>
export const getTextHeight = (
  text: string,
  fontSize: number,
  lineHeight: ExcalidrawTextElement["lineHeight"],
) =>
⋮----
const calculate = (char: string, font: FontString) =>
const getCache = (font: FontString) =>
const clearCache = (font: FontString) =>
⋮----
export const getMinCharWidth = (font: FontString) =>
export const getMaxCharWidth = (font: FontString) =>
```

## File: packages/element/src/textWrapping.ts
```typescript
import { isDevEnv, isTestEnv } from "@excalidraw/common";
import { charWidth, getLineWidth } from "./textMeasurements";
import type { FontString } from "./types";
⋮----
export const containsCJK = (text: string) =>
const getLineBreakRegex = () =>
const getEmojiRegex = () =>
⋮----
const getLineBreakRegexSimple = ()
const getLineBreakRegexAdvanced = ()
const getEmojiRegexUnicode = ()
⋮----
/**
   * Joins regexes into a single regex as with "and" operator.
   */
⋮----
const builder = () => Regex.build(`(?=[$
⋮----
export const parseTokens = (line: string) =>
export const wrapText = (
  text: string,
  font: FontString,
  maxWidth: number,
): string =>
export type WrappedTextLine = {
  text: string;
  start: number;
  end: number;
};
const getHardLineBreaks = (text: string): WrappedTextLine[] =>
export const getWrappedTextLines = (
  text: string,
  font: FontString,
  maxWidth: number,
): WrappedTextLine[] =>
const wrapLine = (
  line: string,
  font: FontString,
  maxWidth: number,
  lineStart: number,
): WrappedTextLine[] =>
⋮----
// Tracks the next token's code-unit position in the original source string.
⋮----
// cache single codepoint whitespace, CJK or emoji width calc. as kerning should not apply here
⋮----
// build up the current line, skipping length check for possibly trailing whitespaces
⋮----
// current line is empty => just the token (word) is longer than `maxWidth` and needs to be wrapped
⋮----
// trailing line of the wrapped word might still be joined with next token/s
⋮----
// push & reset, but don't iterate on the next token, as we didn't use it yet!
⋮----
// purposefully not iterating and not setting `currentLine` to `token`, so that we could use a simple !currentLine check above
⋮----
// iterator done, push the trailing line if exists
⋮----
/**
 * Wraps a single word that could not be placed on an empty line as-is.
 */
const wrapWord = (
  word: string,
  font: FontString,
  maxWidth: number,
  wordStart: number,
): WrappedTextLine[] =>
⋮----
// multi-codepoint emojis are already broken apart and shouldn't be broken further
⋮----
/**
 * Trims trailing whitespace that is exceeding the `maxWidth`.
 *
 * Used for the trailing visual line of a hard line, where some trailing
 * whitespace may still be visible if it fits into the available width.
 */
const trimLine = (
  line: string,
  start: number,
  end: number,
  font: FontString,
  maxWidth: number,
): WrappedTextLine =>
⋮----
// defensively default to `trimeEnd` in case the regex does not match
⋮----
/**
 * Used for internal soft-wrap boundaries, where trailing whitespace should not
 * survive into the rendered line even though it still exists in the original
 * text.
 */
const trimLineEndAtSoftBreak = (
  line: string,
  start: number,
  end: number,
): WrappedTextLine =>
/**
 * Check if the given string is a single character.
 *
 * Handles multi-byte chars (é, 中) and purposefully does not handle multi-codepoint char (👨‍👩‍👧‍👦, 👩🏽‍🦰).
 */
const isSingleCharacter = (maybeSingleCharacter: string) =>
/**
 * Invariant for the word wrapping algorithm.
 */
const satisfiesWordInvariant = (word: string) =>
```

## File: packages/element/src/transform.ts
```typescript
import { pointFrom, type LocalPoint } from "@excalidraw/math";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  TEXT_ALIGN,
  VERTICAL_ALIGN,
  getSizeFromPoints,
  randomId,
  arrayToMap,
  assertNever,
  cloneJSON,
  getFontString,
  isDevEnv,
  toBrandedType,
  getLineHeight,
} from "@excalidraw/common";
import type { MarkOptional } from "@excalidraw/common/utility-types";
import { bindBindingElement } from "./binding";
import {
  newArrowElement,
  newElement,
  newFrameElement,
  newImageElement,
  newLinearElement,
  newMagicFrameElement,
  newTextElement,
  type ElementConstructorOpts,
} from "./newElement";
import { measureText, normalizeText } from "./textMeasurements";
import { isArrowElement } from "./typeChecks";
import { syncInvalidIndices } from "./fractionalIndex";
import { redrawTextBoundingBox } from "./textElement";
import { LinearElementEditor } from "./linearElementEditor";
import { getCommonBounds } from "./bounds";
import { Scene } from "./Scene";
import type {
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  ExcalidrawElement,
  ExcalidrawFrameElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawGenericElement,
  ExcalidrawIframeLikeElement,
  ExcalidrawImageElement,
  ExcalidrawLinearElement,
  ExcalidrawMagicFrameElement,
  ExcalidrawSelectionElement,
  ExcalidrawTextElement,
  FileId,
  FontFamilyValues,
  NonDeletedSceneElementsMap,
  TextAlign,
  VerticalAlign,
} from "./types";
export type ValidLinearElement = {
  type: "arrow" | "line";
  x: number;
  y: number;
  label?: {
    text: string;
    fontSize?: number;
    fontFamily?: FontFamilyValues;
    textAlign?: TextAlign;
    verticalAlign?: VerticalAlign;
  } & MarkOptional<ElementConstructorOpts, "x" | "y">;
  end?:
    | (
        | (
            | {
                type: Exclude<
                  ExcalidrawBindableElement["type"],
                  | "image"
                  | "text"
                  | "frame"
                  | "magicframe"
                  | "embeddable"
                  | "iframe"
                >;
                id?: ExcalidrawGenericElement["id"];
              }
            | {
                id: ExcalidrawGenericElement["id"];
                type?: Exclude<
                  ExcalidrawBindableElement["type"],
                  | "image"
                  | "text"
                  | "frame"
                  | "magicframe"
                  | "embeddable"
                  | "iframe"
                >;
              }
          )
        | ((
            | {
                type: "text";
                text: string;
              }
            | {
                type?: "text";
                id: ExcalidrawTextElement["id"];
                text: string;
              }
          ) &
            Partial<ExcalidrawTextElement>)
      ) &
        MarkOptional<ElementConstructorOpts, "x" | "y">;
  start?:
    | (
        | (
            | {
                type: Exclude<
                  ExcalidrawBindableElement["type"],
                  | "image"
                  | "text"
                  | "frame"
                  | "magicframe"
                  | "embeddable"
                  | "iframe"
                >;
                id?: ExcalidrawGenericElement["id"];
              }
            | {
                id: ExcalidrawGenericElement["id"];
                type?: Exclude<
                  ExcalidrawBindableElement["type"],
                  | "image"
                  | "text"
                  | "frame"
                  | "magicframe"
                  | "embeddable"
                  | "iframe"
                >;
              }
          )
        | ((
            | {
                type: "text";
                text: string;
              }
            | {
                type?: "text";
                id: ExcalidrawTextElement["id"];
                text: string;
              }
          ) &
            Partial<ExcalidrawTextElement>)
      ) &
        MarkOptional<ElementConstructorOpts, "x" | "y">;
} & Partial<ExcalidrawLinearElement>;
export type ValidContainer =
  | {
      type: Exclude<ExcalidrawGenericElement["type"], "selection">;
      id?: ExcalidrawGenericElement["id"];
      label?: {
        text: string;
        fontSize?: number;
        fontFamily?: FontFamilyValues;
        textAlign?: TextAlign;
        verticalAlign?: VerticalAlign;
      } & MarkOptional<ElementConstructorOpts, "x" | "y">;
    } & ElementConstructorOpts;
export type ExcalidrawElementSkeleton =
  | Extract<
      Exclude<ExcalidrawElement, ExcalidrawSelectionElement>,
      ExcalidrawIframeLikeElement | ExcalidrawFreeDrawElement
    >
  | ({
      type: Extract<ExcalidrawLinearElement["type"], "line">;
      x: number;
      y: number;
    } & Partial<ExcalidrawLinearElement>)
  | ValidContainer
  | ValidLinearElement
  | ({
      type: "text";
      text: string;
      x: number;
      y: number;
      id?: ExcalidrawTextElement["id"];
    } & Partial<ExcalidrawTextElement>)
  | ({
      type: Extract<ExcalidrawImageElement["type"], "image">;
      x: number;
      y: number;
      fileId: FileId;
    } & Partial<ExcalidrawImageElement>)
  | ({
      type: "frame";
      children: readonly ExcalidrawElement["id"][];
      name?: string;
    } & Partial<ExcalidrawFrameElement>)
  | ({
      type: "magicframe";
      children: readonly ExcalidrawElement["id"][];
      name?: string;
    } & Partial<ExcalidrawMagicFrameElement>);
⋮----
const bindTextToContainer = (
  container: ExcalidrawElement,
  textProps: { text: string } & MarkOptional<ElementConstructorOpts, "x" | "y">,
  scene: Scene,
) =>
const bindLinearElementToElement = (
  linearElement: ExcalidrawArrowElement,
  start: ValidLinearElement["start"],
  end: ValidLinearElement["end"],
  elementStore: ElementStore,
  scene: Scene,
):
class ElementStore
export const convertToExcalidrawElements = (
  elementsSkeleton: ExcalidrawElementSkeleton[] | null,
  opts?: { regenerateIds: boolean },
) =>
```

## File: packages/element/src/transformHandles.ts
```typescript
import {
  DEFAULT_TRANSFORM_HANDLE_SPACING,
  type EditorInterface,
} from "@excalidraw/common";
import { pointFrom, pointRotateRads } from "@excalidraw/math";
import type { Radians } from "@excalidraw/math";
import type {
  InteractiveCanvasAppState,
  Zoom,
} from "@excalidraw/excalidraw/types";
import type { Bounds } from "@excalidraw/common";
import { getElementAbsoluteCoords } from "./bounds";
import {
  isElbowArrow,
  isFrameLikeElement,
  isImageElement,
  isLinearElement,
} from "./typeChecks";
import type {
  ElementsMap,
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
  PointerType,
} from "./types";
export type TransformHandleDirection =
  | "n"
  | "s"
  | "w"
  | "e"
  | "nw"
  | "ne"
  | "sw"
  | "se";
export type TransformHandleType = TransformHandleDirection | "rotation";
export type TransformHandle = Bounds;
export type TransformHandles = Partial<{
  [T in TransformHandleType]: TransformHandle;
}>;
export type MaybeTransformHandleType = TransformHandleType | false;
⋮----
const generateTransformHandle = (
  x: number,
  y: number,
  width: number,
  height: number,
  cx: number,
  cy: number,
  angle: Radians,
): TransformHandle =>
export const canResizeFromSides = (editorInterface: EditorInterface) =>
export const getOmitSidesForEditorInterface = (
  editorInterface: EditorInterface,
) =>
export const getTransformHandlesFromCoords = (
  [x1, y1, x2, y2, cx, cy]: [number, number, number, number, number, number],
  angle: Radians,
  zoom: Zoom,
  pointerType: PointerType,
  omitSides: { [T in TransformHandleType]?: boolean } = {},
  margin = 4,
  spacing = DEFAULT_TRANSFORM_HANDLE_SPACING,
): TransformHandles =>
export const getTransformHandles = (
  element: ExcalidrawElement,
  zoom: Zoom,
  elementsMap: ElementsMap,
  pointerType: PointerType = "mouse",
  omitSides: { [T in TransformHandleType]?: boolean } = DEFAULT_OMIT_SIDES,
): TransformHandles =>
export const hasBoundingBox = (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: InteractiveCanvasAppState,
  editorInterface: EditorInterface,
) =>
```

## File: packages/element/src/typeChecks.ts
```typescript
import { ROUNDNESS, assertNever } from "@excalidraw/common";
import { pointsEqual } from "@excalidraw/math";
import type { ElementOrToolType } from "@excalidraw/excalidraw/types";
import type { MarkNonNullable } from "@excalidraw/common/utility-types";
import type {
  ExcalidrawElement,
  ExcalidrawTextElement,
  ExcalidrawEmbeddableElement,
  ExcalidrawLinearElement,
  ExcalidrawBindableElement,
  ExcalidrawFreeDrawElement,
  InitializedExcalidrawImageElement,
  ExcalidrawImageElement,
  ExcalidrawTextElementWithContainer,
  ExcalidrawTextContainer,
  ExcalidrawFrameElement,
  RoundnessType,
  ExcalidrawFrameLikeElement,
  ExcalidrawElementType,
  ExcalidrawIframeElement,
  ExcalidrawIframeLikeElement,
  ExcalidrawMagicFrameElement,
  ExcalidrawArrowElement,
  ExcalidrawElbowArrowElement,
  ExcalidrawLineElement,
  ExcalidrawFlowchartNodeElement,
  ExcalidrawLinearElementSubType,
} from "./types";
export const isInitializedImageElement = (
  element: ExcalidrawElement | null,
): element is InitializedExcalidrawImageElement =>
export const isImageElement = (
  element: ExcalidrawElement | null,
): element is ExcalidrawImageElement =>
export const isEmbeddableElement = (
  element: ExcalidrawElement | null | undefined,
): element is ExcalidrawEmbeddableElement =>
export const isIframeElement = (
  element: ExcalidrawElement | null,
): element is ExcalidrawIframeElement =>
export const isIframeLikeElement = (
  element: ExcalidrawElement | null,
): element is ExcalidrawIframeLikeElement =>
export const isTextElement = (
  element: ExcalidrawElement | null,
): element is ExcalidrawTextElement =>
export const isFrameElement = (
  element: ExcalidrawElement | null,
): element is ExcalidrawFrameElement =>
export const isMagicFrameElement = (
  element: ExcalidrawElement | null,
): element is ExcalidrawMagicFrameElement =>
export const isFrameLikeElement = (
  element: ExcalidrawElement | null,
): element is ExcalidrawFrameLikeElement =>
export const isFreeDrawElement = (
  element?: ExcalidrawElement | null,
): element is ExcalidrawFreeDrawElement =>
export const isFreeDrawElementType = (
  elementType: ExcalidrawElementType,
): boolean =>
export const isLinearElement = (
  element?: ExcalidrawElement | null,
): element is ExcalidrawLinearElement =>
export const isLineElement = (
  element?: ExcalidrawElement | null,
): element is ExcalidrawLineElement =>
export const isArrowElement = (
  element?: ExcalidrawElement | null,
): element is ExcalidrawArrowElement =>
export const isElbowArrow = (
  element?: ExcalidrawElement,
): element is ExcalidrawElbowArrowElement =>
export const isSimpleArrow = (
  element?: ExcalidrawElement,
): element is ExcalidrawArrowElement =>
export const isSharpArrow = (
  element?: ExcalidrawElement,
): element is ExcalidrawArrowElement =>
export const isCurvedArrow = (
  element?: ExcalidrawElement,
): element is ExcalidrawArrowElement =>
export const isLinearElementType = (
  elementType: ElementOrToolType,
): boolean =>
export const isBindingElement = (
  element?: ExcalidrawElement | null,
  includeLocked = true,
): element is ExcalidrawArrowElement =>
export const isBindingElementType = (
  elementType: ElementOrToolType,
): boolean =>
export const isBindableElement = (
  element: ExcalidrawElement | null | undefined,
  includeLocked = true,
): element is ExcalidrawBindableElement =>
export const isRectanguloidElement = (
  element?: ExcalidrawElement | null,
): element is ExcalidrawBindableElement =>
export const isRectangularElement = (
  element?: ExcalidrawElement | null,
): element is ExcalidrawBindableElement =>
export const isTextBindableContainer = (
  element: ExcalidrawElement | null,
  includeLocked = true,
): element is ExcalidrawTextContainer =>
export const isExcalidrawElement = (
  element: any,
): element is ExcalidrawElement =>
export const isFlowchartNodeElement = (
  element: ExcalidrawElement,
): element is ExcalidrawFlowchartNodeElement =>
export const hasBoundTextElement = (
  element: ExcalidrawElement | null,
): element is MarkNonNullable<ExcalidrawBindableElement, "boundElements"> =>
export const isBoundToContainer = (
  element: ExcalidrawElement | null,
): element is ExcalidrawTextElementWithContainer =>
export const isArrowBoundToElement = (element: ExcalidrawArrowElement) =>
export const isUsingAdaptiveRadius = (type: string)
export const isUsingProportionalRadius = (type: string)
export const canApplyRoundnessTypeToElement = (
  roundnessType: RoundnessType,
  element: ExcalidrawElement,
) =>
export const getDefaultRoundnessTypeForElement = (
  element: ExcalidrawElement,
) =>
export const getLinearElementSubType = (
  element: ExcalidrawLinearElement,
): ExcalidrawLinearElementSubType =>
export const isValidPolygon = (
  points: ExcalidrawLineElement["points"],
): boolean =>
export const canBecomePolygon = (
  points: ExcalidrawLineElement["points"],
): boolean =>
```

## File: packages/element/src/types.ts
```typescript
import type { LocalPoint, Radians } from "@excalidraw/math";
import type {
  FONT_FAMILY,
  ROUNDNESS,
  TEXT_ALIGN,
  THEME,
  VERTICAL_ALIGN,
} from "@excalidraw/common";
import type {
  MakeBrand,
  MarkNonNullable,
  Merge,
  ValueOf,
} from "@excalidraw/common/utility-types";
export type ChartType = "bar" | "line" | "radar";
export type FillStyle = "hachure" | "cross-hatch" | "solid" | "zigzag";
export type FontFamilyKeys = keyof typeof FONT_FAMILY;
export type FontFamilyValues = typeof FONT_FAMILY[FontFamilyKeys];
export type Theme = typeof THEME[keyof typeof THEME];
export type FontString = string & { _brand: "fontString" };
export type GroupId = string;
export type PointerType = "mouse" | "pen" | "touch";
export type StrokeRoundness = "round" | "sharp";
export type RoundnessType = ValueOf<typeof ROUNDNESS>;
export type StrokeStyle = "solid" | "dashed" | "dotted";
export type TextAlign = typeof TEXT_ALIGN[keyof typeof TEXT_ALIGN];
type VerticalAlignKeys = keyof typeof VERTICAL_ALIGN;
export type VerticalAlign = typeof VERTICAL_ALIGN[VerticalAlignKeys];
export type FractionalIndex = string & { _brand: "franctionalIndex" };
export type BoundElement = Readonly<{
  id: ExcalidrawLinearElement["id"];
  type: "arrow" | "text";
}>;
type _ExcalidrawElementBase = Readonly<{
  id: string;
  x: number;
  y: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: FillStyle;
  strokeWidth: number;
  strokeStyle: StrokeStyle;
  roundness: null | { type: RoundnessType; value?: number };
  roughness: number;
  opacity: number;
  width: number;
  height: number;
  angle: Radians;
  seed: number;
  version: number;
  versionNonce: number;
  index: FractionalIndex | null;
  isDeleted: boolean;
  groupIds: readonly GroupId[];
  frameId: string | null;
  boundElements: readonly BoundElement[] | null;
  updated: number;
  link: string | null;
  locked: boolean;
  customData?: Record<string, any>;
}>;
export type ExcalidrawSelectionElement = _ExcalidrawElementBase & {
  type: "selection";
};
export type ExcalidrawRectangleElement = _ExcalidrawElementBase & {
  type: "rectangle";
};
export type ExcalidrawDiamondElement = _ExcalidrawElementBase & {
  type: "diamond";
};
export type ExcalidrawEllipseElement = _ExcalidrawElementBase & {
  type: "ellipse";
};
export type ExcalidrawEmbeddableElement = _ExcalidrawElementBase &
  Readonly<{
    type: "embeddable";
  }>;
export type MagicGenerationData =
  | {
      status: "pending";
    }
  | { status: "done"; html: string }
  | {
      status: "error";
      message?: string;
      code: "ERR_GENERATION_INTERRUPTED" | string;
    };
export type ExcalidrawIframeElement = _ExcalidrawElementBase &
  Readonly<{
    type: "iframe";
    customData?: { generationData?: MagicGenerationData };
  }>;
export type ExcalidrawIframeLikeElement =
  | ExcalidrawIframeElement
  | ExcalidrawEmbeddableElement;
export type IframeData =
  | {
      intrinsicSize: { w: number; h: number };
      error?: Error;
      sandbox?: { allowSameOrigin?: boolean };
    } & (
      | { type: "video" | "generic"; link: string }
      | { type: "document"; srcdoc: (theme: Theme) => string }
    );
export type ImageCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
};
export type ExcalidrawImageElement = _ExcalidrawElementBase &
  Readonly<{
    type: "image";
    fileId: FileId | null;
    status: "pending" | "saved" | "error";
    scale: [number, number];
    crop: ImageCrop | null;
  }>;
export type InitializedExcalidrawImageElement = MarkNonNullable<
  ExcalidrawImageElement,
  "fileId"
>;
export type ExcalidrawFrameElement = _ExcalidrawElementBase & {
  type: "frame";
  name: string | null;
};
export type ExcalidrawMagicFrameElement = _ExcalidrawElementBase & {
  type: "magicframe";
  name: string | null;
};
export type ExcalidrawFrameLikeElement =
  | ExcalidrawFrameElement
  | ExcalidrawMagicFrameElement;
export type ExcalidrawGenericElement =
  | ExcalidrawSelectionElement
  | ExcalidrawRectangleElement
  | ExcalidrawDiamondElement
  | ExcalidrawEllipseElement;
export type ExcalidrawFlowchartNodeElement =
  | ExcalidrawRectangleElement
  | ExcalidrawDiamondElement
  | ExcalidrawEllipseElement;
export type ExcalidrawRectanguloidElement =
  | ExcalidrawRectangleElement
  | ExcalidrawImageElement
  | ExcalidrawTextElement
  | ExcalidrawFreeDrawElement
  | ExcalidrawIframeLikeElement
  | ExcalidrawFrameLikeElement
  | ExcalidrawEmbeddableElement
  | ExcalidrawSelectionElement;
export type ExcalidrawElement =
  | ExcalidrawGenericElement
  | ExcalidrawTextElement
  | ExcalidrawLinearElement
  | ExcalidrawArrowElement
  | ExcalidrawFreeDrawElement
  | ExcalidrawImageElement
  | ExcalidrawFrameElement
  | ExcalidrawMagicFrameElement
  | ExcalidrawIframeElement
  | ExcalidrawEmbeddableElement;
export type ExcalidrawNonSelectionElement = Exclude<
  ExcalidrawElement,
  ExcalidrawSelectionElement
>;
export type Ordered<TElement extends ExcalidrawElement> = TElement & {
  index: FractionalIndex;
};
export type OrderedExcalidrawElement = Ordered<ExcalidrawElement>;
export type NonDeleted<TElement extends ExcalidrawElement> = TElement & {
  isDeleted: boolean;
};
export type NonDeletedExcalidrawElement = NonDeleted<ExcalidrawElement>;
export type ExcalidrawTextElement = _ExcalidrawElementBase &
  Readonly<{
    type: "text";
    fontSize: number;
    fontFamily: FontFamilyValues;
    text: string;
    textAlign: TextAlign;
    verticalAlign: VerticalAlign;
    containerId: ExcalidrawGenericElement["id"] | null;
    originalText: string;
    autoResize: boolean;
    lineHeight: number & { _brand: "unitlessLineHeight" };
  }>;
export type ExcalidrawBindableElement =
  | ExcalidrawRectangleElement
  | ExcalidrawDiamondElement
  | ExcalidrawEllipseElement
  | ExcalidrawTextElement
  | ExcalidrawImageElement
  | ExcalidrawIframeElement
  | ExcalidrawEmbeddableElement
  | ExcalidrawFrameElement
  | ExcalidrawMagicFrameElement;
export type ExcalidrawTextContainer =
  | ExcalidrawRectangleElement
  | ExcalidrawDiamondElement
  | ExcalidrawEllipseElement
  | ExcalidrawArrowElement;
export type ExcalidrawTextElementWithContainer = {
  containerId: ExcalidrawTextContainer["id"];
} & ExcalidrawTextElement;
export type FixedPoint = [number, number];
export type BindMode = "inside" | "orbit" | "skip";
export type FixedPointBinding = {
  elementId: ExcalidrawBindableElement["id"];
  fixedPoint: FixedPoint;
  mode: BindMode;
};
type Index = number;
export type PointsPositionUpdates = Map<
  Index,
  { point: LocalPoint; isDragging?: boolean }
>;
export type CardinalityArrowhead =
  | "cardinality_one"
  | "cardinality_many"
  | "cardinality_one_or_many"
  | "cardinality_exactly_one"
  | "cardinality_zero_or_one"
  | "cardinality_zero_or_many";
export type ArrowheadLegacy =
  | "dot"
  | "crowfoot_one"
  | "crowfoot_many"
  | "crowfoot_one_or_many";
export type Arrowhead =
  | "arrow"
  | "bar"
  | "circle"
  | "circle_outline"
  | "triangle"
  | "triangle_outline"
  | "diamond"
  | "diamond_outline"
  | CardinalityArrowhead;
export type AnyArrowhead = Arrowhead | ArrowheadLegacy;
export type ExcalidrawLinearElement = _ExcalidrawElementBase &
  Readonly<{
    type: "line" | "arrow";
    points: readonly LocalPoint[];
    startBinding: FixedPointBinding | null;
    endBinding: FixedPointBinding | null;
    startArrowhead: Arrowhead | null;
    endArrowhead: Arrowhead | null;
  }>;
export type ExcalidrawLineElement = ExcalidrawLinearElement &
  Readonly<{
    type: "line";
    polygon: boolean;
  }>;
export type FixedSegment = {
  start: LocalPoint;
  end: LocalPoint;
  index: Index;
};
export type ExcalidrawArrowElement = ExcalidrawLinearElement &
  Readonly<{
    type: "arrow";
    elbowed: boolean;
  }>;
export type ExcalidrawElbowArrowElement = Merge<
  ExcalidrawArrowElement,
  {
    elbowed: true;
    fixedSegments: readonly FixedSegment[] | null;
    startBinding: FixedPointBinding | null;
    endBinding: FixedPointBinding | null;
    startIsSpecial: boolean | null;
    endIsSpecial: boolean | null;
  }
>;
export type ExcalidrawFreeDrawElement = _ExcalidrawElementBase &
  Readonly<{
    type: "freedraw";
    points: readonly LocalPoint[];
    pressures: readonly number[];
    simulatePressure: boolean;
  }>;
export type FileId = string & { _brand: "FileId" };
export type ExcalidrawElementType = ExcalidrawElement["type"];
export type ElementsMap = Map<ExcalidrawElement["id"], ExcalidrawElement>;
export type NonDeletedElementsMap = Map<
  ExcalidrawElement["id"],
  NonDeletedExcalidrawElement
> &
  MakeBrand<"NonDeletedElementsMap">;
export type SceneElementsMap = Map<
  ExcalidrawElement["id"],
  Ordered<ExcalidrawElement>
> &
  MakeBrand<"SceneElementsMap">;
export type NonDeletedSceneElementsMap = Map<
  ExcalidrawElement["id"],
  Ordered<NonDeletedExcalidrawElement>
> &
  MakeBrand<"NonDeletedSceneElementsMap">;
export type ElementsMapOrArray =
  | readonly ExcalidrawElement[]
  | Readonly<ElementsMap>;
export type ExcalidrawLinearElementSubType =
  | "line"
  | "sharpArrow"
  | "curvedArrow"
  | "elbowArrow";
export type ConvertibleGenericTypes = "rectangle" | "diamond" | "ellipse";
export type ConvertibleLinearTypes = ExcalidrawLinearElementSubType;
export type ConvertibleTypes = ConvertibleGenericTypes | ConvertibleLinearTypes;
```

## File: packages/element/src/utils.ts
```typescript
import {
  DEFAULT_ADAPTIVE_RADIUS,
  DEFAULT_PROPORTIONAL_RADIUS,
  invariant,
  LINE_CONFIRM_THRESHOLD,
  ROUNDNESS,
} from "@excalidraw/common";
import {
  bezierEquation,
  curve,
  curveCatmullRomCubicApproxPoints,
  curveOffsetPoints,
  lineSegment,
  lineSegmentIntersectionPoints,
  pointDistance,
  pointFrom,
  pointFromArray,
  pointFromVector,
  pointRotateRads,
  pointTranslate,
  rectangle,
  vectorFromPoint,
  vectorNormalize,
  vectorScale,
  type GlobalPoint,
} from "@excalidraw/math";
import type { Curve, LineSegment, LocalPoint } from "@excalidraw/math";
import type {
  AppState,
  NormalizedZoomValue,
  Zoom,
} from "@excalidraw/excalidraw/types";
import { elementCenterPoint, getDiamondPoints } from "./bounds";
import { generateLinearCollisionShape } from "./shape";
import { hitElementItself, isPointInElement } from "./collision";
import { LinearElementEditor } from "./linearElementEditor";
import { isRectangularElement } from "./typeChecks";
import { maxBindingDistance_simple } from "./binding";
import {
  getGlobalFixedPointForBindableElement,
  normalizeFixedPoint,
} from "./binding";
import type {
  ElementsMap,
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  ExcalidrawDiamondElement,
  ExcalidrawElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawLinearElement,
  ExcalidrawRectanguloidElement,
} from "./types";
type ElementShape = [LineSegment<GlobalPoint>[], Curve<GlobalPoint>[]];
⋮----
const getElementShapesCacheEntry = <T extends ExcalidrawElement>(
  element: T,
  offset: number,
): ElementShape | undefined =>
const setElementShapesCacheEntry = <T extends ExcalidrawElement>(
  element: T,
  shape: ElementShape,
  offset: number,
) =>
export function deconstructLinearOrFreeDrawElement(
  element: ExcalidrawLinearElement | ExcalidrawFreeDrawElement,
): [LineSegment<GlobalPoint>[], Curve<GlobalPoint>[]]
export function deconstructRectanguloidElement(
  element: ExcalidrawRectanguloidElement,
  offset: number = 0,
): [LineSegment<GlobalPoint>[], Curve<GlobalPoint>[]]
export function getDiamondBaseCorners(
  element: ExcalidrawDiamondElement,
  offset: number = 0,
): Curve<GlobalPoint>[]
export function deconstructDiamondElement(
  element: ExcalidrawDiamondElement,
  offset: number = 0,
): [LineSegment<GlobalPoint>[], Curve<GlobalPoint>[]]
export const isPathALoop = (
  points: ExcalidrawLinearElement["points"],
  zoomValue: Zoom["value"] = 1 as NormalizedZoomValue,
): boolean =>
export const getCornerRadius = (x: number, element: ExcalidrawElement) =>
const getDiagonalsForBindableElement = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
) =>
⋮----
const shrinkSegment = (seg: LineSegment<GlobalPoint>) =>
⋮----
export const getSnapOutlineMidPoint = (
  point: GlobalPoint,
  element: ExcalidrawBindableElement,
  elementsMap: ElementsMap,
  zoom: AppState["zoom"],
) =>
export const projectFixedPointOntoDiagonal = (
  arrow: ExcalidrawArrowElement,
  point: GlobalPoint,
  element: ExcalidrawBindableElement,
  startOrEnd: "start" | "end",
  elementsMap: ElementsMap,
  zoom: AppState["zoom"],
  isMidpointSnappingEnabled: boolean = true,
): GlobalPoint | null =>
```

## File: packages/element/src/visualdebug.ts
```typescript
import {
  isLineSegment,
  lineSegment,
  pointDistanceSq,
  pointFrom,
  type GlobalPoint,
  type LocalPoint,
} from "@excalidraw/math";
import { type Bounds, isBounds } from "@excalidraw/common";
import {
  getElementBounds,
  intersectElementWithLineSegment,
  isFreeDrawElement,
  isLinearElement,
  isPathALoop,
} from "@excalidraw/element";
import type { ElementsMap, ExcalidrawElement } from "@excalidraw/element/types";
import type { Curve } from "@excalidraw/math";
import type { LineSegment } from "@excalidraw/utils";
⋮----
interface Window {
    visualDebug?: {
      data: DebugElement[][];
      currentFrame?: number;
    };
  }
⋮----
export type DebugElement = {
  color: string;
  data: LineSegment<GlobalPoint> | Curve<GlobalPoint> | DebugPolygon;
  permanent: boolean;
};
export type DebugPolygon = {
  type: "polygon";
  points: GlobalPoint[];
  fill?: boolean;
  close?: boolean;
};
export const debugDrawHitVolume = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  options?: {
    rays?: number;
    color?: string;
    fill?: boolean;
  },
) =>
export const debugDrawCubicBezier = (
  c: Curve<GlobalPoint>,
  opts?: {
    color?: string;
    permanent?: boolean;
  },
) =>
export const debugDrawLine = (
  segment: LineSegment<GlobalPoint> | LineSegment<GlobalPoint>[],
  opts?: {
    color?: string;
    permanent?: boolean;
  },
) =>
export const debugDrawPolygon = (
  points: GlobalPoint[],
  opts?: {
    color?: string;
    permanent?: boolean;
    fill?: boolean;
    close?: boolean;
  },
) =>
export const debugDrawPoint = (
  p: GlobalPoint,
  opts?: {
    color?: string;
    permanent?: boolean;
    fuzzy?: boolean;
  },
) =>
export const debugDrawBounds = (
  box: Bounds | Bounds[],
  opts?: {
    color?: string;
    permanent?: boolean;
  },
) =>
export const debugDrawPoints = (
  {
    x,
    y,
    points,
  }: {
    x: number;
    y: number;
    points: readonly LocalPoint[];
  },
  options?: any,
) =>
export const debugCloseFrame = () =>
export const debugClear = () =>
const addToCurrentFrame = (element: DebugElement) =>
```

## File: packages/element/src/zindex.ts
```typescript
import { arrayToMap, findIndex, findLastIndex } from "@excalidraw/common";
import type { AppState } from "@excalidraw/excalidraw/types";
import type { GlobalPoint } from "@excalidraw/math";
import { isFrameLikeElement, isTextElement } from "./typeChecks";
import { getElementsInGroup } from "./groups";
import { syncMovedIndices } from "./fractionalIndex";
import { getSelectedElements } from "./selection";
import { getBoundTextElement, getContainerElement } from "./textElement";
import { getHoveredElementForBinding } from "./collision";
import type { Scene } from "./Scene";
import type {
  ExcalidrawArrowElement,
  ExcalidrawElement,
  ExcalidrawFrameLikeElement,
  NonDeletedExcalidrawElement,
  NonDeletedSceneElementsMap,
  Ordered,
  OrderedExcalidrawElement,
} from "./types";
const isOfTargetFrame = (element: ExcalidrawElement, frameId: string) =>
const getIndicesToMove = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  elementsToBeMoved?: readonly ExcalidrawElement[],
) =>
const toContiguousGroups = (array: number[]) =>
const getTargetIndexAccountingForBinding = (
  nextElement: ExcalidrawElement,
  elements: readonly ExcalidrawElement[],
  direction: "left" | "right",
  scene: Scene,
) =>
const getContiguousFrameRangeElements = (
  allElements: readonly ExcalidrawElement[],
  frameId: ExcalidrawFrameLikeElement["id"],
) =>
export const moveArrowAboveBindable = (
  point: GlobalPoint,
  arrow: ExcalidrawArrowElement,
  elements: readonly Ordered<NonDeletedExcalidrawElement>[],
  elementsMap: NonDeletedSceneElementsMap,
  scene: Scene,
  hit?: NonDeletedExcalidrawElement,
): readonly OrderedExcalidrawElement[] =>
const getTargetIndex = (
  appState: AppState,
  elements: readonly ExcalidrawElement[],
  boundaryIndex: number,
  direction: "left" | "right",
  containingFrame: ExcalidrawFrameLikeElement["id"] | null,
  scene: Scene,
) =>
⋮----
const indexFilter = (element: ExcalidrawElement) =>
⋮----
// candidate element is outside current editing group → prevent
⋮----
const getTargetElementsMap = <T extends ExcalidrawElement>(
  elements: readonly T[],
  indices: number[],
) =>
const shiftElementsByOne = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  direction: "left" | "right",
  scene: Scene,
) =>
const shiftElementsToEnd = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  direction: "left" | "right",
  containingFrame: ExcalidrawFrameLikeElement["id"] | null,
  elementsToBeMoved?: readonly ExcalidrawElement[],
) =>
function shiftElementsAccountingForFrames(
  allElements: readonly ExcalidrawElement[],
  appState: AppState,
  direction: "left" | "right",
  shiftFunction: (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    direction: "left" | "right",
    containingFrame: ExcalidrawFrameLikeElement["id"] | null,
    elementsToBeMoved?: readonly ExcalidrawElement[],
  ) => ExcalidrawElement[] | readonly ExcalidrawElement[],
)
export const moveOneLeft = (
  allElements: readonly ExcalidrawElement[],
  appState: AppState,
  scene: Scene,
) =>
export const moveOneRight = (
  allElements: readonly ExcalidrawElement[],
  appState: AppState,
  scene: Scene,
) =>
export const moveAllLeft = (
  allElements: readonly ExcalidrawElement[],
  appState: AppState,
) =>
export const moveAllRight = (
  allElements: readonly ExcalidrawElement[],
  appState: AppState,
) =>
```

## File: packages/element/tests/align.test.tsx
```typescript
import { KEYS } from "@excalidraw/common";
import {
  actionAlignVerticallyCentered,
  actionAlignHorizontallyCentered,
  actionGroup,
  actionAlignTop,
  actionAlignBottom,
  actionAlignLeft,
  actionAlignRight,
} from "@excalidraw/excalidraw/actions";
import { defaultLang, setLanguage } from "@excalidraw/excalidraw/i18n";
import { Excalidraw } from "@excalidraw/excalidraw";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { UI, Pointer, Keyboard } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  act,
  unmountComponent,
  render,
} from "@excalidraw/excalidraw/tests/test-utils";
⋮----
const createAndSelectTwoRectangles = () =>
const createAndSelectTwoRectanglesWithDifferentSizes = () =>
⋮----
const createAndSelectGroupAndRectangle = () =>
⋮----
const createAndSelectTwoGroups = () =>
⋮----
const createAndSelectNestedGroupAndRectangle = () =>
⋮----
const createGroupAndSelectInEditGroupMode = () =>
⋮----
const createNestedGroupAndSelectInEditGroupMode = () =>
⋮----
const createAndSelectSingleGroup = () =>
⋮----
const createAndSelectSingleGroupWithNestedGroup = () =>
```

## File: packages/element/tests/binding.test.tsx
```typescript
import { KEYS, arrayToMap } from "@excalidraw/common";
import { pointFrom } from "@excalidraw/math";
import { actionWrapTextInContainer } from "@excalidraw/excalidraw/actions/actionBoundText";
import { Excalidraw, isLinearElement } from "@excalidraw/excalidraw";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { UI, Pointer, Keyboard } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  act,
  fireEvent,
  render,
} from "@excalidraw/excalidraw/tests/test-utils";
import { defaultLang, setLanguage } from "@excalidraw/excalidraw/i18n";
import { getTransformHandles } from "../src/transformHandles";
import {
  getTextEditor,
  TEXT_EDITOR_SELECTOR,
} from "../../excalidraw/tests/queries/dom";
import type {
  ExcalidrawArrowElement,
  ExcalidrawLinearElement,
  FixedPointBinding,
} from "../src/types";
```

## File: packages/element/tests/bounds.test.ts
```typescript
import { pointFrom } from "@excalidraw/math";
import { arrayToMap, ROUNDNESS } from "@excalidraw/common";
import type { LocalPoint } from "@excalidraw/math";
import { getElementAbsoluteCoords, getElementBounds } from "../src/bounds";
import type { ExcalidrawElement, ExcalidrawLinearElement } from "../src/types";
const _ce = ({
  x,
  y,
  w,
  h,
  a,
  t,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  a?: number;
  t?: string;
})
```

## File: packages/element/tests/collision.test.tsx
```typescript
import { arrayToMap } from "@excalidraw/common";
import { type GlobalPoint, type LocalPoint, pointFrom } from "@excalidraw/math";
import { Excalidraw } from "@excalidraw/excalidraw";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { UI } from "@excalidraw/excalidraw/tests/helpers/ui";
⋮----
import { render } from "@excalidraw/excalidraw/tests/test-utils";
⋮----
import { hitElementItself } from "../src/collision";
```

## File: packages/element/tests/cropElement.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { KEYS, cloneJSON } from "@excalidraw/common";
import {
  Excalidraw,
  exportToCanvas,
  exportToSvg,
} from "@excalidraw/excalidraw";
import {
  actionFlipHorizontal,
  actionFlipVertical,
} from "@excalidraw/excalidraw/actions";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { Keyboard, Pointer, UI } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  act,
  GlobalTestState,
  render,
  unmountComponent,
} from "@excalidraw/excalidraw/tests/test-utils";
import type { NormalizedZoomValue } from "@excalidraw/excalidraw/types";
import { duplicateElement } from "../src/duplicate";
import type { ExcalidrawImageElement, ImageCrop } from "../src/types";
⋮----
const generateRandomNaturalWidthAndHeight = (image: ExcalidrawImageElement) =>
const compareCrops = (cropA: ImageCrop, cropB: ImageCrop) =>
```

## File: packages/element/tests/delta.test.tsx
```typescript
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import type { ObservedAppState } from "@excalidraw/excalidraw/types";
import type { LinearElementEditor } from "@excalidraw/element";
import type { SceneElementsMap } from "@excalidraw/element/types";
import { AppStateDelta, Delta, ElementsDelta } from "../src/delta";
```

## File: packages/element/tests/distribute.test.tsx
```typescript
import {
  distributeHorizontally,
  distributeVertically,
} from "@excalidraw/excalidraw/actions";
import { defaultLang, setLanguage } from "@excalidraw/excalidraw/i18n";
import { Excalidraw } from "@excalidraw/excalidraw";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { UI, Pointer, Keyboard } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  act,
  unmountComponent,
  render,
} from "@excalidraw/excalidraw/tests/test-utils";
⋮----
const createAndSelectThreeRectanglesWithGap = () =>
const createAndSelectThreeRectanglesWithoutGap = () =>
```

## File: packages/element/tests/duplicate.test.tsx
```typescript
import { pointFrom } from "@excalidraw/math";
import {
  FONT_FAMILY,
  ORIG_ID,
  ROUNDNESS,
  isPrimitive,
} from "@excalidraw/common";
import { Excalidraw, mutateElement } from "@excalidraw/excalidraw";
import { actionDuplicateSelection } from "@excalidraw/excalidraw/actions";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { UI, Keyboard, Pointer } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  act,
  assertElements,
  getCloneByOrigId,
  render,
} from "@excalidraw/excalidraw/tests/test-utils";
import type { LocalPoint } from "@excalidraw/math";
import { duplicateElement, duplicateElements } from "../src/duplicate";
import type { ExcalidrawLinearElement } from "../src/types";
⋮----
const assertCloneObjects = (source: any, clone: any) =>
```

## File: packages/element/tests/elbowArrow.test.tsx
```typescript
import { ARROW_TYPE } from "@excalidraw/common";
import { pointFrom } from "@excalidraw/math";
import { Excalidraw } from "@excalidraw/excalidraw";
import { actionSelectAll } from "@excalidraw/excalidraw/actions";
import { actionDuplicateSelection } from "@excalidraw/excalidraw/actions/actionDuplicateSelection";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { Pointer, UI } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  act,
  fireEvent,
  GlobalTestState,
  queryByTestId,
  render,
} from "@excalidraw/excalidraw/tests/test-utils";
⋮----
import { bindBindingElement } from "@excalidraw/element";
import type { LocalPoint } from "@excalidraw/math";
import { Scene } from "../src/Scene";
import type {
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  ExcalidrawElbowArrowElement,
} from "../src/types";
```

## File: packages/element/tests/embeddable.test.ts
```typescript
import { embeddableURLValidator, getEmbedLink } from "../src/embeddable";
```

## File: packages/element/tests/flowchart.test.tsx
```typescript
import { KEYS, reseed } from "@excalidraw/common";
import { Excalidraw } from "@excalidraw/excalidraw";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { UI, Keyboard, Pointer } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  render,
  unmountComponent,
} from "@excalidraw/excalidraw/tests/test-utils";
```

## File: packages/element/tests/fractionalIndex.test.ts
```typescript
import { generateKeyBetween } from "fractional-indexing";
import { arrayToMap } from "@excalidraw/common";
import {
  syncInvalidIndices,
  syncMovedIndices,
  validateFractionalIndices,
} from "@excalidraw/element";
import { deepCopyElement } from "@excalidraw/element";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import type {
  ElementsMap,
  ExcalidrawElement,
  FractionalIndex,
} from "@excalidraw/element/types";
import { InvalidFractionalIndexError } from "../src/fractionalIndex";
⋮----
function testMovedIndicesSync(args: {
  elements: { id: string; index?: string }[];
  movedElements: string[];
  expect: {
    unchangedElements: string[];
    validInput?: true;
  };
})
function testInvalidIndicesSync(args: {
  elements: { id: string; index?: string }[];
  expect: {
    unchangedElements: string[];
    validInput?: true;
  };
})
function prepareArguments(
  elementsLike: { id: string; index?: string }[],
  movedElementsIds?: string[],
): [ExcalidrawElement[], ElementsMap | undefined]
function test(
  name: string,
  elements: ExcalidrawElement[],
  movedElements: ElementsMap | undefined,
  expectUnchangedElements: Map<string, { id: string }>,
  expectValidInput?: boolean,
)
```

## File: packages/element/tests/frame.test.tsx
```typescript
import {
  convertToExcalidrawElements,
  Excalidraw,
} from "@excalidraw/excalidraw";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { Keyboard, Pointer } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  getCloneByOrigId,
  render,
} from "@excalidraw/excalidraw/tests/test-utils";
import type { ExcalidrawElement } from "../src/types";
⋮----
type ElementType = string;
const assertOrder = (
    els: readonly { type: ElementType }[],
    order: ElementType[],
) =>
const reorderElements = <T extends { type: ElementType }>(
    els: readonly T[],
    order: ElementType[],
) =>
function resizeFrameOverElement(
    frame: ExcalidrawElement,
    element: ExcalidrawElement,
)
function dragElementIntoFrame(
    frame: ExcalidrawElement,
    element: ExcalidrawElement,
)
function selectElementAndDuplicate(
    element: ExcalidrawElement,
    moveTo: [number, number] = [element.x + 25, element.y + 25],
)
function expectEqualIds(expected: ExcalidrawElement[])
⋮----
const commonTestCases = async (
    func: typeof resizeFrameOverElement | typeof dragElementIntoFrame,
) =>
const resizingTest = async (
    containerType: "arrow" | "rectangle",
    initialOrder: ElementType[],
    expectedOrder: ElementType[],
) =>
```

## File: packages/element/tests/linearElementEditor.test.tsx
```typescript
import { pointCenter, pointFrom } from "@excalidraw/math";
import { act, queryByTestId, queryByText } from "@testing-library/react";
import { vi } from "vitest";
import {
  ROUNDNESS,
  VERTICAL_ALIGN,
  KEYS,
  reseed,
  arrayToMap,
} from "@excalidraw/common";
import { Excalidraw } from "@excalidraw/excalidraw";
⋮----
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { Keyboard, Pointer, UI } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  screen,
  render,
  fireEvent,
  GlobalTestState,
  unmountComponent,
} from "@excalidraw/excalidraw/tests/test-utils";
import type { GlobalPoint, LocalPoint } from "@excalidraw/math";
import { wrapText } from "../src";
⋮----
import { getBoundTextElementPosition, getBoundTextMaxWidth } from "../src";
import { LinearElementEditor } from "../src";
import { newArrowElement } from "../src";
import {
  getTextEditor,
  TEXT_EDITOR_SELECTOR,
} from "../../excalidraw/tests/queries/dom";
import type {
  ExcalidrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElementWithContainer,
  FontString,
} from "../src/types";
⋮----
const createTwoPointerLinearElement = (
    type: ExcalidrawLinearElement["type"],
    roundness: ExcalidrawElement["roundness"] = null,
    roughness: ExcalidrawLinearElement["roughness"] = 0,
) =>
const createThreePointerLinearElement = (
    type: ExcalidrawLinearElement["type"],
    roundness: ExcalidrawElement["roundness"] = null,
    roughness: ExcalidrawLinearElement["roughness"] = 0,
) =>
const enterLineEditingMode = (
    line: ExcalidrawLinearElement,
    selectProgrammatically = false,
) =>
const drag = (startPoint: GlobalPoint, endPoint: GlobalPoint) =>
const deletePoint = (point: GlobalPoint) =>
⋮----
const createBoundTextElement = (
      text: string,
      container: ExcalidrawLinearElement,
) =>
```

## File: packages/element/tests/resize.test.tsx
```typescript
import { pointFrom } from "@excalidraw/math";
import { Excalidraw } from "@excalidraw/excalidraw";
import {
  type Bounds,
  KEYS,
  getSizeFromPoints,
  reseed,
  arrayToMap,
} from "@excalidraw/common";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { UI, Keyboard, Pointer } from "@excalidraw/excalidraw/tests/helpers/ui";
import {
  render,
  unmountComponent,
} from "@excalidraw/excalidraw/tests/test-utils";
import type { LocalPoint } from "@excalidraw/math";
import { isLinearElement } from "../src/typeChecks";
import { resizeSingleElement } from "../src/resizeElements";
import { LinearElementEditor } from "../src/linearElementEditor";
import { getElementPointsCoords } from "../src/bounds";
import type {
  ExcalidrawElbowArrowElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawLinearElement,
} from "../src/types";
⋮----
const getBoundsFromPoints = (
  element: ExcalidrawLinearElement | ExcalidrawFreeDrawElement,
): Bounds =>
```

## File: packages/element/tests/selection.test.ts
```typescript
import { makeNextSelectedElementIds } from "../src/selection";
⋮----
const _makeNextSelectedElementIds = (
    selectedElementIds: { [id: string]: true },
    prevSelectedElementIds: { [id: string]: true },
    expectUpdated: boolean,
) =>
```

## File: packages/element/tests/sizeHelpers.test.ts
```typescript
import { vi } from "vitest";
import { getPerfectElementSize } from "../src/sizeHelpers";
```

## File: packages/element/tests/sortElements.test.ts
```typescript
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { mutateElement } from "@excalidraw/element";
import { normalizeElementOrder } from "../src/sortElements";
import type { ExcalidrawElement } from "../src/types";
⋮----
const assertOrder = (
  elements: readonly ExcalidrawElement[],
  expectedOrder: string[],
) =>
⋮----
const makeElements = (iterations: number) =>
```

## File: packages/element/tests/textElement.test.ts
```typescript
import { getLineHeight } from "@excalidraw/common";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { FONT_FAMILY, TEXT_ALIGN, VERTICAL_ALIGN } from "@excalidraw/common";
import {
  computeContainerDimensionForBoundText,
  getContainerCoords,
  getBoundTextMaxWidth,
  getBoundTextMaxHeight,
  computeBoundTextPosition,
} from "../src/textElement";
import { detectLineHeight, getLineHeightInPx } from "../src/textMeasurements";
import type { ExcalidrawTextElementWithContainer } from "../src/types";
⋮----
const createMockElementsMap = ()
const createRotatedRectangleTestCase = (
    textAlign: string,
    verticalAlign: string,
) =>
```

## File: packages/element/tests/textWrapping.test.ts
```typescript
import {
  getWrappedTextLines,
  parseTokens,
  wrapText,
} from "../src/textWrapping";
import type { FontString } from "../src/types";
```

## File: packages/element/tests/typeChecks.test.ts
```typescript
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { hasBoundTextElement } from "../src/typeChecks";
```

## File: packages/element/tests/zindex.test.tsx
```typescript
import { reseed } from "@excalidraw/common";
import {
  actionSendBackward,
  actionBringForward,
  actionBringToFront,
  actionSendToBack,
  actionDuplicateSelection,
} from "@excalidraw/excalidraw/actions";
import { Excalidraw } from "@excalidraw/excalidraw";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import {
  act,
  getCloneByOrigId,
  render,
  unmountComponent,
} from "@excalidraw/excalidraw/tests/test-utils";
import type { AppState } from "@excalidraw/excalidraw/types";
import { selectGroupsForSelectedElements } from "../src/groups";
import type {
  ExcalidrawElement,
  ExcalidrawFrameElement,
  ExcalidrawSelectionElement,
} from "../src/types";
⋮----
type ExcalidrawElementType = Exclude<
  ExcalidrawElement,
  ExcalidrawSelectionElement
>["type"];
const populateElements = (
  elements: {
    id: string;
    type?: ExcalidrawElementType;
    isDeleted?: boolean;
    isSelected?: boolean;
    groupIds?: string[];
    y?: number;
    x?: number;
    width?: number;
    height?: number;
    containerId?: string;
    frameId?: ExcalidrawFrameElement["id"];
    index?: ExcalidrawElement["index"];
  }[],
  appState?: Partial<AppState>,
) =>
type Actions =
  | typeof actionBringForward
  | typeof actionSendBackward
  | typeof actionBringToFront
  | typeof actionSendToBack;
const assertZindex = ({
  elements,
  appState,
  operations,
}: {
  elements: {
    id: string;
    isDeleted?: true;
    isSelected?: true;
    groupIds?: string[];
    containerId?: string;
    frameId?: ExcalidrawFrameElement["id"];
    type?: ExcalidrawElementType;
  }[];
  appState?: Partial<AppState>;
  operations: [Actions, string[]][];
}) =>
```

## File: packages/element/global.d.ts
```typescript

```

## File: packages/excalidraw/actions/actionAddToLibrary.ts
```typescript
import { LIBRARY_DISABLED_TYPES, randomId } from "@excalidraw/common";
import { deepCopyElement } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import { t } from "../i18n";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionAlign.tsx
```typescript
import { getNonDeletedElements } from "@excalidraw/element";
import { isFrameLikeElement } from "@excalidraw/element";
import { updateFrameMembershipOfSelectedElements } from "@excalidraw/element";
import { KEYS, arrayToMap } from "@excalidraw/common";
import { alignElements } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import { getSelectedElementsByGroup } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { Alignment } from "@excalidraw/element";
import { ToolButton } from "../components/ToolButton";
import {
  AlignBottomIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  CenterHorizontallyIcon,
  CenterVerticallyIcon,
} from "../components/icons";
import { t } from "../i18n";
import { isSomeElementSelected } from "../scene";
import { getShortcutKey } from "../shortcut";
import { register } from "./register";
import type { AppClassProperties, AppState, UIAppState } from "../types";
export const alignActionsPredicate = (
  appState: UIAppState,
  app: AppClassProperties,
) =>
const alignSelectedElements = (
  elements: readonly ExcalidrawElement[],
  appState: Readonly<AppState>,
  app: AppClassProperties,
  alignment: Alignment,
) =>
```

## File: packages/excalidraw/actions/actionBoundText.tsx
```typescript
import {
  BOUND_TEXT_PADDING,
  ROUNDNESS,
  TEXT_ALIGN,
  VERTICAL_ALIGN,
  arrayToMap,
  getFontString,
} from "@excalidraw/common";
import {
  getOriginalContainerHeightFromCache,
  isBoundToContainer,
  resetOriginalContainerCache,
  updateOriginalContainerCache,
} from "@excalidraw/element";
import {
  computeBoundTextPosition,
  computeContainerDimensionForBoundText,
  getBoundTextElement,
  redrawTextBoundingBox,
} from "@excalidraw/element";
import {
  hasBoundTextElement,
  isArrowElement,
  isTextBindableContainer,
  isTextElement,
  isUsingAdaptiveRadius,
} from "@excalidraw/element";
import { measureText } from "@excalidraw/element";
import { syncMovedIndices } from "@excalidraw/element";
import { newElement } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextContainer,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import type { Mutable } from "@excalidraw/common/utility-types";
import type { Radians } from "@excalidraw/math";
import { register } from "./register";
import type { AppState } from "../types";
⋮----
const pushTextAboveContainer = (
  elements: readonly ExcalidrawElement[],
  container: ExcalidrawElement,
  textElement: ExcalidrawTextElement,
) =>
const pushContainerBelowText = (
  elements: readonly ExcalidrawElement[],
  container: ExcalidrawElement,
  textElement: ExcalidrawTextElement,
) =>
```

## File: packages/excalidraw/actions/actionCanvas.tsx
```typescript
import { clamp, roundToStep } from "@excalidraw/math";
import {
  DEFAULT_CANVAS_BACKGROUND_PICKS,
  CURSOR_TYPE,
  MAX_ZOOM,
  MIN_ZOOM,
  THEME,
  ZOOM_STEP,
  updateActiveTool,
  CODES,
  KEYS,
} from "@excalidraw/common";
import { getNonDeletedElements } from "@excalidraw/element";
import { newElementWith } from "@excalidraw/element";
import { getCommonBounds, type SceneBounds } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import {
  getDefaultAppState,
  isEraserActive,
  isHandToolActive,
} from "../appState";
import { ColorPicker } from "../components/ColorPicker/ColorPicker";
import { ToolButton } from "../components/ToolButton";
import { Tooltip } from "../components/Tooltip";
import {
  handIcon,
  LassoIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
  zoomAreaIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ZoomResetIcon,
} from "../components/icons";
import { setCursor } from "../cursor";
import { t } from "../i18n";
import { getNormalizedZoom } from "../scene";
import { centerScrollOn } from "../scene/scroll";
import { getStateForZoom } from "../scene/zoom";
import { getShortcutKey } from "../shortcut";
import { register } from "./register";
import type { AppState, Offsets } from "../types";
⋮----
aria-label=
⋮----
updateData(null);
⋮----
<Tooltip label=
```

## File: packages/excalidraw/actions/actionClipboard.tsx
```typescript
import { isTextElement } from "@excalidraw/element";
import { getTextFromElements } from "@excalidraw/element";
import { CODES, KEYS, isFirefox } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import {
  copyTextToSystemClipboard,
  copyToClipboard,
  createPasteEvent,
  probablySupportsClipboardBlob,
  probablySupportsClipboardWriteText,
  readSystemClipboard,
} from "../clipboard";
import { DuplicateIcon, cutIcon, pngIcon, svgIcon } from "../components/icons";
import { exportCanvas, prepareElementsForExport } from "../data/index";
import { t } from "../i18n";
import { actionDeleteSelected } from "./actionDeleteSelected";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionCropEditor.tsx
```typescript
import { isImageElement } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawImageElement } from "@excalidraw/element/types";
import { ToolButton } from "../components/ToolButton";
import { cropIcon } from "../components/icons";
import { t } from "../i18n";
import { register } from "./register";
⋮----
perform(elements, appState, _, app)
⋮----
onClick=
```

## File: packages/excalidraw/actions/actionDeleteSelected.test.tsx
```typescript
import React from "react";
import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import { act, assertElements, render } from "../tests/test-utils";
import { actionDeleteSelected } from "./actionDeleteSelected";
```

## File: packages/excalidraw/actions/actionDeleteSelected.tsx
```typescript
import {
  KEYS,
  MOBILE_ACTION_BUTTON_BG,
  updateActiveTool,
} from "@excalidraw/common";
import { getNonDeletedElements } from "@excalidraw/element";
import { fixBindingsAfterDeletion } from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import { newElementWith } from "@excalidraw/element";
import { getContainerElement } from "@excalidraw/element";
import {
  isBoundToContainer,
  isElbowArrow,
  isFrameLikeElement,
} from "@excalidraw/element";
import { getFrameChildren } from "@excalidraw/element";
import {
  getElementsInGroup,
  selectGroupsForSelectedElements,
} from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { t } from "../i18n";
import { getSelectedElements, isSomeElementSelected } from "../scene";
import { TrashIcon } from "../components/icons";
import { ToolButton } from "../components/ToolButton";
import { useStylesPanelMode } from "../components/App";
import { register } from "./register";
import type { AppClassProperties, AppState } from "../types";
const deleteSelectedElements = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  app: AppClassProperties,
) =>
const handleGroupEditingState = (
  appState: AppState,
  elements: readonly ExcalidrawElement[],
): AppState =>
⋮----
aria-label=
⋮----
!isSomeElementSelected(getNonDeletedElements(elements), appState)
```

## File: packages/excalidraw/actions/actionDistribute.tsx
```typescript
import { getNonDeletedElements } from "@excalidraw/element";
import { isFrameLikeElement } from "@excalidraw/element";
import { CODES, KEYS, arrayToMap } from "@excalidraw/common";
import { updateFrameMembershipOfSelectedElements } from "@excalidraw/element";
import { distributeElements } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import { getSelectedElementsByGroup } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { Distribution } from "@excalidraw/element";
import { ToolButton } from "../components/ToolButton";
import {
  DistributeHorizontallyIcon,
  DistributeVerticallyIcon,
} from "../components/icons";
import { t } from "../i18n";
import { isSomeElementSelected } from "../scene";
import { getShortcutKey } from "../shortcut";
import { register } from "./register";
import type { AppClassProperties, AppState } from "../types";
const enableActionGroup = (appState: AppState, app: AppClassProperties) =>
const distributeSelectedElements = (
  elements: readonly ExcalidrawElement[],
  appState: Readonly<AppState>,
  app: AppClassProperties,
  distribution: Distribution,
) =>
```

## File: packages/excalidraw/actions/actionDuplicateSelection.test.tsx
```typescript
import { ORIG_ID } from "@excalidraw/common";
import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import {
  act,
  assertElements,
  getCloneByOrigId,
  render,
} from "../tests/test-utils";
import { actionDuplicateSelection } from "./actionDuplicateSelection";
```

## File: packages/excalidraw/actions/actionDuplicateSelection.tsx
```typescript
import {
  DEFAULT_GRID_SIZE,
  KEYS,
  MOBILE_ACTION_BUTTON_BG,
  arrayToMap,
} from "@excalidraw/common";
import { getNonDeletedElements } from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import {
  getSelectedElements,
  getSelectionStateForElements,
} from "@excalidraw/element";
import { syncMovedIndices } from "@excalidraw/element";
import { duplicateElements } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import { ToolButton } from "../components/ToolButton";
import { DuplicateIcon } from "../components/icons";
import { t } from "../i18n";
import { isSomeElementSelected } from "../scene";
import { getShortcutKey } from "../shortcut";
import { useStylesPanelMode } from "../components/App";
import { register } from "./register";
⋮----
aria-label=
⋮----
!isSomeElementSelected(getNonDeletedElements(elements), appState)
```

## File: packages/excalidraw/actions/actionElementLink.ts
```typescript
import {
  canCreateLinkFromElements,
  defaultGetElementLinkFromSelection,
  getLinkIdAndTypeFromSelection,
} from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import { copyTextToSystemClipboard } from "../clipboard";
import { copyIcon, elementLinkIcon } from "../components/icons";
import { t } from "../i18n";
import { getSelectedElements } from "../scene";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionElementLock.test.tsx
```typescript
import { queryByTestId, fireEvent } from "@testing-library/react";
import React from "react";
import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import { Pointer, UI } from "../tests/helpers/ui";
import { render } from "../tests/test-utils";
```

## File: packages/excalidraw/actions/actionElementLock.ts
```typescript
import { KEYS, arrayToMap, randomId } from "@excalidraw/common";
import {
  elementsAreInSameGroup,
  newElementWith,
  selectGroupsFromGivenElements,
} from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { LockedIcon, UnlockedIcon } from "../components/icons";
import { getSelectedElements } from "../scene";
import { register } from "./register";
import type { AppState } from "../types";
const shouldLock = (elements: readonly ExcalidrawElement[])
```

## File: packages/excalidraw/actions/actionEmbeddable.ts
```typescript
import { updateActiveTool } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { setCursorForShape } from "../cursor";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionExport.tsx
```typescript
import {
  KEYS,
  DEFAULT_EXPORT_PADDING,
  EXPORT_SCALES,
  THEME,
} from "@excalidraw/common";
import { getNonDeletedElements } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawElement, Theme } from "@excalidraw/element/types";
import { useEditorInterface } from "../components/App";
import { CheckboxItem } from "../components/CheckboxItem";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { ProjectName } from "../components/ProjectName";
import { Toast } from "../components/Toast";
import { ToolButton } from "../components/ToolButton";
import { Tooltip } from "../components/Tooltip";
import { ExportIcon, questionCircle, saveAs } from "../components/icons";
import { loadFromJSON, saveAsJSON } from "../data";
import { isImageFileHandle } from "../data/blob";
import { nativeFileSystemSupported } from "../data/filesystem";
import { resaveAsImageWithScene } from "../data/resave";
import { t } from "../i18n";
import { getSelectedElements, isSomeElementSelected } from "../scene";
import { getExportSize } from "../scene/export";
⋮----
import { register } from "./register";
import type { JSONExportData } from "../data/json";
import type {
  AppClassProperties,
  AppState,
  BinaryFiles,
  ExcalidrawProps,
  OnExportProgress,
} from "../types";
⋮----
label=
⋮----
onChange=
⋮----
aria-label=
```

## File: packages/excalidraw/actions/actionFinalize.tsx
```typescript
import { pointFrom } from "@excalidraw/math";
import { bindOrUnbindBindingElement } from "@excalidraw/element/binding";
import {
  isValidPolygon,
  LinearElementEditor,
  newElementWith,
} from "@excalidraw/element";
import {
  isBindingElement,
  isFreeDrawElement,
  isLinearElement,
  isLineElement,
} from "@excalidraw/element";
import {
  KEYS,
  arrayToMap,
  invariant,
  shouldRotateWithDiscreteAngle,
  updateActiveTool,
} from "@excalidraw/common";
import { isPathALoop } from "@excalidraw/element";
import { isInvisiblySmallElement } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { GlobalPoint, LocalPoint } from "@excalidraw/math";
import type {
  ExcalidrawElement,
  ExcalidrawLinearElement,
  NonDeleted,
  PointsPositionUpdates,
} from "@excalidraw/element/types";
import { t } from "../i18n";
import { resetCursor } from "../cursor";
import { done } from "../components/icons";
import { ToolButton } from "../components/ToolButton";
import { register } from "./register";
import type { AppState } from "../types";
type FormData = {
  event: PointerEvent;
  sceneCoords: { x: number; y: number };
};
⋮----
aria-label=
```

## File: packages/excalidraw/actions/actionFlip.test.tsx
```typescript
import { pointFrom } from "@excalidraw/math";
import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import { render } from "../tests/test-utils";
import { actionFlipHorizontal, actionFlipVertical } from "./actionFlip";
```

## File: packages/excalidraw/actions/actionFlip.ts
```typescript
import { getNonDeletedElements } from "@excalidraw/element";
import { bindOrUnbindBindingElements } from "@excalidraw/element";
import { getCommonBoundingBox } from "@excalidraw/element";
import { newElementWith } from "@excalidraw/element";
import { deepCopyElement } from "@excalidraw/element";
import { resizeMultipleElements } from "@excalidraw/element";
import { isArrowElement, isElbowArrow } from "@excalidraw/element";
import { updateFrameMembershipOfSelectedElements } from "@excalidraw/element";
import { CODES, KEYS, arrayToMap } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import type {
  ExcalidrawArrowElement,
  ExcalidrawElbowArrowElement,
  ExcalidrawElement,
  NonDeleted,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import { getSelectedElements } from "../scene";
import { flipHorizontal, flipVertical } from "../components/icons";
import { register } from "./register";
import type { AppClassProperties, AppState } from "../types";
⋮----
const flipSelectedElements = (
  elements: readonly ExcalidrawElement[],
  elementsMap: NonDeletedSceneElementsMap,
  appState: Readonly<AppState>,
  flipDirection: "horizontal" | "vertical",
  app: AppClassProperties,
) =>
const flipElements = (
  selectedElements: NonDeleted<ExcalidrawElement>[],
  elementsMap: NonDeletedSceneElementsMap,
  flipDirection: "horizontal" | "vertical",
  app: AppClassProperties,
): ExcalidrawElement[] =>
```

## File: packages/excalidraw/actions/actionFrame.ts
```typescript
import { getNonDeletedElements } from "@excalidraw/element";
import { mutateElement } from "@excalidraw/element";
import { newFrameElement } from "@excalidraw/element";
import { isFrameLikeElement } from "@excalidraw/element";
import {
  addElementsToFrame,
  removeAllElementsFromFrame,
} from "@excalidraw/element";
import { getFrameChildren } from "@excalidraw/element";
import { KEYS, updateActiveTool } from "@excalidraw/common";
import { getElementsInGroup } from "@excalidraw/element";
import { getCommonBounds } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { setCursorForShape } from "../cursor";
import { frameToolIcon } from "../components/icons";
import { getSelectedElements } from "../scene";
import { register } from "./register";
import type { AppClassProperties, AppState, UIAppState } from "../types";
const isSingleFrameSelected = (
  appState: UIAppState,
  app: AppClassProperties,
) =>
```

## File: packages/excalidraw/actions/actionGroup.tsx
```typescript
import { getNonDeletedElements } from "@excalidraw/element";
import { newElementWith } from "@excalidraw/element";
import { isBoundToContainer } from "@excalidraw/element";
import {
  frameAndChildrenSelectedTogether,
  getElementsInResizingFrame,
  getFrameLikeElements,
  getRootElements,
  groupByFrameLikes,
  removeElementsFromFrame,
  replaceAllElementsInFrame,
} from "@excalidraw/element";
import { KEYS, randomId, arrayToMap } from "@excalidraw/common";
import {
  getSelectedGroupIds,
  selectGroup,
  selectGroupsForSelectedElements,
  getElementsInGroup,
  addToGroup,
  removeFromSelectedGroups,
  isElementInGroup,
} from "@excalidraw/element";
import { syncMovedIndices } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawTextElement,
  OrderedExcalidrawElement,
} from "@excalidraw/element/types";
import { ToolButton } from "../components/ToolButton";
import { UngroupIcon, GroupIcon } from "../components/icons";
import { t } from "../i18n";
import { isSomeElementSelected } from "../scene";
import { getShortcutKey } from "../shortcut";
import { register } from "./register";
import type { AppClassProperties, AppState } from "../types";
const allElementsInSameGroup = (elements: readonly ExcalidrawElement[]) =>
const enableActionGroup = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  app: AppClassProperties,
) =>
⋮----
hidden=
⋮----
onClick=
```

## File: packages/excalidraw/actions/actionHistory.tsx
```typescript
import {
  isWindows,
  KEYS,
  matchKey,
  arrayToMap,
  MOBILE_ACTION_BUTTON_BG,
} from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { orderByFractionalIndex } from "@excalidraw/element";
import type { SceneElementsMap } from "@excalidraw/element/types";
import { ToolButton } from "../components/ToolButton";
import { UndoIcon, RedoIcon } from "../components/icons";
import { HistoryChangedEvent } from "../history";
import { useEmitter } from "../hooks/useEmitter";
import { t } from "../i18n";
import { useStylesPanelMode } from "../components/App";
import type { History } from "../history";
import type { AppClassProperties, AppState } from "../types";
import type { Action, ActionResult } from "./types";
const executeHistoryAction = (
  app: AppClassProperties,
  appState: Readonly<AppState>,
  updater: () => [SceneElementsMap, AppState] | void,
): ActionResult =>
type ActionCreator = (history: History) => Action;
```

## File: packages/excalidraw/actions/actionLinearEditor.tsx
```typescript
import {
  isElbowArrow,
  isLinearElement,
  isLineElement,
} from "@excalidraw/element";
import { arrayToMap, invariant } from "@excalidraw/common";
import {
  toggleLinePolygonState,
  CaptureUpdateAction,
} from "@excalidraw/element";
import type {
  ExcalidrawLinearElement,
  ExcalidrawLineElement,
} from "@excalidraw/element/types";
import { DEFAULT_CATEGORIES } from "../components/CommandPalette/CommandPalette";
import { ToolButton } from "../components/ToolButton";
import { lineEditorIcon, polygonIcon } from "../components/icons";
import { t } from "../i18n";
import { ButtonIcon } from "../components/ButtonIcon";
import { newElementWith } from "../../element/src/mutateElement";
import { register } from "./register";
⋮----
perform(elements, appState, _, app)
⋮----
onClick=
```

## File: packages/excalidraw/actions/actionLink.tsx
```typescript
import { isEmbeddableElement } from "@excalidraw/element";
import { KEYS } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { ToolButton } from "../components/ToolButton";
import { getContextMenuLabel } from "../components/hyperlink/Hyperlink";
import { LinkIcon } from "../components/icons";
import { t } from "../i18n";
import { getSelectedElements } from "../scene";
import { getShortcutKey } from "../shortcut";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionMenu.tsx
```typescript
import { KEYS } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { HelpIconThin } from "../components/icons";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionNavigate.tsx
```typescript
import clsx from "clsx";
import { CaptureUpdateAction } from "@excalidraw/element";
import { invariant } from "@excalidraw/common";
import { getClientColor } from "../clients";
import { Avatar } from "../components/Avatar";
import {
  eyeIcon,
  microphoneIcon,
  microphoneMutedIcon,
} from "../components/icons";
import { t } from "../i18n";
import { register } from "./register";
import type { GoToCollaboratorComponentProps } from "../components/UserList";
import type { Collaborator } from "../types";
⋮----
// Close mobile menu
⋮----
<div title=
⋮----
onClick=
```

## File: packages/excalidraw/actions/actionProperties.test.tsx
```typescript
import { queryByTestId } from "@testing-library/react";
import {
  COLOR_PALETTE,
  DEFAULT_ELEMENT_BACKGROUND_PICKS,
  FONT_FAMILY,
  STROKE_WIDTH,
} from "@excalidraw/common";
import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import { UI } from "../tests/helpers/ui";
import { render } from "../tests/test-utils";
```

## File: packages/excalidraw/actions/actionProperties.tsx
```typescript
import { pointFrom } from "@excalidraw/math";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_ELEMENT_BACKGROUND_COLOR_PALETTE,
  DEFAULT_ELEMENT_BACKGROUND_PICKS,
  DEFAULT_ELEMENT_STROKE_COLOR_PALETTE,
  DEFAULT_ELEMENT_STROKE_PICKS,
  ARROW_TYPE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  FONT_FAMILY,
  ROUNDNESS,
  STROKE_WIDTH,
  VERTICAL_ALIGN,
  KEYS,
  randomInteger,
  arrayToMap,
  getFontFamilyString,
  getLineHeight,
  isTransparent,
  reduceToCommonValue,
  invariant,
  FONT_SIZES,
} from "@excalidraw/common";
import { canBecomePolygon, getNonDeletedElements } from "@excalidraw/element";
import {
  bindBindingElement,
  calculateFixedPointForElbowArrowBinding,
  updateBoundElements,
} from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import { newElementWith } from "@excalidraw/element";
import { getArrowheadForPicker } from "@excalidraw/element";
import {
  getBoundTextElement,
  redrawTextBoundingBox,
} from "@excalidraw/element";
import {
  isArrowElement,
  isBoundToContainer,
  isElbowArrow,
  isLinearElement,
  isLineElement,
  isTextElement,
  isUsingAdaptiveRadius,
} from "@excalidraw/element";
import { hasStrokeColor } from "@excalidraw/element";
import {
  updateElbowArrowPoints,
  CaptureUpdateAction,
  toggleLinePolygonState,
} from "@excalidraw/element";
import { deriveStylesPanelMode } from "@excalidraw/common";
import type { LocalPoint, Radians } from "@excalidraw/math";
import type {
  Arrowhead,
  ElementsMap,
  ExcalidrawBindableElement,
  ExcalidrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
  FontFamilyValues,
  TextAlign,
  VerticalAlign,
} from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import type { CaptureUpdateActionType } from "@excalidraw/element";
import { trackEvent } from "../analytics";
import { RadioSelection } from "../components/RadioSelection";
import { ColorPicker } from "../components/ColorPicker/ColorPicker";
import { FontPicker } from "../components/FontPicker/FontPicker";
import { IconPicker } from "../components/IconPicker";
import { Range } from "../components/Range";
import {
  ArrowheadArrowIcon,
  ArrowheadBarIcon,
  ArrowheadCircleIcon,
  ArrowheadTriangleIcon,
  ArrowheadNoneIcon,
  StrokeStyleDashedIcon,
  StrokeStyleDottedIcon,
  TextAlignTopIcon,
  TextAlignBottomIcon,
  TextAlignMiddleIcon,
  FillHachureIcon,
  FillCrossHatchIcon,
  FillSolidIcon,
  SloppinessArchitectIcon,
  SloppinessArtistIcon,
  SloppinessCartoonistIcon,
  StrokeWidthBaseIcon,
  StrokeWidthBoldIcon,
  StrokeWidthExtraBoldIcon,
  FontSizeSmallIcon,
  FontSizeMediumIcon,
  FontSizeLargeIcon,
  FontSizeExtraLargeIcon,
  EdgeSharpIcon,
  EdgeRoundIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FillZigZagIcon,
  ArrowheadTriangleOutlineIcon,
  ArrowheadCircleOutlineIcon,
  ArrowheadDiamondIcon,
  ArrowheadDiamondOutlineIcon,
  fontSizeIcon,
  sharpArrowIcon,
  roundArrowIcon,
  elbowArrowIcon,
  ArrowheadCardinalityExactlyOneIcon,
  ArrowheadCardinalityManyIcon,
  ArrowheadCardinalityOneIcon,
  ArrowheadCardinalityOneOrManyIcon,
  ArrowheadCardinalityZeroOrManyIcon,
  ArrowheadCardinalityZeroOrOneIcon,
} from "../components/icons";
import { Fonts } from "../fonts";
import { getLanguage, t } from "../i18n";
import {
  canHaveArrowheads,
  getSelectedElements,
  getTargetElements,
  isSomeElementSelected,
} from "../scene";
import {
  withCaretPositionPreservation,
  restoreCaretPosition,
} from "../hooks/useTextEditorFocus";
import { getShortcutKey } from "../shortcut";
import { register } from "./register";
import type { AppClassProperties, AppState, Primitive } from "../types";
⋮----
const getStylesPanelInfo = (app: AppClassProperties) =>
export const changeProperty = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  callback: (element: ExcalidrawElement) => ExcalidrawElement,
  includeBoundText = false,
) =>
⋮----
const offsetElementAfterFontResize = (
  prevElement: ExcalidrawTextElement,
  nextElement: ExcalidrawTextElement,
  scene: Scene,
) =>
const changeFontSize = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
  app: AppClassProperties,
  getNewFontSize: (element: ExcalidrawTextElement) => number,
  fallbackValue?: ExcalidrawTextElement["fontSize"],
) =>
⋮----
color={getFormValue(
            elements,
            app,
            (element) => element.strokeColor,
            true,
(hasSelection)
⋮----
color={getFormValue(
            elements,
            app,
            (element) => element.backgroundColor,
            true,
(hasSelection)
⋮----
<legend>{t("labels.fill")}</legend>
        <div className="buttonList">
          <RadioSelection
            type="button"
            options={[
              {
                value: "hachure",
                text: `${
                  allElementsZigZag ? t("labels.zigzag") : t("labels.hachure")
                } (${getShortcutKey("Alt-Click")})`,
                icon: allElementsZigZag ? FillZigZagIcon : FillHachureIcon,
                active: allElementsZigZag ? true : undefined,
                testId: `fill-hachure`,
              },
              {
                value: "cross-hatch",
                text: t("labels.crossHatch"),
                icon: FillCrossHatchIcon,
                testId: `fill-cross-hatch`,
              },
              {
                value: "solid",
                text: t("labels.solid"),
                icon: FillSolidIcon,
                testId: `fill-solid`,
              },
            ]}
            value={getFormValue(
              elements,
              app,
              (element) => element.fillStyle,
              (element) => element.hasOwnProperty("fillStyle"),
(hasSelection)
⋮----
value={getFormValue(
            elements,
            app,
            (element) => element.strokeWidth,
            (element) => element.hasOwnProperty("strokeWidth"),
(hasSelection)
⋮----
value={getFormValue(
            elements,
            app,
            (element) => element.roughness,
            (element) => element.hasOwnProperty("roughness"),
(hasSelection)
⋮----
value={getFormValue(
            elements,
            app,
            (element) => element.strokeStyle,
            (element) => element.hasOwnProperty("strokeStyle"),
(hasSelection)
⋮----
label=
⋮----
// reset the container back to it's cached version
⋮----
// size is irrelevant, but necessary
⋮----
// we either skip the check (have at least one font face loaded) or do the check and find out all the font faces have loaded
⋮----
// trigger synchronous redraw
⋮----
// otherwise try to load all font faces for the given chars and redraw elements once our font faces loaded
⋮----
// use latest element state to ensure we don't have closure over an old instance in order to avoid possible race conditions (i.e. font faces load out-of-order while rapidly switching fonts)
⋮----
// trigger async redraw
⋮----
// trigger update once we've mutated all the elements, which also updates our cache
⋮----
// relying on state batching as multiple `FontPicker` handlers could be called in rapid succession and we want to combine them
⋮----
const getFontFamily = (
        elementsArray: readonly ExcalidrawElement[],
        elementsMap: ElementsMap,
)
// popup opened, use cached elements
⋮----
onSelect=
⋮----
if (open)
⋮----
value={getFormValue(
              elements,
              app,
(element) =>
⋮----
value={getFormValue(
              elements,
              app,
(element)
⋮----
value={getFormValue<Arrowhead | null>(
              elements,
              app,
(element)
```

## File: packages/excalidraw/actions/actionSelectAll.ts
```typescript
import { getNonDeletedElements } from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import { isLinearElement, isTextElement } from "@excalidraw/element";
import { arrayToMap, KEYS } from "@excalidraw/common";
import { selectGroupsForSelectedElements } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { selectAllIcon } from "../components/icons";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionStyles.ts
```typescript
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_TEXT_ALIGN,
  CODES,
  KEYS,
  getLineHeight,
} from "@excalidraw/common";
import { newElementWith } from "@excalidraw/element";
import {
  hasBoundTextElement,
  canApplyRoundnessTypeToElement,
  getDefaultRoundnessTypeForElement,
  isFrameLikeElement,
  isArrowElement,
  isExcalidrawElement,
  isTextElement,
} from "@excalidraw/element";
import {
  getBoundTextElement,
  redrawTextBoundingBox,
} from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawTextElement } from "@excalidraw/element/types";
import { paintIcon } from "../components/icons";
import { t } from "../i18n";
import { getSelectedElements } from "../scene";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionTextAutoResize.ts
```typescript
import { getFontString } from "@excalidraw/common";
import { isExcalidrawElement, newElementWith } from "@excalidraw/element";
import { measureText } from "@excalidraw/element";
import { isTextElement } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { getSelectedElements } from "../scene";
import { register } from "./register";
```

## File: packages/excalidraw/actions/actionToggleArrowBinding.tsx
```typescript
import { CaptureUpdateAction } from "@excalidraw/element";
import { register } from "./register";
⋮----
perform(elements, appState)
```

## File: packages/excalidraw/actions/actionToggleGridMode.tsx
```typescript
import { CODES, KEYS } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { gridIcon } from "../components/icons";
import { register } from "./register";
import type { AppState } from "../types";
⋮----
perform(elements, appState)
```

## File: packages/excalidraw/actions/actionToggleMidpointSnapping.tsx
```typescript
import { CaptureUpdateAction } from "@excalidraw/element";
import { register } from "./register";
⋮----
perform(elements, appState)
```

## File: packages/excalidraw/actions/actionToggleObjectsSnapMode.tsx
```typescript
import { CODES, KEYS } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { magnetIcon } from "../components/icons";
import { register } from "./register";
⋮----
perform(elements, appState)
```

## File: packages/excalidraw/actions/actionToggleSearchMenu.ts
```typescript
import {
  KEYS,
  CANVAS_SEARCH_TAB,
  CLASSES,
  DEFAULT_SIDEBAR,
} from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { searchIcon } from "../components/icons";
import { register } from "./register";
import type { AppState } from "../types";
⋮----
perform(elements, appState, _, app)
```

## File: packages/excalidraw/actions/actionToggleShapeSwitch.tsx
```typescript
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import {
  getConversionTypeFromElements,
  convertElementTypePopupAtom,
} from "../components/ConvertElementTypePopup";
import { editorJotaiStore } from "../editor-jotai";
import { register } from "./register";
⋮----
perform(elements, appState, _, app)
```

## File: packages/excalidraw/actions/actionToggleStats.tsx
```typescript
import { CODES, KEYS } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { abacusIcon } from "../components/icons";
import { register } from "./register";
⋮----
perform(elements, appState)
```

## File: packages/excalidraw/actions/actionToggleViewMode.tsx
```typescript
import { CODES, KEYS } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { eyeIcon } from "../components/icons";
import { register } from "./register";
⋮----
perform(elements, appState)
```

## File: packages/excalidraw/actions/actionToggleZenMode.tsx
```typescript
import { CODES, KEYS } from "@excalidraw/common";
import { CaptureUpdateAction } from "@excalidraw/element";
import { coffeeIcon } from "../components/icons";
import { register } from "./register";
⋮----
perform(elements, appState)
```

## File: packages/excalidraw/actions/actionZindex.tsx
```typescript
import { KEYS, CODES, isDarwin } from "@excalidraw/common";
import {
  moveOneLeft,
  moveOneRight,
  moveAllLeft,
  moveAllRight,
} from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import {
  BringForwardIcon,
  BringToFrontIcon,
  SendBackwardIcon,
  SendToBackIcon,
} from "../components/icons";
import { t } from "../i18n";
import { getShortcutKey } from "../shortcut";
import { register } from "./register";
```

## File: packages/excalidraw/actions/index.ts
```typescript

```

## File: packages/excalidraw/actions/manager.tsx
```typescript
import React from "react";
import { isPromiseLike } from "@excalidraw/common";
import type {
  ExcalidrawElement,
  OrderedExcalidrawElement,
} from "@excalidraw/element/types";
import { trackEvent } from "../analytics";
import type { AppClassProperties, AppState } from "../types";
import type {
  Action,
  UpdaterFn,
  ActionName,
  ActionResult,
  PanelComponentProps,
  ActionSource,
} from "./types";
const trackAction = (
  action: Action,
  source: ActionSource,
  appState: Readonly<AppState>,
  elements: readonly ExcalidrawElement[],
  app: AppClassProperties,
  value: any,
) =>
export class ActionManager
⋮----
constructor(
    updater: UpdaterFn,
    getAppState: () => AppState,
    getElementsIncludingDeleted: () => readonly OrderedExcalidrawElement[],
    app: AppClassProperties,
)
registerAction(action: Action)
registerAll(actions: readonly Action[])
handleKeyDown(event: React.KeyboardEvent | KeyboardEvent)
executeAction<T extends Action>(
    action: T,
    source: ActionSource = "api",
    value: Parameters<T["perform"]>[2] = null,
)
⋮----
const updateData = (formState?: any) =>
```

## File: packages/excalidraw/actions/register.ts
```typescript
import type { Action } from "./types";
⋮----
export const register = <
  TData extends any,
  T extends Action<TData> = Action<TData>,
>(
  action: T,
) =>
```

## File: packages/excalidraw/actions/shortcuts.ts
```typescript
import { isDarwin } from "@excalidraw/common";
import type { SubtypeOf } from "@excalidraw/common/utility-types";
import { t } from "../i18n";
import { getShortcutKey } from "../shortcut";
import type { ActionName } from "./types";
export type ShortcutName =
  | SubtypeOf<
      ActionName,
      | "toggleTheme"
      | "loadScene"
      | "clearCanvas"
      | "cut"
      | "copy"
      | "paste"
      | "copyStyles"
      | "pasteStyles"
      | "selectAll"
      | "deleteSelectedElements"
      | "duplicateSelection"
      | "sendBackward"
      | "bringForward"
      | "sendToBack"
      | "bringToFront"
      | "copyAsPng"
      | "group"
      | "ungroup"
      | "gridMode"
      | "zenMode"
      | "objectsSnapMode"
      | "stats"
      | "addToLibrary"
      | "viewMode"
      | "flipHorizontal"
      | "flipVertical"
      | "hyperlink"
      | "toggleElementLock"
      | "resetZoom"
      | "zoomOut"
      | "zoomIn"
      | "zoomToFit"
      | "zoomToFitSelectionInViewport"
      | "zoomToFitSelection"
      | "toggleEraserTool"
      | "toggleHandTool"
      | "setFrameAsActiveTool"
      | "saveFileToDisk"
      | "saveToActiveFile"
      | "toggleShortcuts"
      | "wrapSelectionInFrame"
    >
  | "saveScene"
  | "imageExport"
  | "commandPalette"
  | "searchMenu"
  | "toolLock";
⋮----
export const getShortcutFromShortcutName = (name: ShortcutName, idx = 0) =>
```

## File: packages/excalidraw/actions/types.ts
```typescript
import type {
  ExcalidrawElement,
  OrderedExcalidrawElement,
} from "@excalidraw/element/types";
import type { CaptureUpdateActionType } from "@excalidraw/element";
import type {
  AppClassProperties,
  AppState,
  ExcalidrawProps,
  BinaryFiles,
  UIAppState,
} from "../types";
import type React from "react";
export type ActionSource =
  | "ui"
  | "keyboard"
  | "contextMenu"
  | "api"
  | "commandPalette";
export type ActionResult =
  | {
      elements?: readonly ExcalidrawElement[] | null;
      appState?: Partial<AppState> | null;
      files?: BinaryFiles | null;
      captureUpdate: CaptureUpdateActionType;
      replaceFiles?: boolean;
    }
  | false;
type ActionFn<TData = any> = (
  elements: readonly OrderedExcalidrawElement[],
  appState: Readonly<AppState>,
  formData: TData | undefined,
  app: AppClassProperties,
) => ActionResult | Promise<ActionResult>;
export type UpdaterFn = (res: ActionResult) => void;
export type ActionFilterFn = (action: Action) => void;
export type ActionName =
  | "copy"
  | "cut"
  | "paste"
  | "copyAsPng"
  | "copyAsSvg"
  | "copyText"
  | "sendBackward"
  | "bringForward"
  | "sendToBack"
  | "bringToFront"
  | "copyStyles"
  | "selectAll"
  | "pasteStyles"
  | "gridMode"
  | "zenMode"
  | "objectsSnapMode"
  | "arrowBinding"
  | "midpointSnapping"
  | "stats"
  | "changeStrokeColor"
  | "changeBackgroundColor"
  | "changeFillStyle"
  | "changeStrokeWidth"
  | "changeStrokeShape"
  | "changeSloppiness"
  | "changeStrokeStyle"
  | "changeArrowhead"
  | "changeArrowType"
  | "changeArrowProperties"
  | "changeOpacity"
  | "changeFontSize"
  | "undo"
  | "redo"
  | "finalize"
  | "changeProjectName"
  | "changeExportBackground"
  | "changeExportEmbedScene"
  | "changeExportScale"
  | "saveToActiveFile"
  | "saveFileToDisk"
  | "loadScene"
  | "duplicateSelection"
  | "deleteSelectedElements"
  | "changeViewBackgroundColor"
  | "clearCanvas"
  | "zoomIn"
  | "zoomOut"
  | "resetZoom"
  | "zoomToFit"
  | "zoomToFitSelection"
  | "zoomToFitSelectionInViewport"
  | "changeFontFamily"
  | "changeTextAlign"
  | "changeVerticalAlign"
  | "toggleFullScreen"
  | "toggleShortcuts"
  | "group"
  | "ungroup"
  | "goToCollaborator"
  | "addToLibrary"
  | "changeRoundness"
  | "alignTop"
  | "alignBottom"
  | "alignLeft"
  | "alignRight"
  | "alignVerticallyCentered"
  | "alignHorizontallyCentered"
  | "distributeHorizontally"
  | "distributeVertically"
  | "flipHorizontal"
  | "flipVertical"
  | "viewMode"
  | "exportWithDarkMode"
  | "toggleTheme"
  | "increaseFontSize"
  | "decreaseFontSize"
  | "unbindText"
  | "hyperlink"
  | "bindText"
  | "unlockAllElements"
  | "toggleElementLock"
  | "toggleLinearEditor"
  | "toggleEraserTool"
  | "toggleHandTool"
  | "selectAllElementsInFrame"
  | "removeAllElementsFromFrame"
  | "updateFrameRendering"
  | "setFrameAsActiveTool"
  | "setEmbeddableAsActiveTool"
  | "createContainerFromText"
  | "wrapTextInContainer"
  | "commandPalette"
  | "autoResize"
  | "elementStats"
  | "searchMenu"
  | "copyElementLink"
  | "linkToElement"
  | "cropEditor"
  | "wrapSelectionInFrame"
  | "toggleLassoTool"
  | "toggleShapeSwitch"
  | "togglePolygon";
export type PanelComponentProps = {
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  updateData: <T = any>(formData?: T) => void;
  appProps: ExcalidrawProps;
  data?: Record<string, any>;
  app: AppClassProperties;
  renderAction: (
    name: ActionName,
    data?: PanelComponentProps["data"],
  ) => React.JSX.Element | null;
};
export interface Action<TData = any> {
  name: ActionName;
  label:
    | string
    | ((
        elements: readonly ExcalidrawElement[],
        appState: Readonly<AppState>,
        app: AppClassProperties,
      ) => string);
  keywords?: string[];
  icon?:
    | React.ReactNode
    | ((
        appState: UIAppState,
        elements: readonly ExcalidrawElement[],
      ) => React.ReactNode);
  PanelComponent?: React.FC<PanelComponentProps>;
  perform: ActionFn<TData>;
  keyPriority?: number;
  keyTest?: (
    event: React.KeyboardEvent | KeyboardEvent,
    appState: AppState,
    elements: readonly ExcalidrawElement[],
    app: AppClassProperties,
  ) => boolean;
  predicate?: (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    appProps: ExcalidrawProps,
    app: AppClassProperties,
  ) => boolean;
  checked?: (appState: Readonly<AppState>) => boolean;
  trackEvent:
    | false
    | {
        category:
          | "toolbar"
          | "element"
          | "canvas"
          | "export"
          | "history"
          | "menu"
          | "collab"
          | "hyperlink"
          | "search_menu"
          | "shape_switch";
        action?: string;
        predicate?: (
          appState: Readonly<AppState>,
          elements: readonly ExcalidrawElement[],
          value: any,
        ) => boolean;
      };
  viewMode?: boolean;
}
```

## File: packages/excalidraw/charts/charts.bar.ts
```typescript
import { isDevEnv } from "@excalidraw/common";
import { newElement } from "@excalidraw/element";
import { commonProps } from "./charts.constants";
import {
  chartBaseElements,
  chartXLabels,
  createSeriesLegend,
  getBackgroundColor,
  getCartesianChartLayout,
  getChartDimensions,
  getColorOffset,
  getRotatedTextElementBottom,
  getSeriesColors,
} from "./charts.helpers";
import type { ChartElements, Spreadsheet } from "./charts.types";
export const renderBarChart = (
  spreadsheet: Spreadsheet,
  x: number,
  y: number,
  colorSeed?: number,
): ChartElements =>
```

## File: packages/excalidraw/charts/charts.constants.ts
```typescript
import {
  COLOR_PALETTE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  VERTICAL_ALIGN,
} from "@excalidraw/common";
import type { Radians } from "@excalidraw/math";
⋮----
export type CartesianChartType = "bar" | "line";
export type CartesianChartLayout = {
  slotWidth: number;
  gap: number;
  chartHeight: number;
  xLabelMaxWidth: number;
};
```

## File: packages/excalidraw/charts/charts.helpers.ts
```typescript
import { pointFrom } from "@excalidraw/math";
import {
  COLOR_PALETTE,
  DEFAULT_CHART_COLOR_INDEX,
  FONT_FAMILY,
  FONT_SIZES,
  ROUNDNESS,
  DEFAULT_FONT_SIZE,
  getAllColorsSpecificShade,
  getFontString,
  getLineHeight,
  ROUGHNESS,
} from "@excalidraw/common";
import {
  getApproxMinLineWidth,
  measureText,
  newElement,
  newLinearElement,
  newTextElement,
  wrapText,
} from "@excalidraw/element";
import type {
  ChartType,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import {
  BAR_GAP,
  CARTESIAN_BAR_HEIGHT,
  CARTESIAN_BASE_SLOT_WIDTH,
  CARTESIAN_BAR_SLOT_EXTRA_MAX,
  CARTESIAN_BAR_SLOT_EXTRA_PER_SERIES,
  CARTESIAN_GAP,
  CARTESIAN_LABEL_AXIS_CLEARANCE,
  CARTESIAN_LABEL_MAX_WIDTH_BUFFER,
  CARTESIAN_LABEL_MIN_WIDTH,
  CARTESIAN_LABEL_OVERFLOW_PREFERENCE_BUFFER,
  CARTESIAN_LABEL_ROTATED_WIDTH_BUFFER,
  CARTESIAN_LABEL_ROTATION,
  CARTESIAN_LABEL_SLOT_PADDING,
  CARTESIAN_LINE_HEIGHT,
  CARTESIAN_LINE_SLOT_WIDTH,
  GRID_OPACITY,
  RADAR_AXIS_LABEL_ALIGNMENT_THRESHOLD,
  RADAR_AXIS_LABEL_CLEARANCE,
  RADAR_AXIS_LABEL_MAX_WIDTH,
  RADAR_LABEL_OFFSET,
  RADAR_LEGEND_ITEM_GAP,
  RADAR_LEGEND_SWATCH_SIZE,
  RADAR_LEGEND_TEXT_GAP,
  RADAR_PADDING,
  RADAR_SINGLE_SERIES_LOG_SCALE_THRESHOLD,
  BAR_HEIGHT,
  commonProps,
  type CartesianChartLayout,
  type CartesianChartType,
} from "./charts.constants";
import type {
  ChartElements,
  Spreadsheet,
  SpreadsheetSeries,
} from "./charts.types";
⋮----
const getSpreadsheetDimensionCount = (spreadsheet: Spreadsheet)
export const isSpreadsheetValidForChartType = (
  spreadsheet: Spreadsheet | null,
  chartType: ChartType,
) =>
const getSeriesAwareSlotWidth = (
  baseSlotWidth: number,
  seriesCount: number,
) =>
export const getCartesianChartLayout = (
  chartType: CartesianChartType,
  seriesCount: number,
): CartesianChartLayout =>
export const getChartDimensions = (
  spreadsheet: Spreadsheet,
  layout: CartesianChartLayout,
) =>
export const getRadarDimensions = () =>
const getCircularDistance = (
  firstIndex: number,
  secondIndex: number,
  paletteSize: number,
) =>
export const getSeriesColors = (
  seriesCount: number,
  colorOffset: number,
): readonly string[] =>
export const getColorOffset = (colorSeed?: number) =>
export const getBackgroundColor = (colorOffset: number)
export const getRadarValueScale = (
  series: SpreadsheetSeries[],
  _labelsLength: number,
) =>
const shouldWrapRadarText = (text: string)
export const getRadarDisplayText = (
  text: string,
  fontString: ReturnType<typeof getFontString>,
  maxWidth: number,
) =>
export const createRadarAxisLabels = (
  labels: readonly string[],
  angles: readonly number[],
  centerX: number,
  centerY: number,
  radius: number,
  backgroundColor: string,
):
export const createSeriesLegend = (
  series: SpreadsheetSeries[],
  seriesColors: readonly string[],
  centerX: number,
  minLegendTopY: number,
  fallbackLegendY: number,
  backgroundColor: string,
): ChartElements =>
const ellipsifyTextToWidth = (
  text: string,
  maxWidth: number,
  fontString: ReturnType<typeof getFontString>,
  lineHeight: ExcalidrawTextElement["lineHeight"],
) =>
const wrapOrEllipsifyTextToWidth = (
  text: string,
  maxWidth: number,
  fontString: ReturnType<typeof getFontString>,
  lineHeight: ExcalidrawTextElement["lineHeight"],
) =>
const getRotatedBoundingBox = (
  width: number,
  height: number,
  angle: number,
) =>
type CartesianAxisLabelSpec = {
  originalText: string;
  text: string;
  wrapped: boolean;
  metrics: ReturnType<typeof measureText>;
  rotatedWidth: number;
  rotatedHeight: number;
};
const isEllipsifiedLabel = (text: string)
const getCartesianAxisLabelSpec = (
  label: string,
  maxLabelWidth: number,
  maxRotatedWidth: number,
  fontString: ReturnType<typeof getFontString>,
  lineHeight: ExcalidrawTextElement["lineHeight"],
): CartesianAxisLabelSpec =>
⋮----
const getRank = (spec: CartesianAxisLabelSpec) =>
const shouldPrefer = (
    candidate: CartesianAxisLabelSpec,
    current: CartesianAxisLabelSpec,
) =>
⋮----
export const getRotatedTextElementBottom = (
  element: NonDeletedExcalidrawElement,
) =>
export const chartXLabels = (
  spreadsheet: Spreadsheet,
  x: number,
  y: number,
  backgroundColor: string,
  layout: CartesianChartLayout,
): ChartElements =>
const chartYLabels = (
  spreadsheet: Spreadsheet,
  x: number,
  y: number,
  backgroundColor: string,
  layout: CartesianChartLayout,
  maxValue = Math.max(...spreadsheet.series[0].values),
): ChartElements =>
const chartLines = (
  spreadsheet: Spreadsheet,
  x: number,
  y: number,
  backgroundColor: string,
  layout: CartesianChartLayout,
): ChartElements =>
export const chartBaseElements = (
  spreadsheet: Spreadsheet,
  x: number,
  y: number,
  backgroundColor: string,
  layout: CartesianChartLayout,
  maxValue = Math.max(...spreadsheet.series[0].values),
  debug?: boolean,
): ChartElements =>
```

## File: packages/excalidraw/charts/charts.line.ts
```typescript
import { pointFrom } from "@excalidraw/math";
import { isDevEnv } from "@excalidraw/common";
import { newElement, newLinearElement } from "@excalidraw/element";
import type { LocalPoint } from "@excalidraw/math";
import { GRID_OPACITY, commonProps } from "./charts.constants";
import {
  chartBaseElements,
  chartXLabels,
  createSeriesLegend,
  getBackgroundColor,
  getCartesianChartLayout,
  getChartDimensions,
  getColorOffset,
  getRotatedTextElementBottom,
  getSeriesColors,
} from "./charts.helpers";
import type { ChartElements, Spreadsheet } from "./charts.types";
export const renderLineChart = (
  spreadsheet: Spreadsheet,
  x: number,
  y: number,
  colorSeed?: number,
): ChartElements =>
```

## File: packages/excalidraw/charts/charts.parse.ts
```typescript
import { type ParseSpreadsheetResult } from "./charts.types";
export const tryParseNumber = (s: string): number | null =>
const isNumericColumn = (lines: string[][], columnIndex: number)
/**
 * @private exported for testing
 */
export const tryParseCells = (cells: string[][]): ParseSpreadsheetResult =>
export const tryParseSpreadsheet = (text: string): ParseSpreadsheetResult =>
⋮----
const parseDelimitedLines = (delimiter: "\t" | "," | ";")
```

## File: packages/excalidraw/charts/charts.radar.ts
```typescript
import { pointFrom } from "@excalidraw/math";
import {
  FONT_FAMILY,
  FONT_SIZES,
  getFontString,
  getLineHeight,
  ROUGHNESS,
} from "@excalidraw/common";
import {
  measureText,
  newLinearElement,
  newTextElement,
} from "@excalidraw/element";
import type { LocalPoint } from "@excalidraw/math";
import {
  BAR_GAP,
  BAR_HEIGHT,
  GRID_OPACITY,
  RADAR_GRID_LEVELS,
  RADAR_LABEL_OFFSET,
  commonProps,
} from "./charts.constants";
import {
  createRadarAxisLabels,
  createSeriesLegend,
  getBackgroundColor,
  getColorOffset,
  getRadarDimensions,
  getRadarDisplayText,
  getRadarValueScale,
  getSeriesColors,
  isSpreadsheetValidForChartType,
} from "./charts.helpers";
import type { ChartElements, Spreadsheet } from "./charts.types";
export const renderRadarChart = (
  spreadsheet: Spreadsheet,
  x: number,
  y: number,
  colorSeed?: number,
): ChartElements | null =>
```

## File: packages/excalidraw/charts/charts.types.ts
```typescript
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
export type ChartElements = readonly NonDeletedExcalidrawElement[];
export interface Spreadsheet {
  title: string | null;
  labels: string[] | null;
  series: SpreadsheetSeries[];
}
export interface SpreadsheetSeries {
  title: string | null;
  values: number[];
}
export type ParseSpreadsheetResult =
  | { ok: false; reason: string }
  | { ok: true; data: Spreadsheet };
```

## File: packages/excalidraw/charts/index.ts
```typescript
import type { ChartType } from "@excalidraw/element/types";
import { renderBarChart } from "./charts.bar";
import { renderLineChart } from "./charts.line";
import {
  tryParseCells,
  tryParseNumber,
  tryParseSpreadsheet,
} from "./charts.parse";
import { renderRadarChart } from "./charts.radar";
import type { ChartElements, Spreadsheet } from "./charts.types";
⋮----
export const renderSpreadsheet = (
  chartType: ChartType,
  spreadsheet: Spreadsheet,
  x: number,
  y: number,
  colorSeed?: number,
): ChartElements | null =>
```

## File: packages/excalidraw/components/canvases/index.tsx
```typescript
import InteractiveCanvas from "./InteractiveCanvas";
import StaticCanvas from "./StaticCanvas";
```

## File: packages/excalidraw/components/canvases/InteractiveCanvas.tsx
```typescript
import React, { useEffect, useRef } from "react";
import {
  CURSOR_TYPE,
  isShallowEqual,
  sceneCoordsToViewportCoords,
  type EditorInterface,
} from "@excalidraw/common";
import type {
  InteractiveCanvasRenderConfig,
  InteractiveSceneRenderAnimationState,
  InteractiveSceneRenderConfig,
  RenderableElementsMap,
  RenderInteractiveSceneCallback,
} from "@excalidraw/excalidraw/scene/types";
import type {
  NonDeletedExcalidrawElement,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import { t } from "../../i18n";
import { renderInteractiveScene } from "../../renderer/interactiveScene";
import { AnimationController } from "../../renderer/animation";
import type {
  AppClassProperties,
  AppState,
  InteractiveCanvasAppState,
} from "../../types";
import type { DOMAttributes } from "react";
type InteractiveCanvasProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  canvas: HTMLCanvasElement | null;
  elementsMap: RenderableElementsMap;
  visibleElements: readonly NonDeletedExcalidrawElement[];
  selectedElements: readonly NonDeletedExcalidrawElement[];
  allElementsMap: NonDeletedSceneElementsMap;
  sceneNonce: number | undefined;
  selectionNonce: number | undefined;
  scale: number;
  appState: InteractiveCanvasAppState;
  renderScrollbars: boolean;
  editorInterface: EditorInterface;
  app: AppClassProperties;
  renderInteractiveSceneCallback: (
    data: RenderInteractiveSceneCallback,
  ) => void;
  handleCanvasRef: (canvas: HTMLCanvasElement | null) => void;
  onContextMenu: Exclude<
    DOMAttributes<HTMLCanvasElement | HTMLDivElement>["onContextMenu"],
    undefined
  >;
  onClick: Exclude<DOMAttributes<HTMLCanvasElement>["onClick"], undefined>;
  onPointerMove: Exclude<
    DOMAttributes<HTMLCanvasElement>["onPointerMove"],
    undefined
  >;
  onPointerUp: Exclude<
    DOMAttributes<HTMLCanvasElement>["onPointerUp"],
    undefined
  >;
  onPointerCancel: Exclude<
    DOMAttributes<HTMLCanvasElement>["onPointerCancel"],
    undefined
  >;
  onTouchMove: Exclude<
    DOMAttributes<HTMLCanvasElement>["onTouchMove"],
    undefined
  >;
  onPointerDown: Exclude<
    DOMAttributes<HTMLCanvasElement>["onPointerDown"],
    undefined
  >;
  onDoubleClick: Exclude<
    DOMAttributes<HTMLCanvasElement>["onDoubleClick"],
    undefined
  >;
};
⋮----
if (
    prevProps.selectionNonce !== nextProps.selectionNonce ||
    prevProps.sceneNonce !== nextProps.sceneNonce ||
    prevProps.scale !== nextProps.scale ||
    prevProps.elementsMap !== nextProps.elementsMap ||
    prevProps.visibleElements !== nextProps.visibleElements ||
    prevProps.selectedElements !== nextProps.selectedElements ||
    prevProps.renderScrollbars !== nextProps.renderScrollbars
)
```

## File: packages/excalidraw/components/canvases/NewElementCanvas.tsx
```typescript
import { useEffect, useRef } from "react";
import type { NonDeletedSceneElementsMap } from "@excalidraw/element/types";
import { isRenderThrottlingEnabled } from "../../reactUtils";
import { renderNewElementScene } from "../../renderer/renderNewElementScene";
import type {
  RenderableElementsMap,
  StaticCanvasRenderConfig,
} from "../../scene/types";
import type { AppState } from "../../types";
import type { RoughCanvas } from "roughjs/bin/canvas";
interface NewElementCanvasProps {
  appState: AppState;
  elementsMap: RenderableElementsMap;
  allElementsMap: NonDeletedSceneElementsMap;
  scale: number;
  rc: RoughCanvas;
  renderConfig: StaticCanvasRenderConfig;
}
const NewElementCanvas = (props: NewElementCanvasProps) =>
```

## File: packages/excalidraw/components/canvases/StaticCanvas.tsx
```typescript
import React, { useEffect, useRef } from "react";
import { isShallowEqual } from "@excalidraw/common";
import type {
  NonDeletedExcalidrawElement,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import { isRenderThrottlingEnabled } from "../../reactUtils";
import { renderStaticScene } from "../../renderer/staticScene";
import type {
  RenderableElementsMap,
  StaticCanvasRenderConfig,
} from "../../scene/types";
import type { AppState, StaticCanvasAppState } from "../../types";
import type { RoughCanvas } from "roughjs/bin/canvas";
type StaticCanvasProps = {
  canvas: HTMLCanvasElement;
  rc: RoughCanvas;
  elementsMap: RenderableElementsMap;
  allElementsMap: NonDeletedSceneElementsMap;
  visibleElements: readonly NonDeletedExcalidrawElement[];
  sceneNonce: number | undefined;
  selectionNonce: number | undefined;
  scale: number;
  appState: StaticCanvasAppState;
  renderConfig: StaticCanvasRenderConfig;
};
⋮----
const getRelevantAppStateProps = (appState: AppState): StaticCanvasAppState =>
const areEqual = (
  prevProps: StaticCanvasProps,
  nextProps: StaticCanvasProps,
) =>
```

## File: packages/excalidraw/components/ColorPicker/ColorInput.tsx
```typescript
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { KEYS, normalizeInputColor } from "@excalidraw/common";
import { getShortcutKey } from "../..//shortcut";
import { useAtom } from "../../editor-jotai";
import { t } from "../../i18n";
import { useEditorInterface } from "../App";
import { activeEyeDropperAtom } from "../EyeDropper";
import { eyeDropperIcon } from "../icons";
import { activeColorPickerSectionAtom } from "./colorPickerUtils";
import type { ColorPickerType } from "./colorPickerUtils";
⋮----
setEyeDropperState((s)
```

## File: packages/excalidraw/components/ColorPicker/ColorPicker.tsx
```typescript
import { Popover } from "radix-ui";
import clsx from "clsx";
import { useRef, useEffect } from "react";
import {
  COLOR_OUTLINE_CONTRAST_THRESHOLD,
  COLOR_PALETTE,
  isColorDark,
  isWritableElement,
} from "@excalidraw/common";
import type { ColorTuple, ColorPaletteCustom } from "@excalidraw/common";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { useAtom } from "../../editor-jotai";
import { t } from "../../i18n";
import { useExcalidrawContainer, useStylesPanelMode } from "../App";
import { ButtonSeparator } from "../ButtonSeparator";
import { activeEyeDropperAtom } from "../EyeDropper";
import { PropertiesPopover } from "../PropertiesPopover";
import { slashIcon, strokeIcon } from "../icons";
import {
  saveCaretPosition,
  restoreCaretPosition,
  temporarilyDisableTextEditorBlur,
} from "../../hooks/useTextEditorFocus";
import { ColorInput } from "./ColorInput";
import { Picker } from "./Picker";
import PickerHeading from "./PickerHeading";
import { TopPicks } from "./TopPicks";
import { activeColorPickerSectionAtom } from "./colorPickerUtils";
⋮----
import type { ColorPickerType } from "./colorPickerUtils";
import type { AppState } from "../../types";
interface ColorPickerProps {
  type: ColorPickerType;
  color: string | null;
  onChange: (color: string) => void;
  label: string;
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  palette?: ColorPaletteCustom | null;
  topPicks?: ColorTuple;
  updateData: (formData?: any) => void;
}
⋮----
const focusPickerContent = () =>
⋮----
onClose=
⋮----
if (eyeDropperState)
⋮----
const handleClick = (e: React.MouseEvent) =>
⋮----
? t("labels.showStroke")
⋮----
className=
⋮----
onOpenChange=
```

## File: packages/excalidraw/components/ColorPicker/colorPickerUtils.ts
```typescript
import { MAX_CUSTOM_COLORS_USED_IN_CANVAS } from "@excalidraw/common";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { ColorPickerColor, ColorPaletteCustom } from "@excalidraw/common";
import { atom } from "../../editor-jotai";
export const getColorNameAndShadeFromColor = ({
  palette,
  color,
}: {
  palette: ColorPaletteCustom;
  color: string | null;
}):
⋮----
export const isCustomColor = ({
  color,
  palette,
}: {
  color: string;
  palette: ColorPaletteCustom;
}) =>
export const getMostUsedCustomColors = (
  elements: readonly ExcalidrawElement[],
  type: "elementBackground" | "elementStroke",
  palette: ColorPaletteCustom,
) =>
export type ActiveColorPickerSectionAtomType =
  | "custom"
  | "baseColors"
  | "shades"
  | "hex"
  | null;
⋮----
export type ColorPickerType =
  | "canvasBackground"
  | "elementBackground"
  | "elementStroke";
```

## File: packages/excalidraw/components/ColorPicker/CustomColorList.tsx
```typescript
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useAtom } from "../../editor-jotai";
import HotkeyLabel from "./HotkeyLabel";
import { activeColorPickerSectionAtom } from "./colorPickerUtils";
interface CustomColorListProps {
  colors: string[];
  color: string | null;
  onChange: (color: string) => void;
  label: string;
}
⋮----
className={clsx(
              "color-picker__button color-picker__button--large has-outline",
              {
                active: color === c,
                "is-transparent": c === "transparent" || !c,
              },
            )}
onClick=
```

## File: packages/excalidraw/components/ColorPicker/HotkeyLabel.tsx
```typescript
import React from "react";
import { isColorDark } from "@excalidraw/common";
interface HotkeyLabelProps {
  color: string;
  keyLabel: string | number;
  isShade?: boolean;
}
const HotkeyLabel = ({
  color,
  keyLabel,
  isShade = false,
}: HotkeyLabelProps) =>
```

## File: packages/excalidraw/components/ColorPicker/keyboardNavHandlers.ts
```typescript
import { COLORS_PER_ROW, COLOR_PALETTE, KEYS } from "@excalidraw/common";
import type {
  ColorPickerColor,
  ColorPalette,
  ColorPaletteCustom,
} from "@excalidraw/common";
import type { ValueOf } from "@excalidraw/common/utility-types";
import {
  colorPickerHotkeyBindings,
  getColorNameAndShadeFromColor,
} from "./colorPickerUtils";
import type { ActiveColorPickerSectionAtomType } from "./colorPickerUtils";
const arrowHandler = (
  eventKey: string,
  currentIndex: number | null,
  length: number,
) =>
interface HotkeyHandlerProps {
  e: React.KeyboardEvent;
  colorObj: { colorName: ColorPickerColor; shade: number | null } | null;
  onChange: (color: string) => void;
  palette: ColorPaletteCustom;
  customColors: string[];
  setActiveColorPickerSection: (
    update: React.SetStateAction<ActiveColorPickerSectionAtomType>,
  ) => void;
  activeShade: number;
}
const hotkeyHandler = ({
  e,
  colorObj,
  onChange,
  palette,
  customColors,
  setActiveColorPickerSection,
  activeShade,
}: HotkeyHandlerProps): boolean =>
interface ColorPickerKeyNavHandlerProps {
  event: React.KeyboardEvent;
  activeColorPickerSection: ActiveColorPickerSectionAtomType;
  palette: ColorPaletteCustom;
  color: string | null;
  onChange: (color: string) => void;
  customColors: string[];
  setActiveColorPickerSection: (
    update: React.SetStateAction<ActiveColorPickerSectionAtomType>,
  ) => void;
  updateData: (formData?: any) => void;
  activeShade: number;
  onEyeDropperToggle: (force?: boolean) => void;
  onEscape: (event: React.KeyboardEvent | KeyboardEvent) => void;
}
export const colorPickerKeyNavHandler = ({
  event,
  activeColorPickerSection,
  palette,
  color,
  onChange,
  customColors,
  setActiveColorPickerSection,
  updateData,
  activeShade,
  onEyeDropperToggle,
  onEscape,
}: ColorPickerKeyNavHandlerProps): boolean =>
```

## File: packages/excalidraw/components/ColorPicker/Picker.tsx
```typescript
import React, { useEffect, useImperativeHandle, useState } from "react";
import { EVENT } from "@excalidraw/common";
import {
  DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX,
  DEFAULT_ELEMENT_STROKE_COLOR_INDEX,
  KEYS,
} from "@excalidraw/common";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { ColorPaletteCustom } from "@excalidraw/common";
import { useAtom } from "../../editor-jotai";
import { t } from "../../i18n";
import { CustomColorList } from "./CustomColorList";
import PickerColorList from "./PickerColorList";
import PickerHeading from "./PickerHeading";
import { ShadeList } from "./ShadeList";
import {
  activeColorPickerSectionAtom,
  getColorNameAndShadeFromColor,
  getMostUsedCustomColors,
  isCustomColor,
} from "./colorPickerUtils";
import { colorPickerKeyNavHandler } from "./keyboardNavHandlers";
import type { ColorPickerType } from "./colorPickerUtils";
interface PickerProps {
  color: string | null;
  onChange: (color: string) => void;
  type: ColorPickerType;
  elements: readonly ExcalidrawElement[];
  palette: ColorPaletteCustom;
  updateData: (formData?: any) => void;
  children?: React.ReactNode;
  showTitle?: boolean;
  onEyeDropperToggle: (force?: boolean) => void;
  onEscape: (event: React.KeyboardEvent | KeyboardEvent) => void;
  showHotKey?: boolean;
}
⋮----
const keyup = (event: KeyboardEvent) =>
⋮----
<div role="dialog" aria-modal="true" aria-label=
```

## File: packages/excalidraw/components/ColorPicker/PickerColorList.tsx
```typescript
import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { ColorPaletteCustom } from "@excalidraw/common";
import { useAtom } from "../../editor-jotai";
import { t } from "../../i18n";
import HotkeyLabel from "./HotkeyLabel";
import {
  activeColorPickerSectionAtom,
  colorPickerHotkeyBindings,
  getColorNameAndShadeFromColor,
} from "./colorPickerUtils";
import type { TranslationKeys } from "../../i18n";
interface PickerColorListProps {
  palette: ColorPaletteCustom;
  color: string | null;
  onChange: (color: string) => void;
  activeShade: number;
  showHotKey?: boolean;
}
⋮----
className=
⋮----
onChange(color);
setActiveColorPickerSection("baseColors");
```

## File: packages/excalidraw/components/ColorPicker/PickerHeading.tsx
```typescript
import type { ReactNode } from "react";
const PickerHeading = ({ children }: { children: ReactNode }) => (
  <div className="color-picker__heading">{children}</div>
);
```

## File: packages/excalidraw/components/ColorPicker/ShadeList.tsx
```typescript
import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { ColorPaletteCustom } from "@excalidraw/common";
import { useAtom } from "../../editor-jotai";
import { t } from "../../i18n";
import HotkeyLabel from "./HotkeyLabel";
import {
  activeColorPickerSectionAtom,
  getColorNameAndShadeFromColor,
} from "./colorPickerUtils";
interface ShadeListProps {
  color: string | null;
  onChange: (color: string) => void;
  palette: ColorPaletteCustom;
  showHotKey?: boolean;
}
⋮----
className=
```

## File: packages/excalidraw/components/ColorPicker/TopPicks.tsx
```typescript
import clsx from "clsx";
import {
  COLOR_OUTLINE_CONTRAST_THRESHOLD,
  DEFAULT_CANVAS_BACKGROUND_PICKS,
  DEFAULT_ELEMENT_BACKGROUND_PICKS,
  DEFAULT_ELEMENT_STROKE_PICKS,
  isColorDark,
} from "@excalidraw/common";
import type { ColorPickerType } from "./colorPickerUtils";
interface TopPicksProps {
  onChange: (color: string) => void;
  type: ColorPickerType;
  activeColor: string | null;
  topPicks?: readonly string[];
}
⋮----
onClick=
```

## File: packages/excalidraw/components/CommandPalette/CommandPalette.tsx
```typescript
import clsx from "clsx";
import fuzzy from "fuzzy";
import { useEffect, useRef, useMemo, useState } from "react";
import {
  DEFAULT_SIDEBAR,
  EVENT,
  KEYS,
  capitalizeString,
  isWritableElement,
} from "@excalidraw/common";
import type { MarkRequired } from "@excalidraw/common/utility-types";
import { actionToggleShapeSwitch } from "../../actions/actionToggleShapeSwitch";
import { getShortcutKey } from "../../shortcut";
import {
  actionClearCanvas,
  actionLink,
  actionToggleSearchMenu,
} from "../../actions";
import {
  actionCopyElementLink,
  actionLinkToElement,
} from "../../actions/actionElementLink";
import { getShortcutFromShortcutName } from "../../actions/shortcuts";
import { trackEvent } from "../../analytics";
import { useUIAppState } from "../../context/ui-appState";
import { deburr } from "../../deburr";
import { atom, useAtom, editorJotaiStore } from "../../editor-jotai";
import { t } from "../../i18n";
import {
  useApp,
  useAppProps,
  useExcalidrawActionManager,
  useExcalidrawSetAppState,
} from "../App";
import { Dialog } from "../Dialog";
import { InlineIcon } from "../InlineIcon";
import { TextField } from "../TextField";
import { getSelectedElements } from "../../scene";
import {
  LockedIcon,
  UnlockedIcon,
  searchIcon,
  boltIcon,
  bucketFillIcon,
  ExportImageIcon,
  mermaidLogoIcon,
  brainIconThin,
  LibraryIcon,
  historyCommandIcon,
} from "../icons";
import { SHAPES } from "../shapes";
import { canChangeBackgroundColor, canChangeStrokeColor } from "../Actions";
import { useStableCallback } from "../../hooks/useStableCallback";
import { activeConfirmDialogAtom } from "../ActiveConfirmDialog";
import { useStable } from "../../hooks/useStable";
import { Ellipsify } from "../Ellipsify";
import {
  distributeLibraryItemsOnSquareGrid,
  libraryItemsAtom,
} from "../../data/library";
import {
  useLibraryCache,
  useLibraryItemSvg,
} from "../../hooks/useLibraryItemSvg";
⋮----
import type { CommandPaletteItem } from "./types";
import type { AppProps, AppState, LibraryItem, UIAppState } from "../../types";
import type { ShortcutName } from "../../actions/shortcuts";
import type { TranslationKeys } from "../../i18n";
import type { Action } from "../../actions/types";
⋮----
const getCategoryOrder = (category: string) =>
const CommandShortcutHint = ({
  shortcut,
  className,
  children,
}: {
  shortcut: string;
  className?: string;
  children?: React.ReactNode;
}) =>
⋮----
<div className=
⋮----
const isCommandPaletteToggleShortcut = (event: KeyboardEvent) =>
type CommandPaletteProps = {
  customCommandPaletteItems?: CommandPaletteItem[];
};
⋮----
const commandPaletteShortcut = (event: KeyboardEvent) =>
⋮----
app.onInsertElements(
              distributeLibraryItemsOnSquareGrid([libraryItem]),
            );
⋮----
const getActionLabel = (action: Action) =>
const getActionIcon = (action: Action) =>
⋮----
const actionToCommand = (
      action: Action,
      category: string,
      transformer?: (
        command: CommandPaletteItem,
        action: Action,
      ) => CommandPaletteItem,
): CommandPaletteItem =>
⋮----
const closeCommandPalette = (cb?: () => void) =>
const executeCommand = (
    command: CommandPaletteItem,
    event: React.MouseEvent | React.KeyboardEvent | KeyboardEvent,
) =>
⋮----
const getNextCommandsByCategory = (commands: CommandPaletteItem[]) =>
⋮----
onCloseRequest=
⋮----
onClick=
⋮----
const noop = () =>
⋮----
className=
```

## File: packages/excalidraw/components/CommandPalette/defaultCommandPaletteItems.ts
```typescript
import { actionToggleTheme } from "../../actions";
import type { CommandPaletteItem } from "./types";
```

## File: packages/excalidraw/components/CommandPalette/types.ts
```typescript
import type { ActionManager } from "../../actions/manager";
import type { Action } from "../../actions/types";
export type CommandPaletteItem = {
  label: string;
  keywords?: string[];
  haystack?: string;
  icon?: Action["icon"];
  category: string;
  order?: number;
  predicate?: boolean | Action["predicate"];
  shortcut?: string | null;
  viewMode?: boolean;
  perform: (data: {
    actionManager: ActionManager;
    event: React.MouseEvent | React.KeyboardEvent | KeyboardEvent;
  }) => void;
};
```

## File: packages/excalidraw/components/DiagramToCodePlugin/DiagramToCodePlugin.tsx
```typescript
import { useLayoutEffect } from "react";
import { useApp } from "../App";
import type { GenerateDiagramToCode } from "../../types";
export const DiagramToCodePlugin = (props: {
  generate: GenerateDiagramToCode;
}) =>
```

## File: packages/excalidraw/components/dropdownMenu/common.ts
```typescript
import React, { useContext } from "react";
import { composeEventHandlers } from "@excalidraw/common";
⋮----
export const getDropdownMenuItemClassName = (
  className = "",
  selected = false,
  hovered = false,
) =>
export const useHandleDropdownMenuItemSelect = (
  onSelect: ((event: Event) => void) | undefined,
) =>
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenu.test.tsx
```typescript
import React from "react";
import { KEYS } from "@excalidraw/common";
import { Excalidraw } from "../../index";
import { Keyboard } from "../../tests/helpers/ui";
import {
  render,
  waitFor,
  getByTestId,
  fireEvent,
} from "../../tests/test-utils";
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenu.tsx
```typescript
import React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { CLASSES } from "@excalidraw/common";
import DropdownMenuContent from "./DropdownMenuContent";
import DropdownMenuGroup from "./DropdownMenuGroup";
import DropdownMenuItem from "./DropdownMenuItem";
import DropdownMenuItemCustom from "./DropdownMenuItemCustom";
import DropdownMenuItemLink from "./DropdownMenuItemLink";
import MenuSeparator from "./DropdownMenuSeparator";
import DropdownMenuSub from "./DropdownMenuSub";
import DropdownMenuTrigger from "./DropdownMenuTrigger";
import DropdownMenuItemCheckbox from "./DropdownMenuItemCheckbox";
import {
  getMenuContentComponent,
  getMenuTriggerComponent,
} from "./dropdownMenuUtils";
⋮----
const DropdownMenu = ({
  children,
  open,
}: {
  children?: React.ReactNode;
  open: boolean;
}) =>
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuContent.tsx
```typescript
import clsx from "clsx";
import React, { useCallback, useEffect, useRef } from "react";
import { CLASSES, EVENT, KEYS } from "@excalidraw/common";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useStable } from "../../hooks/useStable";
import { useEditorInterface } from "../App";
import { Island } from "../Island";
import Stack from "../Stack";
import { DropdownMenuContentPropsContext } from "./common";
⋮----
const onKeyDown = (event: KeyboardEvent) =>
⋮----
onCloseAutoFocus=
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuGroup.tsx
```typescript
import React from "react";
const MenuGroup = ({
  children,
  className = "",
  style,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}) =>
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuItem.tsx
```typescript
import React from "react";
import { THEME } from "@excalidraw/common";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import type { ValueOf } from "@excalidraw/common/utility-types";
import { useExcalidrawAppState } from "../App";
import {
  getDropdownMenuItemClassName,
  useHandleDropdownMenuItemSelect,
} from "./common";
import MenuItemContent from "./DropdownMenuItemContent";
import type { JSX } from "react";
export type DropdownMenuItemProps = {
  icon?: JSX.Element;
  badge?: React.ReactNode;
  value?: string | number | undefined;
  onSelect?: (event: Event) => void;
  children: React.ReactNode;
  shortcut?: string;
  selected?: boolean;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect">;
const DropdownMenuItem = ({
  icon,
  badge,
  value,
  children,
  shortcut,
  className,
  selected,
  onSelect,
  ...rest
}: DropdownMenuItemProps) =>
⋮----
className=
⋮----
export const DropDownMenuItemBadge = ({
  type = DropDownMenuItemBadgeType.BLUE,
  children,
}: {
  type?: ValueOf<typeof DropDownMenuItemBadgeType>;
  children: React.ReactNode;
}) =>
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuItemCheckbox.tsx
```typescript
import { checkIcon, emptyIcon } from "../icons";
import DropdownMenuItem from "./DropdownMenuItem";
import type { DropdownMenuItemProps } from "./DropdownMenuItem";
const DropdownMenuItemCheckbox = (
  props: Omit<DropdownMenuItemProps, "icon"> & { checked: boolean },
) =>
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuItemContent.tsx
```typescript
import { useEditorInterface } from "../App";
import { Ellipsify } from "../Ellipsify";
import type { JSX } from "react";
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuItemContentRadio.tsx
```typescript
import { useEditorInterface } from "../App";
import { RadioGroup } from "../RadioGroup";
type Props<T> = {
  value: T;
  shortcut?: string;
  choices: {
    value: T;
    label: React.ReactNode;
    ariaLabel?: string;
  }[];
  onChange: (value: T) => void;
  children: React.ReactNode;
  name: string;
};
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuItemCustom.tsx
```typescript
import React from "react";
const DropdownMenuItemCustom = ({
  children,
  className = "",
  selected,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) =>
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuItemLink.tsx
```typescript
import React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import MenuItemContent from "./DropdownMenuItemContent";
import {
  getDropdownMenuItemClassName,
  useHandleDropdownMenuItemSelect,
} from "./common";
import type { JSX } from "react";
const DropdownMenuItemLink = ({
  icon,
  shortcut,
  href,
  children,
  onSelect,
  className = "",
  selected,
  rel = "noopener",
  ...rest
}: {
  href: string;
  icon?: JSX.Element;
  children: React.ReactNode;
  shortcut?: string;
  className?: string;
  selected?: boolean;
onSelect?: (event: Event)
⋮----
className=
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuSeparator.tsx
```typescript
import React from "react";
const MenuSeparator = () => (
  <div
    style={{
      height: "1px",
      backgroundColor: "var(--default-border-color)",
      margin: "6px 0",
      flex: "0 0 auto",
    }}
  />
);
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuSub.tsx
```typescript
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import DropdownMenuSubContent from "./DropdownMenuSubContent";
import DropdownMenuSubTrigger from "./DropdownMenuSubTrigger";
import {
  getSubMenuContentComponent,
  getSubMenuTriggerComponent,
} from "./dropdownMenuUtils";
const DropdownMenuSub = (
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuSubContent.tsx
```typescript
import clsx from "clsx";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { useCallback, useState } from "react";
import { useEditorInterface } from "../App";
import { Island } from "../Island";
import Stack from "../Stack";
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuSubTrigger.tsx
```typescript
import React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { chevronRight } from "../icons";
import { getDropdownMenuItemClassName } from "./common";
import MenuItemContent from "./DropdownMenuItemContent";
import type { JSX } from "react";
const DropdownMenuSubTrigger = ({
  children,
  icon,
  shortcut,
  className,
}: {
  children: React.ReactNode;
  icon?: JSX.Element;
  shortcut?: string;
  className?: string;
}) =>
```

## File: packages/excalidraw/components/dropdownMenu/DropdownMenuTrigger.tsx
```typescript
import clsx from "clsx";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { useEditorInterface } from "../App";
const MenuTrigger = ({
  className = "",
  children,
  onToggle,
  title,
  ...rest
}: {
  className?: string;
  children: React.ReactNode;
onToggle: ()
```

## File: packages/excalidraw/components/dropdownMenu/dropdownMenuUtils.ts
```typescript
import React from "react";
const getMenuComponent = (component: string) => (children: React.ReactNode) =>
```

## File: packages/excalidraw/components/FollowMode/FollowMode.tsx
```typescript
import { CloseIcon } from "../icons";
⋮----
import type { UserToFollow } from "../../types";
interface FollowModeProps {
  width: number;
  height: number;
  userToFollow: UserToFollow;
  onDisconnect: () => void;
}
const FollowMode = ({
  height,
  width,
  userToFollow,
  onDisconnect,
}: FollowModeProps) =>
```

## File: packages/excalidraw/components/FontPicker/FontPicker.test.tsx
```typescript
import { KEYS } from "@excalidraw/common";
import { Excalidraw } from "../..";
import { Keyboard } from "../../tests/helpers/ui";
import { act, render } from "../../tests/test-utils";
⋮----
observe()
unobserve()
disconnect()
```

## File: packages/excalidraw/components/FontPicker/FontPicker.tsx
```typescript
import { Popover } from "radix-ui";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { FONT_FAMILY } from "@excalidraw/common";
import type { FontFamilyValues } from "@excalidraw/element/types";
import { t } from "../../i18n";
import { RadioSelection } from "../RadioSelection";
import { ButtonSeparator } from "../ButtonSeparator";
import {
  FontFamilyCodeIcon,
  FontFamilyNormalIcon,
  FreedrawIcon,
} from "../icons";
import { FontPickerList } from "./FontPickerList";
import { FontPickerTrigger } from "./FontPickerTrigger";
⋮----
export const isDefaultFont = (fontFamily: number | null) =>
interface FontPickerProps {
  isOpened: boolean;
  selectedFontFamily: FontFamilyValues | null;
  hoveredFontFamily: FontFamilyValues | null;
  onSelect: (fontFamily: FontFamilyValues) => void;
  onHover: (fontFamily: FontFamilyValues) => void;
  onLeave: () => void;
  onPopupChange: (open: boolean) => void;
  compactMode?: boolean;
}
⋮----
className=
⋮----
onClose=
```

## File: packages/excalidraw/components/FontPicker/FontPickerList.tsx
```typescript
import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEventHandler,
} from "react";
import { type FontFamilyValues } from "@excalidraw/element/types";
import {
  arrayToList,
  debounce,
  FONT_FAMILY,
  getFontFamilyString,
} from "@excalidraw/common";
import type { ValueOf } from "@excalidraw/common/utility-types";
import { Fonts } from "../../fonts";
import { t } from "../../i18n";
import {
  useApp,
  useAppProps,
  useExcalidrawContainer,
  useStylesPanelMode,
} from "../App";
import { PropertiesPopover } from "../PropertiesPopover";
import { QuickSearch } from "../QuickSearch";
import { ScrollableList } from "../ScrollableList";
import DropdownMenuGroup from "../dropdownMenu/DropdownMenuGroup";
import {
  DropDownMenuItemBadgeType,
  DropDownMenuItemBadge,
} from "../dropdownMenu/DropdownMenuItem";
import MenuItemContent from "../dropdownMenu/DropdownMenuItemContent";
import { getDropdownMenuItemClassName } from "../dropdownMenu/common";
import {
  FontFamilyCodeIcon,
  FontFamilyHeadingIcon,
  FontFamilyNormalIcon,
  FreedrawIcon,
} from "../icons";
import { fontPickerKeyHandler } from "./keyboardNavHandlers";
import type { JSX } from "react";
export interface FontDescriptor {
  value: number;
  icon: JSX.Element;
  text: string;
  deprecated?: true;
  badge?: {
    type: ValueOf<typeof DropDownMenuItemBadgeType>;
    placeholder: string;
  };
}
interface FontPickerListProps {
  selectedFontFamily: FontFamilyValues | null;
  hoveredFontFamily: FontFamilyValues | null;
  onSelect: (value: number) => void;
  onHover: (value: number) => void;
  onLeave: () => void;
  onOpen: () => void;
  onClose: () => void;
}
const getFontFamilyIcon = (fontFamily: FontFamilyValues): JSX.Element =>
⋮----
className=
// allow to tab between search and selected font
⋮----
<DropdownMenuGroup title=
⋮----
onChange=
```

## File: packages/excalidraw/components/FontPicker/FontPickerTrigger.tsx
```typescript
import { Popover } from "radix-ui";
import { MOBILE_ACTION_BUTTON_BG } from "@excalidraw/common";
import type { FontFamilyValues } from "@excalidraw/element/types";
import { t } from "../../i18n";
import { ButtonIcon } from "../ButtonIcon";
import { TextIcon } from "../icons";
import { useExcalidrawSetAppState } from "../App";
interface FontPickerTriggerProps {
  selectedFontFamily: FontFamilyValues | null;
  isOpened?: boolean;
  compactMode?: boolean;
}
export const FontPickerTrigger = ({
  selectedFontFamily,
  isOpened = false,
  compactMode = false,
}: FontPickerTriggerProps) =>
⋮----
setAppState((appState) => (
```

## File: packages/excalidraw/components/FontPicker/keyboardNavHandlers.ts
```typescript
import { KEYS } from "@excalidraw/common";
import type { Node } from "@excalidraw/common";
import { type FontDescriptor } from "./FontPickerList";
interface FontPickerKeyNavHandlerProps {
  event: React.KeyboardEvent<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  hoveredFont: Node<FontDescriptor> | undefined;
  filteredFonts: Node<FontDescriptor>[];
  onClose: () => void;
  onSelect: (value: number) => void;
  onHover: (value: number) => void;
}
export const fontPickerKeyHandler = ({
  event,
  inputRef,
  hoveredFont,
  filteredFonts,
  onClose,
  onSelect,
  onHover,
}: FontPickerKeyNavHandlerProps) =>
```

## File: packages/excalidraw/components/footer/Footer.tsx
```typescript
import clsx from "clsx";
import { actionShortcuts } from "../../actions";
import { useTunnels } from "../../context/tunnels";
import { ExitZenModeButton, UndoRedoActions, ZoomActions } from "../Actions";
import { HelpButton } from "../HelpButton";
import { Section } from "../Section";
import Stack from "../Stack";
import type { ActionManager } from "../../actions/manager";
import type { UIAppState } from "../../types";
⋮----
className=
```

## File: packages/excalidraw/components/footer/FooterCenter.tsx
```typescript
import clsx from "clsx";
import { useTunnels } from "../../context/tunnels";
import { useUIAppState } from "../../context/ui-appState";
⋮----
const FooterCenter = (
⋮----
className=
```

## File: packages/excalidraw/components/hoc/withInternalFallback.test.tsx
```typescript
import React from "react";
import { Excalidraw, MainMenu } from "../../index";
import { render, queryAllByTestId } from "../../tests/test-utils";
```

## File: packages/excalidraw/components/hoc/withInternalFallback.tsx
```typescript
import React, { useLayoutEffect, useRef } from "react";
import { useTunnels } from "../../context/tunnels";
import { atom } from "../../editor-jotai";
export const withInternalFallback = <P,>(
  componentName: string,
  Component: React.FC<P>,
) =>
⋮----
const WrapperComponent: React.FC<
    P & {
      __fallback?: boolean;
    }
> = (props) =>
```

## File: packages/excalidraw/components/hyperlink/helpers.ts
```typescript
import { pointFrom, pointRotateRads } from "@excalidraw/math";
import { MIME_TYPES } from "@excalidraw/common";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import { hitElementBoundingBox } from "@excalidraw/element";
import type { GlobalPoint, Radians } from "@excalidraw/math";
import type { Bounds } from "@excalidraw/common";
import type {
  ElementsMap,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import type { AppState, UIAppState } from "../../types";
⋮----
export const getLinkHandleFromCoords = (
  [x1, y1, x2, y2]: Bounds,
  angle: Radians,
  appState: Pick<UIAppState, "zoom">,
): Bounds =>
export const isPointHittingLinkIcon = (
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  appState: AppState,
  [x, y]: GlobalPoint,
) =>
export const isPointHittingLink = (
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  appState: AppState,
  [x, y]: GlobalPoint,
  isMobile: boolean,
) =>
```

## File: packages/excalidraw/components/hyperlink/Hyperlink.tsx
```typescript
import { pointFrom, type GlobalPoint } from "@excalidraw/math";
import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { EVENT, HYPERLINK_TOOLTIP_DELAY, KEYS } from "@excalidraw/common";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import { hitElementBoundingBox } from "@excalidraw/element";
import { isElementLink } from "@excalidraw/element";
import { getEmbedLink, embeddableURLValidator } from "@excalidraw/element";
import {
  sceneCoordsToViewportCoords,
  viewportCoordsToSceneCoords,
  wrapEvent,
  isLocalLink,
  normalizeLink,
} from "@excalidraw/common";
import { isEmbeddableElement } from "@excalidraw/element";
import type { Scene } from "@excalidraw/element";
import type {
  ElementsMap,
  ExcalidrawEmbeddableElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import { trackEvent } from "../../analytics";
import { getTooltipDiv, updateTooltipPosition } from "../../components/Tooltip";
import { t } from "../../i18n";
import { useAppProps, useEditorInterface, useExcalidrawAppState } from "../App";
import { ToolButton } from "../ToolButton";
import { FreedrawIcon, TrashIcon, elementLinkIcon } from "../icons";
import { getSelectedElements } from "../../scene";
import { getLinkHandleFromCoords } from "./helpers";
⋮----
import type { AppState, ExcalidrawProps, UIAppState } from "../../types";
⋮----
const handlePointerMove = (event: PointerEvent) =>
⋮----
const onEdit = () =>
⋮----
className=
⋮----
onChange=
⋮----
event.stopPropagation();
⋮----
href=
⋮----
aria-label=
⋮----
export const showHyperlinkTooltip = (
  element: NonDeletedExcalidrawElement,
  appState: AppState,
  elementsMap: ElementsMap,
) =>
⋮----
if (!element.link)
```

## File: packages/excalidraw/components/live-collaboration/LiveCollaborationTrigger.tsx
```typescript
import clsx from "clsx";
import { MQ_MIN_WIDTH_DESKTOP, type EditorInterface } from "@excalidraw/common";
import { t } from "../../i18n";
import { Button } from "../Button";
import { share } from "../icons";
import { useUIAppState } from "../../context/ui-appState";
```

## File: packages/excalidraw/components/main-menu/DefaultItems.tsx
```typescript
import clsx from "clsx";
import { THEME } from "@excalidraw/common";
import type { Theme } from "@excalidraw/element/types";
import {
  actionClearCanvas,
  actionLoadScene,
  actionSaveToActiveFile,
  actionShortcuts,
  actionToggleArrowBinding,
  actionToggleGridMode,
  actionToggleMidpointSnapping,
  actionToggleObjectsSnapMode,
  actionToggleSearchMenu,
  actionToggleStats,
  actionToggleTheme,
  actionToggleZenMode,
} from "../../actions";
import { actionToggleViewMode } from "../../actions/actionToggleViewMode";
import { getShortcutFromShortcutName } from "../../actions/shortcuts";
import { trackEvent } from "../../analytics";
import { useUIAppState } from "../../context/ui-appState";
import { useSetAtom } from "../../editor-jotai";
import { useI18n } from "../../i18n";
import { activeConfirmDialogAtom } from "../ActiveConfirmDialog";
import {
  useExcalidrawSetAppState,
  useExcalidrawActionManager,
  useExcalidrawElements,
  useAppProps,
  useApp,
} from "../App";
import { openConfirmModal } from "../OverwriteConfirm/OverwriteConfirmState";
import Trans from "../Trans";
import DropdownMenuItem from "../dropdownMenu/DropdownMenuItem";
import DropdownMenuItemCheckbox from "../dropdownMenu/DropdownMenuItemCheckbox";
import DropdownMenuItemContentRadio from "../dropdownMenu/DropdownMenuItemContentRadio";
import DropdownMenuItemLink from "../dropdownMenu/DropdownMenuItemLink";
import DropdownMenuSub from "../dropdownMenu/DropdownMenuSub";
import { GithubIcon, DiscordIcon, XBrandIcon, settingsIcon } from "../icons";
import {
  boltIcon,
  DeviceDesktopIcon,
  ExportIcon,
  ExportImageIcon,
  HelpIcon,
  LoadIcon,
  MoonIcon,
  save,
  searchIcon,
  SunIcon,
  TrashIcon,
  usersIcon,
} from "../icons";
⋮----
const handleSelect = async () =>
⋮----
aria-label=
⋮----
shortcut=
⋮----
setAppState(
⋮----
actionManager.executeAction(actionToggleSearchMenu);
⋮----
onChange=
⋮----
event.preventDefault();
if (props?.onSelect)
props.onSelect(
            appState.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK,
          );
⋮----

⋮----
onSelect=
```

## File: packages/excalidraw/components/main-menu/MainMenu.tsx
```typescript
import React from "react";
import { composeEventHandlers } from "@excalidraw/common";
import { useTunnels } from "../../context/tunnels";
import { useUIAppState } from "../../context/ui-appState";
import { t } from "../../i18n";
import { useEditorInterface, useExcalidrawSetAppState } from "../App";
import { UserList } from "../UserList";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import DropdownMenuSub from "../dropdownMenu/DropdownMenuSub";
import { withInternalFallback } from "../hoc/withInternalFallback";
import { HamburgerMenuIcon } from "../icons";
⋮----
setAppState({
                  openMenu: appState.openMenu === "canvas" ? null : "canvas",
                  openPopup: null,
                  openDialog: null,
                });
```

## File: packages/excalidraw/components/OverwriteConfirm/OverwriteConfirm.tsx
```typescript
import React from "react";
import { useTunnels } from "../../context/tunnels";
import { useAtom } from "../../editor-jotai";
import { Dialog } from "../Dialog";
import { FilledButton } from "../FilledButton";
import { withInternalFallback } from "../hoc/withInternalFallback";
import { alertTriangleIcon } from "../icons";
import { Actions, Action } from "./OverwriteConfirmActions";
import { overwriteConfirmStateAtom } from "./OverwriteConfirmState";
⋮----
export type OverwriteConfirmDialogProps = {
  children: React.ReactNode;
};
⋮----
const handleClose = () =>
const handleConfirm = () =>
```

## File: packages/excalidraw/components/OverwriteConfirm/OverwriteConfirmActions.tsx
```typescript
import React from "react";
import { actionSaveFileToDisk } from "../../actions";
import { actionChangeExportEmbedScene } from "../../actions/actionExport";
import { useI18n } from "../../i18n";
import { useExcalidrawActionManager, useExcalidrawSetAppState } from "../App";
import { FilledButton } from "../FilledButton";
export type ActionProps = {
  title: string;
  children: React.ReactNode;
  actionLabel: string;
  onClick: () => void;
};
export const Action = ({
  title,
  children,
  actionLabel,
  onClick,
}: ActionProps) =>
⋮----
title=
⋮----
actionManager.executeAction(actionChangeExportEmbedScene, "ui", true);
setAppState(
⋮----
actionManager.executeAction(actionSaveFileToDisk, "ui");
```

## File: packages/excalidraw/components/OverwriteConfirm/OverwriteConfirmState.ts
```typescript
import { atom, editorJotaiStore } from "../../editor-jotai";
import type React from "react";
export type OverwriteConfirmState =
  | {
      active: true;
      title: string;
      description: React.ReactNode;
      actionLabel: string;
      color: "danger" | "warning";
      onClose: () => void;
      onConfirm: () => void;
      onReject: () => void;
    }
  | { active: false };
⋮----
export async function openConfirmModal({
  title,
  description,
  actionLabel,
  color,
}: {
  title: string;
  description: React.ReactNode;
  actionLabel: string;
  color: "danger" | "warning";
})
```

## File: packages/excalidraw/components/Sidebar/common.ts
```typescript
import React from "react";
import type { AppState, SidebarName, SidebarTabName } from "../../types";
import type { JSX } from "react";
export type SidebarTriggerProps = {
  name: SidebarName;
  tab?: SidebarTabName;
  icon?: JSX.Element;
  children?: React.ReactNode;
  title?: string;
  className?: string;
  onToggle?: (open: boolean) => void;
  style?: React.CSSProperties;
};
export type SidebarProps<P = {}> = {
  name: SidebarName;
  children: React.ReactNode;
  onStateChange?: (state: AppState["openSidebar"]) => void;
  onDock?: (docked: boolean) => void;
  docked?: boolean;
  className?: string;
  __fallback?: boolean;
} & P;
export type SidebarPropsContextValue = Pick<
  SidebarProps,
  "onDock" | "docked"
> & { onCloseRequest: () => void; shouldRenderDockButton: boolean };
```

## File: packages/excalidraw/components/Sidebar/Sidebar.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { DEFAULT_SIDEBAR } from "@excalidraw/common";
import { Excalidraw, Sidebar } from "../../index";
import {
  act,
  fireEvent,
  queryAllByTestId,
  queryByTestId,
  render,
  waitFor,
  withExcalidrawDimensions,
} from "../../tests/test-utils";
import {
  assertExcalidrawWithSidebar,
  assertSidebarDockButton,
} from "./siderbar.test.helpers";
const toggleSidebar = (
  ...args: Parameters<typeof window.h.app.toggleSidebar>
): Promise<boolean> =>
⋮----
const CustomExcalidraw = () =>
```

## File: packages/excalidraw/components/Sidebar/Sidebar.tsx
```typescript
import clsx from "clsx";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  CLASSES,
  EVENT,
  isDevEnv,
  KEYS,
  updateObject,
} from "@excalidraw/common";
import { useUIAppState } from "../../context/ui-appState";
import { atom, useSetAtom } from "../../editor-jotai";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEditorInterface, useExcalidrawSetAppState } from "../App";
import { Island } from "../Island";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarTabTrigger } from "./SidebarTabTrigger";
import { SidebarTabTriggers } from "./SidebarTabTriggers";
import { SidebarTrigger } from "./SidebarTrigger";
import { SidebarPropsContext } from "./common";
import { SidebarTabs } from "./SidebarTabs";
import { SidebarTab } from "./SidebarTab";
⋮----
import type { SidebarProps, SidebarPropsContextValue } from "./common";
⋮----
const handleKeyDown = (event: KeyboardEvent) =>
⋮----
className=
```

## File: packages/excalidraw/components/Sidebar/SidebarHeader.tsx
```typescript
import clsx from "clsx";
import { useContext } from "react";
import { t } from "../../i18n";
import { useEditorInterface } from "../App";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import { CloseIcon, PinIcon } from "../icons";
import { SidebarPropsContext } from "./common";
⋮----
className=
⋮----
<Tooltip label=
```

## File: packages/excalidraw/components/Sidebar/SidebarTab.tsx
```typescript
import { Tabs as RadixTabs } from "radix-ui";
import type { SidebarTabName } from "../../types";
export const SidebarTab = ({
  tab,
  children,
  ...rest
}: {
  tab: SidebarTabName;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) =>
```

## File: packages/excalidraw/components/Sidebar/SidebarTabs.tsx
```typescript
import { Tabs as RadixTabs } from "radix-ui";
import { useUIAppState } from "../../context/ui-appState";
import { useExcalidrawSetAppState } from "../App";
export const SidebarTabs = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & Omit<React.RefAttributes<HTMLDivElement>, "onSelect">) =>
⋮----
setAppState((state) => (
```

## File: packages/excalidraw/components/Sidebar/SidebarTabTrigger.tsx
```typescript
import { Tabs as RadixTabs } from "radix-ui";
import type { SidebarTabName } from "../../types";
export const SidebarTabTrigger = ({
  children,
  tab,
  onSelect,
  ...rest
}: {
  children: React.ReactNode;
  tab: SidebarTabName;
  onSelect?: React.ReactEventHandler<HTMLButtonElement> | undefined;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, "onSelect">) =>
```

## File: packages/excalidraw/components/Sidebar/SidebarTabTriggers.tsx
```typescript
import { Tabs as RadixTabs } from "radix-ui";
export const SidebarTabTriggers = ({
  children,
  ...rest
}: { children: React.ReactNode } & Omit<
  React.RefAttributes<HTMLDivElement>,
  "onSelect"
>) =>
```

## File: packages/excalidraw/components/Sidebar/SidebarTrigger.tsx
```typescript
import clsx from "clsx";
import { useUIAppState } from "../../context/ui-appState";
import { useExcalidrawSetAppState } from "../App";
⋮----
import type { SidebarTriggerProps } from "./common";
export const SidebarTrigger = ({
  name,
  tab,
  icon,
  title,
  children,
  onToggle,
  className,
  style,
}: SidebarTriggerProps) =>
⋮----
<div className=
```

## File: packages/excalidraw/components/Sidebar/siderbar.test.helpers.tsx
```typescript
import React from "react";
import { Excalidraw } from "../..";
import {
  GlobalTestState,
  queryByTestId,
  render,
  withExcalidrawDimensions,
} from "../../tests/test-utils";
export const assertSidebarDockButton = async <T extends boolean>(
  hasDockButton: T,
): Promise<
  T extends false
    ? { dockButton: null; sidebar: HTMLElement }
    : { dockButton: HTMLElement; sidebar: HTMLElement }
> => {
  const sidebar =
    GlobalTestState.renderResult.container.querySelector<HTMLElement>(
      ".sidebar",
    );
export const assertExcalidrawWithSidebar = async (
  sidebar: React.ReactNode,
  name: string,
  test: () => void,
) =>
```

## File: packages/excalidraw/components/Stats/Angle.tsx
```typescript
import { degreesToRadians, radiansToDegrees } from "@excalidraw/math";
import { getBoundTextElement } from "@excalidraw/element";
import { isArrowElement, isElbowArrow } from "@excalidraw/element";
import { updateBindings } from "@excalidraw/element";
import type { Degrees } from "@excalidraw/math";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import { angleIcon } from "../icons";
import DragInput from "./DragInput";
import { getStepSizedValue, isPropertyEditable } from "./utils";
import type { DragInputCallbackType } from "./DragInput";
import type { AppState } from "../../types";
interface AngleProps {
  element: ExcalidrawElement;
  scene: Scene;
  appState: AppState;
  property: "angle";
}
⋮----
const handleDegreeChange: DragInputCallbackType<AngleProps["property"]> = ({
  accumulatedChange,
  originalElements,
  shouldChangeByStepSize,
  nextValue,
  scene,
  app,
}) =>
```

## File: packages/excalidraw/components/Stats/CanvasGrid.tsx
```typescript
import type { Scene } from "@excalidraw/element";
import { getNormalizedGridStep } from "../../scene";
import StatsDragInput from "./DragInput";
import { getStepSizedValue } from "./utils";
import type { AppState } from "../../types";
interface PositionProps {
  property: "gridStep";
  scene: Scene;
  appState: AppState;
  setAppState: React.Component<any, AppState>["setState"];
}
⋮----
const CanvasGrid = ({
  property,
  scene,
  appState,
  setAppState,
}: PositionProps) =>
```

## File: packages/excalidraw/components/Stats/Collapsible.tsx
```typescript
import { InlineIcon } from "../InlineIcon";
import { collapseDownIcon, collapseUpIcon } from "../icons";
interface CollapsibleProps {
  label: React.ReactNode;
  open: boolean;
  openTrigger: () => void;
  children: React.ReactNode;
  className?: string;
  showCollapsedIcon?: boolean;
}
```

## File: packages/excalidraw/components/Stats/Dimension.tsx
```typescript
import { clamp, round } from "@excalidraw/math";
import { MIN_WIDTH_OR_HEIGHT } from "@excalidraw/common";
import {
  MINIMAL_CROP_SIZE,
  getUncroppedWidthAndHeight,
} from "@excalidraw/element";
import { resizeSingleElement } from "@excalidraw/element";
import { isImageElement } from "@excalidraw/element";
import { isFrameLikeElement } from "@excalidraw/element";
import { getElementsInResizingFrame } from "@excalidraw/element";
import { replaceAllElementsInFrame } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import DragInput from "./DragInput";
import { getStepSizedValue, isPropertyEditable } from "./utils";
import type {
  DragFinishedCallbackType,
  DragInputCallbackType,
} from "./DragInput";
import type { AppState } from "../../types";
interface DimensionDragInputProps {
  property: "width" | "height";
  element: ExcalidrawElement;
  scene: Scene;
  appState: AppState;
}
⋮----
const _shouldKeepAspectRatio = (element: ExcalidrawElement) =>
const handleDimensionChange: DragInputCallbackType<
  DimensionDragInputProps["property"]
> = ({
  accumulatedChange,
  originalElements,
  originalElementsMap,
  shouldKeepAspectRatio,
  shouldChangeByStepSize,
  nextValue,
  property,
  originalAppState,
  instantChange,
  scene,
  app,
  setAppState,
}) =>
const handleDragFinished: DragFinishedCallbackType = ({
  setAppState,
  app,
  originalElements,
  originalAppState,
}) =>
⋮----
editable=
```

## File: packages/excalidraw/components/Stats/DragInput.tsx
```typescript
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { EVENT, KEYS, cloneJSON } from "@excalidraw/common";
import { deepCopyElement } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import type { ElementsMap, ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import { useApp, useExcalidrawSetAppState } from "../App";
import { InlineIcon } from "../InlineIcon";
import { SMALLEST_DELTA } from "./utils";
⋮----
import type { StatsInputProperty } from "./utils";
import type { AppState } from "../../types";
export type DragInputCallbackType<
  P extends StatsInputProperty,
  E = ExcalidrawElement,
> = (props: {
  accumulatedChange: number;
  instantChange: number;
  originalElements: readonly E[];
  originalElementsMap: ElementsMap;
  shouldKeepAspectRatio: boolean;
  shouldChangeByStepSize: boolean;
  scene: Scene;
  nextValue?: number;
  property: P;
  originalAppState: AppState;
  setInputValue: (value: number) => void;
  app: ReturnType<typeof useApp>;
  setAppState: ReturnType<typeof useExcalidrawSetAppState>;
}) => void;
export type DragFinishedCallbackType<E = ExcalidrawElement> = (props: {
  app: ReturnType<typeof useApp>;
  setAppState: ReturnType<typeof useExcalidrawSetAppState>;
  originalElements: readonly E[] | null;
  originalAppState: AppState;
}) => void;
interface StatsDragInputProps<
  T extends StatsInputProperty,
  E = ExcalidrawElement,
> {
  label: string | React.ReactNode;
  icon?: React.ReactNode;
  value: number | "Mixed";
  elements: readonly E[];
  editable?: boolean;
  shouldKeepAspectRatio?: boolean;
  dragInputCallback: DragInputCallbackType<T, E>;
  property: T;
  scene: Scene;
  appState: AppState;
  sensitivity?: number;
  dragFinishedCallback?: DragFinishedCallbackType;
}
⋮----
const handleInputValue = (
    updatedValue: string,
    elements: readonly E[],
    appState: AppState,
) =>
⋮----
className=
⋮----
onPointerDown=
⋮----
const onPointerMove = (event: PointerEvent) =>
const onPointerUp = () =>
⋮----
if (labelRef.current)
⋮----
handleInputValue(eventTarget.value, elements, appState);
⋮----
onBlur=
```

## File: packages/excalidraw/components/Stats/FontSize.tsx
```typescript
import {
  getBoundTextElement,
  redrawTextBoundingBox,
} from "@excalidraw/element";
import { hasBoundTextElement, isTextElement } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import { fontSizeIcon } from "../icons";
import StatsDragInput from "./DragInput";
import { getStepSizedValue } from "./utils";
import type { DragInputCallbackType } from "./DragInput";
import type { AppState } from "../../types";
interface FontSizeProps {
  element: ExcalidrawElement;
  scene: Scene;
  appState: AppState;
  property: "fontSize";
}
⋮----
const handleFontSizeChange: DragInputCallbackType<
  FontSizeProps["property"],
  ExcalidrawTextElement
> = ({
  accumulatedChange,
  originalElements,
  shouldChangeByStepSize,
  nextValue,
  scene,
}) =>
```

## File: packages/excalidraw/components/Stats/index.tsx
```typescript
import { round } from "@excalidraw/math";
import clsx from "clsx";
import throttle from "lodash.throttle";
import { useEffect, useMemo, useState, memo } from "react";
import { STATS_PANELS } from "@excalidraw/common";
import { getCommonBounds } from "@excalidraw/element";
import { getUncroppedWidthAndHeight } from "@excalidraw/element";
import { isImageElement } from "@excalidraw/element";
import { frameAndChildrenSelectedTogether } from "@excalidraw/element";
import { elementsAreInSameGroup } from "@excalidraw/element";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { t } from "../../i18n";
import { isGridModeEnabled } from "../../snapping";
import { useExcalidrawAppState, useExcalidrawSetAppState } from "../App";
import { Island } from "../Island";
import { CloseIcon } from "../icons";
import Angle from "./Angle";
import CanvasGrid from "./CanvasGrid";
import Collapsible from "./Collapsible";
import Dimension from "./Dimension";
import FontSize from "./FontSize";
import MultiAngle from "./MultiAngle";
import MultiDimension from "./MultiDimension";
import MultiFontSize from "./MultiFontSize";
import MultiPosition from "./MultiPosition";
import Position from "./Position";
import { getAtomicUnits } from "./utils";
⋮----
import type {
  AppClassProperties,
  AppState,
  ExcalidrawProps,
} from "../../types";
interface StatsProps {
  app: AppClassProperties;
  onClose: () => void;
  renderCustomStats: ExcalidrawProps["renderCustomStats"];
}
⋮----
export const Stats = (props: StatsProps) =>
const StatsRow = ({
  children,
  columns = 1,
  heading,
  style,
  ...rest
}: {
  children: React.ReactNode;
  columns?: number;
  heading?: boolean;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx("exc-stats__row", { "exc-stats__row--heading": heading })}
    style={{
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);
⋮----
className=
⋮----
const StatsRows = ({
  children,
  order,
  style,
  ...rest
}: {
  children: React.ReactNode;
  order?: number;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div className="exc-stats__rows" style={{ order, ...style }} {...rest}>
    {children}
  </div>
);
⋮----
```

## File: packages/excalidraw/components/Stats/MultiAngle.tsx
```typescript
import { degreesToRadians, radiansToDegrees } from "@excalidraw/math";
import { getBoundTextElement } from "@excalidraw/element";
import { isArrowElement } from "@excalidraw/element";
import { isInGroup } from "@excalidraw/element";
import type { Degrees } from "@excalidraw/math";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import { angleIcon } from "../icons";
import DragInput from "./DragInput";
import { getStepSizedValue, isPropertyEditable } from "./utils";
import type { DragInputCallbackType } from "./DragInput";
import type { AppState } from "../../types";
interface MultiAngleProps {
  elements: readonly ExcalidrawElement[];
  scene: Scene;
  appState: AppState;
  property: "angle";
}
⋮----
const handleDegreeChange: DragInputCallbackType<
  MultiAngleProps["property"]
> = ({
  accumulatedChange,
  originalElements,
  shouldChangeByStepSize,
  nextValue,
  property,
  scene,
}) =>
const MultiAngle = ({
  elements,
  scene,
  appState,
  property,
}: MultiAngleProps) =>
```

## File: packages/excalidraw/components/Stats/MultiDimension.tsx
```typescript
import { pointFrom, type GlobalPoint } from "@excalidraw/math";
import { useMemo } from "react";
import { MIN_WIDTH_OR_HEIGHT } from "@excalidraw/common";
import {
  getElementsInResizingFrame,
  isFrameLikeElement,
  replaceAllElementsInFrame,
  updateBoundElements,
} from "@excalidraw/element";
import {
  rescalePointsInElement,
  resizeSingleElement,
} from "@excalidraw/element";
import { getBoundTextElement, handleBindTextResize } from "@excalidraw/element";
import { isTextElement } from "@excalidraw/element";
import { getCommonBounds } from "@excalidraw/utils";
import type {
  ElementsMap,
  ExcalidrawElement,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import DragInput from "./DragInput";
import { getAtomicUnits, getStepSizedValue, isPropertyEditable } from "./utils";
import { getElementsInAtomicUnit } from "./utils";
import type {
  DragFinishedCallbackType,
  DragInputCallbackType,
} from "./DragInput";
import type { AtomicUnit } from "./utils";
import type { AppState } from "../../types";
interface MultiDimensionProps {
  property: "width" | "height";
  elements: readonly ExcalidrawElement[];
  elementsMap: NonDeletedSceneElementsMap;
  atomicUnits: AtomicUnit[];
  scene: Scene;
  appState: AppState;
}
⋮----
const getResizedUpdates = (
  anchorX: number,
  anchorY: number,
  scale: number,
  origElement: ExcalidrawElement,
) =>
const resizeElementInGroup = (
  anchorX: number,
  anchorY: number,
  property: MultiDimensionProps["property"],
  scale: number,
  latestElement: ExcalidrawElement,
  origElement: ExcalidrawElement,
  originalElementsMap: ElementsMap,
  scene: Scene,
) =>
const resizeGroup = (
  nextWidth: number,
  nextHeight: number,
  initialHeight: number,
  aspectRatio: number,
  anchor: GlobalPoint,
  property: MultiDimensionProps["property"],
  latestElements: ExcalidrawElement[],
  originalElements: ExcalidrawElement[],
  originalElementsMap: ElementsMap,
  scene: Scene,
) =>
const handleDimensionChange: DragInputCallbackType<
  MultiDimensionProps["property"]
> = ({
  accumulatedChange,
  originalElements,
  originalElementsMap,
  originalAppState,
  shouldChangeByStepSize,
  nextValue,
  scene,
  property,
  setAppState,
  app,
}) =>
const handleDragFinished: DragFinishedCallbackType = ({
  setAppState,
  app,
  originalElements,
  originalAppState,
}) =>
const MultiDimension = ({
  property,
  elements,
  elementsMap,
  atomicUnits,
  scene,
  appState,
}: MultiDimensionProps) =>
```

## File: packages/excalidraw/components/Stats/MultiFontSize.tsx
```typescript
import {
  getBoundTextElement,
  redrawTextBoundingBox,
} from "@excalidraw/element";
import { hasBoundTextElement, isTextElement } from "@excalidraw/element";
import { isInGroup } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawTextElement,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import { fontSizeIcon } from "../icons";
import StatsDragInput from "./DragInput";
import { getStepSizedValue } from "./utils";
import type { DragInputCallbackType } from "./DragInput";
import type { AppState } from "../../types";
interface MultiFontSizeProps {
  elements: readonly ExcalidrawElement[];
  scene: Scene;
  elementsMap: NonDeletedSceneElementsMap;
  appState: AppState;
  property: "fontSize";
}
⋮----
const getApplicableTextElements = (
  elements: readonly (ExcalidrawElement | undefined)[],
  elementsMap: NonDeletedSceneElementsMap,
)
const handleFontSizeChange: DragInputCallbackType<
  MultiFontSizeProps["property"],
  ExcalidrawTextElement
> = ({
  accumulatedChange,
  originalElements,
  shouldChangeByStepSize,
  nextValue,
  scene,
}) =>
const MultiFontSize = ({
  elements,
  scene,
  appState,
  property,
  elementsMap,
}: MultiFontSizeProps) =>
```

## File: packages/excalidraw/components/Stats/MultiPosition.tsx
```typescript
import { pointFrom, pointRotateRads } from "@excalidraw/math";
import { useMemo } from "react";
import { isTextElement } from "@excalidraw/element";
import { getCommonBounds } from "@excalidraw/element";
import type { ElementsMap, ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import StatsDragInput from "./DragInput";
import {
  getAtomicUnits,
  getStepSizedValue,
  isPropertyEditable,
  STEP_SIZE,
} from "./utils";
import { getElementsInAtomicUnit, moveElement } from "./utils";
import type { DragInputCallbackType } from "./DragInput";
import type { AtomicUnit } from "./utils";
import type { AppState } from "../../types";
interface MultiPositionProps {
  property: "x" | "y";
  elements: readonly ExcalidrawElement[];
  elementsMap: ElementsMap;
  atomicUnits: AtomicUnit[];
  scene: Scene;
  appState: AppState;
}
const moveElements = (
  property: MultiPositionProps["property"],
  changeInTopX: number,
  changeInTopY: number,
  originalElements: readonly ExcalidrawElement[],
  originalElementsMap: ElementsMap,
  scene: Scene,
  appState: AppState,
) =>
const moveGroupTo = (
  nextX: number,
  nextY: number,
  originalElements: ExcalidrawElement[],
  originalElementsMap: ElementsMap,
  scene: Scene,
  appState: AppState,
) =>
const handlePositionChange: DragInputCallbackType<
  MultiPositionProps["property"]
> = ({
  accumulatedChange,
  originalElements,
  originalElementsMap,
  shouldChangeByStepSize,
  nextValue,
  property,
  scene,
  originalAppState,
  app,
}) =>
const MultiPosition = ({
  property,
  elements,
  elementsMap,
  atomicUnits,
  scene,
  appState,
}: MultiPositionProps) =>
```

## File: packages/excalidraw/components/Stats/Position.tsx
```typescript
import { clamp, pointFrom, pointRotateRads, round } from "@excalidraw/math";
import {
  getFlipAdjustedCropPosition,
  getUncroppedWidthAndHeight,
} from "@excalidraw/element";
import { isImageElement } from "@excalidraw/element";
import type { ElementsMap, ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import StatsDragInput from "./DragInput";
import { getStepSizedValue, moveElement, STEP_SIZE } from "./utils";
import type { DragInputCallbackType } from "./DragInput";
import type { AppState } from "../../types";
interface PositionProps {
  property: "x" | "y";
  element: ExcalidrawElement;
  elementsMap: ElementsMap;
  scene: Scene;
  appState: AppState;
}
const handlePositionChange: DragInputCallbackType<"x" | "y"> = ({
  accumulatedChange,
  instantChange,
  originalElements,
  originalElementsMap,
  shouldChangeByStepSize,
  nextValue,
  property,
  scene,
  originalAppState,
  app,
}) =>
```

## File: packages/excalidraw/components/Stats/stats.test.tsx
```typescript
import { degreesToRadians, pointFrom, pointRotateRads } from "@excalidraw/math";
import { act, fireEvent, queryByTestId } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import { setDateTimeForTests, reseed } from "@excalidraw/common";
import { isInGroup } from "@excalidraw/element";
import { isTextElement } from "@excalidraw/element";
import type { Degrees } from "@excalidraw/math";
import type {
  ExcalidrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import { Excalidraw, getCommonBounds } from "../..";
import { actionGroup } from "../../actions";
import { t } from "../../i18n";
⋮----
import { API } from "../../tests/helpers/api";
import { Keyboard, Pointer, UI } from "../../tests/helpers/ui";
import { getTextEditor, updateTextEditor } from "../../tests/queries/dom";
import {
  GlobalTestState,
  mockBoundingClientRect,
  render,
  restoreOriginalGetBoundingClientRect,
} from "../../tests/test-utils";
import { getStepSizedValue } from "./utils";
⋮----
const testInputProperty = (
  element: ExcalidrawElement,
  property: "x" | "y" | "width" | "height" | "angle" | "fontSize",
  label: string,
  initialValue: number,
  nextValue: number,
) =>
⋮----
const createAndSelectGroup = () =>
```

## File: packages/excalidraw/components/Stats/utils.ts
```typescript
import { pointFrom, pointRotateRads } from "@excalidraw/math";
import {
  getBoundTextElement,
  isBindingElement,
  unbindBindingElement,
} from "@excalidraw/element";
import { isFrameLikeElement } from "@excalidraw/element";
import {
  getSelectedGroupIds,
  getElementsInGroup,
  isInGroup,
} from "@excalidraw/element";
import { getFrameChildren } from "@excalidraw/element";
import { updateBindings } from "@excalidraw/element";
import { DRAGGING_THRESHOLD } from "@excalidraw/common";
import type { Radians } from "@excalidraw/math";
import type {
  ElementsMap,
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import type { AppState } from "../../types";
export type StatsInputProperty =
  | "x"
  | "y"
  | "width"
  | "height"
  | "angle"
  | "fontSize"
  | "gridStep";
⋮----
export const isPropertyEditable = (
  element: ExcalidrawElement,
  property: keyof ExcalidrawElement,
) =>
export const getStepSizedValue = (value: number, stepSize: number) =>
export type AtomicUnit = Record<string, true>;
export const getElementsInAtomicUnit = (
  atomicUnit: AtomicUnit,
  elementsMap: ElementsMap,
  originalElementsMap?: ElementsMap,
) =>
export const newOrigin = (
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  w2: number,
  h2: number,
  angle: number,
) =>
export const moveElement = (
  newTopLeftX: number,
  newTopLeftY: number,
  originalElement: ExcalidrawElement,
  scene: Scene,
  appState: AppState,
  originalElementsMap: ElementsMap,
  shouldInformMutation = true,
) =>
export const getAtomicUnits = (
  targetElements: readonly ExcalidrawElement[],
  appState: AppState,
) =>
```

## File: packages/excalidraw/components/TTDDialog/Chat/ChatHistoryMenu.tsx
```typescript
import clsx from "clsx";
import { t } from "../../../i18n";
import { historyIcon, TrashIcon } from "../../icons";
import DropdownMenu from "../../dropdownMenu/DropdownMenu";
import { FilledButton } from "../../FilledButton";
import type { SavedChat } from "../types";
interface ChatHistoryMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onNewChat: () => void;
  onRestoreChat: (chat: SavedChat) => void;
  onDeleteChat: (chatId: string, event: React.MouseEvent) => void;
  savedChats: SavedChat[];
  activeSessionId: string;
  disabled?: boolean;
  isNewChatBtnVisible?: boolean;
}
⋮----
title=
aria-label=
⋮----
onRestoreChat(chat);
```

## File: packages/excalidraw/components/TTDDialog/Chat/ChatInterface.tsx
```typescript
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { KEYS } from "@excalidraw/common";
import { ArrowRightIcon, stop as StopIcon } from "../../icons";
import { InlineIcon } from "../../InlineIcon";
import { t } from "../../../i18n";
import { TTDWelcomeMessage } from "../TTDWelcomeMessage";
import { ChatMessage } from "./ChatMessage";
import type { TChat, TTTDDialog } from "../types";
import type { FormEventHandler } from "react";
⋮----
const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
const handleSubmit = () =>
const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) =>
⋮----
const onInput: FormEventHandler<HTMLTextAreaElement> = (ev) =>
⋮----
? t("chat.rateLimit.messageLimitInputPlaceholder")
```

## File: packages/excalidraw/components/TTDDialog/Chat/ChatMessage.tsx
```typescript
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { t } from "../../../i18n";
import { FilledButton } from "../../FilledButton";
import { TrashIcon, codeIcon, stackPushIcon, RetryIcon } from "../../icons";
import type { TChat, TTTDDialog } from "../types";
⋮----
const formatTime = (date: Date) =>
⋮----

⋮----
window.open(
                          `${
                            import.meta.env.VITE_APP_PLUS_LP
                          }/plus?utm_source=excalidraw&utm_medium=app&utm_content=ttdChatBanner#excalidraw-redirect`,
                          "_blank",
                          "noopener",
                        );
```

## File: packages/excalidraw/components/TTDDialog/Chat/index.ts
```typescript

```

## File: packages/excalidraw/components/TTDDialog/Chat/TTDChatPanel.tsx
```typescript
import { t } from "../../../i18n";
import { ArrowRightIcon } from "../../icons";
import { InlineIcon } from "../../InlineIcon";
import { TTDDialogPanel } from "../TTDDialogPanel";
import { useAtom } from "../../../editor-jotai";
import { rateLimitsAtom } from "../TTDContext";
import { ChatHistoryMenu } from "./ChatHistoryMenu";
import { ChatInterface } from "./ChatInterface";
import type { TTDPanelAction } from "../TTDDialogPanel";
import type { SavedChat, TChat, TTTDDialog } from "../types";
export const TTDChatPanel = ({
  chatId,
  messages,
  currentPrompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  generatedResponse,
  isMenuOpen,
  onMenuToggle,
  onMenuClose,
  onNewChat,
  onRestoreChat,
  onDeleteChat,
  savedChats,
  activeSessionId,
  onAbort,
  onMermaidTabClick,
  onAiRepairClick,
  onDeleteMessage,
  onInsertMessage,
  onRetry,
  onViewAsMermaid,
  renderWelcomeScreen,
  renderWarning,
}: {
  chatId: string;
  messages: TChat.ChatMessage[];
  currentPrompt: string;
onPromptChange: (prompt: string)
⋮----
const getPanelActions = () =>
⋮----
const getPanelActionFlexProp = () =>
```

## File: packages/excalidraw/components/TTDDialog/Chat/useChatAgent.ts
```typescript
import { useAtom } from "../../../editor-jotai";
import { chatHistoryAtom } from "../../TTDDialog/TTDContext";
import {
  addMessages,
  updateAssistantContent,
} from "../../TTDDialog/utils/chat";
export const useChatAgent = () =>
⋮----
const addUserMessage = (content: string) =>
const addAssistantMessage = () =>
const setLastRetryAttempt = () =>
const setAssistantError = (
    errorMessage: string,
    errorType: "parse" | "network" | "other" = "other",
    errorDetails?: Error | unknown,
) =>
```

## File: packages/excalidraw/components/TTDDialog/hooks/useChatManagement.ts
```typescript
import { useCallback, useState } from "react";
import { useAtom, useSetAtom } from "../../../editor-jotai";
import { errorAtom, chatHistoryAtom } from "../TTDContext";
import { useTTDChatStorage } from "../useTTDChatStorage";
import { getLastAssistantMessage } from "../utils/chat";
import type { SavedChat, TTDPersistenceAdapter } from "../types";
interface UseChatManagementProps {
  persistenceAdapter: TTDPersistenceAdapter;
}
export const useChatManagement = ({
  persistenceAdapter,
}: UseChatManagementProps) =>
```

## File: packages/excalidraw/components/TTDDialog/hooks/useMermaidRenderer.ts
```typescript
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { useAtom } from "../../../editor-jotai";
import { chatHistoryAtom, errorAtom, showPreviewAtom } from "../TTDContext";
import { convertMermaidToExcalidraw } from "../common";
import { isValidMermaidSyntax } from "../utils/mermaidValidation";
import { getLastAssistantMessage } from "../utils/chat";
import { useUIAppState } from "../../../context/ui-appState";
import type { BinaryFiles } from "../../../types";
import type { MermaidToExcalidrawLibProps } from "../types";
⋮----
interface UseMermaidRendererProps {
  mermaidToExcalidrawLib: MermaidToExcalidrawLibProps;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}
export const useMermaidRenderer = ({
  mermaidToExcalidrawLib,
  canvasRef,
}: UseMermaidRendererProps) =>
⋮----
const fn = async (content: string) =>
```

## File: packages/excalidraw/components/TTDDialog/hooks/useTextGeneration.ts
```typescript
import { useRef } from "react";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { isFiniteNumber } from "@excalidraw/math";
import { useAtom } from "../../../editor-jotai";
import { trackEvent } from "../../../analytics";
import { t } from "../../../i18n";
import { errorAtom, rateLimitsAtom, chatHistoryAtom } from "../TTDContext";
import { useChatAgent } from "../Chat";
import {
  addMessages,
  getLastAssistantMessage,
  getMessagesForLLM,
  removeLastAssistantMessage,
  updateAssistantContent,
} from "../utils/chat";
import type { LLMMessage, TTTDDialog } from "../types";
⋮----
export const useTextGeneration = ({
  onTextSubmit,
}: {
  onTextSubmit: (
    props: TTTDDialog.OnTextSubmitProps,
)
⋮----
const validatePrompt = (prompt: string): boolean =>
const onGenerate: TTTDDialog.OnGenerate = async ({
    prompt,
    isRepairFlow = false,
}) =>
const handleAbort = () =>
```

## File: packages/excalidraw/components/TTDDialog/utils/chat.test.ts
```typescript
import {
  addMessages,
  getLastAssistantMessage,
  getMessagesForLLM,
  removeLastAssistantMessage,
  updateAssistantContent,
} from "./chat";
import type { TChat } from "../types";
```

## File: packages/excalidraw/components/TTDDialog/utils/chat.ts
```typescript
import { findLastIndex, randomId } from "@excalidraw/common";
import type { LLMMessage, TChat } from "../types";
export const updateAssistantContent = (
  chatHistory: TChat.ChatHistory,
  payload: Partial<TChat.ChatMessage>,
) =>
export const getLastAssistantMessage = (chatHistory: TChat.ChatHistory) =>
export const addMessages = (
  chatHistory: TChat.ChatHistory,
  messages: Array<Omit<TChat.ChatMessage, "id" | "timestamp">>,
) =>
export const removeLastAssistantMessage = (chatHistory: TChat.ChatHistory) =>
export const getMessagesForLLM = (
  chatHistory: TChat.ChatHistory,
): LLMMessage[] =>
```

## File: packages/excalidraw/components/TTDDialog/utils/mermaidAutoFix.test.ts
```typescript
import { describe, expect, it } from "vitest";
import { getMermaidAutoFixCandidates } from "./mermaidAutoFix";
```

## File: packages/excalidraw/components/TTDDialog/utils/mermaidAutoFix.ts
```typescript
import {
  getMermaidErrorLineNumber,
  getMermaidInactiveParticipant,
  isMermaidAutoFixableError,
  isMermaidParseSyntaxError,
} from "./mermaidError";
const getErrorLineIndex = (message: string, sourceText: string) =>
const replaceLineAt = (
  lines: string[],
  index: number,
  transform: (line: string) => string,
) =>
const stripTrailingTokenAfterShape = (line: string) =>
const removeExtraArrowheadAfterEdgeLabel = (line: string) =>
⋮----
// Common typo in generated Mermaid: `-->|label|> Target` (extra `>`).
// Convert it to `-->|label| Target`.
⋮----
const escapeRegExp = (value: string)
const removeLastDeactivateForParticipant = (
  sourceText: string,
  participant: string,
) =>
const removeAllDeactivateForParticipant = (
  sourceText: string,
  participant: string,
) =>
const appendMissingEnds = (sourceText: string) =>
const normalizeSmartQuotes = (sourceText: string)
export const getMermaidAutoFixCandidates = (
  sourceText: string,
  errorMessage: string,
) =>
⋮----
const addCandidate = (candidate: string | null) =>
```

## File: packages/excalidraw/components/TTDDialog/utils/mermaidError.test.ts
```typescript
import { describe, expect, it } from "vitest";
import {
  formatMermaidParseErrorMessage,
  getMermaidErrorLineNumber,
  getMermaidInactiveParticipant,
  getMermaidSyntaxErrorGuidance,
  isMermaidAutoFixableError,
  isMermaidParseSyntaxError,
  isMermaidCaretLine,
} from "./mermaidError";
```

## File: packages/excalidraw/components/TTDDialog/utils/mermaidError.ts
```typescript
export const isMermaidParseSyntaxError = (message: string)
export const isMermaidAutoFixableError = (message: string)
export const isMermaidCaretLine = (line: string)
export const getMermaidInactiveParticipant = (
  message: string,
): string | null =>
const escapeRegExp = (value: string)
const getInactiveParticipantLineNumber = (
  message: string,
  sourceText: string,
): number | null =>
export const getMermaidErrorLineNumber = (
  message: string,
  sourceText?: string,
): number | null =>
const countMatches = (text: string, re: RegExp)
export const getMermaidSyntaxErrorGuidance = (
  message: string,
  sourceText?: string,
):
export const formatMermaidParseErrorMessage = (message: string) =>
```

## File: packages/excalidraw/components/TTDDialog/utils/mermaidValidation.test.ts
```typescript
import { isValidMermaidSyntax } from "./mermaidValidation";
```

## File: packages/excalidraw/components/TTDDialog/utils/mermaidValidation.ts
```typescript
export const isValidMermaidSyntax = (content: string): boolean =>
```

## File: packages/excalidraw/components/TTDDialog/utils/TTDstreamFetch.test.ts
```typescript
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { TTDStreamFetch } from "./TTDStreamFetch";
import type { StreamChunk } from "./TTDStreamFetch";
function createMockStream(chunks: string[]): ReadableStream<Uint8Array>
⋮----
async pull(controller)
⋮----
const createContentChunkData = (delta: string): string =>
const createContentChunk = (delta: string): string =>
const createDataChunk = (data: string): string =>
⋮----
async pull()
```

## File: packages/excalidraw/components/TTDDialog/utils/TTDStreamFetch.ts
```typescript
import { RequestError } from "../../../errors";
import type { LLMMessage, TTTDDialog } from "../types";
interface RateLimitInfo {
  rateLimit?: number;
  rateLimitRemaining?: number;
}
interface StreamingOptions {
  url: string;
  messages: readonly LLMMessage[];
  onChunk?: (chunk: string) => void;
  extractRateLimits?: boolean;
  signal?: AbortSignal;
  onStreamCreated?: () => void;
}
export type StreamChunk =
  | {
      type: "content";
      delta: string;
    }
  | {
      type: "done";
      finishReason: "stop" | "length" | "content_filter" | "tool_calls" | null;
    }
  | {
      type: "error";
      error: {
        message: string;
        status?: number;
      };
    };
function extractRateLimitHeaders(headers: Headers): RateLimitInfo
⋮----
export async function TTDStreamFetch(
  options: StreamingOptions,
): Promise<TTTDDialog.OnTextSubmitRetValue>
```

## File: packages/excalidraw/components/TTDDialog/CodeMirrorEditor.tsx
```typescript
import { useEffect, useRef } from "react";
import {
  Decoration,
  EditorView,
  keymap,
  lineNumbers,
  placeholder as cmPlaceholder,
  drawSelection,
} from "@codemirror/view";
import { Compartment, EditorState, type Extension } from "@codemirror/state";
import {
  defaultKeymap,
  history,
  historyKeymap,
  redo,
} from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import type { Theme } from "@excalidraw/element/types";
import { mermaidLite } from "./mermaid-lang-lite";
export interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
  onKeyboardSubmit?: () => void;
  placeholder?: string;
  theme: Theme;
  errorLine?: number | null;
}
⋮----
const getErrorLineExtension = (
  errorLine: number | null | undefined,
  doc: { line(n: number): { from: number }; lines: number },
): Extension =>
⋮----
doc:
⋮----
const getThemeExtensions = (theme: Theme) =>
const CodeMirrorEditor = ({
  value,
  onChange,
  onKeyboardSubmit,
  placeholder,
  theme,
  errorLine,
}: CodeMirrorEditorProps) =>
```

## File: packages/excalidraw/components/TTDDialog/common.test.ts
```typescript
import { describe, expect, it, vi } from "vitest";
import { convertMermaidToExcalidraw } from "./common";
type ConvertMermaidArgs = Parameters<typeof convertMermaidToExcalidraw>[0];
type ParseMermaidToExcalidraw = Awaited<
  ConvertMermaidArgs["mermaidToExcalidrawLib"]["api"]
>["parseMermaidToExcalidraw"];
const createConvertArgs = (
  mermaidDefinition: string,
  parseMermaidToExcalidraw: ParseMermaidToExcalidraw,
): ConvertMermaidArgs =>
```

## File: packages/excalidraw/components/TTDDialog/common.ts
```typescript
import {
  DEFAULT_EXPORT_PADDING,
  EDITOR_LS_KEYS,
  THEME,
} from "@excalidraw/common";
import { convertToExcalidrawElements } from "@excalidraw/element";
import { exportToCanvas } from "@excalidraw/utils";
import type {
  NonDeletedExcalidrawElement,
  Theme,
} from "@excalidraw/element/types";
import { EditorLocalStorage } from "../../data/EditorLocalStorage";
import type { MermaidToExcalidrawLibProps } from "./types";
import type { AppClassProperties, BinaryFiles } from "../../types";
export const resetPreview = ({
  canvasRef,
  setError,
}: {
  canvasRef: React.RefObject<HTMLDivElement | null>;
setError: (error: Error | null)
export const convertMermaidToExcalidraw = async ({
  canvasRef,
  mermaidToExcalidrawLib,
  mermaidDefinition,
  setError,
  data,
  theme,
}: {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  mermaidToExcalidrawLib: MermaidToExcalidrawLibProps;
  mermaidDefinition: string;
setError: (error: Error | null)
⋮----
// Keep the original error so line/column references stay aligned with
// the user's unmodified input.
⋮----
// Return error so caller can display meaningful error message
⋮----
export const saveMermaidDataToStorage = (mermaidDefinition: string) =>
export const insertToEditor = ({
  app,
  data,
  text,
  shouldSaveMermaidDataToStorage,
}: {
  app: AppClassProperties;
  data: React.MutableRefObject<{
    elements: readonly NonDeletedExcalidrawElement[];
    files: BinaryFiles | null;
  }>;
  text?: string;
  shouldSaveMermaidDataToStorage?: boolean;
}) =>
```

## File: packages/excalidraw/components/TTDDialog/mermaid-lang-lite.ts
```typescript
import { StreamLanguage } from "@codemirror/language";
⋮----
token(stream)
⋮----
export function mermaidLite()
```

## File: packages/excalidraw/components/TTDDialog/MermaidToExcalidraw.tsx
```typescript
import { useState, useRef, useEffect, useDeferredValue } from "react";
import { EDITOR_LS_KEYS, debounce, isDevEnv } from "@excalidraw/common";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { useApp } from "../App";
import { ArrowRightIcon } from "../icons";
import { EditorLocalStorage } from "../../data/EditorLocalStorage";
import { t } from "../../i18n";
import Trans from "../Trans";
import { useUIAppState } from "../../context/ui-appState";
import { TTDDialogInput } from "./TTDDialogInput";
import { TTDDialogOutput } from "./TTDDialogOutput";
import { TTDDialogPanel } from "./TTDDialogPanel";
import { TTDDialogPanels } from "./TTDDialogPanels";
import { TTDDialogSubmitShortcut } from "./TTDDialogSubmitShortcut";
import {
  getMermaidErrorLineNumber,
  isMermaidAutoFixableError,
} from "./utils/mermaidError";
import { getMermaidAutoFixCandidates } from "./utils/mermaidAutoFix";
import {
  convertMermaidToExcalidraw,
  insertToEditor,
  saveMermaidDataToStorage,
  resetPreview,
} from "./common";
⋮----
import type { BinaryFiles } from "../../types";
import type { MermaidToExcalidrawLibProps } from "./types";
⋮----
const getErrorMessage = (error: unknown): string =>
⋮----
const doRender = async () =>
⋮----
// ignore auto-fix probe errors
⋮----
const onInsertToEditor = () =>
const onApplyAutoFix = () =>
⋮----
onKeyboardSubmit=
```

## File: packages/excalidraw/components/TTDDialog/TextToDiagram.tsx
```typescript
import { useRef } from "react";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { useAtom, useAtomValue } from "../../editor-jotai";
import { useApp, useExcalidrawSetAppState } from "../App";
import { useChatAgent } from "./Chat";
import {
  convertMermaidToExcalidraw,
  insertToEditor,
  saveMermaidDataToStorage,
} from "./common";
import { errorAtom, chatHistoryAtom, showPreviewAtom } from "./TTDContext";
import { useTTDChatStorage } from "./useTTDChatStorage";
import { useMermaidRenderer } from "./hooks/useMermaidRenderer";
import { useTextGeneration } from "./hooks/useTextGeneration";
import { useChatManagement } from "./hooks/useChatManagement";
import { TTDChatPanel } from "./Chat/TTDChatPanel";
import { TTDPreviewPanel } from "./TTDPreviewPanel";
import { getLastAssistantMessage } from "./utils/chat";
import type { BinaryFiles } from "../../types";
import type {
  MermaidToExcalidrawLibProps,
  TChat,
  TTDPersistenceAdapter,
  TTTDDialog,
} from "./types";
const TextToDiagramContent = ({
  mermaidToExcalidrawLib,
  onTextSubmit,
  renderWelcomeScreen,
  renderWarning,
  persistenceAdapter,
}: {
  mermaidToExcalidrawLib: MermaidToExcalidrawLibProps;
  onTextSubmit: (
    props: TTTDDialog.OnTextSubmitProps,
)
⋮----
const onViewAsMermaid = () =>
const handleMermaidTabClick = (message: TChat.ChatMessage) =>
const handleInsertMessage = async (message: TChat.ChatMessage) =>
const handleAiRepairClick = async (message: TChat.ChatMessage) =>
const handleRetry = async (message: TChat.ChatMessage) =>
const handleInsertToEditor = () =>
const handleDeleteMessage = (messageId: string) =>
const handlePromptChange = (newPrompt: string) =>
⋮----
export const TextToDiagram = ({
  mermaidToExcalidrawLib,
  onTextSubmit,
  renderWelcomeScreen,
  renderWarning,
  persistenceAdapter,
}: {
  mermaidToExcalidrawLib: MermaidToExcalidrawLibProps;
  onTextSubmit(
    props: TTTDDialog.OnTextSubmitProps,
  ): Promise<TTTDDialog.OnTextSubmitRetValue>;
⋮----
onTextSubmit(
    props: TTTDDialog.OnTextSubmitProps,
  ): Promise<TTTDDialog.OnTextSubmitRetValue>;
```

## File: packages/excalidraw/components/TTDDialog/TTDContext.tsx
```typescript
import { randomId } from "@excalidraw/common";
import { atom } from "../../editor-jotai";
import type { RateLimits, TChat } from "./types";
```

## File: packages/excalidraw/components/TTDDialog/TTDDialog.tsx
```typescript
import { useEffect, useState } from "react";
import { useUIAppState } from "../../context/ui-appState";
import { t } from "../../i18n";
import { useApp } from "../App";
import { Dialog } from "../Dialog";
import { withInternalFallback } from "../hoc/withInternalFallback";
import MermaidToExcalidraw from "./MermaidToExcalidraw";
import TextToDiagram from "./TextToDiagram";
import TTDDialogTabs from "./TTDDialogTabs";
import { TTDDialogTabTriggers } from "./TTDDialogTabTriggers";
import { TTDDialogTabTrigger } from "./TTDDialogTabTrigger";
import { TTDDialogTab } from "./TTDDialogTab";
⋮----
import { TTDWelcomeMessage } from "./TTDWelcomeMessage";
import type {
  MermaidToExcalidrawLibProps,
  TTDPersistenceAdapter,
  TTTDDialog,
} from "./types";
export const TTDDialog = (
  props:
    | {
        onTextSubmit: TTTDDialog.onTextSubmit;
        renderWelcomeScreen?: TTTDDialog.renderWelcomeScreen;
        renderWarning?: TTTDDialog.renderWarning;
        persistenceAdapter: TTDPersistenceAdapter;
      }
    | { __fallback: true },
) =>
⋮----
onTextSubmit(
          props: TTTDDialog.OnTextSubmitProps,
        ): Promise<TTTDDialog.OnTextSubmitRetValue>;
⋮----
const fn = async () =>
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogInput.tsx
```typescript
import { useEffect, useRef, useState } from "react";
import { EVENT, KEYS } from "@excalidraw/common";
import Spinner from "../Spinner";
import { useUIAppState } from "../../context/ui-appState";
import type { ComponentType } from "react";
import type { CodeMirrorEditorProps } from "./CodeMirrorEditor";
interface TTDDialogInputProps {
  input: string;
  placeholder: string;
  onChange: (value: string) => void;
  onKeyboardSubmit?: () => void;
  errorLine?: number | null;
}
type EditorState =
  | { type: "loading" }
  | { type: "ready"; component: ComponentType<CodeMirrorEditorProps> }
  | { type: "fallback" };
⋮----
export const TTDDialogInput = ({
  input,
  placeholder,
  onChange,
  onKeyboardSubmit,
  errorLine,
}: TTDDialogInputProps) =>
⋮----
const handleKeyDown = (event: KeyboardEvent) =>
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogOutput.tsx
```typescript
import clsx from "clsx";
import { Button } from "../Button";
import Spinner from "../Spinner";
import { t } from "../../i18n";
import { alertTriangleIcon } from "../icons";
import {
  formatMermaidParseErrorMessage,
  getMermaidSyntaxErrorGuidance,
  isMermaidCaretLine,
} from "./utils/mermaidError";
interface TTDDialogOutputProps {
  error: Error | null;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  loaded: boolean;
  hideErrorDetails?: boolean;
  sourceText?: string;
  autoFixAvailable?: boolean;
  onApplyAutoFix?: () => void;
}
⋮----
isMermaidCaretLine(line)
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogPanel.tsx
```typescript
import clsx from "clsx";
import { Fragment } from "react";
import { Button } from "../Button";
import Spinner from "../Spinner";
import type { ReactNode } from "react";
export type TTDPanelAction = {
  label: string;
  action?: () => void;
  icon?: ReactNode;
  variant: "button" | "link" | "rateLimit";
  disabled?: boolean;
  className?: string;
};
interface TTDDialogPanelProps {
  label?: string | ReactNode;
  children: ReactNode;
  panelActions?: TTDPanelAction[];
  onTextSubmitInProgess?: boolean;
  renderTopRight?: () => ReactNode;
  renderSubmitShortcut?: () => ReactNode;
  className?: string;
  panelActionJustifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
}
export const TTDDialogPanel = ({
  label,
  children,
  panelActions = [],
  onTextSubmitInProgess,
  renderTopRight,
  renderSubmitShortcut,
  className,
  panelActionJustifyContent = "flex-start",
}: TTDDialogPanelProps) =>
⋮----
const renderPanelAction = (panelAction: TTDPanelAction) =>
⋮----
className=
⋮----
<div className=
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogPanels.tsx
```typescript
import type { ReactNode } from "react";
export const TTDDialogPanels = (
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogSubmitShortcut.tsx
```typescript
import { getShortcutKey } from "../../shortcut";
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogTab.tsx
```typescript
import { Tabs as RadixTabs } from "radix-ui";
export const TTDDialogTab = ({
  tab,
  children,
  ...rest
}: {
  tab: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) =>
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogTabs.tsx
```typescript
import { Tabs as RadixTabs } from "radix-ui";
import { useRef } from "react";
import { isMemberOf } from "@excalidraw/common";
import { useExcalidrawSetAppState } from "../App";
import type { ReactNode } from "react";
⋮----
setAppState({
            openDialog: { name: props.dialog, tab },
          });
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogTabTrigger.tsx
```typescript
import { Tabs as RadixTabs } from "radix-ui";
export const TTDDialogTabTrigger = ({
  children,
  tab,
  onSelect,
  ...rest
}: {
  children: React.ReactNode;
  tab: string;
  onSelect?: React.ReactEventHandler<HTMLButtonElement> | undefined;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, "onSelect">) =>
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogTabTriggers.tsx
```typescript
import { Tabs as RadixTabs } from "radix-ui";
export const TTDDialogTabTriggers = ({
  children,
  ...rest
}:
```

## File: packages/excalidraw/components/TTDDialog/TTDDialogTrigger.tsx
```typescript
import { trackEvent } from "../../analytics";
import { useTunnels } from "../../context/tunnels";
import { useI18n } from "../../i18n";
import { useExcalidrawSetAppState } from "../App";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import { brainIcon } from "../icons";
import type { JSX, ReactNode } from "react";
⋮----
setAppState(
```

## File: packages/excalidraw/components/TTDDialog/TTDPreviewPanel.tsx
```typescript
import { t } from "../../i18n";
import { ArrowRightIcon } from "../icons";
import { TTDDialogPanel } from "./TTDDialogPanel";
import { TTDDialogOutput } from "./TTDDialogOutput";
import type { TTDPanelAction } from "./TTDDialogPanel";
interface TTDPreviewPanelProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  error: Error | null;
  loaded: boolean;
  onInsert: () => void;
  hideErrorDetails?: boolean;
}
export const TTDPreviewPanel = ({
  canvasRef,
  error,
  loaded,
  onInsert,
  hideErrorDetails,
}: TTDPreviewPanelProps) =>
```

## File: packages/excalidraw/components/TTDDialog/TTDWelcomeMessage.tsx
```typescript
import { t } from "../../i18n";
```

## File: packages/excalidraw/components/TTDDialog/types.ts
```typescript
import type { RequestError } from "@excalidraw/excalidraw/errors";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import type { MermaidConfig } from "@excalidraw/mermaid-to-excalidraw";
import type { MermaidToExcalidrawResult } from "@excalidraw/mermaid-to-excalidraw/dist/interfaces";
import type { BinaryFiles } from "../../types";
export type LLMMessage = {
  role: "user" | "assistant";
  content: string;
};
export type MermaidData = {
  elements: readonly NonDeletedExcalidrawElement[];
  files: BinaryFiles | null;
};
export interface RateLimits {
  rateLimit: number;
  rateLimitRemaining: number;
}
⋮----
export type ChatMessage = {
    id: string;
    timestamp: Date;
    isGenerating?: boolean;
    error?: string;
    errorDetails?: string;
    errorType?: "parse" | "network" | "other";
    lastAttemptAt?: number;
    type: "user" | "assistant" | "warning";
    warningType?:
    "messageLimitExceeded" |  "rateLimitExceeded";
    content?: string;
  };
export type ChatHistory = {
    id: string;
    messages: ChatMessage[];
    currentPrompt: string;
  };
⋮----
export interface SavedChat {
  id: string;
  title: string;
  messages: TChat.ChatMessage[];
  currentPrompt: string;
  timestamp: number;
}
export type SavedChats = SavedChat[];
export interface TTDPersistenceAdapter {
  loadChats(): Promise<SavedChats>;
  saveChats(chats: SavedChats): Promise<void>;
}
⋮----
loadChats(): Promise<SavedChats>;
saveChats(chats: SavedChats): Promise<void>;
⋮----
export interface MermaidToExcalidrawLibProps {
  loaded: boolean;
  api: Promise<{
    parseMermaidToExcalidraw: (
      definition: string,
      config?: MermaidConfig,
    ) => Promise<MermaidToExcalidrawResult>;
  }>;
}
⋮----
export type OnGenerate = (opts: {
    prompt: string;
    isRepairFlow?: boolean;
  }) => Promise<void>;
export type OnTextSubmitProps = {
    messages: LLMMessage[];
    onChunk?: (chunk: string) => void;
    onStreamCreated?: () => void;
    signal?: AbortSignal;
  };
export type OnTextSubmitRetValue = {
    rateLimit?: number | null;
    rateLimitRemaining?: number | null;
  } & (
    | { generatedResponse: string; error: null }
    | {
        error: RequestError;
        generatedResponse?: null;
      }
  );
export type onTextSubmit = (
    props: OnTextSubmitProps,
  ) => Promise<OnTextSubmitRetValue>;
export type renderWarning = (
    chatMessage: TChat.ChatMessage,
  ) => React.ReactNode | undefined;
export type renderWelcomeScreen = (props: {
    rateLimits: RateLimits | null;
  }) => React.ReactNode | undefined;
```

## File: packages/excalidraw/components/TTDDialog/useTTDChatStorage.ts
```typescript
import { useCallback, useEffect, useRef } from "react";
import { randomId } from "@excalidraw/common";
import { atom, useAtom } from "../../editor-jotai";
import { chatHistoryAtom } from "./TTDContext";
import type { SavedChat, SavedChats, TTDPersistenceAdapter } from "./types";
interface UseTTDChatStorageProps {
  persistenceAdapter: TTDPersistenceAdapter;
}
interface UseTTDChatStorageReturn {
  savedChats: SavedChats;
  saveCurrentChat: () => Promise<void>;
  deleteChat: (chatId: string) => Promise<SavedChats>;
  restoreChat: (chat: SavedChat) => SavedChat;
  createNewChatId: () => Promise<string>;
}
const generateChatTitle = (firstMessage: string): string =>
⋮----
export const useTTDChatStorage = ({
  persistenceAdapter,
}: UseTTDChatStorageProps): UseTTDChatStorageReturn =>
```

## File: packages/excalidraw/components/welcome-screen/WelcomeScreen.Center.tsx
```typescript
import { actionLoadScene, actionShortcuts } from "../../actions";
import { getShortcutFromShortcutName } from "../../actions/shortcuts";
import { useTunnels } from "../../context/tunnels";
import { useUIAppState } from "../../context/ui-appState";
import { t, useI18n } from "../../i18n";
import { useEditorInterface, useExcalidrawActionManager } from "../App";
import { ExcalidrawLogo } from "../ExcalidrawLogo";
import { HelpIcon, LoadIcon, usersIcon } from "../icons";
import type { JSX } from "react";
⋮----
const WelcomeScreenMenuItem = ({
  onSelect,
  children,
  icon,
  shortcut,
  className = "",
  ...props
}: {
onSelect: ()
⋮----
const WelcomeScreenMenuItemLink = ({
  children,
  href,
  icon,
  shortcut,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  href: string;
  icon?: JSX.Element;
  shortcut?: string | null;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
⋮----
const Logo = (
⋮----
const Heading = (
⋮----
onSelect=
```

## File: packages/excalidraw/components/welcome-screen/WelcomeScreen.Hints.tsx
```typescript
import { useTunnels } from "../../context/tunnels";
import { t } from "../../i18n";
import {
  WelcomeScreenHelpArrow,
  WelcomeScreenMenuArrow,
  WelcomeScreenTopToolbarArrow,
} from "../icons";
const MenuHint = (
⋮----
const ToolbarHint = (
⋮----
const HelpHint = (
```

## File: packages/excalidraw/components/welcome-screen/WelcomeScreen.tsx
```typescript
import { Center } from "./WelcomeScreen.Center";
import { MenuHint, ToolbarHint, HelpHint } from "./WelcomeScreen.Hints";
```

## File: packages/excalidraw/components/Actions.tsx
```typescript
import clsx from "clsx";
import { useRef, useState } from "react";
import { Popover } from "radix-ui";
import {
  CLASSES,
  KEYS,
  capitalizeString,
  isTransparent,
} from "@excalidraw/common";
import {
  shouldAllowVerticalAlign,
  suppportsHorizontalAlign,
  hasBoundTextElement,
  isElbowArrow,
  isImageElement,
  isLinearElement,
  isTextElement,
  isArrowElement,
  hasStrokeColor,
  toolIsArrow,
} from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawElementType,
  NonDeletedElementsMap,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import { actionToggleZenMode } from "../actions";
import { alignActionsPredicate } from "../actions/actionAlign";
import { trackEvent } from "../analytics";
import { useTunnels } from "../context/tunnels";
import { t } from "../i18n";
import {
  canChangeRoundness,
  canHaveArrowheads,
  getTargetElements,
  hasBackground,
  hasStrokeStyle,
  hasStrokeWidth,
} from "../scene";
import { getFormValue } from "../actions/actionProperties";
import { useTextEditorFocus } from "../hooks/useTextEditorFocus";
import { actionToggleViewMode } from "../actions/actionToggleViewMode";
import { getToolbarTools } from "./shapes";
⋮----
import {
  useEditorInterface,
  useStylesPanelMode,
  useExcalidrawContainer,
} from "./App";
import Stack from "./Stack";
import { ToolButton } from "./ToolButton";
import { ToolPopover } from "./ToolPopover";
import { Tooltip } from "./Tooltip";
import DropdownMenu from "./dropdownMenu/DropdownMenu";
import { PropertiesPopover } from "./PropertiesPopover";
import {
  EmbedIcon,
  extraToolsIcon,
  frameToolIcon,
  mermaidLogoIcon,
  laserPointerToolIcon,
  MagicIcon,
  LassoIcon,
  sharpArrowIcon,
  roundArrowIcon,
  elbowArrowIcon,
  TextSizeIcon,
  adjustmentsIcon,
  DotsHorizontalIcon,
  SelectionIcon,
  pencilIcon,
} from "./icons";
import { Island } from "./Island";
import type {
  AppClassProperties,
  AppProps,
  UIAppState,
  Zoom,
  AppState,
} from "../types";
import type { ActionManager } from "../actions/manager";
⋮----
export const canChangeStrokeColor = (
  appState: UIAppState,
  targetElements: ExcalidrawElement[],
) =>
export const canChangeBackgroundColor = (
  appState: UIAppState,
  targetElements: ExcalidrawElement[],
) =>
⋮----

⋮----
<>
⋮----
if (open)
setAppState(
⋮----
if (appState.editingTextElement)
saveCaretPosition();
⋮----
restoreCaretPosition();
⋮----
<div className=
⋮----
aria-label=
⋮----
onPointerDown=
⋮----
if (app.state.activeTool.type !== value)
⋮----
className=
⋮----
setIsExtraToolsMenuOpen(!isExtraToolsMenuOpen);
⋮----
title=
⋮----
onSelect=
⋮----
<Tooltip label=
⋮----
onClick=
```

## File: packages/excalidraw/components/ActiveConfirmDialog.tsx
```typescript
import { actionClearCanvas } from "../actions";
import { atom, useAtom } from "../editor-jotai";
import { t } from "../i18n";
import { useExcalidrawActionManager } from "./App";
import ConfirmDialog from "./ConfirmDialog";
⋮----
actionManager.executeAction(actionClearCanvas);
setActiveConfirmDialog(null);
⋮----
onCancel=
```

## File: packages/excalidraw/components/App.tsx
```typescript
import clsx from "clsx";
import throttle from "lodash.throttle";
import React, { useContext } from "react";
import { flushSync } from "react-dom";
import rough from "roughjs/bin/rough";
import { nanoid } from "nanoid";
import {
  clamp,
  pointFrom,
  pointDistance,
  vector,
  pointRotateRads,
  vectorFromPoint,
  vectorSubtract,
  vectorDot,
  vectorNormalize,
} from "@excalidraw/math";
import {
  COLOR_PALETTE,
  CODES,
  shouldResizeFromCenter,
  shouldMaintainAspectRatio,
  shouldRotateWithDiscreteAngle,
  isArrowKey,
  KEYS,
  APP_NAME,
  CURSOR_TYPE,
  DEFAULT_MAX_IMAGE_WIDTH_OR_HEIGHT,
  DEFAULT_VERTICAL_ALIGN,
  DRAGGING_THRESHOLD,
  ELEMENT_SHIFT_TRANSLATE_AMOUNT,
  ELEMENT_TRANSLATE_AMOUNT,
  EVENT,
  FRAME_STYLE,
  IMAGE_MIME_TYPES,
  IMAGE_RENDER_TIMEOUT,
  LINE_CONFIRM_THRESHOLD,
  MAX_ALLOWED_FILE_BYTES,
  MIME_TYPES,
  MQ_RIGHT_SIDEBAR_MIN_WIDTH,
  POINTER_BUTTON,
  ROUNDNESS,
  SCROLL_TIMEOUT,
  TAP_TWICE_TIMEOUT,
  TEXT_TO_CENTER_SNAP_THRESHOLD,
  THEME,
  TOUCH_CTX_MENU_TIMEOUT,
  VERTICAL_ALIGN,
  YOUTUBE_STATES,
  ZOOM_STEP,
  POINTER_EVENTS,
  TOOL_TYPE,
  supportsResizeObserver,
  DEFAULT_COLLISION_THRESHOLD,
  DEFAULT_TEXT_ALIGN,
  ARROW_TYPE,
  DEFAULT_REDUCED_GLOBAL_ALPHA,
  isLocalLink,
  normalizeLink,
  toValidURL,
  getGridPoint,
  getLineHeight,
  debounce,
  distance,
  getFontString,
  getNearestScrollableContainer,
  isInputLike,
  isToolIcon,
  isWritableElement,
  sceneCoordsToViewportCoords,
  tupleToCoors,
  viewportCoordsToSceneCoords,
  wrapEvent,
  updateObject,
  updateActiveTool,
  isTransparent,
  easeToValuesRAF,
  muteFSAbortError,
  isTestEnv,
  isDevEnv,
  easeOut,
  updateStable,
  addEventListener,
  normalizeEOL,
  getDateTime,
  isShallowEqual,
  arrayToMap,
  applyDarkModeFilter,
  AppEventBus,
  type EXPORT_IMAGE_TYPES,
  randomInteger,
  CLASSES,
  Emitter,
  MINIMUM_ARROW_SIZE,
  DOUBLE_TAP_POSITION_THRESHOLD,
  BIND_MODE_TIMEOUT,
  invariant,
  getFeatureFlag,
  createUserAgentDescriptor,
  getFormFactor,
  deriveStylesPanelMode,
  isIOS,
  isBrave,
  isSafari,
  type EditorInterface,
  type StylesPanelMode,
  loadDesktopUIModePreference,
  setDesktopUIMode,
  isSelectionLikeTool,
  oneOf,
} from "@excalidraw/common";
import {
  getObservedAppState,
  getCommonBounds,
  getElementAbsoluteCoords,
  bindOrUnbindBindingElements,
  fixBindingsAfterDeletion,
  getHoveredElementForBinding,
  isBindingEnabled,
  updateBoundElements,
  LinearElementEditor,
  newElementWith,
  newFrameElement,
  newFreeDrawElement,
  newEmbeddableElement,
  newMagicFrameElement,
  newIframeElement,
  newArrowElement,
  newElement,
  newImageElement,
  newLinearElement,
  newTextElement,
  refreshTextDimensions,
  deepCopyElement,
  duplicateElements,
  hasBoundTextElement,
  isArrowElement,
  isBindingElement,
  isBindingElementType,
  isBoundToContainer,
  isFrameLikeElement,
  isImageElement,
  isEmbeddableElement,
  isInitializedImageElement,
  isLinearElement,
  isLinearElementType,
  isUsingAdaptiveRadius,
  isIframeElement,
  isIframeLikeElement,
  isMagicFrameElement,
  isTextBindableContainer,
  isElbowArrow,
  isFlowchartNodeElement,
  isBindableElement,
  isTextElement,
  getNormalizedDimensions,
  isElementCompletelyInViewport,
  isElementInViewport,
  isInvisiblySmallElement,
  getCornerRadius,
  isPathALoop,
  createSrcDoc,
  embeddableURLValidator,
  maybeParseEmbedSrc,
  getEmbedLink,
  getInitializedImageElements,
  normalizeSVG,
  updateImageCache as _updateImageCache,
  getBoundTextElement,
  getContainerCenter,
  getContainerElement,
  isValidTextContainer,
  redrawTextBoundingBox,
  hasBoundingBox,
  getFrameChildren,
  isCursorInFrame,
  addElementsToFrame,
  replaceAllElementsInFrame,
  removeElementsFromFrame,
  getElementsInResizingFrame,
  getElementsInNewFrame,
  getContainingFrame,
  elementOverlapsWithFrame,
  updateFrameMembershipOfSelectedElements,
  isElementInFrame,
  getFrameLikeTitle,
  getElementsOverlappingFrame,
  filterElementsEligibleAsFrameChildren,
  hitElementBoundText,
  hitElementBoundingBoxOnly,
  hitElementItself,
  getVisibleSceneBounds,
  FlowChartCreator,
  FlowChartNavigator,
  getLinkDirectionFromKey,
  cropElement,
  wrapText,
  isElementLink,
  parseElementLinkFromURL,
  isMeasureTextSupported,
  normalizeText,
  measureText,
  getLineHeightInPx,
  getApproxMinLineWidth,
  getApproxMinLineHeight,
  getMinTextElementWidth,
  ShapeCache,
  getRenderOpacity,
  editGroupForSelectedElement,
  getElementsInGroup,
  getSelectedGroupIdForElement,
  getSelectedGroupIds,
  isElementInGroup,
  isSelectedViaGroup,
  selectGroupsForSelectedElements,
  syncInvalidIndices,
  syncMovedIndices,
  excludeElementsInFramesFromSelection,
  getSelectionStateForElements,
  makeNextSelectedElementIds,
  getResizeOffsetXY,
  getResizeArrowDirection,
  transformElements,
  getCursorForResizingElement,
  getElementWithTransformHandleType,
  getTransformHandleTypeFromCoords,
  dragNewElement,
  dragSelectedElements,
  getDragOffsetXY,
  isNonDeletedElement,
  Scene,
  Store,
  CaptureUpdateAction,
  type ElementUpdate,
  hitElementBoundingBox,
  isLineElement,
  isSimpleArrow,
  StoreDelta,
  type ApplyToOptions,
  positionElementsOnGrid,
  calculateFixedPointForNonElbowArrowBinding,
  bindOrUnbindBindingElement,
  mutateElement,
  getElementBounds,
  doBoundsIntersect,
  isPointInElement,
  maxBindingDistance_simple,
  convertToExcalidrawElements,
  type ExcalidrawElementSkeleton,
  getSnapOutlineMidPoint,
  handleFocusPointDrag,
  handleFocusPointHover,
  handleFocusPointPointerDown,
  handleFocusPointPointerUp,
  maybeHandleArrowPointlikeDrag,
  getUncroppedWidthAndHeight,
  getActiveTextElement,
} from "@excalidraw/element";
import type { GlobalPoint, LocalPoint, Radians } from "@excalidraw/math";
import type {
  ExcalidrawElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawGenericElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
  NonDeleted,
  InitializedExcalidrawImageElement,
  ExcalidrawImageElement,
  FileId,
  NonDeletedExcalidrawElement,
  ExcalidrawTextContainer,
  ExcalidrawFrameLikeElement,
  ExcalidrawMagicFrameElement,
  ExcalidrawIframeLikeElement,
  IframeData,
  ExcalidrawIframeElement,
  ExcalidrawEmbeddableElement,
  Ordered,
  MagicGenerationData,
  ExcalidrawArrowElement,
  ExcalidrawElbowArrowElement,
  SceneElementsMap,
  ExcalidrawBindableElement,
} from "@excalidraw/element/types";
import type { Mutable, ValueOf } from "@excalidraw/common/utility-types";
import {
  actionAddToLibrary,
  actionBringForward,
  actionBringToFront,
  actionCopy,
  actionCopyAsPng,
  actionCopyAsSvg,
  copyText,
  actionCopyStyles,
  actionCut,
  actionDeleteSelected,
  actionDuplicateSelection,
  actionFinalize,
  actionFlipHorizontal,
  actionFlipVertical,
  actionGroup,
  actionPasteStyles,
  actionSelectAll,
  actionSendBackward,
  actionSendToBack,
  actionToggleGridMode,
  actionToggleStats,
  actionToggleZenMode,
  actionUnbindText,
  actionBindText,
  actionUngroup,
  actionLink,
  actionToggleElementLock,
  actionToggleLinearEditor,
  actionToggleObjectsSnapMode,
  actionToggleArrowBinding,
  actionToggleMidpointSnapping,
  actionToggleCropEditor,
} from "../actions";
import { actionWrapTextInContainer } from "../actions/actionBoundText";
import { actionToggleHandTool, zoomToFit } from "../actions/actionCanvas";
import { actionPaste } from "../actions/actionClipboard";
import { actionCopyElementLink } from "../actions/actionElementLink";
import { actionUnlockAllElements } from "../actions/actionElementLock";
import {
  actionRemoveAllElementsFromFrame,
  actionSelectAllElementsInFrame,
  actionWrapSelectionInFrame,
} from "../actions/actionFrame";
import { createRedoAction, createUndoAction } from "../actions/actionHistory";
import { actionTextAutoResize } from "../actions/actionTextAutoResize";
import { actionToggleViewMode } from "../actions/actionToggleViewMode";
import { ActionManager } from "../actions/manager";
import { actions } from "../actions/register";
import { getShortcutFromShortcutName } from "../actions/shortcuts";
import { trackEvent } from "../analytics";
import { AnimationFrameHandler } from "../animation-frame-handler";
import {
  getDefaultAppState,
  isEraserActive,
  isHandToolActive,
} from "../appState";
import {
  copyTextToSystemClipboard,
  parseClipboard,
  parseDataTransferEvent,
  type ParsedDataTransferFile,
} from "../clipboard";
import { exportCanvas, loadFromBlob } from "../data";
import Library, { distributeLibraryItemsOnSquareGrid } from "../data/library";
import { restoreAppState, restoreElements } from "../data/restore";
import { getCenter, getDistance } from "../gesture";
import { History } from "../history";
import { defaultLang, getLanguage, languages, setLanguage, t } from "../i18n";
import {
  calculateScrollCenter,
  getElementsWithinSelection,
  getNormalizedZoom,
  getSelectedElements,
  hasBackground,
  isSomeElementSelected,
} from "../scene";
import { getStateForZoom } from "../scene/zoom";
import {
  dataURLToString,
  generateIdFromFile,
  getDataURL,
  getDataURL_sync,
  ImageURLToFile,
  isImageFileHandle,
  isSupportedImageFile,
  loadSceneOrLibraryFromBlob,
  normalizeFile,
  parseLibraryJSON,
  resizeImageFile,
  SVGStringToFile,
} from "../data/blob";
import { fileOpen } from "../data/filesystem";
import {
  showHyperlinkTooltip,
  hideHyperlinkToolip,
  Hyperlink,
} from "../components/hyperlink/Hyperlink";
import { Fonts } from "../fonts";
import { editorJotaiStore, type WritableAtom } from "../editor-jotai";
import { ImageSceneDataError } from "../errors";
import {
  getSnapLinesAtPointer,
  snapDraggedElements,
  isActiveToolNonLinearSnappable,
  snapNewElement,
  snapResizingElements,
  isSnappingEnabled,
  getVisibleGaps,
  getReferenceSnapPoints,
  SnapCache,
  isGridModeEnabled,
} from "../snapping";
import { Renderer } from "../scene/Renderer";
import {
  setEraserCursor,
  setCursor,
  resetCursor,
  setCursorForShape,
} from "../cursor";
import { ElementCanvasButtons } from "../components/ElementCanvasButtons";
import { LaserTrails } from "../laser-trails";
import { withBatchedUpdates, withBatchedUpdatesThrottled } from "../reactUtils";
import { isPointHittingTextAutoResizeHandle } from "../textAutoResizeHandle";
import { textWysiwyg } from "../wysiwyg/textWysiwyg";
import { isOverScrollBars } from "../scene/scrollbars";
import { isMaybeMermaidDefinition } from "../mermaid";
import { LassoTrail } from "../lasso";
import { EraserTrail } from "../eraser";
import { getShortcutKey } from "../shortcut";
import { tryParseSpreadsheet } from "../charts";
import ConvertElementTypePopup, {
  getConversionTypeFromElements,
  convertElementTypePopupAtom,
  convertElementTypes,
} from "./ConvertElementTypePopup";
import { activeConfirmDialogAtom } from "./ActiveConfirmDialog";
import BraveMeasureTextError from "./BraveMeasureTextError";
import { ContextMenu, CONTEXT_MENU_SEPARATOR } from "./ContextMenu";
import { activeEyeDropperAtom } from "./EyeDropper";
import FollowMode from "./FollowMode/FollowMode";
import LayerUI from "./LayerUI";
import { ElementCanvasButton } from "./MagicButton";
import { SVGLayer } from "./SVGLayer";
import { searchItemInFocusAtom } from "./SearchMenu";
import { isSidebarDockedAtom } from "./Sidebar/Sidebar";
import { StaticCanvas, InteractiveCanvas } from "./canvases";
import NewElementCanvas from "./canvases/NewElementCanvas";
import { isPointHittingLink } from "./hyperlink/helpers";
import { MagicIcon, copyIcon, fullscreenIcon } from "./icons";
import { AppStateObserver, type OnStateChange } from "./AppStateObserver";
import { findShapeByKey } from "./shapes";
import UnlockPopup from "./UnlockPopup";
import type { ExcalidrawLibraryIds } from "../data/types";
import type {
  RenderInteractiveSceneCallback,
  ScrollBars,
} from "../scene/types";
import type { ClipboardData, PastedMixedContent } from "../clipboard";
import type { ExportedElements } from "../data";
import type { ContextMenuItems } from "./ContextMenu";
import type {
  AppClassProperties,
  AppProps,
  AppState,
  BinaryFileData,
  ExcalidrawImperativeAPI,
  BinaryFiles,
  Gesture,
  GestureEvent,
  LibraryItems,
  PointerDownState,
  SceneData,
  FrameNameBoundsCache,
  SidebarName,
  SidebarTabName,
  KeyboardModifiersObject,
  CollaboratorPointer,
  ToolType,
  OnUserFollowedPayload,
  UnsubscribeCallback,
  EmbedsValidationStatus,
  ElementsPendingErasure,
  ExcalidrawImperativeAPIEventMap,
  GenerateDiagramToCode,
  NullableGridSize,
  Offsets,
} from "../types";
import type { RoughCanvas } from "roughjs/bin/canvas";
import type { Action, ActionResult } from "../actions/types";
⋮----
export const useApp = ()
export const useAppProps = ()
export const useEditorInterface = ()
export const useStylesPanelMode = ()
export const useExcalidrawContainer = ()
export const useExcalidrawElements = ()
export const useExcalidrawAppState = ()
export const useExcalidrawSetAppState = ()
export const useExcalidrawActionManager = ()
export const useExcalidrawAPI = ()
⋮----
private createExcalidrawAPI(): ExcalidrawImperativeAPI
constructor(props: AppProps)
⋮----
private onWindowMessage(event: MessageEvent)
private handleSkipBindMode()
private resetDelayedBindMode()
⋮----
private handleDelayedBindModeChange(
    arrow: ExcalidrawArrowElement,
    hoveredElement: NonDeletedExcalidrawElement | null,
)
⋮----
const effector = () =>
⋮----
private cacheEmbeddableRef(
    element: ExcalidrawIframeLikeElement,
    ref: HTMLIFrameElement | null,
)
⋮----
const getTextCreationGridCoordinate = (coordinate: number) =>
⋮----
private getHTMLIFrameElement(
    element: ExcalidrawIframeLikeElement,
): HTMLIFrameElement | undefined
⋮----
private handleIframeLikeCenterClick(): boolean
⋮----
private isIframeLikeElementCenter(
    el: ExcalidrawIframeLikeElement | null,
    event: React.PointerEvent<HTMLElement> | PointerEvent,
    sceneX: number,
    sceneY: number,
)
⋮----
// https://stackoverflow.com/q/18470015
⋮----
if (frame)
⋮----
if (!this.state.frameRendering.enabled || !this.state.frameRendering.name)
⋮----
id=
⋮----
onPointerDown=
⋮----
this.setState({
              editingFrame: f.id,
            });
⋮----
title=
⋮----
isIframeElement(firstSelectedElement) &&
⋮----
public getSceneElementsIncludingDeleted = () =>
public getSceneElementsMapIncludingDeleted = () =>
public getSceneElements = () =>
public onInsertElements = (elements: readonly ExcalidrawElement[]) =>
public onExportImage = async (
    type: keyof typeof EXPORT_IMAGE_TYPES,
    elements: ExportedElements,
    opts: { exportingFrame: ExcalidrawFrameLikeElement | null },
) =>
⋮----
if (data.status === "pending")
⋮----
if ("launchQueue" in window && "LaunchParams" in window)
⋮----
private getFormFactor = (editorWidth: number, editorHeight: number) =>
⋮----
// allow host app to control formFactor and desktopUIMode via props
⋮----
private setDesktopUIMode = (mode: EditorInterface["desktopUIMode"]) =>
⋮----
if (
        (key.startsWith("get") ||
          key === "onStateChange" ||
          key === "onEvent") &&
        typeof this.api[key] === "function"
)
⋮----
/** generally invoked only if fullscreen was invoked programmatically */
⋮----
// points to the iframe element we fullscreened
⋮----
if (scrollBars)
⋮----
if (isIOS)
⋮----
if (didTapTwice && event.touches.length === 1 && firstTapPosition)
⋮----
removePointer = (event: React.PointerEvent<HTMLElement> | PointerEvent) =>
⋮----
if (this.state.userToFollow)
⋮----
if (nextFiles[fileData.id])
⋮----
if (force === true)
⋮----
get(ev: any, prop)
⋮----
return (
      this.props.UIOptions.tools?.[
        tool as Extract<T, keyof AppProps["UIOptions"]["tools"]>
      ] !== false
    );
⋮----
if (!this.isToolSupported(tool.type))
⋮----
setCursor(this.interactiveCanvas, cursor);
⋮----
public getName = () =>
⋮----
if (selectedElements.length !== 1)
⋮----
private isHittingTextAutoResizeHandle = (
    selectedElements: NonDeleted<ExcalidrawElement>[],
    point: Readonly<{ x: number; y: number }>,
): boolean =>
⋮----
if (elements[index].isDeleted)
⋮----
if (this.state.croppingElementId)
⋮----
if (
      this.state.editingTextElement ||
      !this.shouldHandleBrowserCanvasDoubleClick(event.type)
)
⋮----
if (hitElementMightBeLocked && hitElementMightBeLocked.locked)
⋮----
if (
            !isElbowArrow(element) ||
            !(element.startBinding || element.endBinding)
)
⋮----
if (
          !isElbowArrow(element) ||
          !(element.startBinding || element.endBinding)
)
⋮----
setCursor(this.interactiveCanvas, CURSOR_TYPE.POINTER);
⋮----
const onPointerUp = () =>
⋮----
if (getFeatureFlag("COMPLEX_BINDINGS"))
⋮----
public handleCanvasPanUsingWheelOrSpaceDrag = (
    event: React.PointerEvent<HTMLElement> | MouseEvent,
): boolean =>
⋮----
const preventNextPaste = (event: ClipboardEvent) =>
const enableNextPaste = () =>
⋮----
(lastPointerUp = () =>
⋮----
private clearSelectionIfNotUsingSelection = (): void =>
⋮----
if (
            elementWithTransformHandleType.transformHandleType === "rotation"
)
⋮----
if (selectedElements.length < 2)
⋮----
bindOrUnbindBindingElement(
          element,
          new Map([
            [
              0,
              {
                point: pointFrom<LocalPoint>(0, 0),
                isDragging: false,
              },
            ],
          ]),
          point[0],
          point[1],
          this.scene,
          this.state,
          {
            newArrow: true,
            altKey: event.altKey,
            initialBinding: true,
            angleLocked: shouldRotateWithDiscreteAngle(event.nativeEvent),
          },
        );
⋮----
return withBatchedUpdates((event: KeyboardEvent) =>
⋮----
return withBatchedUpdatesThrottled((event: PointerEvent) =>
⋮----
const updateGroupIdsAfterEditingGroup = (
            elements: ExcalidrawElement[],
) =>
⋮----
if (!isSupportedImageFile(imageFile))
⋮----
} catch (error: any)
⋮----
if (canvas !== null)
⋮----
private insertImages = async (
    imageFiles: File[],
    sceneX: number,
    sceneY: number,
) =>
⋮----
dragNewElement({
        newElement,
        elementType: this.state.activeTool.type,
        originX: pointerDownState.originInGrid.x,
        originY: pointerDownState.originInGrid.y,
        x: gridX,
        y: gridY,
        width: distance(pointerDownState.originInGrid.x, gridX),
        height: distance(pointerDownState.originInGrid.y, gridY),
        shouldMaintainAspectRatio: isImageElement(newElement)
          ? !shouldMaintainAspectRatio(event)
          : shouldMaintainAspectRatio(event),
        shouldResizeFromCenter: shouldResizeFromCenter(event),
        zoom: this.state.zoom.value,
        scene: this.scene,
        widthAspectRatio: aspectRatio,
        originOffset: this.state.originSnapOffset,
        informMutation,
      });
⋮----
.get(this.state.croppingElementId);
⋮----
if (this.state.viewModeEnabled)
⋮----
if (container)
⋮----
if (!x || !y)
⋮----
if (this.excalidrawContainerRef?.current)
⋮----
export const createTestHook = () =>
⋮----
get()
set(elements: ExcalidrawElement[])
```

## File: packages/excalidraw/components/AppStateObserver.ts
```typescript
import type { AppState, UnsubscribeCallback } from "../types";
type StateChangeSelector =
  | keyof AppState
  | (keyof AppState)[]
  | ((appState: AppState) => unknown);
type StateChangePredicateOptions = {
  predicate: (appState: AppState) => boolean;
  callback?: (appState: AppState) => void;
  once?: boolean;
};
type StateChangeArg = StateChangeSelector | StateChangePredicateOptions;
type StateChangeListener = {
  predicate: (appState: AppState, prevState: AppState) => boolean;
  getValue: (appState: AppState) => unknown;
  callback: (value: any, appState: AppState) => void;
  once: boolean;
};
type NormalizedStateChange = {
  predicate: StateChangeListener["predicate"];
  getValue: StateChangeListener["getValue"];
  callback?: StateChangeListener["callback"];
  once: boolean;
  matchesImmediately: boolean;
};
export type OnStateChange = {
  <K extends keyof AppState>(
    prop: K,
    callback: (value: AppState[K], appState: AppState) => void,
    opts?: { once: boolean },
  ): UnsubscribeCallback;
  <K extends keyof AppState>(prop: K): Promise<AppState[K]>;
  (
    prop: (keyof AppState)[],
    callback: (appState: AppState, appState2: AppState) => void,
    opts?: { once: boolean },
  ): UnsubscribeCallback;
  (prop: (keyof AppState)[]): Promise<AppState>;
  <T>(
    prop: (appState: AppState) => T,
    callback: (value: T, appState: AppState) => void,
    opts?: { once: boolean },
  ): UnsubscribeCallback;
  <T>(prop: (appState: AppState) => T): Promise<T>;
  (opts: {
    predicate: (appState: AppState) => boolean;
    callback: (appState: AppState) => void;
    once?: boolean;
  }): UnsubscribeCallback;
  (opts: { predicate: (appState: AppState) => boolean }): Promise<AppState>;
  (
    selector: StateChangeSelector,
    callback: (value: any, appState: AppState) => void,
  ): any;
};
export class AppStateObserver
⋮----
constructor(private readonly getState: () => AppState)
private isStateChangePredicateOptions(
    propOrOpts: StateChangeArg,
): propOrOpts is StateChangePredicateOptions
private subscribe(listener: StateChangeListener): UnsubscribeCallback
private normalize(
    propOrOpts: StateChangeArg,
    callback?: (value: any, appState: AppState) => void,
    opts?: { once: boolean },
): NormalizedStateChange
⋮----
getValue = (appState: AppState)
⋮----
predicate = (appState: AppState, prevState: AppState)
⋮----
public flush(prevState: AppState)
public clear()
```

## File: packages/excalidraw/components/Avatar.tsx
```typescript
import clsx from "clsx";
import React, { useState } from "react";
import { getNameInitial } from "../clients";
⋮----
type AvatarProps = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  color: string;
  name: string;
  src?: string;
  className?: string;
};
⋮----
<div className=
```

## File: packages/excalidraw/components/BraveMeasureTextError.tsx
```typescript
import Trans from "./Trans";
```

## File: packages/excalidraw/components/Button.tsx
```typescript
import clsx from "clsx";
import React from "react";
import { composeEventHandlers } from "@excalidraw/common";
⋮----
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type?: "button" | "submit" | "reset";
  onSelect: () => any;
  selected?: boolean;
  children: React.ReactNode;
  className?: string;
}
⋮----
className=
```

## File: packages/excalidraw/components/ButtonIcon.tsx
```typescript
import clsx from "clsx";
import { forwardRef } from "react";
⋮----
import type { JSX } from "react";
interface ButtonIconProps {
  icon: JSX.Element;
  title: string;
  className?: string;
  testId?: string;
  active?: boolean;
  standalone?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
}
```

## File: packages/excalidraw/components/ButtonIconCycle.tsx
```typescript
import clsx from "clsx";
import type { JSX } from "react";
export const ButtonIconCycle = <T extends any>({
  options,
  value,
  onChange,
  group,
}: {
  options: { value: T; text: string; icon: JSX.Element }[];
  value: T | null;
onChange: (value: T)
⋮----
const cycle = () =>
```

## File: packages/excalidraw/components/ButtonSeparator.tsx
```typescript
export const ButtonSeparator = () => (
  <div
    style={{
      width: 1,
      height: "1rem",
      backgroundColor: "var(--default-border-color)",
      margin: "0 auto",
    }}
  />
);
```

## File: packages/excalidraw/components/Card.tsx
```typescript
export const Card: React.FC<{
  color: "primary" | "lime" | "pink";
  children?: React.ReactNode;
}> = (
```

## File: packages/excalidraw/components/CheckboxItem.tsx
```typescript
import clsx from "clsx";
import React from "react";
import { checkIcon } from "./icons";
⋮----
className=
⋮----
onChange(!checked, event);
```

## File: packages/excalidraw/components/ConfirmDialog.tsx
```typescript
import { flushSync } from "react-dom";
import { useSetAtom } from "../editor-jotai";
import { t } from "../i18n";
import { Dialog } from "./Dialog";
import DialogActionButton from "./DialogActionButton";
import { isLibraryMenuOpenAtom } from "./LibraryMenu";
import { useExcalidrawContainer, useExcalidrawSetAppState } from "./App";
⋮----
import type { DialogProps } from "./Dialog";
interface Props extends Omit<DialogProps, "onCloseRequest"> {
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}
const ConfirmDialog = (props: Props) =>
```

## File: packages/excalidraw/components/ContextMenu.tsx
```typescript
import clsx from "clsx";
import React from "react";
import { getShortcutFromShortcutName } from "../actions/shortcuts";
import { t } from "../i18n";
import { useExcalidrawAppState, useExcalidrawElements } from "./App";
import { Popover } from "./Popover";
⋮----
import type { ActionManager } from "../actions/manager";
import type { ShortcutName } from "../actions/shortcuts";
import type { Action } from "../actions/types";
import type { TranslationKeys } from "../i18n";
export type ContextMenuItem = typeof CONTEXT_MENU_SEPARATOR | Action;
export type ContextMenuItems = (ContextMenuItem | false | null | undefined)[];
type ContextMenuProps = {
  actionManager: ActionManager;
  items: ContextMenuItems;
  top: number;
  left: number;
  onClose: (callback?: () => void) => void;
};
⋮----
onClose();
⋮----
onClose(() =>
```

## File: packages/excalidraw/components/ConvertElementTypePopup.tsx
```typescript
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  bumpVersion,
  getLinearElementSubType,
  mutateElement,
  updateElbowArrowPoints,
} from "@excalidraw/element";
import { pointFrom, pointRotateRads, type LocalPoint } from "@excalidraw/math";
import {
  hasBoundTextElement,
  isArrowBoundToElement,
  isArrowElement,
  isElbowArrow,
  isLinearElement,
  isUsingAdaptiveRadius,
} from "@excalidraw/element";
import {
  getCommonBoundingBox,
  getElementAbsoluteCoords,
} from "@excalidraw/element";
import {
  getBoundTextElement,
  getBoundTextMaxHeight,
  getBoundTextMaxWidth,
  redrawTextBoundingBox,
} from "@excalidraw/element";
import { wrapText } from "@excalidraw/element";
import {
  assertNever,
  CLASSES,
  getFontString,
  isProdEnv,
  mapFind,
  reduceToCommonValue,
  ROUNDNESS,
  sceneCoordsToViewportCoords,
  updateActiveTool,
} from "@excalidraw/common";
import { measureText } from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import {
  newArrowElement,
  newElement,
  newLinearElement,
} from "@excalidraw/element";
import { ShapeCache } from "@excalidraw/element";
import { updateBindings } from "@excalidraw/element";
import type {
  ConvertibleGenericTypes,
  ConvertibleLinearTypes,
  ConvertibleTypes,
  ExcalidrawDiamondElement,
  ExcalidrawElement,
  ExcalidrawEllipseElement,
  ExcalidrawLinearElement,
  ExcalidrawRectangleElement,
  ExcalidrawSelectionElement,
  ExcalidrawTextContainer,
  ExcalidrawTextElementWithContainer,
  FixedSegment,
} from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import { trackEvent } from "../analytics";
import { atom } from "../editor-jotai";
⋮----
import { ToolButton } from "./ToolButton";
import {
  DiamondIcon,
  elbowArrowIcon,
  EllipseIcon,
  LineIcon,
  RectangleIcon,
  roundArrowIcon,
  sharpArrowIcon,
} from "./icons";
import type App from "./App";
import type { AppClassProperties } from "../types";
⋮----
type ExcalidrawConvertibleElement =
  | ExcalidrawRectangleElement
  | ExcalidrawDiamondElement
  | ExcalidrawEllipseElement
  | ExcalidrawLinearElement;
⋮----
const isConvertibleGenericType = (
  elementType: string,
): elementType is ConvertibleGenericTypes
const isConvertibleLinearType = (
  elementType: string,
): elementType is ConvertibleLinearTypes
⋮----
type CacheKey = string & { _brand: "CacheKey" };
⋮----
const ConvertElementTypePopup = (
const Panel = ({
  app,
  elements,
}: {
  app: App;
  elements: ExcalidrawElement[];
}) =>
⋮----
type ConversionType = "generic" | "linear" | null;
export const convertElementTypes = (
  app: App,
  {
    conversionType,
    nextType,
    direction = "right",
  }: {
    conversionType: ConversionType;
    nextType?: ConvertibleTypes;
    direction?: "left" | "right";
  },
): boolean =>
export const getConversionTypeFromElements = (
  elements: ExcalidrawElement[],
): ConversionType =>
const isEligibleLinearElement = (element: ExcalidrawElement) =>
const toCacheKey = (
  elementId: ExcalidrawElement["id"],
  convertitleType: ConvertibleTypes,
) =>
const filterGenericConvetibleElements = (elements: ExcalidrawElement[])
const filterLinearConvertibleElements = (elements: ExcalidrawElement[])
⋮----
const isVert = (a: LocalPoint, b: LocalPoint)
const isHorz = (a: LocalPoint, b: LocalPoint)
const dist = (a: LocalPoint, b: LocalPoint)
const convertLineToElbow = (line: ExcalidrawLinearElement): LocalPoint[] =>
const sanitizePoints = (points: readonly LocalPoint[]): LocalPoint[] =>
const convertElementType = <
  TElement extends Exclude<ExcalidrawElement, ExcalidrawSelectionElement>,
>(
  element: TElement,
  targetType: ConvertibleTypes,
  app: AppClassProperties,
): ExcalidrawElement =>
const isValidConversion = (
  startType: string,
  targetType: ConvertibleTypes,
): startType is ConvertibleTypes =>
const getConvertibleType = (
  element: ExcalidrawConvertibleElement,
): ConvertibleTypes =>
```

## File: packages/excalidraw/components/DarkModeToggle.tsx
```typescript
import { THEME } from "@excalidraw/common";
import type { Theme } from "@excalidraw/element/types";
import { t } from "../i18n";
import { ToolButton } from "./ToolButton";
```

## File: packages/excalidraw/components/DefaultSidebar.test.tsx
```typescript
import React from "react";
import { DEFAULT_SIDEBAR } from "@excalidraw/common";
import { DefaultSidebar } from "../index";
import {
  fireEvent,
  waitFor,
  withExcalidrawDimensions,
} from "../tests/test-utils";
import {
  assertExcalidrawWithSidebar,
  assertSidebarDockButton,
} from "./Sidebar/siderbar.test.helpers";
```

## File: packages/excalidraw/components/DefaultSidebar.tsx
```typescript
import clsx from "clsx";
import {
  CANVAS_SEARCH_TAB,
  DEFAULT_SIDEBAR,
  LIBRARY_SIDEBAR_TAB,
  composeEventHandlers,
} from "@excalidraw/common";
import type { MarkOptional, Merge } from "@excalidraw/common/utility-types";
import { useTunnels } from "../context/tunnels";
import { useUIAppState } from "../context/ui-appState";
⋮----
import { useExcalidrawSetAppState } from "./App";
import { LibraryMenu } from "./LibraryMenu";
import { SearchMenu } from "./SearchMenu";
import { Sidebar } from "./Sidebar/Sidebar";
import { withInternalFallback } from "./hoc/withInternalFallback";
import { LibraryIcon, searchIcon } from "./icons";
import type { SidebarProps, SidebarTriggerProps } from "./Sidebar/common";
⋮----
const DefaultTabTriggers = (
⋮----
className=
```

## File: packages/excalidraw/components/Dialog.tsx
```typescript
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { KEYS, queryFocusableElements } from "@excalidraw/common";
import { useSetAtom } from "../editor-jotai";
import { useCallbackRefState } from "../hooks/useCallbackRefState";
import { t } from "../i18n";
import {
  useExcalidrawContainer,
  useEditorInterface,
  useExcalidrawSetAppState,
} from "./App";
import { Island } from "./Island";
import { isLibraryMenuOpenAtom } from "./LibraryMenu";
import { Modal } from "./Modal";
import { CloseIcon } from "./icons";
⋮----
export type DialogSize = number | "small" | "regular" | "wide" | undefined;
export interface DialogProps {
  children: React.ReactNode;
  className?: string;
  size?: DialogSize;
  onCloseRequest(): void;
  title: React.ReactNode | false;
  autofocus?: boolean;
  closeOnClickOutside?: boolean;
}
⋮----
onCloseRequest(): void;
⋮----
function getDialogSize(size: DialogSize): number
⋮----
const handleKeyDown = (event: KeyboardEvent) =>
⋮----
const onClose = () =>
⋮----
className=
```

## File: packages/excalidraw/components/DialogActionButton.tsx
```typescript
import clsx from "clsx";
import Spinner from "./Spinner";
⋮----
import type { ReactNode } from "react";
interface DialogActionButtonProps {
  label: string;
  children?: ReactNode;
  actionType?: "primary" | "danger";
  isLoading?: boolean;
}
⋮----
className=
```

## File: packages/excalidraw/components/ElementCanvasButtons.tsx
```typescript
import { sceneCoordsToViewportCoords } from "@excalidraw/common";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import type {
  ElementsMap,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import { useExcalidrawAppState } from "../components/App";
⋮----
import type { AppState } from "../types";
⋮----
const getContainerCoords = (
  element: NonDeletedExcalidrawElement,
  appState: AppState,
  elementsMap: ElementsMap,
) =>
export const ElementCanvasButtons = ({
  children,
  element,
  elementsMap,
}: {
  children: React.ReactNode;
  element: NonDeletedExcalidrawElement;
  elementsMap: ElementsMap;
}) =>
```

## File: packages/excalidraw/components/ElementLinkDialog.tsx
```typescript
import { useCallback, useEffect, useState } from "react";
import { normalizeLink, KEYS } from "@excalidraw/common";
import {
  defaultGetElementLinkFromSelection,
  getLinkIdAndTypeFromSelection,
} from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import { t } from "../i18n";
import { getSelectedElements } from "../scene";
import DialogActionButton from "./DialogActionButton";
import { TextField } from "./TextField";
import { ToolButton } from "./ToolButton";
import { TrashIcon } from "./icons";
⋮----
import type { AppProps, AppState, UIAppState } from "../types";
⋮----
const handleKeyDown = (event: KeyboardEvent) =>
⋮----
aria-label=
⋮----
setNextLink(null);
setLinkEdited(true);
⋮----
label=
```

## File: packages/excalidraw/components/Ellipsify.tsx
```typescript
export const Ellipsify = ({
  children,
  ...rest
}:
```

## File: packages/excalidraw/components/ErrorDialog.tsx
```typescript
import React, { useState } from "react";
import { t } from "../i18n";
import { useExcalidrawContainer } from "./App";
import { Dialog } from "./Dialog";
```

## File: packages/excalidraw/components/ExcalidrawLogo.tsx
```typescript
const LogoIcon = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ExcalidrawLogo-icon"
  >
    <path
      d="M39.9 32.889a.326.326 0 0 0-.279-.056c-2.094-3.083-4.774-6-7.343-8.833l-.419-.472a.212.212 0 0 0-.056-.139.586.586 0 0 0-.167-.111l-.084-.083-.056-.056c-.084-.167-.28-.278-.475-.167-.782.39-1.507.973-2.206 1.528-.92.722-1.842 1.445-2.708 2.25a8.405 8.405 0 0 0-.977 1.028c-.14.194-.028.361.14.444-.615.611-1.23 1.223-1.843 1.861a.315.315 0 0 0-.084.223c0 .083.056.166.111.194l1.09.833v.028c1.535 1.528 4.244 3.611 7.12 5.861.418.334.865.667 1.284 1 .195.223.39.473.558.695.084.11.28.139.391.055.056.056.14.111.196.167a.398.398 0 0 0 .167.056.255.255 0 0 0 .224-.111.394.394 0 0 0 .055-.167c.029 0 .028.028.056.028a.318.318 0 0 0 .224-.084l5.082-5.528a.309.309 0 0 0 0-.444Zm-14.63-1.917a.485.485 0 0 0 .111.14c.586.5 1.2 1 1.843 1.555l-2.569-1.945-.251-.166c-.056-.028-.112-.084-.168-.111l-.195-.167.056-.056.055-.055.112-.111c.866-.861 2.346-2.306 3.1-3.028-.81.805-2.43 3.167-2.095 3.944Zm8.767 6.89-2.122-1.612a44.713 44.713 0 0 0-2.625-2.5c1.145.861 2.122 1.611 2.262 1.75 1.117.972 1.06.806 1.815 1.445l.921.666a1.06 1.06 0 0 1-.251.25Zm.558.416-.056-.028c.084-.055.168-.111.252-.194l-.196.222ZM1.089 5.75c.055.361.14.722.195 1.056.335 1.833.67 3.5 1.284 4.75l.252.944c.084.361.223.806.363.917 1.424 1.25 3.602 3.11 5.947 4.889a.295.295 0 0 0 .363 0s0 .027.028.027a.254.254 0 0 0 .196.084.318.318 0 0 0 .223-.084c2.988-3.305 5.221-6.027 6.813-8.305.112-.111.14-.278.14-.417.111-.111.195-.25.307-.333.111-.111.111-.306 0-.39l-.028-.027c0-.055-.028-.139-.084-.167-.698-.666-1.2-1.138-1.731-1.638-.922-.862-1.871-1.75-3.881-3.75l-.028-.028c-.028-.028-.056-.056-.112-.056-.558-.194-1.703-.389-3.127-.639C6.087 2.223 3.21 1.723.614.944c0 0-.168 0-.196.028l-.083.084c-.028.027-.056.055-.224.11h.056-.056c.028.167.028.278.084.473 0 .055.112.5.112.555l.782 3.556Zm15.496 3.278-.335-.334c.084.112.196.195.335.334Zm-3.546 4.666-.056.056c0-.028.028-.056.056-.056Zm-2.038-10c.168.167.866.834 1.033.973-.726-.334-2.54-1.167-3.379-1.445.838.167 1.983.334 2.346.472ZM1.424 2.306c.419.722.754 3.222 1.089 5.666-.196-.778-.335-1.555-.503-2.278-.251-1.277-.503-2.416-.838-3.416.056 0 .14 0 .252.028Zm-.168-.584c-.112 0-.223-.028-.307-.028 0-.027 0-.055-.028-.055.14 0 .223.028.335.083Zm-1.089.222c0-.027 0-.027 0 0ZM39.453 1.333c.028-.11-.558-.61-.363-.639.42-.027.42-.666 0-.666-.558.028-1.144.166-1.675.25-.977.194-1.982.389-2.96.61-2.205.473-4.383.973-6.561 1.557-.67.194-1.424.333-2.066.666-.224.111-.196.333-.084.472-.056.028-.084.028-.14.056-.195.028-.363.056-.558.083-.168.028-.252.167-.224.334 0 .027.028.083.028.11-1.173 1.556-2.485 3.195-3.909 4.945-1.396 1.611-2.876 3.306-4.356 5.056-4.719 5.5-10.052 11.75-15.943 17.25a.268.268 0 0 0 0 .389c.028.027.056.055.084.055-.084.084-.168.14-.252.222-.056.056-.084.111-.084.167a.605.605 0 0 0-.111.139c-.112.111-.112.305.028.389.111.11.307.11.39-.028.029-.028.029-.056.056-.056a.44.44 0 0 1 .615 0c.335.362.67.723.977 1.028l-.698-.583c-.112-.111-.307-.083-.39.028-.113.11-.085.305.027.389l7.427 6.194c.056.056.112.056.196.056s.14-.028.195-.084l.168-.166c.028.027.083.027.111.027.084 0 .14-.027.196-.083 10.052-10.055 18.15-17.639 27.42-24.417.083-.055.111-.166.111-.25.112 0 .196-.083.251-.194 1.704-5.194 2.039-9.806 2.15-12.083v-.028c0-.028.028-.056.028-.083.028-.056.028-.084.028-.084a1.626 1.626 0 0 0-.111-1.028ZM21.472 9.5c.446-.5.893-1.028 1.34-1.5-2.876 3.778-7.65 9.583-14.408 16.5 4.607-5.083 9.242-10.333 13.068-15ZM5.193 35.778h.084-.084Zm3.462 3.194c-.027-.028-.027-.028 0-.028v.028Zm4.16-3.583c.224-.25.448-.472.699-.722 0 0 0 .027.028.027-.252.223-.475.445-.726.695Zm1.146-1.111c.14-.14.279-.334.446-.5l.028-.028c1.648-1.694 3.351-3.389 5.082-5.111l.028-.028c.419-.333.921-.694 1.368-1.028a379.003 379.003 0 0 0-6.952 6.695ZM24.794 6.472c-.921 1.195-1.954 2.778-2.82 4.028-2.736 3.944-11.532 13.583-11.727 13.75a1976.983 1976.983 0 0 1-8.042 7.639l-.167.167c-.14-.167-.14-.417.028-.556C14.49 19.861 22.03 10.167 25.074 5.917c-.084.194-.14.36-.28.555Zm4.83 5.695c-1.116-.64-1.646-1.64-1.34-2.611l.084-.334c.028-.083.084-.194.14-.277.307-.5.754-.917 1.257-1.167.027 0 .055 0 .083-.028-.028-.056-.028-.139-.028-.222.028-.167.14-.278.335-.278.335 0 1.369.306 1.76.639.111.083.223.194.335.305.14.167.363.445.474.667.056.028.112.306.196.445.056.222.111.472.084.694-.028.028 0 .194-.028.194a2.668 2.668 0 0 1-.363 1.028c-.028.028-.028.056-.056.084l-.028.027c-.14.223-.335.417-.53.556-.643.444-1.369.583-2.095.389 0 0-.195-.084-.28-.111Zm8.154-.834a39.098 39.098 0 0 1-.893 3.167c0 .028-.028.083 0 .111-.056 0-.084.028-.14.056-2.206 1.61-4.356 3.305-6.506 5.028 1.843-1.64 3.686-3.306 5.613-4.945.558-.5.949-1.139 1.06-1.861l.28-1.667v-.055c.14-.334.67-.195.586.166Z"
      fill="currentColor"
    />
  </svg>
);
```

## File: packages/excalidraw/components/EyeDropper.tsx
```typescript
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { EVENT, KEYS, rgbToHex } from "@excalidraw/common";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { useUIAppState } from "../context/ui-appState";
import { atom } from "../editor-jotai";
import { useCreatePortalContainer } from "../hooks/useCreatePortalContainer";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useStable } from "../hooks/useStable";
import { getSelectedElements } from "../scene";
import { useApp, useExcalidrawContainer, useExcalidrawElements } from "./App";
⋮----
import type { ColorPickerType } from "./ColorPicker/colorPickerUtils";
export type EyeDropperProperties = {
  keepOpenOnAlt: boolean;
  swapPreviewOnAlt?: boolean;
  onSelect: (color: string, event: PointerEvent) => void;
  colorPickerType: ColorPickerType;
};
⋮----
export const EyeDropper: React.FC<{
onCancel: ()
⋮----
const getCurrentColor = ({
      clientX,
      clientY,
    }: {
      clientX: number;
      clientY: number;
}) =>
const mouseMoveListener = ({
      clientX,
      clientY,
      altKey,
    }: {
      clientX: number;
      clientY: number;
      altKey: boolean;
}) =>
const onCancel = () =>
const onSelect: Required<EyeDropperProperties>["onSelect"] = (
      color,
      event,
) =>
const pointerDownListener = (event: PointerEvent) =>
const pointerUpListener = (event: PointerEvent) =>
const keyDownListener = (event: KeyboardEvent) =>
```

## File: packages/excalidraw/components/FilledButton.tsx
```typescript
import clsx from "clsx";
import React, { forwardRef, useState } from "react";
import { isPromiseLike } from "@excalidraw/common";
import { AbortError } from "../errors";
import Spinner from "./Spinner";
import { tablerCheckIcon } from "./icons";
⋮----
export type ButtonVariant = "filled" | "outlined" | "icon";
export type ButtonColor =
  | "primary"
  | "danger"
  | "warning"
  | "muted"
  | "success";
export type ButtonSize = "medium" | "large";
export type FilledButtonProps = {
  label?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  status?: null | "loading" | "success";
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
};
⋮----
const _onClick = async (event: React.MouseEvent) =>
⋮----
className=
```

## File: packages/excalidraw/components/FixedSideContainer.tsx
```typescript
import React from "react";
import clsx from "clsx";
⋮----
type FixedSideContainerProps = {
  children: React.ReactNode;
  side: "top" | "left" | "right";
  className?: string;
};
export const FixedSideContainer = ({
  children,
  side,
  className,
}: FixedSideContainerProps) => (
  <div
    className={clsx(
      "FixedSideContainer",
      `FixedSideContainer_side_${side}`,
      className,
    )}
  >
    {children}
  </div>
);
⋮----
className=
```

## File: packages/excalidraw/components/HandButton.tsx
```typescript
import clsx from "clsx";
import { KEYS } from "@excalidraw/common";
import { ToolButton } from "./ToolButton";
import { handIcon } from "./icons";
⋮----
type LockIconProps = {
  title?: string;
  name?: string;
  checked: boolean;
  onChange?(): void;
  isMobile?: boolean;
};
⋮----
onChange?(): void;
```

## File: packages/excalidraw/components/HelpButton.tsx
```typescript
import { t } from "../i18n";
import { HelpIcon } from "./icons";
type HelpButtonProps = {
  name?: string;
  id?: string;
  onClick?(): void;
};
⋮----
onClick?(): void;
```

## File: packages/excalidraw/components/HelpDialog.tsx
```typescript
import React from "react";
import { isDarwin, isFirefox, isWindows } from "@excalidraw/common";
import { KEYS } from "@excalidraw/common";
import { getShortcutFromShortcutName } from "../actions/shortcuts";
import { probablySupportsClipboardBlob } from "../clipboard";
import { t } from "../i18n";
import { getShortcutKey } from "../shortcut";
import { Dialog } from "./Dialog";
import { ExternalLinkIcon, GithubIcon, youtubeIcon } from "./icons";
⋮----
import type { JSX } from "react";
const Header = () => (
  <div className="HelpDialog__header">
    <a
      className="HelpDialog__btn"
      href="https://docs.excalidraw.com"
      target="_blank"
      rel="noopener"
    >
      <div className="HelpDialog__link-icon">{ExternalLinkIcon}</div>
      {t("helpDialog.documentation")}
    </a>
    <a
      className="HelpDialog__btn"
      href="https://plus.excalidraw.com/blog"
      target="_blank"
      rel="noopener"
    >
      <div className="HelpDialog__link-icon">{ExternalLinkIcon}</div>
      {t("helpDialog.blog")}
    </a>
    <a
      className="HelpDialog__btn"
      href="https://github.com/excalidraw/excalidraw/issues"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="HelpDialog__link-icon">{GithubIcon}</div>
      {t("helpDialog.github")}
    </a>
    <a
      className="HelpDialog__btn"
      href="https://youtube.com/@excalidraw"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="HelpDialog__link-icon">{youtubeIcon}</div>
      YouTube
    </a>
  </div>
);
const Section = (props: { title: string; children: React.ReactNode }) => (
  <>
    <h3>{props.title}</h3>
    <div className="HelpDialog__islands-container">{props.children}</div>
  </>
);
const ShortcutIsland = (props: {
  caption: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`HelpDialog__island ${props.className}`}>
    <h4 className="HelpDialog__island-title">{props.caption}</h4>
    <div className="HelpDialog__island-content">{props.children}</div>
  </div>
);
⋮----
const upperCaseSingleChars = (str: string) =>
⋮----
<Section title=
⋮----
<Shortcut label=
⋮----
label=
```

## File: packages/excalidraw/components/HintViewer.tsx
```typescript
import { CANVAS_SEARCH_TAB, DEFAULT_SIDEBAR } from "@excalidraw/common";
import {
  isFlowchartNodeElement,
  isImageElement,
  isLinearElement,
  isLineElement,
  isTextBindableContainer,
  isTextElement,
} from "@excalidraw/element";
import { isNodeInFlowchart } from "@excalidraw/element";
import type { EditorInterface } from "@excalidraw/common";
import { t } from "../i18n";
import { getShortcutKey } from "../shortcut";
import { isEraserActive } from "../appState";
import { isGridModeEnabled } from "../snapping";
⋮----
import type { AppClassProperties, UIAppState } from "../types";
interface HintViewerProps {
  appState: UIAppState;
  isMobile: boolean;
  editorInterface: EditorInterface;
  app: AppClassProperties;
}
const getTaggedShortcutKey = (key: string | string[])
const getHints = ({
  appState,
  isMobile,
  editorInterface,
  app,
}: HintViewerProps): null | string | string[] =>
export const HintViewer = ({
  appState,
  isMobile,
  editorInterface,
  app,
}: HintViewerProps) =>
```

## File: packages/excalidraw/components/IconPicker.tsx
```typescript
import { Popover } from "radix-ui";
import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import { isArrowKey, KEYS } from "@excalidraw/common";
import { atom, useAtom } from "../editor-jotai";
import { getLanguage, t } from "../i18n";
import Collapsible from "./Stats/Collapsible";
import { useExcalidrawContainer } from "./App";
⋮----
import type { JSX } from "react";
⋮----
type Option<T> = {
  value: T;
  text: string;
  icon: JSX.Element;
  keyBinding: string | null;
};
type PickerSection<T> = {
  name: string;
  options: readonly Option<T>[];
};
const flattenOptions = <T,>(sections: readonly PickerSection<T>[])
const findOption = <T,>(
  sections: readonly PickerSection<T>[],
  predicate: (option: Option<T>) => boolean,
) =>
const hasOption = <T,>(
  sections: readonly PickerSection<T>[],
  predicate: (option: Option<T>) => boolean,
)
const getNavigationRows = <T,>(sections: readonly PickerSection<T>[])
⋮----
const handleKeyDown = (event: React.KeyboardEvent) =>
⋮----
onChange(option.value);
⋮----

⋮----
{renderSections(visibleSections)}
        {hiddenSections.length > 0 && (
          <Collapsible
            label={t("labels.more_options")}
            open={showMoreOptions}
openTrigger=
⋮----
label=
⋮----
setShowMoreOptions((value)
```

## File: packages/excalidraw/components/icons.tsx
```typescript
import clsx from "clsx";
import React from "react";
import { THEME } from "@excalidraw/common";
import type { Theme } from "@excalidraw/element/types";
export const iconFillColor = (theme: Theme)
const handlerColor = (theme: Theme)
type Opts = {
  width?: number;
  height?: number;
  mirror?: true;
} & React.SVGProps<SVGSVGElement>;
⋮----
className=
⋮----
fill=
```

## File: packages/excalidraw/components/ImageExportDialog.tsx
```typescript
import { exportToCanvas } from "@excalidraw/utils/export";
import React, { useEffect, useRef, useState } from "react";
import {
  DEFAULT_EXPORT_PADDING,
  EXPORT_IMAGE_TYPES,
  isFirefox,
  EXPORT_SCALES,
  cloneJSON,
} from "@excalidraw/common";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import {
  actionExportWithDarkMode,
  actionChangeExportBackground,
  actionChangeExportEmbedScene,
  actionChangeExportScale,
  actionChangeProjectName,
} from "../actions/actionExport";
import { probablySupportsClipboardBlob } from "../clipboard";
import { prepareElementsForExport } from "../data";
import { canvasToBlob } from "../data/blob";
import { nativeFileSystemSupported } from "../data/filesystem";
import { useCopyStatus } from "../hooks/useCopiedIndicator";
import { t } from "../i18n";
import { isSomeElementSelected } from "../scene";
import { copyIcon, downloadIcon, helpIcon } from "./icons";
import { Dialog } from "./Dialog";
import { RadioGroup } from "./RadioGroup";
import { Switch } from "./Switch";
import { Tooltip } from "./Tooltip";
import { FilledButton } from "./FilledButton";
⋮----
import type { ActionManager } from "../actions/manager";
import type { AppClassProperties, BinaryFiles, UIAppState } from "../types";
⋮----
const isStaleRequest = () =>
⋮----
setProjectName(event.target.value);
actionManager.executeAction(
                  actionChangeProjectName,
                  "ui",
                  event.target.value,
                );
⋮----
label=
⋮----
setExportWithBackground(checked);
actionManager.executeAction(
                actionChangeExportBackground,
                "ui",
                checked,
              );
⋮----
actionManager.executeAction(
                actionExportWithDarkMode,
                "ui",
                checked,
              );
⋮----
setEmbedScene(checked);
actionManager.executeAction(
                actionChangeExportEmbedScene,
                "ui",
                checked,
              );
⋮----
setExportScale(scale);
actionManager.executeAction(actionChangeExportScale, "ui", scale);
⋮----
choices=
⋮----
onClick=
⋮----
export const ImageExportDialog = ({
  elements,
  appState,
  files,
  actionManager,
  onExportImage,
  onCloseRequest,
  name,
}: {
  appState: UIAppState;
  elements: readonly NonDeletedExcalidrawElement[];
  files: BinaryFiles;
  actionManager: ActionManager;
  onExportImage: AppClassProperties["onExportImage"];
onCloseRequest: ()
```

## File: packages/excalidraw/components/InitializeApp.tsx
```typescript
import React, { useEffect, useState } from "react";
import type { Theme } from "@excalidraw/element/types";
import { defaultLang, languages, setLanguage } from "../i18n";
import { LoadingMessage } from "./LoadingMessage";
import type { Language } from "../i18n";
interface Props {
  langCode: Language["code"];
  children: React.ReactElement;
  theme?: Theme;
}
export const InitializeApp = (props: Props) =>
⋮----
const updateLang = async () =>
```

## File: packages/excalidraw/components/InlineIcon.tsx
```typescript
export const InlineIcon = ({
  className,
  icon,
  size = "1em",
}: {
  className?: string;
  icon: React.ReactNode;
  size?: string;
}) =>
```

## File: packages/excalidraw/components/Island.tsx
```typescript
import React from "react";
import clsx from "clsx";
⋮----
type IslandProps = {
  children: React.ReactNode;
  padding?: number;
  className?: string | boolean;
  style?: object;
};
⋮----
className=
```

## File: packages/excalidraw/components/JSONExportDialog.tsx
```typescript
import React from "react";
import { getFrame } from "@excalidraw/common";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { actionSaveFileToDisk } from "../actions/actionExport";
import { trackEvent } from "../analytics";
import { nativeFileSystemSupported } from "../data/filesystem";
import { t } from "../i18n";
import { Card } from "./Card";
import { Dialog } from "./Dialog";
import { ToolButton } from "./ToolButton";
import { exportToFileIcon, LinkIcon } from "./icons";
⋮----
import type { ActionManager } from "../actions/manager";
import type { ExportOpts, BinaryFiles, UIAppState } from "../types";
export type ExportCB = (
  elements: readonly NonDeletedExcalidrawElement[],
  scale?: number,
) => void;
⋮----
onClick=
```

## File: packages/excalidraw/components/LaserPointerButton.tsx
```typescript
import clsx from "clsx";
⋮----
import { laserPointerToolIcon } from "./icons";
import type { ToolButtonSize } from "./ToolButton";
type LaserPointerIconProps = {
  title?: string;
  name?: string;
  checked: boolean;
  onChange?(): void;
  isMobile?: boolean;
};
⋮----
onChange?(): void;
⋮----
export const LaserPointerButton = (props: LaserPointerIconProps) =>
⋮----
className=
```

## File: packages/excalidraw/components/LayerUI.tsx
```typescript
import clsx from "clsx";
import React from "react";
import {
  CLASSES,
  DEFAULT_SIDEBAR,
  TOOL_TYPE,
  arrayToMap,
  capitalizeString,
  isShallowEqual,
} from "@excalidraw/common";
import { mutateElement } from "@excalidraw/element";
import { showSelectedShapeActions } from "@excalidraw/element";
import { ShapeCache } from "@excalidraw/element";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { actionToggleStats } from "../actions";
import { trackEvent } from "../analytics";
import { TunnelsContext, useInitializeTunnels } from "../context/tunnels";
import { UIAppStateContext } from "../context/ui-appState";
import { useAtom, useAtomValue } from "../editor-jotai";
import { t } from "../i18n";
import { calculateScrollCenter } from "../scene";
import {
  SelectedShapeActions,
  ShapesSwitcher,
  CompactShapeActions,
} from "./Actions";
import { LoadingMessage } from "./LoadingMessage";
import { LockButton } from "./LockButton";
import { MobileMenu } from "./MobileMenu";
import { PasteChartDialog } from "./PasteChartDialog";
import { Section } from "./Section";
import Stack from "./Stack";
import { UserList } from "./UserList";
import { PenModeButton } from "./PenModeButton";
import Footer from "./footer/Footer";
import { isSidebarDockedAtom } from "./Sidebar/Sidebar";
import MainMenu from "./main-menu/MainMenu";
import { ActiveConfirmDialog } from "./ActiveConfirmDialog";
import { useEditorInterface, useStylesPanelMode } from "./App";
import { OverwriteConfirmDialog } from "./OverwriteConfirm/OverwriteConfirm";
import { sidebarRightIcon } from "./icons";
import { DefaultSidebar } from "./DefaultSidebar";
import { TTDDialog } from "./TTDDialog/TTDDialog";
import { Stats } from "./Stats";
import ElementLinkDialog from "./ElementLinkDialog";
import { ErrorDialog } from "./ErrorDialog";
import { EyeDropper, activeEyeDropperAtom } from "./EyeDropper";
import { FixedSideContainer } from "./FixedSideContainer";
import { HelpDialog } from "./HelpDialog";
import { HintViewer } from "./HintViewer";
import { ImageExportDialog } from "./ImageExportDialog";
import { Island } from "./Island";
import { JSONExportDialog } from "./JSONExportDialog";
import { LaserPointerButton } from "./LaserPointerButton";
import { Toast } from "./Toast";
⋮----
import type { ActionManager } from "../actions/manager";
import type { Language } from "../i18n";
import type {
  AppProps,
  AppState,
  ExcalidrawProps,
  BinaryFiles,
  UIAppState,
  AppClassProperties,
} from "../types";
interface LayerUIProps {
  actionManager: ActionManager;
  appState: UIAppState;
  files: BinaryFiles;
  canvas: HTMLCanvasElement;
  setAppState: React.Component<any, AppState>["setState"];
  elements: readonly NonDeletedExcalidrawElement[];
  onLockToggle: () => void;
  onHandToolToggle: () => void;
  onPenModeToggle: AppClassProperties["togglePenMode"];
  showExitZenModeBtn: boolean;
  langCode: Language["code"];
  renderTopLeftUI?: ExcalidrawProps["renderTopLeftUI"];
  renderTopRightUI?: ExcalidrawProps["renderTopRightUI"];
  renderCustomStats?: ExcalidrawProps["renderCustomStats"];
  UIOptions: AppProps["UIOptions"];
  onExportImage: AppClassProperties["onExportImage"];
  renderWelcomeScreen: boolean;
  children?: React.ReactNode;
  app: AppClassProperties;
  isCollaborating: boolean;
  generateLinkForSelection?: AppProps["generateLinkForSelection"];
}
⋮----
const renderJSONExportDialog = () =>
const renderImageExportDialog = () =>
⋮----
className=
⋮----
actionManager.executeAction(actionToggleStats);
⋮----
trackEvent(
            "sidebar",
            `toggleDock (${docked ? "dock" : "undock"})`,
            `(${
              editorInterface.formFactor === "phone" ? "mobile" : "desktop"
            })`,
          );
⋮----
<ErrorDialog onClose=
⋮----
onChange=
⋮----
setAppState(
⋮----

⋮----
setAppState((appState) => (
⋮----
const stripIrrelevantAppStateProps = (appState: AppState): UIAppState =>
```

## File: packages/excalidraw/components/LibraryMenu.tsx
```typescript
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  memo,
  useRef,
} from "react";
import {
  LIBRARY_DISABLED_TYPES,
  randomId,
  isShallowEqual,
  KEYS,
  isWritableElement,
  addEventListener,
  EVENT,
  CLASSES,
} from "@excalidraw/common";
import type {
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import { trackEvent } from "../analytics";
import { useUIAppState } from "../context/ui-appState";
import {
  distributeLibraryItemsOnSquareGrid,
  libraryItemsAtom,
} from "../data/library";
import { atom, useAtom } from "../editor-jotai";
import { t } from "../i18n";
import { getSelectedElements } from "../scene";
import {
  useApp,
  useAppProps,
  useExcalidrawElements,
  useExcalidrawSetAppState,
} from "./App";
import { LibraryMenuControlButtons } from "./LibraryMenuControlButtons";
import LibraryMenuItems from "./LibraryMenuItems";
import Spinner from "./Spinner";
⋮----
import type {
  LibraryItems,
  LibraryItem,
  ExcalidrawProps,
  UIAppState,
  AppClassProperties,
} from "../types";
import type Library from "../data/library";
⋮----
const LibraryMenuWrapper = (
⋮----
const addToLibrary = async (
          processedElements: LibraryItem["elements"],
          libraryItems: LibraryItems,
) =>
```

## File: packages/excalidraw/components/LibraryMenuBrowseButton.tsx
```typescript
import { VERSIONS } from "@excalidraw/common";
import { t } from "../i18n";
import type { ExcalidrawProps, UIAppState } from "../types";
```

## File: packages/excalidraw/components/LibraryMenuControlButtons.tsx
```typescript
import clsx from "clsx";
import LibraryMenuBrowseButton from "./LibraryMenuBrowseButton";
import type { ExcalidrawProps, UIAppState } from "../types";
export const LibraryMenuControlButtons = ({
  libraryReturnUrl,
  theme,
  id,
  style,
  children,
  className,
}: {
  libraryReturnUrl: ExcalidrawProps["libraryReturnUrl"];
  theme: UIAppState["theme"];
  id: string;
  style: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}) =>
⋮----
className=
```

## File: packages/excalidraw/components/LibraryMenuHeaderContent.tsx
```typescript
import clsx from "clsx";
import { useCallback, useState } from "react";
import { muteFSAbortError } from "@excalidraw/common";
import { useUIAppState } from "../context/ui-appState";
import { fileOpen } from "../data/filesystem";
import { saveLibraryAsJSON } from "../data/json";
import { libraryItemsAtom } from "../data/library";
import { useAtom } from "../editor-jotai";
import { useLibraryCache } from "../hooks/useLibraryItemSvg";
import { t } from "../i18n";
import { useApp, useExcalidrawSetAppState } from "./App";
import ConfirmDialog from "./ConfirmDialog";
import { Dialog } from "./Dialog";
import { isLibraryMenuOpenAtom } from "./LibraryMenu";
import PublishLibrary from "./PublishLibrary";
import { ToolButton } from "./ToolButton";
import Trans from "./Trans";
import DropdownMenu from "./dropdownMenu/DropdownMenu";
import {
  DotsIcon,
  ExportIcon,
  LoadIcon,
  publishIcon,
  TrashIcon,
} from "./icons";
import type Library from "../data/library";
import type { LibraryItem, LibraryItems, UIAppState } from "../types";
const getSelectedItems = (
  libraryItems: LibraryItems,
  selectedItems: LibraryItem["id"][],
)
export const LibraryDropdownMenuButton: React.FC<{
  setAppState: React.Component<any, UIAppState>["setState"];
  selectedItems: LibraryItem["id"][];
  library: Library;
onRemoveFromLibrary: ()
⋮----
const renderRemoveLibAlert = () =>
⋮----
onRemoveFromLibrary();
⋮----
onCancel=
⋮----
onCloseRequest=
⋮----
aria-label=
⋮----
onClick=
⋮----
onToggle=
⋮----
onSelect=
⋮----
<div className=

⋮----
onClose=
⋮----
updateItemsInStorage=
⋮----
onRemove=
⋮----
export const LibraryDropdownMenu = ({
  selectedItems,
  onSelectItems,
  className,
}: {
  selectedItems: LibraryItem["id"][];
onSelectItems: (id: LibraryItem["id"][])
⋮----
const removeFromLibrary = async (libraryItems: LibraryItems) =>
const resetLibrary = () =>
⋮----
onRemoveFromLibrary=
```

## File: packages/excalidraw/components/LibraryMenuItems.tsx
```typescript
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MIME_TYPES, arrayToMap, nextAnimationFrame } from "@excalidraw/common";
import { duplicateElements } from "@excalidraw/element";
import clsx from "clsx";
import { deburr } from "../deburr";
import { useLibraryCache } from "../hooks/useLibraryItemSvg";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { t } from "../i18n";
import { LibraryMenuControlButtons } from "./LibraryMenuControlButtons";
import { LibraryDropdownMenu } from "./LibraryMenuHeaderContent";
import {
  LibraryMenuSection,
  LibraryMenuSectionGrid,
} from "./LibraryMenuSection";
import Spinner from "./Spinner";
import Stack from "./Stack";
⋮----
import { TextField } from "./TextField";
import { useEditorInterface } from "./App";
import { Button } from "./Button";
import type { ExcalidrawLibraryIds } from "../data/types";
import type {
  ExcalidrawProps,
  LibraryItem,
  LibraryItems,
  UIAppState,
} from "../types";
⋮----

⋮----
onPointerDown=
⋮----
setSearchInputValue("");
```

## File: packages/excalidraw/components/LibraryMenuSection.tsx
```typescript
import React, { memo, useEffect, useState } from "react";
import type { ExcalidrawElement, NonDeleted } from "@excalidraw/element/types";
import { useTransition } from "../hooks/useTransition";
import { EmptyLibraryUnit, LibraryUnit } from "./LibraryUnit";
import type { SvgCache } from "../hooks/useLibraryItemSvg";
import type { LibraryItem } from "../types";
import type { ReactNode } from "react";
type LibraryOrPendingItem = readonly (
  | LibraryItem
  |  {
      id: null;
      elements: readonly NonDeleted<ExcalidrawElement>[];
    }
)[];
interface Props {
  items: LibraryOrPendingItem;
  onClick: (id: LibraryItem["id"] | null) => void;
  onItemSelectToggle: (id: LibraryItem["id"], event: React.MouseEvent) => void;
  onItemDrag: (id: LibraryItem["id"], event: React.DragEvent) => void;
  isItemSelected: (id: LibraryItem["id"] | null) => boolean;
  svgCache: SvgCache;
  itemsRenderedPerBatch: number;
}
export const LibraryMenuSectionGrid = ({
  children,
}: {
  children: ReactNode;
}) =>
```

## File: packages/excalidraw/components/LibraryUnit.tsx
```typescript
import clsx from "clsx";
import { memo, useRef, useState } from "react";
import { useLibraryItemSvg } from "../hooks/useLibraryItemSvg";
import { useEditorInterface } from "./App";
import { CheckboxItem } from "./CheckboxItem";
import { PlusIcon } from "./icons";
⋮----
import type { LibraryItem } from "../types";
import type { SvgCache } from "../hooks/useLibraryItemSvg";
⋮----
className=
⋮----
onDragStart=
⋮----
export const EmptyLibraryUnit = () => (
  <div className="library-unit library-unit--skeleton" />
);
```

## File: packages/excalidraw/components/LinkButton.tsx
```typescript
import { FilledButton } from "./FilledButton";
export const LinkButton = ({
  children,
  href,
}: {
  href: string;
  children: React.ReactNode;
}) =>
```

## File: packages/excalidraw/components/LoadingMessage.tsx
```typescript
import clsx from "clsx";
import { useState, useEffect } from "react";
import { THEME } from "@excalidraw/common";
import type { Theme } from "@excalidraw/element/types";
import { t } from "../i18n";
import Spinner from "./Spinner";
⋮----
className=
```

## File: packages/excalidraw/components/LockButton.tsx
```typescript
import clsx from "clsx";
⋮----
import { LockedIcon, UnlockedIcon } from "./icons";
import type { ToolButtonSize } from "./ToolButton";
type LockIconProps = {
  title?: string;
  name?: string;
  checked: boolean;
  onChange?(): void;
  isMobile?: boolean;
};
⋮----
onChange?(): void;
⋮----
export const LockButton = (props: LockIconProps) =>
⋮----
className=
```

## File: packages/excalidraw/components/MagicButton.tsx
```typescript
import clsx from "clsx";
⋮----
import type { ToolButtonSize } from "./ToolButton";
import type { JSX } from "react";
⋮----
export const ElementCanvasButton = (props: {
  title?: string;
  icon: JSX.Element;
  name?: string;
  checked: boolean;
  onChange?(): void;
⋮----
onChange?(): void;
⋮----
className=
```

## File: packages/excalidraw/components/MobileMenu.tsx
```typescript
import React from "react";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import { useTunnels } from "../context/tunnels";
import { t } from "../i18n";
import { calculateScrollCenter } from "../scene";
import { SCROLLBAR_WIDTH, SCROLLBAR_MARGIN } from "../scene/scrollbars";
import { ExitViewModeButton, MobileShapeActions } from "./Actions";
import { MobileToolBar } from "./MobileToolBar";
import { FixedSideContainer } from "./FixedSideContainer";
import { Island } from "./Island";
import { PenModeButton } from "./PenModeButton";
import type { ActionManager } from "../actions/manager";
import type {
  AppClassProperties,
  AppProps,
  AppState,
  UIAppState,
} from "../types";
import type { JSX } from "react";
type MobileMenuProps = {
  appState: UIAppState;
  actionManager: ActionManager;
  renderJSONExportDialog: () => React.ReactNode;
  renderImageExportDialog: () => React.ReactNode;
  setAppState: React.Component<any, AppState>["setState"];
  elements: readonly NonDeletedExcalidrawElement[];
  onHandToolToggle: () => void;
  onPenModeToggle: AppClassProperties["togglePenMode"];
  renderTopRightUI?: (
    isMobile: boolean,
    appState: UIAppState,
  ) => JSX.Element | null;
  renderTopLeftUI?: (
    isMobile: boolean,
    appState: UIAppState,
  ) => JSX.Element | null;
  renderSidebars: () => JSX.Element | null;
  renderWelcomeScreen: boolean;
  UIOptions: AppProps["UIOptions"];
  app: AppClassProperties;
};
⋮----
title=
⋮----

⋮----
setAppState((appState) => (
```

## File: packages/excalidraw/components/MobileToolBar.tsx
```typescript
import { useState, useEffect } from "react";
import clsx from "clsx";
import { KEYS, capitalizeString } from "@excalidraw/common";
import { trackEvent } from "../analytics";
import { t } from "../i18n";
import { isHandToolActive } from "../appState";
import { useTunnels } from "../context/tunnels";
import { HandButton } from "./HandButton";
import { ToolButton } from "./ToolButton";
import DropdownMenu from "./dropdownMenu/DropdownMenu";
import { ToolPopover } from "./ToolPopover";
import {
  SelectionIcon,
  FreedrawIcon,
  EraserIcon,
  RectangleIcon,
  ArrowIcon,
  extraToolsIcon,
  DiamondIcon,
  EllipseIcon,
  LineIcon,
  TextIcon,
  ImageIcon,
  frameToolIcon,
  EmbedIcon,
  laserPointerToolIcon,
  LassoIcon,
  mermaidLogoIcon,
  MagicIcon,
} from "./icons";
⋮----
import type { AppClassProperties, ToolType, UIAppState } from "../types";
⋮----
type MobileToolBarProps = {
  app: AppClassProperties;
  onHandToolToggle: () => void;
  setAppState: React.Component<any, UIAppState>["setState"];
};
export const MobileToolBar = ({
  app,
  onHandToolToggle,
  setAppState,
}: MobileToolBarProps) =>
⋮----
const handleToolChange = (toolType: string, pointerType?: string) =>
⋮----
if (div)
setToolbarWidth(div.getBoundingClientRect().width);
⋮----
title={capitalizeString(
          t(
            lastActiveGenericShape === "rectangle"
              ? "toolBar.rectangle"
              : lastActiveGenericShape === "diamond"
              ? "toolBar.diamond"
              : lastActiveGenericShape === "ellipse"
              ? "toolBar.ellipse"
              : "toolBar.rectangle",
          ),
        )}
        data-testid="toolbar-rectangle"
onToolChange=
⋮----
className=
⋮----
setIsOtherShapesMenuOpen(!isOtherShapesMenuOpen);
setAppState(
⋮----
onSelect=
```

## File: packages/excalidraw/components/Modal.tsx
```typescript
import clsx from "clsx";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { KEYS } from "@excalidraw/common";
import { useCreatePortalContainer } from "../hooks/useCreatePortalContainer";
⋮----
import type { AppState } from "../types";
⋮----
onCloseRequest(): void;
⋮----
const handleKeydown = (event: React.KeyboardEvent) =>
⋮----
className=
```

## File: packages/excalidraw/components/Paragraph.tsx
```typescript
export const Paragraph = (props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) =>
```

## File: packages/excalidraw/components/PasteChartDialog.tsx
```typescript
import React, { useLayoutEffect, useRef, useState } from "react";
import { newTextElement } from "@excalidraw/element";
import type { ChartType } from "@excalidraw/element/types";
import { trackEvent } from "../analytics";
import { isSpreadsheetValidForChartType, renderSpreadsheet } from "../charts";
import { t } from "../i18n";
import { exportToSvg } from "../scene/export";
import { useUIAppState } from "../context/ui-appState";
import { useApp } from "./App";
import { Dialog } from "./Dialog";
⋮----
import { bucketFillIcon } from "./icons";
import type { ChartElements, Spreadsheet } from "../charts";
type OnPlainTextPaste = (rawText: string) => void;
type OnInsertChart = (chartType: ChartType, elements: ChartElements) => void;
const getChartTypeLabel = (chartType: ChartType) =>
⋮----
if (chartElements)
props.onClick(props.chartType, chartElements);
⋮----
aria-label=
⋮----
props.onClick(props.rawText);
⋮----
const handleChartClick = (chartType: ChartType, elements: ChartElements) =>
const handlePlainTextClick = (rawText: string) =>
⋮----
```

## File: packages/excalidraw/components/PenModeButton.tsx
```typescript
import clsx from "clsx";
⋮----
import { PenModeIcon } from "./icons";
import type { ToolButtonSize } from "./ToolButton";
type PenModeIconProps = {
  title?: string;
  name?: string;
  checked: boolean;
  onChange?(): void;
  zenModeEnabled?: boolean;
  isMobile?: boolean;
  penDetected: boolean;
};
⋮----
onChange?(): void;
⋮----
export const PenModeButton = (props: PenModeIconProps) =>
⋮----
className=
```

## File: packages/excalidraw/components/Popover.tsx
```typescript
import React, { useLayoutEffect, useRef, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { KEYS, queryFocusableElements } from "@excalidraw/common";
import clsx from "clsx";
⋮----
type Props = {
  top?: number;
  left?: number;
  children?: React.ReactNode;
  onCloseRequest?(event: PointerEvent): void;
  fitInViewport?: boolean;
  offsetLeft?: number;
  offsetTop?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  className?: string;
};
⋮----
onCloseRequest?(event: PointerEvent): void;
⋮----
export const Popover = ({
  children,
  left,
  top,
  onCloseRequest,
  fitInViewport = false,
  offsetLeft = 0,
  offsetTop = 0,
  viewportWidth = window.innerWidth,
  viewportHeight = window.innerHeight,
  className,
}: Props) =>
⋮----
const handleKeyDown = (event: KeyboardEvent) =>
⋮----
const handler = (event: PointerEvent) =>
⋮----
<div className=
```

## File: packages/excalidraw/components/ProjectName.tsx
```typescript
import React, { useState } from "react";
import { focusNearestParent, KEYS } from "@excalidraw/common";
import { useExcalidrawContainer } from "./App";
⋮----
type Props = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  ignoreFocus?: boolean;
};
export const ProjectName = (props: Props) =>
⋮----
const handleBlur = (event: any) =>
const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) =>
```

## File: packages/excalidraw/components/PropertiesPopover.tsx
```typescript
import { Popover } from "radix-ui";
import clsx from "clsx";
import React, { type ReactNode } from "react";
import { isInteractive } from "@excalidraw/common";
import { useEditorInterface } from "./App";
import { Island } from "./Island";
interface PropertiesPopoverProps {
  className?: string;
  container: HTMLDivElement | null;
  children: ReactNode;
  style?: object;
  onClose: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
  onFocusOutside?: Popover.PopoverContentProps["onFocusOutside"];
  onPointerDownOutside?: Popover.PopoverContentProps["onPointerDownOutside"];
  preventAutoFocusOnTouch?: boolean;
}
```

## File: packages/excalidraw/components/PublishLibrary.tsx
```typescript
import { exportToCanvas, exportToSvg } from "@excalidraw/utils/export";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  EDITOR_LS_KEYS,
  EXPORT_DATA_TYPES,
  MIME_TYPES,
  VERSIONS,
  chunk,
  getExportSource,
} from "@excalidraw/common";
import { EditorLocalStorage } from "../data/EditorLocalStorage";
import { canvasToBlob, resizeImageFile } from "../data/blob";
import { t } from "../i18n";
import { Dialog } from "./Dialog";
import DialogActionButton from "./DialogActionButton";
import { ToolButton } from "./ToolButton";
import Trans from "./Trans";
import { CloseIcon } from "./icons";
⋮----
import type { ReactNode } from "react";
import type { ExportedLibraryData } from "../data/types";
import type { LibraryItems, LibraryItem, UIAppState } from "../types";
interface PublishLibraryDataParams {
  authorName: string;
  githubHandle: string;
  name: string;
  description: string;
  twitterHandle: string;
  website: string;
}
const generatePreviewImage = async (libraryItems: LibraryItems) =>
⋮----
onChange(event.target.value, index);
⋮----
const onInputChange = (event: any) =>
const onSubmit = async (event: React.FormEvent<HTMLFormElement>) =>
const renderLibraryItems = () =>
⋮----

⋮----
placeholder=
⋮----
label=
```

## File: packages/excalidraw/components/QuickSearch.tsx
```typescript
import clsx from "clsx";
import React from "react";
import { searchIcon } from "./icons";
⋮----
interface QuickSearchProps {
  className?: string;
  placeholder: string;
  onChange: (term: string) => void;
}
⋮----
<div className=
```

## File: packages/excalidraw/components/RadioGroup.tsx
```typescript
import clsx from "clsx";
⋮----
export type RadioGroupChoice<T> = {
  value: T;
  label: React.ReactNode;
  ariaLabel?: string;
};
export type RadioGroupProps<T> = {
  choices: RadioGroupChoice<T>[];
  value: T;
  onChange: (value: T) => void;
  name: string;
};
⋮----
className=
```

## File: packages/excalidraw/components/RadioSelection.tsx
```typescript
import clsx from "clsx";
import { ButtonIcon } from "./ButtonIcon";
import type { JSX } from "react";
⋮----
onChange=
```

## File: packages/excalidraw/components/Range.tsx
```typescript
import React, { useEffect } from "react";
⋮----
export type RangeProps = {
  label: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  minLabel?: React.ReactNode;
  hasCommonValue?: boolean;
  testId?: string;
};
export const Range = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 10,
  minLabel = min,
  hasCommonValue = true,
  testId,
}: RangeProps) =>
⋮----
onChange=
```

## File: packages/excalidraw/components/ScrollableList.tsx
```typescript
import clsx from "clsx";
import { Children } from "react";
⋮----
interface ScrollableListProps {
  className?: string;
  placeholder: string;
  children: React.ReactNode;
}
export const ScrollableList = ({
  className,
  placeholder,
  children,
}: ScrollableListProps) =>
⋮----
<div className=
```

## File: packages/excalidraw/components/SearchMenu.tsx
```typescript
import { round } from "@excalidraw/math";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { Fragment, memo, useEffect, useMemo, useRef, useState } from "react";
import {
  CLASSES,
  EVENT,
  FONT_FAMILY,
  FRAME_STYLE,
  getLineHeight,
} from "@excalidraw/common";
import { isElementCompletelyInViewport } from "@excalidraw/element";
import { measureText } from "@excalidraw/element";
import {
  KEYS,
  randomInteger,
  addEventListener,
  getFontString,
} from "@excalidraw/common";
import { newTextElement } from "@excalidraw/element";
import { isTextElement, isFrameLikeElement } from "@excalidraw/element";
import { getDefaultFrameName } from "@excalidraw/element/frame";
import type {
  ExcalidrawFrameLikeElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import { atom, useAtom } from "../editor-jotai";
import { useStable } from "../hooks/useStable";
import { t } from "../i18n";
import { useApp, useExcalidrawSetAppState } from "./App";
import { Button } from "./Button";
import { TextField } from "./TextField";
import {
  collapseDownIcon,
  upIcon,
  searchIcon,
  frameToolIcon,
  TextIcon,
} from "./icons";
⋮----
import type { AppClassProperties, SearchMatch } from "../types";
⋮----
type SearchMatchItem = {
  element: ExcalidrawTextElement | ExcalidrawFrameLikeElement;
  searchQuery: SearchQuery;
  index: number;
  preview: {
    indexInSearchQuery: number;
    previewText: string;
    moreBefore: boolean;
    moreAfter: boolean;
  };
  matchedLines: SearchMatch["matchedLines"];
};
type SearchMatches = {
  nonce: number | null;
  items: SearchMatchItem[];
};
type SearchQuery = string & { _brand: "SearchQuery" };
⋮----
const goToNextItem = () =>
const goToPreviousItem = () =>
⋮----
const eventHandler = (event: KeyboardEvent) =>
⋮----
goToNextItem();
⋮----
if (props.highlighted)
ref?.scrollIntoView(
⋮----
// text = "small", query = "mall", complete after
⋮----
// measureText returns a non-zero width for the empty string
// which is not what we're after here, hence the check and the correction
```

## File: packages/excalidraw/components/Section.tsx
```typescript
import React from "react";
import { t } from "../i18n";
import { useExcalidrawContainer } from "./App";
```

## File: packages/excalidraw/components/shapes.tsx
```typescript
import { KEYS } from "@excalidraw/common";
import {
  SelectionIcon,
  RectangleIcon,
  DiamondIcon,
  EllipseIcon,
  ArrowIcon,
  LineIcon,
  FreedrawIcon,
  TextIcon,
  ImageIcon,
  EraserIcon,
  laserPointerToolIcon,
  handIcon,
} from "./icons";
import type { AppClassProperties } from "../types";
⋮----
export const getToolbarTools = (app: AppClassProperties) =>
export const findShapeByKey = (key: string, app: AppClassProperties) =>
```

## File: packages/excalidraw/components/ShareableLinkDialog.tsx
```typescript
import { useRef, useState } from "react";
import { copyTextToSystemClipboard } from "../clipboard";
import { useCopyStatus } from "../hooks/useCopiedIndicator";
import { useI18n } from "../i18n";
import { Dialog } from "./Dialog";
import { FilledButton } from "./FilledButton";
import { TextField } from "./TextField";
import { copyIcon } from "./icons";
⋮----
export type ShareableLinkDialogProps = {
  link: string;
  onCloseRequest: () => void;
  setErrorMessage: (error: string) => void;
};
⋮----
const copyRoomLink = async () =>
```

## File: packages/excalidraw/components/Spinner.tsx
```typescript
import React from "react";
```

## File: packages/excalidraw/components/Stack.tsx
```typescript
import React, { forwardRef } from "react";
import clsx from "clsx";
⋮----
type StackProps = {
  children: React.ReactNode;
  gap?: number;
  align?: "start" | "center" | "end" | "baseline";
  justifyContent?: "center" | "space-around" | "space-between";
  className?: string | boolean;
  style?: React.CSSProperties;
};
⋮----
className=
```

## File: packages/excalidraw/components/SVGLayer.tsx
```typescript
import { useEffect, useRef } from "react";
⋮----
import type { Trail } from "../animated-trail";
type SVGLayerProps = {
  trails: Trail[];
};
export const SVGLayer = (
```

## File: packages/excalidraw/components/Switch.tsx
```typescript
import clsx from "clsx";
⋮----
export type SwitchProps = {
  name: string;
  checked: boolean;
  title?: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};
export const Switch = ({
  title,
  name,
  checked,
  onChange,
  disabled = false,
}: SwitchProps) =>
⋮----
<div className=
⋮----
onKeyDown=
```

## File: packages/excalidraw/components/TextField.tsx
```typescript
import clsx from "clsx";
import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";
import { Button } from "./Button";
import { eyeIcon, eyeClosedIcon } from "./icons";
⋮----
import type { KeyboardEvent } from "react";
type TextFieldProps = {
  onChange?: (value: string) => void;
  onClick?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  fullWidth?: boolean;
  selectOnRender?: boolean;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  placeholder?: string;
  isRedacted?: boolean;
  type?: "text" | "search";
} & ({ value: string } | { defaultValue: string });
⋮----
className=
⋮----
innerRef.current?.focus();
⋮----
setIsTemporarilyUnredacted(!isTemporarilyUnredacted)
```

## File: packages/excalidraw/components/Toast.tsx
```typescript
import { useCallback, useEffect, useRef } from "react";
import { CloseIcon } from "./icons";
import { ToolButton } from "./ToolButton";
⋮----
import type { CSSProperties, ReactNode } from "react";
```

## File: packages/excalidraw/components/ToolButton.tsx
```typescript
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { isPromiseLike } from "@excalidraw/common";
import type { PointerType } from "@excalidraw/element/types";
import { AbortError } from "../errors";
⋮----
import Spinner from "./Spinner";
import { useExcalidrawContainer } from "./App";
import type { CSSProperties } from "react";
export type ToolButtonSize = "small" | "medium";
type ToolButtonBaseProps = {
  icon?: React.ReactNode;
  "aria-label": string;
  "aria-keyshortcuts"?: string;
  "data-testid"?: string;
  label?: string;
  title?: string;
  name?: string;
  id?: string;
  size?: ToolButtonSize;
  keyBindingLabel?: string | null;
  showAriaLabel?: boolean;
  hidden?: boolean;
  visible?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  isLoading?: boolean;
};
type ToolButtonProps =
  | (ToolButtonBaseProps & {
      type: "button";
      children?: React.ReactNode;
      onClick?(event: React.MouseEvent): void;
    })
  | (ToolButtonBaseProps & {
      type: "submit";
      children?: React.ReactNode;
      onClick?(event: React.MouseEvent): void;
    })
  | (ToolButtonBaseProps & {
      type: "icon";
      children?: React.ReactNode;
      onClick?(): void;
    })
  | (ToolButtonBaseProps & {
      type: "radio";
      checked: boolean;
      onChange?(data: { pointerType: PointerType | null }): void;
      onPointerDown?(data: { pointerType: PointerType }): void;
    });
⋮----
onClick?(event: React.MouseEvent): void;
⋮----
onClick?(): void;
⋮----
onChange?(data:
onPointerDown?(data:
⋮----
const onClick = async (event: React.MouseEvent) =>
⋮----
className=
⋮----
requestAnimationFrame(() =>
```

## File: packages/excalidraw/components/ToolPopover.tsx
```typescript
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { capitalizeString } from "@excalidraw/common";
import { Popover } from "radix-ui";
import { trackEvent } from "../analytics";
import { ToolButton } from "./ToolButton";
⋮----
import { useExcalidrawContainer } from "./App";
import type { AppClassProperties } from "../types";
type ToolOption = {
  type: string;
  icon: React.ReactNode;
  title?: string;
};
type ToolPopoverProps = {
  app: AppClassProperties;
  options: readonly ToolOption[];
  activeTool: { type: string };
  defaultOption: string;
  className?: string;
  namePrefix: string;
  title: string;
  "data-testid": string;
  onToolChange: (type: string) => void;
  displayedOption: ToolOption;
  fillable?: boolean;
};
⋮----
onPointerDown=
⋮----
onChange=
```

## File: packages/excalidraw/components/Tooltip.tsx
```typescript
import React, { useEffect } from "react";
⋮----
export const getTooltipDiv = () =>
export const updateTooltipPosition = (
  tooltip: HTMLDivElement,
  item: {
    left: number;
    top: number;
    width: number;
    height: number;
  },
  position: "bottom" | "top" = "bottom",
) =>
const updateTooltip = (
  item: HTMLDivElement,
  tooltip: HTMLDivElement,
  label: string,
  long: boolean,
) =>
type TooltipProps = {
  children: React.ReactNode;
  label: string;
  long?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
};
export const Tooltip = ({
  children,
  label,
  long = false,
  style,
  disabled,
}: TooltipProps) =>
```

## File: packages/excalidraw/components/Trans.test.tsx
```typescript
import { render } from "@testing-library/react";
import { EditorJotaiProvider } from "../editor-jotai";
import fallbackLangData from "../locales/en.json";
import Trans from "./Trans";
import type { TranslationKeys } from "../i18n";
⋮----
connect-link=
```

## File: packages/excalidraw/components/Trans.tsx
```typescript
import React from "react";
import { useI18n } from "../i18n";
import type { TranslationKeys } from "../i18n";
⋮----
const getTransChildren = (
  format: string,
  props: {
[key: string]: React.ReactNode | ((el: React.ReactNode)
⋮----
// The match is <tag>. Set the tag name as the name if it's one of the
// props, e.g. for "Please <link>click the button</link> to continue"
⋮----
const Trans = ({
  i18nKey,
  children,
  ...props
}: {
  i18nKey: TranslationKeys;
[key: string]: React.ReactNode | ((el: React.ReactNode)
```

## File: packages/excalidraw/components/UnlockPopup.tsx
```typescript
import {
  getCommonBounds,
  getElementsInGroup,
  selectGroupsFromGivenElements,
} from "@excalidraw/element";
import { sceneCoordsToViewportCoords } from "@excalidraw/common";
import { flushSync } from "react-dom";
import { actionToggleElementLock } from "../actions";
import { t } from "../i18n";
⋮----
import { LockedIconFilled } from "./icons";
import type App from "./App";
import type { AppState } from "../types";
const UnlockPopup = ({
  app,
  activeLockedId,
}: {
  app: App;
  activeLockedId: NonNullable<AppState["activeLockedId"]>;
}) =>
⋮----
flushSync(() =>
app.actionManager.executeAction(actionToggleElementLock);
```

## File: packages/excalidraw/components/UserList.tsx
```typescript
import { Popover } from "radix-ui";
import clsx from "clsx";
import React, { useLayoutEffect } from "react";
import { supportsResizeObserver, isShallowEqual } from "@excalidraw/common";
import type { MarkRequired } from "@excalidraw/common/utility-types";
import { t } from "../i18n";
import { useExcalidrawActionManager } from "./App";
import { Island } from "./Island";
import { QuickSearch } from "./QuickSearch";
import { ScrollableList } from "./ScrollableList";
import { Tooltip } from "./Tooltip";
⋮----
import type { ActionManager } from "../actions/manager";
import type { Collaborator, SocketId } from "../types";
export type GoToCollaboratorComponentProps = {
  socketId: SocketId;
  collaborator: Collaborator;
  withName: boolean;
  isBeingFollowed: boolean;
};
type ClientId = string & { _brand: "UserId" };
⋮----
const ConditionalTooltipWrapper = ({
  shouldWrap,
  children,
  username,
}: {
  shouldWrap: boolean;
  children: React.ReactNode;
  username?: string | null;
})
const renderCollaborator = ({
  actionManager,
  collaborator,
  socketId,
  withName = false,
  shouldWrapWithTooltip = false,
  isBeingFollowed,
}: {
  actionManager: ActionManager;
  collaborator: Collaborator;
  socketId: SocketId;
  withName?: boolean;
  shouldWrapWithTooltip?: boolean;
  isBeingFollowed: boolean;
}) =>
type UserListUserObject = Pick<
  Collaborator,
  | "avatarUrl"
  | "id"
  | "socketId"
  | "username"
  | "isInCall"
  | "isSpeaking"
  | "isMuted"
>;
type UserListProps = {
  className?: string;
  mobile?: boolean;
  collaborators: Map<SocketId, UserListUserObject>;
  userToFollow: SocketId | null;
};
⋮----
const updateMaxAvatars = (width: number) =>
⋮----
<div className=
```

## File: packages/excalidraw/context/tunnels.ts
```typescript
import { createIsolation } from "jotai-scope";
import React from "react";
import tunnel from "tunnel-rat";
export type Tunnel = ReturnType<typeof tunnel>;
type TunnelsContextValue = {
  MainMenuTunnel: Tunnel;
  WelcomeScreenMenuHintTunnel: Tunnel;
  WelcomeScreenToolbarHintTunnel: Tunnel;
  WelcomeScreenHelpHintTunnel: Tunnel;
  WelcomeScreenCenterTunnel: Tunnel;
  FooterCenterTunnel: Tunnel;
  DefaultSidebarTriggerTunnel: Tunnel;
  DefaultSidebarTabTriggersTunnel: Tunnel;
  OverwriteConfirmDialogTunnel: Tunnel;
  TTDDialogTriggerTunnel: Tunnel;
  tunnelsJotai: ReturnType<typeof createIsolation>;
};
⋮----
export const useTunnels = ()
⋮----
export const useInitializeTunnels = () =>
```

## File: packages/excalidraw/context/ui-appState.ts
```typescript
import React from "react";
import type { UIAppState } from "../types";
⋮----
export const useUIAppState = ()
```

## File: packages/excalidraw/data/ai/types.ts
```typescript
type ChatCompletionContentPart =
    | ChatCompletionContentPartText
    | ChatCompletionContentPartImage;
interface ChatCompletionContentPartImage {
    image_url: ChatCompletionContentPartImage.ImageURL;
    type: "image_url";
  }
⋮----
export interface ImageURL {
      url: string;
      detail?: "auto" | "low" | "high";
    }
⋮----
interface ChatCompletionContentPartText {
    text: string;
    type: "text";
  }
interface ChatCompletionUserMessageParam {
    content: string | Array<ChatCompletionContentPart> | null;
    role: "user";
  }
interface ChatCompletionSystemMessageParam {
    content: string | null;
    role: "system";
  }
export interface ChatCompletionCreateParamsBase {
    messages: Array<
      ChatCompletionUserMessageParam | ChatCompletionSystemMessageParam
    >;
    model:
      | (string & {})
      | "gpt-4-1106-preview"
      | "gpt-4-vision-preview"
      | "gpt-4"
      | "gpt-4-0314"
      | "gpt-4-0613"
      | "gpt-4-32k"
      | "gpt-4-32k-0314"
      | "gpt-4-32k-0613"
      | "gpt-3.5-turbo"
      | "gpt-3.5-turbo-16k"
      | "gpt-3.5-turbo-0301"
      | "gpt-3.5-turbo-0613"
      | "gpt-3.5-turbo-16k-0613";
    frequency_penalty?: number | null;
    logit_bias?: Record<string, number> | null;
    max_tokens?: number | null;
    n?: number | null;
    presence_penalty?: number | null;
    seed?: number | null;
    stop?: string | null | Array<string>;
    stream?: boolean | null;
    temperature?: number | null;
    top_p?: number | null;
    user?: string;
  }
⋮----
export interface ChatCompletion {
    id: string;
    choices: Array<Choice>;
    created: number;
    model: string;
    object: "chat.completion";
    system_fingerprint?: string;
    usage?: CompletionUsage;
  }
export interface Choice {
    finish_reason:
      | "stop"
      | "length"
      | "tool_calls"
      | "content_filter"
      | "function_call";
    index: number;
    message: ChatCompletionMessage;
  }
interface ChatCompletionMessage {
    content: string | null;
    role: "assistant";
  }
interface CompletionUsage {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  }
export interface APIError {
    readonly status: 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | undefined;
    readonly headers: Headers | undefined;
    readonly error: { message: string } | undefined;
    readonly code: string | null | undefined;
    readonly param: string | null | undefined;
    readonly type: string | undefined;
  }
```

## File: packages/excalidraw/data/blob.ts
```typescript
import { nanoid } from "nanoid";
import {
  IMAGE_MIME_TYPES,
  MIME_TYPES,
  bytesToHexString,
  isPromiseLike,
} from "@excalidraw/common";
import type { ValueOf } from "@excalidraw/common/utility-types";
import type { ExcalidrawElement, FileId } from "@excalidraw/element/types";
import { cleanAppStateForExport } from "../appState";
import { CanvasError, ImageSceneDataError } from "../errors";
import { calculateScrollCenter } from "../scene";
import { decodeSvgBase64Payload } from "../scene/export";
import { base64ToString, stringToBase64, toByteString } from "./encode";
import { nativeFileSystemSupported } from "./filesystem";
import { isValidExcalidrawData, isValidLibrary } from "./json";
import {
  restoreAppState,
  restoreElements,
  restoreLibraryItems,
} from "./restore";
import type { AppState, DataURL, LibraryItem } from "../types";
import type { ImportedLibraryData } from "./types";
const parseFileContents = async (blob: Blob | File): Promise<string> =>
export const getMimeType = (blob: Blob | string): string =>
export const getFileHandleType = (handle: FileSystemFileHandle | null) =>
export const isImageFileHandleType = (
  type: string | null,
): type is "png" | "svg" =>
export const isImageFileHandle = (
  handle: FileSystemFileHandle | null,
): handle is FileSystemFileHandle =>
export const isSupportedImageFileType = (type: string | null | undefined) =>
export const isSupportedImageFile = (
  blob: Blob | null | undefined,
): blob is Blob &
export const loadSceneOrLibraryFromBlob = async (
  blob: Blob | File,
  localAppState: AppState | null,
  localElements: readonly ExcalidrawElement[] | null,
  fileHandle?: FileSystemFileHandle | null,
) =>
export const loadFromBlob = async (
  blob: Blob,
  localAppState: AppState | null,
  localElements: readonly ExcalidrawElement[] | null,
  fileHandle?: FileSystemFileHandle | null,
) =>
export const parseLibraryJSON = (
  json: string,
  defaultStatus: LibraryItem["status"] = "unpublished",
) =>
export const loadLibraryFromBlob = async (
  blob: Blob,
  defaultStatus: LibraryItem["status"] = "unpublished",
) =>
export const canvasToBlob = async (
  canvas: HTMLCanvasElement | Promise<HTMLCanvasElement>,
): Promise<Blob> =>
export const generateIdFromFile = async (file: File): Promise<FileId> =>
export const getDataURL = async (file: Blob | File): Promise<DataURL> =>
export const getDataURL_sync = (
  data: string | Uint8Array | ArrayBuffer,
  mimeType: ValueOf<typeof MIME_TYPES>,
): DataURL =>
export const dataURLToFile = (dataURL: DataURL, filename = "") =>
export const dataURLToString = (dataURL: DataURL) =>
export const resizeImageFile = async (
  file: File,
  opts: {
    /** undefined indicates auto */
    outputType?: typeof MIME_TYPES["jpg"];
    maxWidthOrHeight: number;
  },
): Promise<File> =>
⋮----
/** undefined indicates auto */
⋮----
export const SVGStringToFile = (SVGString: string, filename: string = "") =>
export const ImageURLToFile = async (
  imageUrl: string,
  filename: string = "",
): Promise<File | undefined> =>
export const getFileHandle = async (
  event: DragEvent | React.DragEvent | DataTransferItem,
): Promise<FileSystemFileHandle | null> =>
const getActualMimeTypeFromImage = async (file: Blob | File) =>
export const createFile = (
  blob: File | Blob | ArrayBuffer,
  mimeType: string,
  name: string | undefined,
) =>
⋮----
export const normalizeFile = async (file: File) =>
export const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> =>
```

## File: packages/excalidraw/data/EditorLocalStorage.ts
```typescript
import type { EDITOR_LS_KEYS } from "@excalidraw/common";
import type { JSONValue } from "../types";
export class EditorLocalStorage
⋮----
static has(key: typeof EDITOR_LS_KEYS[keyof typeof EDITOR_LS_KEYS])
static get<T extends JSONValue>(
    key: typeof EDITOR_LS_KEYS[keyof typeof EDITOR_LS_KEYS],
)
```

## File: packages/excalidraw/data/encode.ts
```typescript
import { deflate, inflate } from "pako";
import { encryptData, decryptData } from "./encryption";
export const toByteString = (data: string | Uint8Array | ArrayBuffer) =>
const byteStringToArrayBuffer = (byteString: string) =>
const byteStringToString = (byteString: string) =>
export const stringToBase64 = (str: string, isByteString = false) =>
export const base64ToString = (base64: string, isByteString = false) =>
export const base64ToArrayBuffer = (base64: string): ArrayBuffer =>
export const base64urlToString = (str: string) =>
type EncodedData = {
  encoded: string;
  encoding: "bstring";
  compressed: boolean;
  version?: string;
};
export const encode = ({
  text,
  compress,
}: {
  text: string;
  compress?: boolean;
}): EncodedData =>
export const decode = (data: EncodedData): string =>
type FileEncodingInfo = {
  version: 1 | 2;
  compression: "pako@1" | null;
  encryption: "AES-GCM" | null;
};
⋮----
function dataView(buffer: Uint8Array, bytes: 1 | 2 | 4, offset: number): number;
function dataView(
  buffer: Uint8Array,
  bytes: 1 | 2 | 4,
  offset: number,
  value: number,
): Uint8Array;
function dataView(
  buffer: Uint8Array,
  bytes: 1 | 2 | 4,
  offset: number,
  value?: number,
): Uint8Array | number
const concatBuffers = (...buffers: Uint8Array[]): Uint8Array<ArrayBuffer> =>
const splitBuffers = (concatenatedBuffer: Uint8Array) =>
const _encryptAndCompress = async (
  data: Uint8Array<ArrayBuffer> | string,
  encryptionKey: string,
) =>
export const compressData = async <T extends Record<string, any> = never>(
  dataBuffer: Uint8Array,
  options: {
    encryptionKey: string;
  } & ([T] extends [never]
    ? {
        metadata?: T;
      }
    : {
        metadata: T;
      }),
): Promise<Uint8Array<ArrayBuffer>> =>
const _decryptAndDecompress = async (
  iv: Uint8Array<ArrayBuffer>,
  decryptedBuffer: Uint8Array<ArrayBuffer>,
  decryptionKey: string,
  isCompressed: boolean,
) =>
export const decompressData = async <T extends Record<string, any>>(
  bufferView: Uint8Array,
  options: { decryptionKey: string },
) =>
```

## File: packages/excalidraw/data/encryption.ts
```typescript
import { ENCRYPTION_KEY_BITS } from "@excalidraw/common";
import { blobToArrayBuffer } from "./blob";
⋮----
export const createIV = (): Uint8Array<ArrayBuffer> =>
export const generateEncryptionKey = async <
  T extends "string" | "cryptoKey" = "string",
>(
  returnAs?: T,
): Promise<T extends "cryptoKey" ? CryptoKey : string> =>
export const getCryptoKey = (key: string, usage: KeyUsage)
export const encryptData = async (
  key: string | CryptoKey,
  data: Uint8Array<ArrayBuffer> | ArrayBuffer | Blob | File | string,
): Promise<
export const decryptData = async (
  iv: Uint8Array<ArrayBuffer>,
  encrypted: Uint8Array<ArrayBuffer> | ArrayBuffer,
  privateKey: string,
): Promise<ArrayBuffer> =>
```

## File: packages/excalidraw/data/filesystem.ts
```typescript
import {
  fileOpen as _fileOpen,
  fileSave as _fileSave,
  supported as nativeFileSystemSupported,
} from "browser-fs-access";
import { MIME_TYPES } from "@excalidraw/common";
import { normalizeFile } from "./blob";
type FILE_EXTENSION = Exclude<keyof typeof MIME_TYPES, "binary">;
export const fileOpen = async <M extends boolean | undefined = false>(opts: {
  extensions?: FILE_EXTENSION[];
  description: string;
  multiple?: M;
}): Promise<M extends false | undefined ? File : File[]> =>
⋮----
type RetType = M extends false | undefined ? File : File[];
⋮----
export const fileSave = (
  blob: Blob | Promise<Blob>,
  opts: {
    name: string;
    extension: FILE_EXTENSION;
    mimeTypes?: string[];
    description: string;
    fileHandle?: FileSystemFileHandle | null;
  },
) =>
```

## File: packages/excalidraw/data/image.ts
```typescript
import tEXt from "png-chunk-text";
import encodePng from "png-chunks-encode";
import decodePng from "png-chunks-extract";
import { EXPORT_DATA_TYPES, MIME_TYPES } from "@excalidraw/common";
import { blobToArrayBuffer } from "./blob";
import { encode, decode } from "./encode";
export const getTEXtChunk = async (
  blob: Blob,
): Promise<
export const encodePngMetadata = async ({
  blob,
  metadata,
}: {
  blob: Blob;
  metadata: string;
}) =>
export const decodePngMetadata = async (blob: Blob) =>
```

## File: packages/excalidraw/data/index.ts
```typescript
import {
  DEFAULT_EXPORT_PADDING,
  DEFAULT_FILENAME,
  IMAGE_MIME_TYPES,
  isFirefox,
  MIME_TYPES,
  cloneJSON,
  SVG_DOCUMENT_PREAMBLE,
} from "@excalidraw/common";
import { getNonDeletedElements } from "@excalidraw/element";
import { isFrameLikeElement } from "@excalidraw/element";
import { getElementsOverlappingFrame } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawFrameLikeElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import {
  copyBlobToClipboardAsPng,
  copyTextToSystemClipboard,
} from "../clipboard";
import { t } from "../i18n";
import { getSelectedElements, isSomeElementSelected } from "../scene";
import { exportToCanvas, exportToSvg } from "../scene/export";
import { canvasToBlob } from "./blob";
import { fileSave } from "./filesystem";
import { serializeAsJSON } from "./json";
import type { ExportType } from "../scene/types";
import type { AppState, BinaryFiles } from "../types";
⋮----
export type ExportedElements = readonly NonDeletedExcalidrawElement[] & {
  _brand: "exportedElements";
};
export const prepareElementsForExport = (
  elements: readonly ExcalidrawElement[],
  { selectedElementIds }: Pick<AppState, "selectedElementIds">,
  exportSelectionOnly: boolean,
) =>
export const exportCanvas = async (
  type: Omit<ExportType, "backend">,
  elements: ExportedElements,
  appState: AppState,
  files: BinaryFiles,
  {
    exportBackground,
    exportPadding = DEFAULT_EXPORT_PADDING,
    viewBackgroundColor,
    name = appState.name || DEFAULT_FILENAME,
    fileHandle = null,
    exportingFrame = null,
  }: {
    exportBackground: boolean;
    exportPadding?: number;
    viewBackgroundColor: string;
    name?: string;
    fileHandle?: FileSystemFileHandle | null;
    exportingFrame: ExcalidrawFrameLikeElement | null;
  },
) =>
```

## File: packages/excalidraw/data/json.ts
```typescript
import {
  EXPORT_DATA_TYPES,
  getExportSource,
  MIME_TYPES,
  VERSIONS,
} from "@excalidraw/common";
import type { ExcalidrawElement, NonDeleted } from "@excalidraw/element/types";
import type { MaybePromise } from "@excalidraw/common/utility-types";
import { cleanAppStateForExport, clearAppStateForDatabase } from "../appState";
import { isImageFileHandle, loadFromBlob } from "./blob";
import { fileOpen, fileSave } from "./filesystem";
import type { AppState, BinaryFiles, LibraryItems } from "../types";
import type {
  ExportedDataState,
  ImportedDataState,
  ExportedLibraryData,
  ImportedLibraryData,
} from "./types";
export type JSONExportData = {
  elements: readonly NonDeleted<ExcalidrawElement>[];
  appState: AppState;
  files: BinaryFiles;
};
const filterOutDeletedFiles = (
  elements: readonly ExcalidrawElement[],
  files: BinaryFiles,
) =>
export const serializeAsJSON = (
  elements: readonly ExcalidrawElement[],
  appState: Partial<AppState>,
  files: BinaryFiles,
  type: "local" | "database",
): string =>
export const saveAsJSON = async ({
  data,
  filename,
  fileHandle,
}: {
  data: MaybePromise<JSONExportData>;
  filename: string;
  fileHandle: AppState["fileHandle"];
}) =>
export const loadFromJSON = async (
  localAppState: AppState,
  localElements: readonly ExcalidrawElement[] | null,
) =>
export const isValidExcalidrawData = (data?: {
  type?: any;
  elements?: any;
  appState?: any;
}): data is ImportedDataState =>
export const isValidLibrary = (json: any): json is ImportedLibraryData =>
export const serializeLibraryAsJSON = (libraryItems: LibraryItems) =>
export const saveLibraryAsJSON = async (libraryItems: LibraryItems) =>
```

## File: packages/excalidraw/data/library.test.ts
```typescript
import { validateLibraryUrl } from "./library";
```

## File: packages/excalidraw/data/library.ts
```typescript
import { useEffect, useRef } from "react";
import {
  URL_HASH_KEYS,
  URL_QUERY_KEYS,
  APP_NAME,
  EVENT,
  DEFAULT_SIDEBAR,
  LIBRARY_SIDEBAR_TAB,
  arrayToMap,
  cloneJSON,
  preventUnload,
  promiseTry,
  resolvablePromise,
  toValidURL,
  Queue,
  Emitter,
} from "@excalidraw/common";
import { hashElementsVersion, hashString } from "@excalidraw/element";
import { getCommonBoundingBox } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { MaybePromise } from "@excalidraw/common/utility-types";
import { atom, editorJotaiStore } from "../editor-jotai";
import { AbortError } from "../errors";
import { libraryItemSvgsCache } from "../hooks/useLibraryItemSvg";
import { t } from "../i18n";
import { loadLibraryFromBlob } from "./blob";
import { restoreLibraryItems } from "./restore";
import type App from "../components/App";
import type {
  LibraryItems,
  LibraryItem,
  ExcalidrawImperativeAPI,
  LibraryItemsSource,
  LibraryItems_anyVersion,
} from "../types";
⋮----
type LibraryUpdate = {
  deletedItems: Map<LibraryItem["id"], LibraryItem>;
  addedItems: Map<LibraryItem["id"], LibraryItem>;
  updatedItems: Map<LibraryItem["id"], LibraryItem>;
};
export type LibraryPersistedData = { libraryItems: LibraryItems };
⋮----
export type LibraryAdatapterSource = "load" | "save";
export interface LibraryPersistenceAdapter {
  load(metadata: {
    source: LibraryAdatapterSource;
  }): MaybePromise<{ libraryItems: LibraryItems_anyVersion } | null>;
  save(libraryData: LibraryPersistedData): MaybePromise<void>;
}
⋮----
load(metadata: {
    source: LibraryAdatapterSource;
}): MaybePromise<
save(libraryData: LibraryPersistedData): MaybePromise<void>;
⋮----
export interface LibraryMigrationAdapter {
  load(): MaybePromise<{ libraryItems: LibraryItems_anyVersion } | null>;
  clear(): MaybePromise<void>;
}
⋮----
load(): MaybePromise<
clear(): MaybePromise<void>;
⋮----
const cloneLibraryItems = (libraryItems: LibraryItems): LibraryItems
const isUniqueItem = (
  existingLibraryItems: LibraryItems,
  targetLibraryItem: LibraryItem,
) =>
export const mergeLibraryItems = (
  localItems: LibraryItems,
  otherItems: LibraryItems,
): LibraryItems =>
const createLibraryUpdate = (
  prevLibraryItems: LibraryItems,
  nextLibraryItems: LibraryItems,
): LibraryUpdate =>
class Library
⋮----
constructor(app: App)
⋮----
export const distributeLibraryItemsOnSquareGrid = (
  libraryItems: LibraryItems,
) =>
⋮----
const getMaxHeightPerRow = (row: number) =>
const getMaxWidthPerCol = (targetCol: number) =>
⋮----
export const validateLibraryUrl = (
  libraryUrl: string,
  validator:
    | ((libraryUrl: string) => boolean)
    | string[] = ALLOWED_LIBRARY_URLS,
): true =>
export const parseLibraryTokensFromUrl = () =>
class AdapterTransaction
⋮----
static async getLibraryItems(
    adapter: LibraryPersistenceAdapter,
    source: LibraryAdatapterSource,
    _queue = true,
): Promise<LibraryItems>
⋮----
const task = ()
⋮----
constructor(adapter: LibraryPersistenceAdapter)
getLibraryItems(source: LibraryAdatapterSource)
⋮----
const getLibraryItemHash = (item: LibraryItem) =>
export const getLibraryItemsHash = (items: LibraryItems) =>
const persistLibraryUpdate = async (
  adapter: LibraryPersistenceAdapter,
  update: LibraryUpdate,
): Promise<LibraryItems> =>
export const useHandleLibrary = (
  opts: {
    excalidrawAPI: ExcalidrawImperativeAPI | null;
validateLibraryUrl?: (libraryUrl: string)
⋮----
const importLibraryFromURL = async ({
      libraryUrl,
      idToken,
    }: {
      libraryUrl: string;
      idToken: string | null;
}) =>
const onHashChange = (event: HashChangeEvent) =>
// -------------------------------------------------------------------------
// ---------------------------------- init ---------------------------------
// -------------------------------------------------------------------------
⋮----
// ------ (A) init load (legacy) -------------------------------------------
⋮----
const onUnload = (event: Event) =>
```

## File: packages/excalidraw/data/reconcile.ts
```typescript
import throttle from "lodash.throttle";
import { arrayToMap, isDevEnv, isTestEnv } from "@excalidraw/common";
import {
  orderByFractionalIndex,
  syncInvalidIndices,
  validateFractionalIndices,
} from "@excalidraw/element";
import type { OrderedExcalidrawElement } from "@excalidraw/element/types";
import type { MakeBrand } from "@excalidraw/common/utility-types";
import type { AppState } from "../types";
export type ReconciledExcalidrawElement = OrderedExcalidrawElement &
  MakeBrand<"ReconciledElement">;
export type RemoteExcalidrawElement = OrderedExcalidrawElement &
  MakeBrand<"RemoteExcalidrawElement">;
export const shouldDiscardRemoteElement = (
  localAppState: AppState,
  local: OrderedExcalidrawElement | undefined,
  remote: RemoteExcalidrawElement,
): boolean =>
⋮----
export const reconcileElements = (
  localElements: readonly OrderedExcalidrawElement[],
  remoteElements: readonly RemoteExcalidrawElement[],
  localAppState: AppState,
): ReconciledExcalidrawElement[] =>
```

## File: packages/excalidraw/data/resave.ts
```typescript
import type { MaybePromise } from "@excalidraw/common/utility-types";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { getFileHandleType, isImageFileHandleType } from "./blob";
import { exportCanvas, prepareElementsForExport } from ".";
import type { AppState, BinaryFiles } from "../types";
export const resaveAsImageWithScene = async (
  data: MaybePromise<{
    elements: readonly ExcalidrawElement[];
    appState: AppState;
    files: BinaryFiles;
  }>,
  fileHandle: FileSystemFileHandle,
  filename: string,
) =>
```

## File: packages/excalidraw/data/restore.ts
```typescript
import { isFiniteNumber, pointFrom } from "@excalidraw/math";
import {
  type CombineBrandsIfNeeded,
  DEFAULT_FONT_FAMILY,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_VERTICAL_ALIGN,
  FONT_FAMILY,
  ROUNDNESS,
  DEFAULT_SIDEBAR,
  DEFAULT_ELEMENT_PROPS,
  DEFAULT_GRID_SIZE,
  DEFAULT_GRID_STEP,
  randomId,
  getUpdatedTimestamp,
  updateActiveTool,
  arrayToMap,
  getSizeFromPoints,
  normalizeLink,
  getLineHeight,
} from "@excalidraw/common";
import {
  calculateFixedPointForNonElbowArrowBinding,
  getNonDeletedElements,
  normalizeArrowhead,
  isPointInElement,
  isValidPolygon,
  projectFixedPointOntoDiagonal,
} from "@excalidraw/element";
import { normalizeFixedPoint } from "@excalidraw/element";
import {
  updateElbowArrowPoints,
  validateElbowPoints,
} from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import { bumpVersion } from "@excalidraw/element";
import { getContainerElement } from "@excalidraw/element";
import { detectLineHeight } from "@excalidraw/element";
import {
  isArrowBoundToElement,
  isArrowElement,
  isElbowArrow,
  isLinearElement,
  isLineElement,
  isTextElement,
  isUsingAdaptiveRadius,
} from "@excalidraw/element";
import { syncInvalidIndices } from "@excalidraw/element";
import { refreshTextDimensions } from "@excalidraw/element";
import { getNormalizedDimensions } from "@excalidraw/element";
import { isInvisiblySmallElement } from "@excalidraw/element";
import type { LocalPoint, Radians } from "@excalidraw/math";
import type {
  ElementsMap,
  ElementsMapOrArray,
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  ExcalidrawElbowArrowElement,
  ExcalidrawElement,
  ExcalidrawLinearElement,
  ExcalidrawSelectionElement,
  ExcalidrawTextElement,
  FixedPointBinding,
  FontFamilyValues,
  NonDeletedSceneElementsMap,
  OrderedExcalidrawElement,
  StrokeRoundness,
} from "@excalidraw/element/types";
import type { MarkOptional, Mutable } from "@excalidraw/common/utility-types";
import { getDefaultAppState } from "../appState";
import {
  getNormalizedGridSize,
  getNormalizedGridStep,
  getNormalizedZoom,
} from "../scene";
import type {
  AppState,
  BinaryFiles,
  LibraryItem,
  NormalizedZoomValue,
} from "../types";
import type { ImportedDataState, LegacyAppState } from "./types";
type RestoredAppState = Omit<
  AppState,
  "offsetTop" | "offsetLeft" | "width" | "height"
>;
⋮----
export type RestoredDataState = {
  elements: OrderedExcalidrawElement[];
  appState: RestoredAppState;
  files: BinaryFiles;
};
const getFontFamilyByName = (fontFamilyName: string): FontFamilyValues =>
const repairBinding = <T extends ExcalidrawArrowElement>(
  element: T,
  binding: FixedPointBinding | null,
  targetElementsMap: Readonly<ElementsMap>,
  existingElementsMap: Readonly<ElementsMap> | null | undefined,
  startOrEnd: "start" | "end",
): FixedPointBinding | null =>
const restoreElementWithProperties = <
  T extends Required<Omit<ExcalidrawElement, "customData">> & {
    customData?: ExcalidrawElement["customData"];
    boundElementIds?: readonly ExcalidrawElement["id"][];
    strokeSharpness?: StrokeRoundness;
  },
  K extends Pick<T, keyof Omit<Required<T>, keyof ExcalidrawElement>>,
>(
  element: T,
  extra: Pick<
    T,
    keyof K
  > &
    Partial<Pick<ExcalidrawElement, "type" | "x" | "y" | "customData">>,
): T =>
export const restoreElement = (
  element: Exclude<ExcalidrawElement, ExcalidrawSelectionElement>,
  targetElementsMap: Readonly<ElementsMap>,
  existingElementsMap: Readonly<ElementsMap> | null | undefined,
  opts?: {
    deleteInvisibleElements?: boolean;
  },
): typeof element | null =>
⋮----
// line-height might not be specified either when creating elements
// programmatically, or when importing old diagrams.
// For the latter we want to detect the original line height which
// will likely differ from our per-font fixed line height we now use,
// to maintain backward compatibility.
⋮----
? // detect line-height from current element height and font-size
⋮----
: // no element height likely means programmatic use, so default
// to a fixed line height
⋮----
// if empty text, mark as deleted. We keep in array
// for data integrity purposes (collab etc.)
⋮----
// TODO: we should not do this since it breaks sync / versioning when we exchange / apply just deltas and restore the elements (deletion isn't recorded)
⋮----
const repairContainerElement = (
  container: Mutable<ExcalidrawElement>,
  elementsMap: Map<string, Mutable<ExcalidrawElement>>,
) =>
const repairBoundElement = (
  boundElement: Mutable<ExcalidrawTextElement>,
  elementsMap: Map<string, Mutable<ExcalidrawElement>>,
) =>
const repairFrameMembership = (
  element: Mutable<ExcalidrawElement>,
  elementsMap: Map<string, Mutable<ExcalidrawElement>>,
) =>
export const restoreElements = <T extends ExcalidrawElement>(
  targetElements: readonly T[] | undefined | null,
  existingElements: Readonly<ElementsMapOrArray> | null | undefined,
  opts?:
    | {
        refreshDimensions?: boolean;
        repairBindings?: boolean;
        deleteInvisibleElements?: boolean;
      }
    | undefined,
): CombineBrandsIfNeeded<T, OrderedExcalidrawElement> =>
export const bumpElementVersions = <T extends ExcalidrawElement>(
  targetElements: readonly T[],
  localElements: Readonly<ElementsMapOrArray> | null | undefined,
) =>
const coalesceAppStateValue = <
  T extends keyof ReturnType<typeof getDefaultAppState>,
>(
  key: T,
  appState: Exclude<ImportedDataState["appState"], null | undefined>,
  defaultAppState: ReturnType<typeof getDefaultAppState>,
) =>
⋮----
export const restoreAppState = (
  appState: ImportedDataState["appState"],
  localAppState: Partial<AppState> | null | undefined,
): RestoredAppState =>
const restoreLibraryItem = (libraryItem: LibraryItem) =>
export const restoreLibraryItems = (
  libraryItems: ImportedDataState["libraryItems"] = [],
  defaultStatus: LibraryItem["status"],
) =>
```

## File: packages/excalidraw/data/types.ts
```typescript
import type { VERSIONS } from "@excalidraw/common";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { cleanAppStateForExport } from "../appState";
import type {
  AppState,
  BinaryFiles,
  LibraryItem,
  LibraryItems,
  LibraryItems_anyVersion,
} from "../types";
export interface ExportedDataState {
  type: string;
  version: number;
  source: string;
  elements: readonly ExcalidrawElement[];
  appState: ReturnType<typeof cleanAppStateForExport>;
  files: BinaryFiles | undefined;
}
export type LegacyAppState = {
  isSidebarDocked: [boolean, "defaultSidebarDockedPreference"];
};
export interface ImportedDataState {
  type?: string;
  version?: number;
  source?: string;
  elements?: readonly ExcalidrawElement[] | null;
  appState?: Readonly<
    Partial<
      AppState & {
        [T in keyof LegacyAppState]: LegacyAppState[T][0];
      }
    >
  > | null;
  scrollToContent?: boolean;
  libraryItems?: LibraryItems_anyVersion;
  files?: BinaryFiles;
}
export interface ExportedLibraryData {
  type: string;
  version: typeof VERSIONS.excalidrawLibrary;
  source: string;
  libraryItems: LibraryItems;
}
export interface ImportedLibraryData extends Partial<ExportedLibraryData> {
  library?: LibraryItems;
}
export type ExcalidrawLibraryIds = {
  itemIds: LibraryItem["id"][];
};
```

## File: packages/excalidraw/eraser/index.ts
```typescript
import { arrayToMap, easeOut, THEME } from "@excalidraw/common";
import {
  computeBoundTextPosition,
  doBoundsIntersect,
  getBoundTextElement,
  getElementBounds,
  getElementLineSegments,
  getFreedrawOutlineAsSegments,
  getFreedrawOutlinePoints,
  intersectElementWithLineSegment,
  isArrowElement,
  isFreeDrawElement,
  isLineElement,
  isPointInElement,
} from "@excalidraw/element";
import {
  lineSegment,
  lineSegmentsDistance,
  pointFrom,
  polygon,
  polygonIncludesPointNonZero,
} from "@excalidraw/math";
import { getElementsInGroup } from "@excalidraw/element";
import { shouldTestInside } from "@excalidraw/element";
import { hasBoundTextElement, isBoundToContainer } from "@excalidraw/element";
import { getBoundTextElementId } from "@excalidraw/element";
import type { Bounds } from "@excalidraw/common";
import type { GlobalPoint, LineSegment } from "@excalidraw/math/types";
import type { ElementsMap, ExcalidrawElement } from "@excalidraw/element/types";
import { AnimatedTrail } from "../animated-trail";
import type { AnimationFrameHandler } from "../animation-frame-handler";
import type App from "../components/App";
export class EraserTrail extends AnimatedTrail
⋮----
constructor(animationFrameHandler: AnimationFrameHandler, app: App)
startPath(x: number, y: number): void
addPointToPath(x: number, y: number, restore = false)
private updateElementsToBeErased(restoreToErase?: boolean)
endPath(): void
⋮----
const eraserTest = (
  pathSegment: LineSegment<GlobalPoint>,
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  zoom: number,
): boolean =>
```

## File: packages/excalidraw/fonts/Cascadia/index.ts
```typescript
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
import CascadiaCodeRegular from "./CascadiaCode-Regular.woff2";
```

## File: packages/excalidraw/fonts/ComicShanns/index.ts
```typescript
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
import _0 from "./ComicShanns-Regular-279a7b317d12eb88de06167bd672b4b4.woff2";
import _3 from "./ComicShanns-Regular-6e066e8de2ac57ea9283adb9c24d7f0c.woff2";
import _2 from "./ComicShanns-Regular-dc6a8806fa96795d7b3be5026f989a17.woff2";
import _1 from "./ComicShanns-Regular-fcb0fc02dcbee4c9846b3e2508668039.woff2";
```

## File: packages/excalidraw/fonts/Emoji/index.ts
```typescript
import { LOCAL_FONT_PROTOCOL } from "@excalidraw/common";
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
```

## File: packages/excalidraw/fonts/Excalifont/index.ts
```typescript
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
import _5 from "./Excalifont-Regular-349fac6ca4700ffec595a7150a0d1e1d.woff2";
import _4 from "./Excalifont-Regular-3f2c5db56cc93c5a6873b1361d730c16.woff2";
import _3 from "./Excalifont-Regular-41b173a47b57366892116a575a43e2b6.woff2";
import _6 from "./Excalifont-Regular-623ccf21b21ef6b3a0d87738f77eb071.woff2";
import _0 from "./Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9.woff2";
import _2 from "./Excalifont-Regular-b9dcf9d2e50a1eaf42fc664b50a3fd0d.woff2";
import _1 from "./Excalifont-Regular-be310b9bcd4f1a43f571c46df7809174.woff2";
```

## File: packages/excalidraw/fonts/Helvetica/index.ts
```typescript
import { LOCAL_FONT_PROTOCOL } from "@excalidraw/common";
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
```

## File: packages/excalidraw/fonts/Liberation/index.ts
```typescript
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
import LiberationSansRegular from "./LiberationSans-Regular.woff2";
```

## File: packages/excalidraw/fonts/Lilita/index.ts
```typescript
import { GOOGLE_FONTS_RANGES } from "@excalidraw/common";
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
import LilitaLatinExt from "./Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYE98RXi4EwSsbg.woff2";
import LilitaLatin from "./Lilita-Regular-i7dPIFZ9Zz-WBtRtedDbYEF8RXi4EwQ.woff2";
```

## File: packages/excalidraw/fonts/Nunito/index.ts
```typescript
import { GOOGLE_FONTS_RANGES } from "@excalidraw/common";
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
import Cyrilic from "./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTA3j6zbXWjgevT5.woff2";
import Latin from "./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTQ3j6zbXWjgeg.woff2";
import CyrilicExt from "./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTk3j6zbXWjgevT5.woff2";
import LatinExt from "./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTo3j6zbXWjgevT5.woff2";
import Vietnamese from "./Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTs3j6zbXWjgevT5.woff2";
```

## File: packages/excalidraw/fonts/Virgil/index.ts
```typescript
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
import Virgil from "./Virgil-Regular.woff2";
```

## File: packages/excalidraw/fonts/Xiaolai/index.ts
```typescript
import { type ExcalidrawFontFaceDescriptor } from "../Fonts";
import _80 from "./Xiaolai-Regular-019d66dcad46dc156b162d267f981c20.woff2";
import _16 from "./Xiaolai-Regular-04b718e5623574919c8b0dea5f301444.woff2";
import _13 from "./Xiaolai-Regular-069e77aac84590e2e991d0a0176d34f2.woff2";
import _166 from "./Xiaolai-Regular-06c77b8c66e51ed6c63ccb502dd8b8af.woff2";
import _71 from "./Xiaolai-Regular-08e0dc436ad0ad61ba5558db0674d762.woff2";
import _161 from "./Xiaolai-Regular-093b9ef39a46ceae95a1df18a0a3a326.woff2";
import _183 from "./Xiaolai-Regular-095c169f3314805276f603a362766abd.woff2";
import _0 from "./Xiaolai-Regular-09850c4077f3fffe707905872e0e2460.woff2";
import _14 from "./Xiaolai-Regular-41521fade99856108931b4768b1b2648.woff2";
import _10 from "./Xiaolai-Regular-544fc28abe2c5c30e62383fd4dac255f.woff2";
import _2 from "./Xiaolai-Regular-60a3089806700d379f11827ee9843b6b.woff2";
import _1 from "./Xiaolai-Regular-7eb9fffd1aa890d07d0f88cc82e6cfe4.woff2";
import _3 from "./Xiaolai-Regular-6fe5c5973cc06f74b2387a631ea36b88.woff2";
import _6 from "./Xiaolai-Regular-a4c34be6d42152e64b0df90bc4607f64.woff2";
import _4 from "./Xiaolai-Regular-b96d9226ce77ec94ceca043d712182e6.woff2";
import _5 from "./Xiaolai-Regular-6ae5b42180ad70b971c91e7eefb8eba2.woff2";
import _7 from "./Xiaolai-Regular-c69f61a4ab18d0488c8d1fc12e7028e8.woff2";
import _30 from "./Xiaolai-Regular-cb17fc3db95f6d139afc9d31a8e93293.woff2";
import _8 from "./Xiaolai-Regular-e3fcf5180fd466c8915c4e8069491054.woff2";
import _9 from "./Xiaolai-Regular-c1f94158256bb1f3bf665b053d895af9.woff2";
import _11 from "./Xiaolai-Regular-7197d6fda6cba7c3874c53d6381ca239.woff2";
import _12 from "./Xiaolai-Regular-70c2eb8d64e71a42a834eb857ea9df51.woff2";
import _15 from "./Xiaolai-Regular-a004ddfcb26e67bd6e678c8ed19e25ce.woff2";
import _17 from "./Xiaolai-Regular-7e4bde7e9c7f84cd34d8a845e384c746.woff2";
import _18 from "./Xiaolai-Regular-23686f7f29da6e8008c36dd3a80c83d6.woff2";
import _19 from "./Xiaolai-Regular-69c09cc5fa3e55c74fc4821f76909cc3.woff2";
import _20 from "./Xiaolai-Regular-25b7f38e18f035f96cb5e547bd2bd08c.woff2";
import _21 from "./Xiaolai-Regular-ba3de316d63c7e339987b16f41a0b879.woff2";
import _22 from "./Xiaolai-Regular-12b52b58eb3df36804b9a654ec9ee194.woff2";
import _23 from "./Xiaolai-Regular-b1220a3c61f85cc0408deedb4c5f57a2.woff2";
import _24 from "./Xiaolai-Regular-4535823663ad81405188a528d8f2b1a2.woff2";
import _25 from "./Xiaolai-Regular-3eaa538115d76932653c21d8dc28f207.woff2";
import _26 from "./Xiaolai-Regular-7e929f262f30c8ee78bf398150b1a7cd.woff2";
import _27 from "./Xiaolai-Regular-73e309718fd16cea44b4d54a33581811.woff2";
import _28 from "./Xiaolai-Regular-9eb5a99df4e76ac3363453ac9ca288b1.woff2";
import _29 from "./Xiaolai-Regular-3e63ed8162808a9e425ed80a8bc79114.woff2";
import _31 from "./Xiaolai-Regular-c8b71798409ccc126ee264a00aadcf21.woff2";
import _32 from "./Xiaolai-Regular-11c345711937f0ba4b8f7b6b919c8440.woff2";
import _33 from "./Xiaolai-Regular-e480d9c614742d05f0e78f274f1e69e6.woff2";
import _34 from "./Xiaolai-Regular-95429962233afd82db1c27df1500a28c.woff2";
import _35 from "./Xiaolai-Regular-2cf96d082d35ea3d8106851223ad0d16.woff2";
import _36 from "./Xiaolai-Regular-2d43040e86ff03ba677f6f9c04cd0805.woff2";
import _37 from "./Xiaolai-Regular-2a26d20a23b00898ce82f09d2ee47c3f.woff2";
import _38 from "./Xiaolai-Regular-a365e82ed54697a52f27adcea1315fe8.woff2";
import _41 from "./Xiaolai-Regular-e4bca6cfa53e499cae0a6be4894a90e9.woff2";
import _105 from "./Xiaolai-Regular-e51ef413167c6e14e0c0fdcc585f2fc9.woff2";
import _82 from "./Xiaolai-Regular-e5f453bb04da18eed01675eeebd88bf8.woff2";
import _45 from "./Xiaolai-Regular-e656f091b9dc4709722c9f4b84d3c797.woff2";
import _47 from "./Xiaolai-Regular-f0f13b5c60e0af5553bd359f5513be1b.woff2";
import _39 from "./Xiaolai-Regular-f5d079153c99a25b9be5b8583c4cc8a7.woff2";
import _40 from "./Xiaolai-Regular-10a7ae9a371830a80c3d844acf1c02d7.woff2";
import _42 from "./Xiaolai-Regular-60a41c7e1c68f22424e6d22df544bc82.woff2";
import _43 from "./Xiaolai-Regular-7ab2bed91166a9dca83a5ebfbe2a7f38.woff2";
import _44 from "./Xiaolai-Regular-670ba603758d94268e8606f240a42e12.woff2";
import _46 from "./Xiaolai-Regular-15dc6d811c9cd078f9086a740d5a1038.woff2";
import _48 from "./Xiaolai-Regular-8c2f33cee3993174f7e87c28e4bf42ee.woff2";
import _49 from "./Xiaolai-Regular-761d05e3cd968cf574166867998ef06a.woff2";
import _50 from "./Xiaolai-Regular-642b26e2e5f5fb780b51b593dbc8c851.woff2";
import _51 from "./Xiaolai-Regular-5572b3513ba8df57a3d5d7303ee6b11b.woff2";
import _52 from "./Xiaolai-Regular-3c9de2ae0ea4bc91a510942dfa4be8d2.woff2";
import _53 from "./Xiaolai-Regular-671a2c20b1eb9e4ef8a192833940e319.woff2";
import _54 from "./Xiaolai-Regular-4dc6d5f188d5c96d44815cd1e81aa885.woff2";
import _55 from "./Xiaolai-Regular-ce4884f96f11589608b76b726a755803.woff2";
import _56 from "./Xiaolai-Regular-8f476c4c99813d57cbe6eca4727388ad.woff2";
import _57 from "./Xiaolai-Regular-5935a5775af3d5c6307ac667bd9ae74e.woff2";
import _58 from "./Xiaolai-Regular-79f007c1c6d07557120982951ea67998.woff2";
import _59 from "./Xiaolai-Regular-bafff7a14c27403dcc6cf1432e8ea836.woff2";
import _60 from "./Xiaolai-Regular-543fa46ace099a7099dad69123399400.woff2";
import _61 from "./Xiaolai-Regular-4ddc14ed3eb0c3e46364317dfc0144a3.woff2";
import _62 from "./Xiaolai-Regular-0fa55a080fcd0f9dc2e0b0058b793df8.woff2";
import _63 from "./Xiaolai-Regular-66493ba5a8367f2928812f446f47b56a.woff2";
import _64 from "./Xiaolai-Regular-57862b464a55b18c7bf234ce22907d73.woff2";
import _65 from "./Xiaolai-Regular-8d3bcabb847b56243b16afe62adaaf21.woff2";
import _66 from "./Xiaolai-Regular-2b77e8ebfb2367ab2662396a60e7d320.woff2";
import _67 from "./Xiaolai-Regular-0b5d723fdc4e249c140f0909e87d03b4.woff2";
import _68 from "./Xiaolai-Regular-cdbce89e82cc1ab53a2decbf5819278f.woff2";
import _69 from "./Xiaolai-Regular-739bc1a567439c7cffcd1614644593d2.woff2";
import _70 from "./Xiaolai-Regular-72252d73220fa3cd856677888cee1635.woff2";
import _72 from "./Xiaolai-Regular-cf6ff4e0f491ca0cf3038187a997b9b4.woff2";
import _73 from "./Xiaolai-Regular-9cfb2a77a4e45025105ad29a1748b90d.woff2";
import _74 from "./Xiaolai-Regular-450da755d5bcb70906e1295e559b9602.woff2";
import _75 from "./Xiaolai-Regular-0986d134c05864f5025962eef9f994a0.woff2";
import _76 from "./Xiaolai-Regular-1ee544f0f1dac422545c505baa788992.woff2";
import _77 from "./Xiaolai-Regular-4806e761d750087c2d734fc64596eaff.woff2";
import _78 from "./Xiaolai-Regular-33432927cd87d40cfe393c7482bf221f.woff2";
import _79 from "./Xiaolai-Regular-be549ab72f0719d606a5c01e2c0219b6.woff2";
import _81 from "./Xiaolai-Regular-b5c1596551c256e0e9cf02028595b092.woff2";
import _83 from "./Xiaolai-Regular-cf2cc71752631e579e35b0e423bf2638.woff2";
import _84 from "./Xiaolai-Regular-6f3256af8454371776bc46670d33cc65.woff2";
import _85 from "./Xiaolai-Regular-23f228f3999c01983860012330e4be08.woff2";
import _86 from "./Xiaolai-Regular-21430ee05a1248901da8d0de08744d47.woff2";
import _87 from "./Xiaolai-Regular-5330a2119a716e4e7224ed108b085dac.woff2";
import _88 from "./Xiaolai-Regular-cd145ce4a0ea18469358df53c207bc1b.woff2";
import _89 from "./Xiaolai-Regular-36925dfe329a45086cbb7fc5c20d45ac.woff2";
import _90 from "./Xiaolai-Regular-4bfaa8ffa64c5ee560aa2daba7c9cbd3.woff2";
import _91 from "./Xiaolai-Regular-112c051027b2d766c19a519f6ee1f4f7.woff2";
import _92 from "./Xiaolai-Regular-5b0ed6971aaab9c8ad563230bd5471a7.woff2";
import _93 from "./Xiaolai-Regular-98f2ad84457de7f3740d9920b8fa8667.woff2";
import _94 from "./Xiaolai-Regular-733171b4ffcd17ea1fe1c0ba627173bf.woff2";
import _95 from "./Xiaolai-Regular-684d65f1793cac449dde5d59cb3c47fb.woff2";
import _96 from "./Xiaolai-Regular-cbaaefaaf326668277aa24dfa93c4d28.woff2";
import _97 from "./Xiaolai-Regular-58fd02350d0bc52cf1ca3bb32ce9766e.woff2";
import _98 from "./Xiaolai-Regular-7ccce86603f80a099ddb0cb21d4ae3e3.woff2";
import _99 from "./Xiaolai-Regular-3717077e38f98d89eae729b6c14e56dc.woff2";
import _100 from "./Xiaolai-Regular-dbea1af6dcd9860be40c3d18254338f5.woff2";
import _101 from "./Xiaolai-Regular-4a0fdb40036e87b40aa08dd30584cb85.woff2";
import _102 from "./Xiaolai-Regular-0f626226ba1272e832aea87bafd9720e.woff2";
import _103 from "./Xiaolai-Regular-938d90c10ff8c20386af7f242c05d6b0.woff2";
import _104 from "./Xiaolai-Regular-b6d128682ee29e471486354d486a1b90.woff2";
import _106 from "./Xiaolai-Regular-9d81066dd2b337c938df6e90380a00dc.woff2";
import _107 from "./Xiaolai-Regular-20e7bf72fa05de9adf7dbcc7bf51dde6.woff2";
import _108 from "./Xiaolai-Regular-4095eb84ef3874e2600247bee0b04026.woff2";
import _109 from "./Xiaolai-Regular-4ee10ae43505e2e0bc62656ced49c0fa.woff2";
import _110 from "./Xiaolai-Regular-7494dc504ae00ee9cd0505f990f88c5d.woff2";
import _111 from "./Xiaolai-Regular-8de5b863cb50dfefdd07cb11c774d579.woff2";
import _112 from "./Xiaolai-Regular-3e1f8f654357353bf0e04ba5c34b5f7f.woff2";
import _113 from "./Xiaolai-Regular-2e33e8dc771ef5e1d9127d60a6b73679.woff2";
import _114 from "./Xiaolai-Regular-173945821411c09f70c95f98d590e697.woff2";
import _115 from "./Xiaolai-Regular-b358f7a51ece39a3247942b1feabdb29.woff2";
import _116 from "./Xiaolai-Regular-23ad2d71b280f00b1363b95b7bea94eb.woff2";
import _117 from "./Xiaolai-Regular-5882ffa04f32584d26109137e2da4352.woff2";
import _118 from "./Xiaolai-Regular-a203b91dad570bf05a58c3c3ddb529bf.woff2";
import _119 from "./Xiaolai-Regular-bd77e3c7f9e0b072d96af37f73d1aa32.woff2";
import _120 from "./Xiaolai-Regular-5a45d991244d4c7140217e1e5f5ca4f4.woff2";
import _121 from "./Xiaolai-Regular-f56414bf9bced67990def8660e306759.woff2";
import _122 from "./Xiaolai-Regular-583d166e56ba0de4b77eabb47ef67839.woff2";
import _123 from "./Xiaolai-Regular-7f855356ab893b0d2b9c1c83b8116f0e.woff2";
import _124 from "./Xiaolai-Regular-b57aaedfd8ebdf3931f25119dc6a5eb2.woff2";
import _125 from "./Xiaolai-Regular-b6fd38ca30869792244804b04bc058da.woff2";
import _126 from "./Xiaolai-Regular-452225341522a7942f0f6aab1a5c91a3.woff2";
import _127 from "./Xiaolai-Regular-866fa7613df6b3fd272bcfd4530c0bb9.woff2";
import _128 from "./Xiaolai-Regular-52a84a22fd1369bffeaf21da2d6158dc.woff2";
import _129 from "./Xiaolai-Regular-829615148e6357d826b9242eb7fbbd1e.woff2";
import _130 from "./Xiaolai-Regular-c99eda15fc26a2941579560f76c3a5cf.woff2";
import _131 from "./Xiaolai-Regular-395c35dd584b56b0789f58a0559beaf1.woff2";
import _132 from "./Xiaolai-Regular-203b0e569e3b14aac86a003dc3fa523e.woff2";
import _133 from "./Xiaolai-Regular-51a0e808bbc8361236ac521a119758a3.woff2";
import _134 from "./Xiaolai-Regular-6e092f71c1e634059ada0e52abadce67.woff2";
import _135 from "./Xiaolai-Regular-0f7fb1e0d5015bb1371343153ecf7ce3.woff2";
import _136 from "./Xiaolai-Regular-d0cf73942fea1c74edbdf0b3011f4656.woff2";
import _137 from "./Xiaolai-Regular-968cffdc8ee679da094e77ebf50f58ef.woff2";
import _138 from "./Xiaolai-Regular-7a07ddc0f0c0f5f4a9bad6ee3dda66b5.woff2";
import _139 from "./Xiaolai-Regular-ec181b795ac1fb5a50d700b6e996d745.woff2";
import _140 from "./Xiaolai-Regular-cfb211578629b7e8153b37240de6a9d5.woff2";
import _141 from "./Xiaolai-Regular-59e9ff77b0efaf684bc09274fb6908c9.woff2";
import _142 from "./Xiaolai-Regular-2adbc89c11e65905393d3dfc468b9d5b.woff2";
import _143 from "./Xiaolai-Regular-70e811fd7994e61f408c923de6ddd078.woff2";
import _144 from "./Xiaolai-Regular-c4a687ac4f0c2766eefc9f77ed99cddf.woff2";
import _145 from "./Xiaolai-Regular-51502f1206be09c565f1547c406e9558.woff2";
import _146 from "./Xiaolai-Regular-1fdc0c67ed57263a80fd108c1f6ccf24.woff2";
import _147 from "./Xiaolai-Regular-e11567fd2accf9957cd0d3c2be937d87.woff2";
import _148 from "./Xiaolai-Regular-20cc1bbf50e7efb442756cb605672c1f.woff2";
import _149 from "./Xiaolai-Regular-5d2898fbc097a7e24c6f38d80587621e.woff2";
import _150 from "./Xiaolai-Regular-ac9ceb44437becc3e9c4dbfebab7fc2d.woff2";
import _151 from "./Xiaolai-Regular-c16ed9740b85badf16e86ea782a3062f.woff2";
import _152 from "./Xiaolai-Regular-aa0d470430e6391eca720c7cfa44446f.woff2";
import _153 from "./Xiaolai-Regular-f2b54d4e7be0eaefe1c2c56836fa5368.woff2";
import _154 from "./Xiaolai-Regular-99a16ef6a64934d5781933dbd9c46b2e.woff2";
import _155 from "./Xiaolai-Regular-c40533fdf4cc57177b12803598af7e59.woff2";
import _156 from "./Xiaolai-Regular-91ddb2969bf2d31ba02ad82998d1314c.woff2";
import _157 from "./Xiaolai-Regular-774d4f764a1299da5d28ec2f2ffe0d69.woff2";
import _158 from "./Xiaolai-Regular-7718fe60986d8b42b1be9c5ace5ccf25.woff2";
import _159 from "./Xiaolai-Regular-aa5c9ca6cf4fba00433b7aa3fa10671a.woff2";
import _160 from "./Xiaolai-Regular-4f50e5136e136527280bc902c5817561.woff2";
import _162 from "./Xiaolai-Regular-a0ca5df4258213d7fc9fce80f65ce760.woff2";
import _163 from "./Xiaolai-Regular-d2666cbed13462c5dc36fa2f15c202ca.woff2";
import _164 from "./Xiaolai-Regular-1e6fd68f1f3902ce48ce8c69df385622.woff2";
import _165 from "./Xiaolai-Regular-87599f94b6cc129d505b375798d0d751.woff2";
import _167 from "./Xiaolai-Regular-13ae07ed2e272d26d59bc0691cd7117a.woff2";
import _168 from "./Xiaolai-Regular-353f33792a8f60dc69323ddf635a269e.woff2";
import _169 from "./Xiaolai-Regular-0facdf1ea213ba40261022f5d5ed4493.woff2";
import _202 from "./Xiaolai-Regular-f6032fc06eb20480f096199713f70885.woff2";
import _170 from "./Xiaolai-Regular-f8ee5d36068a42b51d0e4a1116cfcec1.woff2";
import _171 from "./Xiaolai-Regular-79d494361ae093b69e74ee9dbe65bfd4.woff2";
import _172 from "./Xiaolai-Regular-74e2263a91439c25b91d5132ce9f4d62.woff2";
import _173 from "./Xiaolai-Regular-ee8bae97908d5147b423f77ad0d3c1bb.woff2";
import _174 from "./Xiaolai-Regular-56467a5c8840c4d23a60b2f935114848.woff2";
import _175 from "./Xiaolai-Regular-145aa02cdd91946e67dc934e1acffe75.woff2";
import _176 from "./Xiaolai-Regular-54acdfc2166ad7fcbd074f75fd4a56ba.woff2";
import _177 from "./Xiaolai-Regular-29cec36cd205b211da97acabaa62f055.woff2";
import _178 from "./Xiaolai-Regular-3756e81d3e149cf6099163ee79944fec.woff2";
import _179 from "./Xiaolai-Regular-8e9f97f01034820170065b2921b4fb5e.woff2";
import _180 from "./Xiaolai-Regular-13d2887ec8ee73c43acdabc52a05af7b.woff2";
import _181 from "./Xiaolai-Regular-72536a3d71b694a0d53dd90ddceae41e.woff2";
import _182 from "./Xiaolai-Regular-603aefd23e350ba7eb124273e3c9bcf1.woff2";
import _184 from "./Xiaolai-Regular-9544732d2e62d1a429674f8ee41b5d3a.woff2";
import _185 from "./Xiaolai-Regular-d3716376641d615e2995605b29bca7b6.woff2";
import _186 from "./Xiaolai-Regular-5a1ce3117cfe90c48e8fb4a9a00f694d.woff2";
import _187 from "./Xiaolai-Regular-b7d203b051eff504ff59ddca7576b6a9.woff2";
import _188 from "./Xiaolai-Regular-4a38cc3e9cf104e69ba246d37f8cf135.woff2";
import _189 from "./Xiaolai-Regular-982b630266d87db93d2539affb1275c6.woff2";
import _190 from "./Xiaolai-Regular-9592bfc861f07bcb8d75c196b370e548.woff2";
import _191 from "./Xiaolai-Regular-a7accba310e821da5505f71c03b76bdb.woff2";
import _192 from "./Xiaolai-Regular-dac48066b5883d8b4551fc584f0c2a3e.woff2";
import _193 from "./Xiaolai-Regular-a1f916d6039285c4ffb900cd654e418f.woff2";
import _194 from "./Xiaolai-Regular-95bfd249da4902577b4b7d76ebdd0b44.woff2";
import _195 from "./Xiaolai-Regular-93fc8f28a33234bcadf1527cafabd502.woff2";
import _196 from "./Xiaolai-Regular-903bb6865f3452e2fda42e3a25547bc5.woff2";
import _197 from "./Xiaolai-Regular-4aca6a43e59aceee2166b0c7e4e85ef1.woff2";
import _198 from "./Xiaolai-Regular-24476a126f129212beb33f66853ea151.woff2";
import _199 from "./Xiaolai-Regular-1b611157cd46bb184d4fa4dae2d6a2b8.woff2";
import _200 from "./Xiaolai-Regular-56a32a7689abd0326e57c10c6c069bb4.woff2";
import _201 from "./Xiaolai-Regular-3cc70dbb64df5b21f1326cc24dee2195.woff2";
import _203 from "./Xiaolai-Regular-e2ead7ea7da0437f085f42ffc05f8d13.woff2";
import _204 from "./Xiaolai-Regular-97f7f48ce90c9429bf32ae51469db74d.woff2";
import _205 from "./Xiaolai-Regular-24a21c1e4449222e8d1898d69ff3a404.woff2";
import _206 from "./Xiaolai-Regular-726303e0774b4e678bff8c2deb6ca603.woff2";
import _207 from "./Xiaolai-Regular-5a7fac4b8b23a6e4e5ba0c9bf1756c91.woff2";
import _208 from "./Xiaolai-Regular-2b7441d46298788ac94e610ffcc709b6.woff2";
```

## File: packages/excalidraw/fonts/ExcalidrawFontFace.ts
```typescript
import { promiseTry, LOCAL_FONT_PROTOCOL } from "@excalidraw/common";
import { subsetWoff2GlyphsByCodepoints } from "../subset/subset-main";
type DataURL = string;
export class ExcalidrawFontFace
⋮----
? `${import.meta.env.PKG_NAME}@${import.meta.env.PKG_VERSION}` // is provided during package build
: "@excalidraw/excalidraw" // fallback to the latest package version (i.e. for app)
⋮----
constructor(family: string, uri: string, descriptors?: FontFaceDescriptors)
public toCSS(characters: string): Promise<string> | undefined
public async getContent(codePoints: Array<number>): Promise<string>
public fetchFont(url: URL | DataURL): Promise<ArrayBuffer>
⋮----
// always prefer cache (even stale), otherwise it always triggers an unnecessary validation request
// which we don't need as we are controlling freshness of the fonts with the stable hash suffix in the url
// https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
⋮----
private getUnicodeRangeRegex()
private static createUrls(uri: string): URL[] | DataURL[]
private static getFormat(url: URL | DataURL)
private static normalizeBaseUrl(baseUrl: string)
⋮----
// in case user passed a root-relative url (~absolute path),
// like "/" or "/some/path", or relative (starts with "./"),
⋮----
// ensure there is a trailing slash, otherwise url won't be correctly concatenated
```

## File: packages/excalidraw/fonts/Fonts.ts
```typescript
import {
  FONT_FAMILY,
  FONT_FAMILY_FALLBACKS,
  CJK_HAND_DRAWN_FALLBACK_FONT,
  WINDOWS_EMOJI_FALLBACK_FONT,
  getFontFamilyFallbacks,
  FONT_SIZES,
} from "@excalidraw/common";
import { getContainerElement } from "@excalidraw/element";
import { charWidth } from "@excalidraw/element";
import { containsCJK } from "@excalidraw/element";
import {
  FONT_METADATA,
  type FontMetadata,
  getFontString,
  PromisePool,
  promiseTry,
} from "@excalidraw/common";
import { ShapeCache } from "@excalidraw/element";
import { isTextElement } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import type { ValueOf } from "@excalidraw/common/utility-types";
import type { Scene } from "@excalidraw/element";
import { CascadiaFontFaces } from "./Cascadia";
import { ComicShannsFontFaces } from "./ComicShanns";
import { EmojiFontFaces } from "./Emoji";
import { ExcalidrawFontFace } from "./ExcalidrawFontFace";
import { ExcalifontFontFaces } from "./Excalifont";
import { HelveticaFontFaces } from "./Helvetica";
import { LiberationFontFaces } from "./Liberation";
import { LilitaFontFaces } from "./Lilita";
import { NunitoFontFaces } from "./Nunito";
import { VirgilFontFaces } from "./Virgil";
import { XiaolaiFontFaces } from "./Xiaolai";
export class Fonts
⋮----
public static get registered()
public get registered()
⋮----
constructor(scene: Scene)
⋮----
public static async generateFontFaceDeclarations(
    elements: readonly ExcalidrawElement[],
)
private static async loadFontFaces(
    fontFamilies: Array<ExcalidrawTextElement["fontFamily"]>,
    charsPerFamily: Record<number, Set<string>>,
)
private static *fontFacesLoader(
    fontFamilies: Array<ExcalidrawTextElement["fontFamily"]>,
    charsPerFamily: Record<number, Set<string>>,
): Generator<Promise<void | readonly [number, FontFace[]]>>
private static *fontFacesStylesGenerator(
    families: Array<number>,
    charsPerFamily: Record<number, Set<string>>,
): Generator<Promise<void | readonly [number, string]>>
private static register(
    this:
      | Fonts
      | {
          registered: Map<
            number,
            { metadata: FontMetadata; fontFaces: ExcalidrawFontFace[] }
          >;
        },
    family: string,
    metadata: FontMetadata,
    ...fontFacesDecriptors: ExcalidrawFontFaceDescriptor[]
)
private static init()
⋮----
const init = (
      family: keyof typeof FONT_FAMILY | keyof typeof FONT_FAMILY_FALLBACKS,
      ...fontFacesDescriptors: ExcalidrawFontFaceDescriptor[]
) =>
⋮----
private static getUniqueFamilies(
    elements: ReadonlyArray<ExcalidrawElement>,
): Array<ExcalidrawTextElement["fontFamily"]>
private static getCharsPerFamily(
    elements: ReadonlyArray<ExcalidrawElement>,
): Record<number, Set<string>>
private static getCharacters(
    charsPerFamily: Record<number, Set<string>>,
    family: number,
)
private static getAllFamilies()
⋮----
export interface ExcalidrawFontFaceDescriptor {
  uri: string;
  descriptors?: FontFaceDescriptors;
}
```

## File: packages/excalidraw/fonts/index.ts
```typescript

```

## File: packages/excalidraw/hooks/useAppStateValue.ts
```typescript
import { useEffect, useRef, useState } from "react";
import { useExcalidrawAPI } from "../components/App";
import { getDefaultAppState } from "../appState";
import type { AppState } from "../types";
type AppStateSelector =
  | keyof AppState
  | (keyof AppState)[]
  | ((appState: AppState) => unknown);
const getSelectedValue = (appState: AppState, selector: AppStateSelector) =>
const getLatestValue = (
  api: ReturnType<typeof useExcalidrawAPI>,
  selector: AppStateSelector,
  _internal: boolean,
) =>
export function useAppStateValue<K extends keyof AppState>(
  prop: K,
  _internal?: boolean,
): AppState[K];
export function useAppStateValue(
  props: (keyof AppState)[],
  _internal?: boolean,
): AppState;
export function useAppStateValue<T>(
  selector: (appState: AppState) => T,
  _internal?: boolean,
): T;
export function useAppStateValue(
  selector: AppStateSelector,
  _internal: boolean = true,
): unknown
export function useOnAppStateChange<K extends keyof AppState>(
  prop: K,
  callback: (value: AppState[K], appState: AppState) => void,
): undefined;
export function useOnAppStateChange(
  props: (keyof AppState)[],
  callback: (props: AppState, appState: AppState) => void,
): undefined;
export function useOnAppStateChange<T>(
  selector: (appState: AppState) => T,
  callback: (value: T, appState: AppState) => void,
): undefined;
export function useOnAppStateChange(
  selector: AppStateSelector,
  callback: (value: any, appState: AppState) => void,
): undefined
```

## File: packages/excalidraw/hooks/useCallbackRefState.ts
```typescript
import { useCallback, useState } from "react";
export const useCallbackRefState = <T>() =>
```

## File: packages/excalidraw/hooks/useCopiedIndicator.ts
```typescript
import { useCallback, useRef, useState } from "react";
⋮----
export const useCopyStatus = () =>
⋮----
const onCopy = () =>
```

## File: packages/excalidraw/hooks/useCreatePortalContainer.ts
```typescript
import { useState, useLayoutEffect } from "react";
import { THEME } from "@excalidraw/common";
import { useEditorInterface, useExcalidrawContainer } from "../components/App";
import { useUIAppState } from "../context/ui-appState";
export const useCreatePortalContainer = (opts?: {
  className?: string;
  parentSelector?: string;
}) =>
```

## File: packages/excalidraw/hooks/useEmitter.ts
```typescript
import { useEffect, useState } from "react";
import type { Emitter } from "@excalidraw/common";
export const useEmitter = <TEvent extends unknown>(
  emitter: Emitter<[TEvent]>,
  initialState: TEvent,
) =>
```

## File: packages/excalidraw/hooks/useLibraryItemSvg.ts
```typescript
import { exportToSvg } from "@excalidraw/utils/export";
import { useEffect, useState } from "react";
import { COLOR_PALETTE } from "@excalidraw/common";
import { atom, useAtom } from "../editor-jotai";
import type { LibraryItem } from "../types";
export type SvgCache = Map<LibraryItem["id"], SVGSVGElement>;
⋮----
const exportLibraryItemToSvg = async (elements: LibraryItem["elements"]) =>
export const useLibraryItemSvg = (
  id: LibraryItem["id"] | null,
  elements: LibraryItem["elements"] | undefined,
  svgCache: SvgCache,
  ref: React.RefObject<HTMLDivElement | null>,
): SVGSVGElement | undefined =>
export const useLibraryCache = () =>
⋮----
const clearLibraryCache = ()
const deleteItemsFromLibraryCache = (items: LibraryItem["id"][]) =>
```

## File: packages/excalidraw/hooks/useOutsideClick.ts
```typescript
import { useEffect } from "react";
import { EVENT } from "@excalidraw/common";
export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: (event: Event & { target: T }) => void,
  isInside?: (
    event: Event & { target: T },
    container: T,
  ) => boolean | undefined,
)
⋮----
function onOutsideClick(event: Event)
```

## File: packages/excalidraw/hooks/useScrollPosition.ts
```typescript
import throttle from "lodash.throttle";
import { useEffect } from "react";
import { atom, useAtom } from "../editor-jotai";
⋮----
export const useScrollPosition = <T extends HTMLElement>(
  elementRef: React.RefObject<T | null>,
) =>
```

## File: packages/excalidraw/hooks/useStable.ts
```typescript
import { useRef } from "react";
export const useStable = <T extends Record<string, any>>(value: T) =>
```

## File: packages/excalidraw/hooks/useStableCallback.ts
```typescript
import { useRef } from "react";
export const useStableCallback = <T extends (...args: any[]) => any>(
  userFn: T,
) =>
```

## File: packages/excalidraw/hooks/useTextEditorFocus.ts
```typescript
import { useState, useCallback } from "react";
export type CaretPosition = {
  start: number;
  end: number;
};
const getTextEditor = (): HTMLTextAreaElement | null =>
export const saveCaretPosition = (): CaretPosition | null =>
export const restoreCaretPosition = (position: CaretPosition | null): void =>
export const withCaretPositionPreservation = (
  callback: () => void,
  isCompactMode: boolean,
  isEditingText: boolean,
  onPreventClose?: () => void,
): void =>
export const useTextEditorFocus = () =>
export const temporarilyDisableTextEditorBlur = (
  duration: number = 100,
): void =>
```

## File: packages/excalidraw/hooks/useTransition.ts
```typescript
import React, { useCallback } from "react";
function useTransitionPolyfill()
```

## File: packages/excalidraw/lasso/index.ts
```typescript
import {
  type GlobalPoint,
  type LineSegment,
  pointFrom,
} from "@excalidraw/math";
import { getElementLineSegments } from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import {
  isFrameLikeElement,
  isLinearElement,
  isTextElement,
} from "@excalidraw/element";
import { getFrameChildren } from "@excalidraw/element";
import { selectGroupsForSelectedElements } from "@excalidraw/element";
import { getContainerElement } from "@excalidraw/element";
import { arrayToMap, easeOut, isShallowEqual } from "@excalidraw/common";
import type {
  ExcalidrawElement,
  ExcalidrawLinearElement,
  NonDeleted,
} from "@excalidraw/element/types";
import { type AnimationFrameHandler } from "../animation-frame-handler";
import { AnimatedTrail } from "../animated-trail";
import { getLassoSelectedElementIds } from "./utils";
import type App from "../components/App";
type CanvasTranslate = {
  scrollX: number;
  scrollY: number;
  zoom: number;
};
export class LassoTrail extends AnimatedTrail
⋮----
constructor(animationFrameHandler: AnimationFrameHandler, app: App)
startPath(x: number, y: number, keepPreviousSelection = false)
⋮----
endPath(): void
```

## File: packages/excalidraw/lasso/utils.ts
```typescript
import { simplify } from "points-on-curve";
import {
  polygonFromPoints,
  lineSegment,
  polygonIncludesPointNonZero,
} from "@excalidraw/math";
import { type Bounds } from "@excalidraw/common";
import {
  computeBoundTextPosition,
  doBoundsIntersect,
  getBoundTextElement,
  getElementBounds,
  intersectElementWithLineSegment,
} from "@excalidraw/element";
import type { ElementsSegmentsMap, GlobalPoint } from "@excalidraw/math/types";
import type { ElementsMap, ExcalidrawElement } from "@excalidraw/element/types";
export const getLassoSelectedElementIds = (input: {
  lassoPath: GlobalPoint[];
  elements: readonly ExcalidrawElement[];
  elementsMap: ElementsMap;
  elementsSegments: ElementsSegmentsMap;
  intersectedElements: Set<ExcalidrawElement["id"]>;
  enclosedElements: Set<ExcalidrawElement["id"]>;
  simplifyDistance?: number;
}):
const enclosureTest = (
  lassoPath: GlobalPoint[],
  element: ExcalidrawElement,
  elementsSegments: ElementsSegmentsMap,
): boolean =>
const intersectionTest = (
  lassoPath: GlobalPoint[],
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
): boolean =>
```

## File: packages/excalidraw/renderer/animation.ts
```typescript
import { isRenderThrottlingEnabled } from "../reactUtils";
export type Animation<R extends object> = (params: {
  deltaTime: number;
  state?: R;
}) => R | null | undefined;
export class AnimationController
⋮----
static start<R extends object>(key: string, animation: Animation<R>)
private static tick()
static running(key: string)
static cancel(key: string)
```

## File: packages/excalidraw/renderer/helpers.ts
```typescript
import { THEME, applyDarkModeFilter } from "@excalidraw/common";
import type { StaticCanvasRenderConfig } from "../scene/types";
import type { AppState, StaticCanvasAppState } from "../types";
export const fillCircle = (
  context: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  stroke: boolean,
  fill = true,
) =>
export const getNormalizedCanvasDimensions = (
  canvas: HTMLCanvasElement,
  scale: number,
): [number, number] =>
export const bootstrapCanvas = ({
  canvas,
  scale,
  normalizedWidth,
  normalizedHeight,
  theme,
  isExporting,
  viewBackgroundColor,
}: {
  canvas: HTMLCanvasElement;
  scale: number;
  normalizedWidth: number;
  normalizedHeight: number;
  theme?: AppState["theme"];
  isExporting?: StaticCanvasRenderConfig["isExporting"];
  viewBackgroundColor?: StaticCanvasAppState["viewBackgroundColor"];
}): CanvasRenderingContext2D =>
export const strokeRectWithRotation_simple = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  cx: number,
  cy: number,
  angle: number,
  fill: boolean = false,
  radius: number = 0,
) =>
```

## File: packages/excalidraw/renderer/interactiveScene.ts
```typescript
import {
  clamp,
  pointFrom,
  pointsEqual,
  type GlobalPoint,
  type LocalPoint,
  type Radians,
  bezierEquation,
  pointRotateRads,
  pointDistance,
} from "@excalidraw/math";
import {
  arrayToMap,
  BIND_MODE_TIMEOUT,
  DEFAULT_TRANSFORM_HANDLE_SPACING,
  FRAME_STYLE,
  getFeatureFlag,
  invariant,
  THEME,
} from "@excalidraw/common";
import {
  deconstructDiamondElement,
  deconstructRectanguloidElement,
  elementCenterPoint,
  getDiamondBaseCorners,
  FOCUS_POINT_SIZE,
  getOmitSidesForEditorInterface,
  getTransformHandles,
  getTransformHandlesFromCoords,
  hasBoundingBox,
  hitElementItself,
  isArrowElement,
  isBindableElement,
  isElbowArrow,
  isFrameLikeElement,
  isImageElement,
  isLinearElement,
  isLineElement,
  maxBindingDistance_simple,
  isTextElement,
  LinearElementEditor,
  getActiveTextElement,
} from "@excalidraw/element";
import { renderSelectionElement } from "@excalidraw/element";
import {
  getElementsInGroup,
  getSelectedGroupIds,
  isSelectedViaGroup,
  selectGroupsFromGivenElements,
} from "@excalidraw/element";
import { getCommonBounds, getElementAbsoluteCoords } from "@excalidraw/element";
import {
  getGlobalFixedPointForBindableElement,
  isFocusPointVisible,
} from "@excalidraw/element";
import type { EditorInterface } from "@excalidraw/common";
import type {
  TransformHandles,
  TransformHandleType,
} from "@excalidraw/element";
import type {
  ElementsMap,
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  ExcalidrawElement,
  ExcalidrawFrameLikeElement,
  ExcalidrawImageElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
  GroupId,
  NonDeleted,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import { renderSnaps } from "../renderer/renderSnaps";
import { roundRect } from "../renderer/roundRect";
import {
  getScrollBars,
  SCROLLBAR_COLOR,
  SCROLLBAR_WIDTH,
} from "../scene/scrollbars";
import { getClientColor, renderRemoteCursors } from "../clients";
import {
  getTextAutoResizeHandle,
  getTextBoxPadding,
} from "../textAutoResizeHandle";
import {
  bootstrapCanvas,
  fillCircle,
  getNormalizedCanvasDimensions,
  strokeRectWithRotation_simple,
} from "./helpers";
import type {
  AppState,
  AppClassProperties,
  InteractiveCanvasAppState,
} from "../types";
import type {
  InteractiveCanvasRenderConfig,
  InteractiveSceneRenderConfig,
  RenderableElementsMap,
} from "../scene/types";
const renderElbowArrowMidPointHighlight = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
) =>
const renderLinearElementPointHighlight = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  elementsMap: ElementsMap,
) =>
const highlightPoint = <Point extends LocalPoint | GlobalPoint>(
  point: Point,
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
) =>
const renderFocusPointHighlight = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  focusPoint: GlobalPoint,
) =>
const renderSingleLinearPoint = <Point extends GlobalPoint | LocalPoint>(
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  point: Point,
  radius: number,
  isSelected: boolean,
  isPhantomPoint: boolean,
  isOverlappingPoint: boolean,
) =>
const renderBindingHighlightForBindableElement_simple = (
  context: CanvasRenderingContext2D,
  suggestedBinding: NonNullable<AppState["suggestedBinding"]>,
  elementsMap: ElementsMap,
  appState: InteractiveCanvasAppState,
  pointerCoords: GlobalPoint | null,
) =>
const renderBindingHighlightForBindableElement_complex = (
  app: AppClassProperties,
  context: CanvasRenderingContext2D,
  element: ExcalidrawBindableElement,
  allElementsMap: NonDeletedSceneElementsMap,
  appState: InteractiveCanvasAppState,
  deltaTime: number,
  state?: { runtime: number },
) =>
const renderBindingHighlightForBindableElement = (
  app: AppClassProperties,
  context: CanvasRenderingContext2D,
  suggestedBinding: AppState["suggestedBinding"],
  allElementsMap: NonDeletedSceneElementsMap,
  appState: InteractiveCanvasAppState,
  deltaTime: number,
  state?: { runtime: number },
) =>
type ElementSelectionBorder = {
  angle: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  selectionColors: string[];
  dashed?: boolean;
  cx: number;
  cy: number;
  activeEmbeddable: boolean;
  padding?: number;
};
const renderSelectionBorder = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  elementProperties: ElementSelectionBorder,
) =>
const renderFrameHighlight = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  frame: NonDeleted<ExcalidrawFrameLikeElement>,
  elementsMap: ElementsMap,
) =>
const renderElementsBoxHighlight = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  elements: NonDeleted<ExcalidrawElement>[],
  config?: { colors?: string[]; dashed?: boolean },
) =>
⋮----
const getSelectionFromElements = (elements: ExcalidrawElement[]) =>
const getSelectionForGroupId = (groupId: GroupId) =>
⋮----
const renderLinearPointHandles = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  element: NonDeleted<ExcalidrawLinearElement>,
  elementsMap: RenderableElementsMap,
) =>
const renderFocusPointConnectionLine = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  fromPoint: GlobalPoint,
  toPoint: GlobalPoint,
) =>
const renderFocusPointCicle = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  point: GlobalPoint,
  radius: number,
  isHovered: boolean,
) =>
const renderFocusPointIndicator = ({
  arrow,
  appState,
  type,
  context,
  elementsMap,
}: {
  arrow: NonDeleted<ExcalidrawArrowElement>;
  appState: InteractiveCanvasAppState;
  context: CanvasRenderingContext2D;
  elementsMap: NonDeletedSceneElementsMap;
  type: "start" | "end";
}) =>
const renderTransformHandles = (
  context: CanvasRenderingContext2D,
  renderConfig: InteractiveCanvasRenderConfig,
  appState: InteractiveCanvasAppState,
  transformHandles: TransformHandles,
  angle: number,
): void =>
const renderCropHandles = (
  context: CanvasRenderingContext2D,
  renderConfig: InteractiveCanvasRenderConfig,
  appState: InteractiveCanvasAppState,
  croppingElement: ExcalidrawImageElement,
  elementsMap: ElementsMap,
): void =>
const renderTextBox = (
  text: NonDeleted<ExcalidrawTextElement>,
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  selectionColor: InteractiveCanvasRenderConfig["selectionColor"],
) =>
const renderResetAutoResizeHandle = (
  text: NonDeleted<ExcalidrawTextElement>,
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
  selectionColor: InteractiveCanvasRenderConfig["selectionColor"],
  formFactor: EditorInterface["formFactor"],
) =>
const _renderInteractiveScene = ({
  app,
  canvas,
  elementsMap,
  visibleElements,
  selectedElements,
  allElementsMap,
  scale,
  appState,
  renderConfig,
  editorInterface,
  animationState,
  deltaTime,
}: InteractiveSceneRenderConfig):
⋮----
const addSelectionForGroupId = (groupId: GroupId) =>
⋮----
export const renderInteractiveScene = <
  U extends typeof _renderInteractiveScene,
>(
  renderConfig: InteractiveSceneRenderConfig,
): ReturnType<U> =>
```

## File: packages/excalidraw/renderer/renderNewElementScene.ts
```typescript
import { throttleRAF } from "@excalidraw/common";
import {
  getTargetFrame,
  isInvisiblySmallElement,
  renderElement,
  shouldApplyFrameClip,
} from "@excalidraw/element";
import { bootstrapCanvas, getNormalizedCanvasDimensions } from "./helpers";
import { frameClip } from "./staticScene";
import type { NewElementSceneRenderConfig } from "../scene/types";
const _renderNewElementScene = ({
  canvas,
  rc,
  newElement,
  elementsMap,
  allElementsMap,
  scale,
  appState,
  renderConfig,
}: NewElementSceneRenderConfig) =>
⋮----
export const renderNewElementScene = (
  renderConfig: NewElementSceneRenderConfig,
  throttle?: boolean,
) =>
```

## File: packages/excalidraw/renderer/renderSnaps.ts
```typescript
import { pointFrom, type GlobalPoint, type LocalPoint } from "@excalidraw/math";
import { THEME } from "@excalidraw/common";
import type { PointSnapLine, PointerSnapLine } from "../snapping";
import type { InteractiveCanvasAppState } from "../types";
⋮----
export const renderSnaps = (
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
) =>
const drawPointsSnapLine = (
  pointSnapLine: PointSnapLine,
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
) =>
const drawPointerSnapLine = (
  pointerSnapLine: PointerSnapLine,
  context: CanvasRenderingContext2D,
  appState: InteractiveCanvasAppState,
) =>
const drawCross = <Point extends LocalPoint | GlobalPoint>(
  [x, y]: Point,
  appState: InteractiveCanvasAppState,
  context: CanvasRenderingContext2D,
) =>
const drawLine = <Point extends LocalPoint | GlobalPoint>(
  from: Point,
  to: Point,
  context: CanvasRenderingContext2D,
) =>
const drawGapLine = <Point extends LocalPoint | GlobalPoint>(
  from: Point,
  to: Point,
  direction: "horizontal" | "vertical",
  appState: InteractiveCanvasAppState,
  context: CanvasRenderingContext2D,
) =>
```

## File: packages/excalidraw/renderer/roundRect.ts
```typescript
export const roundRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  strokeColor?: string,
) =>
```

## File: packages/excalidraw/renderer/staticScene.ts
```typescript
import {
  applyDarkModeFilter,
  FRAME_STYLE,
  THEME,
  throttleRAF,
} from "@excalidraw/common";
import { isElementLink } from "@excalidraw/element";
import { createPlaceholderEmbeddableLabel } from "@excalidraw/element";
import { getBoundTextElement } from "@excalidraw/element";
import {
  isEmbeddableElement,
  isIframeLikeElement,
  isTextElement,
} from "@excalidraw/element";
import {
  elementOverlapsWithFrame,
  getTargetFrame,
  shouldApplyFrameClip,
} from "@excalidraw/element";
import { renderElement } from "@excalidraw/element";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import type {
  ElementsMap,
  ExcalidrawFrameLikeElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import {
  EXTERNAL_LINK_IMG,
  ELEMENT_LINK_IMG,
  getLinkHandleFromCoords,
} from "../components/hyperlink/helpers";
import { bootstrapCanvas, getNormalizedCanvasDimensions } from "./helpers";
import type {
  StaticCanvasRenderConfig,
  StaticSceneRenderConfig,
} from "../scene/types";
import type { StaticCanvasAppState, Zoom } from "../types";
⋮----
const strokeGrid = (
  context: CanvasRenderingContext2D,
  gridSize: number,
  gridStep: number,
  scrollX: number,
  scrollY: number,
  zoom: Zoom,
  theme: StaticCanvasRenderConfig["theme"],
  width: number,
  height: number,
) =>
export const frameClip = (
  frame: ExcalidrawFrameLikeElement,
  context: CanvasRenderingContext2D,
  renderConfig: StaticCanvasRenderConfig,
  appState: StaticCanvasAppState,
) =>
type LinkIconCanvas = HTMLCanvasElement & { zoom: number };
⋮----
const renderLinkIcon = (
  element: NonDeletedExcalidrawElement,
  context: CanvasRenderingContext2D,
  appState: StaticCanvasAppState,
  elementsMap: ElementsMap,
) =>
const _renderStaticScene = ({
  canvas,
  rc,
  elementsMap,
  allElementsMap,
  visibleElements,
  scale,
  appState,
  renderConfig,
}: StaticSceneRenderConfig) =>
⋮----
const render = () =>
⋮----
export const renderStaticScene = (
  renderConfig: StaticSceneRenderConfig,
  throttle?: boolean,
) =>
```

## File: packages/excalidraw/renderer/staticSvgScene.ts
```typescript
import {
  FRAME_STYLE,
  MAX_DECIMALS_FOR_SVG_EXPORT,
  SVG_NS,
  THEME,
  DARK_THEME_FILTER,
  getFontFamilyString,
  isRTL,
  isTestEnv,
  getVerticalOffset,
  applyDarkModeFilter,
  MIME_TYPES,
} from "@excalidraw/common";
import { normalizeLink, toValidURL } from "@excalidraw/common";
import { hashString } from "@excalidraw/element";
import { getUncroppedWidthAndHeight } from "@excalidraw/element";
import {
  createPlaceholderEmbeddableLabel,
  getEmbedLink,
} from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import { getBoundTextElement, getContainerElement } from "@excalidraw/element";
import { getLineHeightInPx } from "@excalidraw/element";
import {
  isArrowElement,
  isIframeLikeElement,
  isInitializedImageElement,
  isTextElement,
} from "@excalidraw/element";
import { getContainingFrame } from "@excalidraw/element";
import { getCornerRadius, isPathALoop } from "@excalidraw/element";
import { ShapeCache } from "@excalidraw/element";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawTextElementWithContainer,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import type { RenderableElementsMap, SVGRenderConfig } from "../scene/types";
import type { AppState, BinaryFiles } from "../types";
import type { Drawable } from "roughjs/bin/core";
import type { RoughSVG } from "roughjs/bin/svg";
const roughSVGDrawWithPrecision = (
  rsvg: RoughSVG,
  drawable: Drawable,
  precision?: number,
) =>
const maybeWrapNodesInFrameClipPath = (
  element: NonDeletedExcalidrawElement,
  root: SVGElement,
  nodes: SVGElement[],
  frameRendering: AppState["frameRendering"],
  elementsMap: RenderableElementsMap,
) =>
const renderElementToSvg = (
  element: NonDeletedExcalidrawElement,
  elementsMap: RenderableElementsMap,
  rsvg: RoughSVG,
  svgRoot: SVGElement,
  files: BinaryFiles,
  offsetX: number,
  offsetY: number,
  renderConfig: SVGRenderConfig,
) =>
⋮----
const addToRoot = (node: SVGElement, element: ExcalidrawElement) =>
⋮----
// if rendering embeddables explicitly disabled or
// embedding documents via srcdoc (which doesn't seem to work for SVGs)
// replace with a link instead
⋮----
export const renderSceneToSvg = (
  elements: readonly NonDeletedExcalidrawElement[],
  elementsMap: RenderableElementsMap,
  rsvg: RoughSVG,
  svgRoot: SVGElement,
  files: BinaryFiles,
  renderConfig: SVGRenderConfig,
) =>
```

## File: packages/excalidraw/scene/export.ts
```typescript
import rough from "roughjs/bin/rough";
import {
  DEFAULT_EXPORT_PADDING,
  FRAME_STYLE,
  FONT_FAMILY,
  SVG_NS,
  THEME,
  MIME_TYPES,
  EXPORT_DATA_TYPES,
  arrayToMap,
  distance,
  getFontString,
  toBrandedType,
  applyDarkModeFilter,
} from "@excalidraw/common";
import { getCommonBounds, getElementAbsoluteCoords } from "@excalidraw/element";
import {
  getInitializedImageElements,
  updateImageCache,
} from "@excalidraw/element";
import { newElementWith } from "@excalidraw/element";
import { isFrameLikeElement } from "@excalidraw/element";
import {
  getElementsOverlappingFrame,
  getFrameLikeElements,
  getFrameLikeTitle,
  getRootElements,
} from "@excalidraw/element";
import { syncInvalidIndices } from "@excalidraw/element";
import { type Mutable } from "@excalidraw/common/utility-types";
import { newTextElement } from "@excalidraw/element";
import type { Bounds } from "@excalidraw/common";
import type {
  ExcalidrawElement,
  ExcalidrawFrameLikeElement,
  ExcalidrawTextElement,
  NonDeletedExcalidrawElement,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import { getDefaultAppState } from "../appState";
import { base64ToString, decode, encode, stringToBase64 } from "../data/encode";
import { serializeAsJSON } from "../data/json";
import { Fonts } from "../fonts";
import { renderStaticScene } from "../renderer/staticScene";
import { renderSceneToSvg } from "../renderer/staticSvgScene";
import type { RenderableElementsMap } from "./types";
import type { AppState, BinaryFiles } from "../types";
const truncateText = (element: ExcalidrawTextElement, maxWidth: number) =>
const addFrameLabelsAsTextElements = (
  elements: readonly NonDeletedExcalidrawElement[],
  opts: Pick<AppState, "exportWithDarkMode">,
) =>
const getFrameRenderingConfig = (
  exportingFrame: ExcalidrawFrameLikeElement | null,
  frameRendering: AppState["frameRendering"] | null,
): AppState["frameRendering"] =>
const prepareElementsForRender = ({
  elements,
  exportingFrame,
  frameRendering,
  exportWithDarkMode,
}: {
  elements: readonly ExcalidrawElement[];
  exportingFrame: ExcalidrawFrameLikeElement | null | undefined;
  frameRendering: AppState["frameRendering"];
  exportWithDarkMode: AppState["exportWithDarkMode"];
}) =>
export const exportToCanvas = async (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: AppState,
  files: BinaryFiles,
  {
    exportBackground,
    exportPadding = DEFAULT_EXPORT_PADDING,
    viewBackgroundColor,
    exportingFrame,
  }: {
    exportBackground: boolean;
    exportPadding?: number;
    viewBackgroundColor: string;
    exportingFrame?: ExcalidrawFrameLikeElement | null;
  },
  createCanvas: (
    width: number,
    height: number,
) =>
const createHTMLComment = (text: string) =>
export const exportToSvg = async (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: {
    exportBackground: boolean;
    exportPadding?: number;
    exportScale?: number;
    viewBackgroundColor: string;
    exportWithDarkMode?: boolean;
    exportEmbedScene?: boolean;
    frameRendering?: AppState["frameRendering"];
  },
  files: BinaryFiles | null,
  opts?: {
    renderEmbeddables?: boolean;
    exportingFrame?: ExcalidrawFrameLikeElement | null;
    skipInliningFonts?: true;
    reuseImages?: boolean;
  },
): Promise<SVGSVGElement> =>
export const encodeSvgBase64Payload = ({
  payload,
  metadataElement,
}: {
  payload: string;
  metadataElement: SVGMetadataElement;
}) =>
export const decodeSvgBase64Payload = (
const getCanvasSize = (
  elements: readonly NonDeletedExcalidrawElement[],
  exportPadding: number,
): Bounds =>
export const getExportSize = (
  elements: readonly NonDeletedExcalidrawElement[],
  exportPadding: number,
  scale: number,
): [number, number] =>
```

## File: packages/excalidraw/scene/index.ts
```typescript

```

## File: packages/excalidraw/scene/normalize.ts
```typescript
import { MAX_ZOOM, MIN_ZOOM } from "@excalidraw/common";
import { clamp, round } from "@excalidraw/math";
import type { NormalizedZoomValue } from "../types";
export const getNormalizedZoom = (zoom: number): NormalizedZoomValue =>
export const getNormalizedGridSize = (gridStep: number) =>
export const getNormalizedGridStep = (gridStep: number) =>
```

## File: packages/excalidraw/scene/Renderer.ts
```typescript
import { isElementInViewport } from "@excalidraw/element";
import { memoize, toBrandedType } from "@excalidraw/common";
import type {
  ExcalidrawElement,
  NonDeletedElementsMap,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import { renderStaticSceneThrottled } from "../renderer/staticScene";
import type { RenderableElementsMap } from "./types";
import type { AppState } from "../types";
export class Renderer
⋮----
constructor(scene: Scene)
⋮----
const getVisibleCanvasElements = ({
      elementsMap,
      zoom,
      offsetLeft,
      offsetTop,
      scrollX,
      scrollY,
      height,
      width,
    }: {
      elementsMap: NonDeletedElementsMap;
      zoom: AppState["zoom"];
      offsetLeft: AppState["offsetLeft"];
      offsetTop: AppState["offsetTop"];
      scrollX: AppState["scrollX"];
      scrollY: AppState["scrollY"];
      height: AppState["height"];
      width: AppState["width"];
}): readonly NonDeletedExcalidrawElement[] =>
const getRenderableElements = ({
      elements,
      editingTextElement,
      newElementId,
    }: {
      elements: readonly NonDeletedExcalidrawElement[];
      editingTextElement: AppState["editingTextElement"];
      newElementId: ExcalidrawElement["id"] | undefined;
}) =>
⋮----
public destroy()
```

## File: packages/excalidraw/scene/scroll.ts
```typescript
import { getVisibleElements } from "@excalidraw/element";
import {
  sceneCoordsToViewportCoords,
  viewportCoordsToSceneCoords,
} from "@excalidraw/common";
import { getClosestElementBounds } from "@excalidraw/element";
import { getCommonBounds } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { AppState, Offsets, PointerCoords, Zoom } from "../types";
const isOutsideViewPort = (appState: AppState, cords: Array<number>) =>
export const centerScrollOn = ({
  scenePoint,
  viewportDimensions,
  zoom,
  offsets,
}: {
  scenePoint: PointerCoords;
  viewportDimensions: { height: number; width: number };
  zoom: Zoom;
  offsets?: Offsets;
}) =>
export const calculateScrollCenter = (
  elements: readonly ExcalidrawElement[],
  appState: AppState,
):
```

## File: packages/excalidraw/scene/scrollbars.ts
```typescript
import { getGlobalCSSVariable } from "@excalidraw/common";
import { getCommonBounds } from "@excalidraw/element";
import { getLanguage } from "../i18n";
import type { InteractiveCanvasAppState } from "../types";
import type { RenderableElementsMap, ScrollBars } from "./types";
⋮----
export const getScrollBars = (
  elements: RenderableElementsMap,
  viewportWidth: number,
  viewportHeight: number,
  appState: InteractiveCanvasAppState,
): ScrollBars =>
export const isOverScrollBars = (
  scrollBars: ScrollBars,
  x: number,
  y: number,
):
```

## File: packages/excalidraw/scene/types.ts
```typescript
import type { UserIdleState, EditorInterface } from "@excalidraw/common";
import type {
  ExcalidrawElement,
  NonDeletedElementsMap,
  NonDeletedExcalidrawElement,
  NonDeletedSceneElementsMap,
} from "@excalidraw/element/types";
import type { MakeBrand } from "@excalidraw/common/utility-types";
import type {
  AppClassProperties,
  AppState,
  EmbedsValidationStatus,
  ElementsPendingErasure,
  InteractiveCanvasAppState,
  StaticCanvasAppState,
  SocketId,
  PendingExcalidrawElements,
} from "../types";
import type { RoughCanvas } from "roughjs/bin/canvas";
import type { Drawable } from "roughjs/bin/core";
export type RenderableElementsMap = NonDeletedElementsMap &
  MakeBrand<"RenderableElementsMap">;
export type StaticCanvasRenderConfig = {
  canvasBackgroundColor: AppState["viewBackgroundColor"];
  imageCache: AppClassProperties["imageCache"];
  renderGrid: boolean;
  isExporting: boolean;
  embedsValidationStatus: EmbedsValidationStatus;
  elementsPendingErasure: ElementsPendingErasure;
  pendingFlowchartNodes: PendingExcalidrawElements | null;
  theme: AppState["theme"];
};
export type SVGRenderConfig = {
  offsetX: number;
  offsetY: number;
  isExporting: boolean;
  exportWithDarkMode: boolean;
  renderEmbeddables: boolean;
  frameRendering: AppState["frameRendering"];
  canvasBackgroundColor: AppState["viewBackgroundColor"];
  embedsValidationStatus: EmbedsValidationStatus;
  reuseImages: boolean;
  theme: AppState["theme"];
};
export type InteractiveCanvasRenderConfig = {
  remoteSelectedElementIds: Map<ExcalidrawElement["id"], SocketId[]>;
  remotePointerViewportCoords: Map<SocketId, { x: number; y: number }>;
  remotePointerUserStates: Map<SocketId, UserIdleState>;
  remotePointerUsernames: Map<SocketId, string>;
  remotePointerButton: Map<SocketId, string | undefined>;
  selectionColor: string;
  lastViewportPosition: { x: number; y: number };
  renderScrollbars?: boolean;
};
export type RenderInteractiveSceneCallback = {
  atLeastOneVisibleElement: boolean;
  elementsMap: RenderableElementsMap;
  scrollBars?: ScrollBars;
};
export type StaticSceneRenderConfig = {
  canvas: HTMLCanvasElement;
  rc: RoughCanvas;
  elementsMap: RenderableElementsMap;
  allElementsMap: NonDeletedSceneElementsMap;
  visibleElements: readonly NonDeletedExcalidrawElement[];
  scale: number;
  appState: StaticCanvasAppState;
  renderConfig: StaticCanvasRenderConfig;
};
export type InteractiveSceneRenderAnimationState = {
  bindingHighlight: { runtime: number } | undefined;
};
export type InteractiveSceneRenderConfig = {
  app: AppClassProperties;
  canvas: HTMLCanvasElement | null;
  elementsMap: RenderableElementsMap;
  visibleElements: readonly NonDeletedExcalidrawElement[];
  selectedElements: readonly NonDeletedExcalidrawElement[];
  allElementsMap: NonDeletedSceneElementsMap;
  scale: number;
  appState: InteractiveCanvasAppState;
  renderConfig: InteractiveCanvasRenderConfig;
  editorInterface: EditorInterface;
  callback: (data: RenderInteractiveSceneCallback) => void;
  animationState?: InteractiveSceneRenderAnimationState;
  deltaTime: number;
};
export type NewElementSceneRenderConfig = {
  canvas: HTMLCanvasElement | null;
  rc: RoughCanvas;
  newElement: ExcalidrawElement | null;
  elementsMap: RenderableElementsMap;
  allElementsMap: NonDeletedSceneElementsMap;
  scale: number;
  appState: AppState;
  renderConfig: StaticCanvasRenderConfig;
};
export type SceneScroll = {
  scrollX: number;
  scrollY: number;
};
export type ExportType =
  | "png"
  | "clipboard"
  | "clipboard-svg"
  | "backend"
  | "svg";
export type ScrollBars = {
  horizontal: {
    x: number;
    y: number;
    width: number;
    height: number;
    deltaMultiplier: number;
  } | null;
  vertical: {
    x: number;
    y: number;
    width: number;
    height: number;
    deltaMultiplier: number;
  } | null;
};
export type SVGPathString = string & { __brand: "SVGPathString" };
export type ElementShape =
  | Drawable
  | Drawable[]
  | Path2D
  | (Drawable | SVGPathString)[]
  | null;
export type ElementShapes = {
  rectangle: Drawable;
  ellipse: Drawable;
  diamond: Drawable;
  iframe: Drawable;
  embeddable: Drawable;
  freedraw: (Drawable | SVGPathString)[];
  arrow: Drawable[];
  line: Drawable[];
  text: null;
  image: null;
  frame: null;
  magicframe: null;
};
```

## File: packages/excalidraw/scene/zoom.ts
```typescript
import type { AppState, NormalizedZoomValue } from "../types";
export const getStateForZoom = (
  {
    viewportX,
    viewportY,
    nextZoom,
  }: {
    viewportX: number;
    viewportY: number;
    nextZoom: NormalizedZoomValue;
  },
  appState: AppState,
) =>
```

## File: packages/excalidraw/subset/harfbuzz/harfbuzz-bindings.ts
```typescript
function subset(
  hbSubsetWasm: any,
  heapu8: Uint8Array,
  font: ArrayBuffer,
  codePoints: ReadonlySet<number>,
)
```

## File: packages/excalidraw/subset/harfbuzz/harfbuzz-loader.ts
```typescript
import bindings from "./harfbuzz-bindings";
import binary from "./harfbuzz-wasm";
⋮----
const load = (): Promise<
```

## File: packages/excalidraw/subset/harfbuzz/harfbuzz-wasm.ts
```typescript

```

## File: packages/excalidraw/subset/woff2/woff2-bindings.ts
```typescript
function locateFile(path)
⋮----
get()
⋮----
function warnOnce(text)
⋮----
debugger()
⋮----
function assert(condition, text)
function getCFunc(ident)
function ccall(ident, returnType, argTypes, args, opts)
⋮----
string(str)
array(arr)
⋮----
function convertReturnValue(ret)
⋮----
function cwrap(ident, returnType, argTypes, opts)
⋮----
function UTF8ArrayToString(u8Array, idx, maxBytesToRead)
function UTF8ToString(ptr, maxBytesToRead)
function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite)
function stringToUTF8(str, outPtr, maxBytesToWrite)
function lengthBytesUTF8(str)
⋮----
function writeArrayToMemory(array, buffer)
⋮----
function alignUp(x, multiple)
⋮----
function updateGlobalBufferAndViews(buf)
⋮----
function writeStackCookie()
function checkStackCookie()
function abortStackOverflow(allocSize)
⋮----
function abortFnPtrError(ptr, sig)
function callRuntimeCallbacks(callbacks)
⋮----
function preRun()
function initRuntime()
function preMain()
function exitRuntime()
function postRun()
function addOnPreRun(cb)
function addOnPostRun(cb)
⋮----
function addRunDependency(id)
function removeRunDependency(id)
⋮----
function abort(what)
⋮----
error()
init()
createDataFile()
createPreloadedFile()
createLazyFile()
open()
mkdev()
registerDevice()
analyzePath()
loadFilesFromDB()
⋮----
function isDataURI(filename)
⋮----
function getBinary()
function getBinaryPromise()
function createWasm()
⋮----
function receiveInstance(instance, module)
⋮----
function receiveInstantiatedSource(output)
function instantiateArrayBuffer(receiver)
function instantiateAsync()
⋮----
func()
⋮----
function demangle(func)
function demangleAll(text)
function jsStackTrace()
function stackTrace()
function ___assert_fail(condition, filename, line, func)
function ___cxa_allocate_exception(size)
⋮----
function ___cxa_throw(ptr, type, destructor)
function ___lock()
function ___unlock()
⋮----
splitPath(filename)
normalizeArray(parts, allowAboveRoot)
normalize(path)
dirname(path)
basename(path)
extname(path)
join()
join2(l, r)
⋮----
printChar(stream, curr)
⋮----
get(varargs)
getStr()
get64()
getZero()
⋮----
function _fd_close(fd)
function ___wasi_fd_close()
function _fd_seek(fd, offset_low, offset_high, whence, newOffset)
function ___wasi_fd_seek()
function flush_NO_FILESYSTEM()
function _fd_write(fd, iov, iovcnt, pnum)
function ___wasi_fd_write()
function getShiftFromSize(size)
function embind_init_charCodes()
⋮----
function readLatin1String(ptr)
⋮----
function makeLegalFunctionName(name)
function createNamedFunction(name, body)
function extendError(baseErrorType, errorName)
⋮----
function throwBindingError(message)
⋮----
function throwInternalError(message)
function whenDependentTypesAreResolved(
      myTypes,
      dependentTypes,
      getTypeConverters,
)
⋮----
function onComplete(typeConverters)
⋮----
function registerType(rawType, registeredInstance, options)
function __embind_register_bool(
      rawType,
      name,
      size,
      trueValue,
      falseValue,
)
⋮----
fromWireType(wt)
toWireType(destructors, o)
⋮----
readValueFromPointer(pointer)
⋮----
function ClassHandle_isAliasOf(other)
function shallowCopyInternalPointer(o)
function throwInstanceAlreadyDeleted(obj)
⋮----
function getInstanceTypeName(handle)
⋮----
function detachFinalizer(handle)
function runDestructor($$)
function releaseClassHandle($$)
function attachFinalizer(handle)
function ClassHandle_clone()
function ClassHandle_delete()
function ClassHandle_isDeleted()
⋮----
function flushPendingDeletes()
function ClassHandle_deleteLater()
function init_ClassHandle()
function ClassHandle()
⋮----
function ensureOverloadTable(proto, methodName, humanName)
function exposePublicSymbol(name, value, numArguments)
function RegisteredClass(
      name,
      constructor,
      instancePrototype,
      rawDestructor,
      baseClass,
      getActualType,
      upcast,
      downcast,
)
function upcastPointer(ptr, ptrClass, desiredClass)
function constNoSmartPtrRawPointerToWireType(destructors, handle)
function genericPointerToWireType(destructors, handle)
function nonConstNoSmartPtrRawPointerToWireType(destructors, handle)
function simpleReadValueFromPointer(pointer)
function RegisteredPointer_getPointee(ptr)
function RegisteredPointer_destructor(ptr)
function RegisteredPointer_deleteObject(handle)
function downcastPointer(ptr, ptrClass, desiredClass)
function getInheritedInstanceCount()
function getLiveInheritedInstances()
function setDelayFunction(fn)
function init_embind()
⋮----
function getBasestPointer(class_, ptr)
function getInheritedInstance(class_, ptr)
function makeClassHandle(prototype, record)
function RegisteredPointer_fromWireType(ptr)
⋮----
function makeDefaultHandle()
⋮----
function init_RegisteredPointer()
function RegisteredPointer(
      name,
      registeredClass,
      isReference,
      isConst,
      isSmartPointer,
      pointeeType,
      sharingPolicy,
      rawGetPointee,
      rawConstructor,
      rawShare,
      rawDestructor,
)
function replacePublicSymbol(name, value, numArguments)
function embind__requireFunction(signature, rawFunction)
⋮----
function makeDynCaller(dynCall)
⋮----
function getTypeName(type)
function throwUnboundTypeError(message, types)
⋮----
function visit(type)
⋮----
function __embind_register_class(
      rawType,
      rawPointerType,
      rawConstPointerType,
      baseClassRawType,
      getActualTypeSignature,
      getActualType,
      upcastSignature,
      upcast,
      downcastSignature,
      downcast,
      name,
      destructorSignature,
      rawDestructor,
)
function heap32VectorToArray(count, firstElement)
function runDestructors(destructors)
function __embind_register_class_constructor(
      rawClassType,
      argCount,
      rawArgTypesAddr,
      invokerSignature,
      invoker,
      rawConstructor,
)
function new_(constructor, argumentList)
function craftInvokerFunction(
      humanName,
      argTypes,
      classType,
      cppInvokerFunc,
      cppTargetFunc,
)
function __embind_register_class_function(
      rawClassType,
      methodName,
      argCount,
      rawArgTypesAddr,
      invokerSignature,
      rawInvoker,
      context,
      isPureVirtual,
)
⋮----
function unboundTypesHandler()
⋮----
function __emval_decref(handle)
function count_emval_handles()
function get_first_emval()
function init_emval()
function __emval_register(value)
function __embind_register_emval(rawType, name)
⋮----
fromWireType(handle)
toWireType(destructors, value)
⋮----
function _embind_repr(v)
function floatReadValueFromPointer(name, shift)
function __embind_register_float(rawType, name, size)
⋮----
fromWireType(value)
⋮----
function __embind_register_function(
      name,
      argCount,
      rawArgTypesAddr,
      signature,
      rawInvoker,
      fn,
)
function integerReadValueFromPointer(name, shift, signed)
function __embind_register_integer(
      primitiveType,
      name,
      size,
      minRange,
      maxRange,
)
function __embind_register_memory_view(rawType, dataTypeIndex, name)
⋮----
function decodeMemoryView(handle)
⋮----
function __embind_register_std_string(rawType, name)
⋮----
destructorFunction(ptr)
⋮----
function __embind_register_std_wstring(rawType, charSize, name)
function __embind_register_void(rawType, name)
⋮----
fromWireType()
⋮----
function __emval_incref(handle)
function requireRegisteredType(rawType, humanName)
function __emval_take_value(type, argv)
function _abort()
function _emscripten_get_heap_size()
function emscripten_realloc_buffer(size)
function _emscripten_resize_heap(requestedSize)
function _exit(status)
function _llvm_log2_f32(x)
function _llvm_log2_f64(a0)
function _llvm_trap()
function _emscripten_memcpy_big(dest, src, num)
⋮----
function nullFunc_i(x)
function nullFunc_ii(x)
function nullFunc_iidiiii(x)
function nullFunc_iii(x)
function nullFunc_iiii(x)
function nullFunc_iiiii(x)
function nullFunc_jiji(x)
function nullFunc_v(x)
function nullFunc_vi(x)
function nullFunc_vii(x)
function nullFunc_viii(x)
function nullFunc_viiii(x)
function nullFunc_viiiii(x)
function nullFunc_viiiiii(x)
⋮----
function ExitStatus(status)
⋮----
function run(args)
⋮----
function doRun()
⋮----
function checkUnflushedContent()
function exit(status, implicit)
```

## File: packages/excalidraw/subset/woff2/woff2-loader.ts
```typescript
import bindings from "./woff2-bindings";
import binary from "./woff2-wasm";
type Vector = any;
⋮----
function convertFromVecToUint8Array(vector: Vector): Uint8Array<ArrayBuffer>
const load = (): Promise<
```

## File: packages/excalidraw/subset/woff2/woff2-wasm.ts
```typescript

```

## File: packages/excalidraw/subset/subset-main.ts
```typescript
import { isServerEnv, promiseTry } from "@excalidraw/common";
import { WorkerInTheMainChunkError, WorkerUrlNotDefinedError } from "../errors";
import { WorkerPool } from "../workers";
import type { Commands } from "./subset-shared.chunk";
⋮----
export const subsetWoff2GlyphsByCodepoints = async (
  arrayBuffer: ArrayBuffer,
  codePoints: Array<number>,
): Promise<string> =>
⋮----
const lazyLoadWorkerSubsetChunk = async () =>
const lazyLoadSharedSubsetChunk = async () =>
type SubsetWorkerData = {
  command: typeof Commands.Subset;
  arrayBuffer: ArrayBuffer;
  codePoints: Array<number>;
};
type SubsetWorkerResult<T extends SubsetWorkerData["command"]> =
  T extends typeof Commands.Subset ? ArrayBuffer : never;
⋮----
const getOrCreateWorkerPool = () =>
```

## File: packages/excalidraw/subset/subset-shared.chunk.ts
```typescript
import loadHbSubset from "./harfbuzz/harfbuzz-loader";
import loadWoff2 from "./woff2/woff2-loader";
⋮----
export const subsetToBase64 = async (
  arrayBuffer: ArrayBuffer,
  codePoints: Array<number>,
): Promise<string> =>
export const subsetToBinary = async (
  arrayBuffer: ArrayBuffer,
  codePoints: Array<number>,
): Promise<ArrayBuffer> =>
export const toBase64 = async (arrayBuffer: ArrayBuffer) =>
```

## File: packages/excalidraw/subset/subset-worker.chunk.ts
```typescript
import { Commands, subsetToBinary } from "./subset-shared.chunk";
```

## File: packages/excalidraw/tests/data/reconcile.test.ts
```typescript
import { syncInvalidIndices } from "@excalidraw/element";
import { randomInteger, cloneJSON } from "@excalidraw/common";
import type {
  ExcalidrawElement,
  OrderedExcalidrawElement,
} from "@excalidraw/element/types";
import { reconcileElements } from "../../data/reconcile";
import type { RemoteExcalidrawElement } from "../../data/reconcile";
import type { AppState } from "../../types";
type Id = string;
type ElementLike = {
  id: string;
  version: number;
  versionNonce: number;
  index: string;
};
type Cache = Record<string, ExcalidrawElement | undefined>;
const createElement = (opts:
const idsToElements = (ids: (Id | ElementLike)[], cache: Cache =
const test = <U extends `${string}:${"L" | "R"}`>(
  local: (Id | ElementLike)[],
  remote: (Id | ElementLike)[],
  target: U[],
) =>
⋮----
const testIdentical = (
      local: ElementLike[],
      remote: ElementLike[],
      expected: Id[],
) =>
```

## File: packages/excalidraw/tests/data/restore.test.ts
```typescript
import { pointFrom } from "@excalidraw/math";
import { vi } from "vitest";
import { DEFAULT_SIDEBAR, FONT_FAMILY, ROUNDNESS } from "@excalidraw/common";
import { newElementWith } from "@excalidraw/element";
⋮----
import type { LocalPoint } from "@excalidraw/math";
import type {
  ExcalidrawArrowElement,
  ExcalidrawElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import type { NormalizedZoomValue } from "@excalidraw/excalidraw/types";
import { API } from "../helpers/api";
⋮----
import { getDefaultAppState } from "../../appState";
import type { ImportedDataState } from "../../data/types";
```

## File: packages/excalidraw/tests/fixtures/constants.ts
```typescript

```

## File: packages/excalidraw/tests/fixtures/diagramFixture.ts
```typescript
import { VERSIONS } from "@excalidraw/common";
import {
  diamondFixture,
  ellipseFixture,
  rectangleFixture,
} from "./elementFixture";
⋮----
export const diagramFactory = ({
  overrides = {},
  elementOverrides = {},
} =
```

## File: packages/excalidraw/tests/fixtures/elementFixture.ts
```typescript
import { DEFAULT_FONT_FAMILY } from "@excalidraw/common";
import type { Radians } from "@excalidraw/math";
import type { ExcalidrawElement } from "@excalidraw/element/types";
```

## File: packages/excalidraw/tests/helpers/api.ts
```typescript
import fs from "fs";
import path from "path";
import util from "util";
import { pointFrom, type LocalPoint, type Radians } from "@excalidraw/math";
import { DEFAULT_VERTICAL_ALIGN, ROUNDNESS, assertNever } from "@excalidraw/common";
import {
  newArrowElement,
  newElement,
  newEmbeddableElement,
  newFrameElement,
  newFreeDrawElement,
  newIframeElement,
  newImageElement,
  newLinearElement,
  newMagicFrameElement,
  newTextElement,
} from "@excalidraw/element";
import { isLinearElementType } from "@excalidraw/element";
import { getSelectedElements } from "@excalidraw/element";
import { selectGroupsForSelectedElements } from "@excalidraw/element";
import { FONT_SIZES } from "@excalidraw/common";
import type {
  ExcalidrawElement,
  ExcalidrawGenericElement,
  ExcalidrawTextElement,
  ExcalidrawLinearElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawImageElement,
  FileId,
  ExcalidrawFrameElement,
  ExcalidrawElementType,
  ExcalidrawMagicFrameElement,
  ExcalidrawElbowArrowElement,
  ExcalidrawArrowElement,
  FixedSegment,
} from "@excalidraw/element/types";
import type { Mutable } from "@excalidraw/common/utility-types";
import { getMimeType } from "../../data/blob";
import { createTestHook } from "../../components/App";
import { getDefaultAppState } from "../../appState";
import { GlobalTestState, createEvent, fireEvent, act } from "../test-utils";
import type { Action } from "../../actions/types";
import type App from "../../components/App";
import type { AppState } from "../../types";
⋮----
export class API
⋮----
// https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/types
```

## File: packages/excalidraw/tests/helpers/colorize.ts
```typescript
export const yellow = (str: string) => `\u001b[33m$
export const red = (str: string) => `\u001b[31m$
```

## File: packages/excalidraw/tests/helpers/constants.ts
```typescript

```

## File: packages/excalidraw/tests/helpers/mocks.ts
```typescript
import React from "react";
import { vi } from "vitest";
import type { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import type { throttleRAF as throttleRAFType } from "@excalidraw/common";
type ThrottledFn<T extends unknown[]> = ((...args: T) => void) & {
  flush: () => void;
  cancel: () => void;
};
export const mockThrottleRAF: typeof throttleRAFType = <T extends unknown[]>(
  fn: (...args: T) => void,
) =>
export const mockMermaidToExcalidraw = (opts: {
  parseMermaidToExcalidraw: typeof parseMermaidToExcalidraw;
  mockRef?: boolean;
}) =>
export const mockHTMLImageElement = (
  naturalWidth: number,
  naturalHeight: number,
) =>
⋮----
constructor()
⋮----
export const mockMultipleHTMLImageElements = (
  sizes: (readonly [number, number])[],
) =>
```

## File: packages/excalidraw/tests/helpers/polyfills.ts
```typescript
import { URL } from "node:url";
class ClipboardEvent
⋮----
constructor(
    type: "paste" | "copy",
    eventInitDict: {
      clipboardData: DataTransfer;
    },
)
⋮----
type DataKind = "string" | "file";
class DataTransferItem
⋮----
constructor(kind: DataKind, type: string, data: string | Blob)
getAsString(callback: (data: string) => void): void
getAsFile(): File | null
⋮----
class DataTransferItemList extends Array<DataTransferItem>
⋮----
add(data: string | File, type: string = ""): void
clear(): void
⋮----
class DataTransfer
⋮----
get files()
⋮----
setData(type: string, value: string)
getData(type: string)
```

## File: packages/excalidraw/tests/helpers/ui.ts
```typescript
import { pointFrom, pointRotateRads } from "@excalidraw/math";
import {
  elementCenterPoint,
  getCommonBounds,
  getElementPointsCoords,
  getLineHeightInPx,
} from "@excalidraw/element";
import { cropElement } from "@excalidraw/element";
import {
  getTransformHandles,
  getTransformHandlesFromCoords,
  OMIT_SIDES_FOR_FRAME,
  OMIT_SIDES_FOR_MULTIPLE_ELEMENTS,
  type TransformHandle,
  type TransformHandleDirection,
} from "@excalidraw/element";
import {
  isLinearElement,
  isFreeDrawElement,
  isTextElement,
  isFrameLikeElement,
} from "@excalidraw/element";
import { KEYS, arrayToMap, getLineHeight } from "@excalidraw/common";
import type { GlobalPoint, LocalPoint, Radians } from "@excalidraw/math";
import type { TransformHandleType } from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
  ExcalidrawArrowElement,
  ExcalidrawRectangleElement,
  ExcalidrawEllipseElement,
  ExcalidrawDiamondElement,
  ExcalidrawTextContainer,
  ExcalidrawTextElementWithContainer,
  ExcalidrawImageElement,
  ElementsMap,
} from "@excalidraw/element/types";
import { createTestHook } from "../../components/App";
import { getTextEditor, TEXT_EDITOR_SELECTOR } from "../queries/dom";
import { act, fireEvent, GlobalTestState, screen } from "../test-utils";
import { API } from "./api";
import type { ToolType } from "../../types";
⋮----
export type KeyboardModifiers = {
  alt?: boolean;
  shift?: boolean;
  ctrl?: boolean;
};
export class Keyboard
const getElementPointForSelection = (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
): GlobalPoint =>
export class Pointer
⋮----
static resetAll()
constructor(
    private readonly pointerType: "mouse" | "touch" | "pen",
    private readonly pointerId = 1,
)
reset()
getPosition()
restorePosition(x = 0, y = 0)
private getEvent()
move(dx: number, dy: number)
down(dx = 0, dy = 0)
up(dx = 0, dy = 0)
click(dx = 0, dy = 0)
doubleClick(dx = 0, dy = 0)
moveTo(x: number = this.clientX, y: number = this.clientY)
downAt(x = this.clientX, y = this.clientY)
upAt(x = this.clientX, y = this.clientY)
clickAt(x: number, y: number)
rightClickAt(x: number, y: number)
doubleClickAt(x: number, y: number)
select(
    elements: ExcalidrawElement | ExcalidrawElement[],
)
clickOn(element: ExcalidrawElement)
doubleClickOn(element: ExcalidrawElement)
⋮----
const transform = (
  element: ExcalidrawElement | ExcalidrawElement[],
  handle: TransformHandleType,
  mouseMove: [deltaX: number, deltaY: number],
  keyboardModifiers: KeyboardModifiers = {},
) =>
const proxy = <T extends ExcalidrawElement>(
  element: T,
): typeof element &
⋮----
get(): typeof element;
⋮----
get(target, prop)
⋮----
type DrawingToolName = Exclude<
  ToolType,
  "lock" | "selection" | "eraser" | "lasso"
>;
type Element<T extends DrawingToolName> = T extends "line" | "freedraw"
  ? ExcalidrawLinearElement
  : T extends "arrow"
  ? ExcalidrawArrowElement
  : T extends "text"
  ? ExcalidrawTextElement
  : T extends "rectangle"
  ? ExcalidrawRectangleElement
  : T extends "ellipse"
  ? ExcalidrawEllipseElement
  : T extends "diamond"
  ? ExcalidrawDiamondElement
  : ExcalidrawElement;
export class UI
⋮----
static createElement<T extends DrawingToolName>(
    type: T,
    {
      position = 0,
      x = position,
      y = position,
      size = 10,
      width: initialWidth = size,
      height: initialHeight = initialWidth,
      angle = 0,
      points: initialPoints,
    }: {
      position?: number;
      x?: number;
      y?: number;
      size?: number;
      width?: number;
      height?: number;
      angle?: number;
      points?: T extends "line" | "arrow" | "freedraw" ? LocalPoint[] : never;
    } = {},
): Element<T> &
⋮----
get(): Element<T>;
⋮----
static async editText<
    T extends ExcalidrawTextElement | ExcalidrawTextContainer,
>(element: T, text: string)
⋮----
static resize(
    element: ExcalidrawElement | ExcalidrawElement[],
    handle: TransformHandleDirection,
    mouseMove: [deltaX: number, deltaY: number],
    keyboardModifiers: KeyboardModifiers = {},
)
static crop(
    element: ExcalidrawImageElement,
    handle: TransformHandleDirection,
    naturalWidth: number,
    naturalHeight: number,
    mouseMove: [deltaX: number, deltaY: number],
    keepAspectRatio = false,
)
static rotate(
    element: ExcalidrawElement | ExcalidrawElement[],
    mouseMove: [deltaX: number, deltaY: number],
    keyboardModifiers: KeyboardModifiers = {},
)
static group(elements: ExcalidrawElement[])
static ungroup(elements: ExcalidrawElement[])
```

## File: packages/excalidraw/tests/packages/events.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { resolvablePromise } from "@excalidraw/common";
import { Excalidraw, CaptureUpdateAction } from "../../index";
import { API } from "../helpers/api";
import { Pointer } from "../helpers/ui";
import { render, unmountComponent } from "../test-utils";
import type { ExcalidrawImperativeAPI } from "../../types";
⋮----
onExcalidrawAPI=
⋮----
lifecyclePromise.resolve({
              api,
              mount: api.onEvent("editor:mount"),
              initialize: api.onEvent("editor:initialize"),
            });
⋮----
expect(excalidrawAPI).toBeDefined();
expect(container).toBeInstanceOf(HTMLDivElement);
⋮----
calls.push("initialize");
```

## File: packages/excalidraw/tests/queries/dom.ts
```typescript
import { waitFor } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import {
  stripIgnoredNodesFromErrorMessage,
  trimErrorStack,
} from "../test-utils";
⋮----
export const getTextEditor = async ({
  selector = TEXT_EDITOR_SELECTOR,
  waitForEditor = true,
}:
⋮----
const query = ()
⋮----
export const updateTextEditor = (
  editor: HTMLTextAreaElement | HTMLInputElement,
  value: string,
) =>
```

## File: packages/excalidraw/tests/queries/toolQueries.ts
```typescript
import { queries, buildQueries } from "@testing-library/react";
import { TOOL_TYPE } from "@excalidraw/common";
import type { ToolType } from "@excalidraw/excalidraw/types";
const _getAllByToolName = (container: HTMLElement, tool: ToolType | "lock") =>
const getMultipleError = (_container: any, tool: any)
const getMissingError = (_container: any, tool: any)
```

## File: packages/excalidraw/tests/scene/export.test.ts
```typescript
import { exportToCanvas, exportToSvg } from "@excalidraw/utils";
import {
  applyDarkModeFilter,
  FONT_FAMILY,
  FRAME_STYLE,
} from "@excalidraw/common";
import type {
  ExcalidrawTextElement,
  FractionalIndex,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import { prepareElementsForExport } from "../../data";
⋮----
import {
  diamondFixture,
  ellipseFixture,
  rectangleWithLinkFixture,
  textFixture,
} from "../fixtures/elementFixture";
import { API } from "../helpers/api";
⋮----
const getFrameNameHeight = (exportType: "canvas" | "svg") =>
```

## File: packages/excalidraw/tests/actionStyles.test.tsx
```typescript
import React from "react";
import { CODES } from "@excalidraw/common";
import { copiedStyles } from "../actions/actionStyles";
import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import { Keyboard, Pointer, UI } from "../tests/helpers/ui";
import {
  act,
  fireEvent,
  render,
  screen,
  togglePopover,
} from "../tests/test-utils";
```

## File: packages/excalidraw/tests/App.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { reseed } from "@excalidraw/common";
import { Excalidraw } from "../index";
⋮----
import { render, queryByTestId, unmountComponent } from "../tests/test-utils";
```

## File: packages/excalidraw/tests/appState.test.tsx
```typescript
import React from "react";
import { EXPORT_DATA_TYPES, MIME_TYPES } from "@excalidraw/common";
import type { ExcalidrawTextElement } from "@excalidraw/element/types";
import { getDefaultAppState } from "../appState";
import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { Pointer, UI } from "./helpers/ui";
import { fireEvent, queryByTestId, render, waitFor } from "./test-utils";
```

## File: packages/excalidraw/tests/appStateHooks.test.tsx
```typescript
import { act, cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { getDefaultAppState } from "../appState";
import { ExcalidrawAPIContext } from "../components/App";
import { AppStateObserver } from "../components/AppStateObserver";
import {
  useAppStateValue,
  useOnAppStateChange,
} from "../hooks/useAppStateValue";
import type { AppState, ExcalidrawImperativeAPI } from "../types";
const createAppState = (): AppState => (
const createMockAPI = (initialState: AppState) =>
⋮----
const ValueConsumer = () =>
⋮----
const ChangeConsumer = () =>
```

## File: packages/excalidraw/tests/arrowBinding.test.tsx
```typescript
import { reseed } from "@excalidraw/common";
import {
  isElbowArrow,
  projectFixedPointOntoDiagonal,
} from "@excalidraw/element";
import { pointFrom } from "@excalidraw/math";
import type { GlobalPoint, LocalPoint } from "@excalidraw/math";
import type {
  ExcalidrawArrowElement,
  ExcalidrawBindableElement,
  ExcalidrawElement,
} from "@excalidraw/element/types";
import { actionToggleArrowBinding } from "../actions/actionToggleArrowBinding";
import { Excalidraw, sceneCoordsToViewportCoords } from "../index";
import { API } from "./helpers/api";
import { Pointer, UI } from "./helpers/ui";
import {
  render,
  fireEvent,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
  waitFor,
  unmountComponent,
} from "./test-utils";
⋮----
const ctrlKeyDown = (extra: Partial<KeyboardEventInit> =
const ctrlKeyUp = ()
```

## File: packages/excalidraw/tests/charts.test.tsx
```typescript
import { tryParseSpreadsheet } from "../charts";
```

## File: packages/excalidraw/tests/clients.test.ts
```typescript
import { getNameInitial } from "../clients";
```

## File: packages/excalidraw/tests/clipboard.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { getLineHeightInPx } from "@excalidraw/element";
import { KEYS, arrayToMap, getLineHeight } from "@excalidraw/common";
import { getElementBounds } from "@excalidraw/element";
import { createPasteEvent, serializeAsClipboardJSON } from "../clipboard";
import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { mockMermaidToExcalidraw } from "./helpers/mocks";
import { Pointer, Keyboard } from "./helpers/ui";
import {
  render,
  waitFor,
  GlobalTestState,
  unmountComponent,
} from "./test-utils";
import type { NormalizedZoomValue } from "../types";
⋮----
const sendPasteEvent = (text: string) =>
const pasteWithCtrlCmdShiftV = (text: string) =>
const pasteWithCtrlCmdV = (text: string) =>
const sleep = (ms: number) =>
```

## File: packages/excalidraw/tests/colorInput.test.ts
```typescript
import { normalizeInputColor } from "@excalidraw/common";
```

## File: packages/excalidraw/tests/contextmenu.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { KEYS, reseed } from "@excalidraw/common";
import { setDateTimeForTests } from "@excalidraw/common";
import { copiedStyles } from "../actions/actionStyles";
import { Excalidraw } from "../index";
⋮----
import { API } from "./helpers/api";
import { UI, Pointer, Keyboard } from "./helpers/ui";
import {
  render,
  fireEvent,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
  GlobalTestState,
  screen,
  queryByText,
  queryAllByText,
  waitFor,
  togglePopover,
  unmountComponent,
  checkpointHistory,
} from "./test-utils";
import type { ShortcutName } from "../actions/shortcuts";
import type { ActionName } from "../actions/types";
const checkpoint = (name: string) =>
```

## File: packages/excalidraw/tests/dragCreate.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { KEYS, reseed } from "@excalidraw/common";
import type { ExcalidrawLinearElement } from "@excalidraw/element/types";
import { Excalidraw } from "../index";
⋮----
import {
  render,
  fireEvent,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
  unmountComponent,
} from "./test-utils";
```

## File: packages/excalidraw/tests/elementLocking.test.tsx
```typescript
import { KEYS } from "@excalidraw/common";
import { actionSelectAll } from "../actions";
import { t } from "../i18n";
import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import { Keyboard, Pointer, UI } from "../tests/helpers/ui";
import { render, unmountComponent } from "../tests/test-utils";
import { getTextEditor } from "./queries/dom";
```

## File: packages/excalidraw/tests/excalidraw.test.tsx
```typescript
import { queryByText, queryByTestId } from "@testing-library/react";
import React from "react";
import { useMemo } from "react";
import { THEME } from "@excalidraw/common";
import { t } from "../i18n";
import { Excalidraw, Footer, MainMenu } from "../index";
import { actionExportWithDarkMode } from "../actions/actionExport";
import {
  act,
  fireEvent,
  GlobalTestState,
  toggleMenu,
  render,
  waitFor,
} from "./test-utils";
⋮----
<MainMenu.Item onSelect=
⋮----
onClick={() => window.alert("custom menu item")}
              >
                custom menu item
              </button>
            </MainMenu.ItemCustom>
            <MainMenu.DefaultItems.Help />
          </MainMenu>
        </Excalidraw>,
      );
⋮----
const CustomExcalidraw = () =>
```

## File: packages/excalidraw/tests/export.test.tsx
```typescript
import React from "react";
import { SVG_NS } from "@excalidraw/common";
import type { FileId } from "@excalidraw/element/types";
import { getDefaultAppState } from "../appState";
import { getDataURL } from "../data/blob";
import { encodePngMetadata } from "../data/image";
import { serializeAsJSON } from "../data/json";
import { Excalidraw } from "../index";
import {
  decodeSvgBase64Payload,
  encodeSvgBase64Payload,
  exportToSvg,
} from "../scene/export";
import { API } from "./helpers/api";
import { render, waitFor } from "./test-utils";
⋮----
decode(ab: ArrayBuffer)
⋮----
const normalizeAngle = (angle: number)
```

## File: packages/excalidraw/tests/fitToContent.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { act, render } from "./test-utils";
⋮----
const waitForNextAnimationFrame = () =>
```

## File: packages/excalidraw/tests/flip.test.tsx
```typescript
import { vi } from "vitest";
import { ROUNDNESS, KEYS, arrayToMap, cloneJSON } from "@excalidraw/common";
import { pointFrom, type Radians } from "@excalidraw/math";
import { getBoundTextElementPosition } from "@excalidraw/element";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import { newLinearElement } from "@excalidraw/element";
import type { LocalPoint } from "@excalidraw/math";
import type {
  ExcalidrawElement,
  ExcalidrawImageElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElementWithContainer,
  FileId,
} from "@excalidraw/element/types";
import { actionFlipHorizontal, actionFlipVertical } from "../actions";
import { createPasteEvent } from "../clipboard";
import { Excalidraw } from "../index";
⋮----
import { SMILEY_IMAGE_DIMENSIONS } from "./fixtures/constants";
import { API } from "./helpers/api";
import { UI, Pointer, Keyboard } from "./helpers/ui";
import {
  fireEvent,
  GlobalTestState,
  render,
  screen,
  unmountComponent,
  waitFor,
} from "./test-utils";
import { getTextEditor } from "./queries/dom";
import { mockHTMLImageElement } from "./helpers/mocks";
import type { NormalizedZoomValue } from "../types";
⋮----
const createAndSelectOneRectangle = (angle: number = 0) =>
const createAndSelectOneDiamond = (angle: number = 0) =>
const createAndSelectOneEllipse = (angle: number = 0) =>
const createAndSelectOneArrow = (angle: number = 0) =>
const createAndSelectOneLine = (angle: number = 0) =>
const createAndReturnOneDraw = (angle: number = 0) =>
const createLinearElementWithCurveInsideMinMaxPoints = (
  type: "line" | "arrow",
  extraProps: any = {},
) =>
const createLinearElementsWithCurveOutsideMinMaxPoints = (
  type: "line" | "arrow",
  extraProps: any = {},
) =>
const checkElementsBoundingBox = async (
  element1: ExcalidrawElement,
  element2: ExcalidrawElement,
  toleranceInPx: number = 0,
) =>
const checkHorizontalFlip = async (toleranceInPx: number = 0.00001) =>
const checkTwoPointsLineHorizontalFlip = async () =>
const checkTwoPointsLineVerticalFlip = async () =>
const checkRotatedHorizontalFlip = async (
  expectedAngle: number,
  toleranceInPx: number = 0.00001,
) =>
const checkRotatedVerticalFlip = async (
  expectedAngle: number,
  toleranceInPx: number = 0.00001,
) =>
const checkVerticalFlip = async (toleranceInPx: number = 0.00001) =>
const checkVerticalHorizontalFlip = async (toleranceInPx: number = 0.00001) =>
⋮----
const createImage = async () =>
⋮----
const sendPasteEvent = (file?: File) =>
```

## File: packages/excalidraw/tests/history.test.tsx
```typescript
import React from "react";
import {
  queryByText,
  fireEvent,
  queryByTestId,
  waitFor,
} from "@testing-library/react";
import { vi } from "vitest";
import { pointFrom } from "@excalidraw/math";
import { newElementWith } from "@excalidraw/element";
import {
  EXPORT_DATA_TYPES,
  MIME_TYPES,
  ORIG_ID,
  KEYS,
  arrayToMap,
  COLOR_PALETTE,
  DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX,
  DEFAULT_ELEMENT_STROKE_COLOR_INDEX,
  reseed,
  randomId,
} from "@excalidraw/common";
⋮----
import { ElementsDelta, AppStateDelta } from "@excalidraw/element";
import { CaptureUpdateAction, StoreDelta } from "@excalidraw/element";
import type { LocalPoint, Radians } from "@excalidraw/math";
import type {
  ExcalidrawElbowArrowElement,
  ExcalidrawFrameElement,
  ExcalidrawGenericElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElement,
  FileId,
  FixedPointBinding,
  FractionalIndex,
  SceneElementsMap,
} from "@excalidraw/element/types";
⋮----
import {
  actionSendBackward,
  actionBringForward,
  actionSendToBack,
} from "../actions";
import { createUndoAction, createRedoAction } from "../actions/actionHistory";
import { actionToggleViewMode } from "../actions/actionToggleViewMode";
⋮----
import { getDefaultAppState } from "../appState";
import { Excalidraw } from "../index";
import { createPasteEvent } from "../clipboard";
⋮----
import {
  DEER_IMAGE_DIMENSIONS,
  SMILEY_IMAGE_DIMENSIONS,
} from "./fixtures/constants";
import { API } from "./helpers/api";
import { Keyboard, Pointer, UI } from "./helpers/ui";
import { INITIALIZED_IMAGE_PROPS } from "./helpers/constants";
import {
  GlobalTestState,
  act,
  assertSelectedElements,
  render,
  togglePopover,
  getCloneByOrigId,
  checkpointHistory,
  unmountComponent,
} from "./test-utils";
import { setupImageTest as _setupImageTest } from "./image.test";
import type { AppState } from "../types";
⋮----
const checkpoint = (name: string) =>
⋮----
const setupImageTest = ()
const assertImageTest = async () =>
⋮----
function runTwice(callback: () => void)
⋮----
function roundToNearestHundred(number: number)
```

## File: packages/excalidraw/tests/image.test.tsx
```typescript
import { randomId, reseed } from "@excalidraw/common";
import type { FileId } from "@excalidraw/element/types";
⋮----
import { Excalidraw } from "../index";
import { createPasteEvent } from "../clipboard";
import { API } from "./helpers/api";
import { mockMultipleHTMLImageElements } from "./helpers/mocks";
import { UI } from "./helpers/ui";
import { GlobalTestState, render, waitFor } from "./test-utils";
import {
  DEER_IMAGE_DIMENSIONS,
  SMILEY_IMAGE_DIMENSIONS,
} from "./fixtures/constants";
import { INITIALIZED_IMAGE_PROPS } from "./helpers/constants";
⋮----
export const setupImageTest = async (
  sizes: { width: number; height: number }[],
) =>
⋮----
const setup = ()
const assert = async () =>
```

## File: packages/excalidraw/tests/laser.test.tsx
```typescript
import { vi } from "vitest";
import { CURSOR_TYPE } from "@excalidraw/common";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import { Excalidraw } from "../index";
import { getLinkHandleFromCoords } from "../components/hyperlink/helpers";
import { API } from "./helpers/api";
import { Pointer } from "./helpers/ui";
import { act, GlobalTestState, render, waitFor } from "./test-utils";
import type { ExcalidrawProps } from "../types";
⋮----
const onLinkOpen: NonNullable<ExcalidrawProps["onLinkOpen"]> = (
      ...args
) =>
```

## File: packages/excalidraw/tests/lasso.test.tsx
```typescript
import {
  type GlobalPoint,
  type LocalPoint,
  pointFrom,
  type Radians,
  type ElementsSegmentsMap,
} from "@excalidraw/math";
import { getElementLineSegments } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { Excalidraw } from "../index";
import { getSelectedElements } from "../scene";
import { getLassoSelectedElementIds } from "../lasso/utils";
import { act, render } from "./test-utils";
⋮----
const updatePath = (startPoint: GlobalPoint, points: LocalPoint[]) =>
```

## File: packages/excalidraw/tests/library.test.tsx
```typescript
import { act, queryByTestId } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import { MIME_TYPES, ORIG_ID } from "@excalidraw/common";
import { getCommonBoundingBox } from "@excalidraw/element";
import type { ExcalidrawGenericElement } from "@excalidraw/element/types";
import { parseLibraryJSON } from "../data/blob";
import { serializeLibraryAsJSON } from "../data/json";
import { distributeLibraryItemsOnSquareGrid } from "../data/library";
import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { UI } from "./helpers/ui";
import { fireEvent, render, waitFor } from "./test-utils";
import type { LibraryItem, LibraryItems } from "../types";
⋮----
const createLibraryItem = (
      elements: ExcalidrawGenericElement[],
): LibraryItem =>
```

## File: packages/excalidraw/tests/MermaidToExcalidraw.test.tsx
```typescript
import { expect, vi } from "vitest";
import { Excalidraw } from "../index";
import { mockMermaidToExcalidraw } from "./helpers/mocks";
import { getTextEditor, updateTextEditor } from "./queries/dom";
import { render, waitFor } from "./test-utils";
```

## File: packages/excalidraw/tests/move.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { KEYS, reseed } from "@excalidraw/common";
import { bindBindingElement } from "@excalidraw/element";
⋮----
import type {
  ExcalidrawArrowElement,
  NonDeleted,
} from "@excalidraw/element/types";
import { Excalidraw } from "../index";
⋮----
import { UI, Pointer, Keyboard } from "./helpers/ui";
import { render, fireEvent, act, unmountComponent } from "./test-utils";
```

## File: packages/excalidraw/tests/multiPointCreate.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { KEYS, reseed } from "@excalidraw/common";
import type { ExcalidrawLinearElement } from "@excalidraw/element/types";
import { Excalidraw } from "../index";
⋮----
import {
  render,
  fireEvent,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
  unmountComponent,
} from "./test-utils";
```

## File: packages/excalidraw/tests/regressionTests.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import {
  FONT_FAMILY,
  CODES,
  KEYS,
  reseed,
  MQ_MIN_WIDTH_DESKTOP,
} from "@excalidraw/common";
import { setDateTimeForTests } from "@excalidraw/common";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import { Excalidraw } from "../index";
⋮----
import { API } from "./helpers/api";
import { Keyboard, Pointer, UI } from "./helpers/ui";
import {
  assertSelectedElements,
  checkpointHistory,
  fireEvent,
  render,
  screen,
  togglePopover,
  unmountComponent,
} from "./test-utils";
⋮----
const checkpoint = (name: string) =>
```

## File: packages/excalidraw/tests/rotate.test.tsx
```typescript
import React from "react";
import { expect } from "vitest";
import { reseed } from "@excalidraw/common";
import { Excalidraw } from "../index";
import { UI } from "./helpers/ui";
import { render, unmountComponent } from "./test-utils";
```

## File: packages/excalidraw/tests/scroll.test.tsx
```typescript
import React from "react";
import { KEYS } from "@excalidraw/common";
import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { Keyboard } from "./helpers/ui";
import {
  mockBoundingClientRect,
  render,
  restoreOriginalGetBoundingClientRect,
  waitFor,
} from "./test-utils";
⋮----
const scrollTest = () =>
```

## File: packages/excalidraw/tests/search.test.tsx
```typescript
import React from "react";
import {
  CANVAS_SEARCH_TAB,
  CLASSES,
  DEFAULT_SIDEBAR,
  KEYS,
} from "@excalidraw/common";
import type {
  ExcalidrawFrameLikeElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { Keyboard } from "./helpers/ui";
import { updateTextEditor } from "./queries/dom";
import { act, render, waitFor } from "./test-utils";
⋮----
const querySearchInput = async () =>
```

## File: packages/excalidraw/tests/selection.test.tsx
```typescript
import React from "react";
import { vi } from "vitest";
import { KEYS, reseed } from "@excalidraw/common";
import { SHAPES } from "../components/shapes";
import { Excalidraw } from "../index";
⋮----
import { API } from "./helpers/api";
import { Keyboard, Pointer, UI } from "./helpers/ui";
import {
  render,
  fireEvent,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
  assertSelectedElements,
  unmountComponent,
} from "./test-utils";
```

## File: packages/excalidraw/tests/shortcuts.test.tsx
```typescript
import React from "react";
import { KEYS } from "@excalidraw/common";
import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { Keyboard } from "./helpers/ui";
import { fireEvent, render, waitFor } from "./test-utils";
```

## File: packages/excalidraw/tests/test-utils.ts
```typescript
import { act } from "@testing-library/react";
import {
  render,
  queries,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import ansi from "ansicolor";
import { ORIG_ID, arrayToMap } from "@excalidraw/common";
import { getSelectedElements } from "@excalidraw/element";
import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { AllPossibleKeys } from "@excalidraw/common/utility-types";
import { STORAGE_KEYS } from "../../../excalidraw-app/app_constants";
import { Pointer, UI } from "./helpers/ui";
⋮----
import type { History } from "../history";
import type { RenderResult, RenderOptions } from "@testing-library/react";
import type { ImportedDataState } from "../data/types";
⋮----
type TestRenderFn = (
  ui: React.ReactElement,
  options?: Omit<
    RenderOptions & { localStorageData?: ImportedDataState },
    "queries"
  >,
) => Promise<RenderResult<typeof customQueries>>;
const renderApp: TestRenderFn = async (ui, options) =>
⋮----
get()
⋮----
export class GlobalTestState
⋮----
static get canvas(): HTMLCanvasElement
static get interactiveCanvas(): HTMLCanvasElement
⋮----
const initLocalStorage = (data: ImportedDataState) =>
⋮----
export const mockBoundingClientRect = (
  {
    top = 0,
    left = 0,
    bottom = 0,
    right = 0,
    width = 1920,
    height = 1080,
    x = 0,
    y = 0,
    toJSON = () => {},
  } = {
    top: 10,
    left: 20,
    bottom: 10,
    right: 10,
    width: 200,
    x: 10,
    y: 20,
    height: 100,
  },
) =>
export const withExcalidrawDimensions = async (
  dimensions: { width: number; height: number },
  cb: () => void,
) =>
export const restoreOriginalGetBoundingClientRect = () =>
export const assertSelectedElements = (
  ...elements: (
    | (ExcalidrawElement["id"] | ExcalidrawElement)[]
    | ExcalidrawElement["id"]
    | ExcalidrawElement
  )[]
) =>
export const toggleMenu = (container: HTMLElement) =>
export const togglePopover = (label: string) =>
⋮----
constructor(cb: any)
observe()
unobserve()
disconnect()
⋮----
toBeNonNaNNumber(received)
⋮----
serialize(val, config, indentation, depth, refs, printer)
test(val)
⋮----
export const getCloneByOrigId = <T extends boolean = false>(
  origId: ExcalidrawElement["id"],
  returnNullIfNotExists: T = false as T,
): T extends true ? ExcalidrawElement | null : ExcalidrawElement =>
export const assertElements = <T extends AllPossibleKeys<ExcalidrawElement>>(
  actualElements: readonly ExcalidrawElement[],
  expectedElements: (Partial<Record<T, any>> & {
    selected?: true;
  } & (
      | {
          id: ExcalidrawElement["id"];
        }
      | { [ORIG_ID]?: string }
    ))[],
) =>
const stripProps = (
  deltas: Record<string, { deleted: any; inserted: any }>,
  props: string[],
)
export const checkpointHistory = (history: History, name: string) =>
export const trimErrorStack = (error: Error, range = 1) =>
export const stripIgnoredNodesFromErrorMessage = (error: Error) =>
```

## File: packages/excalidraw/tests/tool.test.tsx
```typescript
import React from "react";
import { resolvablePromise } from "@excalidraw/common";
import { Excalidraw } from "../index";
import { Pointer } from "./helpers/ui";
import { act, render } from "./test-utils";
import type { ExcalidrawImperativeAPI } from "../types";
⋮----
onExcalidrawAPI=
```

## File: packages/excalidraw/tests/viewMode.test.tsx
```typescript
import React from "react";
import { CURSOR_TYPE, KEYS } from "@excalidraw/common";
import { Excalidraw } from "../index";
import { API } from "./helpers/api";
import { Keyboard, Pointer, UI } from "./helpers/ui";
import { render, GlobalTestState } from "./test-utils";
```

## File: packages/excalidraw/wysiwyg/textWysiwyg.test.tsx
```typescript
import { queryByText } from "@testing-library/react";
import { pointFrom } from "@excalidraw/math";
import {
  getLineHeightInPx,
  getOriginalContainerHeightFromCache,
} from "@excalidraw/element";
import {
  CODES,
  colorToHex,
  KEYS,
  FONT_FAMILY,
  TEXT_ALIGN,
  THEME,
  VERTICAL_ALIGN,
  applyDarkModeFilter,
} from "@excalidraw/common";
import type {
  ExcalidrawTextElement,
  ExcalidrawTextElementWithContainer,
} from "@excalidraw/element/types";
import { Excalidraw } from "../index";
import { API } from "../tests/helpers/api";
import { Keyboard, Pointer, UI } from "../tests/helpers/ui";
import { getTextEditor, updateTextEditor } from "../tests/queries/dom";
import {
  GlobalTestState,
  act,
  render,
  screen,
  unmountComponent,
} from "../tests/test-utils";
import {
  fireEvent,
  mockBoundingClientRect,
  restoreOriginalGetBoundingClientRect,
} from "../tests/test-utils";
import { actionBindText } from "../actions";
⋮----
const colorsAreEqual = (color1: string, color2: string) =>
```

## File: packages/excalidraw/wysiwyg/textWysiwyg.tsx
```typescript
import {
  CODES,
  KEYS,
  CLASSES,
  POINTER_BUTTON,
  THEME,
  isWritableElement,
  getFontString,
  getFontFamilyString,
  isTestEnv,
  MIME_TYPES,
  applyDarkModeFilter,
  isRTL,
} from "@excalidraw/common";
import { pointFrom, pointRotateRads, type Radians } from "@excalidraw/math";
import {
  getTextFromElements,
  originalContainerCache,
  updateBoundElements,
  updateOriginalContainerCache,
} from "@excalidraw/element";
import { LinearElementEditor } from "@excalidraw/element";
import { bumpVersion } from "@excalidraw/element";
import {
  getBoundTextElementId,
  getContainerElement,
  getTextElementAngle,
  redrawTextBoundingBox,
  getBoundTextMaxHeight,
  getBoundTextMaxWidth,
  computeContainerDimensionForBoundText,
  computeBoundTextPosition,
  getBoundTextElement,
} from "@excalidraw/element";
import { getTextWidth } from "@excalidraw/element";
import { getLineHeightInPx } from "@excalidraw/element";
import { getLineWidth } from "@excalidraw/element";
import { normalizeText } from "@excalidraw/element";
import { wrapText } from "@excalidraw/element";
import { getWrappedTextLines } from "@excalidraw/element";
import {
  isArrowElement,
  isBoundToContainer,
  isTextElement,
} from "@excalidraw/element";
import type {
  ExcalidrawElement,
  ExcalidrawLinearElement,
  ExcalidrawTextElementWithContainer,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import { actionSaveToActiveFile } from "../actions";
import {
  parseClipboard,
  parseDataTransferEvent,
  parseDataTransferEventMimeTypes,
} from "../clipboard";
import {
  actionDecreaseFontSize,
  actionIncreaseFontSize,
} from "../actions/actionProperties";
import {
  actionResetZoom,
  actionZoomIn,
  actionZoomOut,
} from "../actions/actionCanvas";
import type { ParsedDataTranferList } from "../clipboard";
import type App from "../components/App";
import type { AppState } from "../types";
const getTransform = (
  width: number,
  height: number,
  angle: number,
  appState: AppState,
  maxWidth: number,
  maxHeight: number,
) =>
const getLineDirection = (text: string, offset: number) =>
const getCaretBoundaryOffsets = (text: string) =>
const getLineCaretOffsetFromNativeLayout = ({
  text,
  font,
  lineHeightPx,
  direction,
  targetX,
}: {
  text: string;
  font: ReturnType<typeof getFontString>;
  lineHeightPx: number;
  direction: "ltr" | "rtl";
  targetX: number;
}) =>
type SubmitHandler = () => void;
export const textWysiwyg = ({
  id,
  onChange,
  onSubmit,
  getViewportCoords,
  element,
  canvas,
  excalidrawContainer,
  app,
  autoSelect = true,
  initialCaretSceneCoords = null,
}: {
  id: ExcalidrawElement["id"];
onChange?: (nextOriginalText: string)
⋮----
const textPropertiesUpdated = (
    updatedTextElement: ExcalidrawTextElement,
    editable: HTMLTextAreaElement,
) =>
⋮----
const updateWysiwygStyle = () =>
⋮----
// set to element height by default since that's
// what is going to be used for unbounded text
⋮----
// autogrow container height if text exceeds
⋮----
// autoshrink container height until original container height
// is reached when text is removed
⋮----
// add 5% buffer otherwise it causes wysiwyg to jump
⋮----
// Make sure text editor height doesn't go beyond viewport
⋮----
// must be defined *after* font ¯\_(ツ)_/¯
⋮----
// For some reason updating font attribute doesn't set font family
// hence updating font family explicitly for test environment
⋮----
const getCaretIndexFromInitialSceneCoords = () =>
⋮----
const indent = () =>
const outdent = () =>
const getSelectedLinesStartIndices = () =>
const stopEvent = (event: Event) =>
⋮----
const handleSubmit = () =>
const cleanup = () =>
const bindBlurEvent = (event?: MouseEvent) =>
const temporarilyDisableSubmit = () =>
const onPointerDown = (event: MouseEvent) =>
```

## File: packages/excalidraw/analytics.ts
```typescript
import { isDevEnv } from "@excalidraw/common";
⋮----
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
) =>
```

## File: packages/excalidraw/animated-trail.ts
```typescript
import { LaserPointer } from "@excalidraw/laser-pointer";
import {
  SVG_NS,
  getSvgPathFromStroke,
  sceneCoordsToViewportCoords,
} from "@excalidraw/common";
import type { LaserPointerOptions } from "@excalidraw/laser-pointer";
import type { AnimationFrameHandler } from "./animation-frame-handler";
import type App from "./components/App";
import type { AppState } from "./types";
export interface Trail {
  start(container: SVGSVGElement): void;
  stop(): void;
  startPath(x: number, y: number): void;
  addPointToPath(x: number, y: number): void;
  endPath(): void;
}
⋮----
start(container: SVGSVGElement): void;
stop(): void;
startPath(x: number, y: number): void;
addPointToPath(x: number, y: number): void;
endPath(): void;
⋮----
export interface AnimatedTrailOptions {
  fill: (trail: AnimatedTrail) => string;
  stroke?: (trail: AnimatedTrail) => string;
  animateTrail?: boolean;
}
export class AnimatedTrail implements Trail
⋮----
constructor(
    private animationFrameHandler: AnimationFrameHandler,
    protected app: App,
    private options: Partial<LaserPointerOptions> &
      Partial<AnimatedTrailOptions>,
)
get hasCurrentTrail()
hasLastPoint(x: number, y: number)
start(container?: SVGSVGElement)
stop()
startPath(x: number, y: number)
addPointToPath(x: number, y: number)
endPath()
getCurrentTrail()
clearTrails()
private update()
private onFrame()
private drawTrail(trail: LaserPointer, state: AppState): string
```

## File: packages/excalidraw/animation-frame-handler.ts
```typescript
export type AnimationCallback = (timestamp: number) => void | boolean;
export type AnimationTarget = {
  callback: AnimationCallback;
  stopped: boolean;
};
export class AnimationFrameHandler
⋮----
register(key: object, callback: AnimationCallback)
start(key: object)
stop(key: object)
private constructFrame(key: object): FrameRequestCallback
private scheduleFrame(key: object)
private cancelFrame(key: object)
private onFrame(target: AnimationTarget, timestamp: number): boolean
```

## File: packages/excalidraw/appState.ts
```typescript
import {
  COLOR_PALETTE,
  ARROW_TYPE,
  DEFAULT_ELEMENT_PROPS,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_GRID_SIZE,
  EXPORT_SCALES,
  STATS_PANELS,
  THEME,
  DEFAULT_GRID_STEP,
  isTestEnv,
} from "@excalidraw/common";
import type { AppState, NormalizedZoomValue } from "./types";
⋮----
export const getDefaultAppState = (): Omit<
⋮----
const _clearAppStateForStorage = <
  ExportType extends "export" | "browser" | "server",
>(
  appState: Partial<AppState>,
  exportType: ExportType,
) =>
⋮----
type ExportableKeys = {
    [K in keyof typeof APP_STATE_STORAGE_CONF]: typeof APP_STATE_STORAGE_CONF[K][ExportType] extends true
      ? K
      : never;
  }[keyof typeof APP_STATE_STORAGE_CONF];
⋮----
export const clearAppStateForLocalStorage = (appState: Partial<AppState>) =>
export const cleanAppStateForExport = (appState: Partial<AppState>) =>
export const clearAppStateForDatabase = (appState: Partial<AppState>) =>
export const isEraserActive = ({
  activeTool,
}: {
  activeTool: AppState["activeTool"];
})
export const isHandToolActive = ({
  activeTool,
}: {
  activeTool: AppState["activeTool"];
}) =>
```

## File: packages/excalidraw/charts.test.ts
```typescript
import { FONT_FAMILY } from "@excalidraw/common";
import {
  DEFAULT_CHART_COLOR_INDEX,
  getAllColorsSpecificShade,
} from "@excalidraw/common";
import type {
  ExcalidrawLineElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import {
  isSpreadsheetValidForChartType,
  renderSpreadsheet,
  tryParseCells,
  tryParseNumber,
} from "./charts";
import type { Spreadsheet } from "./charts";
⋮----
const getRotatedBounds = (element: ExcalidrawTextElement) =>
⋮----
const circularDistance = (first: number, second: number) =>
⋮----
const getXAxisWidth = (elements: ReturnType<typeof renderSpreadsheet>)
⋮----
const getSeriesLineColors = (seed: number) =>
⋮----
const getRadius = (point: readonly [number, number])
```

## File: packages/excalidraw/clients.ts
```typescript
import {
  COLOR_CHARCOAL_BLACK,
  COLOR_VOICE_CALL,
  COLOR_WHITE,
  THEME,
  UserIdleState,
} from "@excalidraw/common";
import { roundRect } from "./renderer/roundRect";
import type { InteractiveCanvasRenderConfig } from "./scene/types";
import type {
  Collaborator,
  InteractiveCanvasAppState,
  SocketId,
} from "./types";
function hashToInteger(id: string)
export const getClientColor = (
  socketId: SocketId,
  collaborator: Collaborator | undefined,
) =>
export const getNameInitial = (name?: string | null) =>
export const renderRemoteCursors = ({
  context,
  renderConfig,
  appState,
  normalizedWidth,
  normalizedHeight,
}: {
  context: CanvasRenderingContext2D;
  renderConfig: InteractiveCanvasRenderConfig;
  appState: InteractiveCanvasAppState;
  normalizedWidth: number;
  normalizedHeight: number;
}) =>
```

## File: packages/excalidraw/clipboard.test.ts
```typescript
import {
  createPasteEvent,
  parseClipboard,
  parseDataTransferEvent,
  serializeAsClipboardJSON,
} from "./clipboard";
import { API } from "./tests/helpers/api";
```

## File: packages/excalidraw/clipboard.ts
```typescript
import {
  ALLOWED_PASTE_MIME_TYPES,
  EXPORT_DATA_TYPES,
  MIME_TYPES,
  arrayToMap,
  isMemberOf,
  isPromiseLike,
  EVENT,
} from "@excalidraw/common";
import { mutateElement } from "@excalidraw/element";
import { deepCopyElement } from "@excalidraw/element";
import {
  isFrameLikeElement,
  isInitializedImageElement,
} from "@excalidraw/element";
import { getContainingFrame } from "@excalidraw/element";
import type { ValueOf } from "@excalidraw/common/utility-types";
import type { IMAGE_MIME_TYPES, STRING_MIME_TYPES } from "@excalidraw/common";
import type {
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import { ExcalidrawError } from "./errors";
import {
  createFile,
  getFileHandle,
  isSupportedImageFileType,
  normalizeFile,
} from "./data/blob";
import type { BinaryFiles } from "./types";
type ElementsClipboard = {
  type: typeof EXPORT_DATA_TYPES.excalidrawClipboard;
  elements: readonly NonDeletedExcalidrawElement[];
  files: BinaryFiles | undefined;
};
export type PastedMixedContent = { type: "text" | "imageUrl"; value: string }[];
export interface ClipboardData {
  elements?: readonly ExcalidrawElement[];
  files?: BinaryFiles;
  text?: string;
  mixedContent?: PastedMixedContent;
  errorMessage?: string;
  programmaticAPI?: boolean;
}
type AllowedPasteMimeTypes = typeof ALLOWED_PASTE_MIME_TYPES[number];
type ParsedClipboardEventTextData =
  | { type: "text"; value: string }
  | { type: "mixedContent"; value: PastedMixedContent };
⋮----
const clipboardContainsElements = (
  contents: any,
): contents is
export const createPasteEvent = ({
  types,
  files,
}: {
  types?: { [key in AllowedPasteMimeTypes]?: string | File };
  files?: File[];
}) =>
export const serializeAsClipboardJSON = ({
  elements,
  files,
}: {
  elements: readonly NonDeletedExcalidrawElement[];
  files: BinaryFiles | null;
}) =>
export const copyToClipboard = async (
  elements: readonly NonDeletedExcalidrawElement[],
  files: BinaryFiles | null,
  clipboardEvent?: ClipboardEvent | null,
) =>
function parseHTMLTree(el: ChildNode)
const maybeParseHTMLDataItem = (
  dataItem: ParsedDataTransferItemType<typeof MIME_TYPES["html"]>,
):
export const readSystemClipboard = async () =>
const parseClipboardEventTextData = async (
  dataList: ParsedDataTranferList,
  isPlainPaste = false,
): Promise<ParsedClipboardEventTextData> =>
type AllowedParsedDataTransferItem =
  | {
      type: ValueOf<typeof IMAGE_MIME_TYPES>;
      kind: "file";
      file: File;
      fileHandle: FileSystemFileHandle | null;
    }
  | { type: ValueOf<typeof STRING_MIME_TYPES>; kind: "string"; value: string };
type ParsedDataTransferItem =
  | {
      type: string;
      kind: "file";
      file: File;
      fileHandle: FileSystemFileHandle | null;
    }
  | { type: string; kind: "string"; value: string };
type ParsedDataTransferItemType<
  T extends AllowedParsedDataTransferItem["type"],
> = AllowedParsedDataTransferItem & { type: T };
export type ParsedDataTransferFile = Extract<
  AllowedParsedDataTransferItem,
  { kind: "file" }
>;
export type ParsedDataTranferList = ParsedDataTransferItem[] & {
  findByType: typeof findDataTransferItemType;
  getData: typeof getDataTransferItemData;
  getFiles: typeof getDataTransferFiles;
};
⋮----
export const parseDataTransferEventMimeTypes = (
  event: ClipboardEvent | DragEvent | React.DragEvent<HTMLDivElement>,
): Set<string> =>
export const parseDataTransferEvent = async (
  event: ClipboardEvent | DragEvent | React.DragEvent<HTMLDivElement>,
): Promise<ParsedDataTranferList> =>
export const parseClipboard = async (
  dataList: ParsedDataTranferList,
  isPlainPaste = false,
): Promise<ClipboardData> =>
export const copyBlobToClipboardAsPng = async (blob: Blob | Promise<Blob>) =>
export const copyTextToSystemClipboard = async <
  MimeType extends ValueOf<typeof STRING_MIME_TYPES>,
>(
  text: string | { [K in MimeType]: string } | null,
  clipboardEvent?: ClipboardEvent | null,
) =>
const copyTextViaExecCommand = (text: string | null) =>
export const isClipboardEvent = (
  event: React.SyntheticEvent | Event,
): event is ClipboardEvent =>
```

## File: packages/excalidraw/css.d.ts
```typescript
interface Properties {
    "--max-width"?: number | string;
    "--swatch-color"?: string;
    "--gap"?: number | string;
    "--padding"?: number | string;
  }
```

## File: packages/excalidraw/cursor.ts
```typescript
import { CURSOR_TYPE, MIME_TYPES, THEME } from "@excalidraw/common";
import { isHandToolActive, isEraserActive } from "./appState";
import type { AppState, DataURL } from "./types";
⋮----
export const resetCursor = (interactiveCanvas: HTMLCanvasElement | null) =>
export const setCursor = (
  interactiveCanvas: HTMLCanvasElement | null,
  cursor: string,
) =>
⋮----
export const setEraserCursor = (
  interactiveCanvas: HTMLCanvasElement | null,
  theme: AppState["theme"],
) =>
⋮----
const drawCanvas = () =>
⋮----
export const setCursorForShape = (
  interactiveCanvas: HTMLCanvasElement | null,
  appState: Pick<AppState, "activeTool" | "theme">,
) =>
```

## File: packages/excalidraw/deburr.ts
```typescript
export const deburr = (str: string) =>
```

## File: packages/excalidraw/editor-jotai.ts
```typescript
import {
  atom,
  createStore,
  type PrimitiveAtom,
  type WritableAtom,
} from "jotai";
import { createIsolation } from "jotai-scope";
```

## File: packages/excalidraw/errors.ts
```typescript
type CANVAS_ERROR_NAMES = "CANVAS_ERROR" | "CANVAS_POSSIBLY_TOO_BIG";
export class CanvasError extends Error
⋮----
constructor(
    message: string = "Couldn't export canvas.",
    name: CANVAS_ERROR_NAMES = "CANVAS_ERROR",
)
⋮----
export class AbortError extends DOMException
⋮----
constructor(message: string = "Request Aborted")
⋮----
type ImageSceneDataErrorCode =
  | "IMAGE_NOT_CONTAINS_SCENE_DATA"
  | "IMAGE_SCENE_DATA_ERROR";
export class ImageSceneDataError extends Error
⋮----
constructor(
    message = "Image Scene Data Error",
    code: ImageSceneDataErrorCode = "IMAGE_SCENE_DATA_ERROR",
)
⋮----
type WorkerErrorCodes = "WORKER_URL_NOT_DEFINED" | "WORKER_IN_THE_MAIN_CHUNK";
export class WorkerUrlNotDefinedError extends Error
⋮----
constructor(
    message = "Worker URL is not defined!",
    code: WorkerErrorCodes = "WORKER_URL_NOT_DEFINED",
)
⋮----
export class WorkerInTheMainChunkError extends Error
⋮----
constructor(
    message = "Worker has to be in a separate chunk!",
    code: WorkerErrorCodes = "WORKER_IN_THE_MAIN_CHUNK",
)
⋮----
export class ExcalidrawError extends Error
⋮----
constructor(message: string)
⋮----
export class RequestError extends Error
⋮----
toObject()
constructor({
    message = "Something went wrong",
    status = 500,
    data,
}:
```

## File: packages/excalidraw/gesture.ts
```typescript
import type { PointerCoords } from "./types";
export const getCenter = (pointers: Map<number, PointerCoords>) =>
export const getDistance = ([a, b]: readonly PointerCoords[])
const sum = <T>(array: readonly T[], mapper: (item: T)
```

## File: packages/excalidraw/global.d.ts
```typescript
interface Window {
  ClipboardItem: any;
  __EXCALIDRAW_SHA__: string | undefined;
  EXCALIDRAW_ASSET_PATH: string | string[] | undefined;
  EXCALIDRAW_THROTTLE_RENDER: boolean | undefined;
  DEBUG_FRACTIONAL_INDICES: boolean | undefined;
  EXCALIDRAW_EXPORT_SOURCE: string;
  gtag: Function;
  sa_event: Function;
  fathom: { trackEvent: Function };
}
interface CanvasRenderingContext2D {
  roundRect?: (
    x: number,
    y: number,
    width: number,
    height: number,
    radii:
      | number
      | [number]
      | [number, number]
      | [number, number, number]
      | [number, number, number, number],
  ) => void;
}
interface Clipboard extends EventTarget {
  write(data: any[]): Promise<void>;
}
⋮----
write(data: any[]): Promise<void>;
⋮----
type TEXtChunk = { name: "tEXt"; data: Uint8Array };
⋮----
function encode(
    name: string,
    value: string,
):
function decode(data: Uint8Array):
⋮----
function encode(chunks: TEXtChunk[]): Uint8Array<ArrayBuffer>;
⋮----
function extract(buffer: Uint8Array): TEXtChunk[];
⋮----
interface Blob {
  handle?: FileSystemFileHandle;
  name?: string;
}
⋮----
interface ArrayBuffer {
  _brand?: "ArrayBuffer";
}
interface Uint8Array {
  _brand?: "Uint8Array";
}
⋮----
import type { PicaResizeOptions, Pica } from "pica";
⋮----
interface ImageBlobReduce {
      toBlob(file: File, options: ImageBlobReduceOptions): Promise<Blob>;
      _create_blob(
        this: { pica: Pica },
        env: {
          out_canvas: HTMLCanvasElement;
          out_blob: Blob;
        },
      ): Promise<any>;
    }
⋮----
toBlob(file: File, options: ImageBlobReduceOptions): Promise<Blob>;
_create_blob(
        this: { pica: Pica },
        env: {
          out_canvas: HTMLCanvasElement;
          out_blob: Blob;
        },
      ): Promise<any>;
⋮----
interface ImageBlobReduceStatic {
      new (options?: any): ImageBlobReduce;
      (options?: any): ImageBlobReduce;
    }
interface ImageBlobReduceOptions extends PicaResizeOptions {
      max: number;
    }
⋮----
interface CustomMatchers {
  toBeNonNaNNumber(): void;
  toCloselyEqualPoints(
    points: readonly [number, number][],
    precision?: number,
  ): void;
}
⋮----
toBeNonNaNNumber(): void;
toCloselyEqualPoints(
    points: readonly [number, number][],
    precision?: number,
  ): void;
⋮----
interface Expect extends CustomMatchers {}
interface Matchers extends CustomMatchers {}
```

## File: packages/excalidraw/history.ts
```typescript
import { Emitter } from "@excalidraw/common";
import {
  CaptureUpdateAction,
  StoreChange,
  StoreDelta,
} from "@excalidraw/element";
import type { StoreSnapshot, Store } from "@excalidraw/element";
import type { SceneElementsMap } from "@excalidraw/element/types";
import type { AppState } from "./types";
export class HistoryDelta extends StoreDelta
⋮----
public applyTo(
    elements: SceneElementsMap,
    appState: AppState,
    snapshot: StoreSnapshot,
): [SceneElementsMap, AppState, boolean]
public static override calculate(
    prevSnapshot: StoreSnapshot,
    nextSnapshot: StoreSnapshot,
)
public static override inverse(delta: StoreDelta): HistoryDelta
public static override applyLatestChanges(
    delta: StoreDelta,
    prevElements: SceneElementsMap,
    nextElements: SceneElementsMap,
    modifierOptions?: "deleted" | "inserted",
)
⋮----
export class HistoryChangedEvent
⋮----
constructor(
⋮----
export class History
⋮----
public get isUndoStackEmpty()
public get isRedoStackEmpty()
constructor(private readonly store: Store)
public clear()
public record(delta: StoreDelta)
public undo(elements: SceneElementsMap, appState: AppState)
public redo(elements: SceneElementsMap, appState: AppState)
private perform(
    elements: SceneElementsMap,
    appState: AppState,
    pop: () => HistoryDelta | null,
    push: (entry: HistoryDelta) => void,
): [SceneElementsMap, AppState] | void
private static pop(stack: HistoryDelta[]): HistoryDelta | null
private static push(stack: HistoryDelta[], entry: HistoryDelta)
```

## File: packages/excalidraw/i18n.ts
```typescript
import { isDevEnv } from "@excalidraw/common";
import type { NestedKeyOf } from "@excalidraw/common/utility-types";
import { useAtomValue, editorJotaiStore, atom } from "./editor-jotai";
import fallbackLangData from "./locales/en.json";
import percentages from "./locales/percentages.json";
⋮----
export interface Language {
  code: string;
  label: string;
  rtl?: boolean;
}
export type TranslationKeys = NestedKeyOf<typeof fallbackLangData>;
⋮----
export const setLanguage = async (lang: Language) =>
export const getLanguage = ()
const findPartsForData = (data: any, parts: string[]) =>
export const t = (
  path: NestedKeyOf<typeof fallbackLangData>,
  replacement?: { [key: string]: string | number } | null,
  fallback?: string,
) =>
⋮----
export const useI18n = () =>
```

## File: packages/excalidraw/index-node.ts
```typescript
import { getDefaultAppState } from "./appState";
import { exportToCanvas } from "./scene/export";
```

## File: packages/excalidraw/index.tsx
```typescript
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DEFAULT_UI_OPTIONS, isShallowEqual } from "@excalidraw/common";
import App, {
  ExcalidrawAPIContext,
  ExcalidrawAPISetContext,
} from "./components/App";
import { InitializeApp } from "./components/InitializeApp";
import Footer from "./components/footer/FooterCenter";
import LiveCollaborationTrigger from "./components/live-collaboration/LiveCollaborationTrigger";
import MainMenu from "./components/main-menu/MainMenu";
import WelcomeScreen from "./components/welcome-screen/WelcomeScreen";
import { defaultLang } from "./i18n";
import {
  useAppStateValue as _useAppStateValue,
  useOnAppStateChange as _useOnAppStateChange,
} from "./hooks/useAppStateValue";
import { EditorJotaiProvider, editorJotaiStore } from "./editor-jotai";
import polyfill from "./polyfill";
⋮----
import type {
  AppProps,
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from "./types";
⋮----
export const ExcalidrawAPIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) =>
⋮----
const importPolyfill = async () =>
⋮----
const handleTouchMove = (event: TouchEvent) =>
⋮----
export function useExcalidrawStateValue<K extends keyof AppState>(
  prop: K,
): AppState[K] | undefined;
export function useExcalidrawStateValue<T extends keyof AppState>(
  props: T[],
): AppState | undefined;
export function useExcalidrawStateValue<T>(
  selector: (appState: AppState) => T,
): T | undefined;
export function useExcalidrawStateValue(
  selector:
    | keyof AppState
    | (keyof AppState)[]
    | ((appState: AppState) => unknown),
)
```

## File: packages/excalidraw/laser-trails.ts
```typescript
import { DEFAULT_LASER_COLOR, easeOut } from "@excalidraw/common";
import type { LaserPointerOptions } from "@excalidraw/laser-pointer";
import { AnimatedTrail } from "./animated-trail";
import { getClientColor } from "./clients";
import type { Trail } from "./animated-trail";
import type { AnimationFrameHandler } from "./animation-frame-handler";
import type App from "./components/App";
import type { SocketId } from "./types";
export class LaserTrails implements Trail
⋮----
constructor(
    private animationFrameHandler: AnimationFrameHandler,
    private app: App,
)
private getTrailOptions()
startPath(x: number, y: number): void
addPointToPath(x: number, y: number): void
endPath(): void
start(container: SVGSVGElement)
stop()
onFrame()
private updateCollabTrails()
```

## File: packages/excalidraw/mermaid.test.ts
```typescript
import { isMaybeMermaidDefinition } from "./mermaid";
```

## File: packages/excalidraw/mermaid.ts
```typescript
export const isMaybeMermaidDefinition = (text: string) =>
```

## File: packages/excalidraw/polyfill.ts
```typescript
const polyfill = () =>
```

## File: packages/excalidraw/pwacompat.d.ts
```typescript

```

## File: packages/excalidraw/react-app-env.d.ts
```typescript

```

## File: packages/excalidraw/reactUtils.ts
```typescript
import { version as ReactVersion } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { throttleRAF } from "@excalidraw/common";
export const withBatchedUpdates = <
  TFunction extends ((event: any) => void) | (() => void),
>(
  func: Parameters<TFunction>["length"] extends 0 | 1 ? TFunction : never,
)
export const withBatchedUpdatesThrottled = <
  TFunction extends ((event: any) => void) | (() => void),
>(
  func: Parameters<TFunction>["length"] extends 0 | 1 ? TFunction : never,
) =>
```

## File: packages/excalidraw/shortcut.ts
```typescript
import { isDarwin } from "@excalidraw/common";
import { t } from "./i18n";
export const getShortcutKey = (shortcut: string): string
```

## File: packages/excalidraw/snapping.ts
```typescript
import {
  pointFrom,
  pointRotateRads,
  rangeInclusive,
  rangeIntersection,
  rangesOverlap,
  type GlobalPoint,
} from "@excalidraw/math";
import { TOOL_TYPE, KEYS } from "@excalidraw/common";
import {
  getCommonBounds,
  getDraggedElementsBounds,
  getElementAbsoluteCoords,
} from "@excalidraw/element";
import { isBoundToContainer } from "@excalidraw/element";
import { getMaximumGroups } from "@excalidraw/element";
import {
  getSelectedElements,
  getVisibleAndNonSelectedElements,
} from "@excalidraw/element";
import type { InclusiveRange } from "@excalidraw/math";
import type { Bounds } from "@excalidraw/common";
import type { MaybeTransformHandleType } from "@excalidraw/element";
import type {
  ElementsMap,
  ExcalidrawElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import type {
  AppClassProperties,
  AppState,
  KeyboardModifiersObject,
} from "./types";
⋮----
export const getSnapDistance = (zoomValue: number) =>
type Vector2D = {
  x: number;
  y: number;
};
type PointPair = [GlobalPoint, GlobalPoint];
export type PointSnap = {
  type: "point";
  points: PointPair;
  offset: number;
};
export type Gap = {
  startBounds: Bounds;
  endBounds: Bounds;
  startSide: [GlobalPoint, GlobalPoint];
  endSide: [GlobalPoint, GlobalPoint];
  overlap: InclusiveRange;
  length: number;
};
export type GapSnap = {
  type: "gap";
  direction:
    | "center_horizontal"
    | "center_vertical"
    | "side_left"
    | "side_right"
    | "side_top"
    | "side_bottom";
  gap: Gap;
  offset: number;
};
export type GapSnaps = GapSnap[];
export type Snap = GapSnap | PointSnap;
export type Snaps = Snap[];
export type PointSnapLine = {
  type: "points";
  points: GlobalPoint[];
};
export type PointerSnapLine = {
  type: "pointer";
  points: PointPair;
  direction: "horizontal" | "vertical";
};
export type GapSnapLine = {
  type: "gap";
  direction: "horizontal" | "vertical";
  points: PointPair;
};
export type SnapLine = PointSnapLine | GapSnapLine | PointerSnapLine;
export class SnapCache
export const isGridModeEnabled = (app: AppClassProperties): boolean
export const isSnappingEnabled = ({
  event,
  app,
  selectedElements,
}: {
  app: AppClassProperties;
  event: KeyboardModifiersObject;
  selectedElements: NonDeletedExcalidrawElement[];
}) =>
export const areRoughlyEqual = (a: number, b: number, precision = 0.01) =>
export const getElementsCorners = (
  elements: ExcalidrawElement[],
  elementsMap: ElementsMap,
  {
    omitCenter,
    boundingBoxCorners,
    dragOffset,
  }: {
    omitCenter?: boolean;
    boundingBoxCorners?: boolean;
    dragOffset?: Vector2D;
  } = {
    omitCenter: false,
    boundingBoxCorners: false,
  },
): GlobalPoint[] =>
const getReferenceElements = (
  elements: readonly NonDeletedExcalidrawElement[],
  selectedElements: NonDeletedExcalidrawElement[],
  appState: AppState,
  elementsMap: ElementsMap,
)
export const getVisibleGaps = (
  elements: readonly NonDeletedExcalidrawElement[],
  selectedElements: ExcalidrawElement[],
  appState: AppState,
  elementsMap: ElementsMap,
) =>
const getGapSnaps = (
  selectedElements: ExcalidrawElement[],
  dragOffset: Vector2D,
  app: AppClassProperties,
  event: KeyboardModifiersObject,
  nearestSnapsX: Snaps,
  nearestSnapsY: Snaps,
  minOffset: Vector2D,
) =>
export const getReferenceSnapPoints = (
  elements: readonly NonDeletedExcalidrawElement[],
  selectedElements: ExcalidrawElement[],
  appState: AppState,
  elementsMap: ElementsMap,
) =>
const getPointSnaps = (
  selectedElements: ExcalidrawElement[],
  selectionSnapPoints: GlobalPoint[],
  app: AppClassProperties,
  event: KeyboardModifiersObject,
  nearestSnapsX: Snaps,
  nearestSnapsY: Snaps,
  minOffset: Vector2D,
) =>
export const snapDraggedElements = (
  elements: ExcalidrawElement[],
  dragOffset: Vector2D,
  app: AppClassProperties,
  event: KeyboardModifiersObject,
  elementsMap: ElementsMap,
) =>
const round = (x: number) =>
const dedupePoints = (points: GlobalPoint[]): GlobalPoint[] =>
const createPointSnapLines = (
  nearestSnapsX: Snaps,
  nearestSnapsY: Snaps,
): PointSnapLine[] =>
const dedupeGapSnapLines = (gapSnapLines: GapSnapLine[]) =>
const createGapSnapLines = (
  selectedElements: ExcalidrawElement[],
  dragOffset: Vector2D,
  gapSnaps: GapSnap[],
): GapSnapLine[] =>
export const snapResizingElements = (
  selectedElements: ExcalidrawElement[],
  selectedOriginalElements: ExcalidrawElement[],
  app: AppClassProperties,
  event: KeyboardModifiersObject,
  dragOffset: Vector2D,
  transformHandle: MaybeTransformHandleType,
) =>
export const snapNewElement = (
  newElement: ExcalidrawElement,
  app: AppClassProperties,
  event: KeyboardModifiersObject,
  origin: Vector2D,
  dragOffset: Vector2D,
  elementsMap: ElementsMap,
) =>
export const getSnapLinesAtPointer = (
  elements: readonly ExcalidrawElement[],
  app: AppClassProperties,
  pointer: Vector2D,
  event: KeyboardModifiersObject,
  elementsMap: ElementsMap,
) =>
export const isActiveToolNonLinearSnappable = (
  activeToolType: AppState["activeTool"]["type"],
) =>
```

## File: packages/excalidraw/textAutoResizeHandle.ts
```typescript
import { DEFAULT_TRANSFORM_HANDLE_SPACING } from "@excalidraw/common";
import {
  pointFrom,
  pointRotateRads,
  type GlobalPoint,
  type Radians,
} from "@excalidraw/math";
import type { EditorInterface } from "@excalidraw/common";
import type { ExcalidrawTextElement } from "@excalidraw/element/types";
⋮----
export const getTextBoxPadding = (zoomValue: number)
export const getTextAutoResizeHandle = (
  textElement: ExcalidrawTextElement,
  zoomValue: number,
  formFactor: EditorInterface["formFactor"],
) =>
export const isPointHittingTextAutoResizeHandle = (
  point: Readonly<{ x: number; y: number }>,
  textElement: ExcalidrawTextElement,
  zoomValue: number,
  formFactor: EditorInterface["formFactor"],
) =>
```

## File: packages/excalidraw/types.ts
```typescript
import type {
  IMAGE_MIME_TYPES,
  UserIdleState,
  throttleRAF,
  MIME_TYPES,
  EditorInterface,
} from "@excalidraw/common";
import type { LinearElementEditor } from "@excalidraw/element";
import type { MaybeTransformHandleType } from "@excalidraw/element";
import type {
  PointerType,
  ExcalidrawLinearElement,
  NonDeletedExcalidrawElement,
  NonDeleted,
  TextAlign,
  ExcalidrawElement,
  GroupId,
  ExcalidrawBindableElement,
  Arrowhead,
  FontFamilyValues,
  FileId,
  Theme,
  StrokeRoundness,
  ExcalidrawEmbeddableElement,
  ExcalidrawMagicFrameElement,
  ExcalidrawFrameLikeElement,
  ExcalidrawElementType,
  ExcalidrawIframeLikeElement,
  OrderedExcalidrawElement,
  ExcalidrawNonSelectionElement,
  BindMode,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import type {
  Merge,
  MaybePromise,
  ValueOf,
  MakeBrand,
} from "@excalidraw/common/utility-types";
import type {
  CaptureUpdateActionType,
  DurableIncrement,
  EphemeralIncrement,
} from "@excalidraw/element";
import type { GlobalPoint } from "@excalidraw/math";
import type { Action } from "./actions/types";
import type { Spreadsheet } from "./charts";
import type { ClipboardData } from "./clipboard";
import type App from "./components/App";
import type Library from "./data/library";
import type { ContextMenuItems } from "./components/ContextMenu";
import type { SnapLine } from "./snapping";
import type { ImportedDataState } from "./data/types";
import type { Language } from "./i18n";
import type { isOverScrollBars } from "./scene/scrollbars";
import type React from "react";
import type { JSX } from "react";
⋮----
export type SocketId = string & { _brand: "SocketId" };
export type Collaborator = Readonly<{
  pointer?: CollaboratorPointer;
  button?: "up" | "down";
  selectedElementIds?: AppState["selectedElementIds"];
  username?: string | null;
  userState?: UserIdleState;
  color?: {
    background: string;
    stroke: string;
  };
  avatarUrl?: string;
  id?: string;
  socketId?: SocketId;
  isCurrentUser?: boolean;
  isInCall?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
}>;
export type CollaboratorPointer = {
  x: number;
  y: number;
  tool: "pointer" | "laser";
  renderCursor?: boolean;
  laserColor?: string;
};
export type DataURL = string & { _brand: "DataURL" };
export type BinaryFileData = {
  mimeType:
    | ValueOf<typeof IMAGE_MIME_TYPES>
    | typeof MIME_TYPES.binary;
  id: FileId;
  dataURL: DataURL;
  created: number;
  lastRetrieved?: number;
  version?: number;
};
export type BinaryFileMetadata = Omit<BinaryFileData, "dataURL">;
export type BinaryFiles = Record<ExcalidrawElement["id"], BinaryFileData>;
export type ToolType =
  | "selection"
  | "lasso"
  | "rectangle"
  | "diamond"
  | "ellipse"
  | "arrow"
  | "line"
  | "freedraw"
  | "text"
  | "image"
  | "eraser"
  | "hand"
  | "frame"
  | "magicframe"
  | "embeddable"
  | "laser";
export type ElementOrToolType = ExcalidrawElementType | ToolType | "custom";
export type ActiveTool =
  | {
      type: ToolType;
      customType: null;
    }
  | {
      type: "custom";
      customType: string;
    };
export type SidebarName = string;
export type SidebarTabName = string;
export type UserToFollow = {
  socketId: SocketId;
  username: string;
};
type _CommonCanvasAppState = {
  zoom: AppState["zoom"];
  scrollX: AppState["scrollX"];
  scrollY: AppState["scrollY"];
  width: AppState["width"];
  height: AppState["height"];
  viewModeEnabled: AppState["viewModeEnabled"];
  openDialog: AppState["openDialog"];
  editingGroupId: AppState["editingGroupId"];
  selectedElementIds: AppState["selectedElementIds"];
  frameToHighlight: AppState["frameToHighlight"];
  offsetLeft: AppState["offsetLeft"];
  offsetTop: AppState["offsetTop"];
  theme: AppState["theme"];
};
export type StaticCanvasAppState = Readonly<
  _CommonCanvasAppState & {
    shouldCacheIgnoreZoom: AppState["shouldCacheIgnoreZoom"];
    viewBackgroundColor: AppState["viewBackgroundColor"] | null;
    exportScale: AppState["exportScale"];
    selectedElementsAreBeingDragged: AppState["selectedElementsAreBeingDragged"];
    gridSize: AppState["gridSize"];
    gridStep: AppState["gridStep"];
    frameRendering: AppState["frameRendering"];
    currentHoveredFontFamily: AppState["currentHoveredFontFamily"];
    hoveredElementIds: AppState["hoveredElementIds"];
    suggestedBinding: AppState["suggestedBinding"];
    croppingElementId: AppState["croppingElementId"];
  }
>;
export type InteractiveCanvasAppState = Readonly<
  _CommonCanvasAppState & {
    activeTool: AppState["activeTool"];
    activeEmbeddable: AppState["activeEmbeddable"];
    selectionElement: AppState["selectionElement"];
    selectedGroupIds: AppState["selectedGroupIds"];
    selectedLinearElement: AppState["selectedLinearElement"];
    multiElement: AppState["multiElement"];
    newElement: AppState["newElement"];
    isBindingEnabled: AppState["isBindingEnabled"];
    isMidpointSnappingEnabled: AppState["isMidpointSnappingEnabled"];
    suggestedBinding: AppState["suggestedBinding"];
    isRotating: AppState["isRotating"];
    elementsToHighlight: AppState["elementsToHighlight"];
    collaborators: AppState["collaborators"];
    snapLines: AppState["snapLines"];
    zenModeEnabled: AppState["zenModeEnabled"];
    editingTextElement: AppState["editingTextElement"];
    isCropping: AppState["isCropping"];
    croppingElementId: AppState["croppingElementId"];
    searchMatches: AppState["searchMatches"];
    activeLockedId: AppState["activeLockedId"];
    hoveredElementIds: AppState["hoveredElementIds"];
    frameRendering: AppState["frameRendering"];
    shouldCacheIgnoreZoom: AppState["shouldCacheIgnoreZoom"];
    exportScale: AppState["exportScale"];
    currentItemArrowType: AppState["currentItemArrowType"];
  }
>;
export type ObservedAppState = ObservedStandaloneAppState &
  ObservedElementsAppState;
export type ObservedStandaloneAppState = {
  name: AppState["name"];
  viewBackgroundColor: AppState["viewBackgroundColor"];
};
export type ObservedElementsAppState = {
  editingGroupId: AppState["editingGroupId"];
  selectedElementIds: AppState["selectedElementIds"];
  selectedGroupIds: AppState["selectedGroupIds"];
  selectedLinearElement: {
    elementId: LinearElementEditor["elementId"];
    isEditing: boolean;
  } | null;
  croppingElementId: AppState["croppingElementId"];
  lockedMultiSelections: AppState["lockedMultiSelections"];
  activeLockedId: AppState["activeLockedId"];
};
export interface AppState {
  contextMenu: {
    items: ContextMenuItems;
    top: number;
    left: number;
  } | null;
  showWelcomeScreen: boolean;
  isLoading: boolean;
  errorMessage: React.ReactNode;
  activeEmbeddable: {
    element: NonDeletedExcalidrawElement;
    state: "hover" | "active";
  } | null;
  newElement: NonDeleted<ExcalidrawNonSelectionElement> | null;
  resizingElement: NonDeletedExcalidrawElement | null;
  multiElement: NonDeleted<ExcalidrawLinearElement> | null;
  selectionElement: NonDeletedExcalidrawElement | null;
  isBindingEnabled: boolean;
  bindingPreference: "enabled" | "disabled";
  isMidpointSnappingEnabled: boolean;
  startBoundElement: NonDeleted<ExcalidrawBindableElement> | null;
  suggestedBinding: {
    element: NonDeleted<ExcalidrawBindableElement>;
    midPoint?: GlobalPoint;
  } | null;
  frameToHighlight: NonDeleted<ExcalidrawFrameLikeElement> | null;
  frameRendering: {
    enabled: boolean;
    name: boolean;
    outline: boolean;
    clip: boolean;
  };
  editingFrame: string | null;
  elementsToHighlight: NonDeleted<ExcalidrawElement>[] | null;
  editingTextElement: ExcalidrawTextElement | null;
  activeTool: {
    lastActiveTool: ActiveTool | null;
    locked: boolean;
    fromSelection: boolean;
  } & ActiveTool;
  preferredSelectionTool: {
    type: "selection" | "lasso";
    initialized: boolean;
  };
  penMode: boolean;
  penDetected: boolean;
  exportBackground: boolean;
  exportEmbedScene: boolean;
  exportWithDarkMode: boolean;
  exportScale: number;
  currentItemStrokeColor: string;
  currentItemBackgroundColor: string;
  currentItemFillStyle: ExcalidrawElement["fillStyle"];
  currentItemStrokeWidth: number;
  currentItemStrokeStyle: ExcalidrawElement["strokeStyle"];
  currentItemRoughness: number;
  currentItemOpacity: number;
  currentItemFontFamily: FontFamilyValues;
  currentItemFontSize: number;
  currentItemTextAlign: TextAlign;
  currentItemStartArrowhead: Arrowhead | null;
  currentItemEndArrowhead: Arrowhead | null;
  currentHoveredFontFamily: FontFamilyValues | null;
  currentItemRoundness: StrokeRoundness;
  currentItemArrowType: "sharp" | "round" | "elbow";
  viewBackgroundColor: string;
  scrollX: number;
  scrollY: number;
  cursorButton: "up" | "down";
  scrolledOutside: boolean;
  name: string | null;
  isResizing: boolean;
  isRotating: boolean;
  zoom: Zoom;
  openMenu: "canvas" | null;
  openPopup:
    | "canvasBackground"
    | "elementBackground"
    | "elementStroke"
    | "fontFamily"
    | "compactTextProperties"
    | "compactStrokeStyles"
    | "compactOtherProperties"
    | "compactArrowProperties"
    | null;
  openSidebar: { name: SidebarName; tab?: SidebarTabName } | null;
  openDialog:
    | null
    | { name: "imageExport" | "help" | "jsonExport" }
    | { name: "ttd"; tab: "text-to-diagram" | "mermaid" }
    | { name: "commandPalette" }
    | { name: "settings" }
    | { name: "elementLinkSelector"; sourceElementId: ExcalidrawElement["id"] }
    | { name: "charts"; data: Spreadsheet; rawText: string };
  defaultSidebarDockedPreference: boolean;
  lastPointerDownWith: PointerType;
  selectedElementIds: Readonly<{ [id: string]: true }>;
  hoveredElementIds: Readonly<{ [id: string]: true }>;
  previousSelectedElementIds: { [id: string]: true };
  selectedElementsAreBeingDragged: boolean;
  shouldCacheIgnoreZoom: boolean;
  toast: {
    message: React.ReactNode;
    closable?: boolean;
    duration?: number;
  } | null;
  zenModeEnabled: boolean;
  theme: Theme;
  gridSize: number;
  gridStep: number;
  gridModeEnabled: boolean;
  viewModeEnabled: boolean;
  selectedGroupIds: { [groupId: string]: boolean };
  editingGroupId: GroupId | null;
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
  fileHandle: FileSystemFileHandle | null;
  collaborators: Map<SocketId, Collaborator>;
  stats: {
    open: boolean;
    panels: number;
  };
  showHyperlinkPopup: false | "info" | "editor";
  selectedLinearElement: LinearElementEditor | null;
  snapLines: readonly SnapLine[];
  originSnapOffset: {
    x: number;
    y: number;
  } | null;
  objectsSnapModeEnabled: boolean;
  userToFollow: UserToFollow | null;
  followedBy: Set<SocketId>;
  isCropping: boolean;
  croppingElementId: ExcalidrawElement["id"] | null;
  searchMatches: Readonly<{
    focusedId: ExcalidrawElement["id"] | null;
    matches: readonly SearchMatch[];
  }> | null;
  activeLockedId: string | null;
  lockedMultiSelections: { [groupId: string]: true };
  bindMode: BindMode;
}
export type SearchMatch = {
  id: string;
  focus: boolean;
  matchedLines: {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    showOnCanvas: boolean;
  }[];
};
export type UIAppState = Omit<
  AppState,
  "startBoundElement" | "cursorButton" | "scrollX" | "scrollY"
>;
export type NormalizedZoomValue = number & { _brand: "normalizedZoom" };
export type Zoom = Readonly<{
  value: NormalizedZoomValue;
}>;
export type PointerCoords = Readonly<{
  x: number;
  y: number;
}>;
export type Gesture = {
  pointers: Map<number, PointerCoords>;
  lastCenter: { x: number; y: number } | null;
  initialDistance: number | null;
  initialScale: number | null;
};
export declare class GestureEvent extends UIEvent
export type LibraryItem_v1 = readonly NonDeleted<ExcalidrawElement>[];
type LibraryItems_v1 = readonly LibraryItem_v1[];
export type LibraryItem = {
  id: string;
  status: "published" | "unpublished";
  elements: readonly NonDeleted<ExcalidrawElement>[];
  created: number;
  name?: string;
  error?: string;
};
export type LibraryItems = readonly LibraryItem[];
export type LibraryItems_anyVersion = LibraryItems | LibraryItems_v1;
export type LibraryItemsSource =
  | ((
      currentLibraryItems: LibraryItems,
    ) => MaybePromise<LibraryItems_anyVersion | Blob>)
  | MaybePromise<LibraryItems_anyVersion | Blob>;
export type ExcalidrawInitialDataState = Merge<
  ImportedDataState,
  {
    libraryItems?: MaybePromise<Required<ImportedDataState>["libraryItems"]>;
  }
>;
export type OnUserFollowedPayload = {
  userToFollow: UserToFollow;
  action: "FOLLOW" | "UNFOLLOW";
};
export type OnExportProgress = {
  type: "progress";
  message?: React.ReactNode;
  progress?: number;
};
export interface ExcalidrawProps {
  onChange?: (
    elements: readonly OrderedExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles,
  ) => void;
  onIncrement?: (event: DurableIncrement | EphemeralIncrement) => void;
  initialData?:
    | (() => MaybePromise<ExcalidrawInitialDataState | null>)
    | MaybePromise<ExcalidrawInitialDataState | null>;
  onExcalidrawAPI?: (api: ExcalidrawImperativeAPI | null) => void;
  onMount?: (payload: ExcalidrawMountPayload) => void;
  onUnmount?: () => void;
  onInitialize?: (api: ExcalidrawImperativeAPI) => void;
  isCollaborating?: boolean;
  onPointerUpdate?: (payload: {
    pointer: { x: number; y: number; tool: "pointer" | "laser" };
    button: "down" | "up";
    pointersMap: Gesture["pointers"];
  }) => void;
  onPaste?: (
    data: ClipboardData,
    event: ClipboardEvent | null,
  ) => Promise<boolean> | boolean;
  onDuplicate?: (
    nextElements: readonly ExcalidrawElement[],
    prevElements: readonly ExcalidrawElement[],
  ) => ExcalidrawElement[] | void;
  renderTopLeftUI?: (
    isMobile: boolean,
    appState: UIAppState,
  ) => JSX.Element | null;
  renderTopRightUI?: (
    isMobile: boolean,
    appState: UIAppState,
  ) => JSX.Element | null;
  langCode?: Language["code"];
  viewModeEnabled?: boolean;
  zenModeEnabled?: boolean;
  gridModeEnabled?: boolean;
  objectsSnapModeEnabled?: boolean;
  libraryReturnUrl?: string;
  theme?: Theme;
  name?: string;
  renderCustomStats?: (
    elements: readonly NonDeletedExcalidrawElement[],
    appState: UIAppState,
  ) => JSX.Element;
  UIOptions?: Partial<UIOptions>;
  detectScroll?: boolean;
  handleKeyboardGlobally?: boolean;
  onLibraryChange?: (libraryItems: LibraryItems) => void | Promise<any>;
  autoFocus?: boolean;
  generateIdForFile?: (file: File) => string | Promise<string>;
  generateLinkForSelection?: (id: string, type: "element" | "group") => string;
  onLinkOpen?: (
    element: NonDeletedExcalidrawElement,
    event: CustomEvent<{
      nativeEvent: MouseEvent | React.PointerEvent<HTMLCanvasElement>;
    }>,
  ) => void;
  onPointerDown?: (
    activeTool: AppState["activeTool"],
    pointerDownState: PointerDownState,
  ) => void;
  onPointerUp?: (
    activeTool: AppState["activeTool"],
    pointerDownState: PointerDownState,
  ) => void;
  onScrollChange?: (scrollX: number, scrollY: number, zoom: Zoom) => void;
  onUserFollow?: (payload: OnUserFollowedPayload) => void;
  children?: React.ReactNode;
  validateEmbeddable?:
    | boolean
    | string[]
    | RegExp
    | RegExp[]
    | ((link: string) => boolean | undefined);
  renderEmbeddable?: (
    element: NonDeleted<ExcalidrawEmbeddableElement>,
    appState: AppState,
  ) => JSX.Element | null;
  aiEnabled?: boolean;
  showDeprecatedFonts?: boolean;
  renderScrollbars?: boolean;
  onExport?: (
    type: "json",
    data: {
      elements: readonly ExcalidrawElement[];
      appState: AppState;
      files: BinaryFiles;
    },
    options: {
      signal: AbortSignal;
    },
  ) => MaybePromise<void> | AsyncGenerator<OnExportProgress, void>;
}
export type SceneData = {
  elements?: ImportedDataState["elements"];
  appState?: ImportedDataState["appState"];
  collaborators?: Map<SocketId, Collaborator>;
  captureUpdate?: CaptureUpdateActionType;
};
export type ExportOpts = {
  saveFileToDisk?: boolean;
  onExportToBackend?: (
    exportedElements: readonly NonDeletedExcalidrawElement[],
    appState: UIAppState,
    files: BinaryFiles,
  ) => void;
  renderCustomUI?: (
    exportedElements: readonly NonDeletedExcalidrawElement[],
    appState: UIAppState,
    files: BinaryFiles,
    canvas: HTMLCanvasElement,
  ) => JSX.Element;
};
export type CanvasActions = Partial<{
  changeViewBackgroundColor: boolean;
  clearCanvas: boolean;
  export: false | ExportOpts;
  loadScene: boolean;
  saveToActiveFile: boolean;
  toggleTheme: boolean | null;
  saveAsImage: boolean;
}>;
export type UIOptions = Partial<{
  dockedSidebarBreakpoint: number;
  canvasActions: CanvasActions;
  tools: {
    image: boolean;
  };
  getFormFactor?: (
    editorWidth: number,
    editorHeight: number,
  ) => EditorInterface["formFactor"];
  welcomeScreen?: boolean;
}>;
export type AppProps = Merge<
  ExcalidrawProps,
  {
    UIOptions: Merge<
      UIOptions,
      {
        canvasActions: Required<CanvasActions> & { export: ExportOpts };
      }
    >;
    detectScroll: boolean;
    handleKeyboardGlobally: boolean;
    isCollaborating: boolean;
    children?: React.ReactNode;
    aiEnabled: boolean;
  }
>;
export type AppClassProperties = {
  props: AppProps;
  state: AppState;
  api: App["api"];
  sessionExportThemeOverride: App["sessionExportThemeOverride"];
  interactiveCanvas: HTMLCanvasElement | null;
  canvas: HTMLCanvasElement;
  focusContainer(): void;
  library: Library;
  imageCache: Map<
    FileId,
    {
      image: HTMLImageElement | Promise<HTMLImageElement>;
      mimeType: ValueOf<typeof IMAGE_MIME_TYPES>;
    }
  >;
  files: BinaryFiles;
  editorInterface: App["editorInterface"];
  scene: App["scene"];
  syncActionResult: App["syncActionResult"];
  fonts: App["fonts"];
  pasteFromClipboard: App["pasteFromClipboard"];
  id: App["id"];
  onInsertElements: App["onInsertElements"];
  onExportImage: App["onExportImage"];
  lastViewportPosition: App["lastViewportPosition"];
  scrollToContent: App["scrollToContent"];
  addFiles: App["addFiles"];
  addElementsFromPasteOrLibrary: App["addElementsFromPasteOrLibrary"];
  togglePenMode: App["togglePenMode"];
  toggleLock: App["toggleLock"];
  setActiveTool: App["setActiveTool"];
  setOpenDialog: App["setOpenDialog"];
  insertEmbeddableElement: App["insertEmbeddableElement"];
  onMagicframeToolSelect: App["onMagicframeToolSelect"];
  getName: App["getName"];
  dismissLinearEditor: App["dismissLinearEditor"];
  flowChartCreator: App["flowChartCreator"];
  getEffectiveGridSize: App["getEffectiveGridSize"];
  setPlugins: App["setPlugins"];
  plugins: App["plugins"];
  getEditorUIOffsets: App["getEditorUIOffsets"];
  visibleElements: App["visibleElements"];
  excalidrawContainerValue: App["excalidrawContainerValue"];
  onPointerUpEmitter: App["onPointerUpEmitter"];
  updateEditorAtom: App["updateEditorAtom"];
  onPointerDownEmitter: App["onPointerDownEmitter"];
  onEvent: App["onEvent"];
  onStateChange: App["onStateChange"];
  lastPointerMoveCoords: App["lastPointerMoveCoords"];
  bindModeHandler: App["bindModeHandler"];
  setAppState: App["setAppState"];
};
⋮----
focusContainer(): void;
⋮----
export type PointerDownState = Readonly<{
  origin: Readonly<{ x: number; y: number }>;
  originInGrid: Readonly<{ x: number; y: number }>;
  scrollbars: ReturnType<typeof isOverScrollBars>;
  lastCoords: { x: number; y: number };
  originalElements: Map<string, NonDeleted<ExcalidrawElement>>;
  resize: {
    handleType: MaybeTransformHandleType;
    isResizing: boolean;
    offset: { x: number; y: number };
    arrowDirection: "origin" | "end";
    center: { x: number; y: number };
  };
  hit: {
    element: NonDeleted<ExcalidrawElement> | null;
    allHitElements: NonDeleted<ExcalidrawElement>[];
    wasAddedToSelection: boolean;
    hasBeenDuplicated: boolean;
    hasHitCommonBoundingBoxOfSelectedElements: boolean;
  };
  withCmdOrCtrl: boolean;
  drag: {
    hasOccurred: boolean;
    offset: { x: number; y: number } | null;
    origin: { x: number; y: number };
    blockDragging: boolean;
  };
  eventListeners: {
    onMove: null | ReturnType<typeof throttleRAF>;
    onUp: null | ((event: PointerEvent) => void);
    onKeyDown: null | ((event: KeyboardEvent) => void);
    onKeyUp: null | ((event: KeyboardEvent) => void);
  };
  boxSelection: {
    hasOccurred: boolean;
  };
}>;
export type UnsubscribeCallback = () => void;
export type ExcalidrawMountPayload = {
  excalidrawAPI: ExcalidrawImperativeAPI;
  container: HTMLDivElement | null;
};
export type ExcalidrawImperativeAPIEventMap = {
  "editor:mount": [payload: ExcalidrawMountPayload];
  "editor:initialize": [api: ExcalidrawImperativeAPI];
  "editor:unmount": [];
};
export interface ExcalidrawImperativeAPI {
  isDestroyed: boolean;
  updateScene: InstanceType<typeof App>["updateScene"];
  applyDeltas: InstanceType<typeof App>["applyDeltas"];
  mutateElement: InstanceType<typeof App>["mutateElement"];
  updateLibrary: InstanceType<typeof Library>["updateLibrary"];
  resetScene: InstanceType<typeof App>["resetScene"];
  getSceneElementsIncludingDeleted: InstanceType<
    typeof App
  >["getSceneElementsIncludingDeleted"];
  getSceneElementsMapIncludingDeleted: InstanceType<
    typeof App
  >["getSceneElementsMapIncludingDeleted"];
  history: {
    clear: InstanceType<typeof App>["resetHistory"];
  };
  getSceneElements: InstanceType<typeof App>["getSceneElements"];
  getAppState: () => InstanceType<typeof App>["state"];
  getFiles: () => InstanceType<typeof App>["files"];
  getName: InstanceType<typeof App>["getName"];
  scrollToContent: InstanceType<typeof App>["scrollToContent"];
  registerAction: (action: Action) => void;
  refresh: InstanceType<typeof App>["refresh"];
  setToast: InstanceType<typeof App>["setToast"];
  addFiles: (data: BinaryFileData[]) => void;
  id: string;
  setActiveTool: InstanceType<typeof App>["setActiveTool"];
  setCursor: InstanceType<typeof App>["setCursor"];
  resetCursor: InstanceType<typeof App>["resetCursor"];
  toggleSidebar: InstanceType<typeof App>["toggleSidebar"];
  getEditorInterface: () => EditorInterface;
  updateFrameRendering: InstanceType<typeof App>["updateFrameRendering"];
  onChange: (
    callback: (
      elements: readonly ExcalidrawElement[],
      appState: AppState,
      files: BinaryFiles,
    ) => void,
  ) => UnsubscribeCallback;
  onIncrement: (
    callback: (event: DurableIncrement | EphemeralIncrement) => void,
  ) => UnsubscribeCallback;
  onPointerDown: (
    callback: (
      activeTool: AppState["activeTool"],
      pointerDownState: PointerDownState,
      event: React.PointerEvent<HTMLElement>,
    ) => void,
  ) => UnsubscribeCallback;
  onPointerUp: (
    callback: (
      activeTool: AppState["activeTool"],
      pointerDownState: PointerDownState,
      event: PointerEvent,
    ) => void,
  ) => UnsubscribeCallback;
  onScrollChange: (
    callback: (scrollX: number, scrollY: number, zoom: Zoom) => void,
  ) => UnsubscribeCallback;
  onUserFollow: (
    callback: (payload: OnUserFollowedPayload) => void,
  ) => UnsubscribeCallback;
  onStateChange: InstanceType<typeof App>["onStateChange"];
  onEvent: InstanceType<typeof App>["onEvent"];
}
export type FrameNameBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
};
export type FrameNameBoundsCache = {
  get: (
    frameElement: ExcalidrawFrameLikeElement | ExcalidrawMagicFrameElement,
  ) => FrameNameBounds | null;
  _cache: Map<
    string,
    FrameNameBounds & {
      zoom: AppState["zoom"]["value"];
      versionNonce: ExcalidrawFrameLikeElement["versionNonce"];
    }
  >;
};
export type KeyboardModifiersObject = {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
};
export type Primitive =
  | number
  | string
  | boolean
  | bigint
  | symbol
  | null
  | undefined;
export type JSONValue = string | number | boolean | null | object;
export type EmbedsValidationStatus = Map<
  ExcalidrawIframeLikeElement["id"],
  boolean
>;
export type ElementsPendingErasure = Set<ExcalidrawElement["id"]>;
export type PendingExcalidrawElements = ExcalidrawElement[];
export type NullableGridSize =
  | (AppState["gridSize"] & MakeBrand<"NullableGridSize">)
  | null;
export type GenerateDiagramToCode = (props: {
  frame: ExcalidrawMagicFrameElement;
  children: readonly ExcalidrawElement[];
}) => MaybePromise<{ html: string }>;
export type Offsets = Partial<{
  top: number;
  right: number;
  bottom: number;
  left: number;
}>;
```

## File: packages/excalidraw/vite-env.d.ts
```typescript
interface ImportMetaEnv {
  VITE_APP_PORT: string;
  VITE_APP_BACKEND_V2_GET_URL: string;
  VITE_APP_BACKEND_V2_POST_URL: string;
  VITE_APP_LIBRARY_URL: string;
  VITE_APP_LIBRARY_BACKEND: string;
  VITE_APP_WS_SERVER_URL: string;
  VITE_APP_PORTAL_URL: string;
  VITE_APP_AI_BACKEND: string;
  VITE_APP_FIREBASE_CONFIG: string;
  VITE_APP_DEV_DISABLE_LIVE_RELOAD: string;
  VITE_APP_DEBUG_ENABLE_TEXT_CONTAINER_BOUNDING_BOX: string;
  FAST_REFRESH: string;
  VITE_APP_MATOMO_URL: string;
  VITE_APP_CDN_MATOMO_TRACKER_URL: string;
  VITE_APP_MATOMO_SITE_ID: string;
  VITE_APP_DISABLE_SENTRY: string;
  VITE_APP_COLLAPSE_OVERLAY: string;
  VITE_APP_ENABLE_ESLINT: string;
  VITE_APP_ENABLE_TRACKING: string;
  PKG_NAME: string;
  PKG_VERSION: string;
  VITE_APP_PLUS_LP: string;
  VITE_APP_PLUS_APP: string;
  VITE_WORKER_ID: string;
  MODE: string;
  DEV: string;
  PROD: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## File: packages/excalidraw/workers.ts
```typescript
import { debounce } from "@excalidraw/common";
import { WorkerInTheMainChunkError, WorkerUrlNotDefinedError } from "./errors";
class IdleWorker
⋮----
constructor(workerUrl: URL)
⋮----
export class WorkerPool<T, R>
⋮----
private constructor(
    workerUrl: URL,
    options: {
      ttl?: number;
    },
)
public static create<T, R>(
    workerUrl: URL | undefined,
    options: {
      ttl?: number;
    } = {},
): WorkerPool<T, R>
public async postMessage(
    data: T,
    options: StructuredSerializeOptions,
): Promise<R>
public async clear()
private async createWorker(): Promise<IdleWorker>
private onMessageHandler(worker: IdleWorker, resolve: (value: R) => void)
private onErrorHandler(
    worker: IdleWorker,
    reject: (reason: ErrorEvent) => void,
)
```

## File: packages/math/src/angle.ts
```typescript
import { PRECISION } from "./utils";
import type {
  Degrees,
  GlobalPoint,
  LocalPoint,
  PolarCoords,
  Radians,
} from "./types";
export const normalizeRadians = (angle: Radians): Radians
export const cartesian2Polar = <P extends GlobalPoint | LocalPoint>([
export function degreesToRadians(degrees: Degrees): Radians
export function radiansToDegrees(degrees: Radians): Degrees
export function isRightAngleRads(rads: Radians): boolean
export function radiansBetweenAngles(
  a: Radians,
  min: Radians,
  max: Radians,
): boolean
export function radiansDifference(a: Radians, b: Radians): Radians
```

## File: packages/math/src/constants.ts
```typescript

```

## File: packages/math/src/curve.ts
```typescript
import { isPoint, pointDistance, pointFrom, pointFromVector } from "./point";
import { vector, vectorNormal, vectorNormalize, vectorScale } from "./vector";
import { LegendreGaussN24CValues, LegendreGaussN24TValues } from "./constants";
import type { Curve, GlobalPoint, LineSegment, LocalPoint } from "./types";
export function curve<Point extends GlobalPoint | LocalPoint>(
  a: Point,
  b: Point,
  c: Point,
  d: Point,
)
function solveWithAnalyticalJacobian<Point extends GlobalPoint | LocalPoint>(
  curve: Curve<Point>,
  lineSegment: LineSegment<Point>,
  t0: number,
  s0: number,
  tolerance: number = 1e-3,
  iterLimit: number = 10,
): number[] | null
export const bezierEquation = <Point extends GlobalPoint | LocalPoint>(
  c: Curve<Point>,
  t: number,
)
⋮----
const calculate = <Point extends GlobalPoint | LocalPoint>(
  [t0, s0]: [number, number],
  l: LineSegment<Point>,
  c: Curve<Point>,
) =>
export function curveIntersectLineSegment<
  Point extends GlobalPoint | LocalPoint,
>(c: Curve<Point>, l: LineSegment<Point>): Point[]
export function curveClosestPoint<Point extends GlobalPoint | LocalPoint>(
  c: Curve<Point>,
  p: Point,
  tolerance: number = 1e-3,
): Point | null
⋮----
const localMinimum = (
    min: number,
    max: number,
    f: (t: number) => number,
    e: number = tolerance,
) =>
⋮----
export function curvePointDistance<Point extends GlobalPoint | LocalPoint>(
  c: Curve<Point>,
  p: Point,
)
export function isCurve<P extends GlobalPoint | LocalPoint>(
  v: unknown,
): v is Curve<P>
export function curveTangent<Point extends GlobalPoint | LocalPoint>(
  [p0, p1, p2, p3]: Curve<Point>,
  t: number,
)
export function curveCatmullRomQuadraticApproxPoints(
  points: GlobalPoint[],
  tension = 0.5,
)
export function curveCatmullRomCubicApproxPoints<
  Point extends GlobalPoint | LocalPoint,
>(points: Point[], tension = 0.5)
export function curveOffsetPoints(
  [p0, p1, p2, p3]: Curve<GlobalPoint>,
  offset: number,
  steps = 50,
)
export function offsetPointsForQuadraticBezier(
  p0: GlobalPoint,
  p1: GlobalPoint,
  p2: GlobalPoint,
  offsetDist: number,
  steps = 50,
)
export function curveLength<P extends GlobalPoint | LocalPoint>(
  c: Curve<P>,
): number
export function curveLengthAtParameter<P extends GlobalPoint | LocalPoint>(
  c: Curve<P>,
  t: number,
): number
export function curvePointAtLength<P extends GlobalPoint | LocalPoint>(
  c: Curve<P>,
  percent: number,
): P
```

## File: packages/math/src/ellipse.ts
```typescript
import {
  pointFrom,
  pointDistance,
  pointFromVector,
  pointsEqual,
} from "./point";
import { PRECISION } from "./utils";
import {
  vector,
  vectorAdd,
  vectorDot,
  vectorFromPoint,
  vectorScale,
} from "./vector";
import type {
  Ellipse,
  GlobalPoint,
  Line,
  LineSegment,
  LocalPoint,
} from "./types";
export function ellipse<Point extends GlobalPoint | LocalPoint>(
  center: Point,
  halfWidth: number,
  halfHeight: number,
): Ellipse<Point>
export const ellipseIncludesPoint = <Point extends GlobalPoint | LocalPoint>(
  p: Point,
  ellipse: Ellipse<Point>,
) =>
export const ellipseTouchesPoint = <Point extends GlobalPoint | LocalPoint>(
  point: Point,
  ellipse: Ellipse<Point>,
  threshold = PRECISION,
) =>
export const ellipseDistanceFromPoint = <
  Point extends GlobalPoint | LocalPoint,
>(
  p: Point,
  ellipse: Ellipse<Point>,
): number =>
export function ellipseSegmentInterceptPoints<
  Point extends GlobalPoint | LocalPoint,
>(e: Readonly<Ellipse<Point>>, s: Readonly<LineSegment<Point>>): Point[]
export function ellipseLineIntersectionPoints<
  Point extends GlobalPoint | LocalPoint,
>(
  { center, halfWidth, halfHeight }: Ellipse<Point>,
  [g, h]: Line<Point>,
): Point[]
```

## File: packages/math/src/index.ts
```typescript

```

## File: packages/math/src/line.ts
```typescript
import { pointFrom } from "./point";
import type { GlobalPoint, Line, LocalPoint } from "./types";
export function line<P extends GlobalPoint | LocalPoint>(a: P, b: P): Line<P>
export function linesIntersectAt<Point extends GlobalPoint | LocalPoint>(
  a: Line<Point>,
  b: Line<Point>,
): Point | null
```

## File: packages/math/src/point.ts
```typescript
import { degreesToRadians } from "./angle";
import { PRECISION } from "./utils";
import { vectorFromPoint, vectorScale } from "./vector";
import type {
  LocalPoint,
  GlobalPoint,
  Radians,
  Degrees,
  Vector,
  GlobalCoord,
  LocalCoord,
} from "./types";
export function pointFrom<Point extends GlobalPoint | LocalPoint>(
  x: number,
  y: number,
): Point;
export function pointFrom<Coord extends GlobalCoord | LocalCoord>(
  coords: Coord,
): Coord extends GlobalCoord ? GlobalPoint : LocalPoint;
export function pointFrom<Point extends GlobalPoint | LocalPoint>(coords: {
  x: number;
  y: number;
}): Point;
export function pointFrom<Point extends GlobalPoint | LocalPoint>(
  xOrCoords: number | { x: number; y: number },
  y?: number,
): Point
export function pointFromArray<Point extends GlobalPoint | LocalPoint>(
  numberArray: number[],
): Point | undefined
export function pointFromPair<Point extends GlobalPoint | LocalPoint>(
  pair: [number, number],
): Point
export function pointFromVector<P extends GlobalPoint | LocalPoint>(
  v: Vector,
  offset: P = pointFrom(0, 0),
): P
export function isPoint(p: unknown): p is LocalPoint | GlobalPoint
export function pointsEqual<Point extends GlobalPoint | LocalPoint>(
  a: Point,
  b: Point,
  tolerance: number = PRECISION,
): boolean
export function pointRotateRads<Point extends GlobalPoint | LocalPoint>(
  point: Point,
  center: Point,
  angle: Radians,
): Point
export function pointRotateDegs<Point extends GlobalPoint | LocalPoint>(
  point: Point,
  center: Point,
  angle: Degrees,
): Point
export function pointTranslate<
  From extends GlobalPoint | LocalPoint,
  To extends GlobalPoint | LocalPoint,
>(p: From, v: Vector = [0, 0] as Vector): To
export function pointCenter<P extends LocalPoint | GlobalPoint>(a: P, b: P): P
export function pointDistance<P extends LocalPoint | GlobalPoint>(
  a: P,
  b: P,
): number
export function pointDistanceSq<P extends LocalPoint | GlobalPoint>(
  a: P,
  b: P,
): number
export const pointScaleFromOrigin = <P extends GlobalPoint | LocalPoint>(
  p: P,
  mid: P,
  multiplier: number,
)
export const isPointWithinBounds = <P extends GlobalPoint | LocalPoint>(
  p: P,
  q: P,
  r: P,
) =>
```

## File: packages/math/src/polygon.ts
```typescript
import { pointsEqual } from "./point";
import { lineSegment, pointOnLineSegment } from "./segment";
import { PRECISION } from "./utils";
import type { GlobalPoint, LocalPoint, Polygon } from "./types";
export function polygon<Point extends GlobalPoint | LocalPoint>(
  ...points: Point[]
)
export function polygonFromPoints<Point extends GlobalPoint | LocalPoint>(
  points: Point[],
)
export const polygonIncludesPoint = <Point extends LocalPoint | GlobalPoint>(
  point: Point,
  polygon: Polygon<Point>,
) =>
export const polygonIncludesPointNonZero = <Point extends [number, number]>(
  point: Point,
  polygon: Point[],
): boolean =>
export const pointOnPolygon = <Point extends LocalPoint | GlobalPoint>(
  p: Point,
  poly: Polygon<Point>,
  threshold = PRECISION,
) =>
function polygonClose<Point extends LocalPoint | GlobalPoint>(
  polygon: Point[],
)
function polygonIsClosed<Point extends LocalPoint | GlobalPoint>(
  polygon: Point[],
)
```

## File: packages/math/src/range.ts
```typescript
import { toBrandedType } from "@excalidraw/common";
import type { InclusiveRange } from "./types";
export function rangeInclusive(start: number, end: number): InclusiveRange
export function rangeInclusiveFromPair(pair: [start: number, end: number])
export const rangesOverlap = (
  [a0, a1]: InclusiveRange,
  [b0, b1]: InclusiveRange,
): boolean =>
export const rangeIntersection = (
  [a0, a1]: InclusiveRange,
  [b0, b1]: InclusiveRange,
): InclusiveRange | null =>
export const rangeIncludesValue = (
  value: number,
  [min, max]: InclusiveRange,
): boolean =>
```

## File: packages/math/src/rectangle.ts
```typescript
import { pointFrom } from "./point";
import { lineSegment, lineSegmentIntersectionPoints } from "./segment";
import type { GlobalPoint, LineSegment, LocalPoint, Rectangle } from "./types";
export function rectangle<P extends GlobalPoint | LocalPoint>(
  topLeft: P,
  bottomRight: P,
): Rectangle<P>
export function rectangleFromNumberSequence<
  Point extends LocalPoint | GlobalPoint,
>(minX: number, minY: number, maxX: number, maxY: number)
export function rectangleIntersectLineSegment<
  Point extends LocalPoint | GlobalPoint,
>(r: Rectangle<Point>, l: LineSegment<Point>): Point[]
export function rectangleIntersectRectangle<
  Point extends LocalPoint | GlobalPoint,
>(rectangle1: Rectangle<Point>, rectangle2: Rectangle<Point>): boolean
```

## File: packages/math/src/segment.ts
```typescript
import { line, linesIntersectAt } from "./line";
import {
  isPoint,
  pointCenter,
  pointFromVector,
  pointRotateRads,
} from "./point";
import { PRECISION } from "./utils";
import {
  vectorAdd,
  vectorCross,
  vectorFromPoint,
  vectorScale,
  vectorSubtract,
} from "./vector";
import type { GlobalPoint, LineSegment, LocalPoint, Radians } from "./types";
export function lineSegment<P extends GlobalPoint | LocalPoint>(
  a: P,
  b: P,
): LineSegment<P>
export const isLineSegment = <Point extends GlobalPoint | LocalPoint>(
  segment: unknown,
): segment is LineSegment<Point>
export const lineSegmentRotate = <Point extends LocalPoint | GlobalPoint>(
  l: LineSegment<Point>,
  angle: Radians,
  origin?: Point,
): LineSegment<Point> =>
export const segmentsIntersectAt = <Point extends GlobalPoint | LocalPoint>(
  a: Readonly<LineSegment<Point>>,
  b: Readonly<LineSegment<Point>>,
): Point | null =>
export const pointOnLineSegment = <Point extends LocalPoint | GlobalPoint>(
  point: Point,
  line: LineSegment<Point>,
  threshold = PRECISION,
) =>
export const distanceToLineSegment = <Point extends LocalPoint | GlobalPoint>(
  point: Point,
  line: LineSegment<Point>,
) =>
export function lineSegmentIntersectionPoints<
  Point extends GlobalPoint | LocalPoint,
>(
  l: LineSegment<Point>,
  s: LineSegment<Point>,
  threshold?: number,
): Point | null
export function lineSegmentsDistance<Point extends GlobalPoint | LocalPoint>(
  s1: LineSegment<Point>,
  s2: LineSegment<Point>,
): number
```

## File: packages/math/src/triangle.ts
```typescript
import type { GlobalPoint, LocalPoint, Triangle } from "./types";
export function triangleIncludesPoint<P extends GlobalPoint | LocalPoint>(
  [a, b, c]: Triangle<P>,
  p: P,
): boolean
⋮----
const triangleSign = (p1: P, p2: P, p3: P)
```

## File: packages/math/src/types.ts
```typescript
export type Radians = number & { _brand: "excalimath__radian" };
export type Degrees = number & { _brand: "excalimath_degree" };
export type InclusiveRange = [number, number] & { _brand: "excalimath_degree" };
export type GlobalPoint = [x: number, y: number] & {
  _brand: "excalimath__globalpoint";
};
export type GlobalCoord = { x: number; y: number } & {
  _brand: "excalimath__globalcoord";
};
export type LocalPoint = [x: number, y: number] & {
  _brand: "excalimath__localpoint";
};
export type LocalCoord = { x: number; y: number } & {
  _brand: "excalimath__localcoord";
};
export type Line<P extends GlobalPoint | LocalPoint> = [p: P, q: P] & {
  _brand: "excalimath_line";
};
export type LineSegment<P extends GlobalPoint | LocalPoint> = [a: P, b: P] & {
  _brand: "excalimath_linesegment";
};
export type Vector = [u: number, v: number] & {
  _brand: "excalimath__vector";
};
export type Triangle<P extends GlobalPoint | LocalPoint> = [
  a: P,
  b: P,
  c: P,
] & {
  _brand: "excalimath__triangle";
};
export type Rectangle<P extends GlobalPoint | LocalPoint> = [a: P, b: P] & {
  _brand: "excalimath__rectangle";
};
export type Polygon<Point extends GlobalPoint | LocalPoint> = Point[] & {
  _brand: "excalimath_polygon";
};
export type Curve<Point extends GlobalPoint | LocalPoint> = [
  Point,
  Point,
  Point,
  Point,
] & {
  _brand: "excalimath_curve";
};
export type PolarCoords = [
  radius: number,
  angle: number,
];
export type Ellipse<Point extends GlobalPoint | LocalPoint> = {
  center: Point;
  halfWidth: number;
  halfHeight: number;
} & {
  _brand: "excalimath_ellipse";
};
export type ElementsSegmentsMap = Map<string, LineSegment<GlobalPoint>[]>;
```

## File: packages/math/src/utils.ts
```typescript
export const clamp = (value: number, min: number, max: number) =>
export const round = (
  value: number,
  precision: number,
  func: "round" | "floor" | "ceil" = "round",
) =>
export const roundToStep = (
  value: number,
  step: number,
  func: "round" | "floor" | "ceil" = "round",
): number =>
export const average = (a: number, b: number)
export const isFiniteNumber = (value: any): value is number =>
export const isCloseTo = (a: number, b: number, precision = PRECISION)
```

## File: packages/math/src/vector.ts
```typescript
import type { GlobalPoint, LocalPoint, Vector } from "./types";
export function vector(
  x: number,
  y: number,
  originX: number = 0,
  originY: number = 0,
): Vector
export function vectorFromPoint<Point extends GlobalPoint | LocalPoint>(
  p: Point,
  origin: Point = [0, 0] as Point,
  threshold?: number,
  defaultValue: Vector = [0, 1] as Vector,
): Vector
export function vectorCross(a: Vector, b: Vector): number
export function vectorDot(a: Vector, b: Vector)
export function isVector(v: unknown): v is Vector
export function vectorAdd(a: Readonly<Vector>, b: Readonly<Vector>): Vector
export function vectorSubtract(
  start: Readonly<Vector>,
  end: Readonly<Vector>,
): Vector
export function vectorScale(v: Vector, scalar: number): Vector
export function vectorMagnitudeSq(v: Vector)
export function vectorMagnitude(v: Vector)
export const vectorNormalize = (v: Vector): Vector =>
export const vectorNormal = (v: Vector): Vector
```

## File: packages/math/tests/curve.test.ts
```typescript
import {
  curve,
  curveClosestPoint,
  curveIntersectLineSegment,
  curvePointDistance,
} from "../src/curve";
import { pointFrom } from "../src/point";
import { lineSegment } from "../src/segment";
```

## File: packages/math/tests/ellipse.test.ts
```typescript
import {
  ellipse,
  ellipseSegmentInterceptPoints,
  ellipseIncludesPoint,
  ellipseTouchesPoint,
  ellipseLineIntersectionPoints,
} from "../src/ellipse";
import { line } from "../src/line";
import { pointFrom } from "../src/point";
import { lineSegment } from "../src/segment";
import type { Ellipse, GlobalPoint } from "../src/types";
```

## File: packages/math/tests/line.test.ts
```typescript
import { line, linesIntersectAt } from "../src/line";
import { pointFrom } from "../src/point";
```

## File: packages/math/tests/point.test.ts
```typescript
import { pointFrom, pointRotateRads } from "../src/point";
import type { Radians } from "../src/types";
```

## File: packages/math/tests/range.test.ts
```typescript
import { rangeInclusive, rangeIntersection, rangesOverlap } from "../src/range";
```

## File: packages/math/tests/segment.test.ts
```typescript
import { pointFrom } from "../src/point";
import { lineSegment, lineSegmentIntersectionPoints } from "../src/segment";
```

## File: packages/math/tests/vector.test.ts
```typescript
import { isVector } from "../src/vector";
```

## File: packages/math/global.d.ts
```typescript

```

## File: packages/utils/src/bbox.ts
```typescript
import {
  vectorCross,
  vectorFromPoint,
  type GlobalPoint,
  type LocalPoint,
} from "@excalidraw/math";
import type { Bounds } from "@excalidraw/common";
export type LineSegment<P extends LocalPoint | GlobalPoint> = [P, P];
export function getBBox<P extends LocalPoint | GlobalPoint>(
  line: LineSegment<P>,
): Bounds
export function doBBoxesIntersect(a: Bounds, b: Bounds)
⋮----
export function isPointOnLine<P extends GlobalPoint | LocalPoint>(
  l: LineSegment<P>,
  p: P,
)
export function isPointRightOfLine<P extends GlobalPoint | LocalPoint>(
  l: LineSegment<P>,
  p: P,
)
export function isLineSegmentTouchingOrCrossingLine<
  P extends GlobalPoint | LocalPoint,
>(a: LineSegment<P>, b: LineSegment<P>)
export function doLineSegmentsIntersect<P extends GlobalPoint | LocalPoint>(
  a: LineSegment<P>,
  b: LineSegment<P>,
)
```

## File: packages/utils/src/export.ts
```typescript
import { MIME_TYPES } from "@excalidraw/common";
import { getDefaultAppState } from "@excalidraw/excalidraw/appState";
import {
  copyBlobToClipboardAsPng,
  copyTextToSystemClipboard,
  copyToClipboard,
} from "@excalidraw/excalidraw/clipboard";
import { encodePngMetadata } from "@excalidraw/excalidraw/data/image";
import { serializeAsJSON } from "@excalidraw/excalidraw/data/json";
import {
  restoreAppState,
  restoreElements,
} from "@excalidraw/excalidraw/data/restore";
import {
  exportToCanvas as _exportToCanvas,
  exportToSvg as _exportToSvg,
} from "@excalidraw/excalidraw/scene/export";
import type {
  ExcalidrawElement,
  ExcalidrawFrameLikeElement,
  NonDeleted,
} from "@excalidraw/element/types";
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
⋮----
type ExportOpts = {
  elements: readonly NonDeleted<ExcalidrawElement>[];
  appState?: Partial<Omit<AppState, "offsetTop" | "offsetLeft">>;
  files: BinaryFiles | null;
  maxWidthOrHeight?: number;
  exportingFrame?: ExcalidrawFrameLikeElement | null;
  getDimensions?: (
    width: number,
    height: number,
  ) => { width: number; height: number; scale?: number };
};
export const exportToCanvas = ({
  elements,
  appState,
  files,
  maxWidthOrHeight,
  getDimensions,
  exportPadding,
  exportingFrame,
}: ExportOpts & {
  exportPadding?: number;
}) =>
export const exportToBlob = async (
  opts: ExportOpts & {
    mimeType?: string;
    quality?: number;
    exportPadding?: number;
  },
): Promise<Blob> =>
export const exportToSvg = async ({
  elements,
  appState = getDefaultAppState(),
  files = {},
  exportPadding,
  renderEmbeddables,
  exportingFrame,
  skipInliningFonts,
  reuseImages,
}: Omit<ExportOpts, "getDimensions"> & {
  exportPadding?: number;
  renderEmbeddables?: boolean;
  skipInliningFonts?: true;
  reuseImages?: boolean;
}): Promise<SVGSVGElement> =>
export const exportToClipboard = async (
  opts: ExportOpts & {
    mimeType?: string;
    quality?: number;
    type: "png" | "svg" | "json";
  },
) =>
```

## File: packages/utils/src/index.ts
```typescript

```

## File: packages/utils/src/shape.ts
```typescript
import { pointsOnBezierCurves } from "points-on-curve";
import { invariant } from "@excalidraw/common";
import {
  curve,
  lineSegment,
  pointFrom,
  pointDistance,
  pointFromArray,
  pointFromVector,
  pointRotateRads,
  polygon,
  polygonFromPoints,
  PRECISION,
  segmentsIntersectAt,
  vector,
  vectorAdd,
  vectorFromPoint,
  vectorScale,
  type GlobalPoint,
  type LocalPoint,
} from "@excalidraw/math";
import { getElementAbsoluteCoords } from "@excalidraw/element";
import type {
  ElementsMap,
  ExcalidrawBindableElement,
  ExcalidrawDiamondElement,
  ExcalidrawElement,
  ExcalidrawEllipseElement,
  ExcalidrawEmbeddableElement,
  ExcalidrawFrameLikeElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawIframeElement,
  ExcalidrawImageElement,
  ExcalidrawLinearElement,
  ExcalidrawRectangleElement,
  ExcalidrawSelectionElement,
  ExcalidrawTextElement,
} from "@excalidraw/element/types";
import type { Curve, LineSegment, Polygon, Radians } from "@excalidraw/math";
import type { Drawable, Op } from "roughjs/bin/core";
export type Polyline<Point extends GlobalPoint | LocalPoint> =
  LineSegment<Point>[];
export type Polycurve<Point extends GlobalPoint | LocalPoint> = Curve<Point>[];
export type Ellipse<Point extends GlobalPoint | LocalPoint> = {
  center: Point;
  angle: Radians;
  halfWidth: number;
  halfHeight: number;
};
export type GeometricShape<Point extends GlobalPoint | LocalPoint> =
  | {
      type: "line";
      data: LineSegment<Point>;
    }
  | {
      type: "polygon";
      data: Polygon<Point>;
    }
  | {
      type: "curve";
      data: Curve<Point>;
    }
  | {
      type: "ellipse";
      data: Ellipse<Point>;
    }
  | {
      type: "polyline";
      data: Polyline<Point>;
    }
  | {
      type: "polycurve";
      data: Polycurve<Point>;
    };
type RectangularElement =
  | ExcalidrawRectangleElement
  | ExcalidrawDiamondElement
  | ExcalidrawFrameLikeElement
  | ExcalidrawEmbeddableElement
  | ExcalidrawImageElement
  | ExcalidrawIframeElement
  | ExcalidrawTextElement
  | ExcalidrawSelectionElement;
export const getPolygonShape = <Point extends GlobalPoint | LocalPoint>(
  element: RectangularElement,
): GeometricShape<Point> =>
export const getSelectionBoxShape = <Point extends GlobalPoint | LocalPoint>(
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  padding = 10,
) =>
export const getEllipseShape = <Point extends GlobalPoint | LocalPoint>(
  element: ExcalidrawEllipseElement,
): GeometricShape<Point> =>
export const getCurvePathOps = (shape: Drawable): Op[] =>
export const getCurveShape = <Point extends GlobalPoint | LocalPoint>(
  roughShape: Drawable,
  startingPoint: Point = pointFrom(0, 0),
  angleInRadian: Radians,
  center: Point,
): GeometricShape<Point> =>
⋮----
const transform = (p: Point): Point
⋮----
const polylineFromPoints = <Point extends GlobalPoint | LocalPoint>(
  points: Point[],
): Polyline<Point> =>
export const getFreedrawShape = <Point extends GlobalPoint | LocalPoint>(
  element: ExcalidrawFreeDrawElement,
  center: Point,
  isClosed: boolean = false,
): GeometricShape<Point> =>
export const getClosedCurveShape = <Point extends GlobalPoint | LocalPoint>(
  element: ExcalidrawLinearElement,
  roughShape: Drawable,
  startingPoint: Point = pointFrom<Point>(0, 0),
  angleInRadian: Radians,
  center: Point,
): GeometricShape<Point> =>
export const segmentIntersectRectangleElement = <
  Point extends LocalPoint | GlobalPoint,
>(
  element: ExcalidrawBindableElement,
  segment: LineSegment<Point>,
  gap: number = 0,
): Point[] =>
const distanceToEllipse = <Point extends LocalPoint | GlobalPoint>(
  p: Point,
  ellipse: Ellipse<Point>,
) =>
export const pointOnEllipse = <Point extends LocalPoint | GlobalPoint>(
  point: Point,
  ellipse: Ellipse<Point>,
  threshold = PRECISION,
) =>
export const pointInEllipse = <Point extends LocalPoint | GlobalPoint>(
  p: Point,
  ellipse: Ellipse<Point>,
) =>
export const ellipseAxes = <Point extends LocalPoint | GlobalPoint>(
  ellipse: Ellipse<Point>,
) =>
export const ellipseFocusToCenter = <Point extends LocalPoint | GlobalPoint>(
  ellipse: Ellipse<Point>,
) =>
export const ellipseExtremes = <Point extends LocalPoint | GlobalPoint>(
  ellipse: Ellipse<Point>,
) =>
```

## File: packages/utils/src/test-utils.ts
```typescript
import { diffStringsUnified } from "jest-diff";
⋮----
toCloselyEqualPoints(received, expected, precision)
```

## File: packages/utils/src/withinBounds.ts
```typescript
import { arrayToMap, type Bounds } from "@excalidraw/common";
import { getElementBounds } from "@excalidraw/element";
import {
  isArrowElement,
  isExcalidrawElement,
  isFreeDrawElement,
  isLinearElement,
  isTextElement,
} from "@excalidraw/element";
import {
  rangeIncludesValue,
  pointFrom,
  pointRotateRads,
  rangeInclusive,
} from "@excalidraw/math";
import type {
  ExcalidrawElement,
  ExcalidrawFreeDrawElement,
  ExcalidrawLinearElement,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";
import type { LocalPoint } from "@excalidraw/math";
type Element = NonDeletedExcalidrawElement;
type Elements = readonly NonDeletedExcalidrawElement[];
type Points = readonly LocalPoint[];
const getNonLinearElementRelativePoints = (
  element: Exclude<
    Element,
    ExcalidrawLinearElement | ExcalidrawFreeDrawElement
  >,
): [
  TopLeft: LocalPoint,
  TopRight: LocalPoint,
  BottomRight: LocalPoint,
  BottomLeft: LocalPoint,
] => {
if (element.type === "diamond")
const getElementRelativePoints = (element: ExcalidrawElement): Points =>
const getMinMaxPoints = (points: Points) =>
const getRotatedBBox = (element: Element): Bounds =>
export const isElementInsideBBox = (
  element: Element,
  bbox: Bounds,
  eitherDirection = false,
): boolean =>
export const elementPartiallyOverlapsWithOrContainsBBox = (
  element: Element,
  bbox: Bounds,
): boolean =>
export const elementsOverlappingBBox = ({
  elements,
  bounds,
  type,
  errorMargin = 0,
}: {
  elements: Elements;
  bounds: Bounds | ExcalidrawElement;
  errorMargin?: number;
  type: "overlap" | "contain" | "inside";
}) =>
```

## File: packages/utils/tests/export.test.ts
```typescript
import { MIME_TYPES } from "@excalidraw/common";
⋮----
import { diagramFactory } from "@excalidraw/excalidraw/tests/fixtures/diagramFixture";
import { vi } from "vitest";
⋮----
const passedElements = ()
const passedOptions = ()
```

## File: packages/utils/tests/geometry.test.ts
```typescript
import {
  pointFrom,
  lineSegment,
  polygon,
  pointOnLineSegment,
  pointOnPolygon,
  polygonIncludesPoint,
  segmentsIntersectAt,
} from "@excalidraw/math";
import type {
  GlobalPoint,
  LineSegment,
  Polygon,
  Radians,
} from "@excalidraw/math";
import { pointInEllipse, pointOnEllipse, type Ellipse } from "../src/shape";
```

## File: packages/utils/tests/utils.unmocked.test.ts
```typescript
import { decodePngMetadata } from "@excalidraw/excalidraw/data/image";
import { decodeSvgBase64Payload } from "@excalidraw/excalidraw/scene/export";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import type { ImportedDataState } from "@excalidraw/excalidraw/data/types";
```

## File: packages/utils/tests/withinBounds.test.ts
```typescript
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import type { Bounds } from "@excalidraw/common";
import {
  elementPartiallyOverlapsWithOrContainsBBox,
  elementsOverlappingBBox,
  isElementInsideBBox,
} from "../src/withinBounds";
const makeElement = (x: number, y: number, width: number, height: number)
const makeBBox = (
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
): Bounds
```

## File: packages/utils/global.d.ts
```typescript

```
