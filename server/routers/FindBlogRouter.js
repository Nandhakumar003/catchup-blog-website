import express from "express";
import {
  getDataAll,
  getDataOne,
  getFindOneDetail,
} from "../controllers/getController.js";

const router = express.Router();

router.route("/getBlog").get(getDataAll);

router.route("/getlatestOne").get(getDataOne);

router.route("/getfindOneDetail/:id").get(getFindOneDetail);

export default router;
