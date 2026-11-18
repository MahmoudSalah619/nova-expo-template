import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { I18nManager, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import Text from "@/components/shared/ui/Text/Base";
import { MOTION_TEXT_DEFAULTS } from "../constants";
import MaskedSweep from "../MaskedSweep";
import { GradientColors, TextStyleProps } from "../types";
import { toLoopColors } from "../utils";

const DEFAULTS = MOTION_TEXT_DEFAULTS.gradient;
const HORIZONTAL = { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } };

interface GradientLayerProps {
  width: number;
  progress: SharedValue<number>;
  colors: GradientColors;
}

function GradientLayer({ width, progress, colors }: GradientLayerProps) {
  // Colors flow in reading direction: leftward for LTR, rightward for RTL.
  // Either way the 2×-wide track always covers the text.
  const isRTL = I18nManager.isRTL;
  const slideStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: isRTL
          ? -width + progress.get() * width
          : -progress.get() * width,
      },
    ],
  }));

  return (
    <Animated.View style={[styles.track, { width: width * 2 }, slideStyle]}>
      <LinearGradient
        colors={colors}
        {...HORIZONTAL}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
}

interface GradientTextProps {
  text: string;
  textProps: TextStyleProps;
  colors?: GradientColors;
  duration?: number;
  hasGlow?: boolean;
}

/** Colors sweep through the letters in an endless loop; optional glow. */
export default function GradientText({
  text,
  textProps,
  colors = DEFAULTS.colors,
  duration = DEFAULTS.duration,
  hasGlow = false,
}: GradientTextProps) {
  const loopColors = useMemo(() => toLoopColors(colors), [colors]);
  const glowColor = colors[Math.floor(colors.length / 2)];

  const glow = hasGlow ? (
    <Text
      {...textProps}
      autoTranslate={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        textProps.style,
        StyleSheet.absoluteFill,
        {
          color: glowColor,
          textShadowColor: glowColor,
          textShadowRadius: DEFAULTS.glowRadius,
        },
      ]}
    >
      {text}
    </Text>
  ) : undefined;

  return (
    <MaskedSweep
      text={text}
      textProps={textProps}
      duration={duration}
      underlay={glow}
      renderLayer={(width, progress) => (
        <GradientLayer width={width} progress={progress} colors={loopColors} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  track: {
    height: "100%",
  },
});
