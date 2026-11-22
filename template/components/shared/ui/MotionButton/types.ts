import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

export type MotionButtonEffect =
  "pushable" | "shine" | "glow" | "borderBeam" | "scale";

export interface MotionButtonProps {
  /** The button to animate (e.g. <Button />). Its own onPress keeps working. */
  children: ReactNode;
  /** Which layer animation to add. Defaults to "pushable". */
  effect?: MotionButtonEffect;
  /**
   * Layer color: pushable edge, shine streak, glow, or beam.
   * Each effect has a sensible brand default.
   */
  color?: string;
  /** Corner radius of the wrapped button, so layers match its shape. */
  radius?: number;
  /** Light haptic on press. Defaults to true. */
  hasHaptics?: boolean;
  /** Mirror the button's disabled state: no press feedback, loops stop. */
  isDisabled?: boolean;
  /** Outer layout style (e.g. flex: 1 in a row). */
  style?: StyleProp<ViewStyle>;
}

/** Touch events from the wrapper; they fire even though the child handles the press. */
export interface TouchHandlers {
  onTouchStart: () => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
}

/** What every effect layer receives. */
export interface EffectProps {
  children: ReactNode;
  /** 0 = released, 1 = pressed (spring-animated). */
  pressed: SharedValue<number>;
  touchHandlers: TouchHandlers;
  color?: string;
  radius: number;
  isDisabled: boolean;
  style?: StyleProp<ViewStyle>;
}
