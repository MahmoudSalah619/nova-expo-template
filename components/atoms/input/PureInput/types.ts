import { TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface InputFieldProps extends TextInputProps {
  error?: string;
  containerStyle?: ViewStyle;
  prefix?: JSX.Element | null;
  suffix?: JSX.Element | null;
  secureTextEntry?: boolean;
  inputColorWhenDisabled?: string;
  inputStyle?: TextStyle;
  hintText?: string;
  label?: string;
  isPlaceholderDotsHidden?: boolean;
  isTextAreaInput?: boolean;
}
