const express = require("express");
const router = express.Router();

const Crop = require("../../Models/Crop");

// Fetch all crop names
router.get("/crops", async (req, res) => {
    try {
        const crops = await Crop.find({}, 'cropName');
        res.status(200).json({ success: true, crops });
    } catch (error) {
        console.error("Error fetching crops:", error);
        res.status(500).json({ success: false, message: "Failed to fetch crops" });
    }
});

// Delete a crop by ID
router.delete("/delete-crop/:id", async (req, res) => {
    try {
        const cropId = req.params.id;
        const deletedCrop = await Crop.findByIdAndDelete(cropId);

        if (!deletedCrop) {
            return res.status(404).json({ success: false, message: "Crop not found" });
        }

        res.status(200).json({ success: true, message: "Crop deleted successfully" });
    } catch (error) {
        console.error("Error deleting crop:", error);
        res.status(500).json({ success: false, message: "Failed to delete crop" });
    }
});



module.exports = router;
