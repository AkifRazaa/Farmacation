import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OtpInput } from "react-native-otp-entry";
import { ipAddress } from "../utils/ipAddress";
import axios from "axios";

const OTPScreen = ({ navigation, route }) => {
  const [otp, setOTP] = useState("");

  const verifyOtp = async () => {
    const { phoneNumber } = route.params;
    console.log(otp);
  
    const response = await axios.post(
      `http://${ipAddress}/api/verify-otp`,
      { phoneNumber, verificationToken: otp }
    );
  
    if (response.data.success) {
      if (response.data.profileComplete) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("CompleteProfile", { userId: response.data.userId });
      }
      AsyncStorage.setItem("userId", response.data.userId);
      AsyncStorage.setItem("userName", response.data.userName);
    } else {
      Alert.alert("Error", "Invalid OTP");
      console.log("Invalid OTP");
    }
  };
  

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          padding: 16,
          alignItems: "center",
        }}
      >
        <StatusBar hidden />
        <Image
          source={require("../assets/images/farmer.jpg")}
          resizeMode="contain"
          style={{
            width: 200,
            height: 200,
            marginBottom: 16,
          }}
        />
        <Text style={{ marginVertical: 12 }}>Enter Verification Code</Text>

        <View style={{ marginVertical: 22, width: 325 }}>
          <OtpInput
            numberOfDigits={6}
            // onChangeText={setOTP}
            onTextChange={(text) => {
              console.log(text);
              setOTP(text);
            }}
            focusColor="#000"
            focusStickBlinkingDuration={400}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: "#fff",
                width: 58,
                height: 58,
                borderRadius: 12,
              },
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          {/* <Text>Did'nt received the Code?</Text>
          <TouchableOpacity>
            <Text style={{ color: "blue" }}> Resend Code</Text>
          </TouchableOpacity> */}
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.saveBtn,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          onPress={verifyOtp}
        >
          <Text style={styles.saveText}>Verify</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  saveBtn: {
    backgroundColor: "#5F9EA0",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 8,
    borderRadius: 20,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "DMMedium",
  },
});
