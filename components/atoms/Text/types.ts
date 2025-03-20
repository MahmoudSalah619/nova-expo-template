import { COLORS } from "@/constants/Colors";
import { TextProps } from "react-native";

export type CustomTextProps = TextProps & {
    color?: keyof typeof COLORS.light & keyof typeof COLORS.dark;
    lightColor?: keyof typeof COLORS.light;
    darkColor?: keyof typeof COLORS.dark;
    type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "bell";
    autoTranslate?: boolean;
  };
  