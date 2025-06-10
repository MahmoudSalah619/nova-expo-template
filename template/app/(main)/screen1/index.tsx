import { Text } from "@/components/atoms";
import MainScreenWrapper from "@/components/templates/MainScreenWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import React from "react";
import { Appearance, Switch, useColorScheme, View } from "react-native";

export default function Screen1() {
  const colorScheme = useColorScheme();

  return (
    <MainScreenWrapper>
      <View style={GLOBAL_STYLES.rowJustifyBetween}>
        <Text>Enable Dark Mode</Text>
        <Switch
          value={colorScheme === "dark"}
          onChange={() => {
            Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
          }}
        />
      </View>
    </MainScreenWrapper>
  );
}
