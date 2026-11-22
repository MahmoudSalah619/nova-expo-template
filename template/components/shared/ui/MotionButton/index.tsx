import { ComponentType } from "react";

import Radius from "@/constants/Radius";
import BorderBeamEffect from "./effects/BorderBeamEffect";
import GlowEffect from "./effects/GlowEffect";
import PushableEffect from "./effects/PushableEffect";
import ScaleEffect from "./effects/ScaleEffect";
import ShineEffect from "./effects/ShineEffect";
import { usePressFeedback } from "./hooks";
import { EffectProps, MotionButtonEffect, MotionButtonProps } from "./types";

/**
 * Effect name → layer component. TypeScript requires an entry for every
 * effect, so a new effect can't be added without its layers.
 */
const EFFECTS: Record<MotionButtonEffect, ComponentType<EffectProps>> = {
  pushable: PushableEffect,
  shine: ShineEffect,
  glow: GlowEffect,
  borderBeam: BorderBeamEffect,
  scale: ScaleEffect,
};

/**
 * Wraps any button and adds animated layers around it. The wrapped button is
 * unchanged and keeps its own onPress, styles and disabled state.
 * Decorative loops stop under reduced motion; press feedback stays.
 *
 * @example
 * <MotionButton effect="pushable">
 *   <Button title="CREATE_ACCOUNT" onPress={onCreate} />
 * </MotionButton>
 * <MotionButton effect="shine"><Button title="START" onPress={start} /></MotionButton>
 * <MotionButton effect="borderBeam"><Button title="UPGRADE" variant="outlined" onPress={upgrade} /></MotionButton>
 */
export default function MotionButton({
  children,
  effect = "pushable",
  color,
  radius = Radius.md,
  hasHaptics = true,
  isDisabled = false,
  style,
}: MotionButtonProps) {
  const { pressed, touchHandlers } = usePressFeedback({
    hasHaptics,
    isDisabled,
  });
  const Effect = EFFECTS[effect];

  return (
    <Effect
      pressed={pressed}
      touchHandlers={touchHandlers}
      color={color}
      radius={radius}
      isDisabled={isDisabled}
      style={style}
    >
      {children}
    </Effect>
  );
}
