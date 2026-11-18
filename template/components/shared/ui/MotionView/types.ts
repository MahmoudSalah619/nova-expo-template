import { ReactNode } from "react";
import { ViewProps } from "react-native";
import { EntryOrExitLayoutType } from "react-native-reanimated";

import { MotionPreset } from "./presets";

export interface MotionViewProps extends ViewProps {
  children: ReactNode;
  /** Named animation from presets.ts. Defaults to "fadeUp". */
  preset?: MotionPreset;
  /** Animation length in ms. Defaults to 300. */
  duration?: number;
  /** Wait before entering, in ms. */
  delay?: number;
  /** Position in a list: adds `index * 60` ms so items enter one after another. */
  index?: number;
  /** Animate out when removed. Defaults to true. */
  hasExit?: boolean;
  /** Fully custom enter animation (any Reanimated builder or Keyframe). Overrides `preset`. */
  entering?: EntryOrExitLayoutType;
  /** Fully custom exit animation. Overrides `preset`. */
  exiting?: EntryOrExitLayoutType;
}
