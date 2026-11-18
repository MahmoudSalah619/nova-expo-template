import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Spacing from "@/constants/Spacing";
import { theme } from "@/utils/getTheme";

const AVATAR_SIZE = 48;

const styles = StyleSheet.create({
  header: {
    gap: Spacing.x2,
    marginBottom: Spacing.x2,
  },
  sections: {
    gap: Spacing.x4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.x3,
  },
  rowText: {
    flex: 1,
    gap: Spacing.x2,
  },
  card: {
    gap: Spacing.x3,
  },
  /** Same size as the avatar skeleton, so the swap doesn't shift the layout. */
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS[theme].Surface.actionSoft,
  },
});

export default styles;
