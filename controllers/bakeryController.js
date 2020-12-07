//let bakeries = require("../bakeries");
const slugify = require("slugify");
const { Bakery, Item } = require("../db/models");

exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
  } catch (error) {
    next(error);
  }
};
/*get list of bakeries*/

exports.bakeryList = async (req, res, next) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: ["id", "name", "image", "slug"],
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id"],
        },
      ],
    });
    console.log("bakeries", bakeries);
    res.json(bakeries);
  } catch (err) {
    next(err);
  }
};

/* create bakery*/

exports.bakeryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newBakery = await Bakery.create(req.body);
    res.status(201).json(newBakery);
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
    req.body.bakeryId = req.params.bakeryId;
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};
