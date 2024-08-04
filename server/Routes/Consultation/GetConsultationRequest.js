// routes/consultationRequests.js

const express = require("express");
const Expert = require("../../Models/Expert");
const User = require("../../Models/User");
const ConsultationRequest = require("../../Models/ConsultationRequest");

const router = express.Router();

// Endpoint to fetch consultation requests assigned to a specific expert
router.get("/assigned-requests/:expertId", async (req, res) => {
  const { expertId } = req.params;

  try {
    const consultationRequests = await ConsultationRequest.find({
      assignedExpert: expertId,
    })
      .populate("user", "name phoneNumber")
      .populate("assignedExpert", "name");

    res.json(consultationRequests);
  } catch (error) {
    console.error("Error fetching assigned consultation requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
