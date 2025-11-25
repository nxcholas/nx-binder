import mongoose from "mongoose";
import cardSchema from "../models/cardSchema.mjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
    },
    email: {
      type: String,
      required: [true, "please add email"],
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
    binder: {
      type: [cardSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
