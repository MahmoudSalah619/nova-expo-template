import Toast from "react-native-toast-message";
import { TranslationKeyEnum } from "@/@types/TranslationKeyEnum";
import i18n from "@/i18n";

export default function showSuccessMsg({
  i18nKey,
  msg,
}: {
  i18nKey?: TranslationKeyEnum;
  msg?: string;
}) {
  Toast.show({
    type: "success",
    text1: i18n.t("SUCCESS"),
    text2: i18nKey ? i18n.t(i18nKey) : msg,
  });
  return null;
}
