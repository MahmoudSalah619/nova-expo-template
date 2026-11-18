import { useEffect, useState } from "react";
import { useReducedMotion } from "react-native-reanimated";

import Text from "@/components/shared/ui/Text/Base";
import { MOTION_TEXT_DEFAULTS } from "../constants";
import { TextStyleProps } from "../types";
import { easeOutCubic, formatCount } from "../utils";

interface CountTextProps {
  textProps: TextStyleProps;
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  format?: (value: number) => string;
}

/** Counts from `from` to `to`, fast at first and easing into the final value. */
export default function CountText({
  textProps,
  to,
  from = 0,
  duration = MOTION_TEXT_DEFAULTS.count.duration,
  delay = 0,
  format = formatCount,
}: CountTextProps) {
  const isReducedMotion = useReducedMotion();
  const [value, setValue] = useState(isReducedMotion ? to : from);

  useEffect(() => {
    if (isReducedMotion) {
      setValue(to);
      return;
    }
    setValue(from);
    let frame = 0;
    let startTime: number | undefined;
    const tick = (now: number) => {
      startTime ??= now;
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(from + (to - from) * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [delay, duration, from, isReducedMotion, to]);

  return (
    <Text {...textProps} autoTranslate={false} accessibilityLabel={format(to)}>
      {format(value)}
    </Text>
  );
}
