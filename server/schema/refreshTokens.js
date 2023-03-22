import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Tokens", RefreshTokenSchema);
