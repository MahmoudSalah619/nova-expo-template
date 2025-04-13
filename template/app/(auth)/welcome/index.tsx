import React from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Text } from "@/components/atoms";
import AuthScreenWrapper from "@/components/templates/AuthScreenWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import i18n from "@/locale";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Welcome = () => {
  const router = useRouter();

  const changeLanguage = async (lang: "en" | "ar") => {
    console.log(lang, "lang");

    try {
      await i18n.changeLanguage(lang);
      i18n.services.languageDetector.cacheUserLanguage(lang);
      Updates.reloadAsync();
      // RNRestart.restart(); // Restart the app to apply the language change
    } catch (error) {
      console.error("Language change failed", error);
    }
  };

  console.log(I18nManager.isRTL, "isRTL");

  return (
    <AuthScreenWrapper paddingSize="sm" isScrollable>
      <View style={styles.container}>
        {/* <View style={GLOBAL_STYLES.gap16}>
          <View style={[GLOBAL_STYLES.row, GLOBAL_STYLES.gap4]}>
            <Text size={24} weight={700}>
              Welcome to
            </Text>
            <Text size={24} weight={800} color="primary">
              NovaByte! 🌟
            </Text>
          </View>
          <Text color="grey70" lineHeight={21}>
            Your all-in-one toolkit for building beautiful, high-performance
            mobile apps. With NovaByte, you get clean, modern, and easy-to-use
            templates that help you move fast and build smarter. Let’s create
            something amazing together! ✨
          </Text>
          <Text size={18} weight={700} lineHeight={21}>
            Why NovaByte? 💡
          </Text>
          <View style={GLOBAL_STYLES.gap16}>
            <Text color="grey70" weight={500}>
              ✅ Ready-to-Use Components
            </Text>
            <Text color="grey70" weight={500}>
              🎨 Highly Customizable
            </Text>
            <Text color="grey70" weight={500}>
              ⚡ Optimized for Speed
            </Text>
            <Text color="grey70" weight={500}>
              🛠️ Developer-Friendly
            </Text>
            <Text color="grey70" weight={500}>
              🚀 Built to Scale
            </Text>
          </View>
          <Text>Hello</Text>
        </View> */}
        <Text>Hello</Text>
        <View style={GLOBAL_STYLES.gap16}>
          <Button
            title="Change Language to En"
            onPress={() => {
              changeLanguage("en");
            }}
          />
          <Button
            title="Change Language to Ar"
            onPress={() => {
              changeLanguage("ar");
            }}
          />
          <Button
            title="Go to Login"
            onPress={() => router.push("/(auth)/login")}
          />
          <Button
            title="Go to Signup"
            onPress={() => router.push("/(auth)/signup")}
          />
        </View>
      </View>
    </AuthScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 16,
  },
});

export default Welcome;
