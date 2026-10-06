# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

- Internet Detection using NetInfo

### Changed

- **BREAKING: Replaced the Atomic Design `components/` layout with a feature-based structure**, ported back from the ScoutX rebuild (a project created from this template). Components are now grouped by what they are for instead of by granularity:
  - `components/shared/ui/` — generic primitives (formerly `atoms/*` and `molecules/common/*`, including `Input`, `PhoneInput`, `FormPhoneInput`, `DropDown`, `RadioButton`, `RotateArrow`, and `ShadowWrapper`).
  - `components/shared/layout/` — navigation chrome and screen layout: `AppHeader`, `AppTabBar`, `MainScreenOptions` (formerly `organisms/scoped/navigation/*`) and `ScreenWrapper` (formerly `templates/AuthScreenWrapper` + `templates/MainScreenWrapper`).
  - `components/shared/wrappers/` — container / overlay wrappers: `Card`, `FlashList` (formerly `wrappers/Card`, `wrappers/flashlist`), `bottomsheets`, `modals` (formerly `organisms/common/*`), and `Dialog` (formerly `organisms/common/dialog`, still exported as `DialogComponent`).
  - `components/shared/vendor/` — the vendored `reactICX` library (formerly `vendor/`).
  - `components/features/auth/components/` — `biometric` and `social` login buttons (formerly `organisms/scoped/auth/*`).
  - `components/features/notifications/` — `NotificationBell` and `UnreadMessages` (formerly `molecules/scoped/notifications/*`), and `NotificationListenerContainer` (formerly `templates/NotificationListnerContainer.tsx`; filename typo fixed).
- Added `index.ts` barrels for `components/shared/ui`, `components/shared/layout`, `components/shared/wrappers`, and every `components/features/<feature>`. A feature's barrel is its single public entry point: code outside the feature imports from `@/components/features/<feature>`, never from deep paths. Side-effect modules (`components/shared/wrappers/bottomsheets`, `components/features/notifications/NotificationListenerContainer`) are intentionally kept out of the barrels and imported by deep path.
- **BREAKING: Moved screen implementations out of `app/`** into `components/features/<flow>/screens/` — `auth`: `Login`, `SignUp`, `Welcome`, `ForgotPassword`; `main`: `Home`, `Explore`, `Favourites`, `Profile`, `Screen1`–`Screen3`. Screens are exported from their feature barrel with a `Screen` suffix (`LoginScreen`, `HomeScreen`, …), and `app/` route files are now thin re-exports, e.g. `export { LoginScreen as default } from "@/components/features/auth";`.
- **BREAKING: Merged `AuthScreenWrapper` and `MainScreenWrapper` into a single `ScreenWrapper`** (`components/shared/layout/ScreenWrapper`). It renders the auth layout (logo header, auth padding) by default; pass `variant="main"` for main-flow screens. Migrating from `MainScreenWrapper`: add `variant="main"`, rename `customStyle` → `style` and `paddingHorizontalSize` → `paddingSize` (`paddingBlockSize` is unchanged). `AuthScreenWrapper` usages keep their props and only switch to `ScreenWrapper`.
- **BREAKING:** The common dropdown now lives in `components/shared/ui/DropdownMenu` (still exported as `DropdownComponent`); the folder was renamed to avoid a case-only collision with `components/shared/ui/DropDown`.
- Updated the Plop generator for the new structure: components prompt for a `shared/ui`, `shared/layout`, `shared/wrappers`, or feature location; screens are generated under `components/features/<auth|main>/screens/<Name>/`, auto-registered in the feature barrel with a `Screen` suffix, routed through a thin `app/` re-export, and wrapped in `ScreenWrapper`. See `template/PLOP_GENERATOR.md`.
- Updated the AI agent rules, skills, and commands (`.agent`, `.agents`, `.claude`, `.codex`, `.cursor`) for the feature-based structure: `atomic-design-pattern.mdc` is replaced by `component-structure.mdc`, and the remaining rules reference the new paths.
- Updated the READMEs to document the feature-based structure, feature barrels, thin routes, and `ScreenWrapper`.

## [4.0.1] - 2026-07-05

### Added

- Added `lodash` utilities file with custom standard helper implementations (`debounce`, `throttle`, `cloneDeep`, `isEqual`, `uniqBy`, `groupBy`, `orderBy`).
- Added `findChangedFields` utility function to compare two objects and extract modified fields.

### Changed

- Updated plop screen generator template to use `MainScreenWrapper` for main screens and `AuthScreenWrapper` for auth screens.

## [4.0.0] - 2026-07-01

### Changed

