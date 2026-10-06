import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";

import Constants from "expo-constants";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import METRICS from "@/constants/Metrics";
import { ScreenWrapperProps } from "./types";
import styles from "./styles";
import { Logo, ThemedView } from "@/components/shared/ui";

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
  hasNoKeyboardVerticalOffset = false,
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
    <KeyboardAvoidingView
      style={[GLOBAL_STYLES.fullSize]}
      behavior={Platform.select({ android: undefined, ios: "padding" })}
      keyboardVerticalOffset={
        !hasNoKeyboardVerticalOffset ? METRICS.headerHeight : 0
      }
    >
      <ThemedView style={[GLOBAL_STYLES.fullSize]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={isScrollable}
          contentContainerStyle={styles.scrollContainer}
        >
          {showHeader && (
            <View>
              <Logo width={260} height={200} />
            </View>
          )}

          {MainContentMarkup}
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
