import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
