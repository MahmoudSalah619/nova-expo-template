import { StyleProp, ViewStyle } from "react-native";

export interface OrbProps {
  size: number;
  /** Position + color overrides (top/end/etc). */
  style?: StyleProp<ViewStyle>;
  opacity?: number;
}
