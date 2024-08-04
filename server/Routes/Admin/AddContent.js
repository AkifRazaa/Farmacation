// const express = require("express");
// const Content = require("../../Models/Content");
// const router = express.Router();

// router.post('/content', async (req, res) => {
//   try {
//     // Extract data from the request body
//     const { title, blocks, cropId } = req.body;

//     // console.log({ title, blocks, cropId })

//     // Create an array to hold the structured content
//     const structuredContent = [];

//     // Loop through each block and extract type and value
//     for (const block of blocks) {
//       const { type, value } = block;

//       // Push the extracted type and value to the structured content array
//       structuredContent.push({ type, value });
//     }

//     // Create a new content document
//     const content = new Content({
//       crop: cropId,
//       education: {
//         stage: 'Sowing', // You need to decide how to set this value
//         title: title, // Title is being assigned here

//         information: structuredContent
//       }
//     });

//     // Save the content document to the database
//     await content.save();

//     res.status(201).json({ success: true, message: 'Content saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal server error' });
//   }
// });

// module.exports = router;


const express = require("express");
const Content = require("../../Models/Content");
const Disease = require("../../Models/Disease");
const router = express.Router();
const cloudinary = require("cloudinary").v2;


router.post('/content', async (req, res) => {
  try {
    const { title, blocks, cropId, category, subCategory } = req.body;

    console.log({ title, blocks, cropId, category, subCategory })
    // Create an array to hold the structured content
    const structuredContent = [];

    for (const block of blocks) {
      const { type, value } = block;

      if (type === 'image') {
        // Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(value, {
          folder: "/Farmacation",
          format: "png",
        });
        structuredContent.push({ type, value: uploadedImage.secure_url });
      } else {
        structuredContent.push({ type, value });
      }
    }

    if (category === 'education') {
      const content = new Content({
        crop: cropId,
        education: {
          stage: subCategory,
          title: title,
          information: structuredContent
        }
      });
      await content.save();

      console.log("Content saved")
    } else if (category === 'disease') {
      const disease = new Disease({
        crop: cropId,
        disease: {
          stage: subCategory,
          title: title,
          information: structuredContent
        }
      });
      await disease.save();
      console.log("Disease saved")

    } else {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    res.status(201).json({ success: true, message: 'Content saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
