import type { MutableRefObject } from "react";
import type { TextInputProps, ViewStyle, TextStyle, StyleProp } from "react-native";
import type { AnimateProps } from "react-native-reanimated";

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
  inputRef: MutableRefObject<any[]>;
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