- **Upgrade to Expo SDK 57** (React Native 0.86.0, React 19.2.3).
- Updated all `expo-*` packages to SDK 57 unified versioning (e.g. `expo-router@~57.0.2`).
- Bumped compatible third-party native deps: `react-native-reanimated@4.5.0`, `react-native-worklets@0.10.0`, and `react-native-gesture-handler@~2.32.0`.
- Removed the outdated `module`/`moduleResolution` (`node16`) and `jsx` overrides from `tsconfig.json` so it inherits Expo's `bundler` resolution — fixes ESM/CJS type errors on `react-native-reanimated`/`react-native-worklets` imports.
- Pinned `@react-native/jest-preset` to `0.86.0` via `overrides` so a plain `npm install` resolves cleanly (works around `jest-expo@57`'s lagging `^0.85.0` peer range) — no `legacy-peer-deps` needed.


## [3.0.0] - 2026-06-25

### Added

- **AI agent tooling** shared across Claude, Cursor, Codex, and other agents (`.claude`, `.cursor`, `.codex`, `.agents`, `.agent`):
  - Skills for building native UI, Expo API routes, deployment, dev client, native data fetching, upgrading Expo, feature integration, and a skill-creator.
  - Coding rules (atomic-design pattern, icon usage, React Native best practices, styles file structure, translation/i18n, and more).
- **Slash commands** for translation (`translate`, `sync-translations`), SVG generation (`generate-svg`), and console-log cleanup (`remove-logs`).
- **Plop `integration` generator** to scaffold RTK Query API services (`apis/services/<feature>/{index.ts,types.ts}`) and auto-register their cache tags.
- **`Spacing` constants** (`x1`–`x14`, moderate-scaled) for consistent layout spacing.

### Changed

- **Major upgrade to Expo SDK 56** (React Native 0.85.3, React 19.2.3).
- Updated all `expo-*` packages to SDK 56 unified versioning (e.g. `expo-router@~56.2.11`).
- Bumped all third-party dependencies to versions compatible with SDK 56.
- Upgraded TypeScript to 6.0.
- Updated the optional Sentry integration to `@sentry/react-native@^8` (removed deprecated `sentry-expo` / webpack plugin; switched to the `@sentry/react-native/expo` config plugin and v8 tracing API).
- Switched the template `android`/`ios` scripts to `expo run:android` / `expo run:ios` for dev-client builds.
- Restructured the `apis` folder to co-locate each service with its types (`apis/services/<feature>/{index.ts,types.ts}`).
- Improved the `generate-svg` script with dynamic color support, path property injection, and more robust icon-registry updates.

### Fixed

- Corrected a wrong import in the common `dropdown` organism.
- Fixed the `Image` component loading state so the loader shows until the image actually loads (initial `isLoading = true`, using `onLoad` instead of `onLoadStart`/`onLoadEnd`).

### Removed

- Dropped the unmaintained `react-native-status-bar-height` dependency in favor of `Constants.statusBarHeight` from `expo-constants`.

## [2.0.2] - 2025-11-09

### Added

- **Plop Update**: Enhanced Plop.js code generator to include SVG icon generation
  - Automatically updates Icon list for easy imports
  - Seperated Types file for better type management

## [2.0.1] - 2025-10-20

### Added

- **Code Generator (Plop.js)**: Integrated Plop.js for automated code generation
  - Generate components with proper folder structure (atoms, molecules, organisms, templates, wrappers)
  - Support for scoped components (common/scoped) for molecules and organisms
  - Generate screens for auth and main app sections
  - Create custom hooks with TypeScript interfaces
  - Generate utility functions with JSDoc documentation
  - Commands: `npm run generate` or `npm run g`

## [2.0.0] - 2025-10-19

### Added

- Major upgrade to Expo SDK 54.
- Updated all dependencies to their latest versions.
- Removed unused dependencies and cleaned up the codebase.
- Adjusted Icon component props for better usability.
- Added Progress Bar component.
- Added OTP Input component in ForgotPassword screen.
- Added appVersionSource in eas.json for better version management.

## [1.1.19] - 2025-06-11

### Added

- Added Eslint new flat config.
- Fixed some issues regarding Eslint.
- Fixed some Language issues.

## [1.1.18] - 2025-06-07

### Added

- Added FlashList component for better performance with large lists.
- Added a new script to remove console logs from the project.
- Added Wrappers in the components folder for better organization.
- Added bottomNavigation icons.
- Adjusted Card Wrapper component for better UI.

## [1.1.17] - 2025-06-04

### Added

- Fixed an issue where app sometimes show blank screen in production build.

## [1.1.15] - 2025-05-26

### Added

- Fixed InitialRoute issue.
- Added Explanation for the added scripts.
- Added screenshots to the README.
- Adjusted some button tiltes for better clarity.
- Bug fixes.

## [1.1.13] - 2025-05-06

### Added

- Fixed an issue where the app refreshes on each change made.
- Fixed an issue where the text component causes overlap texts.

## [1.1.12] - 2025-04-22

### Added

- Added auto-generation of bundleIdentifier and package in processAppJson function for improved project setup
- Added node, and npm versions in ReadMe.

## [1.1.10] - 2025-04-13

### Added

- Added Translation to the Prompt.
- Enhanced file structure.
- Enhanced generate-svg.
- Fixed some translation Bugs.

## [1.1.9] - 2025-04-10

### Added

- Enhanced generate-svg script with Icon component.

## [1.1.7] - 2025-04-09

### Added

- More responsiveness tool such as:- moderateScale, horizontalScale, and verticalScale.
- Modified SVG script for easier usage.

## [1.1.5] - 2025-04-07

### Added

- Sentry error monitoring

## [1.1.3] - 2025-04-05

### Added

- Notification configuration

## [1.1.2] - 2025-04-04

### Added

- EAS configuration.

## [1.1.0] - 2025-04-03

### Added

- Added Eslint & Husky.
- Added Prettier.

## [1.0.0] - 2025-04-02

### Added

- Basic CLI functionality for creating a new project.
- Template copying and dependency installation.
- Support for optional ESLint and Husky setup.
