import React, { useState } from "react";
import { Button, Text, ThemedView } from "@/components/atoms";
import { StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import RandomModal from "@/components/organisms/common/modals/randomModal";
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
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Button title="Open ActionSheet" onPress={handleOpenActionSheet} />
      <Button title="Open Modal" onPress={handleOpenModal} />

      {isModalShown && (
        <RandomModal isVisible={isModalShown} setVisible={setisModalShown} />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default Explore;
