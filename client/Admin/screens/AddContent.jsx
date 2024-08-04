import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const AddContent = () => {
  const [contents, setContents] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch crops from the backend
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get("http://192.168.100.20:5000/api/crops");

      if (response.data.success === true) {
        setCrops(response.data.crops);
      }
    } catch (error) {
      console.error("Error fetching crops:", error.message);
    }
  };

  const handleCropChange = (cropId) => {
    setSelectedCrop(cropId);
  };

  const addContent = (type, value) => {
    setContents((currentContents) => [...currentContents, { type, value }]);
    if (type === "text") {
      setText("");
    }
  };

  const removeContent = (index) => {
    setContents((currentContents) =>
      currentContents.filter((_, i) => i !== index)
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true, // Enable base64 encoding
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      addContent("image", base64Image);
    }
  };

  const saveContent = async () => {
    // Check if a text block exists in the contents
    const hasDescription = contents.some((content) => content.type === "text");

    if (
      !title.trim() ||
      !hasDescription ||
      !contents.length ||
      !selectedCrop ||
      !category ||
      !subCategory
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const structuredData = contents.map((item) => {
        if (item.type === "text") {
          return { type: "text", value: item.value };
        } else if (item.type === "image") {
          return { type: "image", value: item.value };
        }
      });

      const payload = {
        cropId: selectedCrop,
        title: title,
        description: text, // Use the text input value
        images: contents
          .filter((item) => item.type === "image")
          .map((item) => item.value),
        blocks: structuredData,
        category: category,
        subCategory: subCategory,
      };

      const response = await axios.post(
        "http://192.168.100.20:5000/api/content",
        payload
      );

      if (!response.data.success) {
        Alert.alert("Failed to save content");
        return;
      }

      Alert.alert("Content saved successfully");

      // Reset state or navigate to another screen
    } catch (error) {
      console.error("Error saving content:", error.message);
      Alert.alert("Error saving content");
    } finally {
      setLoading(false);
    }
  };

  const validateTitle = (text) => {
    // Allow only alphabets in the title
    return /^[a-zA-Z\s]*$/.test(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView key={contents.length}>
      <Text style={styles.heading}>Add Content</Text>

        <Picker
          selectedValue={selectedCrop}
          onValueChange={(itemValue) => handleCropChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a crop" value="" />
          {crops.map((crop) => (
            <Picker.Item
              key={crop._id}
              label={crop.cropName}
              value={crop._id}
            />
          ))}
        </Picker>

        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Education" value="education" />
          <Picker.Item label="Disease" value="disease" />
        </Picker>

        {category === "education" && (
          <Picker
            selectedValue={subCategory}
            onValueChange={(itemValue) => setSubCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Stage" value="" />
            <Picker.Item label="Pre-Sowing" value="Pre-Sowing" />
            <Picker.Item label="Flowering" value="Flowering" />
            <Picker.Item label="Harvesting" value="Harvesting" />
          </Picker>
        )}

        {category === "disease" && (
          <Picker
            selectedValue={subCategory}
            onValueChange={(itemValue) => setSubCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Type" value="" />
            <Picker.Item label="Pest" value="Pest" />
            <Picker.Item label="Weed" value="Weed" />
          </Picker>
        )}

        <TextInput
          placeholder="Enter title here..."
          style={styles.titleInput}
          onChangeText={(title) => setTitle(title)}
          value={title}
          onBlur={() => {
            if (!validateTitle(title)) {
              Alert.alert(
                "Title Validation",
                "Title should contain only alphabets."
              );
              setTitle("");
            }
          }}
        />

        <TextInput
          placeholder="Enter description here..."
          style={styles.descriptionInput}
          onChangeText={(text) => setText(text)}
          value={text}
          onBlur={() => {
            if (text.trim()) {
              addContent("text", text);
            }
          }}
        />

        <View style={styles.contents}>
          {contents.map((item, index) =>
            item.type === "text" ? (
              <View key={`text-${index}`} style={styles.textContainer}>
                <Text style={styles.text}>{item.value}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => removeContent(index)}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <View key={`image-${index}`} style={styles.imageContainer}>
                <Image source={{ uri: item.value }} style={styles.image} />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => removeContent(index)}
                >
                  <AntDesign name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )
          )}
        </View>

        <Pressable onPress={pickImage}
        style={({ pressed }) => [
          styles.addImageBtn,
          { opacity: pressed ? 0.6 : 1 },
        ]}
        >
          <Text style={styles.addImageText}>Add Image</Text>
        </Pressable>

        <Pressable onPress={saveContent} disabled={loading}
        style={({ pressed }) => [
          styles.saveBtn,
          { opacity: pressed ? 0.6 : 1 },
        ]}
        >
          <Text style={styles.saveText}>Save Content</Text>
        </Pressable>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontFamily: "DMBold",
    fontSize: 30,
    marginLeft: 20,
    color: "#312651",
    marginBottom: 10,
  },
  titleInput: {
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
  descriptionInput: {
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
  contents: {
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
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
});

export default AddContent;
