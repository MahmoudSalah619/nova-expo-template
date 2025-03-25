import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface CardWrapperProps {
  children: ReactNode;
  customStyles?:ViewStyle;
}
