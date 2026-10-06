import {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
} from "react-hook-form";
import { InputFieldProps } from "../Input/types";
import { PhoneInputProps } from "../PhoneInput/types";

type ControllableFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  required?: boolean;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  rules?: object;
};

export type ControllableInputProps<T extends FieldValues> = InputFieldProps &
  ControllableFieldProps<T>;

export type ControllablePhoneInputProps<T extends FieldValues> = Omit<
  PhoneInputProps,
  "onChange" | "value"
> &
  ControllableFieldProps<T>;
