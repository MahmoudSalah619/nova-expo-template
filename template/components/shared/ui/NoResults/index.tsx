import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { Text } from "@/components/shared/ui";
import { COLORS } from "@/constants/Colors";

const styles = StyleSheet.create({
  centering: { justifyContent: "center" },
  textStyle: { color: COLORS.light.text.greyCe, fontSize: 14, marginStart: 5 },
});

export default function NoResults({ text = "There's nothing here yet!" }) {
  return (
    <View style={[GLOBAL_STYLES.row, styles.centering]}>
      <AntDesign name="inbox" size={20} color={COLORS.light.icon.greyCe} />
      <Text style={styles.textStyle} fontFamily="font600">
        {text}
      </Text>
    </View>
  );
}
