import { View } from "react-native";
import { Text } from "@/components/shared/ui";
import { ShowcaseItemProps } from "./types";
import styles from "./styles";

export default function ShowcaseItem({
  label,
  isRow = false,
  children,
}: ShowcaseItemProps) {
  return (
    <View style={styles.item}>
      <Text variant="xsm" color="caption" autoTranslate={false} style={styles.label}>
        {label.toUpperCase()}
      </Text>
      <View style={isRow ? styles.row : styles.column}>{children}</View>
    </View>
  );
}
