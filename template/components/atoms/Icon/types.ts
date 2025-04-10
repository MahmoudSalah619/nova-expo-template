import { iconsList } from "./list";

export interface IconProps {
  name: keyof typeof iconsList;
  size: number;
  color: string;
  strokeWidth: number;
}
