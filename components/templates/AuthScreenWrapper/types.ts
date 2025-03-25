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
  customStyle?: ViewStyle;
  hasNoHorizontalSpacing?: boolean;
  isHeaderHidden?: boolean;
  hasNoKeyboardVerticalOffset?: boolean;
  showHeader?: boolean;
  isScrollable?: boolean;
  hasLogo?: boolean;
}
