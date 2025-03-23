import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

import { useState } from "react";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import Text from "@/components/atoms/Text";
import styles from "./styles";
import { InputFieldProps } from "./types";
import { COLORS } from "@/constants/Colors";
import { theme } from "@/utils/getTheme";
import debounce from "@/utils/debounce";

export default function Input({
  error,
  editable = true,
  containerStyle,
  prefix,
  suffix,
  placeholder = "",
  secureTextEntry = false,
  placeholderTextColor = `${COLORS[theme].secondary}`,
  inputColorWhenDisabled = COLORS[theme].secondary,
  isTextAreaInput = false,
  inputStyle,
  hintText,
  label,
  isPlaceholderDotsHidden = true,
  isSearch = false,
  onChange = () => {},
  ...otherProps
}: InputFieldProps) {
  const hasErrors = Boolean(error);
  const [showPassword, setShowPassword] = useState(false);

  const debouncedOnChange = debounce((value: string) => {
    if (onChange) onChange(value);
  }, 300); // 300ms debounce time

  const handleChangeText = (text: string) => {
    if (isSearch) {
      debouncedOnChange(text);
    } else if (onChange) {
      onChange(text);
    }
  };

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
    containerStyle,
    hasErrors && styles.errorBorder,
    isTextAreaInput && styles.textAreaContainer,
  ];

  const inputStyles = [
    styles.input,
    inputStyle && { ...inputStyle },
    !editable && { color: inputColorWhenDisabled }, // override color when disabled
    isTextAreaInput && styles.textAreaInput,
  ];

  const placeholderTextColorValue = placeholderTextColor || COLORS[theme].grey;

  const LabelMarkup = !!label && (
    <View>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );

  const PasswordIconMarkup = secureTextEntry && (
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
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor={placeholderTextColorValue}
          autoCorrect={false}
          autoCapitalize="none"
          multiline={Boolean(isTextAreaInput)}
          numberOfLines={isTextAreaInput ? 5 : 1}
          style={inputStyles}
          onChangeText={handleChangeText}
          {...otherProps}
        />

        {!!suffix && <View style={styles.spaceEnd10}>{suffix}</View>}
        {secureTextEntry && PasswordIconMarkup}
      </View>

      {ErrorSectionMarkup}
    </View>
  );
}
