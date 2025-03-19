import { View, ViewStyle } from "react-native";
import Text from "@/components/atoms/Text";
import styles from "./style";

export default function UnreadMessages({
  number,
  backGroundColor = "black",
}: {
  number: number;
  backGroundColor: string;
}) {
  const customStyle: ViewStyle = {
    backgroundColor: backGroundColor,
  };
  return (
    <View style={[customStyle, styles.container]}>
      <Text autoTrasnlate={false}>
        {number}
      </Text>
    </View>
  );
}
