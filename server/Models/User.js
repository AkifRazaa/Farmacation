const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    default: "",
  },

  profilePicture: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  },

  verificationToken: {
    type: String,
    default: "",
  },

  verified: {
    type: Boolean,
    default: false,
  },

  joindDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
