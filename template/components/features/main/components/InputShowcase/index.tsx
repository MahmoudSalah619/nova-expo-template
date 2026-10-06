import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Icon, Input, PhoneInput, Text } from "@/components/shared/ui";
import { useThemeColor } from "@/hooks/useThemeColor";
import { INPUT_SIZES, PASSWORD_MIN_LENGTH } from "../../constants";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";

export default function InputShowcase() {
  const { targetColor: searchIconColor } = useThemeColor("icon", "secondary");
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <ShowcaseSection
      title="Input"
      description="Every size and state of Input, plus PhoneInput."
    >
      <ShowcaseItem label="Sizes">
        {INPUT_SIZES.map((size) => (
          <Input key={size} size={size} label={`Size ${size}`} placeholder="Type something" />
        ))}
      </ShowcaseItem>

      <ShowcaseItem label="Controlled with label">
        <Input label="Full name" placeholder="Enter your name" value={text} onChange={setText} />
        <Input label="Nickname" isOptional placeholder="Enter a nickname" />
      </ShowcaseItem>

      <ShowcaseItem label="Error and disabled">
        <Input label="Email" placeholder="name@example" error="This field is required" />
        <Input label="Disabled" value="You cannot edit this" disabled editable={false} />
      </ShowcaseItem>

      <ShowcaseItem label="Password">
        <Input
          label="Password"
          placeholder="At least 8 characters"
          secureTextEntry
          value={password}
          onChange={setPassword}
          isPasswordValid={password.length >= PASSWORD_MIN_LENGTH}
        />
      </ShowcaseItem>

      <ShowcaseItem label="Search (debounced)">
        <Input
          placeholder="Search"
          isSearch
          onChange={setSearch}
          prefix={<Ionicons name="search" size={16} color={searchIconColor} />}
          helperComponent={
            <Text variant="xsm" color="caption" autoTranslate={false}>
              {`Debounced value = ${search || "(empty)"}`}
            </Text>
          }
        />
      </ShowcaseItem>

      <ShowcaseItem label="Prefix and suffix">
        <Input
          placeholder="Username"
          prefix={<Icon name="profile" size={16} color="secondary" />}
          suffix={<Icon name="check" size={16} color="success" />}
        />
      </ShowcaseItem>

      <ShowcaseItem label="Phone input">
        <PhoneInput label="Phone number" onChange={setPhone} />
        <Text variant="xsm" color="caption" autoTranslate={false}>
          {`Full number = ${phone || "(empty)"}`}
        </Text>
        <PhoneInput label="Phone with error" onChange={() => {}} error="Invalid phone number" />
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
