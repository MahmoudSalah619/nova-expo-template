import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAppState {
  isLoading: boolean;
  deviceId: string | null;
}

const initialState: IAppState = {
  isLoading: false,
  deviceId: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showLoader: (state) => ({
      ...state,
      isLoading: true,
    }),
    hideLoader: (state) => ({
      ...state,
      isLoading: false,
    }),
    setDeviceId: (state, action: PayloadAction<string>) => ({
      ...state,
      deviceId: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader, setDeviceId } = appSlice.actions;

export default appSlice.reducer;
