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
  const numCols = headers.length;
  // lines[1] is the separator — skip it
  const rows = lines.slice(2).map((line) => {
    const cells = parseCells(line);
    // Normalize: pad short rows, truncate long rows to match header count
    if (cells.length < numCols) {
      return [...cells, ...Array(numCols - cells.length).fill("")];
    }
    if (cells.length > numCols) {
      return cells.slice(0, numCols);
    }
    return cells;
  });

  return { headers, rows };
};

export type TableSizingOpts = {
  minCellWidth?: number;
  charWidthEstimate?: number;
  cellPadding?: number;
  cellHeight?: number;
};

export const computeColumnWidths = (
  allRows: string[][],
  numCols: number,
  opts: TableSizingOpts = {},
): number[] => {
  const {
    minCellWidth = 100,
    charWidthEstimate = 10,
    cellPadding = 40,
  } = opts;

  const widths: number[] = [];
  for (let col = 0; col < numCols; col++) {
    let maxLen = 0;
    for (const row of allRows) {
      const len = (row[col] || "").length;
      if (len > maxLen) {
        maxLen = len;
      }
    }
    widths.push(Math.max(minCellWidth, maxLen * charWidthEstimate + cellPadding));
  }
  return widths;
};

export const markdownTableToSkeletons = (
  parsed: { headers: string[]; rows: string[][] },
  opts: TableSizingOpts = {},
): ExcalidrawElementSkeleton[] => {
  const { cellHeight = 50 } = opts;
  const groupId = randomId();
  const skeletons: ExcalidrawElementSkeleton[] = [];

  const allRows = [parsed.headers, ...parsed.rows];
  const numCols = parsed.headers.length;
  const columnWidths = computeColumnWidths(allRows, numCols, opts);

  for (let rowIdx = 0; rowIdx < allRows.length; rowIdx++) {
    const row = allRows[rowIdx];
    let xOffset = 0;
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      skeletons.push({
        type: "rectangle",
        x: xOffset,
        y: rowIdx * cellHeight,
        width: columnWidths[colIdx],
        height: cellHeight,
        groupIds: [groupId],
        label: {
          text: row[colIdx] || "",
        },
      });
      xOffset += columnWidths[colIdx];
    }
  }

  return skeletons;
};
