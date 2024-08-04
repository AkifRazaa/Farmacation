// const express = require("express");

// const router = express.Router();
// const Post = require("../../Models/Post");

// router.put("/posts/:postId/:userId/unlike", async (req, res) => {
//   const postId = req.params.postId;
//   const userId = req.params.userId;

//   try {
//     const post = await Post.findById(postId).populate("user", "name");

//     const updatedPost = await Post.findByIdAndUpdate(
//       postId,
//       { $pull: { likes: userId } },
//       { new: true }
//     );

//     updatedPost.user = post.user;

//     if (!updatedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.json(updatedPost);
//   } catch (error) {
//     console.error("Error unliking post:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while unliking the post" });
//   }
// });

// module.exports = router;







const express = require("express");
const router = express.Router();
const Post = require("../../Models/Post");
const Admin = require("../../Models/Admin");
const User = require("../../Models/User");

// Function to manually populate the user field based on userType
const populateUser = async (post) => {
  if (post.userType === 'Admin') {
    const admin = await Admin.findById(post.user).select('name').lean();
    post.user = admin;
  } else {
    const user = await User.findById(post.user).select('name').lean();
    post.user = user;
  }
};

router.put("/posts/:postId/:userId/unlike", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  console.log(userId)

  try {
    let post = await Post.findById(postId).lean();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: { user: userId } } }, // Remove the object with userId from the likes array
      { new: true }
    ).lean();

    await populateUser(post); // Manually populate the user field

    res.json(post);
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ message: "An error occurred while unliking the post" });
  }
});

module.exports = router;
