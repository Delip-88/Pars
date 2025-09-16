import { Router } from "express";
import { forgotPassword, loginUser, registerUser, resetPassword, sendOtpRequest, verifyOtpRequest } from "../controller/auth.controller.js";

const router = Router();

router.post("/login",loginUser );
router.post("/register",registerUser );

router.post("/send-otp", sendOtpRequest);

router.post("/verify-otp", verifyOtpRequest);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
