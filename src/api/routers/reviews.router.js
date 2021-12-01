const router = require("express").Router();
const controller = require("../controllers/reviews.controller");
const {
  isAdmin,
  checkAuthUserValidity,
} = require("../../middlewares/auth.middleware");

router.get("", isAdmin, controller.getAllReviews);
router.post("/:id", checkAuthUserValidity, controller.createReview);
router.get("/:id", checkAuthUserValidity, controller.getOneReview);
// router.patch("/:id", checkAuthUserValidity, controller.modifyReview);

module.exports = router;
