import { StyleSheet } from "react-native";
import Spacing from "@/constants/Spacing";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loadingBox: {
    height: Spacing.x14,
  },
});

export default styles;
