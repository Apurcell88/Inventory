const express = require("express");
const app = express();
const gamesRouter = require("./routes/gamesRouter");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", gamesRouter);
app.use("/games", gamesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
