import express from "express";
import { getPing, getPort, postImage } from "./controller/index.js";

export const routes = express.Router();

routes.get("", (_, res) => {
  res.status(200).send("Server is up and running ✅");
});
routes.get("/port", getPort);
routes.get("/ping", getPing);
routes.post("/upload", postImage);
