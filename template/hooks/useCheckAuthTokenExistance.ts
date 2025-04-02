import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, setUserInfo } from "@/redux/authReducer";

export default function useCheckAuthTokenExistance() {
  const dispatch = useDispatch();

  const rememberMeCheck = async () => {
    const userToken = await AsyncStorage.getItem("token");
    const userInfo = await AsyncStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo) : null;
    const rememberMe = await AsyncStorage.getItem("remember_me");
    if (rememberMe) {
      if (userToken && user) {
        dispatch(setUserInfo(user));
        dispatch(login(userToken));
      }
    } else if (!rememberMe && userToken && user) {
      dispatch(setUserInfo(user));
      dispatch(login(userToken));
      AsyncStorage.clear();
    }
  };

  useEffect(() => {
    rememberMeCheck();
  }, [dispatch]);
}
