import { lineSegment, pointFrom } from "@excalidraw/math";

import type { GlobalPoint, Radians } from "@excalidraw/math";

import { intersectElementWithLineSegment } from "../collision";
import { newElement } from "../newElement";

import type { ElementsMap } from "../types";

describe("triangle line intersection for binding", () => {
  const emptyMap = new Map() as ElementsMap;

  it("horizontal intersector hits slanted edges, not full bbox width", () => {
    const tri = newElement({
      type: "triangle",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      strokeColor: "#000",
      backgroundColor: "#fcc",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      frameId: null,
      roundness: null,
      locked: false,
    });

    const seg = lineSegment<GlobalPoint>(
      pointFrom<GlobalPoint>(-20, 30),
      pointFrom<GlobalPoint>(200, 30),
    );

    const hits = intersectElementWithLineSegment(tri, emptyMap, seg, 0);
    expect(hits.length).toBeGreaterThanOrEqual(2);
    for (const p of hits) {
      expect(p[1]).toBeCloseTo(30, 5);
    }
    const xs = hits.map((p) => p[0]).sort((a, b) => a - b);
    expect(xs[0]).toBeGreaterThan(0);
    expect(xs[xs.length - 1]).toBeLessThan(100);
  });

  it("rotated triangle: intersections lie near expected slanted outline", () => {
    const tri = newElement({
      type: "triangle_outline",
      x: 50,
      y: 50,
      width: 80,
      height: 80,
      angle: (Math.PI / 4) as Radians,
      strokeColor: "#000",
      backgroundColor: "transparent",
      fillStyle: "solid",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      frameId: null,
      roundness: null,
      locked: false,
    });

    const seg = lineSegment<GlobalPoint>(
      pointFrom<GlobalPoint>(0, 90),
      pointFrom<GlobalPoint>(250, 90),
    );

    const hits = intersectElementWithLineSegment(tri, emptyMap, seg, 0);
    expect(hits.length).toBeGreaterThanOrEqual(2);
    const maxX = Math.max(...hits.map((p) => p[0]));
    const minX = Math.min(...hits.map((p) => p[0]));
    expect(maxX - minX).toBeLessThan(160);
  });
});
