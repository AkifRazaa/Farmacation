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
import { ipAddress } from "../../utils/ipAddress";
import { Picker } from "@react-native-picker/picker";

const AddExpert = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const [errors, setErrors] = useState({});

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhoneNumber = (phone) => /^\d{11}$/.test(phone);
  const validatePassword = (password) => password.length >= 6;
  const validateCnic = (cnic) => /^\d{13}$/.test(cnic);
  const validateRegion = (region) => region !== "";
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

  const handleSaveExpert = async () => {
    const newErrors = {};
    if (!validateName(name)) newErrors.name = "Name can only contain letters.";
    if (!validateEmail(email)) newErrors.email = "Invalid email address.";
    if (!validatePhoneNumber(phoneNumber))
      newErrors.phoneNumber = "Phone number must be 11 digits.";
    if (!validatePassword(password))
      newErrors.password = "Password must be at least 6 characters.";
    if (!validateCnic(cnic)) newErrors.cnic = "CNIC must be 13 digits.";
    if (!validateRegion(region)) newErrors.region = "Region is required.";
    if (!validateCity(city)) newErrors.city = "City is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const payload = {
          name,
          email,
          phoneNumber,
          password,
          cnic,
          region,
          city,
          profilePicture,
        };

        const response = await axios.post(
          `http://${ipAddress}/api/add-expert`,
          payload
        );

        if (response.data.success) {
          Alert.alert("Expert created successfully");
        } else {
          Alert.alert("Failed to create expert");
        }

        setName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setCnic("");
        setRegion("");
        setCity("");
        setProfilePicture("");
      } catch (error) {
        console.error("Error saving expert:", error.message);
        Alert.alert("Error saving expert");
      }
    }
  };

  const cityOptions =
    region === "Punjab"
      ? ["Multan", "Lahore"]
      : region === "Sindh"
      ? ["Karachi", "Hyderabad"]
      : [];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>

<Text style={styles.text}>Add Expert</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="numeric"
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <TextInput
        placeholder="CNIC"
        style={styles.input}
        onChangeText={setCnic}
        value={cnic}
        keyboardType="numeric"
      />
      {errors.cnic && <Text style={styles.errorText}>{errors.cnic}</Text>}

      <Picker
        selectedValue={region}
        onValueChange={(itemValue) => setRegion(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Region" value="" />
        <Picker.Item label="Punjab" value="Punjab" />
        <Picker.Item label="Sindh" value="Sindh" />
      </Picker>
      {errors.region && <Text style={styles.errorText}>{errors.region}</Text>}

      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
        style={styles.input}
        enabled={region !== ""}
      >
        <Picker.Item label="Select City" value="" />
        {cityOptions.map((cityOption) => (
          <Picker.Item key={cityOption} label={cityOption} value={cityOption} />
        ))}
      </Picker>
      {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Profile Picture</Text>
      </Pressable>

      {profilePicture ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${profilePicture}` }}
          style={styles.image}
        />
      ) : null}

      <Pressable style={styles.button} onPress={handleSaveExpert}>
        <Text style={styles.buttonText}>Save Expert</Text>
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
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
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
    color: "#312651",
    marginBottom: 20,
  },
});

export default AddExpert;
