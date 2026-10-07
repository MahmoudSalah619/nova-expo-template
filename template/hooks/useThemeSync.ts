import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Appearance, AppState } from "react-native";
import { theme } from "@/utils/getTheme";
import reloadApp from "@/utils/reloadApp";
import { THEME_STORAGE_KEY } from "@/utils/switchTheme";

const RELOAD_ATTEMPT_KEY = "theme_reload_attempted";

/**
 * Applies the theme saved by `switchTheme` when it differs from the one the
 * app booted with. The attempt flag stops a reload loop if the saved scheme
 * can't be applied on this platform.
 */
async function applySavedTheme() {
  const [[, savedTheme], [, hasAttempted]] = await AsyncStorage.multiGet([
    THEME_STORAGE_KEY,
    RELOAD_ATTEMPT_KEY,
  ]);
  if (hasAttempted) await AsyncStorage.removeItem(RELOAD_ATTEMPT_KEY);
  if (savedTheme !== "light" && savedTheme !== "dark") return;
  if (savedTheme === theme || hasAttempted) return;

  await AsyncStorage.setItem(RELOAD_ATTEMPT_KEY, "true");
  Appearance.setColorScheme(savedTheme);
  reloadApp();
}

/**
 * Keeps the app on the right color scheme: restores the saved choice on
 * launch and reloads when the system scheme changes while the app is open.
 */
export default function useThemeSync() {
  useEffect(() => {
    applySavedTheme();

    const reloadIfSchemeChanged = () => {
      // iOS reports both schemes while snapshotting a backgrounded app
      if (AppState.currentState !== "active") return;
      const currentScheme = Appearance.getColorScheme() ?? "light";
      if (currentScheme !== theme) reloadApp();
    };
    const appearanceListener = Appearance.addChangeListener(reloadIfSchemeChanged);
    const appStateListener = AppState.addEventListener("change", reloadIfSchemeChanged);

    return () => {
      appearanceListener.remove();
      appStateListener.remove();
    };
  }, []);
}
