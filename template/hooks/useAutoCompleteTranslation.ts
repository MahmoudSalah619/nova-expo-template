import { TranslationKeyEnum } from "@/@types/TranslationKeyEnum";
import { useTranslation } from "react-i18next";

export default function useAutoCompleteTranslation() {
  const { t: defaultT } = useTranslation();

  const t = (
    key: TranslationKeyEnum | string,
    options?: Record<string, unknown>
  ) => {
    return defaultT(key, options);
  };

  return { t };
}
