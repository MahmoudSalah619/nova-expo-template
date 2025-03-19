import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@/constants/Colors";
// import Text from "@/components/atoms/Text";
import NotificationBell from "./NotificationBell";
import UnreadMessages from "../molecules/unreadMessages";
import { Feather } from "@expo/vector-icons";
// import UnreadMessages from "@/components/molecules/unreadMessages";
// import LogoSvg from "@/assets/icons/Logo";

const styles = StyleSheet.create({
  NotiNum: {
    position: "absolute",
    top: -5,
  },
  displayNone: {
    display: "none",
  },
  headerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    // paddingTop: getStatusBarHeight(),
  },
  hiddenStyle: { opacity: 0, position: "relative" },
  spacing: {
    marginStart: -15,
    padding: 15,
  },
});

export default function NavigationHeader({
  title = "",
  hasBackArrow = true,
  hasLogo = false,
  isRightComponentHidden = false,
  orangeBackground = false,
  isSmallTitleFont = false,
  orangeTitle = false,
  boldTitle = false,
  onPress = () => {},
}) {
  const navigation = useNavigation();

  const BackButtonMarkup = (
    <></>
    // <Icon name="header-back-arrow" size={24} color={Colors.grey900} />
  );

  const isBackButtonVisible = hasBackArrow && navigation.canGoBack();

  return (
    <Pressable
      style={[styles.headerStyle, { backgroundColor: COLORS.light.background }]}
      onPress={() => {
        // hide keybord when click on header
        Keyboard.dismiss();
      }}
    >
      {/* BACK BUTTON */}
      <TouchableOpacity
        disabled={!isBackButtonVisible}
        style={[styles.spacing, !isBackButtonVisible && styles.hiddenStyle]}
        onPress={navigation.goBack}
      >
        <Feather name="chevron-left" size={32} color="black" />
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
            <Text
            // fontSize={isSmallTitleFont ? 16 : 22}
            // fontFamily={orangeTitle || boldTitle ? "font500" : "font400"}
            // color={orangeTitle ? "orange500" : "grey900"}
            >
              {title}
            </Text>
          </TouchableOpacity>
        )}
        {!!hasLogo && (
          <View>
            {/* <LogoSvg /> */}
            <Text>Logo</Text>
          </View>
        )}
      </View>

      {/* RIGHT COMPONENT */}
      <View
        pointerEvents={isRightComponentHidden ? "none" : undefined}
        style={[
          isRightComponentHidden && styles.hiddenStyle,
          orangeTitle && styles.displayNone,
        ]}
      >
        <View style={styles.NotiNum}>
          <UnreadMessages number={2} backGroundColor={COLORS.light.background} />
        </View>

        <NotificationBell />
      </View>
    </Pressable>
  );
}
