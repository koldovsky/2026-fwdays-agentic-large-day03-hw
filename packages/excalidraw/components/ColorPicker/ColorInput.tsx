import clsx from "clsx";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { KEYS, validateHexColorFieldInput } from "@excalidraw/common";

import { getShortcutKey } from "../..//shortcut";
import { useAtom } from "../../editor-jotai";
import { t } from "../../i18n";
import { useEditorInterface } from "../App";
import { activeEyeDropperAtom } from "../EyeDropper";
import { eyeDropperIcon } from "../icons";

import { activeColorPickerSectionAtom } from "./colorPickerUtils";

import type { ColorPickerType } from "./colorPickerUtils";

export const ColorInput = ({
  color,
  onChange,
  label,
  colorPickerType,
  placeholder,
}: {
  color: string;
  onChange: (color: string) => void;
  label: string;
  colorPickerType: ColorPickerType;
  placeholder?: string;
}) => {
  const editorInterface = useEditorInterface();
  const [innerValue, setInnerValue] = useState(color);
  const [hexError, setHexError] = useState<"length" | "chars" | null>(null);
  const [activeSection, setActiveColorPickerSection] = useAtom(
    activeColorPickerSectionAtom,
  );
  const hexErrorId = useId();

  useEffect(() => {
    setInnerValue(color);
    setHexError(null);
  }, [color]);

  const changeColor = useCallback(
    (inputValue: string) => {
      const value = inputValue.toLowerCase();
      const validation = validateHexColorFieldInput(value);

      if (validation.status === "empty") {
        setHexError(null);
        setInnerValue(value.replace(/^#/, ""));
        return;
      }
      if (validation.status === "valid") {
        setHexError(null);
        onChange(validation.normalized);
        setInnerValue(validation.normalized.replace(/^#/, "").toLowerCase());
        return;
      }
      setHexError(validation.reason);
      setInnerValue(value.replace(/^#/, ""));
    },
    [onChange],
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const eyeDropperTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeSection]);

  const [eyeDropperState, setEyeDropperState] = useAtom(activeEyeDropperAtom);

  useEffect(() => {
    return () => {
      setEyeDropperState(null);
    };
  }, [setEyeDropperState]);

  return (
    <div className="color-picker__input-field">
      <div
        className={clsx("color-picker__input-label", {
          "color-picker__input-label--error": hexError,
        })}
      >
        <div className="color-picker__input-hash">#</div>
        <input
          ref={activeSection === "hex" ? inputRef : undefined}
          style={{ border: 0, padding: 0 }}
          spellCheck={false}
          className="color-picker-input"
          aria-label={label}
          aria-invalid={hexError ? true : undefined}
          aria-describedby={hexError ? hexErrorId : undefined}
          onChange={(event) => {
            changeColor(event.target.value);
          }}
          value={(innerValue || "").replace(/^#/, "")}
          onBlur={() => {
            setInnerValue(color);
            setHexError(null);
          }}
        tabIndex={-1}
        onFocus={() => setActiveColorPickerSection("hex")}
        onKeyDown={(event) => {
          if (event.key === KEYS.TAB) {
            return;
          } else if (event.key === KEYS.ESCAPE) {
            eyeDropperTriggerRef.current?.focus();
          }
          event.stopPropagation();
        }}
          placeholder={placeholder}
        />
        {/* TODO reenable on mobile with a better UX */}
        {editorInterface.formFactor !== "phone" && (
          <>
            <div
              style={{
                width: "1px",
                height: "1.25rem",
                backgroundColor: "var(--default-border-color)",
              }}
            />
            <div
              ref={eyeDropperTriggerRef}
              className={clsx("excalidraw-eye-dropper-trigger", {
                selected: eyeDropperState,
              })}
              onClick={() =>
                setEyeDropperState((s) =>
                  s
                    ? null
                    : {
                        keepOpenOnAlt: false,
                        onSelect: (color) => onChange(color),
                        colorPickerType,
                      },
                )
              }
              title={`${t(
                "labels.eyeDropper",
              )} — ${KEYS.I.toLocaleUpperCase()} or ${getShortcutKey("Alt")} `}
            >
              {eyeDropperIcon}
            </div>
          </>
        )}
      </div>
      {hexError && (
        <div
          id={hexErrorId}
          className="color-picker__hex-error"
          role="alert"
        >
          {hexError === "length"
            ? t("colorPicker.hexError.invalidLength")
            : t("colorPicker.hexError.invalidChars")}
        </div>
      )}
    </div>
  );
};
