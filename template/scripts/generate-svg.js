/* eslint-disable */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const svgFolder = "./assets/svgs";
const outputFolder = "./assets/icons";
const iconListFile = "./components/atoms/Icon/list.ts";

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const newComponents = [];

const modifyComponent = (filePath, componentName) => {
  let content = fs.readFileSync(filePath, "utf8");

  // 1. Fix the import/export naming consistency
  const pascalName = componentName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  // 2. Clean up the content
  content = `import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "@/components/atoms/Icon/types";


const ${pascalName} = ({
  size = 24,
  color = "#000000",
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <Svg
    width={size}
    height={size}
    stroke={color}
    strokeWidth={strokeWidth}
    fill={color}
    viewBox="0 0 25 24"
    {...props}
  >
    ${content.match(/<Path[^>]*\/>/g)?.join("\n    ") || ""}
  </Svg>
);

export default ${pascalName};`;

  fs.writeFileSync(filePath, content);
};

// Process SVG files
fs.readdirSync(svgFolder).forEach((file) => {
  if (path.extname(file) === ".svg") {
    const componentName = path.basename(file, ".svg").toUpperCase();
    const outputFile = path.join(outputFolder, `${componentName}.tsx`);

    try {
      // 1. Generate component
      execSync(
        `npx @svgr/cli --native --icon --no-dimensions --no-svgo ${path.join(
          svgFolder,
          file
        )} > ${outputFile}`,
        { stdio: "pipe" }
      );

      // 2. Modify component
      modifyComponent(outputFile, componentName);

      // 3. Delete original SVG after successful conversion
      // fs.unlinkSync(svgFilePath);

      console.log(`✅ Generated ${componentName}`);
      newComponents.push(componentName);
    } catch (error) {
      console.error(`❌ Failed to process ${file}:`, error?.message);
    }
  }
});

// Rest of your original file handling the iconList updates...
if (newComponents.length > 0) {
  try {
    let content = fs.readFileSync(iconListFile, "utf8");
    const newImports = newComponents
      .map((name) => `import ${name} from "@/assets/icons/${name}";`)
      .join("\n");

    const lastBraceIndex = content.lastIndexOf("}");
    if (lastBraceIndex === -1) {
      throw new Error("Could not find iconsList object");
    }

    const newEntries = newComponents
      .map((name) => `  ${name.toLowerCase()}: ${name},`)
      .join("\n");

    const updatedContent =
      newImports +
      "\n" +
      content.slice(0, lastBraceIndex).trimEnd() +
      "\n" +
      newEntries +
      "\n" +
      content.slice(lastBraceIndex);

    fs.writeFileSync(iconListFile, updatedContent);
    console.log("✅ Updated iconsList with new component");
  } catch (error) {
    console.error("❌ Failed to update iconsList:", error?.message);
  }
}
