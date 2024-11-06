import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },
    typeUser: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    imgUri: {
      type: String,
    },
  },
  { versionKey: false }
);

export default mongoose.model("User", userSchema);
