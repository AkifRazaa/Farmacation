import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ipAddress } from "../../utils/ipAddress";

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`http://${ipAddress}/admin-login`, user);

      if (response.data.success) {
        const { userId, userName, role } = response.data;
        AsyncStorage.setItem("userId", userId);
        AsyncStorage.setItem("userName", userName);

        if (role === "admin") {
          navigation.navigate("Dashboard");
        } else if (role === "expert") {
          navigation.navigate("ExpertDashboard");
        }
      } else {
        Alert.alert("Login error", response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login error", "An error occurred during login");
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");

        if (userId) {
          navigation.replace("Dashboard");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
            Login to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View style={styles.inputContainer}>
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={styles.input}
              placeholder="Enter your Email"
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="gray" />
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={"gray"}
                style={styles.input}
                placeholder="Enter your Password"
              />
            </View>
          </View>
        </View>

        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  loginButton: {
    width: 200,
    backgroundColor: "black",
    padding: 15,
    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  loginButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});

export default AdminLogin;
