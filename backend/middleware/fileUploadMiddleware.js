import multer from 'multer';

// Use memoryStorage — no local disk writes, works on Vercel serverless
const storage = multer.memoryStorage();

// Filter only video files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload a video file'), false);
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

export default upload;
