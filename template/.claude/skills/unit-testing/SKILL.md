---
name: 'unit-testing'
description: 'Write, run, and fix Jest unit tests in this Expo / React Native app (jest-expo + React Native Testing Library v14). Covers utils, Redux slices, custom hooks, RTK Query helpers, and components. USE THIS whenever the user asks to "add tests", "write unit tests", "test this util/hook/component/slice", "increase coverage", "add a regression test", or "fix failing tests", and whenever a bug fix or new util/hook should get a test — even if the user only says "make sure it works".'
argument-hint: 'Optional: the file, folder, or feature to test'
user-invocable: true
disable-model-invocation: false
---

## User Input

```text
$ARGUMENTS
```

# Unit Testing

Unit tests for this app run on **Jest 30** with the **`jest-expo`** preset and
**React Native Testing Library (RNTL) v14**. They run in Node, with no device or simulator.

## Commands

| Command | Use |
| --- | --- |
| `npx jest path/to/file.test.ts` | Run one file while writing it |
| `npm run test:ci` | Run all tests once (CI, final check) |
| `npm run test:coverage` | Run all tests with a coverage report |
| `npm test` | Watch mode (`--watchAll`), for humans. **Agents: don't use it, it never exits** |

## Setup (already done, don't recreate)

- Config is the `jest` block in `package.json`. `@/` resolves to the project root, like `tsconfig.json`.
- `jest.setup.ts` has the **global** mocks:
  - `@react-native-async-storage/async-storage` uses the official mock.
  - `react-i18next`: `t(key)` returns the **key**, so assert on keys (`getByText("SIGN_UP_TITLE")`), never on English or Arabic copy.
- Add a mock to `jest.setup.ts` only if almost every test needs it. Mocks for one test file go in that file.
- `app/` and `plop-templates/` are excluded from test discovery.
- `transformIgnorePatterns` is jest-expo's default list plus `immer`. Its `react-native` export is ESM, and Redux Toolkit won't load without it.
- `tsconfig.json` has `"types": ["jest"]`, because TypeScript 6 no longer includes `@types/*` automatically. Test files are type-checked with the rest of the app (`npx tsc --noEmit`).

## Where tests go

Put a `__tests__/` folder **next to the code**, and name the file after the unit:

```
utils/lodash.ts                         -> utils/__tests__/lodash.test.ts
redux/authReducer.ts                    -> redux/__tests__/authReducer.test.ts
hooks/usePagination.ts                  -> hooks/__tests__/usePagination.test.tsx
components/shared/ui/Button/index.tsx   -> components/shared/ui/Button/__tests__/Button.test.tsx
```

- **Never put tests under `app/`.** Expo Router treats every file in it as a route.
- Use `.test.tsx` when the file has JSX (`render`, `renderHook` with a wrapper). Otherwise use `.test.ts`.
- Import the unit under test through `@/…`, the same way app code does.

## Workflow

1. **Read the unit and its imports.** Find its inputs, outputs, side effects (storage, navigation, toasts, timers, network) and native modules it pulls in.
2. **List the behaviours before writing code**: the happy path, edge cases (empty, `null`/`undefined`, boundaries, both themes or languages if it branches on them), and error paths. Each behaviour gets one `it(...)`.
3. **Pick the recipe** for the layer from the table below and write the tests in Arrange / Act / Assert order.
4. **Run just that file** (`npx jest <path>`) until it's green with no warnings in the output.
5. **Run the suite** (`npm run test:ci`). Use `npm run test:coverage` if coverage was asked for.
6. **Report** what's covered, and **any bug the tests exposed** (see "When a test finds a bug").

| Layer | Recipe |
| --- | --- |
| Pure function (`utils/**`) | Call it and assert the return value. See [references/recipes.md#pure-functions](references/recipes.md#pure-functions) |
| Timers (`debounce`, `throttle`, delays) | `jest.useFakeTimers()` + `jest.advanceTimersByTime`. See [#timers](references/recipes.md#timers) |
| Redux slice (`redux/*Reducer.ts`) | `reducer(state, action)` and the action creators. No store needed. See [#redux-slices](references/recipes.md#redux-slices) |
| Custom hook (`hooks/**`) | `await renderHook(...)`, then mock its dependencies. See [#custom-hooks](references/recipes.md#custom-hooks) |
| Component (`components/**`) | `await render(...)`, then `screen` queries and `userEvent`. See [#components](references/recipes.md#components) |
| Module with side effects (toast, router, native) | `jest.mock(...)` the boundary and assert the call. See [#mocking](references/recipes.md#mocking) |

## RNTL v14 rules (these are async now)

- **`await` every** `render`, `renderHook`, `rerender`, `unmount`, `fireEvent.*`, `userEvent.*` and `act`. Make every test `async`.
- Use **`screen.*`** queries. Don't destructure queries from `render()`.
- Query priority: `getByRole` → `getByLabelText` → `getByPlaceholderText` → `getByText` → `getByTestId`, last resort.
  Many template components (e.g. `Button` is a bare `TouchableOpacity`) set no `role`, so `getByText(<translation key>)` is usually right.
- `findBy*` waits for async UI. `queryBy*` is **only** for `.not.toBeOnTheScreen()`. Never use `getBy*` to check that something is absent.
- Prefer `userEvent.setup()` + `await user.press/type(...)`. Use `fireEvent` only for events `userEvent` can't produce (`layout`, `scroll` payloads).
- Use RNTL matchers: `toBeOnTheScreen`, `toHaveTextContent`, `toBeDisabled`, `toHaveDisplayValue`, `toHaveStyle`.
- Don't call `cleanup()` and don't wrap `render` or `fireEvent` in `act()`. Both are handled for you.

## What good tests look like here

- **Test behaviour, not implementation.** Assert what a caller or user sees (return values, rendered text, dispatched calls), not internal state or style objects copied from `styles.ts`.
- **One behaviour per `it`.** Name it as a sentence: `it("returns an empty object when nothing changed")`.
- **No whole-screen snapshots.** They break on every style tweak and catch nothing. A small, intentional inline snapshot is fine.
- **Deterministic.** Use fake timers for time and fixed data for dates (`dayjs`). No real network: mock the RTK Query hook or `fetch`.
- **Immutable checks matter.** If a function must not mutate its input, assert that the input is unchanged afterwards.
- **Don't change app code just to make it testable** unless that's a real improvement (e.g. exporting a pure helper). If you change it, say so.

## When a test finds a bug

A failing test that matches the intended behaviour is a **finding**, not something to work around.

- **Don't rewrite the assertion to match the buggy output.**
- If the fix is in scope and small, follow `.agents/rules/bugfix-workflow.mdc`: confirm the root cause, make the minimal fix, and keep the test as a regression test.
- Otherwise, mark it with `it.failing("…")` and a one-line comment naming the bug, then report it to the user. `it.failing` passes while the bug exists and turns red once it's fixed, so it's never silently forgotten.

## Troubleshooting

See [references/troubleshooting.md](references/troubleshooting.md) for the usual failures: ESM `SyntaxError: Cannot use import statement`, native module not found, `Text strings must be rendered within a <Text>`, act warnings, and the `@react-native/jest-preset` peer dependency.
