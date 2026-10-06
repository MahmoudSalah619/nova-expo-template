import { View, ViewStyle } from "react-native";
import styles from "./style";
import { Text } from "@/components/shared/ui";

export default function UnreadMessages({
  number,
  backgroundColor = "black",
}: {
  number?: number | undefined;
  backgroundColor: string;
}) {
  const customStyle: ViewStyle = {
    backgroundColor: backgroundColor,
  };

  if (!number) {
    return null;
  }
  return (
    <View style={[customStyle, styles.container]}>
      <Text autoTranslate={false} size={8} color="onAction">
        {number}
      </Text>
    </View>
  );
}
