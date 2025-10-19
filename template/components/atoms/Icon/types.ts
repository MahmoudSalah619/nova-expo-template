import { iconsList } from "./list";

export interface IconComponentProps {
  name: keyof typeof iconsList;
  size: number;
  color: string;
  direction?: "inherit" | "ltr" | "rtl";
  rotateX?: number;
  rotateY?: number;
}

export type IconProps = Partial<IconComponentProps>;
