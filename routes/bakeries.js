const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const {
  bakeryList,
  bakeryCreate,
  fetchBakery,
  itemCreate,
} = require("../controllers/bakeryController");
const passport = require("passport");

router.param("bakeryId", async (req, res, next, bakeryId) => {
  console.log(`this is me ${bakeryId}`);
  const bakery = await fetchBakery(bakeryId, next);
  if (bakery) {
    req.bakery = bakery;
    next();
  } else {
    const err = new Error("Bakery Not Found");
    err.status = 404;
    next(err);
  }
});

/*get list of bakries*/
router.get("/", bakeryList);

/* create bakery*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bakeryCreate
);

/* create item*/
router.post(
  "/:bakeryId/items",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  itemCreate
);

module.exports = router;
