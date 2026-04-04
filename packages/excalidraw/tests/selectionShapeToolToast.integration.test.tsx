import React from "react";

import { resolvablePromise } from "@excalidraw/common";
import { reseed } from "@excalidraw/common";

import { Excalidraw } from "../index";
import { SESSION_STORAGE_KEY } from "../utils/selectionShapeToolToast";

import { act, fireEvent, render, unmountComponent } from "./test-utils";

import type { ExcalidrawImperativeAPI } from "../types";

unmountComponent();

const { h } = window;

beforeEach(() => {
  sessionStorage.clear();
  reseed(7);
});

describe("selectShapeToolToDraw toast (integration)", () => {
  it("shows once after shape tool cleared then empty-canvas selection drag", async () => {
    const excalidrawAPIPromise = resolvablePromise<ExcalidrawImperativeAPI>();
    const { container } = await render(
      <Excalidraw
        onExcalidrawAPI={(api) => excalidrawAPIPromise.resolve(api as any)}
      />,
    );
    const excalidrawAPI = await excalidrawAPIPromise;

    act(() => {
      excalidrawAPI.setActiveTool({ type: "rectangle" });
    });
    expect(h.state.activeTool.type).toBe("rectangle");

    // Mirrors issue #9541: Esc returns to selection (keyboard routing varies in tests).
    act(() => {
      excalidrawAPI.setActiveTool({ type: "selection" });
    });
    expect(h.state.activeTool.type).toBe("selection");

    const canvas = container.querySelector("canvas.interactive")!;
    fireEvent.pointerDown(canvas, { clientX: 50, clientY: 50, pointerId: 1 });
    fireEvent.pointerMove(canvas, {
      clientX: 100,
      clientY: 100,
      pointerId: 1,
    });
    fireEvent.pointerUp(canvas, { clientX: 100, clientY: 100, pointerId: 1 });

    expect(h.state.toast?.message).toEqual(
      expect.stringMatching(/shape tool/i),
    );
    expect(sessionStorage.getItem(SESSION_STORAGE_KEY)).toBe("1");
  });

  it("does not show the toast again on a second qualifying drag in the same session", async () => {
    const excalidrawAPIPromise = resolvablePromise<ExcalidrawImperativeAPI>();
    const { container } = await render(
      <Excalidraw
        onExcalidrawAPI={(api) => excalidrawAPIPromise.resolve(api as any)}
      />,
    );
    const excalidrawAPI = await excalidrawAPIPromise;

    act(() => {
      excalidrawAPI.setActiveTool({ type: "selection" });
    });

    const canvas = container.querySelector("canvas.interactive")!;
    fireEvent.pointerDown(canvas, { clientX: 50, clientY: 50, pointerId: 1 });
    fireEvent.pointerMove(canvas, {
      clientX: 100,
      clientY: 100,
      pointerId: 1,
    });
    fireEvent.pointerUp(canvas, { clientX: 100, clientY: 100, pointerId: 1 });

    expect(h.state.toast?.message).toEqual(
      expect.stringMatching(/shape tool/i),
    );

    act(() => {
      h.app.setAppState({ toast: null });
    });

    fireEvent.pointerDown(canvas, { clientX: 60, clientY: 60, pointerId: 2 });
    fireEvent.pointerMove(canvas, {
      clientX: 130,
      clientY: 130,
      pointerId: 2,
    });
    fireEvent.pointerUp(canvas, { clientX: 130, clientY: 130, pointerId: 2 });

    expect(h.state.toast).toBeNull();
    expect(sessionStorage.getItem(SESSION_STORAGE_KEY)).toBe("1");
  });

  it("shows once for empty-canvas lasso drag when lasso is active", async () => {
    const excalidrawAPIPromise = resolvablePromise<ExcalidrawImperativeAPI>();
    const { container } = await render(
      <Excalidraw
        onExcalidrawAPI={(api) => excalidrawAPIPromise.resolve(api as any)}
      />,
    );
    const excalidrawAPI = await excalidrawAPIPromise;

    act(() => {
      excalidrawAPI.setActiveTool({ type: "lasso" });
    });
    expect(h.state.activeTool.type).toBe("lasso");

    const canvas = container.querySelector("canvas.interactive")!;
    fireEvent.pointerDown(canvas, { clientX: 40, clientY: 40, pointerId: 1 });
    fireEvent.pointerMove(canvas, {
      clientX: 120,
      clientY: 120,
      pointerId: 1,
    });
    fireEvent.pointerUp(canvas, { clientX: 120, clientY: 120, pointerId: 1 });

    expect(h.state.toast?.message).toEqual(
      expect.stringMatching(/shape tool/i),
    );
    expect(sessionStorage.getItem(SESSION_STORAGE_KEY)).toBe("1");
  });
});
