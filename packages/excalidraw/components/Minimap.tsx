import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { THEME } from "@excalidraw/common";

import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";

import {
  renderMinimap,
  computeViewportRect,
  minimapPointerToSceneCoords,
} from "../renderer/renderMinimap";
import { centerScrollOn } from "../scene/scroll";

import "./Minimap.scss";

import type { AppState } from "../types";

const MINIMAP_WIDTH = 180;
const MINIMAP_HEIGHT = 120;
const DEBOUNCE_MS = 200;

interface MinimapProps {
  elements: readonly NonDeletedExcalidrawElement[];
  appState: AppState;
  onScrollChange: (scrollX: number, scrollY: number) => void;
}

/**
 * Computes a cheap version hash from the elements array.
 * Changes only when elements are added/removed/modified.
 */
const computeElementsHash = (
  elements: readonly NonDeletedExcalidrawElement[],
): string => {
  let hash = elements.length.toString();
  for (const el of elements) {
    hash += el.version;
  }
  return hash;
};

const Minimap: React.FC<MinimapProps> = ({
  elements,
  appState,
  onScrollChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingRef = useRef(false);

  const theme = appState.theme === THEME.DARK ? "dark" : "light";

  // Memoize hash to avoid re-renders triggering canvas re-paint on scroll/zoom
  const elementsHash = useMemo(
    () => computeElementsHash(elements),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elements],
  );

  // Re-render minimap canvas only when elements change (debounced)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const scheduleRender = () => renderMinimap(canvas, elements, theme);

      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(scheduleRender, { timeout: 500 });
      } else {
        scheduleRender();
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current);
      }
    };
    // elementsHash changes when elements change; theme is a cheap dep
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementsHash, theme]);

  // Compute the viewport rectangle — updates on every render (cheap CSS only)
  // Canvas dimensions are fixed constants so we use them directly.
  const viewportRect = useMemo(() => {
    return computeViewportRect(
      { width: MINIMAP_WIDTH, height: MINIMAP_HEIGHT },
      elements,
      appState.scrollX,
      appState.scrollY,
      appState.zoom.value,
      appState.width,
      appState.height,
    );
  }, [
    elements,
    appState.scrollX,
    appState.scrollY,
    appState.zoom,
    appState.width,
    appState.height,
  ]);

  const panToPointer = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const pointerX = clientX - rect.left;
      const pointerY = clientY - rect.top;

      const sceneCoords = minimapPointerToSceneCoords(
        { width: MINIMAP_WIDTH, height: MINIMAP_HEIGHT },
        elements,
        pointerX,
        pointerY,
      );
      if (!sceneCoords) {
        return;
      }

      const { scrollX, scrollY } = centerScrollOn({
        scenePoint: sceneCoords,
        viewportDimensions: { width: appState.width, height: appState.height },
        zoom: appState.zoom,
      });

      onScrollChange(scrollX, scrollY);
    },
    [elements, appState.width, appState.height, appState.zoom, onScrollChange],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      event.preventDefault();
      isDraggingRef.current = true;
      (event.target as HTMLCanvasElement).setPointerCapture(event.pointerId);
      panToPointer(event.clientX, event.clientY);
    },
    [panToPointer],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDraggingRef.current) {
        return;
      }
      event.preventDefault();
      panToPointer(event.clientX, event.clientY);
    },
    [panToPointer],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLCanvasElement>) => {
      isDraggingRef.current = false;
      (event.target as HTMLCanvasElement).releasePointerCapture(
        event.pointerId,
      );
    },
    [],
  );

  return (
    <div className="excalidraw-minimap">
      <canvas
        ref={canvasRef}
        className="excalidraw-minimap__canvas"
        width={MINIMAP_WIDTH}
        height={MINIMAP_HEIGHT}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
      {viewportRect && (
        <div
          className="excalidraw-minimap__viewport"
          style={{
            left: `${viewportRect.x}px`,
            top: `${viewportRect.y}px`,
            width: `${Math.max(viewportRect.width, 4)}px`,
            height: `${Math.max(viewportRect.height, 4)}px`,
          }}
        />
      )}
    </div>
  );
};

export default Minimap;
