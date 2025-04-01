import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import FontFamily from "@/constants/FontFamily";
import { COLORS } from "@/constants/Colors";

export interface SheetWrapperProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
  sheetHeight?: number | string;
  title?: string;
  color?: keyof typeof COLORS.light;
  weight?: 400 | 500 | 600 | 700 | 800;
  sheetId?: string | undefined;
  showSeperateLine?: boolean;
  isNoPadding?: boolean;
}
