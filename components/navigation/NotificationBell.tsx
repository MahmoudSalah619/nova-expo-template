import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";

export default function NotificationBell() {
  return (
    <TouchableOpacity>
      <Feather name="bell" size={32} color="black" />
    </TouchableOpacity>
  );
}
