import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { Text } from "@/components/atoms";
import { COLORS } from "@/constants/Colors";

const styles = StyleSheet.create({
  centering: { justifyContent: "center" },
  textStyle: { color: COLORS.light.greyCe, fontSize: 14, marginStart: 5 },
});

export default function NoResults({ text = "There's nothing here yet!" }) {
  return (
    <View style={[GLOBAL_STYLES.row, styles.centering]}>
      <AntDesign name="inbox" size={20} color={COLORS.light.greyCe} />
      <Text style={styles.textStyle} weight={600}>
        {text}
      </Text>
    </View>
  );
}
