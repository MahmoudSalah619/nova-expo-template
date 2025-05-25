/* eslint-disable */

/*
  ------------------------------------------------------------------------------
  sync-translations.js
  ------------------------------------------------------------------------------
  This script helps you keep translation files in sync across multiple languages.
  It ensures all translation keys from your base language (e.g., English) exist
  in other language files, and can generate CSVs for easy translation.

  WHEN TO USE:
    - Run this script whenever you add, remove, or change translation keys in your base language file (e.g., en.json).
    - Use it to generate fresh translation files for new languages.
    - Optionally, generate CSV files for translators.

  HOW TO USE:
    1. Edit your base translation file (e.g., i18n/en.json) as needed.
    2. In your terminal, run:
         node template/scripts/sync-translations.js
    3. The script will:
         - Create/update translation files for all languages in the LANGUAGES array.
         - Ensure all keys from the base language exist in other language files (values will be empty).
         - Optionally, prompt you to generate CSV files for translators.

    To auto-generate CSVs without prompt, use:
         node template/scripts/sync-translations.js --csv

  REQUIREMENTS:
    - Node.js installed.
    - Commander package installed (npm install commander).

  NOTES:
    - The script overwrites existing translation files for non-base languages.
    - Add or remove languages by editing the LANGUAGES array at the top.
    - CSV files are saved in the same directory as your translation JSON files.

  ------------------------------------------------------------------------------
*/

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const readline = require("readline"); // For interactive prompts

// Config
const TRANSLATION_DIR = path.join(__dirname, "../i18n");
const LANGUAGES = ["en", "ar"]; // Add more languages as needed

// --- Core Functions ---
function syncTranslations() {
  const baseLang = LANGUAGES[0];
  const baseFilePath = path.join(TRANSLATION_DIR, `${baseLang}.json`);

  if (!fs.existsSync(baseFilePath)) {
    console.error(
      `🚨 Base language file (${baseLang}.json) not found. Please check and try again!`
    );
    return;
  }

  const baseContent = JSON.parse(fs.readFileSync(baseFilePath, "utf-8"));
  const newStructure = {};

  for (const [key, value] of Object.entries(baseContent)) {
    if (typeof value === "string") {
      newStructure[value] = ""; // Set empty for other languages
    }
  }

  LANGUAGES.slice(1).forEach((lang) => {
    const filePath = path.join(TRANSLATION_DIR, `${lang}.json`);
    fs.writeFileSync(filePath, JSON.stringify(newStructure, null, 2), "utf-8");
    console.log(`✅ Translation structure updated for 🌍 ${lang}.json`);
  });

  console.log("\n🎉 Translation restructuring complete! Time to translate! 🌟");
  return newStructure;
}

function generateCSV(lang) {
  const filePath = path.join(TRANSLATION_DIR, `${lang}.json`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File ${lang}.json not found. Please ensure it exists.`);
    return;
  }

  const translations = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let csvContent = "Key (English),Translation\n";

  for (const [key, value] of Object.entries(translations)) {
    csvContent += `"${key}","${value || ""}"\n`;
  }

  const csvFilePath = path.join(TRANSLATION_DIR, `${lang}_translations.csv`);
  fs.writeFileSync(csvFilePath, csvContent, "utf-8");
  console.log(`\n📊 CSV file generated successfully: ${csvFilePath} 🎉`);
}

// --- Interactive Prompt ---
async function askToGenerateCSV() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "Do you want to generate CSV files for translations? (y/n) 📝 ",
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === "y");
      }
    );
  });
}

// --- CLI Setup ---
program
  .description("Sync translation keys and generate CSV files")
  .option("-c, --csv", "Generate CSV files after restructuring")
  .action(async (options) => {
    await syncTranslations();

    if (options.csv) {
      LANGUAGES.slice(1).forEach((lang) => generateCSV(lang));
    } else {
      const shouldGenerate = await askToGenerateCSV();
      if (shouldGenerate) {
        LANGUAGES.slice(1).forEach((lang) => generateCSV(lang));
      } else {
        console.log("🚀 Skipping CSV generation. Have a great day!");
      }
    }
  });

program.parse(process.argv);
