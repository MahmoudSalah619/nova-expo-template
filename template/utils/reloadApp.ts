import * as Updates from "expo-updates";
import { DevSettings } from "react-native";

let isReloading = false;

/** Reloads the JS bundle. Repeated calls while a reload is pending are ignored. */
export default async function reloadApp() {
  if (isReloading) return;
  isReloading = true;
  // expo-updates can't reload in Expo Go / development builds
  if (__DEV__ || !Updates.isEnabled) {
    DevSettings.reload();
    return;
  }
  try {
    await Updates.reloadAsync();
  } catch (e) {
    isReloading = false;
    console.log(e);
  }
}
