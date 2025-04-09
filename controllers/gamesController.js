const db = require("../db/queries");

allGamesGet = async (req, res) => {
  const games = db.getAllGames();
  console.log("All games: ", games);
  // need to map through the games for their values - do this in index.ejs???
  res.render("index", {
    title: "All games",
    games,
  });
};

createGamePost = async (req, res) => {
  res.render("games/create", {
    title: "Game Creation",
  });
};

createGenrePost = async (req, res) => {};

module.exports = {
  allGamesGet,
  createGamePost,
  createGenrePost,
};
