import { ControllableInputProps } from "./types";
import { FieldValues } from "react-hook-form";

type ErrorMessage = ControllableInputProps<FieldValues>["errorMessage"];

/** Normalizes a react-hook-form error (string or FieldError) into display text. */
export function getErrorText(
  errorMessage: ErrorMessage,
  fieldErrorMessage?: string
): string | undefined {
  if (typeof errorMessage === "string") return errorMessage;
  if (typeof errorMessage?.message === "string") return errorMessage.message;
  return fieldErrorMessage;
}
