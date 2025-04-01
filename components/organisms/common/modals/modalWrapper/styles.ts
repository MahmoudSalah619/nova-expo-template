import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  closeSection: { justifyContent: "flex-end" },
  modalContainer: {
    backgroundColor: COLORS.light.white,
    borderRadius: 30,
    padding: 20,
  },
});

export default styles;
