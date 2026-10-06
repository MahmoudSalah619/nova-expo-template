import { View, ViewStyle } from "react-native";
import styles from "./styles";

type ShadowWrapperProps = {
  borderRadius: number;
  children: React.ReactNode;
  outerContainerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle;
};

export default function ShadowWrapper({
  borderRadius,
  children,
  outerContainerStyle,
  innerContainerStyle,
}: ShadowWrapperProps) {
  return (
    <View style={[styles.outer, { borderRadius }, outerContainerStyle]}>
      <View style={[styles.inner, { borderRadius }, innerContainerStyle]}>
        {children}
      </View>
    </View>
  );
}
