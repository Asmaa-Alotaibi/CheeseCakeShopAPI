const express = require("express");
const items = require("./items");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/items", (req, res) => {
  res.json(items);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
