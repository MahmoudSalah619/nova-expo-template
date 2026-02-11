import type { AnimationConfig, CharacterAnimationParams } from "./types";

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  characterDelay: 40,
  characterEnterDuration: 600,
  characterExitDuration: 400,
  layoutTransitionDuration: 400,
  maxBlurIntensity: 12,
  spring: {
    damping: 15,
    stiffness: 120,
    mass: 0.8,
  },
};

export const DEFAULT_ENTER_FROM: CharacterAnimationParams = {
  opacity: 0,
  translateY: 20,
  scale: 0.8,
  rotate: 0,
};

export const DEFAULT_ENTER_TO: CharacterAnimationParams = {
  opacity: 1,
  translateY: 0,
  scale: 1,
  rotate: 0,
};

export const DEFAULT_EXIT_FROM: CharacterAnimationParams = {
  opacity: 1,
  translateY: 0,
  scale: 1,
  rotate: 0,
};

export const DEFAULT_EXIT_TO: CharacterAnimationParams = {
  opacity: 0,
  translateY: -10,
  scale: 0.9,
  rotate: 0,
};
