import { Link, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "@/components/atoms";
import MainScreenWrapper from "@/components/templates/MainScreenWrapper";

const Home = () => {
  const router = useRouter();
  return (
    <MainScreenWrapper>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Text>Left</Text>
          <Text>Right</Text>
        </View>
      </View>
      <Button
        title="Go to Screen 1"
        onPress={() => router.push("/(main)/screen1")}
      />
      <Button
        title="Go to Screen 2 with props"
        onPress={() =>
          // router.push(`/(main)/screen2/${{ id: 1, from: "Button" }}`)
          router.push({
            pathname: "/(main)/screen2",
            params: { id: 1, from: "Button" },
          })
        }
      />
      <Button title={"Outlined Button"} variant="outlined" />
      <View>
        <Button title={"Underlined Button"} variant="underlined" />
      </View>
      <Text>About</Text>
      <Link href="/(main)/screen1">About</Link>
      <Link
        href={{
          pathname: "/(main)/screen2",
          params: { id: 2, from: "Link" },
        }}
      >
        View user (with params)
      </Link>
      {/* <Button
        title="Go to Welcome"
        onPress={() => router.push("/(main)/screen1")}
      /> */}
    </MainScreenWrapper>
  );
};

export default Home;
