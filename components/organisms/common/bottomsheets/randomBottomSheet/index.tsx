import { TouchableOpacity, View } from "react-native";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import Text from "@/components/atoms/Text";
import SheetWrapper from "../sheetWrapper";
import Button from "@/components/atoms/Button";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { RandomBottomSheetProps } from "./types";
import styles from "./styles";

export default function RandomBottomSheet(
  props: SheetProps<"random-bottom-sheet"> & RandomBottomSheetProps
) {
  const onCloseSheet = (decision = false) => {
    SheetManager.hide(props.sheetId, {
      payload: {
        decision: decision,
      },
    });
  };

  return (
    <SheetWrapper sheetId={props.sheetId} title={props.payload.title}>
      <View style={GLOBAL_STYLES.gap16}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <View style={[GLOBAL_STYLES.row, GLOBAL_STYLES.gap8]}>
          <Button
            title="Confirm"
            onPress={() => onCloseSheet(true)}
            isFullWidth
            // buttonStyle={styles.btn}
            textStyle={styles.btnText}
          />

          <Button
            title="Cancel"
            variant="outlined"
            onPress={() => onCloseSheet()}
            isFullWidth
            // buttonStyle={styles.btn}
          />
        </View>
      </View>
    </SheetWrapper>
  );
}
