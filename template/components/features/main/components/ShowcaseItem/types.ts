import { ReactNode } from "react";

export interface ShowcaseItemProps {
  label: string;
  /** Lays children out in a wrapping row instead of a column. */
  isRow?: boolean;
  children: ReactNode;
}
