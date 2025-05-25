import { useState } from "react";
import { Button, Text } from "@/components/atoms";
import { SheetManager } from "react-native-actions-sheet";
import RandomModal from "@/components/organisms/common/modals/randomModal";
import MainScreenWrapper from "@/components/templates/MainScreenWrapper";

const Explore = () => {
  const [isModalShown, setisModalShown] = useState(false);
  const handleOpenActionSheet = async () => {
    const payload = await SheetManager.show("random-bottom-sheet", {
      payload: { title: "Random Sheet" },
    });
    console.log(payload);
    if (payload.decision) {
      // Do something with the decision
    } else {
      // Do something else
    }
  };

  const handleOpenModal = () => {
    setisModalShown(true);
  };
  return (
    <MainScreenWrapper>
      <Text>Explore</Text>
      <Button title="Open ActionSheet" onPress={handleOpenActionSheet} />
      <Button title="Open Modal" onPress={handleOpenModal} />

      {isModalShown && (
        <RandomModal isVisible={isModalShown} setVisible={setisModalShown} />
      )}
    </MainScreenWrapper>
  );
};

export default Explore;
