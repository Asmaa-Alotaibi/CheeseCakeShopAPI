const express = require("express");
const router = express.Router();
const {
  itemList,
  itemCreate,
  itemDelete,
  itemUpdate,
} = require("../controllers/itemControler");

/*get list of items*/
router.get("/", itemList);

/* create item*/
router.post("/", itemCreate);

/* delete item*/
router.delete("/:itemId", itemDelete);

/* Update item*/
router.put("/:itemId", itemUpdate);

module.exports = router;
