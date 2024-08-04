import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const CropCard = ({ imageUrl, title }) => {
  return (
    <View style={styles.item}>
      <Image source={imageUrl} style={styles.image} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    fontFamily: "DMMedium",
    marginLeft: 20,
  },
});

export default CropCard;
