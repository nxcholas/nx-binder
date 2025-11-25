import mongoose, { model } from "mongoose";
import cardSchema from './cardSchema.mjs';

const setSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
  cards: [cardSchema],
});

const Set = mongoose.model("Set", setSchema);

export default Set;
