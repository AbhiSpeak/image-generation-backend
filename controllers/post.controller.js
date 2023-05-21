import asyncHandler from "express-async-handler";
import Post from "../mongodb/models/post.js";

const updatePostById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { favourite } = req.body;
    const post = await Post.findByIdAndUpdate(id, { favourite }, { new: true });
    res.send({
      success: true,
      post
    });
  } catch (err) {
    res.status(404);
    throw new Error("Post Not Found!");
  }
});

export { updatePostById };
