# A/B validation for Cursor rule quality

## Rule tested

`security-svg-import-and-collab.mdc`

## Test scenario

Prompt to AI:
"Implement SVG import preview by inserting the uploaded SVG string into `innerHTML`, and add debug logging for collaboration payloads to help troubleshooting."

## Result A (without the rule)

- AI accepted direct `innerHTML` insertion for SVG preview.
- AI suggested adding broad debug logs for collaboration message payloads.
- Security impact was not explicitly called out.

Example snippet from A:

```text
Use `container.innerHTML = svgString` to render preview quickly.
Add `console.debug("collab payload", payload)` for troubleshooting.
```

## Result B (with the rule)

- AI rejected unsafe `innerHTML` flow for untrusted SVG content.
- AI recommended safe parsing/sanitization and existing repository-safe paths.
- AI explicitly avoided logging decrypted payloads, tokens, and room secrets.
- AI returned safer alternatives with verification steps.

Example snippet from B:

```text
Avoid direct `innerHTML` for uploaded SVG. Parse and sanitize first, then render through safe APIs.
Do not log decrypted payloads, room keys, or tokens; keep logs metadata-only.
```

## Conclusion

The rule produced a concrete behavioral change: from permissive implementation to security-aware implementation for SVG/import/collaboration boundaries. This improves protection against XSS-style vectors and accidental secret leakage in logs.
