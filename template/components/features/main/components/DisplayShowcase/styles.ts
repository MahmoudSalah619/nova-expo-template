import { StyleSheet } from "react-native";
import Spacing from "@/constants/Spacing";

const styles = StyleSheet.create({
  iconTile: {
    alignItems: "center",
    gap: Spacing.x1,
    width: Spacing.x14 + Spacing.x4,
  },
  image: {
    width: Spacing.x14,
    height: Spacing.x14,
  },
  shadowInner: {
    padding: Spacing.x4,
  },
});

export default styles;
