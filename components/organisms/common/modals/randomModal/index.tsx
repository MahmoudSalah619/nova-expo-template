import React from "react";
import { View } from "react-native";
import ModalWrapper from "../modalWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";

export default function RandomModal({
  isVisible,
  setVisible,
  onSubmit,
}: {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onSubmit: () => void;
}) {
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible}>
      <View>
        <View style={[GLOBAL_STYLES.vhCentering, GLOBAL_STYLES.gap8]}>
          <Text color="black" size={18} weight={700}>
            Random Modal
          </Text>
          <Text>
            This is a random modal to show how to use the ModalWrapper
            component.
          </Text>
        </View>
        <View
          style={[
            GLOBAL_STYLES.rowJustifyBetween,
            GLOBAL_STYLES.gap8,
            { marginTop: 28 },
          ]}
        >
          <Button title="Confirm" isFullWidth onPress={onSubmit} />
          <Button
            title="Not Now"
            isFullWidth
            variant="outlined"
            onPress={handleClose}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
