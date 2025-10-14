import { Input, Text } from "@/components/atoms";
import ProgressLine from "@/components/atoms/ProgressLine";
import MainScreenWrapper from "@/components/templates/MainScreenWrapper";
import React from "react";

const Favourites = () => {
  return (
    <MainScreenWrapper>
      <ProgressLine progress={30} />

      <Text color="primary">Favourites</Text>
      <Input
        placeholder="Enter your name"
        onChange={(e) => console.log(e, "eeeeeeeeee")}
      />
      <Input
        placeholder="Search"
        isSearch
        onChange={(e) => console.log(e, "eeeeeeeeee")}
      />
      <Input placeholder="password" label="Password Label" secureTextEntry />
    </MainScreenWrapper>
  );
};

export default Favourites;
