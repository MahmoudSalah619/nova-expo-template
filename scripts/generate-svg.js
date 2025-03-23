const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const svgFolder = "./assets/svgs"; // Folder containing your SVGs
const outputFolder = "./assets/icons"; // Folder to save React Native components

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Loop through all SVG files in the folder
fs.readdirSync(svgFolder).forEach((file) => {
  if (path.extname(file) === ".svg") {
    const componentName = path.basename(file, ".svg"); // Remove .svg extension
    const outputFile = path.join(outputFolder, `${componentName}.jsx`); // Output file path

    try {
      execSync(
        `npx @svgr/cli --native --icon --no-dimensions ${path.join(
          svgFolder,
          file
        )} > ${outputFile}`
      );
      console.log(`✅ Generated ${componentName}`);
    } catch (error) {
      console.error(
        `❌ Failed to generate component for ${file}:`,
        error?.message
      );
    }
  }
});