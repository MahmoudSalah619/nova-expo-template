import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, setUserInfo } from "@/redux/authReducer";
import { clearSecureStorage, getSecureItem } from "@/utils/secureStorage";

/** Restores a "remember me" session saved by loginHandler. */
export default function useCheckAuthTokenExistance() {
  const dispatch = useDispatch();

  const rememberMeCheck = async () => {
    // remember_me lives in AsyncStorage, which an uninstall wipes. Keychain data
    // survives an uninstall on iOS, so without this flag any token/userInfo left
    // in SecureStore is from a previous install: clear it instead of logging in.
    const rememberMe = await AsyncStorage.getItem("remember_me");
    if (!rememberMe) {
      await clearSecureStorage();
      return;
    }

    const [userToken, userInfo] = await Promise.all([
      getSecureItem("token"),
      getSecureItem("userInfo"),
    ]);
    if (!userToken || !userInfo) return;

    dispatch(setUserInfo(JSON.parse(userInfo)));
    dispatch(login(userToken));
  };

  useEffect(() => {
    rememberMeCheck();
  }, [dispatch]);
}
