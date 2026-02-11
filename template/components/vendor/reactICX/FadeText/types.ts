import type { ViewStyle, TextStyle, StyleProp } from "react-native";
import type { BlurTint } from "expo-blur";
import { CustomTextProps } from "@/components/atoms/Text/Base/types";

export interface FadeTextProps extends CustomTextProps {
  inputs: string[];
  wordDelay?: number;
  duration?: number;
  blurIntensity?: [number, number, number];
  blurTint?: BlurTint;
  scaleRange?: [number, number];
  translateYRange?: [number, number];
  opacityRange?: [number, number, number];
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}

export interface AnimatedWordProps extends CustomTextProps {
  word: string;
  index?: number;
  delay: number;
  duration: number;
  blurIntensity: [number, number, number];
  blurTint: BlurTint;
  scaleRange: [number, number];
  translateYRange: [number, number];
  opacityRange: [number, number, number];
  style?: StyleProp<TextStyle>;
}
