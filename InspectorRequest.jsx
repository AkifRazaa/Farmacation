// ! The below code is for Inspector

// * Now I want you to do the following things:

// * 1. Create a frontend page for an expert where he can see all the consultation requests which admin has assigned him. It will display respective user name, phoneNumber, his query.

// * 2. Also create backend code for it too

/////////////////////////////////////////


const express = require('express');
const router = express.Router();
const ConsultationRequest = require('../models/ConsultationRequest');
const { isAuthenticated } = require('../middleware/auth');

// Get all consultation requests assigned to a specific expert
router.get('/consultation-requests/expert/:expertId', isAuthenticated, async (req, res) => {
  try {
    const { expertId } = req.params;
    const requests = await ConsultationRequest.find({ assignedExpert: expertId })
      .populate('user', 'name phoneNumber'); // Adjust to include the fields you need

    res.json({ success: true, requests });
  } catch (error) {
    console.error('Error fetching consultation requests for expert:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { ipAddress } from "../../utils/ipAddress";
import { useAuth } from "../../context/AuthContext"; // Adjust according to your auth context

const ExpertConsultationRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth(); // Assuming you have an auth context that provides the logged-in user's info

  useEffect(() => {
    fetchAssignedRequests();
  }, []);

  const fetchAssignedRequests = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}/api/consultation-requests/expert/${user._id}`
      );
      if (response.data.success) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      console.error("Error fetching assigned requests:", error.message);
      Alert.alert("Error", "Failed to fetch assigned requests.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {requests.map((request) => (
        <View key={request._id} style={styles.requestContainer}>
          <Text>User: {request.user.name}</Text>
          <Text>Phone Number: {request.user.phoneNumber}</Text>
          <Text>Query: {request.query}</Text>
          <Text>Status: {request.status}</Text>
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
});

export default ExpertConsultationRequests;
