import postModel from "../models/postModel.js";

const deleteOne = async (req, res) => {
  try {
    let checkthedata = await postModel.findById({ _id: req.params.id });

    if (checkthedata) {
      let deleteOne = await postModel.findOneAndDelete({ _id: req.params.id });
      console.log(deleteOne);
      res
        .status(200)
        .json({ status: "Success", data: "Successfully Deleted!" });
    } else {
      res.status(404).json({ status: "Failed", data: "Record not Available!" });
    }
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

export { deleteOne };
