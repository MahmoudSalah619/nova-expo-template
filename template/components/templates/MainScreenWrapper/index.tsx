import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";

import GLOBAL_STYLES from "@/constants/GlobalStyles";
import METRICS from "@/constants/Metrics";
import { ScreenWrapperProps } from "./types";
import styles from "./styles";
import { ThemedView } from "@/components/atoms";

export default function MainScreenWrapper({
  children,
  justifyContent = "flex-start",
  customStyle,
  hasNoHorizontalSpacing = false,
  hasNoKeyboardVerticalOffset = false,
  paddingHorizontalSize = "md",
  paddingBlockSize = "md",
  isScrollable = false,
}: ScreenWrapperProps) {
  const extraStyle: ViewStyle = {
    justifyContent: justifyContent,
    paddingHorizontal: paddingHorizontalSize === "sm" ? 12 : 16,
    paddingVertical: paddingBlockSize === "sm" ? 12 : 24,
    gap: 16,
  };

  const allContainerStyle = [
    styles.container,
    extraStyle,
    hasNoHorizontalSpacing && styles.paddingHorizontal0,
    customStyle,
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
          {MainContentMarkup}
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
