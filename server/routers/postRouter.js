import express from "express";
import { multerMiddleware } from "../middlewares/multerMiddleware.js";
import { createPost } from "../controllers/postController.js";

const router = express.Router();

router.route("/createPost").post(multerMiddleware, createPost);

export default router;
