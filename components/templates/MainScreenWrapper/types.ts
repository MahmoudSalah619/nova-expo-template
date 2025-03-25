import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface ScreenWrapperProps {
  children: ReactNode;
  header?: ReactNode;
  hasVerticalSpaceBetween?: boolean;
  customStyle?: ViewStyle;
  hasNoHorizontalSpacing?: boolean;
  isHeaderHidden?: boolean;
  hasNoKeyboardVerticalOffset?: boolean;
  isScrollable?: boolean;
  extraSpace?: boolean;
  paddingHorizontalSize?: "sm" | "md";
  paddingBlockSize?: "sm" | "md" | "none";
  isForJobList?: boolean;
}
