const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
    cropName: {
        type: String,
        default: "",
    },

    cropImage: {
        type: String,
        default: "",
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const Crop = mongoose.model("Crop", cropSchema);

module.exports = Crop;
