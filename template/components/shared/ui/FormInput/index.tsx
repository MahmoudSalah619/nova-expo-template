import { Controller, FieldValues } from "react-hook-form";
import Input from "../Input";
import { ControllableInputProps } from "./types";
import { getErrorText } from "./utils";

export default function ControllableInput<T extends FieldValues>({
  control,
  name,
  rules,
  required,
  errorMessage,
  ...otherProps
}: ControllableInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required, ...rules }}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <Input
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          error={getErrorText(errorMessage, fieldState.error?.message)}
          {...otherProps}
        />
      )}
    />
  );
}
