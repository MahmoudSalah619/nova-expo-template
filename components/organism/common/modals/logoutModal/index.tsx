import React from "react";
import { View } from "react-native";
import ModalWrapper from "../modalWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";

export default function LogoutModal({
  isVisible,
  setVisible,
  onSubmit = () => {},
}: {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onSubmit?: () => void;
}) {
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <ModalWrapper isVisible={isVisible} setVisible={setVisible}>
      <View>
        <View style={[GLOBAL_STYLES.vhCentering, GLOBAL_STYLES.gap8]}>
          {/* <LogoutSVG /> */}
          <Text color="greyE5" size={18}>
            Do you want to Log out?
          </Text>
        </View>
        <View
          style={[
            GLOBAL_STYLES.rowJustifyBetween,
            GLOBAL_STYLES.gap8,
            { marginTop: 28 },
          ]}
        >
          <Button title="Log out" isFullWidth onPress={onSubmit} />
          <Button
            title="Cancel"
            isFullWidth
            variant="outlined"
            onPress={handleClose}
          />
        </View>
      </View>
    </ModalWrapper>
  );
}
