const express = require("express");
const cloudinary = require("cloudinary").v2;
const Post = require("../../Models/Post");
const router = express.Router();

// Configure Cloudinary with your account credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/create-post", async (req, res) => {
  try {
    // Extract data from request body
    const { content, images, userId } = req.body;

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
            folder: "/Farmacation",
            format: "png",
          });
        return result.secure_url; // Get the secure URL of the uploaded image from Cloudinary
      })
    );

    // Create a new post with Cloudinary image URLs
    const newPost = new Post({
      content: content,
      images: uploadedImages,
      user: userId,
    });

    // Save the post to the database
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Admin approval pending",
      
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
