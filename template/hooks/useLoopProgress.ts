import { useEffect } from "react";
import {
  cancelAnimation,
  Easing,
  EasingFunction,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface LoopOptions {
  // Pass `easing` as a module-level constant: a new function each render
  // would restart the loop.
  /** One run from 0 to 1, in ms. */
  duration: number;
  /** Rest at 0 between runs, in ms. */
  pauseMs?: number;
  /** Go 0 → 1 → 0 (breathing) instead of jumping back to 0. */
  isReversing?: boolean;
  isEnabled?: boolean;
  easing?: EasingFunction;
}

/**
 * A 0 → 1 value that loops forever while enabled. Stays at 0 when the device
 * asks for reduced motion, so decorative loops stop but presses still work.
 */
export default function useLoopProgress({
  duration,
  pauseMs = 0,
  isReversing = false,
  isEnabled = true,
  easing = Easing.linear,
}: LoopOptions) {
  const progress = useSharedValue(0);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isEnabled || isReducedMotion) {
      progress.set(0);
      return;
    }
    const run = withTiming(1, { duration, easing });
    const cycle =
      pauseMs > 0
        ? withSequence(run, withDelay(pauseMs, withTiming(0, { duration: 0 })))
        : run;
    progress.set(withRepeat(cycle, -1, isReversing));
    return () => cancelAnimation(progress);
  }, [
    duration,
    easing,
    isEnabled,
    isReducedMotion,
    isReversing,
    pauseMs,
    progress,
  ]);

  return progress;
}
