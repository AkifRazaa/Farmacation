const express = require("express");
const Post = require("../../Models/Post");
const mongoose = require("mongoose");
const router = express.Router();

// Fetch replies for a specific post
router.get("/get-replies/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate("replies.user", "name");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ success: true, replies: post.replies });
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a reply to a specific post
router.post("/add-replies/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content, isAdmin } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userType = isAdmin ? "Admin" : "User";

    const user = await mongoose.model(userType).findById(userId);

    if (!user) {
      return res.status(404).json({ error: `${userType} not found` });
    }

    const newReply = {
      user: userId,
      userType: userType,
      content,
      createdAt: Date.now(),
    };

    post.replies.push(newReply);
    await post.save();

    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a reply
router.delete("/delete-replies/:replyId", async (req, res) => {
  try {
    const { replyId } = req.params;

    const post = await Post.findOne({ "replies._id": replyId });
    if (!post) {
      return res.status(404).json({ error: "Reply not found" });
    }

    // Filter out the reply to delete
    post.replies = post.replies.filter(
      (reply) => reply._id.toString() !== replyId
    );

    await post.save();

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ message: "Error deleting reply", error });
  }
});

// Update a reply

router.put("/edit-replies/:replyId", async (req, res) => {
  try {
    const { replyId } = req.params;
    const { content, userId, isAdmin } = req.body;

    const post = await Post.findOne({ "replies._id": replyId });
    if (!post) {
      return res.status(404).json({ error: "Reply not found" });
    }

    const reply = post.replies.id(replyId);
    if (reply.user.toString() !== userId && !isAdmin) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    reply.content = content;
    await post.save();

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Error updating reply", error });
  }
});

module.exports = router;
