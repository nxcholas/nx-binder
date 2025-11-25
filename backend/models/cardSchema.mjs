import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  id: String,
  image: String,
  localId: String,
  name: String,
});

export default cardSchema;