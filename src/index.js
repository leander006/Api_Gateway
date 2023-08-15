const express = require("express");
const morgan = require("morgan");

const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
const PORT = 3004;
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

app.use(morgan("combined"));
app.use(limiter);
app.use("/bookingService", (req, res, next) => {
  console.log("Hi from booking service");
  next();
});
app.use(
  "/bookingService",
  createProxyMiddleware({
    target: "http://localhost:3002/",
    changeOrigin: true,
  })
);

app.post("/app", (req, res) => {
  return res.json({ message: "success" });
});
app.get("/", (req, res) => {
  return res.json({ message: "success" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server started on Port ${PORT}`);
});
