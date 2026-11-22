# Troubleshooting Jest in this repo

## `The React Native Jest preset that jest-expo relies on has moved to a separate package`

`jest-expo` needs `@react-native/jest-preset` as a peer dependency, at the **same minor version as `react-native`**.
After an Expo SDK or React Native upgrade, bump it to match:

```bash
npm install -D @react-native/jest-preset@<react-native version>
```

Likewise, keep `test-renderer` on the line that matches the React minor version (React 19.3 → `test-renderer@~1.3`).

## `SyntaxError: Cannot use import statement outside a module`

A dependency ships untranspiled ESM. `jest-expo` already transforms most RN and Expo packages. For one it misses, add it to
`transformIgnorePatterns` in the `jest` block of `package.json`. Copy jest-expo's default pattern and add the package
inside the negative lookahead. Don't replace the default list.

## `Cannot find module` / native module `… could not be found` / `TurboModuleRegistry.getEnforcing`

The unit imports a native module with no JS fallback. Mock it in the test file:

```ts
jest.mock("expo-local-authentication", () => ({ authenticateAsync: jest.fn() }));
```

If many tests hit the same module, move the mock into `jest.setup.ts`. Many libraries ship an official mock
(e.g. `react-native-reanimated/mock`, `react-native-gesture-handler/jestSetup`). Prefer those over hand-written ones.

## `Invariant Violation: Text strings must be rendered within a <Text> component`

RNTL v14 always enforces this, matching the device. The component really renders a bare string. Fix the component
(wrap the string in `Text`), don't work around it in the test.

## `An update to X inside a test was not wrapped in act(...)`

Something async resolved after the test finished asserting. Make sure every RNTL call is `await`ed. Wait for the
final UI with `await screen.findBy…`. For hooks, wrap the trigger in `await act(async () => { … })`.

## Tests pass alone but fail together

There's shared state between tests: module-level variables, a singleton store, timers, or mocks that weren't reset. Use
`beforeEach(() => jest.clearAllMocks())`, a fresh store per test, and `jest.useRealTimers()` in `afterEach`.

## `@/…` import not found

`moduleNameMapper` maps `^@/(.*)$` to `<rootDir>/$1`. Check the path's casing. Linux CI is case-sensitive, even when macOS isn't.
