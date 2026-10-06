import { ReactNode } from "react";
import { GestureResponderEvent, ViewStyle } from "react-native";
import { textColorType } from "@/@types/mainTypes";
import { TextVariant } from "@/components/shared/ui/Text/Base/types";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant =
  | "primary"
  | "outlined"
  | "ghost"
  | "link"
  | "destructive";

export interface ButtonProps {
  title?: string;
  size?: ButtonSize;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  prefix?: ReactNode;
  suffix?: ReactNode;
  isLoading?: boolean;
  isFullWidth?: boolean;
  variant?: ButtonVariant;
}

export interface SizeConfig {
  height: number;
  textVariant: TextVariant;
}

export interface VariantConfig {
  btnStyle?: ViewStyle;
  disabledBtnStyle?: ViewStyle;
  textColor: textColorType;
}
