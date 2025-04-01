import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface ModalWrapperProps {
  isVisible: boolean;
  setVisible: (state: boolean) => void;
  children: ReactNode;
  containerStyle?: ViewStyle;
  cannotDismiss?: boolean;
  height?: number | "auto";
  onDismiss?: () => void;
}
