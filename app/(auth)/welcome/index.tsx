import React from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Text } from "@/components/atoms";
import AuthScreenWrapper from "@/components/templates/AuthScreenWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";

const Welcome = () => {
  const router = useRouter();

  return (
    <AuthScreenWrapper paddingSize="sm" isScrollable>
      <View style={styles.container}>
        <View style={GLOBAL_STYLES.gap16}>
          <View style={[GLOBAL_STYLES.row, GLOBAL_STYLES.gap4]}>
            <Text size={24} weight={700}>
              Welcome to
            </Text>
            <Text size={24} weight={800} color="primary">
              NovaByte! 🌟
            </Text>
          </View>
          <Text color="grey70" lineHeight={21}>
            Kickstart your mobile app with a clean, modern, and super
            easy-to-use template. Nova is built to be fast, flexible, and ready
            for anything—so you can focus on creating something amazing. Let’s
            build together!🚀
          </Text>
          <Text size={18} weight={600} lineHeight={21}>
            Why Nova? 💡
          </Text>
          <View style={GLOBAL_STYLES.gap16}>
            <Text color="grey70" weight={500}>
              ✅ Smooth & Responsive
            </Text>
            <Text color="grey70" weight={500}>
              🎨 Easy to Customize
            </Text>
            <Text color="grey70" weight={500}>
              ⚡ Fast & Lightweight
            </Text>
            <Text color="grey70" weight={500}>
              🛠️ Built for Developers
            </Text>
            <Text color="grey70" weight={500}>
              🚀 Ready to Go
            </Text>
          </View>
        </View>
        <View style={GLOBAL_STYLES.gap16}>
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
