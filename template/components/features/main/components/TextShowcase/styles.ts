import { StyleSheet } from "react-native";
import Spacing from "@/constants/Spacing";

const styles = StyleSheet.create({
  variantRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: Spacing.x3,
  },
  token: {
    width: Spacing.x8,
  },
  sample: {
    flex: 1,
  },
  chip: {
    marginEnd: Spacing.x2,
  },
});

export default styles;
