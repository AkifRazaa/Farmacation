const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const Crop = require("../../Models/Crop");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/add-crop", async (req, res) => {
  try {
    const { cropName, base64Image } = req.body;

    if (!base64Image) {
      throw new Error("Base64 image data is missing");
    }

    // Check if the crop name already exists in the database
    const existingCrop = await Crop.findOne({ cropName });

    if (existingCrop) {
      return res.json({ success: false, message: "Crop already exists" });
    }

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "/Farmacation",
      format: "png",
    });

    const newCrop = new Crop({
      cropName,
      cropImage: result.secure_url,
    });
    await newCrop.save();

    res.status(201).json({ success: true, message: "Crop saved successfully" });
  } catch (error) {
    console.error("Error saving crop:", error);
    res.status(500).json({ success: false, message: "Failed to save crop" });
  }
});

module.exports = router;
