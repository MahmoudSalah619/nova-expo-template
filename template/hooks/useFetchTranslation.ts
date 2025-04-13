import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/locale";
import TranslationConfig from "@/constants/TranslationConfig";

const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${TranslationConfig.sheet_id}/export/export?format=xlsx`;

export default function useFetchTranslation() {
  const [isLoading, setIsLoading] = useState(true);

  // [1]- Fetch locale data from server
  const fetchLocalesFromServer = async () => {
    console.log(
      "**************************** START ****************************"
    );
    setIsLoading(true);
    // Check for cached translations
    const cachedData = await AsyncStorage.getItem("translations");
    if (cachedData && !TranslationConfig.forceUpdate) {
      setIsLoading(false);
      console.log("Using cached translations...");
      return JSON.parse(cachedData);
    }

    return FileSystem.downloadAsync(
      GOOGLE_SHEET_URL,
      FileSystem.documentDirectory + "translation.xlsx"
    )
      .then(({ uri }) => {
        return convertExcelToJson(uri, TranslationConfig.sheet_number);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  // [2]- read the file and convert it to JSON
  const convertExcelToJson = async (fileUri: string, sheetNo: number) => {
    return FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    })
      .then(async (res) => {
        const wb = XLSX.read(res, { type: "base64" });
        console.log("WB:::: ", wb);
        const wsname = wb.SheetNames[sheetNo];
        const ws = wb.Sheets[wsname];

        const data: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        console.log("DATA::: ", data);
        const wsHeader = data[0];
        const wsContent = data.splice(1);

        const languages = wsHeader?.filter((e) => e !== "key");

        const translations: { [key: string]: { [key: string]: string } } = {};

        languages.forEach((lang: string, index: number) => {
          translations[lang] = {};
          wsContent.forEach((row) => {
            translations[lang][row[0]] = row[index + 1];
          });
        });

        setIsLoading(false);
        // Save translations to cache
        await AsyncStorage.setItem(
          "translations",
          JSON.stringify(translations)
        );
        return translations;
      })
      .catch((err) => {
        console.error("ERROR::: ", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    (async () => {
      const trns_file = await fetchLocalesFromServer();
      if (!trns_file) return;

      // i18n.store(trns_file);
      setIsLoading(false);
    })();
  }, []);

  return {
    isLoading,
  };
}

// ## Parameters
// The `fetchLocalesFromServer` function in the hook accepts the following parameters:
// - `url` (string): The URL of the Google Sheet.
// - `forceUpdate` (boolean): Whether to force fetch new translations, bypassing the cache. Default is `false`.
// - `sheetNo` (number): The sheet index to fetch data from. Default is `0`.

// ## Example Google Sheet Structure
// | key       | en          | ar          |
// |-----------|-------------|-------------|
// | welcome   | Welcome     | مرحبا       |
// | goodbye   | Goodbye     | وداعا       |

// ## Notes
// - The hook automatically updates the `i18n` instance with the fetched translations.
// - Ensure your app has the necessary permissions to access the file system and network.
