const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query(`
    SELECT
      games.id,
      games.title,
      games.description,
      games.price,
      genres.category AS genre,
      developers.company AS developer
    FROM games
    JOIN genres ON games.genre_id = genres.id
    JOIN developers ON games.developer_id = developers.id
    `);
  return rows;
}

async function createGame({
  title,
  description,
  price,
  genre_id,
  developer_id,
}) {
  await pool.query(
    "INSERT INTO games (title, description, price, genre_id, developer_id) VALUES ($1, $2, $3, $4, $5)",
    [title, description, price, genre_id, developer_id]
  );
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function getAllDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

module.exports = {
  getAllGames,
  createGame,
  getAllGenres,
  getAllDevelopers,
};
