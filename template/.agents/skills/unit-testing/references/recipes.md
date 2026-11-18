# Test Recipes

Copy the recipe for the layer you are testing. Every example uses this repo's real paths and conventions.

## Pure functions

```ts
// utils/__tests__/getSerializedQueryArgs.test.ts
import getSerializedQueryArgs from "@/utils/getSerializedQueryArgs";

describe("getSerializedQueryArgs", () => {
  it("ignores the page arg so all pages share one cache entry", () => {
    // Arrange
    const args = { endpointName: "getProducts", queryArgs: { page: 3, search: "x" } };

    // Act
    const key = getSerializedQueryArgs(args);

    // Assert
    expect(key).toBe("getProducts-(search=x)");
  });
});
```

Cover the edge cases each function's signature invites: empty arrays, missing keys, `null`/`undefined`, duplicates, and ties when sorting.
Use `it.each` for tables of inputs and outputs:

```ts
it.each([
  [{ a: 1 }, { a: 1 }, true],
  [{ a: 1 }, { a: 2 }, false],
  [[1, 2], [1, 2], true],
])("isEqual(%j, %j) -> %s", (a, b, expected) => {
  expect(isEqual(a, b)).toBe(expected);
});
```

## Timers

```ts
import { debounce } from "@/utils/lodash";

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it("only calls the latest invocation after the wait", () => {
  const fn = jest.fn();
  const debounced = debounce(fn, 300);

  debounced("a");
  debounced("b");
  jest.advanceTimersByTime(299);
  expect(fn).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith("b");
});
```

For `Date.now()`-based code (e.g. `throttle`), fake timers also control `Date.now()`. Use `jest.setSystemTime(…)` or `advanceTimersByTime`.

## Redux slices

Slices are pure reducers, so test them without a store.

```ts
import authReducer, { login, logout } from "@/redux/authReducer";

it("stores the token on login", () => {
  const state = authReducer(undefined, login("abc"));
  expect(state.token).toBe("abc");
});

it("resets everything on logout", () => {
  const loggedIn = authReducer(undefined, login("abc"));
  expect(authReducer(loggedIn, logout())).toEqual(authReducer(undefined, { type: "@@INIT" }));
});
```

`reducer(undefined, { type: "@@INIT" })` gives you the initial state without importing it.

## Custom hooks

`renderHook` is async in v14. Mock the hook's collaborators and assert on `result.current` and on calls.

```tsx
import { act, renderHook } from "@testing-library/react-native";
import usePaginatedRequest from "@/hooks/usePagination";

// A fake RTK Query lazy hook: [trigger, { data, isFetching }]
function makeLazyHook(data?: unknown) {
  const unwrap = jest.fn(() => Promise.resolve(data));
  const trigger = jest.fn(() => ({ unwrap }));
  const rtkLazyHook = jest.fn(() => [trigger, { data, isFetching: false }]);
  return { trigger, rtkLazyHook };
}

it("requests page 1 with the params on mount", async () => {
  const { trigger, rtkLazyHook } = makeLazyHook();
  await renderHook(() =>
    usePaginatedRequest({ page: 1, setPage: jest.fn(), params: { q: "a" }, rtkLazyHook }),
  );
  expect(trigger).toHaveBeenCalledWith({ page: 1, q: "a" });
});
```

- Use `rerender(newProps)` (awaited) with `initialProps` to test reactions to prop changes.
- Wrap state-changing calls on `result.current` in `await act(async () => { … })`.
- If the hook needs the Redux store, pass a `wrapper` that renders `<Provider store={makeTestStore()}>`. Build a fresh store per test with `configureStore({ reducer: { auth: authReducer, app: appReducer } })`. Don't import the app's singleton `redux/index.ts` store, because it carries persisted state between tests.

## Components

```tsx
import { render, screen, userEvent } from "@testing-library/react-native";
import Button from "@/components/shared/ui/Button";

it("calls onPress when pressed", async () => {
  const user = userEvent.setup();
  const onPress = jest.fn();
  await render(<Button title="LOGIN" onPress={onPress} />);

  await user.press(screen.getByText("LOGIN"));

  expect(onPress).toHaveBeenCalledTimes(1);
});
```

- Text goes through `t()`, which the global mock turns into identity. Pass and assert **translation keys**.
- Components that read the theme get it from `Appearance` (`utils/getTheme`), which is `"light"` in Jest by default.
- For components that need providers (Redux, SafeArea, Gesture Handler), add a small `renderWithProviders` helper in the test file, or in `test-utils/` if three or more files need it.

## Mocking

Mock at the **boundary** (toast, router, storage, native module, network), then assert the interaction.

```ts
import Toast from "react-native-toast-message";
import HandleErrors from "@/utils/handleErrors";

jest.mock("react-native-toast-message", () => ({ show: jest.fn() }));

it("shows the server's reason", () => {
  HandleErrors({ details: { reason: "Bad OTP" } });
  expect(Toast.show).toHaveBeenCalledWith(expect.objectContaining({ text2: "Bad OTP" }));
});
```

- `expo-router`: `jest.mock("expo-router", () => ({ router: { push: jest.fn(), back: jest.fn() }, useRouter: () => ({ push: jest.fn(), back: jest.fn() }) }))`.
- Silence an intentional `console.log` or `console.error` with `jest.spyOn(console, "log").mockImplementation(() => {})` **in that test only**, and restore it afterwards (`mockRestore`).
- Reset mocks between tests with `beforeEach(() => jest.clearAllMocks())` when one mock is shared across several tests.
