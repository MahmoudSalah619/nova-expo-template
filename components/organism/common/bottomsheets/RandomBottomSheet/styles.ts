import { StyleSheet } from "react-native";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { COLORS } from "@/constants/Colors";

const styles = StyleSheet.create({
  btn: {
    borderRadius: 64,
    width: "100%",
  },
  btnText: {
    fontSize: 14,
    ...GLOBAL_STYLES.font500,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 25,
    margin: 12,
  },
  content: {
    alignItems: "center",
    flexDirection: "column",
    gap: 12,
    justifyContent: "center",
    marginVertical: 24,
  },
  outlineTxt: {
    color: COLORS.dark.primary,
    fontSize: 15,
    ...GLOBAL_STYLES.font500,
    marginTop: 16,
  },
  subTitle: {
    color: COLORS.dark.greyCe,
    fontSize: 14,
    lineHeight: 20.3,
    textAlign: "center",
    ...GLOBAL_STYLES.font400,
  },
  title: {
    color: COLORS.dark.greyCe,
    fontSize: 20,
    ...GLOBAL_STYLES.font700,
  },
});

export default styles;
