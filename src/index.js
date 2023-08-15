const express = require("express");
const morgan = require("morgan");

const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

const { PORT } = require("./config/serverConfig");

app.use(morgan("combined"));
app.use(
  "/bookingService",
  createProxyMiddleware({
    target: "http://localhost:3002/",
    changeOrigin: true,
  })
);
app.get("/", (req, res) => {
  return res.json({ message: "success" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server started on Port ${PORT}`);
});
