import type { ValidContainer } from "@excalidraw/element/transform";

import {
  isMarkdownTable,
  parseMarkdownTable,
  markdownTableToSkeletons,
  computeColumnWidths,
} from "./markdown-table";

type TableCellSkeleton = ValidContainer &
  Required<Pick<ValidContainer, "width" | "height" | "groupIds" | "label">>;

describe("isMarkdownTable", () => {
  it("should detect a valid markdown table", () => {
    const table = `| A | B | C |
|---|---|---|
| 1 | 2 | 3 |`;
    expect(isMarkdownTable(table)).toBe(true);
  });

  it("should detect a table with alignment markers", () => {
    const table = `| A | B | C |
|:---|:---:|---:|
| 1 | 2 | 3 |`;
    expect(isMarkdownTable(table)).toBe(true);
  });

  it("should reject plain text with pipes but no separator", () => {
    expect(isMarkdownTable("| A | B |\n| 1 | 2 |")).toBe(false);
  });

  it("should reject text without pipe-delimited rows", () => {
    expect(isMarkdownTable("hello world")).toBe(false);
  });

  it("should reject a single row (header + separator, no data)", () => {
    const table = `| A | B |
|---|---|`;
    expect(isMarkdownTable(table)).toBe(false);
  });

  it("should reject empty string", () => {
    expect(isMarkdownTable("")).toBe(false);
  });
});

describe("parseMarkdownTable", () => {
  it("should parse a standard 4-column table", () => {
    const table = `| Column Name | Column Name | Column Name | Column Name |
|-------------|-------------|-------------|-------------|
| 1           | 1           | 1           | 1           |
| 2           | 2           | 2           | 2           |
| 3           | 3           | 3           | 3           |
| 4           | 4           | 4           | 4           |
| 5           | 5           | 5           | 5           |`;

    const result = parseMarkdownTable(table);
    expect(result.headers).toEqual([
      "Column Name",
      "Column Name",
      "Column Name",
      "Column Name",
    ]);
    expect(result.rows).toHaveLength(5);
    expect(result.rows[0]).toEqual(["1", "1", "1", "1"]);
    expect(result.rows[4]).toEqual(["5", "5", "5", "5"]);
  });

  it("should trim whitespace from cells", () => {
    const table = `|  A  |  B  |
|-----|-----|
|  1  |  2  |`;

    const result = parseMarkdownTable(table);
    expect(result.headers).toEqual(["A", "B"]);
    expect(result.rows[0]).toEqual(["1", "2"]);
  });

  it("should pad short rows with empty strings", () => {
    const table = `| A | B | C |
|---|---|---|
| 1 |`;

    const result = parseMarkdownTable(table);
    expect(result.headers).toEqual(["A", "B", "C"]);
    expect(result.rows[0]).toEqual(["1", "", ""]);
  });

  it("should truncate extra cells in long rows", () => {
    const table = `| A | B |
|---|---|
| 1 | 2 | 3 | 4 |`;

    const result = parseMarkdownTable(table);
    expect(result.headers).toEqual(["A", "B"]);
    expect(result.rows[0]).toEqual(["1", "2"]);
  });

  it("should handle varying column content lengths", () => {
    const table = `| Short | Very Long Column Name |
|-------|----------------------|
| x     | y                    |`;

    const result = parseMarkdownTable(table);
    expect(result.headers).toEqual(["Short", "Very Long Column Name"]);
    expect(result.rows[0]).toEqual(["x", "y"]);
  });
});

