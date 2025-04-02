import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/apis";
import store from "@/redux";
import { login, setUserInfo } from "@/redux/authReducer";
import { loggedInUser } from "@/apis/@types/auth";

export default function loginHandler({
  token = "",
  refreshToken = "",
  rememberMe = false,
  userInfo = {} as loggedInUser,
} = {}) {
  if (rememberMe) {
    // we here check if the user got token and pressed remember me
    if (token) AsyncStorage.setItem("token", token);
    if (refreshToken) AsyncStorage.setItem("refreshToken", refreshToken);
    AsyncStorage.setItem("remember_me", `${rememberMe}`);
    AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  } else {
    // if user refresh the app and got token but he didn't press remember me so we remove all
    AsyncStorage.clear();
  }
  store.dispatch(api.util.resetApiState());
  store.dispatch(login(token));
  store.dispatch(setUserInfo(userInfo));
}
