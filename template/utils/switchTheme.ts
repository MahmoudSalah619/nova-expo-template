import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import reloadApp from "@/utils/reloadApp";

export const THEME_STORAGE_KEY = "theme";

/**
 * Saves and applies the chosen color scheme, then reloads the JS bundle.
 * Styles read `theme` from `@/utils/getTheme` once at module load,
 * so a reload is what makes every screen pick up the new scheme.
 */
export default async function switchTheme(scheme: "light" | "dark") {
  await AsyncStorage.setItem(THEME_STORAGE_KEY, scheme);
  Appearance.setColorScheme(scheme);
  reloadApp();
}
