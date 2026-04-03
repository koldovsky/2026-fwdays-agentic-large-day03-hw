import React from "react";

import { Excalidraw } from "../../index";
import {
  GlobalTestState,
  queryByTestId,
  render,
  waitFor,
  withExcalidrawDimensions,
} from "../../tests/test-utils";

export const assertSidebarDockButton = async <T extends boolean>(
  hasDockButton: T,
): Promise<
  T extends false
    ? { dockButton: null; sidebar: HTMLElement }
    : { dockButton: HTMLElement; sidebar: HTMLElement }
> => {
  const container = GlobalTestState.renderResult.container;

  await waitFor(() => {
    expect(container.querySelectorAll(".sidebar").length).toBeGreaterThan(0);
  });

  const candidates = [
    ...container.querySelectorAll<HTMLElement>(".sidebar"),
  ];

  // Prefer the sidebar that matches the test intent. When the internal
  // fallback default sidebar is still mounted alongside the host sidebar,
  // the first `.sidebar` in the tree can be the fallback (with a dock
  // button) even though the host sidebar hides it.
  const sidebar = hasDockButton
    ? (candidates.find((el) => queryByTestId(el, "sidebar-dock")) ??
        candidates[0])!
    : (candidates.find((el) => !queryByTestId(el, "sidebar-dock")) ?? null);

  expect(sidebar).not.toBe(null);
  const dockButton = queryByTestId(sidebar!, "sidebar-dock");
  if (hasDockButton) {
    expect(dockButton).not.toBe(null);
    return { dockButton: dockButton!, sidebar: sidebar! } as any;
  }
  expect(dockButton).toBe(null);
  return { dockButton: null, sidebar: sidebar! } as any;
};

export const assertExcalidrawWithSidebar = async (
  sidebar: React.ReactNode,
  name: string,
  test: () => void,
) => {
  await render(
    <Excalidraw initialData={{ appState: { openSidebar: { name } } }}>
      {sidebar}
    </Excalidraw>,
  );
  await withExcalidrawDimensions({ width: 1920, height: 1080 }, test);
};
