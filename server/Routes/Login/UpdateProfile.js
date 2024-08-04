const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../../Models/User");

const router = express.Router();

router.post("/update-profile", async (req, res) => {
  const { userId, name, email, cnic, profilePicture } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.cnic = cnic;
    user.profilePicture = profilePicture || user.profilePicture;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Profile update failed" });
  }
});

module.exports = router;
