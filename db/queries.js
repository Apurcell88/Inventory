const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
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
