import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
    // paddingTop: getStatusBarHeight(),
  },
  NotiNum: {
    position: "absolute",
    top: -5,
  },
  displayNone: {
    display: "none",
  },
  hiddenStyle: { opacity: 0, position: "relative" },
  spacing: {
    marginStart: -15,
    padding: 15,
  },
});
