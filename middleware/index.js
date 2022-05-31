export const CORSMiddleware = (req, res, next, white_listed_urls) => {
  console.log("[INFO] ", req.path);
  const origin = req.get("origin");
  res.setHeader(
    "Access-Control-Allow-Origin",
    origin && white_listed_urls.includes(origin) ? origin : white_listed_urls[0]
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  }
  next();
};
