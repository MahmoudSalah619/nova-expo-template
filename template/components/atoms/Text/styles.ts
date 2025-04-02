import FontFamily from "@/constants/FontFamily";
import { I18nManager, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
  },
  bell: {
    fontSize: 8,
  },
  header: {
    fontSize: 16,
    fontFamily: FontFamily.cosmica_600,
  },
  title: {
    fontSize: 32,
    fontFamily: FontFamily.cosmica_700,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: FontFamily.cosmica_500,
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
  },
});

export default styles;
