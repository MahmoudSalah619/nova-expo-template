import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_STORAGE_KEY } from "@/utils/switchTheme";

/** Clears AsyncStorage but keeps the saved theme, which isn't tied to the session. */
export default async function clearStorage() {
  const keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys.filter((key) => key !== THEME_STORAGE_KEY));
}
