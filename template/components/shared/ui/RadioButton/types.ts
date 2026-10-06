import { GestureResponderEvent, ViewStyle } from "react-native";

export interface RadioButtonProps {
  selected: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
}
