import postModel from "../models/postModel.js";

const createPost = async (req, res) => {
  const { blog_title, blog_description, blog_category } = req.body;
  try {
    const postData = new postModel({
      blog_title: blog_title,
      blog_description: blog_description,
      blog_category: blog_category,
      blog_image: req.file.filename,
    });

    await postData.save();
    res.status(200).json({ status: "Success", data: postData });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

export { createPost };
