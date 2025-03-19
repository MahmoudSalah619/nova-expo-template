import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

import { useState } from "react";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import Text from "@/components/atoms/Text";
import styles from "./styles";
import { InputFieldProps } from "./types";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";

export default function PureInput({
  error,
  editable = true,
  customContainerStyle,
  prefix,
  suffix,
  placeholder = "",
  textContentType,
  placeholderTextColor = `${COLORS[theme].secondary}`,
  customInputColorWhenDisabled = COLORS[theme].secondary,
  isTextAreaInput = false,
  customInputStyle,
  hintText,
  labelText,
  isPlaceholderDotsHidden = true,
  ...otherProps
}: InputFieldProps) {
  const hasErrors = Boolean(error);
  const [showPassword, setShowPassword] = useState(false);

  const ErrorSectionMarkup = (
    <View>
      {hasErrors && <Text style={styles.errorText}>{error}</Text>}
      {hintText && !hasErrors && (
        <View style={GLOBAL_STYLES.row}>
          <FontAwesome
            name="exclamation"
            size={14}
            color={COLORS[theme].secondary}
            style={styles.spaceAround}
          />
          <Text style={styles.hintText}>{hintText}</Text>
        </View>
      )}
    </View>
  );

  const pointerEventValue = editable === false ? "none" : "auto";

  const inputContainerStyles = [
    styles.inputContainer,
    customContainerStyle,
    hasErrors && styles.errorBorder,
    isTextAreaInput && styles.textAreaContainer,
  ];

  const inputStyles = [
    styles.input,
    customInputStyle && { ...customInputStyle },
    !editable && { color: customInputColorWhenDisabled }, // override color when disabled
    isTextAreaInput && styles.textAreaInput,
  ];

  const placeholderTextColorValue = placeholderTextColor || COLORS[theme].grey;

  const LabelMarkup = !!labelText && (
    <View>
      <Text style={styles.labelText}>{labelText}</Text>
    </View>
  );

  const PasswordIconMarkup = textContentType === "password" && (
    <TouchableOpacity
      onPress={() => {
        setShowPassword(!showPassword);
      }}
    >
      <Ionicons
        name={showPassword ? "eye-outline" : "eye-off-outline"}
        size={24}
        color={COLORS[theme].primary}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.spaceBottom}>
      {LabelMarkup}

      <View pointerEvents={pointerEventValue} style={inputContainerStyles}>
        {!!prefix && <View style={styles.spaceEnd10}>{prefix}</View>}

        <TextInput
          placeholder={`${placeholder}${isPlaceholderDotsHidden ? "" : "..."}`}
          secureTextEntry={textContentType === "password" && !showPassword}
          placeholderTextColor={placeholderTextColorValue}
          autoCorrect={false}
          autoCapitalize="none"
          multiline={Boolean(isTextAreaInput)}
          numberOfLines={isTextAreaInput ? 5 : 1}
          style={inputStyles}
          {...otherProps}
        />

        {!!suffix && <View style={styles.spaceEnd10}>{suffix}</View>}
        {textContentType === "password" && PasswordIconMarkup}
      </View>

      {ErrorSectionMarkup}
    </View>
  );
}
