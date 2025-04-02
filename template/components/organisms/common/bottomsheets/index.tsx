import { registerSheet } from "react-native-actions-sheet";
import RandomBottomSheet from "./randomBottomSheet";

registerSheet("random-bottom-sheet", RandomBottomSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    "random-bottom-sheet": {
      payload: {
        title: string;
        decision?: boolean;
      };
    };
  }
}
export default {};
