import { Controller, FieldValues } from "react-hook-form";
import PhoneInput from "../PhoneInput";
import { ControllablePhoneInputProps } from "../FormInput/types";
import { getErrorText } from "../FormInput/utils";

export default function ControllablePhoneInput<T extends FieldValues>({
  control,
  name,
  rules,
  required,
  errorMessage,
  ...otherProps
}: ControllablePhoneInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required, ...rules }}
      render={({ field: { onChange, onBlur }, fieldState }) => (
        <PhoneInput
          onChange={onChange}
          onBlur={onBlur}
          error={getErrorText(errorMessage, fieldState.error?.message)}
          {...otherProps}
        />
      )}
    />
  );
}
