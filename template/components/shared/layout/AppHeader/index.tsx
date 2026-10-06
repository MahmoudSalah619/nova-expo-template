import { Keyboard, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { COLORS } from "@/constants/Colors";

import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Logo, Text, ThemedView } from "@/components/shared/ui";
import { NotificationBell, UnreadMessages } from "@/components/features/notifications";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import styles from "./styles";

export default function NavigationHeader({
  title = "",
  hasBackArrow = true,
  hasLogo = false,
  isRightComponentHidden = false,
  onPress = () => {},
}) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme() === "dark" ? "dark" : "light";

  const isBackButtonVisible = hasBackArrow && navigation.canGoBack();

  return (
    <ThemedView style={[styles.headerStyle]}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        disabled={!isBackButtonVisible}
        style={[styles.iconButton, !isBackButtonVisible && styles.hiddenStyle]}
        onPress={navigation.goBack}
      >
        <View style={GLOBAL_STYLES.flipInArabic}>
          <Feather
            name={"chevron-left"}
            size={22}
            color={COLORS[colorScheme].icon.primary}
          />
        </View>
      </TouchableOpacity>

      {/* CENTER COMPONENT */}
      <View style={styles.center}>
        {!!title && !hasLogo && (
          <TouchableOpacity
            onPress={() => {
              onPress();
              Keyboard.dismiss();
            }}
          >
            <Text size={16} fontFamily="font600" numberOfLines={1}>
              {title}
            </Text>
          </TouchableOpacity>
        )}
        {!!hasLogo && <Logo width={44} height={44} />}
      </View>

      {/* RIGHT COMPONENT */}
      <View
        pointerEvents={isRightComponentHidden ? "none" : undefined}
        style={[styles.iconButton, isRightComponentHidden && styles.hiddenStyle]}
      >
        <View style={styles.NotiNum}>
          <UnreadMessages
            number={2}
            backgroundColor={COLORS[colorScheme].Surface.danger}
          />
        </View>
        <NotificationBell />
      </View>
    </ThemedView>
  );
}
