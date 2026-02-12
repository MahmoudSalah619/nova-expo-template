import { TextStyle, ViewStyle } from "react-native";
import type { IAnimatedInput } from "@/components/vendor/reactICX/Input/types";

export interface InputFieldProps extends Partial<IAnimatedInput> {
  error?: string;
  containerStyle?: ViewStyle;
  prefix?: JSX.Element | null;
  suffix?: JSX.Element | null;
  onChange?: (text: string) => void;
  isSearch?: boolean;
  inputColorWhenDisabled?: string;
  inputStyle?: TextStyle;
  hintText?: string;
  label?: string;
  isPlaceholderDotsHidden?: boolean;
  isTextAreaInput?: boolean;
  placeholder?: string;
}
