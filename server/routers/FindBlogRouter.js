import express from "express";
import {
  getDataAll,
  getDataOne,
  getFindOneDetail,
} from "../controllers/getController.js";
import { isCached } from "../middlewares/cachingMiddleware.js";

const router = express.Router();

router.route("/getBlog").get(getDataAll);

router.route("/getlatestOne").get(getDataOne);

router.route("/getfindOneDetail/:id").get(isCached, getFindOneDetail);

export default router;
