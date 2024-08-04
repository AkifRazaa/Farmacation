// const express = require("express");
// const Post = require("../../../Models/Post");
// const router = express.Router();


// // Update the route to get posts that need approval
// router.get("/pending-posts", async (req, res) => {
//     try {
//         const posts = await Post.find({ adminApproved: false, adminDisplay: true })
//             .populate('user', 'name profilePicture') // Populate user field with name and profilePicture
//             .exec();
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });



// // Approve a post
// router.put("/approve-post/:id", async (req, res) => {
//     try {
//         const post = await Post.findByIdAndUpdate(
//             req.params.id,
//             { adminApproved: true, adminDisplay: false },
//             { new: true }
//         );
//         res.json(post);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Reject a post
// router.put("/reject-post/:id", async (req, res) => {
//     try {
//         const post = await Post.findByIdAndUpdate(
//             req.params.id,
//             { adminDisplay: false },
//             { new: true }
//         );
//         res.json(post);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// module.exports = router;


const express = require("express");
const Post = require("../../../Models/Post");
const User = require("../../../Models/User");
const router = express.Router();

// Update the route to get posts that need approval
router.get("/pending-posts", async (req, res) => {
    try {
        const posts = await Post.find({ adminApproved: false, adminDisplay: true }).exec();
        
        // Manually populate the user data
        const populatedPosts = await Promise.all(posts.map(async post => {
            const user = await User.findById(post.user).select("name profilePicture").exec();
            return {
                ...post.toObject(),
                user: user ? user.toObject() : null
            };
        }));

        res.json(populatedPosts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Approve a post
router.put("/approve-post/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { adminApproved: true, adminDisplay: false },
            { new: true }
        );
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Reject a post
router.put("/reject-post/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { adminDisplay: false },
            { new: true }
        );
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
