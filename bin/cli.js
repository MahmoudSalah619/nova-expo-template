#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { spawnSync } = require("child_process");
const inquirer = require("inquirer");
const prompt = inquirer.createPromptModule();

const TEMPLATE_PATH = path.join(__dirname, "../template");
const NPM_CMD = process.platform === "win32" ? "npm.cmd" : "npm";

// Present in a local checkout of the template but never part of a generated project
const TEMPLATE_COPY_EXCLUDES = ["node_modules", ".expo", "expo-env.d.ts"];

// npm strips `.gitignore` from published packages, so the template ships it without the dot
const RENAMED_DOTFILES = { gitignore: ".gitignore" };

// `.agents/` is the source of truth; tool folders mirror it through symlinks that npm drops on publish
const AGENT_SOURCE_DIR = ".agents";
const AGENT_MIRROR_DIRS = [".agent", ".claude", ".codex", ".cursor"];
const AGENT_MIRRORED_FOLDERS = ["rules", "skills"];

// Code wrapped in `// i18n:start` ... `// i18n:end` (or the `{/* */}` JSX form) is translation-only
const I18N_BLOCK_REGEX =
  /^[ \t]*(?:\/\/|\{\/\*)[ \t]*i18n:start.*\r?\n([\s\S]*?)^[ \t]*(?:\/\/|\{\/\*)[ \t]*i18n:end.*\r?\n/gm;
const SOURCE_FILE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];

const TRANSLATION_PACKAGES = ["i18next", "react-i18next"];
const TRANSLATION_ONLY_PATHS = [
  "locale",
  "@types/TranslationKeyEnum.ts",
  "constants/TranslationConfig.ts",
  "constants/dayjsArabicLocalization.ts",
  "hooks/useFetchTranslation.ts",
  "scripts/translate.js",
  "scripts/sync-translations.js",
  ...[AGENT_SOURCE_DIR, ...AGENT_MIRROR_DIRS].flatMap((dir) => [
    `${dir}/commands/translate.md`,
    `${dir}/commands/sync-translations.md`,
    `${dir}/rules/translation-i18n.mdc`,
  ]),
];

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
      // Runs before install so dropped translation packages are never installed
      await handleTranslationSetup(targetPath, answers);

      console.log("Installing dependencies...");
      installDependencies(targetPath);

      if (answers.eslint) {
        await setupESLint(targetPath);
      }

      if (answers.husky) {
        await setupHusky(targetPath);
      }

      if (answers.sentry) {
        await configureSentry(targetPath, answers);
      }

      if (answers.eslint) {
        console.log("Running ESLint to fix issues...");
        run("npx", ["eslint", ".", "--fix"], targetPath);
      }
      console.log(
        `\n✅ Thank you for using nova! Your project is ready at ${targetPath}`
      );
      console.log("\nNext steps:");
      console.log(`cd ${answers.projectName}`);
      console.log("npm start");
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
      validate: validateProjectName,
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

function validateProjectName(input) {
  const name = (input || "").trim();
  if (!name) return "Project name is required";
  if (!/^[a-zA-Z0-9][\w.-]*$/.test(name)) {
    return "Use letters, numbers, dots, dashes, or underscores (must start with a letter or number)";
  }
  const targetPath = path.join(process.cwd(), name);
  if (fs.existsSync(targetPath) && fs.readdirSync(targetPath).length > 0) {
    return `Directory "${name}" already exists and is not empty`;
  }
  return true;
}

async function setupProjectDirectory(answers) {
  const targetPath = path.join(process.cwd(), answers.projectName);
  console.log(`Creating ${answers.projectName}...`);
  await fs.ensureDir(targetPath);
  return targetPath;
}

async function copyTemplateFiles(targetPath) {
  console.log("Copying template files...");
  await fs.copy(TEMPLATE_PATH, targetPath, {
    filter: (src) => {
      const [topLevelEntry] = path.relative(TEMPLATE_PATH, src).split(path.sep);
      return !TEMPLATE_COPY_EXCLUDES.includes(topLevelEntry);
    },
  });

  for (const [from, to] of Object.entries(RENAMED_DOTFILES)) {
    const fromPath = path.join(targetPath, from);
    if (await fs.pathExists(fromPath)) {
      await fs.move(fromPath, path.join(targetPath, to), { overwrite: true });
    }
  }

  await restoreAgentMirrors(targetPath);
}

async function restoreAgentMirrors(targetPath) {
  const sourceRoot = path.join(targetPath, AGENT_SOURCE_DIR);
  if (!(await fs.pathExists(sourceRoot))) return;

  for (const mirrorDir of AGENT_MIRROR_DIRS) {
    if (!(await fs.pathExists(path.join(targetPath, mirrorDir)))) continue;

    for (const folder of AGENT_MIRRORED_FOLDERS) {
      const sourceFolder = path.join(sourceRoot, folder);
      if (!(await fs.pathExists(sourceFolder))) continue;

      const mirrorFolder = path.join(targetPath, mirrorDir, folder);
      await fs.ensureDir(mirrorFolder);

      for (const entry of await fs.readdir(sourceFolder)) {
        const linkPath = path.join(mirrorFolder, entry);
        if (await lpathExists(linkPath)) continue;

        try {
          await fs.symlink(path.join("..", "..", AGENT_SOURCE_DIR, folder, entry), linkPath);
        } catch {
          // Symlinks need extra privileges on Windows; a copy keeps the mirror usable
          await fs.copy(path.join(sourceFolder, entry), linkPath);
        }
      }
    }
  }
}

async function lpathExists(filePath) {
  try {
    await fs.lstat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function processPackageJson(targetPath, answers) {
  const ejs = require("ejs");
  const templateData = { projectName: toSlug(answers.projectName) };

  for (const file of ["package.json", "package-lock.json"]) {
    const filePath = path.join(targetPath, file);
    if (!(await fs.pathExists(filePath))) continue;
    const content = await fs.readFile(filePath, "utf-8");
    await fs.writeFile(filePath, ejs.render(content, templateData));
  }
}

async function processAppJson(targetPath, answers) {
  const appJsonPath = path.join(targetPath, "app.json");
  if (!(await fs.pathExists(appJsonPath))) return;

  const appJson = await fs.readJson(appJsonPath);
  const expo = appJson.expo || {};
  const appIdentifier = `com.nova.${toIdentifierSegment(answers.projectName)}`;

  appJson.expo = {
    ...expo,
    name: answers.projectName,
    slug: toSlug(answers.projectName),
    // Merge so template settings (infoPlist, adaptiveIcon, ...) survive
    ios: { ...expo.ios, bundleIdentifier: appIdentifier },
    android: { ...expo.android, package: appIdentifier },
  };
  await fs.writeJson(appJsonPath, appJson, { spaces: 2 });
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
}

function toIdentifierSegment(name) {
  const segment = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Android package segments must start with a letter
  return /^[a-z]/.test(segment) ? segment : `app${segment}`;
}

function run(command, args, cwd) {
  return spawnSync(command, args, { cwd, stdio: "inherit", shell: true });
}

function installDependencies(targetPath) {
  run(NPM_CMD, ["install"], targetPath);
}

async function handleTranslationSetup(targetPath, answers) {
  const sourceFiles = await listSourceFiles(targetPath);

  if (answers.translation) {
    // Keep the translation code, only drop the marker comments
    for (const filePath of sourceFiles) {
      await transformFile(filePath, (content) => content.replace(I18N_BLOCK_REGEX, "$1"));
    }
    return;
  }

  console.log("\nRemoving translation support...");

  for (const filePath of sourceFiles) {
    await transformFile(filePath, (content) =>
      content
        .replace(I18N_BLOCK_REGEX, "")
        .replace(/\s+autoTranslate=\{false\}/g, "")
    );
  }

  await replaceInFile(targetPath, "components/shared/ui/Text/Base/index.tsx", [
    [/import\s*{\s*useTranslation\s*}\s*from\s*"react-i18next";\r?\n/, ""],
    [/[ \t]*const\s*{\s*t\s*}\s*=\s*useTranslation\(\s*\);\r?\n/, ""],
    [/[ \t]*autoTranslate\s*=\s*true,\r?\n/, ""],
    [/\{autoTranslate \? t\(String\(rest\.children\)\) : rest\.children\}/, "{rest.children}"],
  ]);

  await replaceInFile(targetPath, "components/shared/ui/Text/Base/types.ts", [
    [/[ \t]*autoTranslate\?: boolean;\r?\n/, ""],
  ]);

  await replaceInFile(targetPath, "components/shared/ui/ThemedView/index.tsx", [
    [/import\s*{\s*useTranslation\s*}\s*from\s*"react-i18next";\r?\n/, ""],
    [/[ \t]*const\s*{\s*i18n\s*}\s*=\s*useTranslation\(\);\r?\n/, ""],
    [/,\s*direction:\s*i18n\.dir\(\)\s*\|\|\s*"ltr"/, ""],
  ]);

  await replaceInFile(targetPath, "components/shared/ui/Input/index.tsx", [
    [/import\s*{\s*t\s*}\s*from\s*"i18next";\r?\n/, ""],
    [/\$\{t\(placeholder\)\}/, "${placeholder}"],
  ]);

  await replaceInFile(targetPath, "components/shared/ui/DropDown/index.tsx", [
    [/import\s+i18n\s+from\s+"@\/locale";\r?\n/, ""],
    [/i18n\.t\("CHOOSE"\)/, '"Choose"'],
  ]);

  // TouchableOpacity is only used by the (removed) language switcher
  await replaceInFile(targetPath, "components/features/main/screens/Profile/index.tsx", [
    [/import\s*{\s*TouchableOpacity,\s*View\s*}\s*from\s*"react-native";/, 'import { View } from "react-native";'],
  ]);

  for (const relativePath of TRANSLATION_ONLY_PATHS) {
    await fs.remove(path.join(targetPath, relativePath));
  }

  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);
  const dependencies = { ...packageJson.dependencies };
  TRANSLATION_PACKAGES.forEach((name) => delete dependencies[name]);
  await fs.writeJson(packageJsonPath, { ...packageJson, dependencies }, { spaces: 2 });

  await warnOnLeftoverTranslationImports(targetPath);
}

async function listSourceFiles(rootPath) {
  const files = [];
  for (const entry of await fs.readdir(rootPath, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const entryPath = path.join(rootPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listSourceFiles(entryPath)));
    } else if (SOURCE_FILE_EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }
  return files;
}

async function transformFile(filePath, transform) {
  const content = await fs.readFile(filePath, "utf-8");
  const updated = transform(content);
  if (updated !== content) {
    await fs.writeFile(filePath, updated);
  }
}

// Warns instead of failing so a template change surfaces clearly without aborting the setup
async function replaceInFile(targetPath, relativePath, replacements) {
  const filePath = path.join(targetPath, relativePath);
  if (!(await fs.pathExists(filePath))) {
    console.warn(`⚠️  ${relativePath} not found, skipping its update`);
    return;
  }

  let content = await fs.readFile(filePath, "utf-8");
  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(content)) {
      console.warn(`⚠️  ${relativePath}: pattern ${pattern} not found, the template may have changed`);
      continue;
    }
    content = content.replace(pattern, replacement);
  }
  await fs.writeFile(filePath, content);
}

