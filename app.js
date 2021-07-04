import express from "express";
import dotenv from "dotenv";
import { routes } from "./routes.js";
import { CORSMiddleware } from "./middleware/index.js";

dotenv.config(); // load environment variables from .env file

const app = express();
export default app;

app.use(express.static("public"));
app.use(CORSMiddleware); // Handle CORS
app.use(routes);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Listening on port ${process.env.SERVER_PORT}...`)
);
