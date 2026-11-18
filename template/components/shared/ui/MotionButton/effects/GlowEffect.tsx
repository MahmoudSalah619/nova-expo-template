import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { MOTION_BUTTON_DEFAULTS } from "../constants";
import useLoopProgress from "@/hooks/useLoopProgress";
import { usePressScaleStyle } from "../hooks";
import { EffectProps } from "../types";

const GLOW = MOTION_BUTTON_DEFAULTS.glow;
// Module-level so the loop isn't restarted by a new function each render.
const BREATH_EASING = Easing.inOut(Easing.sin);

/**
 * A colored glow layer behind the button breathes slowly and flares on press.
 * Uses boxShadow (React Native 0.76+), so it works on iOS and Android.
 */
export default function GlowEffect({
  children,
  pressed,
  touchHandlers,
  color = GLOW.color,
  radius,
  isDisabled,
  style,
}: EffectProps) {
  const breath = useLoopProgress({
    duration: GLOW.duration,
    isReversing: true,
    isEnabled: !isDisabled,
    easing: BREATH_EASING,
  });
  const scaleStyle = usePressScaleStyle(pressed);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: Math.min(
      1,
      interpolate(breath.get(), [0, 1], [GLOW.minOpacity, GLOW.maxOpacity]) +
        pressed.get() * 0.4,
    ),
  }));

  return (
    <Animated.View style={[style, scaleStyle]} {...touchHandlers}>
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: radius,
            backgroundColor: color,
            boxShadow: `0 0 ${GLOW.blur}px ${GLOW.spread}px ${color}`,
          },
          glowStyle,
        ]}
      />
      {children}
    </Animated.View>
  );
}
