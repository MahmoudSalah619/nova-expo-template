import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  prefixSpacing: {
    marginEnd: 8,
  },
  smallSpaceEnd: { marginEnd: 4 },
  suffixSpacing: {
    marginStart: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 28,
    textAlign: "center",
    ...GLOBAL_STYLES.font700,
  },
   filled: {
    backgroundColor: COLORS[theme].primary,
  },
  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  underlined: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
  },
});

export default styles;
