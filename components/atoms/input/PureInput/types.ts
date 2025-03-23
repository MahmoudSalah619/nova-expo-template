import { TextInputProps, TextStyle, ViewStyle } from "react-native";

export interface InputFieldProps extends Omit<TextInputProps, "onChange"> {
  error?: string;
  containerStyle?: ViewStyle;
  prefix?: JSX.Element | null;
  suffix?: JSX.Element | null;
  onChange?: (text: string) => void;
  isSearch?: boolean;
  secureTextEntry?: boolean;
  inputColorWhenDisabled?: string;
  inputStyle?: TextStyle;
  hintText?: string;
  label?: string;
  isPlaceholderDotsHidden?: boolean;
  isTextAreaInput?: boolean;
}
