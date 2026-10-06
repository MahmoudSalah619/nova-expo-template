import { iconsColorType } from "@/@types/mainTypes";
import { iconsList } from "./list";

export interface IconComponentProps {
  name: keyof typeof iconsList;
  size: number;
  color: iconsColorType;
  direction?: "inherit" | "ltr" | "rtl";
  rotateX?: number;
  rotateY?: number;
}

/** Props received by the raw SVG icon components (resolved hex color). */
export interface IconProps {
  size?: number;
  color?: string;
}
