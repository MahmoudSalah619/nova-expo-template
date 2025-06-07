/*
  ------------------------------------------------------------------------------
  removeLogs.js
  ------------------------------------------------------------------------------
  This script recursively scans your project directory and removes all 
  console.log statements from JavaScript and TypeScript files.

  WHEN TO USE:
    - Run this script before committing or deploying your code to clean up 
      debugging logs from your source files.

  HOW TO USE:
    1. Adjust the `projectRoot`, `fileExtensions`, and `excludeDirs` variables 
       if needed.
    2. In your terminal, run:
         node template/scripts/removeLogs.js
    3. The script will:
         - Traverse all files in your project (excluding specified directories).
         - Remove all console.log statements, including those in comments and 
           multi-line blocks, from .js, .jsx, .ts, and .tsx files.

  NOTES:
    - The script overwrites files in place.
    - Only console.log statements are removed; other console methods are not affected.
    - Excluded directories (like node_modules, .git, dist, build) are not processed.
    - Review your code after running to ensure no important logs were removed.

  ------------------------------------------------------------------------------
*/
import * as fs from 'fs';
import * as path from 'path';


// Configuration
const projectRoot = './'; // Change this to your project root directory
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx']; // File types to process
const excludeDirs = ['node_modules', '.git', 'dist', 'build']; // Directories to exclude


function removeConsoleLogs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  
  content = content.replace(/console\.log\([^)]*\);?\n?/g, '');
  
  
  content = content.replace(/console\.log\([^)]*\)[^;]*;?\n?/g, '');
  
  
  content = content.replace(/\/\/.*console\.log.*/g, '');
  content = content.replace(/\/\*[\s\S]*?console\.log[\s\S]*?\*\//g, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
}

// Recursive function to process all files
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        processDirectory(fullPath);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (fileExtensions.includes(ext)) {
                removeConsoleLogs(fullPath);
      }
    }
  });
}

// Start processing
processDirectory(projectRoot);

