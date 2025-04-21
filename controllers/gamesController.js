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

editGameGet = async (req, res) => {
  const gameId = req.params.id;
  const game = await db.getGameById(gameId);
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();

  res.render("games/edit", {
    title: "Edit Game",
    game,
    genres,
    developers,
  });
};

editGamePost = async (req, res) => {
  const id = req.params.id;
  const { title, description, price, genre_id, developer_id } = req.body;

  try {
    await db.updateGame(id, {
      title,
      description,
      price,
      genre_id,
      developer_id,
    });
    res.redirect("/");
  } catch (err) {
    console.error("Error updating game: ", err);
    res.status(500).send("Server error");
  }
};

deleteGameGet = async (req, res) => {
  const id = req.params.id;
  const game = await db.getGameById(id);

  if (!game) {
    return res.status(400).send("Game not found");
  }

  res.render("games/delete", {
    title: "Confirm Delete",
    game,
  });
};

deleteGamePost = async (req, res) => {
  const id = req.params.id;
  await db.deleteGame(id);

  req.session.message = "Game deleted successfully!"; // adds message onto request session
  res.redirect("/");
};

searchGameGet = async (req, res) => {
  const { title } = req.query;

  const games = await db.searchGame(title);

  res.render("index", {
    title: "Search Results",
    games,
  });
};

createGenrePost = async (req, res) => {};

module.exports = {
  allGamesGet,
  createGameGet,
  createGamePost,
  createGenrePost,
  editGameGet,
  editGamePost,
  deleteGameGet,
  deleteGamePost,
  searchGameGet,
};
