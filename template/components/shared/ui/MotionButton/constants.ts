import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";

export const PRESS_SPRING = { damping: 18, stiffness: 320, mass: 0.6 } as const;

export const MOTION_BUTTON_DEFAULTS = {
  /** Shrink on press for every effect except pushable. */
  pressedScale: 0.97,
  pushable: {
    /** How far the face sits above its edge, in px. */
    depth: 5,
    edgeColor: COLORS[theme].Surface.actionPressed,
  },
  shine: {
    color: "#FFFFFF",
    duration: 900,
    /** Rest between streaks, in ms. */
    pause: 2200,
    /** Streak width as a share of the button width. */
    bandRatio: 0.35,
    peakOpacity: 0.45,
  },
  glow: {
    color: COLORS[theme].Surface.action,
    /** One breath (in or out), in ms. */
    duration: 1400,
    blur: 18,
    spread: 2,
    minOpacity: 0.35,
    maxOpacity: 0.8,
  },
  borderBeam: {
    color: COLORS[theme].Surface.action,
    trackColor: COLORS[theme].border.subtle,
    /** One lap around the border, in ms. */
    duration: 2600,
    /** Border thickness, in px. */
    width: 2,
  },
} as const;
