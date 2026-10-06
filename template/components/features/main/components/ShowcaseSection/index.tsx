import { View } from "react-native";
import { Text } from "@/components/shared/ui";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ShowcaseSectionProps } from "./types";
import styles from "./styles";

export default function ShowcaseSection({
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  const { targetColor: borderColor } = useThemeColor("border", "primary");

  return (
    <View style={[styles.section, { borderColor }]}>
      <View style={styles.header}>
        <Text variant="H4">{title}</Text>
        {!!description && (
          <Text variant="sm" color="caption" autoTranslate={false}>
            {description}
          </Text>
        )}
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
}
