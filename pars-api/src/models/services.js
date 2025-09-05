import mongoose from "mongoose";
import { ImageSchema } from "./image.js";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    image: ImageSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
