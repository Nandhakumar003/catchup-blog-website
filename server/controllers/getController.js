import postModel from "../models/postModel.js";

const getDataAll = async (req, res) => {
  try {
    let getAllblogs = await postModel.find({}).sort({ createdAt: -1 });
    console.log(getAllblogs);

    res.status(200).json({ status: "Success", data: getAllblogs });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

const getDataOne = async (req, res) => {
  try {
    let getlatestOne = await postModel
      .findOne({})
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(getlatestOne);

    res.status(200).json({ status: "Success", data: getlatestOne });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

const getFindOneDetail = async (req, res) => {
  try {
    let getfindOneDetails = await postModel.findOne({ _id: req.params.id });

    console.log(getfindOneDetails);

    res.status(200).json({ status: "Success", data: getfindOneDetails });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
};

export { getDataAll, getDataOne, getFindOneDetail };
