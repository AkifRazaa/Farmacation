// components/ConsultationRequests.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { ipAddress } from "../../utils/ipAddress";
import { Picker } from "@react-native-picker/picker";

const ConsultationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [experts, setExperts] = useState({});
  const [selectedExpert, setSelectedExpert] = useState({});

  useEffect(() => {
    fetchPendingRequests();
    fetchExperts();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}/api/consultation-requests/pending`
      );
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error.message);
    }
  };

  const fetchExperts = async () => {
    try {
      const response = await axios.get(`http://${ipAddress}/api/get-experts`);
      if (response.data.success) {
        const expertsList = {};
        response.data.experts.forEach((expert) => {
          expertsList[expert._id] = expert.name;
        });
        setExperts(expertsList);
      }
    } catch (error) {
      console.error("Error fetching experts:", error.message);
    }
  };

  const handleRequestUpdate = async (id, status) => {
    if (status === "Accepted" && !selectedExpert[id]) {
      Alert.alert("Error", "Please select an expert to accept this request.");
      return;
    }

    try {
      const expertId = status === "Accepted" ? selectedExpert[id] : null;
      const response = await axios.put(
        `http://${ipAddress}/api/${id}/assign-expert`,
        { status, expertId }
      );
      if (response.data.success) {
        fetchPendingRequests();
        Alert.alert(
          "Success",
          `Consultation request has been ${status.toLowerCase()}.`
        );
      }
    } catch (error) {
      console.error("Error updating request:", error.message);
      Alert.alert("Error", "Failed to update the request.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {requests.map((request) => (
        <View key={request._id} style={styles.requestContainer}>
          <Text>User: {request.user.name}</Text>
          <Text>Email: {request.user.email}</Text>
          <Text>Query: {request.query}</Text>
          <Text>Status: {request.status}</Text>
          {request.status === "Pending" && (
            <>
              <Picker
                selectedValue={selectedExpert[request._id] || ""}
                onValueChange={(itemValue) =>
                  setSelectedExpert({
                    ...selectedExpert,
                    [request._id]: itemValue,
                  })
                }
              >
                <Picker.Item label="Select an expert" value="" />
                {Object.keys(experts).map((expertId) => (
                  <Picker.Item
                    key={expertId}
                    label={experts[expertId]}
                    value={expertId}
                  />
                ))}
              </Picker>
              <View style={styles.buttonContainer}>
                <Button
                  title="Accept"
                  onPress={() => handleRequestUpdate(request._id, "Accepted")}
                />
                <Button
                  title="Reject"
                  onPress={() => handleRequestUpdate(request._id, "Rejected")}
                />
              </View>
            </>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  requestContainer: {
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ConsultationRequests;
