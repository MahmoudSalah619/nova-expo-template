import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearSecureStorage } from "@/utils/secureStorage";
import { THEME_STORAGE_KEY } from "@/utils/switchTheme";

/**
 * Clears the session: secure tokens plus AsyncStorage, keeping the saved theme,
 * which isn't tied to the session.
 */
export default async function clearStorage() {
  await clearSecureStorage();
  const keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys.filter((key) => key !== THEME_STORAGE_KEY));
}
