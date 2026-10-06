import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import GRADIENTS from "@/constants/Gradients";

export type GradientVariant = keyof (typeof GRADIENTS)["light"];

export interface GradientSurfaceProps {
  children?: ReactNode;
  variant?: GradientVariant;
  style?: StyleProp<ViewStyle>;
}
