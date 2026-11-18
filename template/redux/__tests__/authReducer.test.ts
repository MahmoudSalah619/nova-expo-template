import authReducer, { login, logout, setUserInfo } from "@/redux/authReducer";
import { User } from "@/apis/services/auth/types";

const initialState = authReducer(undefined, { type: "@@INIT" });
const user = { id: 1, name: "Mina" } as unknown as User;

describe("authReducer", () => {
  it("starts logged out", () => {
    expect(initialState).toEqual({ token: null, userData: null });
  });

  it("stores the token on login", () => {
    expect(authReducer(initialState, login("abc")).token).toBe("abc");
  });

  it("stores the user on setUserInfo without touching the token", () => {
    const loggedIn = authReducer(initialState, login("abc"));

    const state = authReducer(loggedIn, setUserInfo(user));

    expect(state).toEqual({ token: "abc", userData: user });
  });

  it("clears the token and user on logout", () => {
    const loggedIn = authReducer(authReducer(initialState, login("abc")), setUserInfo(user));

    expect(authReducer(loggedIn, logout())).toEqual(initialState);
  });

  it("does not mutate the previous state", () => {
    const before = { ...initialState };

    authReducer(initialState, login("abc"));

    expect(initialState).toEqual(before);
  });
});
