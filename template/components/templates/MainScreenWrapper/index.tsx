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
import { G } from "react-native-svg";

export default function MainScreenWrapper({
  children,
  header,
  hasVerticalSpaceBetween,
  customStyle,
  hasNoHorizontalSpacing = false,
  hasNoKeyboardVerticalOffset = false,
  paddingHorizontalSize = "md",
  paddingBlockSize = "md",
  isScrollable = false,
  extraSpace = false,
  isForJobList = false,
}: ScreenWrapperProps) {
  const extraStyle: ViewStyle = {
    justifyContent: hasVerticalSpaceBetween ? "space-between" : "flex-start",
    flex: 1,
    paddingHorizontal: paddingHorizontalSize === "sm" ? 12 : 16,
    paddingVertical: paddingBlockSize === "sm" ? 12 : 24,
    paddingBottom: isForJobList ? 0 : 24, // Add this line
  };

  const allContainerStyle = [
    styles.container,
    extraStyle,
    hasNoHorizontalSpacing && styles.paddingHorizontal0,
    customStyle,
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
      {header}
      {isScrollable ? (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            extraSpace && { paddingBottom: 24 },
          ]}
        >
          {MainContentMarkup}
        </ScrollView>
      ) : (
        // <View style={[styles.container, { paddingBottom: 0, marginBottom: 0 }]>
        MainContentMarkup
        // </View>
      )}
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}
