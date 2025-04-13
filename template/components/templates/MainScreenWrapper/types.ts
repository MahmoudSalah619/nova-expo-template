import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface ScreenWrapperProps {
  children: ReactNode;
  justifyContent?: ViewStyle["justifyContent"];
  customStyle?: ViewStyle;
  hasNoHorizontalSpacing?: boolean;
  hasNoKeyboardVerticalOffset?: boolean;
  paddingHorizontalSize?: "sm" | "md";
  paddingBlockSize?: "sm" | "md";
  isScrollable?: boolean;
}
