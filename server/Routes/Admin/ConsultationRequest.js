// routes/consultationRequests.js

const express = require("express");
const router = express.Router();

const User = require("../../Models/User");
const Expert = require("../../Models/Expert");
const ConsultationRequest = require("../../Models/ConsultationRequest");

// Endpoint to submit a consultation request
router.post("/consultation-request", async (req, res) => {
  try {
    const { query, user } = req.body;

    // console.log(query, user);

    const newRequest = new ConsultationRequest({
      user,
      query,
    });

    await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Consultation request submitted",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting request",
      error: error.message,
    });
  }
});

// Endpoint to fetch pending consultation requests
router.get("/consultation-requests/pending", async (req, res) => {
  try {
    const requests = await ConsultationRequest.find({
      status: "Pending",
    }).populate("user");

    res.status(200).json({ success: true, requests });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching requests",
      error: error.message,
    });
  }
});

//fetch experts
router.get("/get-experts", async (req, res) => {
  try {
    const experts = await Expert.find({});
    res.status(200).json({ success: true, experts });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching experts",
      error: error.message,
    });
  }
});

// Endpoint to update consultation request status
router.put("/:id/assign-expert", async (req, res) => {
  try {
    const { status, expertId } = req.body;
    const request = await ConsultationRequest.findById(req.params.id);

    if (!request) {
      return res
        .status(404)
        .json({ success: false, message: "Consultation request not found" });
    }

    request.status = status;

    if (status === "Accepted" && expertId) {
      request.assignedExpert = expertId;
    } else {
      request.assignedExpert = null;
    }

    await request.save();
    res.status(200).json({
      success: true,
      message: "Consultation request updated",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating request",
      error: error.message,
    });
  }
});

module.exports = router;
