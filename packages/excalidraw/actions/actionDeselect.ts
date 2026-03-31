import {
  getElementsInGroup,
  isSomeElementSelected,
  makeNextSelectedElementIds,
  selectGroupsForSelectedElements,
} from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import { KEYS, isWritableElement, updateActiveTool } from "@excalidraw/common";

import type { GroupId } from "@excalidraw/element/types";

import { register } from "./register";
import { t } from "../i18n";

import type { AppClassProperties, AppState } from "../types";

const NON_SHAPE_TOOLS = new Set([
  "selection",
  "lasso",
  "eraser",
  "hand",
  "laser",
]);

const TOAST_DURATION = 3000;

const TOOL_DEACTIVATED_TOAST_MESSAGE = "toast.toolDeactivated";

const getNextActiveTool = (
  appState: Readonly<AppState>,
  app: AppClassProperties,
) => {
  if (appState.activeTool.type === "eraser") {
    return updateActiveTool(appState, {
      ...(appState.activeTool.lastActiveTool || {
        type: app.state.preferredSelectionTool.type,
      }),
      lastActiveToolBeforeEraser: null,
    });
  }

  return updateActiveTool(appState, {
    type: app.state.preferredSelectionTool.type,
  });
};

const getParentEditingGroupId = (
  appState: Readonly<AppState>,
  app: AppClassProperties,
  selectedElementIds: AppState["selectedElementIds"],
): GroupId | null => {
  if (!appState.editingGroupId) {
    return null;
  }

  const nonDeletedElements = app.scene.getNonDeletedElements();
  const selectedElements = app.scene.getSelectedElements({
    selectedElementIds,
    elements: nonDeletedElements,
  });
  const candidateElements = selectedElements.length
    ? selectedElements
    : getElementsInGroup(nonDeletedElements, appState.editingGroupId);

  for (const element of candidateElements) {
    const editingGroupIndex = element.groupIds.indexOf(appState.editingGroupId);
    if (editingGroupIndex !== -1 && element.groupIds[editingGroupIndex + 1]) {
      return element.groupIds[editingGroupIndex + 1] as GroupId;
    }
  }

  return null;
};

export const actionDeselect = register({
  name: "deselect",
  label: "",
  trackEvent: false,
  perform: (_elements, appState, _, app) => {
    const activeTool = getNextActiveTool(appState, app);
    const wasShapeTool = !NON_SHAPE_TOOLS.has(appState.activeTool.type);
    const toast = wasShapeTool
      ? { message: t(TOOL_DEACTIVATED_TOAST_MESSAGE), duration: TOAST_DURATION }
      : appState.toast;

    if (appState.editingGroupId) {
      const nonDeletedElements = app.scene.getNonDeletedElements();
      const selectedElementIds =
        Object.keys(appState.selectedElementIds).length > 0
          ? appState.selectedElementIds
          : getElementsInGroup(
              nonDeletedElements,
              appState.editingGroupId,
            ).reduce((acc, element) => {
              acc[element.id] = true;
              return acc;
            }, {} as Record<string, true>);

      return {
        appState: {
          ...appState,
          ...selectGroupsForSelectedElements(
            {
              editingGroupId: getParentEditingGroupId(
                appState,
                app,
                selectedElementIds,
              ),
              selectedElementIds,
            },
            nonDeletedElements,
            appState,
            app,
          ),
          activeEmbeddable: null,
          activeTool,
          selectedLinearElement: null,
          selectionElement: null,
          showHyperlinkPopup: false,
          suggestedBinding: null,
          toast,
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    }

    return {
      appState: {
        ...appState,
        activeEmbeddable: null,
        activeTool,
        editingGroupId: null,
        selectedElementIds: makeNextSelectedElementIds({}, appState),
        selectedGroupIds: {},
        selectedLinearElement: null,
        selectionElement: null,
        showHyperlinkPopup: false,
        suggestedBinding: null,
        toast,
      },
      captureUpdate: CaptureUpdateAction.IMMEDIATELY,
    };
  },
  keyTest: (event, appState, _, app) => {
    if (event.key !== KEYS.ESCAPE) {
      return false;
    }

    if (isWritableElement(event.target)) {
      return false;
    }

    return (
      !appState.newElement &&
      appState.multiElement === null &&
      !appState.selectedLinearElement?.isEditing &&
      (appState.activeEmbeddable !== null ||
        appState.activeTool.type !== app.state.preferredSelectionTool.type ||
        !!appState.editingGroupId ||
        !!appState.selectedLinearElement ||
        isSomeElementSelected(app.scene.getNonDeletedElements(), appState) ||
        appState.toast?.message === t(TOOL_DEACTIVATED_TOAST_MESSAGE))
    );
  },
});
