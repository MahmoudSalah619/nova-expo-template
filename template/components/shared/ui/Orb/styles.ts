import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import Radius from "@/constants/Radius";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  orb: {
    position: "absolute",
    borderRadius: Radius.pill,
    backgroundColor: COLORS[theme].text.onAction,
  },
});

export default styles;
