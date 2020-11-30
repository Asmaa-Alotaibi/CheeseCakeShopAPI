const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
  itemList,
  itemCreate,
  itemDelete,
  itemUpdate,
  fetchItem,
} = require("../controllers/itemControler");

router.param("itemId", async (req, res, next, itemId) => {
  console.log(`this is me ${itemId}`);
  const item = await fetchItem(itemId, next);
  if (item) {
    req.item = item;
    next();
  } else {
    const err = new Error("Item Not Found");
    err.status = 404;
    next(err);
  }
});

/*get list of items*/
router.get("/", itemList);

/* create item*/
router.post("/", upload.single("image"), itemCreate);

/* delete item*/
router.delete("/:itemId", itemDelete);

/* Update item*/
router.put("/:itemId", upload.single("image"), itemUpdate);

module.exports = router;
