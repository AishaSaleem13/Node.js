import multer from "multer";
import cloudinary from "../config/cloudinary.mjs";  // default export
import { CloudinaryStorage } from "multer-storage-cloudinary";  // ✅ sahi class

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"], // ✅ key ka naam chhoti letters me
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  },
});

const upload = multer({ storage });

export default upload;
