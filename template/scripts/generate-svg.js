/* eslint-disable */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const svgFolder = "./assets/svgs"; // Folder containing your SVGs
const outputFolder = "./assets/icons"; // Folder to save React Native components
const iconListFile = "./components/atoms/Icon/list.ts"; // Path to iconList file

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Keep track of newly generated components
const newComponents = [];

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
      newComponents.push(componentName);
    } catch (error) {
      console.error(
        `❌ Failed to generate component for ${file}:`,
        error?.message
      );
    }
  }
});

// Update the iconList file if we have new components
if (newComponents.length > 0) {
  try {
    // Read the current file content
    let content = fs.readFileSync(iconListFile, 'utf8');
    
    // Add new imports at the top of the file
    const newImports = newComponents.map(name => 
      `import ${name} from "@/assets/icons/${name}";`
    ).join('\n');
    
    // Find the iconsList object closing brace
    const lastBraceIndex = content.lastIndexOf('}');
    if (lastBraceIndex === -1) {
      throw new Error('Could not find iconsList object');
    }
    
    // Add new components to the list
    const newEntries = newComponents.map(name => 
      `  ${name.toLowerCase()}: ${name},`
    ).join('\n');
    
    // Combine everything
    const updatedContent = 
      newImports + '\n' + 
      content.slice(0, lastBraceIndex).trimEnd() + 
      '\n' + newEntries + '\n' + 
      content.slice(lastBraceIndex);
    
    // Write back to file
    fs.writeFileSync(iconListFile, updatedContent);
    console.log('✅ Updated iconsList with new components');
  } catch (error) {
    console.error('❌ Failed to update iconsList:', error?.message);
  }
}
