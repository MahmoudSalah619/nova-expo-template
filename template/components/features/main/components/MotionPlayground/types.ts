import { MotionPreset } from "@/components/shared/ui";

export interface MotionPlaygroundProps {
  preset: MotionPreset;
  duration: number;
  delay: number;
  /** Changes whenever the preview should replay. */
  replayKey: number;
  onPresetChange: (preset: MotionPreset) => void;
  onDurationChange: (duration: number) => void;
  onDelayChange: (delay: number) => void;
  onReplay: () => void;
}
