import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
};


export default connectDB;