import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  id: String,
  image: String,
  localId: String,
  name: String,
  pricing: {
    cardMarket: Object,
    tcgplayer: Object,
  },
});

export default cardSchema;
