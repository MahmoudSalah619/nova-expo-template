/**
 * Global Jest setup — runs after the test framework is installed, before each test file.
 * Keep this to mocks that almost every test needs. One-off mocks belong in the test file.
 */
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// `Text` translates every string. Return keys as-is so tests assert on stable keys
// (e.g. `getByText("SIGN_UP_TITLE")`) and don't depend on locale files.
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
      dir: () => "ltr",
      changeLanguage: jest.fn(() => Promise.resolve()),
    },
  }),
  Trans: ({ children }: { children: unknown }) => children,
  initReactI18next: { type: "3rdParty", init: jest.fn() },
}));

// Native keyboard module isn't available in Jest; use the library's official mock.
jest.mock("react-native-keyboard-controller", () =>
  require("react-native-keyboard-controller/jest"),
);
