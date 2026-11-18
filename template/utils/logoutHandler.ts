import store from "@/redux";
import { logout } from "@/redux/authReducer";
import { clearSecureStorage } from "@/utils/secureStorage";

export default function logoutHandler() {
  clearSecureStorage();
  store.dispatch(logout());
}
