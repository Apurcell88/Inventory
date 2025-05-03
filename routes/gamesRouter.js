const { Router } = require("express");
const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/", gamesController.allGamesGet);

gamesRouter.get("/create", gamesController.createGameGet);
gamesRouter.post("/create", gamesController.createGamePost);

gamesRouter.get("/edit/:id", gamesController.editGameGet);
gamesRouter.post("/edit/:id", gamesController.editGamePost);

gamesRouter.get("/delete/:id", gamesController.deleteGameGet);
gamesRouter.post("/delete/:id", gamesController.deleteGamePost);

gamesRouter.get("/search", gamesController.searchGameGet);

gamesRouter.get("/genres/create", gamesController.createGenreGet);
gamesRouter.post("/genres/create", gamesController.createGenrePost);

gamesRouter.get("/genres/delete/:id", gamesController.deleteGenreGet);
gamesRouter.post("/genres/delete/:id", gamesController.deleteGenrePost);

gamesRouter.get("/genres/:id", gamesController.gamesByGenreGet);

gamesRouter.get("/developers/create", gamesController.createDeveloperGet);
gamesRouter.post("/developers/create", gamesController.createDeveloperPost);

gamesRouter.get("/developers/delete/:id", gamesController.deleteDeveloperGet);
gamesRouter.post("/developers/delete/:id", gamesController.deleteDeveloperPost);

gamesRouter.get("/developers/:id", gamesController.gamesByDeveloperGet);

module.exports = gamesRouter;
