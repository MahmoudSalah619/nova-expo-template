#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { spawnSync } = require("child_process");
const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();

program
  .version(require("../package.json").version)
  .arguments("[project-directory]")
  .action(async (projectDir) => {
    try {
      const answers = await promptUser(projectDir);
      const targetPath = await setupProjectDirectory(answers);
      await copyTemplateFiles(targetPath);
      await processPackageJson(targetPath, answers);
      await processAppJson(targetPath, answers);

      console.log("Installing dependencies...");
      installDependencies(targetPath);

      if (answers.eslint) {
        await setupESLint(targetPath, answers);
      }

      if (answers.husky) {
        await setupHusky(targetPath);
      }

      if (answers.sentry) {
        await configureSentry(targetPath, answers);
      }

      await handleTranslationSetup(targetPath, answers);

      if (answers.eslint) {
        console.log("Running ESLint to fix issues...");
        spawnSync(
          "npx",
          ["eslint", ".", "--ext", ".js,.jsx,.ts,.tsx", "--fix"],
          {
            cwd: targetPath,
            stdio: "inherit",
            shell: true,
          }
        );
      }
      console.log(
        `\n✅ Thank you for using nova! Your project is ready at ${targetPath}`
      );
      console.log("\nNext steps:");
      console.log(`cd ${answers.projectName}`);
      console.log("npm run dev");
    } catch (error) {
      console.error("Error creating project:", error);
      process.exit(1);
    }
  })
  .parse(process.argv);

async function promptUser(projectDir) {
  return await prompt([
    {
      type: "input",
      name: "projectName",
      message: "What's the name of the project?",
      required: true,
      default: projectDir,
    },
    {
      type: "confirm",
      name: "translation",
      message: "Does your app support multiple languages?",
      default: true,
    },
    {
      type: "confirm",
      name: "eslint",
      message: "Do you want ESLint with Prettier?",
      default: true,
    },
    {
      type: "confirm",
      name: "husky",
      message: "Do you want Husky with lint-staged?",
      default: true,
      when: (answers) => answers.eslint,
    },
    {
      type: "confirm",
      name: "sentry",
      message: "Do you want to add Sentry error monitoring?",
      default: true,
    },
    {
      type: "input",
      name: "sentryDsn",
      message: "Enter your Sentry DSN (leave blank to configure later):",
      when: (answers) => answers.sentry,
      validate: (input) => {
        if (input === "" || input.startsWith("https://")) return true;
        return "Please enter a valid Sentry DSN (starting with https://) or leave blank";
      },
    },
  ]);
}

async function setupProjectDirectory(answers) {
  const targetPath = path.join(process.cwd(), answers.projectName);
  console.log(`Creating ${answers.projectName}...`);
  await fs.ensureDir(targetPath);
  return targetPath;
}

async function copyTemplateFiles(targetPath) {
  const templatePath = path.join(__dirname, "../template");
  console.log("Copying template files...");
  await fs.copy(templatePath, targetPath);
}

async function processPackageJson(targetPath, answers) {
  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = await fs.readFile(packageJsonPath, "utf-8");
  const renderedPackageJson = require("ejs").render(packageJson, {
    projectName: answers.projectName,
    eslint: answers.eslint,
    husky: answers.husky,
  });
  await fs.writeFile(packageJsonPath, renderedPackageJson);
}

async function processAppJson(targetPath, answers) {
  const appJsonPath = path.join(targetPath, "app.json");
  if (await fs.pathExists(appJsonPath)) {
    const appJson = await fs.readFile(appJsonPath, "utf-8");
    const parsedAppJson = JSON.parse(appJson);
    parsedAppJson.expo = parsedAppJson.expo || {};
    parsedAppJson.expo.name = answers.projectName;
    parsedAppJson.expo.slug = answers.projectName
      .toLowerCase()
      .replace(/\s+/g, "-");
    // Auto-generate bundleIdentifier and package
    parsedAppJson.expo.ios = {
      bundleIdentifier: `com.nova.${answers.projectName
        .toLowerCase()
        .replace(/\s+/g, "")}`,
    };
    parsedAppJson.expo.android = {
      package: `com.nova.${answers.projectName
        .toLowerCase()
        .replace(/\s+/g, "")}`,
    };
    await fs.writeFile(appJsonPath, JSON.stringify(parsedAppJson, null, 2));
  }
}

