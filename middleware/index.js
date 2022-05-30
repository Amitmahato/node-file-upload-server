export const CORSMiddleware = (req, res, next) => {
  console.log("[INFO] ", req.path);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  }
  next();
};
