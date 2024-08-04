const express = require("express");
const Expert = require("../../Models/Expert"); // Adjust the path as necessary
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");


// Endpoint to create a new expert
router.post("/add-expert", async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      cnic,
      region,
      city,
      profilePicture,
    } = req.body;

    let profilePictureUrl =
      "https://cdn-icons-png.flaticon.com/128/149/149071.png"; // Default URL

    if (profilePicture) {
      const uploadedImage = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${profilePicture}`,
        {
          folder: "/Farmacation",
          format: "png",
        }
      );
      profilePictureUrl = uploadedImage.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const expert = new Expert({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      cnic,
      region,
      city,
      profilePicture: profilePictureUrl,
    });

    await expert.save();

    res
      .status(201)
      .json({ success: true, message: "Expert created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
