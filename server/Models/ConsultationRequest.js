// models/ConsultationRequest.js

const mongoose = require("mongoose");

const consultationRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  assignedExpert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Expert",
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ConsultationRequest = mongoose.model(
  "ConsultationRequest",
  consultationRequestSchema
);

module.exports = ConsultationRequest;
