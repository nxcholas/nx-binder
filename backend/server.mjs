import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.mjs";
import userRouter from "./routes/userRoutes.mjs";
import setRouter from "./routes/setRoutes.mjs";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.node_ENV !== "production") {
  //  cors
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// middleware - routes
app.use("", userRouter);
app.use("", setRouter);

// middleware for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(
  app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
  })
);
