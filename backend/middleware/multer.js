import multer from "multer";

// Use memoryStorage so files are held in RAM — works on Vercel serverless
const storage = multer.memoryStorage();

const upload = multer({ storage })

export default upload