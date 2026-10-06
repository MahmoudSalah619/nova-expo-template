import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { textColorType } from "@/@types/mainTypes";

export interface SheetWrapperProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
  sheetHeight?: number | string;
  title?: string;
  color?: textColorType;
  weight?: 400 | 500 | 600 | 700 | 800;
  sheetId?: string | undefined;
  showSeperateLine?: boolean;
  isNoPadding?: boolean;
}
