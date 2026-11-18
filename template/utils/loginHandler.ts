import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/apis";
import store from "@/redux";
import { login, setUserInfo } from "@/redux/authReducer";
import { User } from "@/apis/services/auth/types";
import clearStorage from "@/utils/clearStorage";
import { setSecureItem } from "@/utils/secureStorage";

export default function loginHandler({
  token = "",
  refreshToken = "",
  rememberMe = false,
  userInfo = {} as User,
} = {}) {
  if (rememberMe) {
    // we here check if the user got token and pressed remember me
    // Tokens and profile go to encrypted SecureStore; the flag stays in AsyncStorage.
    if (token) setSecureItem("token", token);
    if (refreshToken) setSecureItem("refreshToken", refreshToken);
    AsyncStorage.setItem("remember_me", `${rememberMe}`);
    setSecureItem("userInfo", JSON.stringify(userInfo));
  } else {
    // if user refresh the app and got token but he didn't press remember me so we remove all
    clearStorage();
  }
  store.dispatch(api.util.resetApiState());
  store.dispatch(login(token));
  store.dispatch(setUserInfo(userInfo));
}
