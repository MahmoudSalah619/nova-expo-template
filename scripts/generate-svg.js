const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const svgFolder = './svgs'; // Folder containing your SVGs
const outputFolder = './components'; // Folder to save React Native components

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Loop through all SVG files in the folder
fs.readdirSync(svgFolder).forEach((file) => {
  if (path.extname(file) === '.svg') {
    const componentName = path.basename(file, '.svg'); // Remove .svg extension
    const outputFile = path.join(outputFolder, `${componentName}.js`); // Output file path

    // Use npx to run @svgr/cli without installing it
    execSync(`npx @svgr/cli --native --icon ${path.join(svgFolder, file)} > ${outputFile}`);
    console.log(`Generated ${outputFile}`);
  }
});