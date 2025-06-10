import Toast from "react-native-toast-message";

export default function showSuccessMsg({ msg }: { msg?: string }) {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: msg,
  });
  return null;
}
