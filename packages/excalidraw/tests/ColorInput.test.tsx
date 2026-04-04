import React from "react";

import { Excalidraw } from "../index";

import { Pointer, UI } from "./helpers/ui";
import { act, fireEvent, render, waitFor } from "./test-utils";

const mouse = new Pointer("mouse");

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

const openStrokeColorPicker = async () => {
  UI.clickTool("rectangle");
  mouse.down(10, 10);
  mouse.up(100, 100);

  const trigger = document.querySelector(
    '[data-openpopup="elementStroke"]',
  ) as HTMLElement;
  await act(async () => {
    fireEvent.click(trigger);
  });
};

/** Background picker includes `transparent` in top picks; stroke picker does not. */
const openElementBackgroundColorPicker = async () => {
  UI.clickTool("rectangle");
  mouse.down(10, 10);
  mouse.up(100, 100);

  const trigger = document.querySelector(
    '[data-openpopup="elementBackground"]',
  ) as HTMLElement;
  await act(async () => {
    fireEvent.click(trigger);
  });
};

const getHexInput = (): HTMLInputElement => {
  return document.querySelector(".color-picker-input") as HTMLInputElement;
};

const typeIntoInput = (input: HTMLInputElement, value: string) => {
  fireEvent.change(input, { target: { value } });
};

const getErrorElement = () =>
  document.querySelector(".color-picker__input-error");

const getInvalidContainer = () =>
  document.querySelector(".color-picker__input-label.is-invalid");

describe("ColorInput", () => {
  beforeAll(() => {
    (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver =
      MockResizeObserver as unknown as typeof ResizeObserver;
  });

  beforeEach(async () => {
    await render(<Excalidraw handleKeyboardGlobally={true} />);
  });

  // flush pending React state updates between tests
  afterEach(async () => {
    await act(async () => {});
  });

  // -- Valid values: no error ---------------------------------------------------

  it("shows no error indicators when a valid 6-digit hex is present on blur", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "ff0000");
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
    expect(getInvalidContainer()).not.toBeInTheDocument();
  });

  it("shows no error for a valid 3-digit hex on blur", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "f00");
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
    expect(getInvalidContainer()).not.toBeInTheDocument();
  });

  it("shows no error for a valid 8-digit hex (with alpha) on blur", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "ff000080");
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
    expect(getInvalidContainer()).not.toBeInTheDocument();
  });

  it("shows no error for a named CSS color ('blue') on blur", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "blue");
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
    expect(getInvalidContainer()).not.toBeInTheDocument();
  });

  // -- Invalid values: error shown -----------------------------------------------

  it.each(["zzzzzz", "12345", "123456789", "1", "12", "1234567"])(
    "shows error border and message on blur for '%s'",
    async (value) => {
      await openStrokeColorPicker();
      const input = getHexInput();

      typeIntoInput(input, value);
      fireEvent.blur(input);

      expect(input.getAttribute("aria-invalid")).toBe("true");
      expect(getErrorElement()).toBeInTheDocument();
      expect(getInvalidContainer()).toBeInTheDocument();
    },
  );

  it("displays the localized error message text", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "zzzzzz");
    fireEvent.blur(input);

    const errorEl = getErrorElement();
    expect(errorEl).toBeInTheDocument();
    expect(errorEl!.textContent).toBeTruthy();
    expect(errorEl!.textContent!.length).toBeGreaterThan(0);
  });

  // -- Empty / whitespace: no error -----------------------------------------------

  it("shows no error when field is empty on blur", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "");
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
  });

  it("shows no error when field contains only whitespace on blur", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "   ");
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
  });

  // -- Error visible after blur text revert -----------------------------------------

  it("shows error after blur even though field text reverts to last applied color", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();
    const valueBefore = input.value;

    typeIntoInput(input, "zzzzzz");
    fireEvent.blur(input);

    expect(getInvalidContainer()).toBeInTheDocument();
    expect(getErrorElement()).toBeInTheDocument();
    expect(input.value).not.toBe("zzzzzz");
    expect(input.value).toBe(valueBefore);
  });

  // -- Error clears on valid input ---------------------------------------------------

  it("clears error immediately when user types a valid value", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "zzzzzz");
    fireEvent.blur(input);

    expect(getInvalidContainer()).toBeInTheDocument();

    fireEvent.focus(input);
    typeIntoInput(input, "ff0000");

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
    expect(getInvalidContainer()).not.toBeInTheDocument();
  });

  // -- Error clears on external color selection ----------------------------------------

  it("clears error and ARIA attributes when color prop updates (external selection)", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "zzzzzz");
    fireEvent.blur(input);

    expect(getInvalidContainer()).toBeInTheDocument();
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.getAttribute("aria-describedby")).toBeTruthy();

    const redPick = document.querySelector(
      '[data-testid="color-top-pick-#e03131"]',
    ) as HTMLElement;
    await act(async () => {
      fireEvent.click(redPick);
    });

    await waitFor(() => {
      expect(getInvalidContainer()).not.toBeInTheDocument();
      expect(getErrorElement()).not.toBeInTheDocument();
      expect(input.getAttribute("aria-invalid")).toBeNull();
      expect(input.getAttribute("aria-describedby")).toBeNull();
    });
  });

  // -- Replacing invalid with invalid ---------------------------------------------------

  it("error persists when replacing one invalid value with another and blurring", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "zzzzzz");
    fireEvent.blur(input);

    expect(getInvalidContainer()).toBeInTheDocument();

    fireEvent.focus(input);
    typeIntoInput(input, "gggggg");
    fireEvent.blur(input);

    expect(getInvalidContainer()).toBeInTheDocument();
    expect(getErrorElement()).toBeInTheDocument();
  });

  // -- Rapid blur without typing --------------------------------------------------------

  it("shows no error when user focuses and immediately blurs without changing text", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
  });

  // -- Error clears on re-focus + blur cycle (reverted text is valid) -------------------

  it("clears error when user focuses and blurs again after text reverted to valid color", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "zzzzzz");
    fireEvent.blur(input);
    expect(getInvalidContainer()).toBeInTheDocument();

    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(getInvalidContainer()).not.toBeInTheDocument();
    expect(getErrorElement()).not.toBeInTheDocument();
    expect(input.getAttribute("aria-invalid")).toBeNull();
  });

  // -- Transparent color as current value -----------------------------------------------

  it("shows no error when current color is 'transparent'", async () => {
    await openElementBackgroundColorPicker();

    const transparentPick = document.querySelector(
      '[data-testid="color-top-pick-transparent"]',
    ) as HTMLElement;
    expect(transparentPick).toBeTruthy();

    await act(async () => {
      fireEvent.click(transparentPick);
    });

    await waitFor(() => {
      expect(getHexInput().value).toBe("transparent");
    });

    const input = getHexInput();
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
    expect(getInvalidContainer()).not.toBeInTheDocument();
  });

  // -- ARIA attributes -------------------------------------------------------------------

  it("has correct ARIA attributes and role='alert' when invalid, removed when valid", async () => {
    await openStrokeColorPicker();
    const input = getHexInput();

    typeIntoInput(input, "zzzzzz");
    fireEvent.blur(input);

    expect(input.getAttribute("aria-invalid")).toBe("true");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const errorEl = document.getElementById(describedBy!);
    expect(errorEl).toBeInTheDocument();
    expect(errorEl!.getAttribute("role")).toBe("alert");

    fireEvent.focus(input);
    typeIntoInput(input, "ff0000");

    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(input.getAttribute("aria-describedby")).toBeNull();
    expect(getErrorElement()).not.toBeInTheDocument();
  });
});
