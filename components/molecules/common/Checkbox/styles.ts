import { COLORS } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  checkbox: {
    borderColor: COLORS.light.greyCe,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 8,
    height: 16,
    width: 16,
  },
  checkboxContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  checkedCheckbox: {
    backgroundColor: COLORS.light.primary,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  checkboxWrapper: {
    paddingHorizontal: 8,
  },
  icon: {
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    color: COLORS.light.black,
  },
  link: {
    fontSize: 12,
    color: COLORS.light.grey,
    textDecorationLine: "underline",
  },
});

export default styles;
