import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import { t } from "i18next";
import Text from "@/components/shared/ui/Text/Base";
import Icon from "@/components/shared/ui/Icon";
import { COLORS } from "@/constants/Colors";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
import { theme } from "@/utils/getTheme";
import debounce from "@/utils/debounce";
import styles from "./styles";
import { InputFieldProps, InputSize } from "./types";

export default function Input({
  error,
  containerStyle,
  prefix,
  suffix,
  placeholder = "",
  secureTextEntry = false,
  placeholderTextColor = COLORS[theme].text.caption,
  inputColorWhenDisabled = COLORS[theme].text.disabled,
  inputStyle,
  label,
  isPlaceholderDotsHidden = true,
  isSearch = false,
  onChange = () => {},
  size = InputSize.xl,
  helperComponent,
  disabled,
  isOptional,
  isPasswordValid,
  ...otherProps
}: InputFieldProps) {
  const hasErrors = Boolean(error);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const debouncedOnChange = debounce((value: string) => {
    if (onChange) onChange(value);
  }, 300);

  const handleChangeText = (text: string) => {
    if (isSearch) {
      debouncedOnChange(text);
    } else if (onChange) {
      onChange(text);
    }
  };

  const ErrorSectionMarkup = (
    <View>
      {hasErrors && (
        <Text variant="xsm" color="danger">
          {error}
        </Text>
      )}
    </View>
  );

  const pointerEventValue = disabled ? "none" : "box-none";

  const inputContainerStyles = [
    styles.inputContainer,
    isFocused && !hasErrors && styles.focusBorder,
    hasErrors && styles.errorBorder,
    styles[size],
    containerStyle,
  ];

  const inputStyles = [
    styles.input,
    inputStyle && { ...inputStyle },
    disabled && { color: inputColorWhenDisabled },
  ];

  const LabelMarkup = !!label && (
    <View style={styles.labelContainer}>
      <Text variant="sm" color="body">
        {label}
      </Text>
      {isOptional && (
        <Text variant="sm" color="caption">
          OPTIONAL
        </Text>
      )}
    </View>
  );

  const PasswordIconMarkup = secureTextEntry && (
    <TouchableOpacity
      onPress={() => {
        setShowPassword(!showPassword);
      }}
      style={[GLOBAL_STYLES.row, GLOBAL_STYLES.gap8]}
    >
      <Icon
        name={showPassword ? "EyeIcon" : "EyeSlash"}
        color={showPassword ? "primary" : "disabled"}
        size={16}
      />
      {isPasswordValid && (
        <Icon name="CorrectCircle" color="success" size={16} />
      )}
    </TouchableOpacity>
  );

  return (
    <View>
      {LabelMarkup}
      <Pressable
        pointerEvents={pointerEventValue}
        style={inputContainerStyles}
        onPress={() => inputRef.current?.focus()}
      >
        {!!prefix && <View style={styles.spaceEnd10}>{prefix}</View>}

        <TextInput
          ref={inputRef}
          placeholder={`${t(placeholder)}${isPlaceholderDotsHidden ? "" : "..."}`}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholderTextColor={placeholderTextColor}
          autoCorrect={false}
          autoCapitalize="none"
          numberOfLines={1}
          style={inputStyles}
          onChangeText={handleChangeText}
          scrollEnabled={false}
          {...otherProps}
          onFocus={(e) => {
            setIsFocused(true);
            otherProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            otherProps.onBlur?.(e);
          }}
        />

        {!!suffix && <View>{suffix}</View>}
        {secureTextEntry && PasswordIconMarkup}
      </Pressable>
      {ErrorSectionMarkup}
      {!!helperComponent && !hasErrors && helperComponent}
    </View>
  );
}
