import * as Haptics from "expo-haptics";
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { MOTION_BUTTON_DEFAULTS, PRESS_SPRING } from "./constants";
import { TouchHandlers } from "./types";

/**
 * Tracks press state from raw touch events on the wrapper. These fire even
 * though the wrapped button handles the press, so its onPress is untouched.
 */
export function usePressFeedback({
  hasHaptics,
  isDisabled,
}: {
  hasHaptics: boolean;
  isDisabled: boolean;
}): { pressed: SharedValue<number>; touchHandlers: TouchHandlers } {
  const pressed = useSharedValue(0);

  const onTouchStart = () => {
    if (isDisabled) return;
    pressed.set(withSpring(1, PRESS_SPRING));
    if (hasHaptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  const release = () => pressed.set(withSpring(0, PRESS_SPRING));

  return {
    pressed,
    touchHandlers: {
      onTouchStart,
      onTouchEnd: release,
      onTouchCancel: release,
    },
  };
}

/** Slight shrink while pressed. */
export function usePressScaleStyle(pressed: SharedValue<number>) {
  return useAnimatedStyle(() => ({
    transform: [
      { scale: 1 - pressed.get() * (1 - MOTION_BUTTON_DEFAULTS.pressedScale) },
    ],
  }));
}
