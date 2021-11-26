const router = require("express").Router();
const controller = require("../controllers/users.controller");

router.get("", controller.getAll);
// router.post("", controller.createUser); //=> coger un user
router.delete("/:id", controller.removeUser); //=> borrar un user por id
router.patch("/:id", controller.modifyUser); //=> parchear un user por id
router.get("/:email", controller.getUser); //=> coger un usuario por id

module.exports = router;