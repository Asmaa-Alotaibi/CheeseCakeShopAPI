//let bakeries = require("../bakeries");
const slugify = require("slugify");
const { Bakery, Item, User } = require("../db/models");

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
        {
          model: User,
          as: "owner",
          attributes: ["username"],
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
    const foundBakery = await Bakery.findOne({
      where: { userId: req.user.id },
    });
    if (foundBakery) {
      const err = new Error("You already have a bakery");
      err.status = 400;
      return next(err);
    }

    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    req.body.userId = req.user.id;
    const newBakery = await Bakery.create(req.body);
    res.status(201).json(newBakery);
  } catch (err) {
    next(err);
  }
};

/* create item*/
exports.itemCreate = async (req, res, next) => {
  console.log("TCL: exports.itemCreate -> req.user", req.bakery);
  try {
    if (req.user.id === req.bakery.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.bakeryId = req.bakery.id;
      const newItem = await Item.create(req.body);
      res.status(201).json(newItem);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
