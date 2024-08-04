import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import img7 from "./images/7.jpg";
import img8 from "./images/8.jpg";
import img9 from "./images/9.jpg";
import img10 from "./images/10.jpg";
import img11 from "./images/11.jpg";
import img12 from "./images/12.jpg";
import img13 from "./images/13.jpg";
import img14 from "./images/14.jpg";
import img15 from "./images/15.jpg";
import img16 from "./images/16.jpg";

const SowingStage = () => {
  return (
    <View>
      <Text style={styles.text}>
        آبپاش علاقوں میں گندم کی کاشت کپاس، مکئی، اور کماد کی کاشت والے علاقے
        وتر کا طریقہ سابقہ فصل کاٹنے سے 15 سے 20 دن قبل کھیت کو پانی دیں تاکہ جب
        چھڑیاں کاٹیں تو زمین وتر حالت میں ہو۔{" "}
      </Text>

      <Image style={styles.image} source={img10} />

      <Text style={styles.text}>
        چھڑیاں کاٹنے کے فوراً بعد دو مرتبہ ہل چلائیں ۔ پھر ایک مرتبہ روٹا ویٹر
        کا استعمال کریں۔ اگر روٹا ویٹر میسر نہ ہو تو بھاری سہاگہ دیں۔ اس کے بعد
        بیج بذریعہ ڈرل کاشت کریں {" "}
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        خشک طریقہ{" "}
      </Text>

      <Text style={styles.text}>
        سابقہ فصل کی چھڑیاں کاٹنے اور کماد کی برداشت کے بعد اگر زمین میں وتر نہ
        ہو تو دو مرتبہ عام ہل چلائیں۔ ایک مرتبہ روٹا ویٹر یا ڈسک ہیرو کا استعمال
        کریں۔ بوائی بذریعہ ڈرل کرنے کے بعد فوراً پانی لگا دیں۔ خیال رہے کہ بیج
        کی گہرائی ایک انچ سے زیادہ نہ ہو{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },

  image: {
    width: 310,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
});
export default SowingStage;
