import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { I18nManager, LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { MOTION_BUTTON_DEFAULTS } from "../constants";
import useLoopProgress from "@/hooks/useLoopProgress";
import { usePressScaleStyle } from "../hooks";
import { EffectProps } from "../types";
import { getBeamGeometry, withAlpha } from "../utils";

const BEAM = MOTION_BUTTON_DEFAULTS.borderBeam;
const VERTICAL = { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } };

/**
 * A light beam travels around the button's border. Layers: a thin border
 * track, a bright bar spinning behind the button, and the button inset on top
 * (so only the bar's tip shows, as a beam running along the border).
 */
export default function BorderBeamEffect({
  children,
  pressed,
  touchHandlers,
  color = BEAM.color,
  radius,
  isDisabled,
  style,
}: EffectProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const progress = useLoopProgress({
    duration: BEAM.duration,
    isEnabled: !isDisabled && size.width > 0,
  });
  const scaleStyle = usePressScaleStyle(pressed);

  const beam = getBeamGeometry(size.width, size.height);
  const turn = I18nManager.isRTL ? -360 : 360;
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.get() * turn}deg` }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
    <Animated.View style={[style, scaleStyle]} {...touchHandlers}>
      <View
        onLayout={handleLayout}
        style={[styles.track, { borderRadius: radius + BEAM.width }]}
      >
        {size.width > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.spinner,
              {
                width: beam.size,
                height: beam.size,
                left: beam.left,
                top: beam.top,
              },
              spinStyle,
            ]}
          >
            {/* Bar from the center to one side; only its outer end shows. */}
            <View
              style={[
                styles.bar,
                {
                  left: beam.size / 2,
                  top: (beam.size - beam.barThickness) / 2,
                  width: beam.size / 2,
                  height: beam.barThickness,
                },
              ]}
            >
              <LinearGradient
                colors={[withAlpha(color, 0), color, withAlpha(color, 0)]}
                {...VERTICAL}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </Animated.View>
        )}
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  track: {
    padding: BEAM.width,
    overflow: "hidden",
    backgroundColor: BEAM.trackColor,
    // Spinner positions are measured from the left edge in any language.
    direction: "ltr",
  },
  spinner: {
    position: "absolute",
  },
  bar: {
    position: "absolute",
  },
});
