import {
  isMarkdownTable,
  parseMarkdownTable,
  markdownTableToSkeletons,
} from "./markdown-table";

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

  it("should generate correct number of elements", () => {
    const skeletons = markdownTableToSkeletons(parsed);
    // 3 rows (1 header + 2 data) * 2 cols = 6 rectangles
    expect(skeletons).toHaveLength(6);
  });

  it("should create rectangle elements with labels", () => {
    const skeletons = markdownTableToSkeletons(parsed);
    for (const s of skeletons) {
      expect(s.type).toBe("rectangle");
      expect((s as any).label).toBeDefined();
      expect(typeof (s as any).label.text).toBe("string");
    }
  });

  it("should have uniform cell dimensions", () => {
    const skeletons = markdownTableToSkeletons(parsed);
    const widths = skeletons.map((s) => (s as any).width);
    const heights = skeletons.map((s) => (s as any).height);
    expect(new Set(widths).size).toBe(1);
    expect(new Set(heights).size).toBe(1);
  });

  it("should assign shared groupIds to all elements", () => {
    const skeletons = markdownTableToSkeletons(parsed);
    const groupIds = skeletons.map((s) => (s as any).groupIds);
    expect(groupIds.every((g: string[]) => g.length === 1)).toBe(true);
    const groupId = groupIds[0][0];
    expect(groupIds.every((g: string[]) => g[0] === groupId)).toBe(true);
  });

  it("should have correct cell text values", () => {
    const skeletons = markdownTableToSkeletons(parsed);
    const texts = skeletons.map((s) => (s as any).label.text);
    expect(texts).toEqual(["A", "B", "1", "2", "3", "4"]);
  });
});
