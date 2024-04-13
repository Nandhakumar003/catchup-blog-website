import postModel from "../models/postModel.js";
//import fs from "fs";
//import path from "path";
//import { fileURLToPath } from "url";

const createPost = async (req, res) => {
  console.log("Testing " + req.body.blog_image);

  //const __filename = fileURLToPath(import.meta.url);
  //const __dirname = path.resolve(path.dirname(__filename), "../");

  const { blog_title, blog_description, blog_category, blog_image } = req.body;
  try {
    const postData = new postModel({
      blog_title: blog_title,
      blog_description: blog_description,
      blog_category: blog_category,
      blog_image: blog_image,
    });

    await postData.save();
    res.status(200).json({ status: "Success", data: postData });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

export { createPost };
