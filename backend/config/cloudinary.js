import {v2 as cloudinary } from "cloudinary"

const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
    const uploadToCloudinary = (filePath) => {
        return cloudinary.v2.uploader.upload(filePath, { resource_type: 'video' }); // Specify resource_type as video
      };

}

export default connectCloudinary;

const uploadToCloudinary = (filePath) => {
    return cloudinary.v2.uploader.upload(filePath, { resource_type: 'video' }); // Specify resource_type as video
  };

export { uploadToCloudinary };
