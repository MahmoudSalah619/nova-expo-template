import { View, ViewStyle } from "react-native";
import styles from "./styles";

function SeperateLine({ customBG = {} }: { customBG?: ViewStyle }) {
  return <View style={[styles.line, customBG]} />;
}

export default SeperateLine;
