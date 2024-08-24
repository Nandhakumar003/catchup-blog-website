import postModel from "../models/postModel.js";
import { client } from "../cache.js";

const updatePost = async (req, res) => {
  try {
    let checkthedata = await postModel.findById({ _id: req.params.id });

    if (checkthedata) {
      const updateData = { ...req.body, updatedAt: Date.now() };

      const updatePost = await postModel.findByIdAndUpdate(
        { _id: req.params.id },
        updateData,
        { new: true }
      );
      ///updating cache value
      await client.set(
        updatePost.id,
        JSON.stringify(updatePost),
        (err, reply) => {
          if (err) {
            console.log(err);
          }
          console.log("New Data updating in Cache " + reply);
        }
      );

      res.status(200).json({ status: "Success", data: updatePost });
    } else {
      res.status(404).json({ status: "Failed", data: "Record not Available!" });
    }
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

export { updatePost };
