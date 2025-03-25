import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Text from "@/components/atoms/Text";
import styles from "./styles";

type CheckboxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  error?: string;
  href?: string;
};

export default function Checkbox({
  value,
  onChange,
  label,
  error,
}: CheckboxProps) {
  return (
    <View style={styles.checkboxWrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => onChange(!value)}
        activeOpacity={0.7}
      >
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
            {value && (
              <Ionicons
                name="checkmark"
                size={12}
                color="white"
                style={styles.icon}
              />
            )}
          </View>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      </TouchableOpacity>
      {error && <Text color="dangerBC">{error}</Text>}
    </View>
  );
}
