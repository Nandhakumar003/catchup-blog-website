import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRouter from "./routers/postRouter.js";

dotenv.config();

const app = express();

app.use(morgan("short"));
app.use(express.static("./public"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use("/api/v1", postRouter);

const url = process.env.DB_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`DB not connected ${err.message}`);
  });

app.listen(PORT, (err) => {
  console.log(`Server Running at the port ${PORT}`);

  if (err) {
    console.log("Server Error" + err);
  }
});
