const express = require("express");
const Post = require("../../../Models/Post");
const router = express.Router();

router.delete("/delete-post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByIdAndDelete({ _id: postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ message: "Error deleting reply", error });
  }
});

module.exports = router;
