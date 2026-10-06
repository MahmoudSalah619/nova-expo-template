import { TextInputProps, ViewStyle } from "react-native";

export interface PhoneInputProps extends Omit<TextInputProps, "onChange"> {
  error?: string;
  label?: string;
  containerStyle?: ViewStyle;
  onChange: (fullPhoneNumber: string) => void;
  defaultCountry?: string;
  value?: string;
}
