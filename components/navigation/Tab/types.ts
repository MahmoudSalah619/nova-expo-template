import { ReactNode } from "react";

export interface NavigationTabProps {
  focused: boolean;
  title: string;
  tabWidth: number;
  color?: string;
  size?: number;
  iconComponent: ReactNode;
}
