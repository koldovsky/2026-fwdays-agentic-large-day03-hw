import { useSyncExternalStore } from "react";

import { t } from "../i18n";
import {
  clearPersistentLaserMarks,
  getLaserPersistenceVersion,
  getLaserTrailPersistenceMode,
  setLaserTrailPersistenceMode,
  subscribeLaserPersistence,
} from "../laser-persistence";

import type { AppClassProperties } from "../types";

import DropdownMenu from "./dropdownMenu/DropdownMenu";

export type AppWithLaserTrailsForTool = AppClassProperties & {
  laserTrails: {
    hasLocalContent: () => boolean;
    clearLocalTrails: () => void;
  };
};

export const useLaserToolOptions = (app: AppWithLaserTrailsForTool) => {
  useSyncExternalStore(
    subscribeLaserPersistence,
    getLaserPersistenceVersion,
    getLaserPersistenceVersion,
  );

  return {
    mode: getLaserTrailPersistenceMode(),
    hasMarks: app.laserTrails.hasLocalContent(),
    setMode: (next: "temporary" | "persistent") =>
      setLaserTrailPersistenceMode(next, { app }),
    clearMarks: () => clearPersistentLaserMarks(app),
  };
};

export const LaserToolDropdownSection = ({
  app,
}: {
  app: AppWithLaserTrailsForTool;
}) => {
  const { mode, hasMarks, setMode, clearMarks } = useLaserToolOptions(app);

  return (
    <>
      <DropdownMenu.Separator />
      <div
        style={{
          margin: "6px 12px 4px",
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.8,
        }}
      >
        {t("toolBar.laserOptions")}
      </div>
      <DropdownMenu.ItemCheckbox
        checked={mode === "temporary"}
        onSelect={(event) => {
          event.preventDefault();
          setMode("temporary");
        }}
        data-testid="laser-mode-temporary"
      >
        {t("toolBar.laserTemporary")}
      </DropdownMenu.ItemCheckbox>
      <DropdownMenu.ItemCheckbox
        checked={mode === "persistent"}
        onSelect={(event) => {
          event.preventDefault();
          setMode("persistent");
        }}
        data-testid="laser-mode-persistent"
      >
        {t("toolBar.laserPersistent")}
      </DropdownMenu.ItemCheckbox>
      {mode === "persistent" && hasMarks && (
        <DropdownMenu.Item
          onSelect={() => clearMarks()}
          data-testid="laser-clear-marks"
        >
          {t("toolBar.laserClearMarks")}
        </DropdownMenu.Item>
      )}
    </>
  );
};

export const LaserToolIslandControls = ({
  app,
}: {
  app: AppWithLaserTrailsForTool;
}) => {
  const { mode, hasMarks, setMode, clearMarks } = useLaserToolOptions(app);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "4px 6px 2px",
        fontSize: 11,
        maxWidth: 140,
      }}
    >
      <div style={{ fontWeight: 600, opacity: 0.85 }}>
        {t("toolBar.laserOptions")}
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input
          type="radio"
          name={`laser-persistence-${app.id}`}
          checked={mode === "temporary"}
          onChange={() => setMode("temporary")}
          data-testid="laser-mode-temporary-island"
        />
        {t("toolBar.laserTemporary")}
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input
          type="radio"
          name={`laser-persistence-${app.id}`}
          checked={mode === "persistent"}
          onChange={() => setMode("persistent")}
          data-testid="laser-mode-persistent-island"
        />
        {t("toolBar.laserPersistent")}
      </label>
      {mode === "persistent" && hasMarks && (
        <button
          type="button"
          style={{
            fontSize: 11,
            padding: "4px 6px",
            borderRadius: 4,
            border: "1px solid var(--button-gray-2)",
            background: "var(--island-bg-color)",
            cursor: "pointer",
          }}
          onClick={() => clearMarks()}
          data-testid="laser-clear-marks-island"
        >
          {t("toolBar.laserClearMarks")}
        </button>
      )}
    </div>
  );
};
