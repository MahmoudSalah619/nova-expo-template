/* eslint-disable @typescript-eslint/no-explicit-any */
import Toast from "react-native-toast-message";
import i18n from "@/i18n";

export default function HandleErrors(err: any) {
  const showErrorToast = (msg: string) => {
    Toast.show({
      type: "error",
      text1: i18n.t("ERROR"),
      text2: msg,
    });
  };
  console.log("err=>:", err);
  // if (err?.code?.includes("token_not_valid")) {
  //   store.dispatch(logout());
  // }
  if (err.details?.reason) {
    showErrorToast(err.details?.reason);
  } else if (err.message) {
    showErrorToast(err.message);
  } else if (err.details?.length) {
    showErrorToast(err.details.join(", "));
  } else if (err.detail) {
    showErrorToast(err.detail);
  } else if (err && Object.keys(err)) {
    showErrorToast(err[Object.keys(err)[0]]);
  } else if (Object.keys(err)?.length !== 0) {
    showErrorToast(String(Object.values(err)[0]));
  } else {
    showErrorToast("خطأ غير متوقع!");
  }
}
