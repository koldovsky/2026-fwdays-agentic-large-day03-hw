import React from "react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";

import { normalizeInputColor } from "@excalidraw/common";

describe("ColorInput validation", () => {
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
});
