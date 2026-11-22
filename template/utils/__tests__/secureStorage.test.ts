import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import {
  clearSecureStorage,
  getSecureItem,
  removeSecureItem,
  setSecureItem,
} from "@/utils/secureStorage";

jest.mock("expo-secure-store", () => {
  const store = new Map<string, string>();
  return {
    __store: store,
    getItemAsync: jest.fn(async (key: string) => store.get(key) ?? null),
    setItemAsync: jest.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
    deleteItemAsync: jest.fn(async (key: string) => {
      store.delete(key);
    }),
  };
});

const secureMap = (SecureStore as unknown as { __store: Map<string, string> })
  .__store;

describe("secureStorage", () => {
  beforeEach(async () => {
    secureMap.clear();
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it("stores tokens in SecureStore only, never AsyncStorage", async () => {
    await setSecureItem("token", "abc");

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith("token", "abc");
    expect(await AsyncStorage.getItem("token")).toBeNull();
    expect(await getSecureItem("token")).toBe("abc");
  });

  it("returns null when nothing is stored", async () => {
    expect(await getSecureItem("refreshToken")).toBeNull();
  });

  it("does not read tokens from AsyncStorage", async () => {
    await AsyncStorage.setItem("token", "legacy");

    expect(await getSecureItem("token")).toBeNull();
  });

  it("removes a stored token", async () => {
    await setSecureItem("token", "abc");

    await removeSecureItem("token");

    expect(await getSecureItem("token")).toBeNull();
  });

  it("clears every secure key", async () => {
    await setSecureItem("token", "abc");
    await setSecureItem("refreshToken", "def");

    await clearSecureStorage();

    expect(secureMap.size).toBe(0);
  });
});
