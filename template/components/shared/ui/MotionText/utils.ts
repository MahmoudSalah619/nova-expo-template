import { GradientColors } from "./types";

/**
 * Two identical periods side by side ([a,b,c,b,a] twice), so sliding the
 * gradient left by one text width loops with no visible seam.
 */
export function toLoopColors(colors: GradientColors): GradientColors {
  const period = [...colors, ...colors.slice(0, -1).reverse()];
  return [...period, ...period.slice(1)] as unknown as GradientColors;
}

export interface SplitWord {
  pieces: string[];
  /** Overall index of the word's first piece, used for its delay. */
  firstIndex: number;
}

/** Splits into words, each holding its animated pieces (itself, or its letters). */
export function splitWords(text: string, by: "words" | "letters"): SplitWord[] {
  const words = text.split(" ");
  const toPieces = (word: string) =>
    by === "letters" ? Array.from(word) : [word];
  const pieceCounts = words.map((word) => toPieces(word).length);
  return words.map((word, index) => ({
    pieces: toPieces(word),
    firstIndex: pieceCounts
      .slice(0, index)
      .reduce((total, count) => total + count, 0),
  }));
}

/** Fast at first, easing into the end (t from 0 to 1). */
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Rounded, grouped number: 1250.4 → "1,250". Always Western digits, so a
 * phone set to Arabic doesn't switch the app's numbers to ١٬٢٥٠.
 */
export const formatCount = (value: number) =>
  Math.round(value).toLocaleString("en-US");

// Arabic (incl. Persian/Urdu letters and presentation forms). These scripts
// join letters, so animating them one by one breaks the words apart.
const JOINING_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** True when the text uses a script whose letters join (e.g. Arabic). */
export const hasJoiningScript = (text: string) => JOINING_SCRIPT.test(text);
