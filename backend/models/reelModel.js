import mongoose from 'mongoose';

const reelSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Reference to user
    videoUrl: { type: String, required: true }, // URL to the uploaded video
    thumbnailUrl: { type: String, required: true }, // URL to the video thumbnail
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now }
});

const reelModel = mongoose.models.reel || mongoose.model('reel', reelSchema);
export default reelModel;
