import { StyleSheet } from "react-native";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: Radius.md,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Spacing.x5,
  },
  prefixSpacing: {
    marginEnd: Spacing.x2,
  },
  suffixSpacing: {
    marginStart: Spacing.x2,
  },
});

export default styles;
