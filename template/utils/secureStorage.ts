import * as SecureStore from "expo-secure-store";

/**
 * Encrypted storage for secrets (auth tokens, user profile): iOS Keychain /
 * Android Keystore via expo-secure-store. Non-secret data (remember_me, theme,
 * lang) lives in AsyncStorage instead.
 *
 * Keychain data survives an app uninstall on iOS; useCheckAuthTokenExistance
 * clears it when the AsyncStorage remember_me flag is missing.
 */
export const SECURE_KEYS = {
  token: "token",
  refreshToken: "refreshToken",
  userInfo: "userInfo",
} as const;

export type SecureKey = (typeof SECURE_KEYS)[keyof typeof SECURE_KEYS];

export function getSecureItem(key: SecureKey): Promise<string | null> {
  return SecureStore.getItemAsync(key);
}

export function setSecureItem(key: SecureKey, value: string): Promise<void> {
  return SecureStore.setItemAsync(key, value);
}

export function removeSecureItem(key: SecureKey): Promise<void> {
  return SecureStore.deleteItemAsync(key);
}

/** Removes every secret (used on logout and when clearing the session). */
export async function clearSecureStorage(): Promise<void> {
  await Promise.all(Object.values(SECURE_KEYS).map(removeSecureItem));
}
