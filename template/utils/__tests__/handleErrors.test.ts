import Toast from "react-native-toast-message";

import HandleErrors from "@/utils/handleErrors";

jest.mock("react-native-toast-message", () => ({ show: jest.fn() }));

const lastToastMessage = () => (Toast.show as jest.Mock).mock.calls.at(-1)?.[0]?.text2;

describe("HandleErrors", () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    // HandleErrors logs every error; keep test output clean.
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => logSpy.mockRestore());

  it("shows an error toast", () => {
    HandleErrors({ message: "Boom" });

    expect(Toast.show).toHaveBeenCalledWith(
      expect.objectContaining({ type: "error", text1: "Error" }),
    );
  });

  it.each([
    ["details.reason", { details: { reason: "Bad OTP" }, message: "ignored" }, "Bad OTP"],
    ["message", { message: "Network down" }, "Network down"],
    ["details list", { details: ["a", "b"] }, "a, b"],
    ["detail", { detail: "Not found" }, "Not found"],
    ["first field error", { email: "Invalid email" }, "Invalid email"],
  ])("prefers %s", (_case, err, expected) => {
    HandleErrors(err);

    expect(lastToastMessage()).toBe(expected);
  });

  // BUG: `err && Object.keys(err)` is always truthy (an array), so the generic
  // fallback is unreachable and `{}` produces a toast with an undefined message.
  it.failing("falls back to a generic message for an empty error object", () => {
    HandleErrors({});

    expect(lastToastMessage()).toBe("خطأ غير متوقع!");
  });

  // BUG: a plain string error hits the "first field" branch and shows only its first character.
  it.failing("shows a string error as-is", () => {
    HandleErrors("Something went wrong");

    expect(lastToastMessage()).toBe("Something went wrong");
  });

  // BUG: reading `err.details` on null throws instead of showing a toast.
  it.failing("does not throw for a null error", () => {
    expect(() => HandleErrors(null)).not.toThrow();
  });
});