function installDependencies(targetPath) {
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  spawnSync(npmCmd, ["install"], {
    cwd: targetPath,
    stdio: "inherit",
    shell: true,
  });
}

async function handleTranslationSetup(targetPath, answers) {
  if (!answers.translation) {
    // Delete locale folder if translation is false
    const localePath = path.join(targetPath, "locale");
    if (await fs.pathExists(localePath)) {
      await fs.remove(localePath);
    }

    // Update Text component to remove translation logic
    const textComponentPath = path.join(
      targetPath,
      "components/atoms/Text/index.tsx"
    );

    if (await fs.pathExists(textComponentPath)) {
      let textContent = await fs.readFile(textComponentPath, "utf-8");

      // Remove the useTranslation import
      textContent = textContent.replace(
        /import\s*{\s*useTranslation\s*}\s*from\s*"react-i18next";\s*\n/g,
        ""
      );

      // Remove the t function usage
      textContent = textContent.replace(
        /const\s*{\s*t\s*}\s*=\s*useTranslation\(\s*\);\s*\n/g,
        ""
      );

      // Replace the translation logic with direct children
      textContent = textContent.replace(
        /\{autoTranslate \? t\(String\(rest\.children\)\) : rest\.children\}/g,
        "{rest.children}"
      );

      // Remove autoTranslate from props
      textContent = textContent.replace(
        /,\s*autoTranslate\s*=\s*true,\s*\n/g,
        ",\n"
      );

      await fs.writeFile(textComponentPath, textContent);
    }

    // Update Text types to remove autoTranslate
    const textTypesPath = path.join(
      targetPath,
      "components/atoms/Text/types.ts"
    );
    if (await fs.pathExists(textTypesPath)) {
      let typesContent = await fs.readFile(textTypesPath, "utf-8");
      typesContent = typesContent.replace(/autoTranslate\?: boolean;\n/g, "");
      await fs.writeFile(textTypesPath, typesContent);
    }

    // Update ThemedView component to remove translation logic
    const themedViewComponentPath = path.join(
      targetPath,
      "components/atoms/ThemedView/index.tsx"
    );

    if (await fs.pathExists(themedViewComponentPath)) {
      let themedViewContent = await fs.readFile(
        themedViewComponentPath,
        "utf-8"
      );

      // Remove the import
      themedViewContent = themedViewContent.replace(
        /import { useTranslation } from "react-i18next";\n/g,
        ""
      );

      // Remove the i18n usage and direction style
      themedViewContent = themedViewContent.replace(
        /const { i18n } = useTranslation\(\);\n/g,
        ""
      );
      themedViewContent = themedViewContent.replace(
        /style=\{\[\{ backgroundColor, direction: i18n.dir\(\) \}, style\]\}/g,
        "style={[{ backgroundColor }, style]}"
      );

      await fs.writeFile(themedViewComponentPath, themedViewContent);
    }

    // Update Input component to remove translation logic
    const inputComponentPath = path.join(
      targetPath,
      "components/atoms/Input/index.tsx"
    );

    if (await fs.pathExists(inputComponentPath)) {
      let inputContent = await fs.readFile(inputComponentPath, "utf-8");

      // Remove the import
      inputContent = inputContent.replace(
        /import { useTranslation } from "react-i18next";\n/g,
        ""
      );

      // Remove the i18n usage and text alignment logic
      inputContent = inputContent.replace(
        /const { i18n } = useTranslation\(\);\n/g,
        ""
      );
      inputContent = inputContent.replace(
        /\{ textAlign: i18n.dir\(\) === "rtl" \? "right" : "left" as "auto" \| "center" \| "right" \| "left" \| "justify" \| undefined \},/g,
        ""
      );

      await fs.writeFile(inputComponentPath, inputContent);
    }

    // Update profile screen to remove translation logic
    const profilePath = path.join(targetPath, "app/(main)/(tabs)/profile.tsx");
    if (await fs.pathExists(profilePath)) {
      let profileContent = await fs.readFile(profilePath, "utf-8");

      // Remove the i18n import
      profileContent = profileContent.replace(
        /import\s+i18n\s+from\s+"@\/locale";\s*\n/g,
        ""
      );

      // Remove the changeLanguage function
      profileContent = profileContent.replace(
        /const\s+changeLanguage\s*=\s*async\s*\(lang:\s*"en"\s*\|\s*"ar"\)\s*=>\s*{\s*\n\s*try\s*{\s*\n\s*await\s*i18n\.changeLanguage\(lang\);\s*\n\s*}\s*catch\s*\(error\)\s*{\s*\n\s*console\.error\("Language\s+change\s+failed",\s*error\);\s*\n\s*}\s*\n\s*};\s*\n/g,
        ""
      );

      // Remove the language change buttons
      profileContent = profileContent.replace(
        /<View>\s*\n\s*<Button\s*\n\s*title="Change\s+Language\s+To\s+AR"\s*\n\s*onPress=\{\s*\(\)\s*=>\s*changeLanguage\("ar"\)\s*\}\s*\n\s*\/>\s*\n\s*<\/View>\s*\n\s*<View>\s*\n\s*<Button\s*\n\s*title="Change\s+Language\s+To\s+EN"\s*\n\s*onPress=\{\s*\(\)\s*=>\s*changeLanguage\("en"\)\s*\}\s*\n\s*\/>\s*\n\s*<\/View>\s*\n/g,
        ""
      );

      await fs.writeFile(profilePath, profileContent);
    }

    return;
  }

  // Install translation-related packages
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const translationPackages = ["i18next", "react-i18next"];

  console.log("\nInstalling translation dependencies...");
  spawnSync(npmCmd, ["install", ...translationPackages], {
    cwd: targetPath,
    stdio: "inherit",
    shell: true,
  });
}

