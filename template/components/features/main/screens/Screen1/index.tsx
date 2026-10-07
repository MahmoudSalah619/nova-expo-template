import { Icon, Switch, Text } from "@/components/shared/ui";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import React from "react";
import { useColorScheme, View } from "react-native";
import switchTheme from "@/utils/switchTheme";
import styles from "./styles";

export default function Screen1() {
  const colorScheme = useColorScheme();

  return (
    <ScreenWrapper variant="main">
      <View style={styles.header}>
        <Text variant="H2">APPEARANCE</Text>
        <Text variant="md" color="body">
          APPEARANCE_SUBTITLE
        </Text>
      </View>
      <View style={styles.card}>
        <View style={styles.iconChip}>
          <Icon name="moon" size={20} color="action" />
        </View>
        <View style={styles.cardText}>
          <Text size={15} fontFamily="font600">
            DARK_MODE
          </Text>
          <Text variant="xsm" color="caption">
            DARK_MODE_CAPTION
          </Text>
        </View>
        <Switch
          value={colorScheme === "dark"}
          onValueChange={() => {
            switchTheme(colorScheme === "dark" ? "light" : "dark");
          }}
        />
      </View>
    </ScreenWrapper>
  );
}
