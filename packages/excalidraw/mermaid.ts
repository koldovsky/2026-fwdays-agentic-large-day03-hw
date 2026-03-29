const BR_TAG_RE = /<br\s*\/?>/gi;

/**
 * Replaces HTML <br> tags with newline characters in the text fields of
 * mermaid skeleton elements returned by parseMermaidToExcalidraw().
 */
export const normalizeMermaidBrTags = <
  T extends { text?: string; label?: { text: string | null } | null },
>(
  elements: T[],
): T[] =>
  elements.map((el) => {
    const hasText = typeof el.text === "string";
    const hasLabelText = typeof el.label?.text === "string";

    if (!hasText && !hasLabelText) {
      return el;
    }

    return {
      ...el,
      ...(hasText && {
        text: (el.text as string).replace(BR_TAG_RE, "\n"),
      }),
      ...(hasLabelText && {
        label: {
          ...el.label,
          text: (el.label!.text as string).replace(BR_TAG_RE, "\n"),
        },
      }),
    };
  });

/** heuristically checks whether the text may be a mermaid diagram definition */
export const isMaybeMermaidDefinition = (text: string) => {
  const chartTypes = [
    "flowchart",
    "graph",
    "sequenceDiagram",
    "classDiagram",
    "stateDiagram",
    "stateDiagram-v2",
    "erDiagram",
    "journey",
    "gantt",
    "pie",
    "quadrantChart",
    "requirementDiagram",
    "gitGraph",
    "C4Context",
    "mindmap",
    "timeline",
    "zenuml",
    "sankey",
    "xychart",
    "block",
  ];

  const re = new RegExp(
    `^(?:%%{.*?}%%[\\s\\n]*)?\\b(?:${chartTypes
      .map((x) => `\\s*${x}(-beta)?`)
      .join("|")})\\b`,
  );

  return re.test(text.trim());
};
