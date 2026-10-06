import { useState, useEffect, useMemo, useRef } from "react";
import { View } from "react-native";
import Text from "@/components/shared/ui/Text/Base";
import { COLORS } from "@/constants/Colors";
import { Country, COUNTRIES, DEFAULT_COUNTRY } from "@/data/CountryCode";
import { theme } from "@/utils/getTheme";
import DropDown from "../DropDown";
import Input from "../Input";
import { PhoneInputProps } from "./types";
import styles from "./styles";

/**
 * Phone number input with a country dial-code picker.
 * `onChange` receives the full number including the dial code (e.g. "+201001234567").
 * @example
 * <PhoneInput label="Phone" defaultCountry="EG" onChange={setPhone} />
 */
export default function PhoneInput({
  error,
  onChange,
  defaultCountry = "EG",
  value = "",
  placeholder = "Phone Number",
  label,
  containerStyle,
  ...otherProps
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phoneValue, setPhoneValue] = useState<string>(value);
  const containerRef = useRef<View>(null);

  const countryData = useMemo(
    () =>
      COUNTRIES.map((country) => ({
        label: `${country.flag} ${country.code} ${country.dialCode}`,
        value: country.code,
      })),
    []
  );

  useEffect(() => {
    const country = COUNTRIES.find((c) => c.code === defaultCountry);
    if (country) setSelectedCountry(country);
  }, [defaultCountry]);

  useEffect(() => {
    setPhoneValue(value);
  }, [value]);

  const buildFullNumber = (country: Country, phone: string) =>
    phone ? `${country.dialCode}${phone}` : "";

  const handleCountryChange = (countryCode: unknown) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    if (!country) return;
    setSelectedCountry(country);
    onChange?.(buildFullNumber(country, phoneValue));
  };

  const handlePhoneChange = (text: string) => {
    setPhoneValue(text);
    onChange?.(buildFullNumber(selectedCountry, text));
  };

  return (
    <View>
      {!!label && (
        <View style={styles.labelContainer}>
          <Text variant="sm" color="body">
            {label}
          </Text>
        </View>
      )}
      <View
        style={[styles.container, error ? styles.errorBorder : null, containerStyle]}
        ref={containerRef}
      >
        <View style={styles.countryPrefixContainer}>
          <DropDown
            data={countryData}
            inputValue={selectedCountry.code}
            onChange={handleCountryChange}
            customInputStyle={styles.dropDown}
            arrowPosition="prefix"
            modalOptionsCustomStyle={styles.flatList}
            customRef={containerRef}
          />
        </View>
        <View style={styles.inputCon}>
          <Input
            value={phoneValue}
            onChangeText={handlePhoneChange}
            placeholder={placeholder}
            keyboardType="phone-pad"
            placeholderTextColor={COLORS[theme].text.disabled}
            {...otherProps}
            containerStyle={styles.input}
          />
        </View>
      </View>
      {!!error && (
        <Text variant="xsm" color="danger">
          {error}
        </Text>
      )}
    </View>
  );
}
