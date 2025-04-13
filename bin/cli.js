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
      "components",
      "atoms",
      "text",
      "index.tsx"
    );
    if (await fs.pathExists(textComponentPath)) {
      let textContent = await fs.readFile(textComponentPath, "utf-8");

      // Remove the import
      textContent = textContent.replace(
        /import { t } from "@\/locale";\n/g,
        ""
      );

      // Remove the t function usage
      textContent = textContent.replace(
        /const { t } = useAutoCompleteTranslation\(\);\n\n/g,
        ""
      );

      // Replace the translation logic with direct children
      textContent = textContent.replace(
        /\{autoTranslate \? t\(String\(rest\.children\)\) : rest\.children\}/g,
        "{rest.children}"
      );

      // Remove autoTranslate from props
      textContent = textContent.replace(
        /,\n\s+autoTranslate = true,\n/g,
        ",\n"
      );

      await fs.writeFile(textComponentPath, textContent);
    }

    // Update Text types to remove autoTranslate
    const textTypesPath = path.join(
      targetPath,
      "components",
      "atoms",
      "text",
      "types.ts"
    );
    if (await fs.pathExists(textTypesPath)) {
      let typesContent = await fs.readFile(textTypesPath, "utf-8");
      typesContent = typesContent.replace(/autoTranslate\?: boolean;\n/g, "");
      await fs.writeFile(textTypesPath, typesContent);
    }

    return;
  }

  // Install translation-related packages
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const translationPackages = ["expo-file-system", "xlsx", "i18n-js"];

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
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["@typescript-eslint", "react", "react-native", "prettier"],
  ignorePatterns: ["/dist/*"],
  rules: {
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".ts", ".tsx"],
      },
    ],
    "@typescript-eslint/no-use-before-define": ["warn"],
    "import/extensions": 0,
    "react/prop-types": 0,
    "no-shadow": "off",
    camelcase: 0,
    "react-hooks/exhaustive-deps": ["warn"],
    "import/no-extraneous-dependencies": 0,
    "react-native/no-raw-text": 0,
    "react/jsx-props-no-spreading": 0,
    "linebreak-style": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-comment": 0,
    "react/no-unused-prop-types": 0,
    "@typescript-eslint/no-shadow": ["error"],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        endOfLine: "auto",
      },
    ],
    "react-native/sort-styles": 0,
  },
};`;

  await fs.writeFile(path.join(targetPath, ".eslintrc.js"), eslintConfig);

  const prettierConfig = JSON.stringify(
    {
      trailingComma: "es5",
      tabWidth: 2,
      semi: true,
      singleQuote: false,
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

  spawnSync("npx", ["eslint", ".", "--ext", ".js,.jsx,.ts,.tsx", "--fix"], {
    cwd: targetPath,
    stdio: "inherit",
    shell: true,
  });

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
  console.log("\nConfiguring Sentry with routing support...");

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

  const initialScreenPath = path.join(targetPath, "app/index.tsx");
  const initialScreenContent = `import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import useInitialRouting from "../hooks/useInitialRouting";
import { Redirect, RelativePathString } from "expo-router";
import * as Sentry from "@sentry/react-native";
${
  answers.translation &&
  `import useFetchTranslation from "@/hooks/useFetchTranslation"`
}

const InitialScreen = () => {
  const { targetPath } = useInitialRouting();
  ${answers.translation && `const { isLoading } = useFetchTranslation();`}

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

  if (${answers.translation ? `!targetPath || isLoading` : `!targetPath`}) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Redirect href={targetPath as RelativePathString } />;
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
