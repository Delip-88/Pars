import multer from "multer";

// store file in memory (buffer) before uploading to cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
