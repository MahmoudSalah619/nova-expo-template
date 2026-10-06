import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { Button, FormInput, FormPhoneInput } from "@/components/shared/ui";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";

interface ShowcaseFormValues {
  email: string;
  phone: string;
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export default function FormShowcase() {
  const { control, handleSubmit, reset } = useForm<ShowcaseFormValues>({
    defaultValues: { email: "", phone: "" },
  });

  const onValid = (values: ShowcaseFormValues) => {
    Toast.show({ type: "success", text1: "Form is valid", text2: values.email });
    reset();
  };

  return (
    <ShowcaseSection
      title="Form fields"
      description="FormInput and FormPhoneInput wired to react-hook-form validation."
    >
      <ShowcaseItem label="react-hook-form">
        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="name@example"
          keyboardType="email-address"
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_PATTERN, message: "Enter a valid email" },
          }}
        />
        <FormPhoneInput
          control={control}
          name="phone"
          label="Phone number"
          rules={{ required: "Phone number is required" }}
        />
        <Button title="Validate form" onPress={handleSubmit(onValid)} />
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
