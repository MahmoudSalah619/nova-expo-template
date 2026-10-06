import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import RandomBottomSheet from "./randomBottomSheet";

registerSheet("random-bottom-sheet", RandomBottomSheet);

interface RandomBottomSheetProps {
  title?: string;
  decision?: boolean;
}
declare module "react-native-actions-sheet" {
  interface Sheets {
    "random-bottom-sheet": SheetDefinition<{
      payload: RandomBottomSheetProps;
      returnValue: RandomBottomSheetProps;
    }>;
  }
}
export default {};
