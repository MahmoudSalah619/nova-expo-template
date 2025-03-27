import { Input } from "@/components/atoms";
import { InputFieldProps } from "@/components/atoms/input/types";
import {
  Controller,
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

interface ControllableInputProps extends InputFieldProps {
  control: Control;
  name: string;
  required?: boolean;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl>;
  rules?: object;
}

export default function ControllableInput({
  control,
  name,
  rules,
  required,
  errorMessage,
  ...otherProps
}: ControllableInputProps) {
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
          // @ts-ignore
          error={errorMessage || fieldState.error?.message}
          {...otherProps}
        />
      )}
    />
  );
}
