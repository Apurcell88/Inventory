const { Router } = require("express");
const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/", gamesController.allGamesGet);

gamesRouter.get("/create", gamesController.createGameGet);
gamesRouter.post("/create", gamesController.createGamePost);

gamesRouter.get("/edit/:id", gamesController.editGameGet);
gamesRouter.post("/edit/:id", gamesController.editGamePost);

module.exports = gamesRouter;
