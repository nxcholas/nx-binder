import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  set: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Set",
  },
  name: {
    type: String,
    required: true,
  },
  localId: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);
export default Card;