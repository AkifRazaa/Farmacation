const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const Expert = mongoose.model("Expert", expertSchema);

module.exports = Expert;
