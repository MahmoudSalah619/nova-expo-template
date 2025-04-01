import { registerSheet } from "react-native-actions-sheet";
import LogoutBottomSheet from "./RandomBottomSheet";
import RandomBottomSheet from "./RandomBottomSheet";

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
