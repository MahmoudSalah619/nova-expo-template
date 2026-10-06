/* eslint-disable */

/*
  ------------------------------------------------------------------------------
  generate-svg.js
  ------------------------------------------------------------------------------
  This script automates the process of converting SVG files into React Native 
  icon components using SVGR, and updates the icon list for easy imports.

  WHEN TO USE:
    - Run this script whenever you add new SVG files to ./assets/svgs.
    - It will generate corresponding .tsx icon components in ./assets/icons.
    - It will also update ./components/shared/ui/Icon/list.ts to include the new icons.

  HOW TO USE:
    1. Place your SVG files in the ./assets/svgs directory.
    2. In your terminal, run:
         node scripts/generate-svg.js   (from the project root)
    3. The script will:
         - Convert each SVG to a React Native component using SVGR.
         - Format and clean up the generated component.
         - Update the icon list for easy usage in your project.

  NOTES:
    - The script overwrites existing icon components and updates the icon list.
    - If you want to keep original SVGs, comment/uncomment the unlinkSync line.
    - Make sure your SVG filenames are unique and use kebab-case (e.g., my-icon.svg).
    - The generated components follow the IconProps interface for consistency.

  ------------------------------------------------------------------------------
*/

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const svgFolder = './assets/svgs';
const outputFolder = './assets/icons';
const iconListFile = './components/shared/ui/Icon/list.ts';

// Create output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const newComponents = [];

const modifyComponent = (filePath, componentName) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Fix the import/export naming consistency
  const pascalName = componentName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // 2. Clean up and format the content
  const paths = content.match(/<Path[^>]*\/>/g)?.join('\n    ') || '';

  content = `import { IconProps } from '@/components/shared/ui/Icon/types';
import { COLORS } from '@/constants/Colors';
import { Appearance } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ${pascalName} = ({ size = 24, color = 'primary', ...props }: IconProps) => {
  const theme = Appearance.getColorScheme();
  const targetTheme = (theme === 'unspecified' || !theme) ? 'light' : theme;
  const targetColor = COLORS[targetTheme][color]

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" color={targetColor} {...props}>
      ${paths
      .replace(/stroke="(?!none)[^"]+"/g, 'stroke={targetColor}')
      .replace(/fill="(?!none)[^"]+"/g, 'fill={targetColor}')}
    </Svg>
  )
};

export default ${pascalName};
`;

  fs.writeFileSync(filePath, content);
};

const generatePascalCase = (name) => {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

// Process SVG files
fs.readdirSync(svgFolder).forEach((file) => {
  if (path.extname(file) === '.svg') {
    const componentName = path
      .basename(file, '.svg')
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
    const outputFile = path.join(outputFolder, `${componentName}.tsx`);

    try {
      // 1. Generate component
      execSync(
        `npx @svgr/cli --native --icon --no-dimensions --no-svgo ${path.join(
          svgFolder,
          file
        )} > ${outputFile}`,
        { stdio: 'pipe' }
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
    let content = fs.readFileSync(iconListFile, 'utf8');

    const newImports = newComponents
      .filter(
        (name) =>
          !content.includes(`import ${generatePascalCase(name)} from '@/assets/icons/${name}';`)
      )
      .map((name) => `import ${generatePascalCase(name)} from '@/assets/icons/${name}';`)
      .join('\n');

    const lastBraceIndex = content.lastIndexOf('}');
    if (lastBraceIndex === -1) {
      throw new Error('Could not find iconsList object');
    }

    const newEntries = newComponents
      .filter(
        (name) =>
          !content.includes(
            `${generatePascalCase(name).charAt(0).toLowerCase() + generatePascalCase(name).slice(1)}: ${generatePascalCase(name)},`
          )
      )
      .map(
        (name) =>
          `  ${generatePascalCase(name).charAt(0).toLowerCase() + generatePascalCase(name).slice(1)}: ${generatePascalCase(name)},`
      )
      .join('\n');

    const updatedContent =
      newImports +
      '\n' +
      content.slice(0, lastBraceIndex).trimEnd() +
      '\n' +
      newEntries +
      '\n' +
      content.slice(lastBraceIndex);

    fs.writeFileSync(iconListFile, updatedContent);
    console.log('✅ Updated iconsList with new component');
  } catch (error) {
    console.error('❌ Failed to update iconsList:', error?.message);
  }
}
