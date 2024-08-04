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

const HarvestingStage = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        آبپاشی{" "}
      </Text>

      <Image style={styles.image} source={img9} />

      <Text style={styles.text}>
        پہلا پانی: شگوفے نکلتے وقت یعنی بوائی کے 20 تا 25 دن بعد اس مرحلے پر
        پانی دیر سے لگانے کی صورت میں پودا شگوفے کم بناتا ہے اور فی پودا سٹوں کی
        تعداد کم ہو جاتی ہے۔ دھان کے بعد کاشتہ گندم کو پہلا پانی بوائی کے 35 تا
        45 دن بعد لگائیں{" "}
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        کھا دیں{" "}
      </Text>

      <Image style={styles.image} source={img3} />

      <Text style={styles.text}>
        اوسط زرخیز زمین میں ایک سے ڈیڑھ بوری یوریا فصل کے اُگاؤ کے بعد پہلے پانی
        کے ساتھ استعمال کریں۔ گندم میں جھاڑ بنتے کے وقت زنگ سلفیٹ 33 فیصد (6)
        کلو گرام فی ایکڑ) اگر سابقہ فصل میں استعمال نہ کی گئی ہو تو
        گندم میں لازمی کریں{" "}
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        جڑی بوٹیوں کا کنٹرول{" "}
      </Text>

      <Image style={styles.image} source={img4} />

      <Text style={styles.text}>
        جب جڑی بوٹیاں 3 سے 4 پتوں کی حالت میں ہوں تو نوکیلے پتوں والی جڑی بوٹیوں
        کو کنٹرول کرنے کے لئے کلوڈینوفاپ پر اپر جائل 15 ڈبلیو پی 160 گرام فی
        ایکڑ جبکہ دمبی سٹی اور جنگلی جئی کے لئے پنو کساڈین 330 ملی لیٹر فی ایکڑ
        یا فینکسا پروپ-پی- ایتھائل 500 ملی لیٹر فی ایکڑ استعمال کریں جبکہ نو
        کیلے پتوں والی اور چوڑے پتوں والی دونوں جڑی بوٹیوں کی تلفی کے لئے میزو
        سلفیوران - میتھائل + آینوڈو سلفیوران- میتھائل سوڈیم 100 گرام وتر حالت
        میں سپرے کریں۔{" "}
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        چوڑے پتوں والی جڑی بوٹیاں{" "}
      </Text>

      <Text style={styles.text}>
        چوڑے پتوں والی جڑی بوٹیاں مثلاً باتھو، لیہلی، جنگلی پالک اور شاہترہ
        وغیرہ کو ختم کرنے کے لیئے بجائی کے بعد 30 تا 35 دن کے اندر، جب پودے 3 سے
        4 پتے کے مرحلے میں ہوں، تر وتر میں ٹرائیسلفورون 16 گرام یا برو ایم سی پی
        و موکسینل اوکٹا نیٹ نیٹ + ہٹا نویٹ + اے 300 ملی لیٹر، 100 سے 120 لیٹر
        پانی فی ایکڑ سپرے کریں{" "}
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
export default HarvestingStage;
