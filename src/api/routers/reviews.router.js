const router = require("express").Router();
const controller = require("../controllers/reviews.controller");

router.get("", controller.getAllReviews);
router.post("", controller.createReview);
router.get("/:id", controller.getOneReview);
router.patch("/:id", controller.modifyReview);

module.exports = router;
