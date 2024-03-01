import postModel from "../models/postModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const createPost = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.resolve(path.dirname(__filename), "../");

  const { blog_title, blog_description, blog_category } = req.body;
  try {
    const postData = new postModel({
      blog_title: blog_title,
      blog_description: blog_description,
      blog_category: blog_category,
      blog_image: {
        data: fs.readFileSync(
          path.join(__dirname + "/public/images/" + req.file.filename)
        ),
        contentType: req.file.mimetype,
      },
    });

    await postData.save();
    res.status(200).json({ status: "Success", data: postData });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

export { createPost };
