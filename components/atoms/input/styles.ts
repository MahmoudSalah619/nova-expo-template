import { I18nManager, StyleSheet } from "react-native";
import { COLORS } from "@/constants/Colors";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { theme } from "@/utils/getTheme";

const styles = StyleSheet.create({
  errorBorder: {
    borderColor: COLORS[theme].danger,
    borderWidth: 1,
  },
  errorText: {
    ...GLOBAL_STYLES.font400,
    color: COLORS[theme].danger,
    fontSize: 12,
  },
  hintText: {
    color: COLORS[theme].secondary,
    fontSize: 14,
    ...GLOBAL_STYLES.font400,
  },
  input: {
    color: COLORS[theme].black,
    flex: 1,
    fontSize: 14,
    height: 44,
    textAlign: I18nManager.isRTL ? "right" : "left",
    textAlignVertical: "center",
    width: "100%",
    ...GLOBAL_STYLES.font500,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: COLORS[theme].white,
    borderColor: COLORS[theme].grey,
    borderRadius: 8,
    marginBottom: 4,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  labelText: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
    marginStart: 5,
    ...GLOBAL_STYLES.font500,
  },
  spaceAround: { marginHorizontal: 5 },
  spaceBottom: { marginBottom: 4 },
  spaceEnd10: { marginEnd: 10 },
  textAreaContainer: {
    alignItems: "flex-start",
    height: 140,
    paddingVertical: 20,
  },
  textAreaInput: {
    marginTop: -7,
    textAlignVertical: "top",
  },
});

export default styles;
