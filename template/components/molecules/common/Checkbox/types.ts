import type { SharedValue } from "react-native-reanimated";
import type { PathProps } from "react-native-svg";
import type { ViewStyle } from "react-native";

export interface ICheckbox {
  checked?: boolean;
  checkmarkColor?: string;
  stroke?: number;
  size?: number;
  showBorder?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

export interface IStrokePath extends PathProps {
  animValue: SharedValue<number>;
}
