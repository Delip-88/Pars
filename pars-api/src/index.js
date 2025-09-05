import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { configCloudinary } from "./config/cloudinary.js";

import uploadRoutes from "./routes/upload.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import serviceRoutes from "./routes/service.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/auth",authRoutes);

// Boot
const PORT = process.env.PORT || 4000;
await connectDB(process.env.MONGODB_URI);
configCloudinary();

app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
