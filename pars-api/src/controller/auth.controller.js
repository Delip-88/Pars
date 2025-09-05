import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { sendOTPEmail } from "../../utils/sendEmail.js";

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
    await sendOTPEmail(email, otp);
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
