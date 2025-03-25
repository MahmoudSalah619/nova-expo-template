import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@/constants/Colors";

import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme.web";
// import LogoSvg from "@/assets/icons/Logo";
import UnreadMessages from "../molecules/scoped/notifications/unreadMessages";
import NotificationBell from "./NotificationBell";
import { Text, ThemedView } from "../atoms";

import Logo from "../atoms/Logo";

export default function NavigationHeader({
  title = "",
  hasBackArrow = true,
  hasLogo = false,
  isRightComponentHidden = false,
  onPress = () => {},
}) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme() ?? "light";

  const BackButtonMarkup = (
    <></>
    // <Icon name="header-back-arrow" size={24} color={Colors.grey900} />
  );

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
            <Text type="defaultSemiBold">{title}</Text>
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

const styles = StyleSheet.create({
  headerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
    // paddingTop: getStatusBarHeight(),
  },
  NotiNum: {
    position: "absolute",
    top: -5,
  },
  displayNone: {
    display: "none",
  },
  hiddenStyle: { opacity: 0, position: "relative" },
  spacing: {
    marginStart: -15,
    padding: 15,
  },
});
