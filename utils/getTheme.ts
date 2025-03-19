import { Appearance } from "react-native";

export const theme =
  (Appearance.getColorScheme() as "light" | "dark") || "light";
