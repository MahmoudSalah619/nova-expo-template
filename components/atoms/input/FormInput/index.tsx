import {
  Controller,
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import PureInput from "../PureInput";
import { InputFieldProps } from "../PureInput/types";

interface ControllableInputProps extends InputFieldProps {
  control: Control;
  name: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  rules?: object;
}

export default function ControllableInput({
  control,
  name,
  rules,
  errorMessage,
  ...otherProps
}: ControllableInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules} // Pass rules to Controller
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <PureInput
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          // @ts-ignore
          error={errorMessage || fieldState.error?.message}
          {...otherProps}
        />
      )}
    />
  );
}
ControllableInput.defaultProps = {
  errorMessage: "",
  rules: {},
};
