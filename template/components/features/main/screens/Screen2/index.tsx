import React from "react";
import { View } from "react-native";
import { useRoute, useRouter } from "expo-router";
import { Button, Icon, Text } from "@/components/shared/ui";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import styles from "./styles";

export default function Screen2() {
  const route = useRoute();
  const router = useRouter();
  const { from, id } = route.params as { from: string; id: number };

  const params = [
    { key: "id", value: id },
    { key: "from", value: from },
  ];

  return (
    <ScreenWrapper variant="main">
      <View style={styles.header}>
        <Text variant="H2">Screen2</Text>
        <Text variant="md" color="body">
          screen2Subtitle
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <Icon name="code" size={18} color="action" />
          <Text size={15} fontFamily="font600">
            routeParams
          </Text>
        </View>
        {params.map((param) => (
          <View key={param.key} style={styles.paramRow}>
            <Text variant="sm" color="body" autoTranslate={false}>
              {param.key}
            </Text>
            <View style={styles.valuePill}>
              <Text
                size={13}
                fontFamily="font600"
                color="primary"
                autoTranslate={false}
              >
                {String(param.value ?? "—")}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View>
      <Button
        title="Go to Screen3"
        containerStyle={styles.action}
        suffix={<Icon name="arrowRight" size={18} color="onAction" />}
        onPress={() => router.push("/(main)/screen3")}
      />
      </View>
    </ScreenWrapper>
  );
}
