const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Calculate route
app.post("/calculate", (req, res) => {
  const { number1, number2, operation } = req.body;

  let result;
  switch (operation) {
    case "+": result = number1 + number2; break;
    case "-": result = number1 - number2; break;
    case "*": result = number1 * number2; break;
    case "/": result = number2 !== 0 ? number1 / number2 : null; break;
    default: return res.status(400).json({ error: "Invalid operation" });
  }

  res.json({ result });
});

// Save calculation
app.post("/save", async (req, res) => {
  const { number1, number2, operation, result } = req.body;

  const query =
    "INSERT INTO calculations (number1, number2, operation, result) VALUES ($1, $2, $3, $4) RETURNING *";

  const values = [number1, number2, operation, result];

  const saved = await pool.query(query, values);
  res.json(saved.rows[0]);
});

// Get history
app.get("/history", async (req, res) => {
  const result = await pool.query("SELECT * FROM calculations ORDER BY id DESC");
  res.json(result.rows);
});

app.listen(4000, () => console.log("Server running on port 4000"));