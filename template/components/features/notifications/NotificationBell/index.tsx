import { COLORS } from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";

export default function NotificationBell() {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();

  return (
    <TouchableOpacity
      hitSlop={12}
      onPress={() => router.push("/(main)/notifications")}
    >
      <Feather name="bell" size={20} color={COLORS[colorScheme].icon.primary} />
    </TouchableOpacity>
  );
}
