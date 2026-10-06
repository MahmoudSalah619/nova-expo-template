import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export type ScreenWrapperVariant = "auth" | "main";
export type ScreenWrapperSpacingSize = "sm" | "md";

export interface ScreenWrapperProps {
  children: ReactNode;
  /**
   * Layout preset. "auth" (default) renders the logo header and auth padding;
   * "main" is the header-less layout used by main-flow screens.
   */
  variant?: ScreenWrapperVariant;
  justifyContent?: ViewStyle["justifyContent"];
  style?: ViewStyle;
  hasNoHorizontalSpacing?: boolean;
  hasNoKeyboardVerticalOffset?: boolean;
  isScrollable?: boolean;
  /** Horizontal padding. auth: sm 24 / md 32 — main: sm 12 / md 16. */
  paddingSize?: ScreenWrapperSpacingSize;
  /** Vertical padding, main variant only: sm 12 / md 24. */
  paddingBlockSize?: ScreenWrapperSpacingSize;
  /** Auth variant only: pads the top by the status bar height instead of 10. */
  isStatusBarShown?: boolean;
  /** Renders the logo header. Defaults to true for "auth", false for "main". */
  showHeader?: boolean;
}
