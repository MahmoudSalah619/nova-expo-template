import appReducer, { hideLoader, setDeviceId, showLoader } from "@/redux/appReducer";

const initialState = appReducer(undefined, { type: "@@INIT" });

describe("appReducer", () => {
  it("starts with the loader hidden and no device id", () => {
    expect(initialState).toEqual({ isLoading: false, deviceId: null });
  });

  it("shows and hides the loader", () => {
    const shown = appReducer(initialState, showLoader());
    expect(shown.isLoading).toBe(true);

    expect(appReducer(shown, hideLoader()).isLoading).toBe(false);
  });

  it("stores the device id", () => {
    expect(appReducer(initialState, setDeviceId("device-1")).deviceId).toBe("device-1");
  });
});
