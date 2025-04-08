import { Keyboard, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@/constants/Colors";

import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Logo, Text, ThemedView } from "@/components/atoms";
import UnreadMessages from "@/components/molecules/scoped/notifications/UnreadMessages";
import NotificationBell from "@/components/molecules/scoped/notifications/NotificationBell";
import styles from "./styles";

export default function NavigationHeader({
  title = "",
  hasBackArrow = true,
  hasLogo = false,
  isRightComponentHidden = false,
  onPress = () => {},
}) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";

  const isBackButtonVisible = hasBackArrow && navigation.canGoBack();

  return (
    <ThemedView style={[styles.headerStyle]}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        disabled={!isBackButtonVisible}
        style={[styles.spacing, !isBackButtonVisible && styles.hiddenStyle]}
        onPress={navigation.goBack}
      >
        <Feather
          name="chevron-left"
          size={32}
          color={COLORS[colorScheme]["text"]}
        />
      </TouchableOpacity>

      {/* CENTER COMPONENT */}
      <View>
        {!!title && !hasLogo && (
          <TouchableOpacity
            onPress={() => {
              onPress();
              Keyboard.dismiss();
            }}
          >
            <Text>{title}</Text>
          </TouchableOpacity>
        )}
        {!!hasLogo && (
          <View>
            <Logo />
          </View>
        )}
      </View>

      {/* RIGHT COMPONENT */}
      <View
        pointerEvents={isRightComponentHidden ? "none" : undefined}
        style={[isRightComponentHidden && styles.hiddenStyle]}
      >
        <View style={styles.NotiNum}>
          <UnreadMessages number={2} backgroundColor={COLORS.light.primary} />
        </View>
        <NotificationBell />
      </View>
    </ThemedView>
  );
}
