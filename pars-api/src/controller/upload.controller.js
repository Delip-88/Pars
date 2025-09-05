export async function handleUpload(req, res) {
    try {
      // multer-storage-cloudinary puts Cloudinary data on req.file
      if (!req.file) return res.status(400).json({ error: "No file received" });
  
      // Common fields returned:
      // req.file.path => secure URL
      // req.file.filename => public_id
      // req.file.mimetype, req.file.size, etc.
  
      res.status(201).json({
        success: true,
        url: req.file.path,
        public_id: req.file.filename,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
  