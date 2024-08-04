const express = require("express");
const mongoose = require("mongoose");
const Post = require("../../Models/Post");
const User = require("../../Models/User");
const Admin = require("../../Models/Admin");
const router = express.Router();

router.get("/approved-posts", async (req, res) => {
  try {
    // Retrieve all posts where adminApproved is true
    let approvedPosts = await Post.find({ adminApproved: true }).lean();

    // Manually populate the user field based on userType
    const populateUser = async (post) => {
      if (post.userType === 'Admin') {
        const admin = await Admin.findById(post.user).select('name').lean();
        post.user = admin;
      } else {
        const user = await User.findById(post.user).select('name').lean();
        post.user = user;
      }
    };

    // Use Promise.all to ensure all users are populated before sending the response
    await Promise.all(approvedPosts.map(populateUser));

    res.status(200).json({ success: true, posts: approvedPosts });
  } catch (error) {
    console.error("Error retrieving approved posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
