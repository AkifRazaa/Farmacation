// components/ExpertConsultation.js

import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import axios from "axios";
import { ipAddress } from "../utils/ipAddress";

const ExpertConsultation = () => {
  const [query, setQuery] = useState("");

  const handleConsultationRequest = async () => {
    try {
      const response = await axios.post(
        `http://${ipAddress}/api/consultation-request`,
        { query, user: "6643bd5d1f8d7c8cebf7a912" }
      );

      if (response.data.success) {
        Alert.alert("Success", "Your consultation request has been submitted.");
        setQuery("");
      }
    } catch (error) {
      console.error("Error submitting request:", error.message);
      Alert.alert("Error", "Failed to submit your request.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Browse</Text>

      <TextInput
        placeholder="Enter your query"
        value={query}
        onChangeText={setQuery}
        style={styles.textInput}
      />
      <Pressable style={styles.button} onPress={handleConsultationRequest}>
        <Text style={styles.buttonText}>Book Consultation</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  button: {
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
    borderRadius:20
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "DMMedium",
  },
  text: {
    fontFamily: "DMBold",
    fontSize: 30,
    marginLeft: 20,
    color: "#312651",
    marginBottom: 20
  },
});

export default ExpertConsultation;
