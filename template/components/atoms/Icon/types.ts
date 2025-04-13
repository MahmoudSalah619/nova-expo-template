import { iconsList } from "./list";

export interface IconComponentProps {
  name: keyof typeof iconsList;
  size: number;
  color: string;
  strokeWidth: number;
  direction?: "inherit" | "ltr" | "rtl";
}

export type IconProps = Partial<IconComponentProps>;
