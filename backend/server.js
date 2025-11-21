const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Save result
app.post("/history", async (req, res) => {
  const { expression, result } = req.body;
  const inserted = await pool.query(
    "INSERT INTO history (expression, result) VALUES ($1, $2) RETURNING *",
    [expression, result]
  );
  res.json(inserted.rows[0]);
});

// Get history
app.get("/history", async (req, res) => {
  const history = await pool.query("SELECT * FROM history ORDER BY created_at DESC");
  res.json(history.rows);
});

app.listen(4000, () => console.log("Server running on port 4000"));
