const express = require("express");
const mongoose = require("mongoose"); // Ensure mongoose is imported
const Message = require("../../Models/Message");
const Expert = require("../../Models/Expert");
const User = require("../../Models/User");

const router = express.Router();

router.get("/chat-list/:userId", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId); // Use 'new'

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const participantIds = new Set();
    messages.forEach((message) => {
      if (!message.sender.equals(userId)) {
        participantIds.add(message.sender);
      }
      if (!message.receiver.equals(userId)) {
        participantIds.add(message.receiver);
      }
    });

    const participantIdsArray = Array.from(participantIds);
    const users = await User.find({ _id: { $in: participantIdsArray } });
    const experts = await Expert.find({ _id: { $in: participantIdsArray } });

    const chatList = [
      ...users.map((user) => ({ id: user._id, name: user.name })),
      ...experts.map((expert) => ({ id: expert._id, name: expert.name })),
    ];

    res.json(chatList);
  } catch (error) {
    console.error("Error fetching chat list data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
