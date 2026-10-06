import { Icon, Switch, Text } from "@/components/shared/ui";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import React from "react";
import { Appearance, useColorScheme, View } from "react-native";
import styles from "./styles";

export default function Screen1() {
  const colorScheme = useColorScheme();

  return (
    <ScreenWrapper variant="main">
      <View style={styles.header}>
        <Text variant="H2">appearance</Text>
        <Text variant="md" color="body">
          appearanceSubtitle
        </Text>
      </View>
      <View style={styles.card}>
        <View style={styles.iconChip}>
          <Icon name="moon" size={20} color="action" />
        </View>
        <View style={styles.cardText}>
          <Text size={15} fontFamily="font600">
            Enable Dark Mode
          </Text>
          <Text variant="xsm" color="caption">
            darkModeCaption
          </Text>
        </View>
        <Switch
          value={colorScheme === "dark"}
          onValueChange={() => {
            Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
          }}
        />
      </View>
    </ScreenWrapper>
  );
}
