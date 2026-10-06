import { JSX } from "react";
import { TextInputProps, TextStyle, ViewStyle } from "react-native";

export enum InputSize {
  sm = "sm",
  lg = "lg",
  xl = "xl",
}

export interface InputFieldProps extends Omit<TextInputProps, "onChange"> {
  error?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  prefix?: JSX.Element | null;
  suffix?: JSX.Element | null;
  onChange?: (text: string) => void;
  isSearch?: boolean;
  secureTextEntry?: boolean;
  inputColorWhenDisabled?: string;
  inputStyle?: TextStyle;
  label?: string;
  isPlaceholderDotsHidden?: boolean;
  size?: InputSize;
  helperComponent?: JSX.Element | null;
  disabled?: boolean;
  isOptional?: boolean;
  isPasswordValid?: boolean;
}
