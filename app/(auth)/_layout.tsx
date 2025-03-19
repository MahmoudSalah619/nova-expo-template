import React from 'react';
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="welcome/index" />
    </Stack>
  );
}