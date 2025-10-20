# Code Generation with Plop

This template includes a Plop.js generator to help you quickly create components, screens, hooks, and utilities with the proper folder structure and boilerplate code.

## Usage

Run the generator with:

```bash
npm run generate
```

## Available Generators

### Components

Creates a new component in the appropriate folder structure:

- **Atoms**: Basic UI components (`components/atoms/`)
- **Molecules**: Composition of atoms (`components/molecules/common/` or `components/molecules/scoped/`)
- **Organisms**: Complex components (`components/organisms/common/` or `components/organisms/scoped/`)
- **Templates**: Page-level templates (`components/templates/`)
- **Wrappers**: Wrapper components (`components/wrappers/`)

Each component includes:
- `index.tsx` - Export file
- `ComponentName.tsx` - Main component file
- `styles.ts` - StyleSheet

### Screens

Creates a new screen in the appropriate app folder:

- **Auth screens**: `app/(auth)/screenName/`
- **Main screens**: `app/(main)/screenName/`

Each screen includes:
- `index.tsx` - Export file
- `ScreenNameScreen.tsx` - Main screen component
- `styles.ts` - StyleSheet

### Hooks

Creates a custom React hook in the `hooks/` folder:

- `useHookName.ts` - Custom hook with TypeScript interface

### Utils

Creates a utility function in the `utils/` folder:

- `utilName.ts` - Utility function with JSDoc comments

## Example Usage

1. Run `npm run generate`
2. Choose what to create (component, screen, hook, util)
3. Follow the prompts for additional options
4. Files will be generated with proper folder structure and boilerplate code

## Generated File Structure

### Component Example:
```
components/
├── atoms/
│   └── Button/
│       ├── index.tsx
│       ├── Button.tsx
│       └── styles.ts
```

### Screen Example:
```
app/
├── (auth)/
│   └── login/
│       ├── index.tsx
│       ├── LoginScreen.tsx
│       └── styles.ts
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