import { Router } from "express";
import { loginUser, registerUser, sendOtpRequest, verifyOtpRequest } from "../controller/auth.controller.js";

const router = Router();

router.post("/login",loginUser );
router.post("/register",registerUser );

router.post("/send-otp", sendOtpRequest);

router.post("/verify-otp", verifyOtpRequest);
export default router;
