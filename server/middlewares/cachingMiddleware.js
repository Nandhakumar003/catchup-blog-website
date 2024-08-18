import { client } from "../cache.js";

const isCached = (req, res, next) => {
  const { id } = req.params;
  //First check in Redis
  client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: "Failed", message: err.message });
    }
    if (data) {
      console.log("Data from Cache");
      res.status(200).json({ status: "Success", data: JSON.parse(data) });
    }
    if (data == null) {
      next();
    }
  });
};

export { isCached };
