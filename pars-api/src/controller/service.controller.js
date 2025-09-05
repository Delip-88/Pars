import { configCloudinary } from "../config/cloudinary.js";
import Service from "../models/services.js";

// helper to upload a buffer to cloudinary
async function uploadBufferToCloudinary(buffer, folder = "pars/services") {
  const cloudinary = configCloudinary();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
}

export async function addService(req, res) {
  try {
    if(req.user.role !== "admin") {
      return res.status(403).json({message: "Unauthorized"})
    }
    const { title, description, features, price, duration } = req.body;

    // parse features coming as JSON string or comma separated string
    let parsedFeatures = features;
    if (typeof features === "string") {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = features.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const cloudinary = configCloudinary(); // get configured cloudinary instance

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "pars/services" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Image upload failed", error });
        }

        const imageData = {
          public_id: result.public_id,
          secure_url: result.secure_url,
          asset_id: result.asset_id,
          version: result.version,
          format: result.format,
          width: result.width,
          height: result.height,
          created_at: result.created_at,
        };

        const service = new Service({
          title,
          description,
          features: parsedFeatures,
          price,
          duration,
          image: imageData,
        });

        await service.save();
        return res.status(201).json(service);
      }
    );

    // send buffer to cloudinary stream
    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding service", error: err.message });
  }
}

export async function removeService(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Service id is required." });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service doesn't exist." });
    }

    // delete image from Cloudinary if present
    if (service.image && service.image.public_id) {
      try {
        const cloudinary = configCloudinary();
        await cloudinary.uploader.destroy(service.image.public_id);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary:", err);
        // continue - we still want to delete the DB record even if image deletion fails
      }
    }

    await service.deleteOne();

    return res
      .status(200)
      .json({ success: true, message: "Service removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateService(req, res) {
  try {
    const { id } = req.params;  // Get ID from params instead of body
    const { title, description, duration, features, price } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Service id is required." });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service doesn't exist." });
    }

    // parse features if passed as string
    let parsedFeatures = features;
    if (typeof features === "string") {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = features.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    // Build updates object only with provided fields
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (duration !== undefined) updates.duration = duration;
    if (price !== undefined) updates.price = price;
    if (features !== undefined) {
      if (!Array.isArray(parsedFeatures)) {
        return res.status(400).json({ error: "Features must be an array." });
      }
      updates.features = parsedFeatures;
    }

    // handle new image upload if provided (req.file from multer)
    if (req.file) {
      try {
        const result = await uploadBufferToCloudinary(req.file.buffer, "pars/services");
        const newImage = {
          public_id: result.public_id,
          secure_url: result.secure_url,
          asset_id: result.asset_id,
          version: result.version,
          format: result.format,
          width: result.width,
          height: result.height,
          created_at: result.created_at,
        };
        updates.image = newImage;

        // delete old image if exists
        if (service.image && service.image.public_id) {
          try {
            const cloudinary = configCloudinary();
            await cloudinary.uploader.destroy(service.image.public_id);
          } catch (err) {
            console.error("Failed to delete old image from Cloudinary:", err);
            // don't fail the whole update for a failed deletion
          }
        }
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        return res.status(500).json({ error: "Image upload failed", details: err.message || err });
      }
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided to update." });
    }

    const updated = await Service.findByIdAndUpdate(id, updates, {  // Use id from params
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Service doesn't exist." });
    }

    return res.status(200).json({ success: true, service: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function getServices(req, res) {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = Math.max(1, parseInt(page, 10) || 1);
    limit = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      Service.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Service.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      services,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function getService(req, res) {
  try {
    const id = req.params.id || req.query._id || req.body._id;
    if (!id) {
      return res.status(400).json({ error: "Service id is required." });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "Service doesn't exist." });
    }

    return res.status(200).json({ success: true, service });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
