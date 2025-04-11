import { iconsList } from "./list";

export interface IconComponentProps {
  name: keyof typeof iconsList;
  size: number;
  color: string;
  strokeWidth: number;
}

export type IconProps = Partial<IconComponentProps>;
