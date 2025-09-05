import { Router } from "express";
import {  getServices, getService, updateService, removeService, addService } from "../controller/service.controller.js";
import upload from "../middleware/multer.js";
import { authMiddleware } from "../../middleware/auth.js";

const router = Router();

router.post("/",authMiddleware, upload.single("image"), addService);
router.get("/", getServices);
router.get("/:id", getService);
// allow uploading new image on update
router.patch("/:id",authMiddleware ,upload.single("image"), updateService);
router.delete("/:id",authMiddleware, removeService);

export default router;
