import { Button, Text, ThemedView } from "@/components/atoms";
import { Collapsible } from "@/components/molecules/common";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    router.replace("/(auth)/welcome");
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Collapsible title="Personal Information">
        <Text>First Name: John</Text>
        <Text>Last Name: Doe</Text>
        <Text>Age: 25</Text>
      </Collapsible>
      <Collapsible title="Contact Information">
        <Text>Email: mahmoud.s.m619@gmail.com </Text>
        <Text>Phone: +201005541537 </Text>
      </Collapsible>
      <Collapsible title="Address">
        <Text>City: Cairo</Text>
        <Text>Street: 5th Settlement</Text>
        <Text>Building: 5</Text>
      </Collapsible>
      <Collapsible title="Social Media">
        <Text>Facebook: Mahmoud salah</Text>
        <Text>Twitter: Mahmoud salah</Text>
        <Text>Instagram: Mahmoud salah</Text>
      </Collapsible>
      <View>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
