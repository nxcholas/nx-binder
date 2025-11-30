import express from "express";
import { getSets, getSetById } from "../controllers/setController.mjs";

const setRouter = express.Router();

setRouter.get("/searchsets", getSets);
setRouter.get("/searchsets/:id", getSetById);

export default setRouter;
