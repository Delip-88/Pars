import mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema({
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
    asset_id: String,
    version: Number,
    format: String,
    width: Number,
    height: Number,
    created_at: Date,
  });