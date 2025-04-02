import { StyleSheet } from "react-native";
import METRICS from "@/constants/Metrics";

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // paddingHorizontal: METRICS.generalSpacingValue * 1.6,
  },
  headerTitle: {
    lineHeight: 29,
    textAlign: "center",
  },
  headerTitleContainer: {
    gap: 8,
    marginVertical: METRICS.screenHeight * 0.02, // 2% of screen height, equivalent to ~50px on a 1000px screen
  },
});

export default styles;
