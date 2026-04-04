import { Popover } from "radix-ui";
import clsx from "clsx";
import { useState } from "react";

import { FONT_SIZES } from "@excalidraw/common";

import type { ExcalidrawElement } from "@excalidraw/element/types";

import { t } from "../../i18n";
import { useExcalidrawContainer, useStylesPanelMode } from "../App";
import { ButtonSeparator } from "../ButtonSeparator";
import { PropertiesPopover } from "../PropertiesPopover";
import {
  FontSizeSmallIcon,
  FontSizeMediumIcon,
  FontSizeLargeIcon,
  FontSizeExtraLargeIcon,
} from "../icons";
import { RadioSelection } from "../RadioSelection";

import "./FontSizePicker.scss";

import type { AppState } from "../../types";

type FontSizeUnit = "px" | "pt";

const PX_PER_PT = 96 / 72; // 1.333...

const pxToPt = (px: number): number => Math.round(px / PX_PER_PT);
const ptToPx = (pt: number): number => Math.round(pt * PX_PER_PT);

// Full mode: 4 SVG icon presets (slightly smaller) + numeric trigger
const INLINE_PRESETS = [
  { key: "sm", value: FONT_SIZES.sm, icon: FontSizeSmallIcon, title: "labels.small" },
  { key: "md", value: FONT_SIZES.md, icon: FontSizeMediumIcon, title: "labels.medium" },
  { key: "lg", value: FONT_SIZES.lg, icon: FontSizeLargeIcon, title: "labels.large" },
  { key: "xl", value: FONT_SIZES.xl, icon: FontSizeExtraLargeIcon, title: "labels.veryLarge" },
] as const;

// Popover: 3 rows × 4 = 12 presets (all FONT_SIZES)
const POPOVER_ROWS = [
  [
    { key: "2xs", value: FONT_SIZES["2xs"], text: "2XS" },
    { key: "xs", value: FONT_SIZES.xs, text: "XS" },
    { key: "sm", value: FONT_SIZES.sm, text: "S" },
    { key: "md", value: FONT_SIZES.md, text: "M" },
  ],
  [
    { key: "lg", value: FONT_SIZES.lg, text: "L" },
    { key: "xl", value: FONT_SIZES.xl, text: "XL" },
    { key: "2xl", value: FONT_SIZES["2xl"], text: "2XL" },
    { key: "3xl", value: FONT_SIZES["3xl"], text: "3XL" },
  ],
  [
    { key: "4xl", value: FONT_SIZES["4xl"], text: "4XL" },
    { key: "5xl", value: FONT_SIZES["5xl"], text: "5XL" },
    { key: "8xl", value: FONT_SIZES["8xl"], text: "8XL" },
    { key: "10xl", value: FONT_SIZES["10xl"], text: "10XL" },
  ],
] as const;

// All FONT_SIZES values + extra large above 144
const ALL_FONT_SIZE_VALUES = [
  ...Object.values(FONT_SIZES),
  160, 180, 200, 240,
];

// Mobile/compact fallback: original 4-button RadioSelection
const RADIO_OPTIONS = [
  { value: FONT_SIZES.sm, text: t("labels.small"), icon: FontSizeSmallIcon, testId: "fontSize-small" },
  { value: FONT_SIZES.md, text: t("labels.medium"), icon: FontSizeMediumIcon, testId: "fontSize-medium" },
  { value: FONT_SIZES.lg, text: t("labels.large"), icon: FontSizeLargeIcon, testId: "fontSize-large" },
  { value: FONT_SIZES.xl, text: t("labels.veryLarge"), icon: FontSizeExtraLargeIcon, testId: "fontSize-veryLarge" },
];

// --- Sub-components ---

const FontSizeTopPicks = ({
  activeSize,
  onChange,
}: {
  activeSize: number | null;
  onChange: (size: number) => void;
}) => {
  return (
    <div className="font-size-picker__top-picks">
      {INLINE_PRESETS.map((preset) => (
        <button
          key={preset.key}
          type="button"
          className={clsx("font-size-picker__button", {
            active: activeSize === preset.value,
          })}
          title={t(preset.title as any)}
          onClick={() => onChange(preset.value)}
          data-testid={`fontSize-${preset.key}`}
        >
          {preset.icon}
        </button>
      ))}
    </div>
  );
};

