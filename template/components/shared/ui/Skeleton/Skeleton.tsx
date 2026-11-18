import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { I18nManager, LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import useLoopProgress from "@/hooks/useLoopProgress";
import { SKELETON_DEFAULTS } from "./constants";
import { SkeletonProps } from "./types";

const { baseColor, highlightColor, shimmer, pulse } = SKELETON_DEFAULTS;
const HORIZONTAL = { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
const BAND_COLORS = [baseColor, highlightColor, baseColor] as const;
// Module-level so the loops aren't restarted by a new function each render.
const SHIMMER_EASING = Easing.inOut(Easing.ease);
const PULSE_EASING = Easing.inOut(Easing.sin);

/**
 * Placeholder block shown while content loads. Compose several to sketch the
 * layout that's coming (avatar + lines, image + text...). Loops stop under
 * reduced motion; the static block still shows.
 *
 * @example
 * <Skeleton width={48} height={48} isCircle />
 * <Skeleton width="60%" height={14} />
 * <Skeleton height={160} radius={16} animation="pulse" />
 */
export default function Skeleton({
  width = "100%",
  height = SKELETON_DEFAULTS.text.lineHeight,
  radius = SKELETON_DEFAULTS.radius,
  isCircle = false,
  animation = "shimmer",
  style,
}: SkeletonProps) {
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const isShimmer = animation === "shimmer";

  const progress = useLoopProgress({
    duration: isShimmer ? shimmer.duration : pulse.duration,
    pauseMs: isShimmer ? shimmer.pause : 0,
    isReversing: !isShimmer,
    isEnabled: !isShimmer || measuredWidth > 0,
    easing: isShimmer ? SHIMMER_EASING : PULSE_EASING,
  });

  const bandWidth = measuredWidth * shimmer.bandRatio;
  const travel = measuredWidth + bandWidth;
  const isRTL = I18nManager.isRTL;

  const bandStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: isRTL
          ? measuredWidth - progress.get() * travel
          : -bandWidth + progress.get() * travel,
      },
    ],
  }));
  const pulseStyle = useAnimatedStyle(() => ({
    opacity: isShimmer
      ? 1
      : interpolate(progress.get(), [0, 1], [1, pulse.minOpacity]),
  }));

  const handleLayout = (event: LayoutChangeEvent) =>
    setMeasuredWidth(event.nativeEvent.layout.width);

  const shapeStyle = isCircle
    ? { width: height, height, borderRadius: 9999 }
    : { width, height, borderRadius: radius };

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onLayout={isShimmer ? handleLayout : undefined}
      style={[styles.block, shapeStyle, pulseStyle, style]}
    >
      {isShimmer && measuredWidth > 0 && (
        <Animated.View style={[styles.band, { width: bandWidth }, bandStyle]}>
          <LinearGradient
            colors={BAND_COLORS}
            {...HORIZONTAL}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    overflow: "hidden",
    backgroundColor: baseColor,
    // Band math measures from the left; RTL flips the sweep instead.
    direction: "ltr",
  },
  band: {
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});
