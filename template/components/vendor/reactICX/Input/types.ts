import type { TextInputProps, ViewStyle, TextStyle, StyleProp } from "react-native";

export interface ICharacter {
  char: string;
  index: number;
  enterDuration: number;
  exitDuration: number;
  delayIncrement: number;
  style?: TextStyle;
}

export interface IAnimatedInput extends TextInputProps {
  placeholders: string[];
  animationInterval?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  characterEnterDuration?: number;
  characterExitDuration?: number;
  characterDelayIncrement?: number;
  blurAnimationDuration?: number;
  blurIntensityRange?: [number, number, number];
  blurProgressRange?: [number, number, number];
}
