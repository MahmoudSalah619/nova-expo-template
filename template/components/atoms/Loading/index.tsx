import { ActivityIndicator, StyleSheet, View } from "react-native";

import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { COLORS } from "@/constants/Colors";

const styles = StyleSheet.create({
  centering: { justifyContent: "center" },
});

export default function Loading() {
  return (
    <View style={[GLOBAL_STYLES.row, styles.centering, GLOBAL_STYLES.fullSize]}>
      <ActivityIndicator size="small" color={COLORS.light.primary} />
    </View>
  );
}
