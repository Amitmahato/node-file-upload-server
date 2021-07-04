import express from "express";
import { getPing, postImage } from "./controller/index.js";

export const routes = express.Router();

routes.get("/ping", getPing);
routes.post("/upload", postImage);
