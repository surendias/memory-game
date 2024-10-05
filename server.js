const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new Database("leaderboard.sqlite");

// Create the leaderboard table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    moves INTEGER NOT NULL
  )
`);

// Get leaderboard
app.get("/api/leaderboard", (req, res) => {
  const leaderboard = db
    .prepare("SELECT * FROM leaderboard ORDER BY moves ASC LIMIT 5")
    .all();
  res.json(leaderboard);
});

// Add new score
app.post("/api/leaderboard", (req, res) => {
  const { name, moves } = req.body;
  const insert = db.prepare(
    "INSERT INTO leaderboard (name, moves) VALUES (?, ?)"
  );
  const result = insert.run(name, moves);
  res.json({ id: result.lastInsertRowid });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
