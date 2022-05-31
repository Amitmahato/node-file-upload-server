import express from "express";
import dotenv from "dotenv";
import { routes } from "./routes.js";
import { CORSMiddleware } from "./middleware/index.js";

dotenv.config(); // load environment variables from .env file

const WHITE_LISTED_URLS = [];
if (process.env.NODE_ENV !== "local") {
  WHITE_LISTED_URLS.push(process.env.UI_URL);
} else {
  WHITE_LISTED_URLS.push("http://localhost:3000");
}

const app = express();
export default app;

app.use(express.static("public"));
app.use((req, res, next) => CORSMiddleware(req, res, next, WHITE_LISTED_URLS)); // Handle CORS
app.use(routes);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}...`)
);
