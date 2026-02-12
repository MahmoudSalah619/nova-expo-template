import type { ICheckbox } from "@/components/vendor/reactICX/Checkbox/types";

export interface CheckboxProps extends ICheckbox {
  label?: string;
  labelPosition?: "left" | "right";
}
