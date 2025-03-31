const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function createGame(game) {
  await pool.query("INSERT INTO games (game) VALUES ($1)", [game]);
}

module.exports = {
  getAllGames,
  createGame,
};
