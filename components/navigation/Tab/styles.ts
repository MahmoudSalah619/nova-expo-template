import { StyleSheet } from "react-native";
import GLOBAL_STYLES from "@/constants/GlobalStyles";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 6,
  },
  text: {
    fontSize: 12,
    ...GLOBAL_STYLES.font400,
    textAlign: "center",
    width: 68,
  },
});

export default styles;
