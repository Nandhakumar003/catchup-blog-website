import express from "express";
import { multerMiddleware } from "../middlewares/multerMiddleware.js";
import { updatePost } from "../controllers/updateController.js";

const router = express.Router();

router.route("/updatePost/:id").patch(updatePost);

export default router;
