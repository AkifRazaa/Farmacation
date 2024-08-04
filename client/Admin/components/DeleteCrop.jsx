import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';


const DeleteCrop = () => {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get(
          "http://192.168.100.20:5000/api/crops"
        );
        if (response.data.success) {
          setCrops(response.data.crops);
        } else {
          Alert.alert("Error", "Failed to fetch crops");
        }
      } catch (error) {
        console.error("Error fetching crops:", error);
        Alert.alert("Error", "An error occurred while fetching crops");
      }
    };

    fetchCrops();
  }, []);

  const deleteCrop = async () => {
    if (!selectedCrop) {
      Alert.alert("Error", "Please select a crop to delete");
      //   console.log(("Error", "Please select a crop to delete"))
      return;
    }

    setLoading(true);

    try {
      const response = await axios.delete(
        `http://192.168.100.20:5000/api/delete-crop/${selectedCrop}`
      );

      if (response.data.success) {
        Alert.alert("Success", "Crop deleted successfully");
        setCrops(crops.filter((crop) => crop._id !== selectedCrop));
        setSelectedCrop("");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting crop:", error);
      Alert.alert("Error", "An error occurred while deleting the crop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a Crop to Delete</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCrop}
          onValueChange={(itemValue) => setSelectedCrop(itemValue)}
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
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.deleteBtn,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          onPress={deleteCrop}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  text: {
    fontFamily: "DMBold",
    fontSize: 30,
    color: "#312651",
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },

  deleteText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "DMMedium",
  },
  deleteBtn: {
    backgroundColor: "#5F9EA0",
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal:20,
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
});

export default DeleteCrop;
