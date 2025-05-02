const db = require("../db/queries");

// GAMES
allGamesGet = async (req, res) => {
  const games = await db.getAllGames();
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();

  res.render("index", {
    title: "All games",
    games: games || [],
    genres,
    developers,
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

  const genres = await db.getAllGenres();
  const games = await db.searchGame(title);
  const developers = await db.getAllDevelopers();

  res.render("index", {
    title: "Search Results",
    games,
    genres,
    developers,
  });
};

// GENRES
createGenreGet = async (req, res) => {
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();

  res.render("genres/create", {
    title: "Create New Genre",
    genres,
    developers,
  });
};

createGenrePost = async (req, res) => {
  const { category } = req.body;

  try {
    const exists = await db.genreExists(category);

    if (exists) {
      return res.render("genres/create", {
        title: "Add Genre",
        error: "Genre already exists",
        category,
      });
    }

    await db.createGenre(category);
    res.redirect("/");
  } catch (err) {
    console.error("Error creating genre: ", err);
    res.status(500).send("Server Error");
  }
};

deleteGenreGet = async (req, res) => {
  const { id } = req.params;
  const [genre] = await db.getGenresById(id);
  if (!genre) return res.status(404).send("Genre not found");

  res.render("genres/delete", { title: "Confirm Delete", genre });
};

deleteGenrePost = async (req, res) => {
  const { id } = req.params;
  await db.deleteGenre(id);
  res.redirect("/");
};

gamesByGenreGet = async (req, res) => {
  const { id } = req.params;
  const games = await db.getGamesByGenreId(id);
  const genres = await db.getAllGenres();
  const genre = await db.getGenreById(id);
  const developers = await db.getAllDevelopers();

  res.render("index", {
    title: genre ? `${genre.category} Games` : "Games by Genre",
    games,
    genres,
    developers,
  });
};

// DEVELOPERS
createDeveloperGet = async (req, res) => {
  const genres = await db.getAllGenres();
  const developers = await db.getAllDevelopers();

  res.render("developers/create", {
    title: "Create Developer",
    genres,
    developers,
  });
};

createDeveloperPost = async (req, res) => {};

deleteDeveloperGet = async (req, res) => {
  const id = req.params.id;
  const developer = await db.getDeveloperById(id);

  res.render("developers/delete", {
    title: "Delete Developer",
    developer,
  });
};

deleteDeveloperPost = async (req, res) => {
  const { id } = req.params;
  await db.deleteDeveloper(id);
  res.redirect("/");
};

module.exports = {
  allGamesGet,
  createGameGet,
  createGamePost,
  editGameGet,
  editGamePost,
  deleteGameGet,
  deleteGamePost,
  searchGameGet,
  createGenreGet,
  createGenrePost,
  deleteGenreGet,
  deleteGenrePost,
  gamesByGenreGet,
  createDeveloperGet,
  createDeveloperPost,
  deleteDeveloperGet,
  deleteDeveloperPost,
};
