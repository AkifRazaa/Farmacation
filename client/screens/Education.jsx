import React from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";

import CropCard from "../components/Education/CropCard";
import { crops } from "../constant/crop";

const Education = ({ navigation }) => {
  // Navigate to the detail screen of the respective crop by passing the title as parameter
  const handleCropPress = (title, image) => {
    navigation.navigate("CropDetail", { cropTitle: title, cropImage: image });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Crop Education</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {crops.map((crop, index) => (
          <Pressable
            key={index}
            onPress={() => handleCropPress(crop.title, crop.imageUrl)}
          >
            <CropCard title={crop.title} imageUrl={crop.imageUrl} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F8",
    padding: 10,
  },
  text: {
    fontFamily: "DMBold",
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
    color: "#312651",
  },
  scrollView: {
    marginTop: 10,
  },
});

export default Education;
