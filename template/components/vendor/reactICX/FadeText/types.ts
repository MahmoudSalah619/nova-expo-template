import type { ViewStyle, TextStyle, StyleProp } from "react-native";
import type { BlurTint } from "expo-blur";

export interface FadeTextProps {
  inputs: string[];
  wordDelay?: number;
  duration?: number;
  blurIntensity?: [number, number, number];
  blurTint?: BlurTint;
  scaleRange?: [number, number];
  translateYRange?: [number, number];
  opacityRange?: [number, number, number];
  fontSize?: number;
  fontWeight?: TextStyle["fontWeight"];
  color?: string;
  textAlign?: TextStyle["textAlign"];
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
}

export interface AnimatedWordProps {
  word: string;
  index?: number;
  delay: number;
  duration: number;
  blurIntensity: [number, number, number];
  blurTint: BlurTint;
  scaleRange: [number, number];
  translateYRange: [number, number];
  opacityRange: [number, number, number];
  fontSize: number;
  fontWeight: TextStyle["fontWeight"];
  color: string;
  textAlign: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
}
