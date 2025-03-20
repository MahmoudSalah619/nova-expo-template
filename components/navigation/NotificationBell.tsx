import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity, useColorScheme } from "react-native";

export default function NotificationBell() {
  const colorScheme = useColorScheme() ?? "light"; 

  return (
    <TouchableOpacity>
      <Feather name="bell" size={32} color={COLORS[colorScheme]["text"]} />
    </TouchableOpacity>
  );
}
