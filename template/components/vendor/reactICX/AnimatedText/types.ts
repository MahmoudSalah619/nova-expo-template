import type { TextStyle, ViewStyle } from "react-native";
import type { WithSpringConfig } from "react-native-reanimated";

export interface AnimationConfig {
  characterDelay: number;
  characterEnterDuration: number;
  characterExitDuration: number;
  layoutTransitionDuration: number;
  maxBlurIntensity?: number;
  spring: WithSpringConfig;
}

export interface CharacterAnimationParams {
  opacity: number;
  translateY: number;
  scale: number;
  rotate: number;
}

export interface CharacterProps {
  char: string;
  style?: TextStyle;
  index: number;
  totalChars?: number;
  animationConfig: AnimationConfig;
  enterFrom: CharacterAnimationParams;
  enterTo: CharacterAnimationParams;
  exitFrom: CharacterAnimationParams;
  exitTo: CharacterAnimationParams;
}

export interface StaggeredTextProps {
  text: string;
  style?: TextStyle;
  animationConfig?: Partial<AnimationConfig>;
  enterFrom?: Partial<CharacterAnimationParams>;
  enterTo?: Partial<CharacterAnimationParams>;
  exitFrom?: Partial<CharacterAnimationParams>;
  exitTo?: Partial<CharacterAnimationParams>;
}
