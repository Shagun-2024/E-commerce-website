import express from 'express';
import { uploadReel } from '../controllers/reelController.js';
import authUser from '../middleware/auth.js'; // Ensure only authenticated users can upload
import upload from '../middleware/fileUploadMiddleware.js';// Multer file upload middleware
import uploadController from '../controllers/uploadController.js';

const reelRouter = express.Router();
const router = express.Router(); // This initializes the router


// Route for uploading a reel
reelRouter.post('/upload', authUser, upload.single('video'), uploadReel); // video is the field name for file
router.post('/', uploadController.uploadReel); // Define the route in the router file


export default reelRouter;
