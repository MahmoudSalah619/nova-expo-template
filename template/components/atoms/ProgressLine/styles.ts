import { StyleSheet } from "react-native";
import { moderateScale } from "@/constants/Metrics";

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(12),
    height: moderateScale(8),
    width: "100%",
  },
  progress: {
    borderRadius: moderateScale(12),
    height: moderateScale(8),
  },
});

export default styles;