async function setupESLint(targetPath, answers) {
  console.log("\nSetting up ESLint and Prettier...");

  const eslintPackages = [
    "eslint",
    "eslint-config-expo",
    "prettier",
    "eslint-plugin-prettier",
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react-native",
    "eslint-plugin-import",
    "eslint-config-prettier",
  ];

  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  spawnSync(npmCmd, ["install", "--save-dev", ...eslintPackages], {
    cwd: targetPath,
    stdio: "inherit",
    shell: true,
  });

  const eslintConfig = `// https://docs.expo.dev/guides/using-eslint/
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactNativePlugin = require('eslint-plugin-react-native');
const prettierPlugin = require('eslint-plugin-prettier');
const globalsPackage = require('globals');
const typescriptParser = require('@typescript-eslint/parser');
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const { node, es2021 } = globalsPackage;

const cleanGlobals = Object.fromEntries(
  Object.entries({ ...node, ...es2021 }).filter(([key]) => !/\s/.test(key))
);

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  // TypeScript config
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: cleanGlobals,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
    },

    rules: {
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unused-prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/sort-styles': 'off',
    },
  },

  // React & React Native config
  {
    files: ['**/*.tsx', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unused-prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/sort-styles': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },

  // Prettier config
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          printWidth: 100,
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  },

  // Global rules
  {
    ignores: ['/dist/*'],
    rules: {
      'no-shadow': 'off',
      camelcase: 'off',
      'linebreak-style': 'off',
    },
  },
]);
`;

  await fs.writeFile(path.join(targetPath, "eslint.config.js"), eslintConfig);

  const prettierConfig = JSON.stringify(
    {
      trailingComma: "es5",
      tabWidth: 2,
      semi: true,
      singleQuote: true,
      printWidth: 100,
      bracketSpacing: true,
      arrowParens: "always",
      endOfLine: "auto",
    },
    null,
    2
  );

  await fs.writeFile(path.join(targetPath, ".prettierrc"), prettierConfig);

  const packageJsonPath = path.join(targetPath, "package.json");
  const updatedPackageJson = JSON.parse(
    await fs.readFile(packageJsonPath, "utf8")
  );
  updatedPackageJson.scripts = updatedPackageJson.scripts || {};
  updatedPackageJson.scripts.lint = "eslint . --ext .js,.jsx,.ts,.tsx";
  updatedPackageJson.scripts["lint:fix"] =
    "eslint . --ext .js,.jsx,.ts,.tsx --fix";

  await fs.writeFile(
    packageJsonPath,
    JSON.stringify(updatedPackageJson, null, 2)
  );
  console.log("\nESLint and Prettier setup complete!");
}

