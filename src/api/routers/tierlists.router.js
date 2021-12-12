const router = require("express").Router();
const controller = require("../controllers/tierlists.controller");
const {
  isAdmin,
  checkAuthUserValidity,
} = require("../../middlewares/auth.middleware");

// router.get("", isAdmin, controller.getAllTierlist);
// // router.post("", controller.createDiary);
// router.delete("/:id", checkAuthUserValidity, controller.removeDiary);
router.patch("/:category", checkAuthUserValidity, controller.modifyTierlist);
router.get("", checkAuthUserValidity, controller.getTierlist);

module.exports = router;
