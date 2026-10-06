import type { ComponentProps } from "react";
import type { Feather } from "@expo/vector-icons";

export interface DialogProps {
  title?: string;
  description?: string;
  icon?: ComponentProps<typeof Feather>["name"];
}
