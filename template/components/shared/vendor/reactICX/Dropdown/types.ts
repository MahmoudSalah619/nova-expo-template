import type { ReactNode } from "react";
import type { ViewStyle, StyleProp } from "react-native";
import type { SharedValue } from "react-native-reanimated";

export interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DropdownContextValue {
  visible: boolean;
  open: () => void;
  close: () => void;
  triggerLayout: TriggerLayout | null;
  setTriggerLayout: (layout: TriggerLayout | null) => void;
  flipAnim: SharedValue<number>;
  activeItemIndex: SharedValue<number>;
}

export interface TriggerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface ContentProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  position?: "auto" | "top" | "bottom" | "left" | "right";
}

export interface ItemProps {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  index?: number;
}

export interface Styles {
  overlay: ViewStyle;
  content: ViewStyle;
  item: ViewStyle;
}