const FontSizeTrigger = ({
  size,
  unit,
  isOpen,
  onToggle,
}: {
  size: number | null;
  unit: FontSizeUnit;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const displayValue =
    size === null
      ? "—"
      : unit === "pt"
        ? pxToPt(size)
        : Math.round(size);

  return (
    <Popover.Trigger
      type="button"
      className={clsx("font-size-picker__trigger properties-trigger", {
        active: isOpen,
      })}
      title={t("labels.currentSize" as any)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
    >
      <span className="font-size-picker__trigger-value">{displayValue}</span>
    </Popover.Trigger>
  );
};

const FontSizePresetGrid = ({
  activeSize,
  onChange,
}: {
  activeSize: number | null;
  onChange: (size: number) => void;
}) => {
  const renderRow = (
    presets: ReadonlyArray<{ key: string; value: number; text: string }>,
    rowIndex: number = 0,
  ) => (
    <div className="font-size-picker__preset-row" key={rowIndex}>
      {presets.map((preset) => (
        <button
          key={preset.key}
          type="button"
          className={clsx("font-size-picker__preset-button", {
            active: activeSize === preset.value,
          })}
          title={`${preset.text} (${preset.value}px)`}
          onClick={() => onChange(preset.value)}
          data-testid={`fontSize-popover-${preset.key}`}
        >
          {preset.text}
        </button>
      ))}
    </div>
  );

  return (
    <div className="font-size-picker__preset-grid">
      {POPOVER_ROWS.map((row, i) => renderRow(row, i))}
    </div>
  );
};

const FontSizeNumericRow = ({
  activeSize,
  unit,
  onChangeSize,
  onChangeUnit,
}: {
  activeSize: number | null;
  unit: FontSizeUnit;
  onChangeSize: (size: number) => void;
  onChangeUnit: (unit: FontSizeUnit) => void;
}) => {
  const displaySizes =
    unit === "pt"
      ? ALL_FONT_SIZE_VALUES.map((s) => pxToPt(s))
      : ALL_FONT_SIZE_VALUES;
  const activeDisplay =
    activeSize !== null
      ? unit === "pt"
        ? pxToPt(activeSize)
        : activeSize
      : "";

  return (
    <div className="font-size-picker__numeric-row">
      <select
        className="font-size-picker__select"
        value={
          displaySizes.includes(activeDisplay as number)
            ? String(activeDisplay)
            : ""
        }
        onChange={(e) => {
          const numValue = Number(e.target.value);
          const pxValue = unit === "pt" ? ptToPx(numValue) : numValue;
          onChangeSize(pxValue);
        }}
        data-testid="fontSize-numeric-dropdown"
      >
        <option value="" disabled>
          {t("labels.fontSize" as any)}
        </option>
        {displaySizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <div className="font-size-picker__unit-selector">
        <button
          type="button"
          className={clsx("font-size-picker__unit-button", {
            active: unit === "px",
          })}
          onClick={() => onChangeUnit("px")}
          data-testid="fontSize-unit-px"
        >
          px
        </button>
        <button
          type="button"
          className={clsx("font-size-picker__unit-button", {
            active: unit === "pt",
          })}
          onClick={() => onChangeUnit("pt")}
          data-testid="fontSize-unit-pt"
        >
          pt
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---

interface FontSizePickerProps {
  size: number | null;
  onChange: (size: number) => void;
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  updateData: (formData?: any) => void;
}

export const FontSizePicker = ({
  size,
  onChange,
  appState,
  updateData,
}: FontSizePickerProps) => {
  const { container } = useExcalidrawContainer();
  const stylesPanelMode = useStylesPanelMode();
  const isFullMode = stylesPanelMode === "full";

  const [unit, setUnit] = useState<FontSizeUnit>("px");

  // Mobile + compact/tablet: original 4-button RadioSelection
  if (!isFullMode) {
    return (
      <div className="buttonList">
        <RadioSelection
          group="font-size"
          options={RADIO_OPTIONS}
          value={size}
          onChange={(value) => onChange(value)}
        />
      </div>
    );
  }

  // Full mode: SVG icon presets + separator + numeric trigger + popover
  const isOpen = appState.openPopup === "fontSize";

  const handleToggle = () => {
    if (isOpen) {
      updateData({ openPopup: null });
    } else {
      updateData({ openPopup: "fontSize" });
    }
  };

  const handleInlinePresetClick = (value: number) => {
    onChange(value);
  };

  return (
    <div>
      <div className="font-size-picker-container">
        <FontSizeTopPicks
          activeSize={size}
          onChange={handleInlinePresetClick}
        />
        <ButtonSeparator />
        <Popover.Root
          open={isOpen}
          onOpenChange={(open) => {
            if (open) {
              updateData({ openPopup: "fontSize" });
            } else if (appState.openPopup === "fontSize") {
              updateData({ openPopup: null });
            }
          }}
        >
          <FontSizeTrigger
            size={size}
            unit={unit}
            isOpen={isOpen}
            onToggle={handleToggle}
          />
          {isOpen && (
            <PropertiesPopover
              container={container}
              style={{ maxWidth: "14rem" }}
              onClose={() => {
                // Only close if fontSize is still the active popup.
                // If another popup has already taken over, don't reset.
                if (appState.openPopup === "fontSize") {
                  updateData({ openPopup: null });
                }
              }}
            >
              <div className="font-size-picker__popover-content">
                <div className="font-size-picker__section-label">
                  {t("labels.fontSizePresets" as any)}
                </div>
                <FontSizePresetGrid
                  activeSize={size}
                  onChange={onChange}
                />
                <div className="font-size-picker__divider" />
                <div className="font-size-picker__section-label">
                  {t("labels.fontSizeCustom" as any)}
                </div>
                <FontSizeNumericRow
                  activeSize={size}
                  unit={unit}
                  onChangeSize={onChange}
                  onChangeUnit={setUnit}
                />
              </div>
            </PropertiesPopover>
          )}
        </Popover.Root>
      </div>
    </div>
  );
};
