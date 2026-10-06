import { ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

export interface AccordionItemProps {
  isExpanded: SharedValue<boolean>;
  children: React.ReactNode;
  viewKey: string;
  style?: ViewStyle;
  duration?: number;
}
