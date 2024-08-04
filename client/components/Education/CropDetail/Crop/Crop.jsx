import { View, Text, Image } from "react-native";
import React from "react";

import styles from "./crop.style";

const Crop = ({ cropTitle, cropImage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={cropImage} style={styles.logoImage} />
      </View>

      <View style={styles.cropTitleBox}>
        <Text style={styles.cropTitle}>{cropTitle}</Text>
      </View>
    </View>
  );
};

export default Crop;
