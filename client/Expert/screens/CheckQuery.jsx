// screens/CheckQuery.js

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchAssignedRequests } from "../../utils/fetchAssignedRequest";


const CheckQuery = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const expertId = await AsyncStorage.getItem("userId");
        const data = await fetchAssignedRequests(expertId);
        setRequests(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch consultation requests");
      }
    };

    fetchRequests();
  }, []);

  const renderRequest = ({ item }) => (
    <View style={styles.requestContainer}>
      <Text style={styles.requestText}>User: {item.user.name}</Text>
      <Text style={styles.requestText}>Query: {item.query}</Text>
      <Text style={styles.requestText}>Phone: {item.user.phoneNumber}</Text>
      <TouchableOpacity
        style={styles.messageIcon}
        onPress={() => navigation.navigate("Chat", { userId: item.user._id })}
      >
        <Text style={styles.messageText}>Message</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={renderRequest}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContent: {
    padding: 20,
  },
  requestContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  requestText: {
    fontSize: 16,
    marginBottom: 5,
  },
  messageIcon: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
});

export default CheckQuery;
