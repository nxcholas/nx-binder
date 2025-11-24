import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import TCGdex from '@tcgdex/sdk';
import { connectDB } from "./config/db.mjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const tcgdex = new TCGdex('en');


connectDB().then(
  app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
  })
)
