import React from "react";

import { Excalidraw } from "../index";

import { fireEvent, render, waitFor } from "./test-utils";

const renderHelpDialog = async () => {
  await render(
    <Excalidraw
      initialData={{
        appState: {
          openDialog: { name: "help" },
        },
      }}
    />,
  );
};

describe("HelpDialog search", () => {
  beforeEach(async () => {
    await renderHelpDialog();
  });

  it("shows magnifying glass button on open, no input field", () => {
    expect(document.querySelector(".HelpDialog__search-btn")).not.toBeNull();
    expect(document.querySelector(".HelpDialog__search-input")).toBeNull();
  });

  it("clicking the icon button reveals the search input", async () => {
    fireEvent.click(document.querySelector(".HelpDialog__search-btn")!);

    await waitFor(() => {
      expect(document.querySelector(".HelpDialog__search-input")).not.toBeNull();
      expect(document.querySelector(".HelpDialog__search-btn")).toBeNull();
    });
  });

  it("filters shortcuts by typed query (case-insensitive)", async () => {
    fireEvent.click(document.querySelector(".HelpDialog__search-btn")!);
    const input = await waitFor(
      () => document.querySelector<HTMLInputElement>(".HelpDialog__search-input")!,
    );

    // "zoom" only matches shortcuts in the View section
    fireEvent.change(input, { target: { value: "ZoOm" } });

    await waitFor(() => {
      const labels = Array.from(
        document.querySelectorAll(".HelpDialog__shortcut"),
      ).map((el) => el.textContent?.toLowerCase() ?? "");
      expect(labels.length).toBeGreaterThan(0);
      expect(labels.every((l) => l.includes("zoom"))).toBe(true);
    });
  });

  it("hides all shortcuts when query matches nothing", async () => {
    fireEvent.click(document.querySelector(".HelpDialog__search-btn")!);
    const input = await waitFor(
      () => document.querySelector<HTMLInputElement>(".HelpDialog__search-input")!,
    );

    fireEvent.change(input, { target: { value: "xyznotamatch" } });

    await waitFor(() => {
      expect(document.querySelectorAll(".HelpDialog__shortcut").length).toBe(0);
    });
  });

  it("restores all shortcuts when input is cleared", async () => {
    const totalBefore = document.querySelectorAll(".HelpDialog__shortcut").length;
    expect(totalBefore).toBeGreaterThan(0);

    fireEvent.click(document.querySelector(".HelpDialog__search-btn")!);
    const input = await waitFor(
      () => document.querySelector<HTMLInputElement>(".HelpDialog__search-input")!,
    );

    fireEvent.change(input, { target: { value: "zoom" } });
    await waitFor(() => {
      expect(
        document.querySelectorAll(".HelpDialog__shortcut").length,
      ).toBeLessThan(totalBefore);
    });

    fireEvent.change(input, { target: { value: "" } });
    await waitFor(() => {
      expect(document.querySelectorAll(".HelpDialog__shortcut").length).toBe(
        totalBefore,
      );
    });
  });

  it("hides section headers when all their shortcuts are filtered out", async () => {
    const totalSections = document.querySelectorAll(
      ".HelpDialog__island-title",
    ).length;
    expect(totalSections).toBe(3); // Tools, View, Editor

    fireEvent.click(document.querySelector(".HelpDialog__search-btn")!);
    const input = await waitFor(
      () => document.querySelector<HTMLInputElement>(".HelpDialog__search-input")!,
    );

    // "zoom" only matches shortcuts in the View section
    fireEvent.change(input, { target: { value: "zoom" } });

    await waitFor(() => {
      const visibleHeaders = document.querySelectorAll(
        ".HelpDialog__island-title",
      );
      expect(visibleHeaders.length).toBe(1);
      expect(visibleHeaders[0].textContent).toBe("View");
    });
  });

  it("wraps matched text in <mark> element for highlighting", async () => {
    fireEvent.click(document.querySelector(".HelpDialog__search-btn")!);
    const input = await waitFor(
      () => document.querySelector<HTMLInputElement>(".HelpDialog__search-input")!,
    );

    fireEvent.change(input, { target: { value: "zoom" } });

    await waitFor(() => {
      const marks = document.querySelectorAll(".HelpDialog__shortcut mark");
      expect(marks.length).toBeGreaterThan(0);
      marks.forEach((mark) => {
        expect(mark.textContent?.toLowerCase()).toBe("zoom");
      });
    });
  });

  it("does not show <mark> elements when search is inactive", () => {
    expect(document.querySelectorAll(".HelpDialog__shortcut mark").length).toBe(
      0,
    );
  });

  it("activates search when a printable key is pressed while dialog is open", async () => {
    // Fire keydown on an element inside the onKeyDown wrapper (e.g. a header link).
    // The event bubbles up through the wrapper div which holds the handler.
    const headerLink = document.querySelector(".HelpDialog__btn")!;
    fireEvent.keyDown(headerLink, { key: "c", code: "KeyC" });

    await waitFor(() => {
      const input = document.querySelector<HTMLInputElement>(
        ".HelpDialog__search-input",
      );
      expect(input).not.toBeNull();
      expect(input?.value).toBe("c");
    });
  });

  it("does not activate search when a modifier key combination is pressed", async () => {
    const headerLink = document.querySelector(".HelpDialog__btn")!;
    fireEvent.keyDown(headerLink, { key: "c", code: "KeyC", ctrlKey: true });

    expect(document.querySelector(".HelpDialog__search-input")).toBeNull();
  });
});
