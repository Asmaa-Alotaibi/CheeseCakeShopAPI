let items = require("../items");
const slugify = require("slugify");
const { Item } = require("../db/models");

exports.fetchItem = async (itemId, next) => {
  try {
    const item = await Item.findByPk(itemId);
    return item;
  } catch (error) {
    next(error);
  }
};
/*get list of items*/

exports.itemList = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    console.log("items", items);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

/* create item*/

exports.itemCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};
/* delete item*/

exports.itemDelete = async (req, res, next) => {
  try {
    await req.item.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
/* Update item*/

exports.itemUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.item.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
