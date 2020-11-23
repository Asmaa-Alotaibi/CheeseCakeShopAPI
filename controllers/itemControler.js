let items = require("../items");
const slugify = require("slugify");

/*get list of items*/

exports.itemList = (req, res) => res.json(items);

/* create item*/

exports.itemCreate =
  ("/",
  (req, res) => {
    const id = items[items.length - 1].id + 1; //generate id
    const slug = slugify(req.body.name, { lower: true });
    const newItem = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
    items.push(newItem);
    res.status(201).json(newItem);
  });
/* delete item*/

exports.itemDelete =
  ("/:itemId",
  (req, res) => {
    const { itemId } = req.params;
    const founditem = items.find((item) => item.id === +itemId);
    if (founditem) {
      items = items.filter((item) => item.id !== +itemId);
      console.log("REQUEST", req.params);
      res.status(204).end();
    }
    res.status(404).res.json({ message: "item not found" });
  });
/* Update item*/

exports.itemUpdate =
  ("/:itemId",
  (req, res) => {
    const { itemId } = req.params;
    const founditem = items.find((item) => item.id === +itemId);
    if (founditem) {
      for (const key in req.body) founditem[key] = req.body[key];
      res.status(204).end();
    }
    res.status(204).res.json({ message: "item not found" });
  });
