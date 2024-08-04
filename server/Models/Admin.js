const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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

  profilePicture: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/149/149072.png",
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
