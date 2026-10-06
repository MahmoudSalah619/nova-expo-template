import React, { Fragment } from "react";
import { TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
// i18n:start
import { useTranslation } from "react-i18next";
// i18n:end
import { Button, Collapsible, Icon, PressableScale, Text } from "@/components/shared/ui";
import ScreenWrapper from "@/components/shared/layout/ScreenWrapper";
import GLOBAL_STYLES from "@/constants/GlobalStyles";
// i18n:start
import i18n from "@/locale";
// i18n:end
import styles from "./styles";

// i18n:start
type Language = "en" | "ar";

// i18n:end
const PROFILE_SECTIONS = [
  {
    title: "PERSONAL_INFORMATION",
    rows: [
      { label: "FIRST_NAME", value: "John" },
      { label: "LAST_NAME", value: "Doe" },
      { label: "AGE", value: "25" },
    ],
  },
  {
    title: "CONTACT_INFORMATION",
    rows: [
      { label: "EMAIL", value: "john.doe@example.com" },
      { label: "PHONE", value: "+20 100 000 0000" },
    ],
  },
  {
    title: "ADDRESS",
    rows: [
      { label: "CITY", value: "Cairo" },
      { label: "STREET", value: "5th Settlement" },
      { label: "BUILDING", value: "5" },
    ],
  },
  {
    title: "SOCIAL_MEDIA",
    rows: [
      { label: "FACEBOOK", value: "johndoe" },
      { label: "X_TWITTER", value: "@johndoe" },
      { label: "INSTAGRAM", value: "@johndoe" },
    ],
  },
];

// i18n:start
const LANGUAGES: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ar", label: "AR" },
];

// i18n:end
export default function Profile() {
  const router = useRouter();
  // i18n:start
  const { i18n: activeI18n } = useTranslation();
  // i18n:end

  const handleLogout = async () => {
    router.replace("/(auth)/welcome");
  };

  // i18n:start
  const changeLanguage = async (lang: Language) => {
    try {
      await i18n.changeLanguage(lang);
    } catch (error) {
      console.error("Language change failed", error);
    }
  };

  // i18n:end
  return (
    <ScreenWrapper variant="main" isScrollable style={styles.screen}>
      <View>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text size={26} fontFamily="font700" color="onAction" autoTranslate={false}>
            JD
          </Text>
        </View>
        <Text variant="H3">
          DEMO_USER_NAME
        </Text>
        {/* Stretch + center: an auto-width centered Text clips the tail of this font on Android */}
        <Text variant="sm" color="caption" isCentered style={styles.email} autoTranslate={false}>
          john.doe@example.com
        </Text>
      </View>
      </View>

      <View style={styles.section}>
        <Text variant="xsm" color="caption" style={styles.sectionLabel}>
          PROFILE_ACCOUNT_LABEL
        </Text>
        <View style={styles.listCard}>
          {PROFILE_SECTIONS.map((section, index) => (
            <Fragment key={section.title}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.collapsibleItem}>
                <Collapsible title={section.title}>
                  <View style={styles.collapsibleBody}>
                    {section.rows.map((row) => (
                      <View key={row.label} style={styles.infoRow}>
                        <Text variant="sm" color="caption">
                          {row.label}
                        </Text>
                        <Text
                          variant="sm"
                          numberOfLines={1}
                          style={styles.infoValue}
                          autoTranslate={false}
                        >
                          {row.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Collapsible>
              </View>
            </Fragment>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="xsm" color="caption" style={styles.sectionLabel}>
          PROFILE_PREFERENCES_LABEL
        </Text>
        <View style={styles.listCard}>
          {/* i18n:start */}
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Icon name="globe" size={18} color="action" />
            </View>
            <Text size={15} fontFamily="font600" style={styles.settingText}>
              LANGUAGE
            </Text>
            <View style={styles.segmented}>
              {LANGUAGES.map((language) => {
                const isActive = activeI18n.language === language.value;
                return (
                  <TouchableOpacity
                    key={language.value}
                    style={[styles.segment, isActive && styles.segmentActive]}
                    onPress={() => changeLanguage(language.value)}
                  >
                    <Text
                      size={12}
                      fontFamily="font700"
                      color={isActive ? "primary" : "caption"}
                      autoTranslate={false}
                    >
                      {language.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.divider} />
          {/* i18n:end */}
          <PressableScale
            style={styles.settingRow}
            pressedScale={0.98}
            onPress={() => router.push("/(main)/screen1")}
          >
            <View style={styles.settingIcon}>
              <Icon name="moon" size={18} color="action" />
            </View>
            <Text size={15} fontFamily="font600" style={styles.settingText}>
              APPEARANCE
            </Text>
            <View style={GLOBAL_STYLES.flipInArabic}>
              <Icon name="chevronRight" size={18} color="caption" />
            </View>
          </PressableScale>
        </View>
      </View>

      <View>
      <Button
        title="LOG_OUT"
        variant="outlined"
        prefix={<Icon name="logOut" size={18} color="danger" />}
        onPress={handleLogout}
      />
      </View>
    </ScreenWrapper>
  );
}
