const express = require("express");
const twilio = require("twilio");
const User = require("../../Models/User");

const router = express.Router();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;
  const number = "+92" + phoneNumber;

  console.log(number)

  try {
    // Check if the phone number already exists
    let user = await User.findOne({ phoneNumber: number });

    if (!user) {
      // If the user does not exist, create a new user
      user = new User({ phoneNumber: number });
    }

    // Generate a new OTP and save it to the user
    const otp = generateOTP();
    user.verificationToken = otp;
    await user.save();

    // // Send the OTP via Twilio
    // await twilioClient.messages.create({
    //   body: `Your OTP is ${otp}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: number,
    // });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

module.exports = router;
