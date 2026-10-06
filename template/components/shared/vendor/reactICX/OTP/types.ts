import type { RefObject } from "react";
import type { TextInput, TextInputProps, ViewStyle, TextStyle, StyleProp } from "react-native";

export type AnimationVariant = "fadeSlideDown" | "fadeSlideUp" | "scale" | "bounce";

export interface IOtpInput extends Omit<TextInputProps, "value"> {
  otpCount?: number;
  containerStyle?: StyleProp<ViewStyle>;
  otpInputStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  focusedColor?: string;
  editable?: boolean;
  autoFocus?: boolean;
  enteringAnimated?: any;
  exitingAnimated?: any;
  onInputFinished?: (otp: string) => void;
  onInputChange?: (otp: string) => void;
  error?: boolean;
  errorMessage?: string;
  inputBorderRadius?: number;
  inputWidth?: number;
  inputHeight?: number;
  animationVariant?: AnimationVariant;
  focusedBackgroundColor?: string;
  unfocusedBackgroundColor?: string;
  focusedBorderColor?: string;
  unfocusedBorderColor?: string;
  errorBackgroundColor?: string;
  errorBorderColor?: string;
}

export interface IOtpContext extends IOtpInput {
  inputRefs: RefObject<TextInput | null>[];
  otpValue: string[];
  onPress: () => void;
  onFocusNext: <V extends string, I extends number>(value: V, index: I) => void;
  onFocusPrevious: <K extends string, I extends number>(key: K, index: I) => void;
  setFocus: (index: number) => void;
  setOtpValue: (value: string[]) => void;
  focus: number;
}

export interface IOtpItem {
  index: number;
}
