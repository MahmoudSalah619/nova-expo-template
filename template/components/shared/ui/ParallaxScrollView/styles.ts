import { StyleSheet } from "react-native";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: Spacing.x6,
    gap: Spacing.x4,
    overflow: "hidden",
    borderTopLeftRadius: Radius.xxl,
    borderTopRightRadius: Radius.xxl,
    marginTop: -Radius.xxl,
  },
});
