import { textColorType } from "@/@types/mainTypes";
import FontFamily from "@/constants/FontFamily";
import { TextProps } from "react-native";

export type TextVariant =
  | "H0"
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "lg"
  | "md"
  | "sm"
  | "xsm";

export type TextColor = textColorType;

export type CustomTextProps = TextProps & {
  size?: number;
  lineHeight?: number;
  isCentered?: boolean;
  fontFamily?: keyof typeof FontFamily;
  color?: TextColor;
  autoTranslate?: boolean;
  variant?: TextVariant;
  preventDarkModeColor?: boolean;
};
