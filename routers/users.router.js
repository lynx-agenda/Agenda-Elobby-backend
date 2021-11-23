const router = require("express").Router();
const controller = require("../controllers/users.controller");

router.get("", controller.getAll);
// router.post => coger un user
// router.delete => borrar un user por id
// router.patch => parchear un user por id
// router.get => coger un usuario por id

module.exports = router;
