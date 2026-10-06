import { Link, useRouter } from "expo-router";
import { Button, Text } from "@/components/shared/ui";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";

export default function NavigationShowcase() {
  const router = useRouter();

  return (
    <ShowcaseSection
      title="Navigation"
      description="Expo Router pushes and links, including params. Screen 3 shows the FlashList wrapper."
    >
      <ShowcaseItem label="Router">
        <Button title="Go to Screen 1" onPress={() => router.push("/(main)/screen1")} />
        <Button
          title="Go to Screen 2 with props"
          variant="outlined"
          onPress={() =>
            router.push({
              pathname: "/(main)/screen2",
              params: { id: 1, from: "Button" },
            })
          }
        />
        <Button
          title="Go to FlashList"
          variant="ghost"
          onPress={() => router.push({ pathname: "/(main)/screen3" })}
        />
      </ShowcaseItem>

      <ShowcaseItem label="Links">
        <Link href="/(main)/screen1">
          <Text variant="md" color="primary">
            About
          </Text>
        </Link>
        <Link
          href={{
            pathname: "/(main)/screen2",
            params: { id: 2, from: "Link" },
          }}
        >
          <Text variant="md" color="primary">
            View user with params
          </Text>
        </Link>
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