async function setupHusky(targetPath) {
  console.log("\nSetting up Husky with lint-staged...");

  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  spawnSync(npmCmd, ["install", "--save-dev", "husky", "lint-staged"], {
    cwd: targetPath,
    stdio: "inherit",
    shell: true,
  });

  spawnSync(npmCmd, ["exec", "husky", "init"], {
    cwd: targetPath,
    stdio: "inherit",
    shell: true,
  });

  const packageJsonPath = path.join(targetPath, "package.json");
  const updatedPackageJson = JSON.parse(
    await fs.readFile(packageJsonPath, "utf8")
  );
  updatedPackageJson.scripts = updatedPackageJson.scripts || {};
  updatedPackageJson.scripts.prepare = "husky install";
  updatedPackageJson["lint-staged"] = {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  };

  await fs.writeFile(
    packageJsonPath,
    JSON.stringify(updatedPackageJson, null, 2)
  );

  console.log("Husky git hooks configured successfully.");
}

async function configureSentry(targetPath, answers) {
  console.log("\nConfiguring Sentry...");

  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  spawnSync(
    npmCmd,
    [
      "install",
      "@sentry/react-native@^5.9.0",
      "sentry-expo",
      "expo-constants",
      "expo-device",
      "@sentry/webpack-plugin",
    ],
    {
      cwd: targetPath,
      stdio: "inherit",
      shell: true,
    }
  );

  const appJsonPath = path.join(targetPath, "app.json");
  const appJson = await fs.readJson(appJsonPath);

  appJson.expo.plugins ||= [];
  appJson.expo.plugins.push([
    "sentry-expo",
    {
      organization: answers.projectName.toLowerCase().replace(/\s+/g, "-"),
      project: answers.projectName.toLowerCase().replace(/\s+/g, "-"),
      url: "https://sentry.io",
    },
  ]);
  await fs.writeJson(appJsonPath, appJson, { spaces: 2 });

  // Remove the existing index.tsx file if it exists
  const existingIndexPath = path.join(targetPath, "app/index.tsx");
  if (await fs.pathExists(existingIndexPath)) {
    await fs.remove(existingIndexPath);
  }

  const initialScreenPath = path.join(targetPath, "app/index.tsx");
  const initialScreenContent = `import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import useInitialRouting from "../hooks/useInitialRouting";
import { Redirect, RelativePathString } from "expo-router";
import * as Sentry from "@sentry/react-native";

const InitialScreen = () => {
  const { targetPath } = useInitialRouting();

  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN || "${
      answers.sentryDsn || "YOUR_DSN_HERE"
    }",
    enableNative: true,
    enableNativeNagger: false,
    debug: __DEV__,
    environment: __DEV__ ? "development" : "production",
    integrations: [new Sentry.ReactNativeTracing()],
    tracesSampleRate: 1.0,
  });

  if (!targetPath) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Redirect href={targetPath as RelativePathString} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InitialScreen;`;

  await fs.writeFile(initialScreenPath, initialScreenContent);

  console.log("✅ Sentry successfully configured in index.tsx");

  if (!answers.sentryDsn) {
    console.log(
      "⚠️  Remember to add your Sentry DSN in index.tsx and app.json"
    );
  }
}
