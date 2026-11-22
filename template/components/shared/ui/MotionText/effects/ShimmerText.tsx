import { LinearGradient } from "expo-linear-gradient";
import { I18nManager, StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { MOTION_TEXT_DEFAULTS } from "../constants";
import MaskedSweep from "../MaskedSweep";
import { TextStyleProps } from "../types";

const DEFAULTS = MOTION_TEXT_DEFAULTS.shimmer;
const HORIZONTAL = { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };
const BAND_COLORS = [
  DEFAULTS.baseColor,
  DEFAULTS.highlightColor,
  DEFAULTS.baseColor,
] as const;

interface ShimmerLayerProps {
  width: number;
  progress: SharedValue<number>;
}

function ShimmerLayer({ width, progress }: ShimmerLayerProps) {
  const bandWidth = width * DEFAULTS.bandRatio;

  // Band travels in reading direction: left → right for LTR, right → left
  // for RTL, starting and ending fully outside the text.
  const isRTL = I18nManager.isRTL;
  const travel = width + bandWidth;
  const bandStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: isRTL
          ? width - progress.get() * travel
          : -bandWidth + progress.get() * travel,
      },
    ],
  }));

  return (
    <View style={[StyleSheet.absoluteFill, styles.base]}>
      <Animated.View style={[styles.band, { width: bandWidth }, bandStyle]}>
        <LinearGradient
          colors={BAND_COLORS}
          {...HORIZONTAL}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

interface ShimmerTextProps {
  text: string;
  textProps: TextStyleProps;
  duration?: number;
}

/** A bright band passes over muted text, like a loading shine. */
export default function ShimmerText({
  text,
  textProps,
  duration = DEFAULTS.duration,
}: ShimmerTextProps) {
  return (
    <MaskedSweep
      text={text}
      textProps={textProps}
      duration={duration}
      renderLayer={(width, progress) => (
        <ShimmerLayer width={width} progress={progress} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: DEFAULTS.baseColor,
  },
  band: {
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});
