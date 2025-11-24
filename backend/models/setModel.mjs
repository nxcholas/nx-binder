import mongoose, { model } from "mongoose";

const cardSchema = new mongoose.Schema({
  id: String,
  localId: String,
  name: String,
  image: String,
});

const setSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: true,
  },
  cards: [cardSchema]
})

const Set = mongoose.model("Set", setSchema);

export default Set;