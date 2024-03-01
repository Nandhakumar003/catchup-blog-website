import express from "express";
import { getDataAll, getDataOne } from "../controllers/getController.js";

const router = express.Router();

router.route("/getBlog").get(getDataAll);

router.route("/getlatestOne").get(getDataOne);

export default router;
