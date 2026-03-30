import { CaptureUpdateAction } from "@excalidraw/element";

import { register } from "./register";

import type { AppState } from "../types";

export const actionToggleScrollToZoom = register({
  name: "scrollToZoom",
  viewMode: true,
  label: "labels.scrollToZoom",
  trackEvent: {
    category: "canvas",
    predicate: (appState) => appState.scrollToZoomEnabled,
  },
  perform(elements, appState) {
    return {
      appState: {
        ...appState,
        scrollToZoomEnabled: !this.checked!(appState),
      },
      captureUpdate: CaptureUpdateAction.EVENTUALLY,
    };
  },
  checked: (appState: AppState) => appState.scrollToZoomEnabled,
});
