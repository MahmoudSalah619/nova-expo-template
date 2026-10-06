import { Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PressableScaleProps } from "./types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const TIMING = { duration: 120 };

/**
 * Pressable that scales down slightly while held — use for cards and rows.
 * @example
 * <PressableScale style={styles.card} onPress={open}>...</PressableScale>
 */
export default function PressableScale({
  children,
  style,
  pressedScale = 0.97,
  hasHaptics = true,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={[style, animatedStyle]}
      onPressIn={(event) => {
        scale.value = withTiming(pressedScale, TIMING);
        if (hasHaptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.value = withTiming(1, TIMING);
        onPressOut?.(event);
      }}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
