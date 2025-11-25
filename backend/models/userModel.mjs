import mongoose from "mongoose";
import binderSchema from './binderModel.mjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add name']
  },
  email: {
    type: String,
    required: [true, 'please add email']
  },
  password: {
    type: String,
    required: [true, 'please add password']
  },
})

const User = mongoose.model("User", userSchema);

export default User;