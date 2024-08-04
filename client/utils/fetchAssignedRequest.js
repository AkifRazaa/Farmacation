// utils/api.js

import axios from "axios";
import { ipAddress } from "./ipAddress";

// Function to fetch consultation requests assigned to a specific expert
export const fetchAssignedRequests = async (expertId) => {
  try {
    const response = await axios.get(`http://${ipAddress}/api/assigned-requests/${expertId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching assigned requests:", error);
    throw error;
  }
};
