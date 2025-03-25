import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Text from "@/components/atoms/Text";
import styles from "./styles";

type CustomCheckboxProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  error?: string;
  href?: string;
};

export default function CustomCheckbox({
  value,
  onChange,
  label,
  error,
}: CustomCheckboxProps) {
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
