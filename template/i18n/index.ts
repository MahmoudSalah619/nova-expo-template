import AsyncStorage from "@react-native-async-storage/async-storage";
import DefaultI18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import { reloadAsync } from "expo-updates";

import dayjs from "dayjs";
import "dayjs/locale/ar";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";

import en from "./en.json";
import ar from "./ar.json";
import momentArabicLocalization from "@/constants/momentArabicLocalization";
import { TranslationKeyEnum } from "@/@types/TranslationKeyEnum";

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

export const locales = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export const DEFAULT_LOCALE = "en";

const isEnglish = Localization.locale.includes("en");

const defaultLang = isEnglish ? "en" : "ar";

export const currentLanguage = DefaultI18n.language || defaultLang;

const useLanguageStorage: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    AsyncStorage.getItem("lang").then((lang) => {
      if (lang) {
        dayjs.locale(lang);
        if (lang === "ar") {
          dayjs.updateLocale(lang, momentArabicLocalization); // Update to match dayjs localization
        }
        return callback(lang);
      }
      return null;
    });
  },
  init: () => null,
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem("lang", language).then(() => {
      const isRtl = I18nManager.isRTL;

      if (language.includes("ar")) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        if (!isRtl) reloadAsync();
      } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
        if (isRtl) reloadAsync();
      }
    });
  },
};

DefaultI18n.use(useLanguageStorage)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLang,
    resources: locales,
    react: {
      useSuspense: false,
    },
  });

const i18n = {
  ...DefaultI18n,
  t: (key: TranslationKeyEnum) => DefaultI18n.t(key),
};

export default i18n;
