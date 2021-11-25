const router = require("express").Router();
const controller = require("../controllers/auth.controller");

router.post("/signin", controller.signIn);
router.post("/signup", controller.signUp);

module.exports = router;