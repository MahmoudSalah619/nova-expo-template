import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "@/components/shared/vendor/reactICX";
import styles from "./styles";
import { DialogOption, DropdownProps } from "./types";

/**
 * A customizable dropdown component that displays a list of options when triggered.
 * @argument
 * - `options`: An array of dropdown options, each containing a label, value, optional icon, and optional color.
 * - `children`: Custom trigger element for the dropdown. If not provided, a default icon is used.
 * - `onChange`: Callback function that is called when an option is selected, receiving the selected value and the selected option as arguments.
 *
 * @warning Do NOT pass a touchable element (e.g. `Button`, `TouchableOpacity`,
 * `Pressable`) as `children`. The trigger is already wrapped in its own
 * `TouchableOpacity`, so a nested touchable swallows the press and the dropdown
 * will never open. Pass plain, non-touchable content instead (e.g. a `View`
 * with a `Text`/`Icon`).
 * 
 * @example
 * ```tsx
 * <DropdownComponent
 *  options={[
 *   { label: "Edit", value: "edit", icon: "pencil", color: "#4caf50" },
 *  { label: "Delete", value: "delete", icon: "trash", color: "#f44336" },
 * ]}
 * onChange={(value, option) => console.log("Selected option:", value, option)}
 * >
 * <Text>Open Menu</Text>
 * </DropdownComponent>
 * ```
 */

export default function DropdownComponent({
  options,
  children,
  onChange,
}: DropdownProps) {
  const handleOptionPress = (value: string, option: DialogOption) => {
    console.log(`Selected option: ${value}`);
    if (onChange) {
      onChange(value, option);
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Dropdown>
        <Dropdown.Trigger style={styles.trigger}>
          {children ? (
            children
          ) : (
            <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
          )}
        </Dropdown.Trigger>
        <Dropdown.Content style={styles.menu}>
          {options.map((option) => (
            <Dropdown.Item
              key={option.value}
              onPress={() => handleOptionPress(option.value, option)}
            >
              <Text
                style={[
                  styles.itemText,
                  option.color ? { color: option.color } : {},
                ]}
              >
                {option.label}
              </Text>
              {option.icon && (
                <Ionicons
                  name={option.icon as keyof typeof Ionicons.glyphMap}
                  size={16}
                  color={option.color || "#111"}
                />
              )}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </GestureHandlerRootView>
  );
}
