import { View, ViewStyle } from "react-native";
import styles from "./styles";

function SeperateLine({ customBG = {} }: { customBG?: ViewStyle }) {
  return <View style={[styles.line, customBG]} />;
}
SeperateLine.defaultProps = {
  customBG: {}, // Provide the default value here as well
};
export default SeperateLine;
