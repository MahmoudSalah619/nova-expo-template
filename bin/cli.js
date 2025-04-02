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
      // Ask questions
      const answers = await prompt([
        {
          type: "input",
          name: "projectName",
          message: "What's the name of the project?",
          default: projectDir,
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
      ]);

      // Create paths
      const templatePath = path.join(__dirname, "../template");
      const targetPath = path.join(process.cwd(), answers.projectName);

      // Create directory
      console.log(`Creating ${answers.projectName}...`);
      await fs.ensureDir(targetPath);

      // Copy template files
      console.log("Copying template files...");
      await fs.copy(templatePath, targetPath);

      // Process package.json
      const packageJsonPath = path.join(targetPath, "package.json");
      const packageJson = await fs.readFile(packageJsonPath, "utf-8");
      const renderedPackageJson = require("ejs").render(packageJson, {
        projectName: answers.projectName,
        eslint: answers.eslint,
        husky: answers.husky,
      });
      await fs.writeFile(packageJsonPath, renderedPackageJson);

      // Process app.json
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

      // Install dependencies
      console.log("Installing dependencies...");
      const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
      spawnSync(npmCmd, ["install"], {
        cwd: targetPath,
        stdio: "inherit",
        shell: true,
      });

      // Enhanced ESLint and Husky setup
      if (answers.eslint) {
        console.log("\nSetting up ESLint and Prettier...");

        // List of ESLint related packages to install
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

        // Install all ESLint packages
        spawnSync(npmCmd, ["install", "--save-dev", ...eslintPackages], {
          cwd: targetPath,
          stdio: "inherit",
          shell: true,
        });

        // Create ESLint config file
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

        // Create Prettier config file
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

        await fs.writeFile(
          path.join(targetPath, ".prettierrc"),
          prettierConfig
        );

        // Update package.json with lint scripts
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

        // Run initial lint fix
        spawnSync(
          "npx",
          ["eslint", ".", "--ext", ".js,.jsx,.ts,.tsx", "--fix"],
          {
            cwd: targetPath,
            stdio: "inherit",
            shell: true,
          }
        );

        // Setup Husky if selected
        if (answers.husky) {
          console.log("\nSetting up Husky with lint-staged...");

          // Install husky and lint-staged
          spawnSync(npmCmd, ["install", "--save-dev", "husky", "lint-staged"], {
            cwd: targetPath,
            stdio: "inherit",
            shell: true,
          });

          // Add husky config to package.json
          updatedPackageJson.scripts.prepare = "husky install";
          updatedPackageJson["lint-staged"] = {
            "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
          };

          await fs.writeFile(
            packageJsonPath,
            JSON.stringify(updatedPackageJson, null, 2)
          );

          // Initialize husky
          spawnSync(npmCmd, ["run", "prepare"], {
            cwd: targetPath,
            stdio: "inherit",
            shell: true,
          });

          // Add pre-commit hook
          spawnSync(
            "npx",
            ["husky", "add", ".husky/pre-commit", "npx lint-staged"],
            {
              cwd: targetPath,
              stdio: "inherit",
              shell: true,
            }
          );
        }

        console.log("\nESLint and Prettier setup complete!");
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
