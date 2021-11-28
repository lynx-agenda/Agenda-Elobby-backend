/**
 * THIRD PARTY APIS 
 */
const router = require("express").Router();
const controller = require("../controllers/third.controller");

router.post("/books/", controller.getBooks);
router.post("/games/", controller.getGames);
router.post("/movies-tvshows/", controller.getMoviesAndTV);

module.exports = router;
