import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  favourite:{
    type: String,
    required: true,
    default: false
  }
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;
