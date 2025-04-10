/* eslint-disable */

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
import { TranslationKeyEnum } from "@/@types/TranslationKeyEnum";

// Configure dayjs plugins
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);

export type SupportedLanguages = 'en' | 'ar';

export const locales = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
} as const;

export const DEFAULT_LOCALE: SupportedLanguages = "en";

// Get device locale
const deviceLocales = Localization.getLocales();
const deviceLanguage = deviceLocales[0]?.languageCode?.toLowerCase();

// Set default language based on device locale, fallback to English
const defaultLang: SupportedLanguages = (deviceLanguage === 'ar' ? 'ar' : 'en');

export const currentLanguage = DefaultI18n.language || defaultLang;

const useLanguageStorage: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async (callback): Promise<string | readonly string[] | undefined> => {
    try {
      const lang = await AsyncStorage.getItem("lang");
      if (lang && (lang === 'en' || lang === 'ar')) {
        dayjs.locale(lang);
        if (lang === "ar") {
          // Configure Arabic specific date formatting if needed
          dayjs.updateLocale(lang, {
            // Add specific Arabic configurations here if needed
            direction: 'rtl'
          });
        }
        callback(lang);
        return lang;
      }
      callback(defaultLang);
      return defaultLang;
    } catch (error) {
      console.error('Error detecting language:', error);
      callback(defaultLang);
      return defaultLang;
    }
  },
  init: () => null,
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem("lang", language);
      const isRtl = I18nManager.isRTL;

      if (language === "ar") {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        if (!isRtl) reloadAsync();
      } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
        if (isRtl) reloadAsync();
      }
    } catch (error) {
      console.error('Error caching language:', error);
    }
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
