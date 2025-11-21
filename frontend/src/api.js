export const API_URL = "http://localhost:4000";

export async function getHistory() {
  const res = await fetch(`${API_URL}/history`);
  return res.json();
}

export async function saveCalculation(expression, result) {
  const res = await fetch(`${API_URL}/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ expression, result }),
  });

  return res.json();
}
