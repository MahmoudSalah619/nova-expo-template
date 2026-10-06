import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { getShadow } from "@/constants/Shadows";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

/** Inner padding of the bar and gap between tabs — used to position the sliding pill. */
export const TAB_BAR_PADDING = Spacing.x2;
export const TAB_GAP = Spacing.x1;

const styles = StyleSheet.create({
  tabbarContainer: {
    position: "absolute",
    left: Spacing.x4,
    right: Spacing.x4,
  },
  tabbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: TAB_BAR_PADDING,
    gap: TAB_GAP,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: COLORS[theme].border.subtle,
    backgroundColor: COLORS[theme].Surface.elevated,
    ...getShadow("lg", theme),
  },
  indicator: {
    position: "absolute",
    top: TAB_BAR_PADDING,
    bottom: TAB_BAR_PADDING,
    left: 0,
    borderRadius: Radius.md,
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingVertical: Spacing.x2,
    borderRadius: Radius.md,
  },
});

export default styles;
