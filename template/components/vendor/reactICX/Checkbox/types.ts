import type { SharedValue } from "react-native-reanimated";
import type { PathProps } from "react-native-svg";

export interface ICheckbox {
  checked?: boolean;
  checkmarkColor?: string;
  stroke?: number;
  size?: number;
}

export interface IStrokePath extends PathProps {
  animValue: SharedValue<number>;
}
