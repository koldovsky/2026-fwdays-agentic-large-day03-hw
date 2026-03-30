import React from "react";

import { KEYS } from "@excalidraw/common";
import { isBoundToContainer, hasBoundTextElement } from "@excalidraw/element";
import { isTextElement } from "@excalidraw/element";

import { Excalidraw } from "../index";

import { API } from "./helpers/api";
import { Keyboard } from "./helpers/ui";
import { render } from "./test-utils";

const { h } = window;

describe("toggleContainerBinding shortcut (Alt+W)", () => {
  beforeEach(async () => {
    await render(<Excalidraw handleKeyboardGlobally={true} />);
  });

  it("wraps an unbound text element in a container when Alt+W is pressed", async () => {
    const textElement = API.createElement({
      type: "text",
      text: "Hello",
      width: 50,
      height: 20,
    });
    API.setElements([textElement]);
    API.setAppState({ selectedElementIds: { [textElement.id]: true } });

    Keyboard.withModifierKeys({ alt: true }, () => {
      Keyboard.keyPress(KEYS.W);
    });

    const elements = h.elements.filter((el) => !el.isDeleted);
    // A new rectangle container should have been created
    const containers = elements.filter((el) => el.type === "rectangle");
    expect(containers.length).toBe(1);

    // The text element should now be bound to the container
    const updatedText = elements.find(
      (el) => el.id === textElement.id,
    ) as typeof textElement;
    expect(isBoundToContainer(updatedText)).toBe(true);
    expect(updatedText.containerId).toBe(containers[0].id);
  });

  it("unbinds a bound text element from its container when Alt+W is pressed", async () => {
    const [container, textElement] = API.createTextContainer();
    API.setElements([container, textElement]);
    // Select the container (which has the bound text)
    API.setAppState({ selectedElementIds: { [container.id]: true } });

    expect(hasBoundTextElement(container)).toBe(true);

    Keyboard.withModifierKeys({ alt: true }, () => {
      Keyboard.keyPress(KEYS.W);
    });

    const elements = h.elements.filter((el) => !el.isDeleted);
    const updatedContainer = elements.find((el) => el.id === container.id)!;
    const updatedText = elements.find(
      (el) => isTextElement(el),
    ) as (typeof textElement | undefined);

    // Container should no longer have bound text
    expect(hasBoundTextElement(updatedContainer)).toBe(false);
    // Text element should be unbound
    expect(updatedText).toBeDefined();
    expect(isBoundToContainer(updatedText!)).toBe(false);
  });

  it("does nothing when no text elements are selected and Alt+W is pressed", async () => {
    const rectangle = API.createElement({ type: "rectangle" });
    API.setElements([rectangle]);
    API.setAppState({ selectedElementIds: { [rectangle.id]: true } });

    const elementsBefore = h.elements.filter((el) => !el.isDeleted).length;

    Keyboard.withModifierKeys({ alt: true }, () => {
      Keyboard.keyPress(KEYS.W);
    });

    const elementsAfter = h.elements.filter((el) => !el.isDeleted).length;
    expect(elementsAfter).toBe(elementsBefore);
  });
});
