import { View } from "react-native";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import Text from "@/components/shared/ui/Text/Base";
import SheetWrapper from "../sheetWrapper";
import Button from "@/components/shared/ui/Button";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { RandomBottomSheetProps } from "./types";

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
        <Text variant="sm" color="body">
          DEMO_SHEET_BODY
        </Text>
        <View style={[GLOBAL_STYLES.row, GLOBAL_STYLES.gap8]}>
          <Button
            title="CONFIRM"
            onPress={() => onCloseSheet(true)}
            isFullWidth
          />

          <Button
            title="CANCEL"
            variant="outlined"
            onPress={() => onCloseSheet()}
            isFullWidth
          />
        </View>
      </View>
    </SheetWrapper>
  );
}
