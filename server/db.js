import mongoose from "mongoose";

let connection = null;

// Reuse one connection across requests (and across warm serverless invocations)
export const connectDB = () => {
  if (!process.env.MONGO_URL) {
    return Promise.reject(new Error("MONGO_URL is not set"));
  }
  if (!connection) {
    connection = mongoose.connect(process.env.MONGO_URL).catch((error) => {
      connection = null;
      throw error;
    });
  }
  return connection;
};
