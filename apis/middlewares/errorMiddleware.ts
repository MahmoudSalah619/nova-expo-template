import { isRejectedWithValue } from "@reduxjs/toolkit";
import HandleErrors from "@/utils/handleErrors";

type NextFunction = (action: any) => void;

const rtkQueryErrorLogger = () => (next: NextFunction) => (action: any) => {
  if (isRejectedWithValue(action)) {
    // @ts-ignore
    HandleErrors(action?.payload?.data);
  }

  return next(action);
};

export default rtkQueryErrorLogger;
