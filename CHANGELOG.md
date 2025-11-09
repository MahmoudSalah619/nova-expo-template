# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

- Internet Detection using NetInfo

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
