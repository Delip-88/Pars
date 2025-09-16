import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { sendOTPEmail } from "../../utils/sendEmail.js";
import crypto from "crypto";

// Register User
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
}

// Login User

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !user.verified) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send token in response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role ? user.role : "user",
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
}

let otpStore = {}; // { email: { otp: '123456', expires: Date } }


export async function sendOtpRequest(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  otpStore[email] = {
    otp,
    expires: Date.now() + 10 * 60 * 1000, // valid for 10 minutes
  };

  try {
    await sendOTPEmail(email, otp,"Email Verification");
    console.log(otp);
    console.log(email);
    res.json({ success: true, message: "OTP sent" });
  } catch {
    res.status(500).json({ success: false, error: "Failed to send OTP" });
  }
}

export async function verifyOtpRequest(req, res) {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ error: "No OTP found" });
  if (record.expires < Date.now())
    return res.status(400).json({ error: "OTP expired" });
  if (record.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

  delete otpStore[email]; // remove after successful verification
  await User.updateOne({ email }, { verified: true });
  return res.status(200).json({ success: true, message: "OTP verified" });
}
// Temporary in-memory store (use DB or Redis in production)
const OtpStore = {};

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Forgot Password → generate token and send reset link
export async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email not found." });
    }

    const token = generateResetToken();
    OtpStore[email] = {
      token,
      expires: Date.now() + 10 * 60 * 1000, // valid for 10 minutes
    };

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendOTPEmail(email, resetLink, "Password Reset");

    res.json({ success: true, message: "Password reset link sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// Reset Password → verify token and update password
export async function resetPassword(req, res) {
  const { email, token, newPassword } = req.body;
  try {
    const record = OtpStore[email];
    if (!record) {
      return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }

    if (record.expires < Date.now() || record.token !== token) {
      return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    delete OtpStore[email]; // Invalidate token after use
    res.json({ success: true, message: "Password reset successful." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
}