// App.js
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OTPScreen from "./OTPScreen";
import { ipAddress } from "../utils/ipAddress";

export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");

  const sendOtp = async () => {
    console.log(phoneNumber);
  
    const response = await axios.post(
      `http://${ipAddress}/api/send-otp`,
      { phoneNumber } // Pass params as the second argument
    );
  
    if (response.data.success) {
      Alert.alert("Success", `OTP sent to +92${phoneNumber}`);
      navigation.navigate("OTPScreen", { phoneNumber });
    } else {
      Alert.alert("Error", "Failed to send OTP");
    }
  };
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");

        if (userId) {
          setTimeout(() => {
            navigation.replace("Home");
          }, 400);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image
          source={require("../assets/images/3411468.jpg")}
          resizeMode="contain"
          style={styles.secureLogin}
        />
        <View>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Enter Your Phone Number
          </Text>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            We will send you a verification Code
          </Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.selectFlagContainer}
              onPress={() => {}}
            >
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={require("../assets/images/pak_flag.png")}
                  resizeMode="contain"
                  style={styles.flagIcon}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text style={{ color: "#000", fontSize: 12 }}>+92</Text>
              </View>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="3059093435"
              placeholderTextColor="#000"
              selectionColor="#000"
              keyboardType="numeric"
              onChangeText={setPhoneNumber}
            />
          </View>

          <Button title="Send Code" onPress={sendOtp} />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("AdminLogin")}>
        <Text style={{ marginTop: 30, color: "blue" }}>
          If you are an admin or expert, click here to login.
        </Text>
      </TouchableOpacity>

        {/* <View style={styles.bottomContainer}>
          <Text style={{ textAlign: "center" }}>
            By Continuing you accept calorie challenge
          </Text>
          <Text
            style={{
              textDecorationColor: "#000",
              textDecorationLine: "underline",
              marginBottom: 5,
            }}
          >
            Terms of use and privacy
          </Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 0,
    alignItems: "center",
  },
  secureLogin: {
    height: "50%",
    width: "50%",
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#000",
    borderBottomWidth: 0.4,
    height: 58,
    widht: "25%",
    alignItems: "center",
    marginVertical: 32,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: "#000",
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  flagIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    marginVertical: "10",
    height: 40,
    fontSize: 14,
    color: "#000",
    fontFamily: "DMRegular",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    right: 16,
    left: 16,
    alignItems: "center",
  },
});
