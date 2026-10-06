import { PressableProps, StyleProp, ViewStyle } from "react-native";

export interface PressableScaleProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>;
  /** Scale while pressed. */
  pressedScale?: number;
  /** Trigger light haptic feedback on press. */
  hasHaptics?: boolean;
}
