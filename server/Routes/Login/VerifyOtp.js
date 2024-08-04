const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../../Models/User");

const router = express.Router();

router.post("/verify-otp", async (req, res) => {
  const { phoneNumber, verificationToken } = req.body;
  const number = "+92" + phoneNumber;

  try {
    const user = await User.findOne({
      phoneNumber: number,
      verificationToken: verificationToken,
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid token or phone number",
      });
    }

    user.verified = true;
    user.verificationToken = "";
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    const profileComplete =
      user.name && user.email && user.cnic && user.profilePicture;

    res.status(200).json({
      success: true,
      message: "Verified successfully",
      userName: user.name,
      userId: user._id,
      profileComplete: !!profileComplete,
    });
  } catch (error) {
    console.log("Error verifying OTP:", error);
    res
      .status(500)
      .json({ success: false, message: "OTP verification failed" });
  }
});

module.exports = router;
