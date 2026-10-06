import { StyleSheet } from "react-native";
import METRICS from "@/constants/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: METRICS.screenWidth,
  },
  paddingHorizontal0: {
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default styles;
