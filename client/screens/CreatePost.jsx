import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { ipAddress } from "../utils/ipAddress";
import { MaterialIcons } from '@expo/vector-icons';

const CreatePost = () => {
  const { userData } = useContext(UserContext);
  const { userId, userName } = userData;

  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleMediaUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const newMedia = result.assets.map((asset) => asset.uri); // Extract URIs
      setMedia((prevMedia) => [...prevMedia, ...newMedia]); // Update state with new images
    }
  };

  const handleRemoveImage = (index) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };

  const handlePostSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when submitting

      // Convert images to base64
      const base64Images = await Promise.all(
        media.map(async (imageUri) => {
          const response = await fetch(imageUri);
          const blob = await response.blob();
          const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          return base64;
        })
      );

      // Send data to backend
      const postData = {
        userId: userId,
        userName: userName,
        content: content,
        images: base64Images,
      };

      // Make a POST request to your backend API
      const response = await axios.post(
        `http://${ipAddress}/api/create-post`,
        postData
      );

      if (response.data.success === true) {
        Alert.alert("Admin Approval Pending");
      }

      // Clear content and media after successful submission
      setContent("");
      setMedia([]);

      setLoading(false); // Set loading to false after submission
    } catch (error) {
      console.error("Error submitting post:", error);
      setLoading(false); // Set loading to false if there's an error
      // Handle error, show error message, etc.
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
      {loading && (
        <View style={styles.loaderContainer}>
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      )}

      {!loading && (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "contain",
              }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{userName}</Text>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <TextInput
  style={{
    flex: 1,
    backgroundColor: '#f0f0f0', // Light background without border
    padding: 12,
    color: 'black',
    fontSize: 16,
    borderRadius: 25, // Rounded corners
    marginVertical: 10,
    paddingHorizontal: 15, // Padding inside the input
  }}
  value={content}
  onChangeText={(text) => setContent(text)}
  placeholderTextColor={"gray"}
  placeholder="Type your message..."
  multiline
/>

          </View>

          <View style={styles.imageGrid}>
            {media.map((item, index) => (
              <View key={index} style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => handleRemoveImage(index)}
                >
                  <AntDesign name="closecircle" size={24} color="white" />
                </TouchableOpacity>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={handlePostSubmit}
            style={styles.button}
            >
              <Text
                style={styles.buttonText}
              >
                Share Post
              </Text>
            </TouchableOpacity>
            <MaterialIcons name="add-a-photo" size={24} color="black" onPress={handleMediaUpload} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 50,
  },
  imageContainer: {
    width: "30%",
    margin: "1%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
