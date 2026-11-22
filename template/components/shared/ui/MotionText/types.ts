import { CustomTextProps } from "@/components/shared/ui/Text/Base/types";
import { MotionPreset } from "@/components/shared/ui/MotionView/presets";

/** Typography props shared with `Text` (variant, color, size, style...). */
export type TextStyleProps = Omit<
  CustomTextProps,
  "children" | "autoTranslate"
>;

/** At least two colors, as expo-linear-gradient requires. */
export type GradientColors = readonly [string, string, ...string[]];

interface BaseProps extends TextStyleProps {
  /** Translate `children` as an i18n key, like `Text`. Defaults to true. */
  autoTranslate?: boolean;
}

export interface GradientTextProps extends BaseProps {
  effect: "gradient";
  children: string;
  /** Colors that sweep through the letters. */
  colors?: GradientColors;
  /** One full sweep, in ms. */
  duration?: number;
  /** Soft glow behind the text. */
  hasGlow?: boolean;
}

export interface ShimmerTextProps extends BaseProps {
  effect: "shimmer";
  children: string;
  /** One pass of the highlight band, in ms. */
  duration?: number;
}

export interface TypingTextProps extends BaseProps {
  effect: "typing";
  children: string;
  /** Time per character, in ms. */
  speed?: number;
  /** Wait before typing starts, in ms. */
  delay?: number;
  /** Blinking cursor at the end. Defaults to true. */
  hasCursor?: boolean;
}

interface SplitTextBaseProps extends BaseProps {
  children: string;
  /** MotionView preset each piece enters with. Defaults to "fadeUp". */
  preset?: MotionPreset;
  /** Animation length of each piece, in ms. */
  duration?: number;
  /** Wait before the first piece, in ms. */
  delay?: number;
  /** Gap between pieces, in ms. */
  step?: number;
}

/** Each word enters one after another. */
export interface WordsTextProps extends SplitTextBaseProps {
  effect: "words";
}

/** Each letter enters one after another (breaks Arabic joining; use words there). */
export interface LettersTextProps extends SplitTextBaseProps {
  effect: "letters";
}

export interface CountTextProps extends BaseProps {
  effect: "count";
  /** Final value. */
  to: number;
  /** Starting value. Defaults to 0. */
  from?: number;
  /** Count length, in ms. */
  duration?: number;
  /** Wait before counting starts, in ms. */
  delay?: number;
  /** Formats the current value. Defaults to a rounded, grouped number (1,250). */
  format?: (value: number) => string;
}

export type MotionTextProps =
  | GradientTextProps
  | ShimmerTextProps
  | TypingTextProps
  | WordsTextProps
  | LettersTextProps
  | CountTextProps;

export type MotionTextEffect = MotionTextProps["effect"];

/** Props of one specific effect, e.g. MotionTextPropsFor<"count">. */
export type MotionTextPropsFor<E extends MotionTextEffect> = Extract<
  MotionTextProps,
  { effect: E }
>;
