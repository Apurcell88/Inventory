const { Router } = require("express");
const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/", gamesController.allGamesGet);

gamesRouter.get("/create", gamesController.createGameGet);
gamesRouter.post("/create", gamesController.createGamePost);

module.exports = gamesRouter;
