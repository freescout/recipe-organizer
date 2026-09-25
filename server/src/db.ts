import mongoose from "mongoose";

export const connectDB = (uri: string) =>
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

export const isDbConnected = () => mongoose.connection.readyState === 1;

export default mongoose;
