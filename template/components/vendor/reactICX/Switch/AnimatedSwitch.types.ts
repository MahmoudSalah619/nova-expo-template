import type { ReactNode } from "react";
import type { ViewStyle, ImageSourcePropType, StyleProp } from "react-native";
import type { WithSpringConfig } from "react-native-reanimated";

export type IconAnimationType = "fade" | "rotate" | "scale" | "bounce";

export interface AnimatedSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  onColor?: string;
  offColor?: string;
  thumbColor?: string;
  thumbSize?: number;
  thumbInset?: number;
  springConfig?: WithSpringConfig;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  thumbOnIcon?: ReactNode;
  thumbOffIcon?: ReactNode;
  trackOnIcon?: ReactNode;
  trackOffIcon?: ReactNode;
  backgroundImage?: ImageSourcePropType;
  backgroundImageStyle?: StyleProp<ViewStyle>;
  animateIcons?: boolean;
  iconAnimationType?: IconAnimationType;
}
