import { KEYS } from "@excalidraw/common";

import { CaptureUpdateAction } from "@excalidraw/element";

import { minimapIcon } from "../components/icons";

import { register } from "./register";

import type { AppState } from "../types";

export const actionToggleMinimap = register({
  name: "minimap",
  icon: minimapIcon,
  keywords: ["minimap", "overview", "navigate"],
  label: "labels.toggleMinimap",
  viewMode: true,
  trackEvent: {
    category: "canvas",
    predicate: (appState) => appState.minimapEnabled,
  },
  perform(elements, appState) {
    return {
      appState: {
        ...appState,
        minimapEnabled: !this.checked!(appState),
      },
      captureUpdate: CaptureUpdateAction.EVENTUALLY,
    };
  },
  checked: (appState: AppState) => appState.minimapEnabled,
  keyTest: (event) =>
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.shiftKey &&
    event.key === KEYS.M,
});
