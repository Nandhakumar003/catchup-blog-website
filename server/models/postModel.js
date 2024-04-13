import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  blog_title: {
    type: String,
    required: true,
  },
  blog_description: {
    type: String,
    required: true,
  },
  blog_category: {
    type: String,
    required: true,
  },
  blog_image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("blog_list", postSchema);
