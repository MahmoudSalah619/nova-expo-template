import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/apis/@types/auth";

interface IAuthState {
  token?: string | null;
  userData?: User | null;
}
const initialState: IAuthState = {
  token: null,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => ({
      ...state,
      token: action.payload,
    }),
    setUserInfo: (state, action: PayloadAction<User>) => ({
      ...state,
      userData: action.payload,
    }),
    logout: () => ({
      ...initialState,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { login, setUserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
