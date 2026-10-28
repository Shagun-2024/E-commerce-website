import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const uploadRouter = express.Router();

// Use memory storage — no disk writes, works on Vercel serverless
const upload = multer({ storage: multer.memoryStorage() });

// Helper: upload buffer to Cloudinary via stream
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'uploads' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// POST /upload — upload a video to Cloudinary
uploadRouter.post('/', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      filePath: result.secure_url,   // Cloudinary URL (permanent)
      public_id: result.public_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'File upload failed', error: error.message });
  }
});

export default uploadRouter;
