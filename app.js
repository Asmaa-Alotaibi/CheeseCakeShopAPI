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
  const founditem = items.find((item) => item.id === +itemId);
  if (founditem) {
    items = items.filter((item) => item.id !== +itemId);
    console.log("REQUEST", req.params);
    res.status(204).end();
  }
  res.status(404).res.json({ message: "item not found" });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
