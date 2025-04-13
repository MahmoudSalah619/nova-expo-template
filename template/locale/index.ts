import AsyncStorage from "@react-native-async-storage/async-storage";
import DefaultI18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import "moment/locale/ar";
import { I18nManager } from "react-native";
import moment from "moment";
import en from "./en.json";
import ar from "./ar.json";
import { TranslationKeyEnum } from "@/@types/TranslationKeyEnum";
import momentArabicLocalization from "@/constants/momentArabicLocalization";

export const locales = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

export const DEFAULT_LOCALE = "en";

const isEnglish = Localization.getLocales();

const defaultLang = isEnglish[0].languageCode ? "en" : "ar";

export const currentLanguage = I18nManager.isRTL ? "ar" : "en";

const useLanguageStorage: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: (callback) => {
    AsyncStorage.getItem("lang").then((lang) => {
      if (lang) {
        moment.locale(lang);
        if (lang === "ar") {
          moment.updateLocale(lang, momentArabicLocalization);
        }
        return callback(lang);
      }
      return moment.locale("en");
    });
  },
  init: () => null,
  cacheUserLanguage: (language: string) => {
    console.log(language, "language FROM CONFIG");

    AsyncStorage.setItem("lang", language).then(() => {
      if (language.includes("ar")) {
        console.log("language is ar ? ha ?");

        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        console.log(I18nManager.isRTL, "isRTL from config");
        
      } else {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }
    });
  },
};
/* eslint-disable react-hooks/rules-of-hooks */
DefaultI18n.use(useLanguageStorage)
  .use(initReactI18next)
  .init({
    // compatibilityJSON: "v3",
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
