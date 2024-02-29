import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "_" + Date.now() + path.extname(file.originalname));
  },
});

const MAX_SIZE_LIMIT = 2 * 1000 * 1000;

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE_LIMIT },
});

const uploadHandler = upload.single("blog_image");

const multerMiddleware = (req, res, next) => {
  uploadHandler(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code == "LIMIT_FILE_SIZE") {
        res.status(500).json({ status: "Failed", message: "File is too big" });
      }
      return;
    }
    if (!req.file) {
      res.status(500).json({ status: "Failed", message: "No File!" });
      return;
    }
    next();
  });
};

export { multerMiddleware };