async function warnOnLeftoverTranslationImports(targetPath) {
  const leftoverImport = /from\s+["'](?:i18next|react-i18next|@\/locale[^"']*)["']/;
  for (const filePath of await listSourceFiles(targetPath)) {
    const content = await fs.readFile(filePath, "utf-8");
    if (leftoverImport.test(content)) {
      console.warn(
        `⚠️  ${path.relative(targetPath, filePath)} still imports translation code; remove it manually`
      );
    }
  }
}

async function setupESLint(targetPath) {
  console.log("\nSetting up ESLint and Prettier...");

  const eslintPackages = [
    // eslint-plugin-react, -import and -react-native don't support ESLint 10 yet
    "eslint@^9",
    "eslint-config-expo",
    "globals",
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

  run(NPM_CMD, ["install", "--save-dev", ...eslintPackages], targetPath);

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
  Object.entries({ ...node, ...es2021 }).filter(([key]) => !/\\s/.test(key))
);

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'plop-templates/*'],
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

  // Flat config (ESLint 9+) rejects `--ext`; file types come from eslint.config.js
  await updatePackageJson(targetPath, (packageJson) => ({
    ...packageJson,
    scripts: {
      ...packageJson.scripts,
      lint: "eslint .",
      "lint:fix": "eslint . --fix",
    },
  }));
  console.log("\nESLint and Prettier setup complete!");
}

