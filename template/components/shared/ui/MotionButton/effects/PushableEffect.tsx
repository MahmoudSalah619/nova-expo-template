import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { MOTION_BUTTON_DEFAULTS } from "../constants";
import { EffectProps } from "../types";

const { depth, edgeColor } = MOTION_BUTTON_DEFAULTS.pushable;

/**
 * Two layers: a darker edge underneath and the button (face) raised above it.
 * Pressing sinks the face onto the edge, like a physical key.
 */
export default function PushableEffect({
  children,
  pressed,
  touchHandlers,
  color = edgeColor,
  radius,
  style,
}: EffectProps) {
  const faceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pressed.get() * depth }],
  }));

  return (
    <View style={[styles.container, style]} {...touchHandlers}>
      <View
        pointerEvents="none"
        style={[styles.edge, { borderRadius: radius, backgroundColor: color }]}
      />
      <Animated.View style={faceStyle}>{children}</Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Room under the face for the edge to show. */
  container: {
    paddingBottom: depth,
  },
  edge: {
    position: "absolute",
    top: depth,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
