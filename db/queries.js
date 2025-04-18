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

async function updateGame(
  id,
  { title, description, price, genre_id, developer_id }
) {
  await pool.query(
    `
    UPDATE games
    SET title = $1,
        description = $2,
        price = $3,
        genre_id = $4,
        developer_id = $5
    WHERE id = $6
    `,
    [title, description, price, genre_id, developer_id, id]
  );
}

async function getGameById(id) {
  const { rows } = await pool.query(
    `
    SELECT
      games.id,
      games.title,
      games.description,
      games.price,
      genres.category AS genre,
      developers.company AS developer,
      games.genre_id,
      games.developer_id
    FROM games
    JOIN genres ON games.genre_id = genres.id
    JOIN developers ON games.developer_id = developers.id
    WHERE games.id = $1
    `,
    [id]
  );
  return rows[0];
}

async function deleteGame(id) {
  await pool.query(
    `
    DELETE FROM games
    WHERE id = $1
    `,
    [id]
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
  updateGame,
  deleteGame,
  getAllGenres,
  getAllDevelopers,
  getGameById,
};
