// CompleteProfile.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { ipAddress } from "../utils/ipAddress";

const CompleteProfile = ({ route, navigation }) => {
  const { userId } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !cnic) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `http://${ipAddress}/api/update-profile`,
        { userId, name, email, cnic, profilePicture }
      );

      if (response.data.success) {
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      Alert.alert("Error", "Profile update failed");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>CNIC</Text>
        <TextInput style={styles.input} value={cnic} onChangeText={setCnic} />
        <Text style={styles.label}>Profile Picture URL</Text>
        <TextInput
          style={styles.input}
          value={profilePicture}
          onChangeText={setProfilePicture}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginVertical: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },
});

export default CompleteProfile;
