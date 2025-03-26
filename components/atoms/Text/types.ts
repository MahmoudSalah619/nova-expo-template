import { COLORS } from "@/constants/Colors";
import { TextProps } from "react-native";

export type CustomTextProps = TextProps & {
  size?: number;
  weight?: 400 | 500 | 600 | 700 | 800 ;
  lineHeight?: number;
  isCentered?: boolean;
  // Add more options if there're multiple fonts
  fontFamily?: "cosmica";
  color?: keyof typeof COLORS.light & keyof typeof COLORS.dark;
  lightColor?: keyof typeof COLORS.light;
  darkColor?: keyof typeof COLORS.dark;
  type?: "title" | "subtitle" | "link" | "bell";
  autoTranslate?: boolean;
};
