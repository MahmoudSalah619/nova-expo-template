import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface ScreenWrapperProps {
  children: ReactNode;
  paddingSize?: "sm" | "md";
  justifyContent?:
    | "space-between"
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-around"
    | "space-evenly";
  style?: ViewStyle;
  hasNoHorizontalSpacing?: boolean;
  isStatusBarShown?: boolean;
  hasNoKeyboardVerticalOffset?: boolean;
  showHeader?: boolean;
  isScrollable?: boolean;
}
