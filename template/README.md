# 🚀 Your Nova Expo App

A modern React Native application built with Expo 57, featuring a comprehensive development setup with TypeScript, navigation, state management, internationalization, and feature-based components.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Installation](#️-installation)
- [⚙️ Prerequisites](#️-prerequisites)
- [📚 Usage](#-usage)
- [🏗️ Project Structure](#️-project-structure)
- [🎨 Component Architecture](#-component-architecture)
- [🌐 API Integration](#-api-integration)
- [🌍 Internationalization](#-internationalization)
- [🔧 Development Scripts](#-development-scripts)
- [📱 Building for Production](#-building-for-production)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- **[React Native](https://reactnative.dev/)**: A framework for building native apps using React.
- **[Expo](https://expo.dev/)**: A framework and platform for universal React applications.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly typed programming language that builds on JavaScript.
- **[Expo Router](https://docs.expo.dev/routing/introduction/)**: File-based routing for React Native and web.
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: A toolset for efficient Redux development.
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)**: Powerful data fetching and caching tool.
- **[React Toastify](https://fkhadra.github.io/react-toastify/)**: Easy-to-use toast notifications.
- **[React-i18next](https://react.i18next.com/)**: Internationalization for React Native.
- **[Day.js](https://day.js.org/)**: A lightweight JavaScript date library.
- **[Flashlist](https://shopify.github.io/flash-list/)**: A performant list component for React Native.
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Feature-based components**: Components and screens organized by product feature, with a shared layer for reusable UI, layout, and wrappers.
- **[Biometric Authentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/)**: Fingerprint and face recognition support.
- **[Sentry Integration](https://sentry.io/)**: Error monitoring and performance tracking.
- **Dark/Light Theme Support**: Built-in theme switching capability.
- **Custom Hooks**: Pre-built hooks for common functionality.
- **Development Scripts**: Automated tools for SVG generation, translation management, and more.

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## ⚙️ Prerequisites

Ensure you have the following installed:

- **Node.js**: v16.14.0 or higher
- **npm**: v8.5.0 or higher
- **Expo CLI**: Latest version
- **iOS Simulator** (for iOS development)
- **Android Studio** (for Android development)

## 📚 Usage

### Development Commands

- **Start the development server:**
  ```bash
  npm start
  ```

- **Run on Android:**
  ```bash
  npm run android
  ```

- **Run on iOS:**
  ```bash
  npm run ios
  ```

- **Run on Web:**
  ```bash
  npm run web
  ```

- **Type checking:**
  ```bash
  npm run type-check
  ```

### Development Scripts

- **Generate SVG components:**
  ```bash
  npm run generate-svg
  ```

- **Sync translations:**
  ```bash
  npm run sync-translations
  ```

- **Auto-translate content:**
  ```bash
  npm run translate
  ```

- **Remove console logs for production:**
  ```bash
  npm run remove-logs
  ```

- **Remove console logs for production:**
  ```bash
  npm run remove-logs
  ```

## 🏗️ Project Structure

```
your-app-name/                     # Your new Expo app
├── 📄 app.json                    # Expo app configuration
├── 📄 eas.json                    # EAS Build configuration
├── 📄 expo-env.d.ts               # Expo environment types
├── 📄 package.json                # Project dependencies
├── 📄 tsconfig.json               # TypeScript configuration
│
├── 📁 @types/                     # Global TypeScript definitions
│   ├── 📄 static-files.d.ts       # Static file types
│   └── 📄 TranslationKeyEnum.ts   # Translation key enums
│
├── 📁 apis/                       # API layer
│   ├── 📄 Domain.ts               # API domain configuration
│   ├── 📄 index.ts                # API exports
│   ├── 📄 tagTypes.ts             # RTK Query tag types
│   ├── 📁 @types/                 # Shared API type definitions
│   ├── 📁 middlewares/            # API middlewares
│   └── 📁 services/               # API service endpoints (one folder per feature)
│
├── 📁 app/                        # App routing (Expo Router) — thin route files that re-export screens from feature barrels
│   ├── 📄 _layout.tsx             # Root layout
│   ├── 📄 +not-found.tsx          # 404 page
│   ├── 📄 index.tsx               # Home/Landing page
│   ├── 📁 (auth)/                 # Authentication stack
│   │   ├── 📄 _layout.tsx         # Auth layout
│   │   ├── 📁 forgotPassword/     # -> components/features/auth (barrel) -> screens/ForgotPassword
│   │   ├── 📁 login/              # -> components/features/auth (barrel) -> screens/Login
│   │   ├── 📁 signup/             # -> components/features/auth (barrel) -> screens/SignUp
│   │   └── 📁 welcome/            # -> components/features/auth (barrel) -> screens/Welcome
│   └── 📁 (main)/                 # Main app stack
│       ├── 📄 _layout.tsx         # Main layout
│       ├── 📁 (tabs)/             # Tab navigation -> components/features/main (barrel) -> screens/{Home,Explore,Favourites,Profile}
│       ├── 📁 screen1/            # -> components/features/main (barrel) -> screens/Screen1
│       ├── 📁 screen2/            # -> components/features/main (barrel) -> screens/Screen2
│       └── 📁 screen3/            # -> components/features/main (barrel) -> screens/Screen3
│
├── 📁 assets/                     # Static assets
│   ├── 📁 fonts/                  # Custom fonts
│   ├── 📁 icons/                  # Icon components
│   ├── 📁 images/                 # Image assets
│   └── 📁 svgs/                   # SVG components
│
├── 📁 components/                 # UI Components (Feature-based)
│   ├── 📁 shared/                 # Generic, reusable UI (feature-agnostic)
│   │   ├── 📁 ui/                 # Primitives: Button, Input, Text, Icon, DropDown, DropdownMenu… (+ index.ts barrel)
│   │   ├── 📁 layout/             # Navigation chrome + screen layout: AppHeader, AppTabBar, MainScreenOptions, ScreenWrapper (+ index.ts barrel)
│   │   ├── 📁 wrappers/           # Container / overlay wrappers: Card, Dialog, FlashList, modals, bottomsheets (+ index.ts barrel)
│   │   └── 📁 vendor/             # Self-contained vendored lib (reactICX)
│   └── 📁 features/               # Feature-specific components and screens
│       ├── 📁 auth/               # Auth flow: auth screens, biometric + social login buttons
│       │   ├── 📄 index.ts        # Single entry point: Biometric, social buttons, and all auth screens
│       │   ├── 📁 components/     # biometric/, social/
│       │   └── 📁 screens/        # ForgotPassword, Login, SignUp, Welcome (routed to from app/(auth)/)
│       ├── 📁 main/               # Main flow: tab and stack screens
│       │   ├── 📄 index.ts        # Single entry point: all main screens
│       │   ├── 📁 components/     # Components used only by main screens
│       │   └── 📁 screens/        # Home, Explore, Favourites, Profile, Screen1-3 (routed to from app/(main)/)
│       └── 📁 notifications/      # Notification bell, unread badge, listener
│           ├── 📄 index.ts        # Single entry point: NotificationBell, UnreadMessages
│           ├── 📁 NotificationBell/
│           ├── 📁 UnreadMessages/
│           └── 📁 NotificationListenerContainer/  # Side-effect module — import by deep path, not via the barrel
│
├── 📁 constants/                  # App constants
│   ├── 📄 Colors.ts               # Color palette
│   ├── 📄 FontFamily.ts           # Font definitions
│   ├── 📄 GlobalStyles.ts         # Global styles
│   ├── 📄 Metrics.ts              # Screen dimensions
│   └── 📄 TranslationConfig.ts    # i18n configuration
│
├── 📁 hooks/                      # Custom React hooks
│   ├── 📄 useBiometricLogin.tsx   # Biometric authentication
│   ├── 📄 useColorScheme.ts       # Theme management
│   ├── 📄 useFetchTranslation.ts  # Localization hook
│   └── 📄 useThemeColor.ts        # Color theme hook
│
├── 📁 locale/                     # Internationalization
│   ├── 📄 ar.json                 # Arabic translations
│   ├── 📄 en.json                 # English translations
│   └── 📄 index.ts                # i18n exports
│
├── 📁 redux/                      # State management
│   ├── 📄 index.ts                # Store configuration
│   ├── 📄 appReducer.ts           # App state slice
│   └── 📄 authReducer.ts          # Auth state slice
│
├── 📁 scripts/                    # Development scripts
│   ├── 📄 generate-svg.js         # SVG component generator
│   ├── 📄 removeLogs.js           # Production log removal
│   ├── 📄 sync-translations.js    # Translation sync
│   └── 📄 translate.js            # Auto-translation tool
│
├── 📁 styles/                     # Global styles
│
└── 📁 utils/                      # Utility functions
    ├── 📄 debounce.ts             # Debounce utility
    ├── 📄 handleErrors.ts         # Error handling
    ├── 📄 loginHandler.ts         # Authentication helpers
    └── 📄 showSuccessMsg.ts       # Success messaging
```

### 📂 Key Directories Explained

- **`app/`**: Uses Expo Router for file-based routing with layout components. Route files stay thin and re-export their screen from that feature's `index.ts` barrel — never from a deep `screens/` path
- **`components/`**: Feature-based organization — `shared/` for generic UI (`ui`, `layout`, `wrappers`, `vendor`) and `features/` for feature-specific components, each feature with its own `screens/` subfolder for full-screen implementations. Every feature's `index.ts` is its single entry point for anything outside the feature folder
- **`apis/`**: Centralized API layer with RTK Query for data fetching and caching
- **`redux/`**: State management using Redux Toolkit with separate slices
- **`hooks/`**: Custom React hooks for reusable logic
- **`constants/`**: App-wide constants including colors, fonts, and metrics
- **`locale/`**: Multi-language support with JSON translation files
- **`utils/`**: Helper functions and utilities
- **`scripts/`**: Development automation scripts

## 🎨 Component Architecture

Components are organized by **what they are for**, not by technical granularity. There are two top-level buckets: `shared/` (generic, feature-agnostic UI) and `features/` (components and screens owned by a specific product feature).

### Shared UI (`components/shared/ui/`)
Reusable primitives like buttons, inputs, and text components. Import them from the `ui` barrel.

```tsx
import { Button } from "@/components/shared/ui";

<Button title="Click me" variant="primary" onPress={handlePress} />
```

### Layout (`components/shared/layout/`)
Navigation chrome (`AppHeader`, `AppTabBar`, `MainScreenOptions`) and the screen layout wrapper, `ScreenWrapper`.

Wrap every screen in `ScreenWrapper`. It renders the auth layout (logo header, auth padding) by default; pass `variant="main"` for main-flow screens.

```tsx
import { ScreenWrapper } from "@/components/shared/layout";

// Auth screen (default variant)
<ScreenWrapper justifyContent="space-between" isScrollable>
  {/* screen content */}
</ScreenWrapper>

// Main-flow screen
<ScreenWrapper variant="main">{/* screen content */}</ScreenWrapper>
```

| Prop | Default | Description |
|------|---------|-------------|
| `variant` | `"auth"` | `"auth"` renders the logo header and auth padding; `"main"` is the header-less main-flow layout |
| `justifyContent` | `"flex-start"` | Content alignment inside the wrapper |
| `style` | — | Extra container style |
| `paddingSize` | `"md"` | Horizontal padding — auth: `sm` 24 / `md` 32; main: `sm` 12 / `md` 16 |
| `paddingBlockSize` | `"md"` | Vertical padding, main variant only — `sm` 12 / `md` 24 |
| `isScrollable` | `false` | Enables scrolling of the screen content |
| `isStatusBarShown` | `false` | Auth variant only — pads the top by the status bar height instead of 10 |
| `showHeader` | `variant === "auth"` | Renders the logo header |
| `hasNoHorizontalSpacing` | `false` | Removes horizontal padding |
| `hasNoKeyboardVerticalOffset` | `false` | Drops the header-height keyboard offset |

### Wrappers (`components/shared/wrappers/`)
Container / overlay wrappers — `Card`, `Dialog`, `FlashList`, modals, and bottom sheets.

```tsx
import { Card } from "@/components/shared/wrappers";

<Card>{/* content */}</Card>
```

> `components/shared/wrappers/bottomsheets` registers the sheets at import time, so it is not re-exported from the barrel — import it directly where the sheets are needed: `import "@/components/shared/wrappers/bottomsheets";`

### Vendor (`components/shared/vendor/`)
Self-contained vendored or adapted third-party library code (`reactICX`). Keep app and product components out of it.

### Features (`components/features/<feature>/`)
Components and screens that belong to one product feature (e.g. `auth`, `main`, `notifications`). Co-locate everything for a feature under its folder: feature-scoped components in `components/`, full screens in `screens/`. **The feature's `index.ts` is its single entry point** — anything outside the feature folder (other features, `components/shared/*`, and `app/` route files) imports through that barrel, never through a deep path like `components/features/auth/screens/Login` or `components/features/auth/components/biometric`.

```tsx
// components/features/auth/index.ts
export { default as Biometric } from "./components/biometric";
// ...social buttons...

export { default as LoginScreen } from "./screens/Login";
// ...other auth screens, each with a `Screen` suffix on the alias...
```

```tsx
import { Biometric } from "@/components/features/auth";

<Biometric />
```

Full-screen implementations live in the feature's `screens/<ScreenName>/` subfolder. Each screen owns its `index.tsx` (plus a colocated `styles.ts` when it has styles), and is re-exported from the feature's `index.ts` with a `Screen` suffix on the barrel alias (`LoginScreen`, not `Login`) so screens read as visually distinct from plain feature components in the same barrel. The matching route file under `app/` stays a thin re-export **from the barrel** — never from `screens/` directly — so routing structure and screen implementation can evolve independently.

```tsx
// app/(auth)/login/index.tsx
export { LoginScreen as default } from "@/components/features/auth";
```

```tsx
// components/features/main/screens/Profile/index.tsx
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";

export default function Profile() {
  return <ScreenWrapper variant="main">{/* screen content */}</ScreenWrapper>;
}
```

> The plop `screen` generator (`npm run generate` → `screen`) keeps this wired automatically: it creates the screen under `components/features/<auth|main>/screens/`, adds its export to the feature's `index.ts`, and points the route at the barrel. See [PLOP_GENERATOR.md](PLOP_GENERATOR.md).

> Side-effect modules are the one exception to the barrel rule. `components/features/notifications/NotificationListenerContainer` calls `Notifications.setNotificationHandler` at import time, so it is not exported from the notifications barrel — import it by its deep path, only where the handler is wanted.

## 🌐 API Integration

The template includes a pre-configured API layer using RTK Query:

### Setting up your API
1. Configure your API domain in `apis/Domain.ts`
2. Define each feature's endpoints in `apis/services/<feature>/index.ts`
3. Co-locate that feature's request/response types in `apis/services/<feature>/types.ts`
   (cross-cutting types like `PaginatedResponse` stay in `apis/@types/`)

> Tip: scaffold the whole layer with `npx plop create <Name> integration`.

### Example API Service
```tsx
// apis/services/user/types.ts
export interface User {
  id: number;
  name: string;
}
```

```tsx
// apis/services/user/index.ts
import api from '@/apis';
import { User } from './types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation<User, { id: number } & Partial<User>>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
```

## 🌍 Internationalization

### Adding Translations
1. Add your translations to `locale/en.json` and `locale/ar.json`
2. Use the `useTranslation` hook in your components

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return <Text>{t('welcome.title')}</Text>;
};
```

### Auto-translation
Use the built-in script to automatically translate your content:
```bash
npm run translate
```

## 🔧 Development Scripts

### SVG Component Generation
Automatically generate React components from SVG files:
```bash
npm run generate-svg
```

Place your SVG files in `assets/svgs/` and run the script to generate typed React components.

### Translation Management
Sync translations across different language files:
```bash
npm run sync-translations
```

### Production Optimization
Remove console logs for production builds:
```bash
npm run remove-logs
```

## 📱 Building for Production

### Using EAS Build
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

### Local Builds
```bash
# Create production build
expo export

# Preview production build
npx serve dist
```

# Preview production build
npx serve dist
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request

### Development Guidelines

- Follow the existing code style and conventions
- Add TypeScript types for all new code
- Update translations when adding new text content
- Test your changes on both iOS and Android
- Write clear commit messages

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for providing an excellent development platform
- [Redux Toolkit](https://redux-toolkit.js.org/) for simplified state management
- [React Navigation](https://reactnavigation.org/) for routing solutions
- The open-source community for their valuable contributions

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Expo Router Documentation](https://docs.expo.dev/routing/introduction/)

---

**Happy coding! 🚀**
