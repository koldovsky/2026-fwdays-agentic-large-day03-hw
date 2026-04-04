import { GOOGLE_FONTS_RANGES } from "@excalidraw/common";

import { type ExcalidrawFontFaceDescriptor } from "../Fonts";

import Latin from "./Lexend-Latin.woff2";
import LatinExt from "./Lexend-LatinExt.woff2";
import Vietnamese from "./Lexend-Vietnamese.woff2";

/** Matches Google Fonts CSS for Lexend v26 latin-ext subset (differs slightly from GOOGLE_FONTS_RANGES.LATIN_EXT). */
const LEXEND_LATIN_EXT_RANGE =
  "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF";

export const LexendFontFaces: ExcalidrawFontFaceDescriptor[] = [
  {
    uri: Vietnamese,
    descriptors: {
      unicodeRange: GOOGLE_FONTS_RANGES.VIETNAMESE,
      weight: "400",
    },
  },
  {
    uri: LatinExt,
    descriptors: { unicodeRange: LEXEND_LATIN_EXT_RANGE, weight: "400" },
  },
  {
    uri: Latin,
    descriptors: { unicodeRange: GOOGLE_FONTS_RANGES.LATIN, weight: "400" },
  },
];
