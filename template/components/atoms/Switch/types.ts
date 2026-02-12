import type { AnimatedSwitchProps } from "@/components/vendor/reactICX/Switch/AnimatedSwitch.types";

export interface SwitchProps extends Partial<AnimatedSwitchProps> {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  labelPosition?: "left" | "right";
}
