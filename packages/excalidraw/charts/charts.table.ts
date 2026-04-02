import { pointFrom } from "@excalidraw/math";

import { getFontString, getLineHeight } from "@excalidraw/common";
import { FONT_SIZES } from "@excalidraw/common";

import {
  measureText,
  newLinearElement,
  newTextElement,
  wrapText,
} from "@excalidraw/element";

import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";

import { commonProps } from "./charts.constants";
import { getBackgroundColor, getColorOffset } from "./charts.helpers";

import type { ChartElements } from "./charts.types";

const TABLE_CELL_PADDING = 8;
const TABLE_MIN_COL_WIDTH = 36;
const TABLE_MAX_TEXT_WIDTH = 180;

/**
 * Renders a rough grid (lines + text) from pasted delimited cell data, matching chart styling.
 */
export const renderRoughTable = (
  cells: string[][],
  x: number,
  y: number,
  colorSeed?: number,
): ChartElements => {
  if (cells.length === 0 || cells[0].length === 0) {
    return [];
  }

  const numRows = cells.length;
  const numCols = cells[0].length;

  const fontFamily = commonProps.fontFamily;
  const fontSize = FONT_SIZES.sm;
  const lineHeight = getLineHeight(fontFamily);
  const fontString = getFontString({ fontFamily, fontSize });
  const colorOffset = getColorOffset(colorSeed);
  const backgroundColor = getBackgroundColor(colorOffset);

  const colWidths: number[] = [];
  for (let j = 0; j < numCols; j++) {
    let maxW = TABLE_MIN_COL_WIDTH;
    for (let i = 0; i < numRows; i++) {
      const raw = cells[i][j] ?? "";
      const wrapped = wrapText(raw, fontString, TABLE_MAX_TEXT_WIDTH);
      const metrics = measureText(wrapped, fontString, lineHeight);
      maxW = Math.max(maxW, metrics.width + TABLE_CELL_PADDING * 2);
    }
    colWidths[j] = maxW;
  }

  const rowHeights: number[] = [];
  for (let i = 0; i < numRows; i++) {
    let maxH = 0;
    for (let j = 0; j < numCols; j++) {
      const raw = cells[i][j] ?? "";
      const innerW = Math.max(1, colWidths[j] - TABLE_CELL_PADDING * 2);
      const wrapped = wrapText(raw, fontString, innerW);
      const metrics = measureText(wrapped, fontString, lineHeight);
      maxH = Math.max(maxH, metrics.height + TABLE_CELL_PADDING * 2);
    }
    rowHeights[i] = maxH;
  }

  const colStarts: number[] = [0];
  for (let j = 0; j < numCols; j++) {
    colStarts.push(colStarts[j] + colWidths[j]);
  }
  const rowStarts: number[] = [0];
  for (let i = 0; i < numRows; i++) {
    rowStarts.push(rowStarts[i] + rowHeights[i]);
  }

  const tableW = colStarts[numCols];
  const tableH = rowStarts[numRows];

  const lineElements: NonDeletedExcalidrawElement[] = [];

  for (let i = 0; i <= numRows; i++) {
    const lineY = y + rowStarts[i];
    lineElements.push(
      newLinearElement({
        backgroundColor,
        ...commonProps,
        type: "line",
        x,
        y: lineY,
        width: tableW,
        points: [pointFrom(0, 0), pointFrom(tableW, 0)],
      }),
    );
  }

  for (let j = 0; j <= numCols; j++) {
    const lineX = x + colStarts[j];
    lineElements.push(
      newLinearElement({
        backgroundColor,
        ...commonProps,
        type: "line",
        x: lineX,
        y,
        height: tableH,
        points: [pointFrom(0, 0), pointFrom(0, tableH)],
      }),
    );
  }

  const textElements: NonDeletedExcalidrawElement[] = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const raw = cells[i][j] ?? "";
      const innerW = Math.max(1, colWidths[j] - TABLE_CELL_PADDING * 2);
      const wrapped = wrapText(raw, fontString, innerW);
      const cellX = x + colStarts[j];
      const cellY = y + rowStarts[i];
      const cx = cellX + colWidths[j] / 2;
      const cy = cellY + rowHeights[i] / 2;

      textElements.push(
        newTextElement({
          backgroundColor,
          ...commonProps,
          text: wrapped,
          originalText: raw,
          autoResize: false,
          x: cx,
          y: cy,
          width: innerW,
          fontSize,
          lineHeight,
          textAlign: "center",
          verticalAlign: "middle",
        }),
      );
    }
  }

  return [...lineElements, ...textElements];
};
