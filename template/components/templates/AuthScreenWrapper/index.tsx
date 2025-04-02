import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";

import { getStatusBarHeight } from "react-native-status-bar-height";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import METRICS from "@/constants/Metrics";
import { ScreenWrapperProps } from "./types";
import styles from "./styles";
import { Logo, ThemedView } from "@/components/atoms";

export default function AuthScreenWrapper({
  children,
  justifyContent = "flex-start",
  style,
  hasNoHorizontalSpacing = false,
  isStatusBarShown = false,
  hasNoKeyboardVerticalOffset = false,
  showHeader = true,
  paddingSize = "md",
  isScrollable = false,
}: ScreenWrapperProps) {
  const extraStyle: ViewStyle = {
    justifyContent: justifyContent,
    paddingTop: isStatusBarShown ? getStatusBarHeight() : 10,
    paddingBottom: 16,
    paddingHorizontal: paddingSize === "sm" ? 24 : 32,
  };

  const allContainerStyle = [
    styles.container,
    extraStyle,
    hasNoHorizontalSpacing && styles.paddingHorizontal0,
    style,
  ];

  const MainContentMarkup = <View style={allContainerStyle}>{children}</View>;

  return (
    // <SafeAreaView style={styles.innerConatiner}>
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
    // </SafeAreaView>
  );
}
