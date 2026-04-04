import { randomId } from "@excalidraw/common";

import type { ExcalidrawElementSkeleton } from "@excalidraw/element/transform";

const SEPARATOR_ROW_RE = /^\|[\s:-]+(\|[\s:-]+)+\|?\s*$/;
const TABLE_ROW_RE = /^\|(.+\|)+\s*$/;

/**
 * Detect whether the given text is a markdown table.
 * Requires: header row, separator row (|---|), and at least one data row.
 */
export const isMarkdownTable = (text: string): boolean => {
  const lines = text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .filter((l) => l.trim().length > 0);

  if (lines.length < 3) {
    return false;
  }

  return (
    TABLE_ROW_RE.test(lines[0].trim()) &&
    SEPARATOR_ROW_RE.test(lines[1].trim()) &&
    lines.slice(2).every((line) => TABLE_ROW_RE.test(line.trim()))
  );
};

const parseCells = (row: string): string[] =>
  row
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());

export const parseMarkdownTable = (
  text: string,
): { headers: string[]; rows: string[][] } => {
  const lines = text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .filter((l) => l.trim().length > 0);

  const headers = parseCells(lines[0]);
  // lines[1] is the separator — skip it
  const rows = lines.slice(2).map(parseCells);

  return { headers, rows };
};

const CELL_WIDTH = 150;
const CELL_HEIGHT = 50;

export const markdownTableToSkeletons = (
  parsed: { headers: string[]; rows: string[][] },
): ExcalidrawElementSkeleton[] => {
  const groupId = randomId();
  const skeletons: ExcalidrawElementSkeleton[] = [];

  const allRows = [parsed.headers, ...parsed.rows];

  for (let rowIdx = 0; rowIdx < allRows.length; rowIdx++) {
    const row = allRows[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      skeletons.push({
        type: "rectangle",
        x: colIdx * CELL_WIDTH,
        y: rowIdx * CELL_HEIGHT,
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        groupIds: [groupId],
        label: {
          text: row[colIdx] || "",
        },
      });
    }
  }

  return skeletons;
};
