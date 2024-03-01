import express from "express";
import { deleteOne } from "../controllers/deleteController.js";

const router = express.Router();

router.route("/deleteOne/:id").delete(deleteOne);

export default router;
