import express from "express";
import { getSets, getSetById } from "../controllers/setController.mjs";

const setRouter = express.Router();

setRouter.get("/api/searchsets", getSets);
setRouter.get("/api/searchsets/:id", getSetById);

export default setRouter;
