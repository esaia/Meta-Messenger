import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.set("strictQuery", false);

  return mongoose.connect(process.env.DATABASECONNECT);
};
