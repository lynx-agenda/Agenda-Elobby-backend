const router = require("express").Router();
const controller = require("../controllers/diaries.controller");
const {
  isAdmin,
  checkAuthUserValidity,
} = require("../../middlewares/auth.middleware");

router.get("", isAdmin, controller.getAllDiaries);
// router.post("", controller.createDiary);
router.delete("/:id", checkAuthUserValidity, controller.removeDiary);
router.patch("/:id/:idDiary", checkAuthUserValidity, controller.modifyDiary);
router.get("/:id", checkAuthUserValidity, controller.getDiary);

module.exports = router;
