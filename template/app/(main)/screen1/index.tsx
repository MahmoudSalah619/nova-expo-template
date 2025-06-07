import { Text } from "@/components/atoms";
import MainScreenWrapper from "@/components/templates/MainScreenWrapper";
import React from "react";
import { Appearance, Switch, useColorScheme } from "react-native";

export default function Screen1() {
  const colorScheme = useColorScheme();

  return (
    <MainScreenWrapper>
      <Text>Screen1</Text>
      <Switch
        value={colorScheme == "dark"}
        onChange={() => {
          Appearance.setColorScheme(colorScheme == "dark" ? "light" : "dark");
        }}
      />
    </MainScreenWrapper>
  );
}
