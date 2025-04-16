const db = require("../db/queries");

allGamesGet = async (req, res) => {
  const games = await db.getAllGames();
  console.log("All games: ", games);
  // need to map through the games for their values - do this in index.ejs???
  res.render("index", {
    title: "All games",
    games,
  });
};

createGameGet = async (req, res) => {
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();

  res.render("games/create", {
    title: "Game Creation",
    genres,
    developers,
  });
};

createGamePost = async (req, res) => {
  const { title, description, price, genre_id, developer_id } = req.body;
  console.log(req.body);

  try {
    await db.createGame({ title, description, price, genre_id, developer_id });
    res.redirect("/");
  } catch (err) {
    console.error("Error creating game: ", err);
    res.status(500).send("Failed to create game");
  }
};

createGenrePost = async (req, res) => {};

module.exports = {
  allGamesGet,
  createGameGet,
  createGamePost,
  createGenrePost,
};
