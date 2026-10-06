import { TouchableOpacity, View } from "react-native";
import { RadioButtonProps } from "./types";
import styles from "./styles";

export default function RadioButton({
  selected,
  onPress,
  disabled = false,
  containerStyle,
}: RadioButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle, disabled && styles.disabledRadio]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View style={styles.radioContainer}>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}
