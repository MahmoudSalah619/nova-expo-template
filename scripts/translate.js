const fs = require("fs");
const path = require("path");
const https = require("https");

const TRANSLATION_DIR = path.join(__dirname, "../i18n"); // Adjust if needed
const LANGUAGES = ["en", "es", "fr", "de", "ar"]; // Add your language codes here
const GOOGLE_TRANSLATE_API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key

function translateText(text, targetLang) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      q: text,
      target: targetLang,
      source: "en",
      format: "text",
    });

    const options = {
      hostname: "translation.googleapis.com",
      path: `/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data);
          resolve(response.data.translations[0].translatedText);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function syncTranslations() {
  const baseLang = LANGUAGES[0];
  const baseFilePath = path.join(TRANSLATION_DIR, `${baseLang}.json`);

  if (!fs.existsSync(baseFilePath)) {
    console.error(`Base language file (${baseLang}.json) not found.`);
    return;
  }

  const baseContent = JSON.parse(fs.readFileSync(baseFilePath, "utf-8"));

  for (const lang of LANGUAGES.slice(1)) {
    const filePath = path.join(TRANSLATION_DIR, `${lang}.json`);
    let targetContent = {};

    if (fs.existsSync(filePath)) {
      targetContent = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    const updatedContent = { ...targetContent };

    for (const key of Object.keys(baseContent)) {
      if (!updatedContent[key]) {
        console.log(`Translating '${key}' to ${lang}...`);
        updatedContent[key] = await translateText(baseContent[key], lang).catch(
          () => baseContent[key]
        );
      }
    }

    fs.writeFileSync(
      filePath,
      JSON.stringify(updatedContent, null, 2),
      "utf-8"
    );
    console.log(`Synced translations for ${lang}.json`);
  }

  console.log("Translation sync complete!");
}

syncTranslations().catch(console.error);
