import mongoose from "mongoose";
import cardSchema from './cardSchema.mjs';

const binderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    cards: [cardSchema],
  },
  { timestamps: true }
);

const Binder = mongoose.model("Binder", binderSchema);