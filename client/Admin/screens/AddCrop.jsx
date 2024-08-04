import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import DeleteCrop from "../components/DeleteCrop";
import { ipAddress } from "../../utils/ipAddress";


const AddCrop = () => {
  const [cropName, setCropName] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setCropImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setCropImage("");
  };

  const isValidCropName = (name) => {
    const trimmedName = name.trim();
    const regex = /^[a-zA-Z\s]+$/;
    return trimmedName.length >= 3 && regex.test(trimmedName);
  };

  const saveCrop = async () => {
    if (!cropName || !cropImage) {
      Alert.alert("Error", "Both crop name and image are required");
      return;
    }

    if (!isValidCropName(cropName)) {
      Alert.alert(
        "Error",
        "Crop name should contain only letters, and be at least 3 characters long"
      );
      return;
    }

    setLoading(true);

    let base64Image = "";
    try {
      const response = await fetch(cropImage);
      const blob = await response.blob();
      base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
      setLoading(false);
      return;
    }

    // console.log(cropName);
    // console.log(base64Image);

    try {
      const response = await axios.post(
        `http://${ipAddress}:5000/api/add-crop`,
        {
          cropName,
          base64Image,
        }
      );

      if (response.data.success === true) {
        Alert.alert("Success", "Crop Added Successfully");

        setCropImage("");
        setCropName("");
      } else if (response.data.message === "Crop already exists") {
        Alert.alert("Error", "Crop already exists");
      } else {
        Alert.alert("Error", "Crop Failed to Add");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      Alert.alert("Error", "An error occurred while saving the crop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.text}>Add Crop</Text>

        <TextInput
          value={cropName}
          onChangeText={(text) => setCropName(text)}
          placeholderTextColor={"gray"}
          style={styles.cropNameInput}
          placeholder="Enter Crop Name"
        />

        {cropImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: cropImage }} style={styles.image} />
            <TouchableOpacity style={styles.closeIcon} onPress={removeImage}>
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.addImageBtn,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={pickImage}
          >
            <Text style={styles.addImageText}>Add Image</Text>
          </Pressable>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.saveBtn,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={saveCrop}
          >
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        )}

        <DeleteCrop />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    padding: 20,
    // backgroundColor: "#fff",
  },
  text: {
    fontFamily: "DMBold",
    fontSize: 30,
    color: "#312651",
    marginBottom: 20,
  },
  cropNameInput: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: "#98DD3F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 60,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 5,
  },

  addImageBtn: {
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
  addImageText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "DMMedium",
  },
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
    borderRadius:20
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "DMMedium",
  },

  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 50,
  },
});

export default AddCrop;