describe("markdownTableToSkeletons", () => {
  const parsed = {
    headers: ["A", "B"],
    rows: [
      ["1", "2"],
      ["3", "4"],
    ],
  };

  const asContainers = (
    skeletons: ReturnType<typeof markdownTableToSkeletons>,
  ): TableCellSkeleton[] => {
    for (const s of skeletons) {
      expect(s.type).toBe("rectangle");
    }
    return skeletons as TableCellSkeleton[];
  };

  it("should generate correct number of elements", () => {
    const cells = asContainers(markdownTableToSkeletons(parsed));
    // 3 rows (1 header + 2 data) * 2 cols = 6 rectangles
    expect(cells).toHaveLength(6);
  });

  it("should create rectangle elements with labels", () => {
    const cells = asContainers(markdownTableToSkeletons(parsed));
    for (const cell of cells) {
      expect(cell.type).toBe("rectangle");
      expect(cell.label).toBeDefined();
      expect(typeof cell.label.text).toBe("string");
    }
  });

  it("should have per-column uniform width", () => {
    const cells = asContainers(markdownTableToSkeletons(parsed));
    // Column 0 cells (rows 0,1,2) should share width
    const col0Widths = [0, 2, 4].map((i) => cells[i].width);
    expect(new Set(col0Widths).size).toBe(1);
    // Column 1 cells (rows 0,1,2) should share width
    const col1Widths = [1, 3, 5].map((i) => cells[i].width);
    expect(new Set(col1Widths).size).toBe(1);
  });

  it("should have uniform row height", () => {
    const cells = asContainers(markdownTableToSkeletons(parsed));
    const heights = cells.map((c) => c.height);
    expect(new Set(heights).size).toBe(1);
  });

  it("should respect minimum column width for short content", () => {
    const cells = asContainers(markdownTableToSkeletons(parsed));
    for (const cell of cells) {
      expect(cell.width).toBeGreaterThanOrEqual(100);
    }
  });

  it("should widen column for long content", () => {
    const longParsed = {
      headers: ["Short", "This is a very long column header text here"],
      rows: [["x", "y"]],
    };
    const cells = asContainers(markdownTableToSkeletons(longParsed));
    expect(cells[1].width).toBeGreaterThan(cells[0].width);
  });

  it("should keep other columns at minimum width when one column is long", () => {
    const longParsed = {
      headers: ["A", "B"],
      rows: [
        ["short", "this cell has a lot of text that should make column wider"],
      ],
    };
    const cells = asContainers(markdownTableToSkeletons(longParsed));
    // "A" and "short" are both short — column should be at minimum
    expect(cells[0].width).toBe(100);
    // Column 1 should be wider
    expect(cells[1].width).toBeGreaterThan(100);
  });

  it("should assign shared groupIds to all elements", () => {
    const cells = asContainers(markdownTableToSkeletons(parsed));
    const groupIds = cells.map((c) => c.groupIds);
    expect(groupIds.every((g) => g.length === 1)).toBe(true);
    const groupId = groupIds[0][0];
    expect(groupIds.every((g) => g[0] === groupId)).toBe(true);
  });

  it("should have correct cell text values", () => {
    const cells = asContainers(markdownTableToSkeletons(parsed));
    const texts = cells.map((c) => c.label.text);
    expect(texts).toEqual(["A", "B", "1", "2", "3", "4"]);
  });

  it("should produce same results with no opts as with empty opts", () => {
    const withoutOpts = asContainers(markdownTableToSkeletons(parsed));
    const withEmptyOpts = asContainers(markdownTableToSkeletons(parsed, {}));
    expect(withoutOpts.map((c) => c.width)).toEqual(
      withEmptyOpts.map((c) => c.width),
    );
    expect(withoutOpts.map((c) => c.height)).toEqual(
      withEmptyOpts.map((c) => c.height),
    );
  });

  it("should respect custom minCellWidth via opts", () => {
    const cells = asContainers(
      markdownTableToSkeletons(parsed, { minCellWidth: 200 }),
    );
    for (const cell of cells) {
      expect(cell.width).toBeGreaterThanOrEqual(200);
    }
  });

  it("should respect custom cellHeight via opts", () => {
    const cells = asContainers(
      markdownTableToSkeletons(parsed, { cellHeight: 80 }),
    );
    for (const cell of cells) {
      expect(cell.height).toBe(80);
    }
  });
});
