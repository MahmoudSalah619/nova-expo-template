import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  line: {
    backgroundColor: COLORS[theme].border.primary,
    height: 1,
    width: "100%",
  },
});

export default styles;
