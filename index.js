const express = require("express");
const app = express();

app.use((req, res, next) => {
  if (req.url === "/favicon.ico") return res.status(204).end(); // skip favicon requests
  console.log("In the middleware", req.url);
  next();
});

app.use((req, res) => {
  console.log("In another middleware");
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);