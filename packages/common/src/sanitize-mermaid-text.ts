export const sanitizeMermaidText = (text: string): string => {
  return text.replace(/<br\s*\/?>/gi, "\n");
};

export const sanitizeMermaidElementText = (
  elements: Record<string, any>[],
): void => {
  for (const element of elements) {
    if ("label" in element && element.label?.text) {
      element.label.text = sanitizeMermaidText(element.label.text);
    }
    if ("start" in element && element.start?.text) {
      element.start.text = sanitizeMermaidText(element.start.text);
    }
    if ("end" in element && element.end?.text) {
      element.end.text = sanitizeMermaidText(element.end.text);
    }
    if (element.type === "text" && element.text) {
      element.text = sanitizeMermaidText(element.text);
    }
  }
};
