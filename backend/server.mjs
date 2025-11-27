import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import TCGdex from '@tcgdex/sdk';
import { connectDB } from "./config/db.mjs";
import userRouter from "./routes/userRoutes.mjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if(process.env.node_ENV !== "production") {
  //  cors
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// middleware - routes
app.use("", userRouter)


connectDB().then(
  app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
  })
)
