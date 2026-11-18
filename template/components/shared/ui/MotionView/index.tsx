import Animated from "react-native-reanimated";

import { MOTION_DEFAULTS, MOTION_PRESETS } from "./presets";
import { MotionViewProps } from "./types";

/**
 * Wrapper that animates its children in and out, like `Animated.View` with
 * ready-made animations. Runs on the UI thread (Reanimated layout animations)
 * and follows the device's "reduce motion" setting.
 *
 * @example
 * <MotionView>...</MotionView>                           // fade up on mount
 * <MotionView preset="zoom" delay={150}>...</MotionView> // named preset + delay
 * {items.map((item, i) => (
 *   <MotionView key={item.id} index={i}>...</MotionView> // staggered list
 * ))}
 * <MotionView entering={FadeIn.springify()}>...</MotionView> // fully custom
 */
export default function MotionView({
  children,
  preset = "fadeUp",
  duration = MOTION_DEFAULTS.duration,
  delay = 0,
  index = 0,
  hasExit = true,
  entering,
  exiting,
  ...viewProps
}: MotionViewProps) {
  const config = MOTION_PRESETS[preset];
  const enterDelay = delay + index * MOTION_DEFAULTS.staggerStep;

  const enteringAnimation = entering ?? config.entering(duration, enterDelay);
  const exitingAnimation = hasExit
    ? (exiting ?? config.exiting(duration, 0))
    : undefined;

  return (
    <Animated.View
      entering={enteringAnimation}
      exiting={exitingAnimation}
      {...viewProps}
    >
      {children}
    </Animated.View>
  );
}
