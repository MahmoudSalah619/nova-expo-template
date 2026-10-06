import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

/** Borderless header: the page background runs straight through it. */
export default StyleSheet.create({
  headerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.x4,
    paddingVertical: Spacing.x2,
  },
  iconButton: {
    width: Spacing.x11,
    height: Spacing.x11,
    borderRadius: Radius.pill,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.primary,
  },
  center: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: Spacing.x2,
  },
  NotiNum: {
    position: "absolute",
    top: 0,
    end: 0,
    zIndex: 1,
  },
  displayNone: {
    display: "none",
  },
  hiddenStyle: { opacity: 0, position: "relative" },
});
