const router = require("express").Router();
const controller = require("../controllers/elements.controller");

router.get("", controller.getAllElements);
router.post("", controller.createElement);
router.delete("/:id", controller.removeElement);
router.patch("/:id", controller.modifyElement);
router.get("/:id", controller.getElement);

module.exports = router;
