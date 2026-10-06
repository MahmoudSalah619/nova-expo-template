import React from "react";
import { View } from "react-native";
import ModalWrapper from "../modalWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import Text from "@/components/shared/ui/Text/Base";
import Button from "@/components/shared/ui/Button";

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
          <Text variant="H4" isCentered>
            DEMO_MODAL_TITLE
          </Text>
          <Text variant="sm" color="body" isCentered>
            DEMO_MODAL_BODY
          </Text>
        </View>
        <View
          style={[
            GLOBAL_STYLES.rowJustifyBetween,
            GLOBAL_STYLES.gap8,
            { marginTop: 28 },
          ]}
        >
          <Button title="CONFIRM" isFullWidth onPress={onSubmit} />
          <Button
            title="CANCEL"
            isFullWidth
            variant="outlined"
            onPress={handleClose}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
