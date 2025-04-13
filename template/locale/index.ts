import AsyncStorage from "@react-native-async-storage/async-storage";
import DefaultI18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import dayjs from "dayjs";
import "dayjs/locale/ar"; // Import Arabic locale
import { I18nManager } from "react-native";
import en from "./en.json";
import ar from "./ar.json";
import { TranslationKeyEnum } from "@/@types/TranslationKeyEnum";
import dayjsArabicLocalization from "@/constants/dayjsArabicLocalization";

export const locales = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export const DEFAULT_LOCALE = "en";

const systemLocales = Localization.getLocales();

const defaultLang = systemLocales[0].languageCode ? "en" : "ar";

export const currentLanguage = I18nManager.isRTL ? "ar" : "en";

const setRTL = (isRTL: boolean) => {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
};

const useLanguageStorage: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    AsyncStorage.getItem("lang").then((lang) => {
      if (lang) {
        dayjs.locale(lang);
        if (lang === "ar") {
          dayjs.locale('ar', dayjsArabicLocalization);
          setRTL(true);
        } else {
          setRTL(false);
        }
        return callback(lang);
      }
      dayjs.locale("en");
      setRTL(false);
      return callback("en");
    });
  },
  init: () => null,
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem("lang", language);
    if (language === "ar") {
      setRTL(true);
    } else {
      setRTL(false);
    }
  },
};

/* eslint-disable react-hooks/rules-of-hooks */
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