async function updatePackageJson(targetPath, update) {
  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = await fs.readJson(packageJsonPath);
  await fs.writeJson(packageJsonPath, update(packageJson), { spaces: 2 });
}

function ensureGitRepository(targetPath) {
  const insideRepo = spawnSync("git", ["rev-parse", "--is-inside-work-tree"], {
    cwd: targetPath,
    stdio: "ignore",
  });
  if (insideRepo.status === 0) return true;

  const init = spawnSync("git", ["init"], { cwd: targetPath, stdio: "inherit" });
  return init.status === 0;
}

async function setupHusky(targetPath) {
  console.log("\nSetting up Husky with lint-staged...");

  // Husky installs hooks into .git, so the project must be a repository first
  if (!ensureGitRepository(targetPath)) {
    console.warn("⚠️  git is not available; skipping Husky. Run `git init && npx husky init` later.");
    return;
  }

  run(NPM_CMD, ["install", "--save-dev", "husky", "lint-staged"], targetPath);
  // Adds the `prepare: husky` script and points git at .husky/
  run(NPM_CMD, ["exec", "husky", "init"], targetPath);

  // `husky init` defaults the hook to `npm test`, which runs jest in watch mode and never exits
  await fs.outputFile(path.join(targetPath, ".husky/pre-commit"), "npx lint-staged\n");

  await updatePackageJson(targetPath, (packageJson) => ({
    ...packageJson,
    "lint-staged": {
      "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    },
  }));

  console.log("Husky git hooks configured successfully.");
}

async function configureSentry(targetPath, answers) {
  console.log("\nConfiguring Sentry...");

  run(
    NPM_CMD,
    ["install", "@sentry/react-native@^8.14.1", "expo-constants", "expo-device"],
    targetPath
  );

  const appJsonPath = path.join(targetPath, "app.json");
  const appJson = await fs.readJson(appJsonPath);
  const sentrySlug = toSlug(answers.projectName);

  appJson.expo.plugins = [
    ...(appJson.expo.plugins || []),
    [
      "@sentry/react-native/expo",
      { organization: sentrySlug, project: sentrySlug, url: "https://sentry.io" },
    ],
  ];
  await fs.writeJson(appJsonPath, appJson, { spaces: 2 });

  // Initialise once at module scope in the root layout, and wrap it so Sentry captures render errors
  const sentryInit = `Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN || ${JSON.stringify(answers.sentryDsn || "")},
  debug: __DEV__,
  environment: __DEV__ ? "development" : "production",
  integrations: [Sentry.reactNativeTracingIntegration()],
  tracesSampleRate: 1.0,
});

`;

  await replaceInFile(targetPath, "app/_layout.tsx", [
    [/^/, 'import * as Sentry from "@sentry/react-native";\n'],
    [/^const RootLayout = /m, `${sentryInit}const RootLayout = `],
    [/^export default RootLayout;/m, "export default Sentry.wrap(RootLayout);"],
  ]);

  console.log("✅ Sentry successfully configured in app/_layout.tsx");

  if (!answers.sentryDsn) {
    console.log(
      "⚠️  Remember to set EXPO_PUBLIC_SENTRY_DSN (or add the DSN in app/_layout.tsx)"
    );
  }
}
