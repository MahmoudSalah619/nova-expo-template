# 🚀 Your Nova Expo App

A modern React Native application built with Expo 54, featuring a comprehensive development setup with TypeScript, navigation, state management, internationalization, and atomic design components.

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
- **[Atomic Design System](https://bradfrost.com/blog/post/atomic-web-design/)**: A methodology for creating design systems.
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
│   ├── 📁 @types/                 # API type definitions
│   ├── 📁 middlewares/            # API middlewares
│   └── 📁 services/               # API service endpoints
│
├── 📁 app/                        # App routing (Expo Router)
│   ├── 📄 _layout.tsx             # Root layout
│   ├── 📄 +not-found.tsx          # 404 page
│   ├── 📄 index.tsx               # Home/Landing page
│   ├── 📁 (auth)/                 # Authentication stack
│   │   ├── 📄 _layout.tsx         # Auth layout
│   │   ├── 📁 forgotPassword/     # Password reset screens
│   │   ├── 📁 login/              # Login screens
│   │   ├── 📁 signup/             # Registration screens
│   │   └── 📁 welcome/            # Welcome/onboarding
│   └── 📁 (main)/                 # Main app stack
│       ├── 📄 _layout.tsx         # Main layout
│       ├── 📁 (tabs)/             # Tab navigation
│       ├── 📁 screen1/            # Feature screens
│       ├── 📁 screen2/
│       └── 📁 screen3/
│
├── 📁 assets/                     # Static assets
│   ├── 📁 fonts/                  # Custom fonts
│   ├── 📁 icons/                  # Icon components
│   ├── 📁 images/                 # Image assets
│   └── 📁 svgs/                   # SVG components
│
├── 📁 components/                 # UI Components (Atomic Design)
│   ├── 📁 atoms/                  # Basic building blocks
│   │   ├── 📁 Button/             # Button component
│   │   ├── 📁 Input/              # Input component
│   │   ├── 📁 Text/               # Text component
│   │   └── 📄 index.ts            # Atom exports
│   ├── 📁 molecules/              # Component combinations
│   │   ├── 📁 common/             # Shared molecules
│   │   └── 📁 scoped/             # Feature-specific molecules
│   ├── 📁 organisms/              # Complex components
│   │   ├── 📁 common/             # Shared organisms
│   │   └── 📁 scoped/             # Feature-specific organisms
│   ├── 📁 templates/              # Page templates
│   └── 📁 wrappers/               # Higher-order components
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

- **`app/`**: Uses Expo Router for file-based routing with layout components
- **`components/`**: Follows Atomic Design methodology (atoms → molecules → organisms → templates)
- **`apis/`**: Centralized API layer with RTK Query for data fetching and caching
- **`redux/`**: State management using Redux Toolkit with separate slices
- **`hooks/`**: Custom React hooks for reusable logic
- **`constants/`**: App-wide constants including colors, fonts, and metrics
- **`locale/`**: Multi-language support with JSON translation files
- **`utils/`**: Helper functions and utilities
- **`scripts/`**: Development automation scripts

## 🎨 Component Architecture

This template follows the **Atomic Design** methodology:

### Atoms (`components/atoms/`)
Basic building blocks like buttons, inputs, and text components.

```tsx
import { Button } from '@/components/atoms';

<Button variant="primary" onPress={handlePress}>
  Click me
</Button>
```

### Molecules (`components/molecules/`)
Simple combinations of atoms that work together.

```tsx
import { SearchInput } from '@/components/molecules/common';

<SearchInput onSearch={handleSearch} placeholder="Search..." />
```

### Organisms (`components/organisms/`)
Complex components made up of molecules and atoms.

```tsx
import { UserProfile } from '@/components/organisms/common';

<UserProfile user={currentUser} onEdit={handleEdit} />
```

### Templates (`components/templates/`)
Page-level components that define layout structure.

## 🌐 API Integration

The template includes a pre-configured API layer using RTK Query:

### Setting up your API
1. Configure your API domain in `apis/Domain.ts`
2. Define your endpoints in `apis/services/`
3. Add TypeScript types in `apis/@types/`

### Example API Service
```tsx
// apis/services/user.ts
import { api } from '../index';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    updateUser: builder.mutation({
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
- [Atomic Design Methodology](https://bradfrost.com/blog/post/atomic-web-design/)

---

**Happy coding! 🚀**
