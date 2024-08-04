import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [cnic, setCnic] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [errors, setErrors] = useState({});

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateCnic = (cnic) => /^\d{13}$/.test(cnic);
  const validateCity = (city) => city !== "";

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(",")[1]); // Get the base64 string without metadata
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      setProfilePicture(base64Image);
    }
  };

  const handleUpdateProfile = async () => {
    const newErrors = {};
    if (!validateName(name)) newErrors.name = "Name can only contain letters.";
    if (!validateCnic(cnic)) newErrors.cnic = "CNIC must be 13 digits.";
    if (!validateCity(city)) newErrors.city = "City is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = {
          name,
          city,
          cnic,
          profilePicture,
        };

        const response = await axios.put(
          `http://${ipAddress}/api/update-profile`,
          payload
        );

        if (response.data.success) {
          Alert.alert("Profile updated successfully");
        } else {
          Alert.alert("Failed to update profile");
        }

        setName("");
        setCity("");
        setCnic("");
        setProfilePicture("");
      } catch (error) {
        console.error("Error updating profile:", error.message);
        Alert.alert("Error updating profile");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Text style={styles.text}>Update Profile</Text>

      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Profile Picture</Text>
      </Pressable>

      {profilePicture ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${profilePicture}` }}
            style={styles.image}
          />
        </View>
      ) : null}

      <TextInput
        placeholder="Enter Your Name"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Enter Your City"
        style={styles.input}
        onChangeText={setCity}
        value={city}
      />
      {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

      <TextInput
        placeholder="Enter Your CNIC"
        style={styles.input}
        onChangeText={setCnic}
        value={cnic}
        keyboardType="numeric"
      />
      {errors.cnic && <Text style={styles.errorText}>{errors.cnic}</Text>}

      <Pressable style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 10,
    paddingBottom: 20, // Ensure padding at the bottom for visibility
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 60,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: "cover",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#5F9EA0",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
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
    color: "#312651",
    marginBottom: 20,
  },
});

export default Profile;
