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
        // {
        //   type: "confirm",
        //   name: "eslint",
        //   message: "Do you want ESLint?",
        //   default: false,
        // },
        // {
        //   type: "confirm",
        //   name: "husky",
        //   message: "Do you want Husky?",
        //   default: false,
        // },
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
      const rendered = require("ejs").render(packageJson, {
        projectName: answers.projectName,
        eslint: answers.eslint,
        husky: answers.husky,
      });
      await fs.writeFile(packageJsonPath, rendered);

      // Install dependencies
      console.log("Installing dependencies...");
      const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
      spawnSync(npmCmd, ["install"], {
        cwd: targetPath,
        stdio: "inherit",
        shell: true,
      });

      // Install ESLint and Husky if selected
      if (answers.eslint) {
        spawnSync(
          npmCmd,
          [
            "install",
            "--save-dev",
            "eslint",
            "eslint-config-airbnb",
            "eslint-config-prettier",
            "eslint-plugin-import",
            "eslint-plugin-jsx-a11y",
            "eslint-plugin-prettier",
            "eslint-plugin-react",
            "eslint-plugin-react-hooks",
            "eslint-plugin-react-refresh",
            "typescript-eslint",
          ],
          {
            cwd: targetPath,
            stdio: "inherit",
            shell: true,
          }
        );
      }
      if (answers.husky) {
        spawnSync(npmCmd, ["install", "--save-dev", "husky"], {
          cwd: targetPath,
          stdio: "inherit",
          shell: true,
        });
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
