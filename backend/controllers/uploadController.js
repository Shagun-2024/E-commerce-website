import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import Video from '../models/Video.js'; // Import the Video model

// Configure Cloudinary (Ensure your `cloudinary.js` file or environment variables are set up correctly)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer to handle video file uploads
import multer from 'multer';
const storage = multer.memoryStorage(); // Store the video in memory
const upload = multer({ storage: storage }).single('video'); // 'video' is the name attribute in the HTML form

// Upload Reel Function
const uploadReel = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
        }

        try {
            const video = req.file; // File is available as req.file
            if (!video) {
                return res.status(400).json({ success: false, message: 'No video file provided' });
            }

            // Upload video to Cloudinary
            const result = await cloudinary.v2.uploader.upload_stream(
                { resource_type: 'video', folder: 'reels', public_id: `reel_${uuidv4()}` },
                (error, result) => {
                    if (error) {
                        return res.status(500).json({ success: false, message: 'Failed to upload video', error: error });
                    }

                    // Save video metadata to MongoDB
                    const videoData = new Video({
                        public_id: result.public_id,
                        url: result.secure_url,
                        title: req.body.title || 'Untitled', // Use a default title if none provided
                        description: req.body.description || '', // Use an empty description if none provided
                    });

                    // Save the video metadata to MongoDB
                    videoData.save()
                        .then(() => {
                            res.status(200).json({ success: true, url: result.secure_url, message: 'Video uploaded and saved to DB!' });
                        })
                        .catch((error) => {
                            console.error('Error saving video to DB:', error);
                            res.status(500).json({ success: false, message: 'Failed to save video to DB', error: error });
                        });
                }
            );

            // Pipe the file to Cloudinary
            stream.end(video.buffer); // Multer stores the file buffer in memory
        } catch (error) {
            console.error('Error uploading video:', error);
            res.status(500).json({ success: false, message: 'Failed to upload video', error: error.message });
        }
    });
};

export default { uploadReel };
