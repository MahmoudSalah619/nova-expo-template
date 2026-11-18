import {
  EntryOrExitLayoutType,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
  Keyframe,
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

/** Builds an animation for the given timing (ms). */
type AnimationFactory = (
  duration: number,
  delay: number,
) => EntryOrExitLayoutType;

interface MotionPresetConfig {
  entering: AnimationFactory;
  exiting: AnimationFactory;
}

export type MotionPreset =
  "fade" | "fadeUp" | "fadeDown" | "slideLeft" | "slideRight" | "zoom" | "pop";

export const MOTION_DEFAULTS = {
  duration: 300,
  /** Delay added per `index` step, for staggered lists. */
  staggerStep: 60,
} as const;

/**
 * Custom keyframe animation: scales past full size, then settles. Use this as
 * the pattern for design-specific animations (Keyframe works like CSS @keyframes).
 */
const popIn: AnimationFactory = (duration, delay) =>
  new Keyframe({
    0: { opacity: 0, transform: [{ scale: 0.85 }] },
    60: { opacity: 1, transform: [{ scale: 1.05 }] },
    100: { opacity: 1, transform: [{ scale: 1 }] },
  })
    .duration(duration)
    .delay(delay);

/**
 * Every named animation `<MotionView preset="...">` supports. To add one, add its
 * name to `MotionPreset` and its enter/exit animations here.
 */
export const MOTION_PRESETS: Record<MotionPreset, MotionPresetConfig> = {
  /** Fades in place. Subtle: text, images, empty states. */
  fade: {
    entering: (d, delay) => FadeIn.duration(d).delay(delay),
    exiting: (d, delay) => FadeOut.duration(d).delay(delay),
  },
  /** Rises from slightly below. The standard entrance for cards and lists. */
  fadeUp: {
    entering: (d, delay) => FadeInDown.duration(d).delay(delay),
    exiting: (d, delay) => FadeOutDown.duration(d).delay(delay),
  },
  /** Drops from slightly above. Banners, alerts, toasts. */
  fadeDown: {
    entering: (d, delay) => FadeInUp.duration(d).delay(delay),
    exiting: (d, delay) => FadeOutUp.duration(d).delay(delay),
  },
  /** Slides in from the left edge. Going back a step. */
  slideLeft: {
    entering: (d, delay) => SlideInLeft.duration(d).delay(delay),
    exiting: (d, delay) => SlideOutLeft.duration(d).delay(delay),
  },
  /** Slides in from the right edge. Going forward a step. */
  slideRight: {
    entering: (d, delay) => SlideInRight.duration(d).delay(delay),
    exiting: (d, delay) => SlideOutRight.duration(d).delay(delay),
  },
  /** Grows from small. Modals, popups, icons, badges. */
  zoom: {
    entering: (d, delay) => ZoomIn.duration(d).delay(delay),
    exiting: (d, delay) => ZoomOut.duration(d).delay(delay),
  },
  /** Overshoots then settles. Success, likes, rewards. */
  pop: {
    entering: popIn,
    exiting: (d, delay) => ZoomOut.duration(d).delay(delay),
  },
};
