import { useState } from "react";
import { View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import { Button, DropdownComponent, Icon, Text } from "@/components/shared/ui";
import { DialogComponent, RandomModal } from "@/components/shared/wrappers";
import { MENU_OPTIONS } from "../../constants";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";
import styles from "./styles";

export default function OverlayShowcase() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openBottomSheet = async () => {
    const result = await SheetManager.show("random-bottom-sheet", {
      payload: { title: "Random bottom sheet" },
    });
    Toast.show({
      type: result?.decision ? "success" : "error",
      text1: result?.decision ? "Confirmed" : "Cancelled",
    });
  };

  return (
    <ShowcaseSection
      title="Overlays"
      description="ModalWrapper, SheetWrapper, the dropdown menu and the dialog."
    >
      <ShowcaseItem label="Modal and bottom sheet" isRow>
        <Button title="Open modal" size="md" onPress={() => setIsModalVisible(true)} />
        <Button title="Open bottom sheet" size="md" variant="outlined" onPress={openBottomSheet} />
      </ShowcaseItem>

      <ShowcaseItem label="Dropdown menu">
        <DropdownComponent
          options={MENU_OPTIONS}
          onChange={(_value, option) => Toast.show({ type: "success", text1: option.label })}
        >
          <View style={styles.menuTrigger}>
            <Text variant="md">Open menu</Text>
            <Icon name="arrowDown" size={12} color="primary" />
          </View>
        </DropdownComponent>
      </ShowcaseItem>

      <ShowcaseItem label="Dialog">
        <DialogComponent title="Delete item?" description="This action cannot be undone" />
      </ShowcaseItem>

      {isModalVisible && (
        <RandomModal
          isVisible={isModalVisible}
          setVisible={setIsModalVisible}
          onSubmit={() => setIsModalVisible(false)}
        />
      )}
    </ShowcaseSection>
  );
}
