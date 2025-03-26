import React from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Button, Text } from "@/components/atoms";
import AuthScreenWrapper from "@/components/templates/AuthScreenWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";

const bulletPoints = [
  {
    id: 1,
    icon: "✅",
    key: "Smooth & Responsive",
    value: "Looks great on any device!",
  },
  {
    id: 2,
    icon: "🎨",
    key: "Easy to Customize",
    value: "Make it truly yours in no time.",
  },
  {
    id: 3,
    icon: "⚡",
    key: "Fast & Lightweight",
    value: "No bloat, just speed.",
  },
  {
    id: 4,
    icon: "🛠️",
    key: "Built for Developers",
    value: "Clean code, ready to go!",
  },
];

const Welcome = () => {
  const router = useRouter();

  return (
    <AuthScreenWrapper isScrollable>
      <View style={styles.container}>
        <View style={GLOBAL_STYLES.gap16}>
          <Text size={24} weight={700} >
            Welcome to Nova! 🌟
          </Text>
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
            <Text weight={500}>✅ Smooth & Responsive</Text>
            <Text weight={500}>🎨 Easy to Customize</Text>
            <Text weight={500}>⚡ Fast & Lightweight</Text>
            <Text weight={500}>🛠️ Built for Developers</Text>
            <Text weight={500}>🚀 Ready to Go</Text>
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
