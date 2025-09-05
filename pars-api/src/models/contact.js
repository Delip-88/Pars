import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name:   { type: String, required: true },
    email:  { type: String, required: true },
    message:{ type: String, required: true },
    phone:  { type: String,required: true },
    service:{ type: String, required: true },
    address:{ type: String, required: true },
    status:{ type: String, enum: ["new", "in-progress", "completed"], default: "new" },

  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
