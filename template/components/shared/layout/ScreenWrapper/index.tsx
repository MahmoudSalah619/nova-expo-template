import { View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import Constants from "expo-constants";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { ScreenWrapperProps } from "./types";
import styles from "./styles";
import { Logo, ThemedView } from "@/components/shared/ui";

/** Gap kept between the focused input and the top of the keyboard. */
const KEYBOARD_BOTTOM_OFFSET = 24;

type VariantStyleOptions = Required<
  Pick<
    ScreenWrapperProps,
    | "variant"
    | "justifyContent"
    | "paddingSize"
    | "paddingBlockSize"
    | "isStatusBarShown"
  >
>;

function getVariantStyle({
  variant,
  justifyContent,
  paddingSize,
  paddingBlockSize,
  isStatusBarShown,
}: VariantStyleOptions): ViewStyle {
  if (variant === "main") {
    return {
      justifyContent,
      paddingHorizontal: paddingSize === "sm" ? 12 : 16,
      paddingVertical: paddingBlockSize === "sm" ? 12 : 24,
      gap: 16,
    };
  }

  return {
    justifyContent,
    paddingTop: isStatusBarShown ? Constants.statusBarHeight : 10,
    paddingBottom: 16,
    paddingHorizontal: paddingSize === "sm" ? 24 : 32,
  };
}

export default function ScreenWrapper({
  children,
  variant = "auth",
  justifyContent = "flex-start",
  style,
  hasNoHorizontalSpacing = false,
  isScrollable = false,
  paddingSize = "md",
  paddingBlockSize = "md",
  isStatusBarShown = false,
  showHeader = variant === "auth",
}: ScreenWrapperProps) {
  const allContainerStyle = [
    styles.container,
    getVariantStyle({
      variant,
      justifyContent,
      paddingSize,
      paddingBlockSize,
      isStatusBarShown,
    }),
    hasNoHorizontalSpacing && styles.paddingHorizontal0,
    style,
  ];

  const MainContentMarkup = <View style={allContainerStyle}>{children}</View>;

  return (
    // KeyboardAwareScrollView (react-native-keyboard-controller) scrolls the
    // focused input above the keyboard, identically on iOS and Android.
    <ThemedView style={[GLOBAL_STYLES.fullSize]}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={isScrollable}
        bottomOffset={KEYBOARD_BOTTOM_OFFSET}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        {showHeader && (
          <View>
            <Logo width={260} height={200} />
          </View>
        )}

        {MainContentMarkup}
      </KeyboardAwareScrollView>
    </ThemedView>
  );
}
