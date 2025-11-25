import mongoose from "mongoose";
import cardSchema from "./cardSchema.mjs";

const binderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cards: [cardSchema],
  },
  { timestamps: true }
);

const Binder = mongoose.model("Binder", binderSchema);

export default Binder;