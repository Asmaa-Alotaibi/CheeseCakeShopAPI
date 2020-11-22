const express = require("express");
let items = require("./items");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/items", (req, res) => {
  res.json(items);
});

app.delete("/items/:itemId", (req, res) => {
  const { itemId } = req.params;
  items = items.filter((item) => item.id !== +itemId);
  console.log("REQUEST", req.params);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
