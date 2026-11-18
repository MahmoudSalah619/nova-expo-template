import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import useCheckAuthTokenExistance from "@/hooks/useCheckAuthTokenExistance";
import { login, setUserInfo } from "@/redux/authReducer";
import { clearSecureStorage, getSecureItem } from "@/utils/secureStorage";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({ useDispatch: () => mockDispatch }));

jest.mock("@/utils/secureStorage", () => ({
  getSecureItem: jest.fn(),
  clearSecureStorage: jest.fn(() => Promise.resolve()),
}));

const user = { id: 1, name: "Jane" };

function mockSecureValues(values: Record<string, string | null>) {
  (getSecureItem as jest.Mock).mockImplementation(
    async (key: string) => values[key] ?? null,
  );
}

describe("useCheckAuthTokenExistance", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
  });

  it("restores the session when remember_me is set", async () => {
    await AsyncStorage.setItem("remember_me", "true");
    mockSecureValues({ token: "abc", userInfo: JSON.stringify(user) });

    await renderHook(() => useCheckAuthTokenExistance());

    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(login("abc")));
    expect(mockDispatch).toHaveBeenCalledWith(setUserInfo(user as never));
    expect(clearSecureStorage).not.toHaveBeenCalled();
  });

  it("clears leftover secrets and stays logged out without remember_me (e.g. iOS reinstall)", async () => {
    mockSecureValues({ token: "stale", userInfo: JSON.stringify(user) });

    await renderHook(() => useCheckAuthTokenExistance());

    await waitFor(() => expect(clearSecureStorage).toHaveBeenCalledTimes(1));
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("does nothing when remember_me is set but the token is missing", async () => {
    await AsyncStorage.setItem("remember_me", "true");
    mockSecureValues({ userInfo: JSON.stringify(user) });

    await renderHook(() => useCheckAuthTokenExistance());

    await waitFor(() => expect(getSecureItem).toHaveBeenCalledWith("token"));
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
