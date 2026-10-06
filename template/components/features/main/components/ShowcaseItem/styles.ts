import { StyleSheet } from "react-native";
import Spacing from "@/constants/Spacing";

const styles = StyleSheet.create({
  item: {
    gap: Spacing.x3,
  },
  label: {
    letterSpacing: 1.2,
  },
  column: {
    gap: Spacing.x3,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: Spacing.x2,
  },
});

export default styles;
