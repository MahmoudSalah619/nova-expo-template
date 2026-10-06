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
    title: "Personal Information",
    rows: ["First Name: John", "Last Name: Doe", "Age: 25"],
  },
  {
    title: "contactInformation",
    rows: ["Email: john.doe@example.com", "Phone: +20 100 000 0000"],
  },
  {
    title: "address",
    rows: ["City: Cairo", "Street: 5th Settlement", "Building: 5"],
  },
  {
    title: "socialMedia",
    rows: ["Facebook: johndoe", "Twitter: @johndoe", "Instagram: @johndoe"],
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
        <Text variant="H3" autoTranslate={false}>
          John Doe
        </Text>
        {/* Stretch + center: an auto-width centered Text clips the tail of this font on Android */}
        <Text variant="sm" color="caption" isCentered style={styles.email} autoTranslate={false}>
          john.doe@example.com
        </Text>
      </View>
      </View>

      <View style={styles.section}>
        <Text variant="xsm" color="caption" style={styles.sectionLabel}>
          accountLabel
        </Text>
        <View style={styles.listCard}>
          {PROFILE_SECTIONS.map((section, index) => (
            <Fragment key={section.title}>
              {index > 0 && <View style={styles.divider} />}
              <View style={styles.collapsibleItem}>
                <Collapsible title={section.title}>
                  <View style={styles.collapsibleBody}>
                    {section.rows.map((row) => (
                      <Text key={row} variant="sm" color="body" autoTranslate={false}>
                        {row}
                      </Text>
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
          preferencesLabel
        </Text>
        <View style={styles.listCard}>
          {/* i18n:start */}
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Icon name="globe" size={18} color="action" />
            </View>
            <Text size={15} fontFamily="font600" style={styles.settingText}>
              changeLanguage
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
              appearance
            </Text>
            <View style={GLOBAL_STYLES.flipInArabic}>
              <Icon name="chevronRight" size={18} color="caption" />
            </View>
          </PressableScale>
        </View>
      </View>

      <View>
      <Button
        title="logout"
        variant="outlined"
        prefix={<Icon name="logOut" size={18} color="danger" />}
        onPress={handleLogout}
      />
      </View>
    </ScreenWrapper>
  );
}
