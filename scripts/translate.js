require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const API_URL = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com';
const SOURCE_LANG = 'en';
const TARGET_LANG = 'ar';
const FILE_PATH = './scripts/translations.json';

// Read JSON file
const readJsonFile = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
};

// Save JSON file
const saveJsonFile = (path, data) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
        console.log('✅ Translations updated successfully!');
    } catch (error) {
        console.error('Error writing JSON file:', error);
    }
};

// Translate text using LibreTranslate
const translateText = async (text) => {
    try {
        const response = await axios.post(`${API_URL}/translate`, {
            q: text,
            source: SOURCE_LANG,
            target: TARGET_LANG,
            format: 'text'
        });
        return response.data.translatedText;
    } catch (error) {
        console.error('Translation error:', error.response?.data || error.message);
        return text;
    }
};

// Process translations
const processTranslations = async () => {
    const jsonData = readJsonFile(FILE_PATH);
    if (!jsonData) return;

    let updated = false;

    for (const key in jsonData) {
        if (jsonData[key] === '') {
            console.log(`Translating: ${key}`);
            jsonData[key] = await translateText(key);
            updated = true;
        }
    }

    if (updated) saveJsonFile(FILE_PATH, jsonData);
    else console.log('✅ No missing translations found.');
};

// Run the script
processTranslations();
