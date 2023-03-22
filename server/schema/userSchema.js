import mongoose from "mongoose";

export const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [2, "minimum 2 characters"],
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: [true, "password is required"] },
  image: { type: String },
});

export default mongoose.model("Users", UsersSchema);
