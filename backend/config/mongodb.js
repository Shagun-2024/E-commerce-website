import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB is already connected");
            return;
        }

        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        mongoose.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error.message);
        });

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connection established");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;