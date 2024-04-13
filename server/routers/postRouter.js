import express from "express";

import { createPost } from "../controllers/postController.js";

const router = express.Router();

router.route("/createPost").post(createPost);

export default router;
