import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { I18nManager, LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle } from "react-native-reanimated";

import { MOTION_BUTTON_DEFAULTS } from "../constants";
import useLoopProgress from "@/hooks/useLoopProgress";
import { usePressScaleStyle } from "../hooks";
import { EffectProps } from "../types";
import { withAlpha } from "../utils";

const SHINE = MOTION_BUTTON_DEFAULTS.shine;
const HORIZONTAL = { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
// Module-level so the loop isn't restarted by a new function each render.
const SHINE_EASING = Easing.inOut(Easing.quad);

/**
 * A soft diagonal light streak glides across the button every few seconds.
 * Travels in reading direction (right → left in Arabic).
 */
export default function ShineEffect({
  children,
  pressed,
  touchHandlers,
  color = SHINE.color,
  radius,
  isDisabled,
  style,
}: EffectProps) {
  const [width, setWidth] = useState(0);
  const progress = useLoopProgress({
    duration: SHINE.duration,
    pauseMs: SHINE.pause,
    isEnabled: !isDisabled && width > 0,
    easing: SHINE_EASING,
  });
  const scaleStyle = usePressScaleStyle(pressed);

  const bandWidth = width * SHINE.bandRatio;
  const travel = width + bandWidth;
  const isRTL = I18nManager.isRTL;
  const bandStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: isRTL
          ? width - progress.get() * travel
          : -bandWidth + progress.get() * travel,
      },
      { skewX: "-20deg" },
    ],
  }));

  const handleLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  return (
    <Animated.View
      style={[style, scaleStyle]}
      onLayout={handleLayout}
      {...touchHandlers}
    >
      {children}
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, styles.clip, { borderRadius: radius }]}
      >
        <Animated.View style={[styles.band, { width: bandWidth }, bandStyle]}>
          <LinearGradient
            colors={[
              withAlpha(color, 0),
              withAlpha(color, SHINE.peakOpacity),
              withAlpha(color, 0),
            ]}
            {...HORIZONTAL}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Clipped to the button shape; laid out left-to-right so the streak math
  // holds in Arabic too (direction is flipped in the animation instead).
  clip: {
    overflow: "hidden",
    direction: "ltr",
  },
  band: {
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});
