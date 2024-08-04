const express = require("express");
const mongoose = require("mongoose"); // Ensure mongoose is imported
const Message = require("../../Models/Message");

const router = express.Router();

router.get("/messages/:loggedInUserId/:participantId", async (req, res) => {
  try {
    const loggedInUserId = new mongoose.Types.ObjectId(req.params.loggedInUserId); // Use 'new'
    const participantId = new mongoose.Types.ObjectId(req.params.participantId); // Use 'new'

    const messages = await Message.find({
      $or: [
        { sender: loggedInUserId, receiver: participantId },
        { sender: participantId, receiver: loggedInUserId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
