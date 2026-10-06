# Code Generation with Plop

This template includes a Plop.js generator to help you quickly create components, screens, hooks, utilities, SVG icons, and API integrations with the proper folder structure and boilerplate code.

## Usage

Run the generator with:

```bash
npm run generate
```

## Available Generators

### Components

Creates a new component in the feature-based folder structure. You pick where it lives:

- **ui**: Generic, reusable UI primitives (`components/shared/ui/`)
- **layout**: Navigation chrome or screen-layout wrappers (`components/shared/layout/`)
- **wrappers**: Container / overlay wrappers (`components/shared/wrappers/`)
- **feature**: Belongs to a specific product feature — you'll be prompted for the feature name (`components/features/<feature>/components/`)

Each component includes:

- `index.tsx` - Component implementation (default export)
- `styles.ts` - StyleSheet
- `types.ts` - Props interface

Note: a **feature** component is not auto-registered in that feature's `index.ts` barrel — if it is used outside the feature folder, add an `export { default as ComponentName } from "./components/ComponentName";` line yourself so it stays reachable through the feature's single entry point.

### Screens

Creates a new screen following the feature-based architecture: the UI implementation lives under the owning feature's `screens/` folder in `components/features/`, `app/` only gets a thin route file that re-exports it, and the feature's `index.ts` barrel is that feature's **single entry point** — the only path anything outside the feature (including the route file) should import through.

- **Auth screens**: screen at `components/features/auth/screens/ScreenName/`, route at `app/(auth)/screenName/`
- **Main screens**: screen at `components/features/main/screens/ScreenName/`, route at `app/(main)/screenName/`

Generated/updated files:

- `components/features/<auth|main>/screens/ScreenName/index.tsx` - Screen component
- `components/features/<auth|main>/screens/ScreenName/styles.ts` - StyleSheet
- `components/features/<auth|main>/index.ts` - Auto-registered by appending `export { default as ScreenNameScreen } from "./screens/ScreenName";` (the `Screen` suffix on the barrel alias distinguishes screens from plain feature components)
- `app/(auth|main)/screenName/index.tsx` - Thin route re-export from the barrel (`export { ScreenNameScreen as default } from "@/components/features/<auth|main>";`)

The generated screen is wrapped in `ScreenWrapper` (`components/shared/layout/ScreenWrapper`). It renders the auth layout (logo header, auth padding) by default, so auth screens use `<ScreenWrapper>` and main screens are generated with `<ScreenWrapper variant="main">`.

Note: the route file is not added to any navigator for you — if the screen needs a `Stack.Screen` / tab entry, wire it up in the relevant `_layout.tsx`.

### Hooks

Creates a custom React hook in the `hooks/` folder:

- `useHookName.ts` - Custom hook with TypeScript interface

### Utils

Creates a utility function in the `utils/` folder:

- `utilName.ts` - Utility function with JSDoc comments

### SVG Icons

Creates an empty `react-native-svg` icon and registers it with the `Icon` component:

- `assets/icons/IconName.tsx` - Icon component (paste the SVG paths inside `<Svg>`)
- `components/shared/ui/Icon/list.ts` - Updated with the import and an `iconName: IconName` entry

### Integrations

Scaffolds an RTK Query service:

- `apis/services/<name>/types.ts` - Request/response interfaces
- `apis/services/<name>/index.ts` - List/detail/create/update/delete endpoints and generated hooks
- `apis/tagTypes.ts` - Updated with the `Name` and `Names` cache tags

## Example Usage

1. Run `npm run generate`
2. Choose what to create (component, screen, hook, util, svg, integration)
3. Follow the prompts for additional options
4. Files will be generated with proper folder structure and boilerplate code

Generators without follow-up prompts can skip the prompts entirely by passing the name and type, e.g. `npx plop create Order integration` or `npx plop create Cart hook` (the `use` prefix is added for you). Plop cannot bypass the conditional prompts (component location, feature name, screen type), so run components and screens interactively.

## Generated File Structure

### Component Example:

```
components/
├── shared/
│   └── ui/
│       └── Button/
│           ├── index.tsx
│           ├── styles.ts
│           └── types.ts
└── features/
    └── auth/
        └── components/
            └── LoginForm/
                ├── index.tsx
                ├── styles.ts
                └── types.ts
```

### Screen Example:

```
components/
└── features/
    └── auth/
        ├── index.ts         # export { default as LoginScreen } from "./screens/Login";  (single entry point)
        └── screens/
            └── Login/
                ├── index.tsx
                └── styles.ts
app/
└── (auth)/
    └── login/
        └── index.tsx       # export { LoginScreen as default } from "@/components/features/auth";
```

### Hook Example:

```
hooks/
└── useCustomHook.ts
```

### Util Example:

```
utils/
└── helperFunction.ts
```
