import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { handleUpload } from "../controller/upload.controller.js";


const router = Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pars/uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg", "pdf"],
    transformation: [{ width: 1600, crop: "limit" }],
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), handleUpload);

export default router;
