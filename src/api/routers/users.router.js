const router = require("express").Router();
const controller = require("../controllers/users.controller");
const { isAdmin } = require('../../middlewares/auth.middleware');

router.get("", isAdmin, controller.getAll);
router.get("/:id", controller.getUser); //=> coger un usuario por id
// router.post("", controller.createUser); //=> coger un user
router.delete("/:id", controller.removeUser); //=> borrar un user por id
router.patch("/:id", controller.modifyUser); //=> parchear un user por id

module.exports = router;