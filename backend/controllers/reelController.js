import reelModel from "../models/reelModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Helper: upload a buffer to Cloudinary via stream
const streamUpload = (buffer, options) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

const uploadReel = async (req, res) => {
    try {
        const { userId, title, description } = req.body;

        if (!req.file) {
            return res.json({ success: false, message: "No video file provided" });
        }

        // Upload video buffer to Cloudinary
        const result = await streamUpload(req.file.buffer, {
            resource_type: "video",
            folder: "reels",
            public_id: `reels/${Date.now()}`
        });

        // Create new reel entry in DB
        const newReel = new reelModel({
            userId,
            videoUrl: result.secure_url,
            thumbnailUrl: result.secure_url.replace('/upload/', '/upload/so_0/'),  // auto thumbnail
            title,
            description
        });

        await newReel.save();

        res.json({ success: true, message: "Reel uploaded successfully", newReel });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { uploadReel };
