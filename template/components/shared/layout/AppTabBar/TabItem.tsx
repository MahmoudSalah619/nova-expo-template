import { TouchableOpacity } from "react-native";
import { Icon, Text } from "@/components/shared/ui";
import { iconsListType } from "@/@types/mainTypes";
import styles from "./styles";

interface TabItemProps {
  icon: iconsListType;
  label: string;
  isFocused: boolean;
  onPress: () => void;
}

export default function TabItem({ icon, label, isFocused, onPress }: TabItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.tab}
    >
      <Icon name={icon} size={22} color={isFocused ? "tabSelected" : "tabDefault"} />
      <Text
        size={11}
        fontFamily={isFocused ? "font700" : "font500"}
        color={isFocused ? "primary" : "caption"}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
