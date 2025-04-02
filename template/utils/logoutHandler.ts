import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "@/redux";
import { logout } from "@/redux/authReducer";

export default function logoutHandler() {
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("refreshToken");
  store.dispatch(logout());
}
