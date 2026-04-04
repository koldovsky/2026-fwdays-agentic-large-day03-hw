import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";

import { normalizeInputColor } from "@excalidraw/common";

import { ColorInput } from "../ColorInput";

// Mock dependencies required by ColorInput
vi.mock("../../../editor-jotai", () => ({
  useAtom: () => [null, vi.fn()],
}));

vi.mock("../../App", () => ({
  useEditorInterface: () => ({ formFactor: "desktop" }),
}));

vi.mock("../../EyeDropper", () => ({
  activeEyeDropperAtom: {},
}));

vi.mock("../../../i18n", () => ({
  t: (key: string) => {
    const translations: Record<string, string> = {
      "colorPicker.invalidColor": "Invalid hex color",
    };
    return translations[key] || key;
  },
}));

vi.mock("../colorPickerUtils", () => ({
  activeColorPickerSectionAtom: {},
}));

vi.mock("../../icons", () => ({
  eyeDropperIcon: null,
}));

vi.mock("../../..//shortcut", () => ({
  getShortcutKey: (key: string) => key,
}));

describe("normalizeInputColor", () => {
  it("should accept valid 6-digit hex color", () => {
    expect(normalizeInputColor("ff0000")).toBe("#ff0000");
  });

  it("should accept valid 3-digit hex color", () => {
    expect(normalizeInputColor("f00")).toBe("#f00");
  });

  it("should accept hex color with # prefix", () => {
    expect(normalizeInputColor("#ff0000")).toBe("#ff0000");
  });

  it("should accept valid 8-digit hex color with alpha", () => {
    expect(normalizeInputColor("ff000080")).toBe("#ff000080");
  });

  it("should reject invalid hex characters", () => {
    expect(normalizeInputColor("zzzzzz")).toBeNull();
  });

  it("should reject non-hex text", () => {
    expect(normalizeInputColor("notacolor")).toBeNull();
  });

  it("should reject single digit", () => {
    expect(normalizeInputColor("1")).toBeNull();
  });

  it("should reject two digits", () => {
    expect(normalizeInputColor("12")).toBeNull();
  });

  it("should reject five digits", () => {
    expect(normalizeInputColor("12345")).toBeNull();
  });

  it("should reject seven digits", () => {
    expect(normalizeInputColor("1234567")).toBeNull();
  });

  it("should reject more than 8 characters", () => {
    expect(normalizeInputColor("123456789")).toBeNull();
  });

  it("should accept transparent", () => {
    expect(normalizeInputColor("transparent")).toBe("transparent");
  });

  it("should trim whitespace", () => {
    expect(normalizeInputColor("  ff0000  ")).toBe("#ff0000");
  });

  it("should return null for empty string", () => {
    expect(normalizeInputColor("")).toBeNull();
  });
});

describe("ColorInput component", () => {
  const defaultProps = {
    color: "#ff0000",
    onChange: vi.fn(),
    label: "Test color",
    colorPickerType: "elementStroke" as const,
  };

  it("should render without error state initially", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input");
    expect(input).not.toBeNull();
    expect(input?.classList.contains("color-picker-input--error")).toBe(false);
    expect(input?.getAttribute("aria-invalid")).toBe("false");
  });

  it("should show error state when invalid hex is entered", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input")!;

    fireEvent.change(input, { target: { value: "zzzzzz" } });

    expect(input.classList.contains("color-picker-input--error")).toBe(true);
    expect(input.getAttribute("aria-invalid")).toBe("true");
  });

  it("should show error message with role=alert when invalid", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input")!;

    fireEvent.change(input, { target: { value: "xyz" } });

    const errorMessage = container.querySelector('[role="alert"]');
    expect(errorMessage).not.toBeNull();
    expect(errorMessage?.textContent).toBe("Invalid hex color");
  });

  it("should not show error for valid 6-digit hex", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input")!;

    fireEvent.change(input, { target: { value: "00ff00" } });

    expect(input.classList.contains("color-picker-input--error")).toBe(false);
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it("should not show error for valid 3-digit hex", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input")!;

    fireEvent.change(input, { target: { value: "f00" } });

    expect(input.classList.contains("color-picker-input--error")).toBe(false);
  });

  it("should not show error for empty input", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input")!;

    fireEvent.change(input, { target: { value: "" } });

    expect(input.classList.contains("color-picker-input--error")).toBe(false);
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it("should clear error when user corrects to valid value", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input")!;

    // Type invalid value
    fireEvent.change(input, { target: { value: "zzz" } });
    expect(input.classList.contains("color-picker-input--error")).toBe(true);
    expect(input.getAttribute("aria-invalid")).toBe("true");

    // Correct to valid value
    fireEvent.change(input, { target: { value: "ff0000" } });
    expect(input.classList.contains("color-picker-input--error")).toBe(false);
    expect(input.getAttribute("aria-invalid")).toBe("false");
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it("should revert value and clear error on blur with invalid input", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector<HTMLInputElement>(
      ".color-picker-input",
    )!;

    // Type invalid value
    fireEvent.change(input, { target: { value: "invalid" } });
    expect(input.classList.contains("color-picker-input--error")).toBe(true);

    // Blur should revert
    fireEvent.blur(input);
    expect(input.classList.contains("color-picker-input--error")).toBe(false);
    expect(input.getAttribute("aria-invalid")).toBe("false");
    expect(container.querySelector('[role="alert"]')).toBeNull();
    // Value should revert to original color (without #)
    expect(input.value).toBe("ff0000");
  });

  it("should show error for single digit input", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input")!;

    fireEvent.change(input, { target: { value: "1" } });

    expect(input.classList.contains("color-picker-input--error")).toBe(true);
  });

  it("should show error for input with more than 8 characters", () => {
    const { container } = render(<ColorInput {...defaultProps} />);
    const input = container.querySelector(".color-picker-input")!;

    fireEvent.change(input, { target: { value: "123456789" } });

    expect(input.classList.contains("color-picker-input--error")).toBe(true);
  });

  it("should call onChange only for valid colors", () => {
    const onChange = vi.fn();
    const { container } = render(
      <ColorInput {...defaultProps} onChange={onChange} />,
    );
    const input = container.querySelector(".color-picker-input")!;

    // Invalid - should NOT call onChange
    fireEvent.change(input, { target: { value: "zzz" } });
    expect(onChange).not.toHaveBeenCalled();

    // Valid - should call onChange
    fireEvent.change(input, { target: { value: "ff0000" } });
    expect(onChange).toHaveBeenCalledWith("#ff0000");
  });
});
