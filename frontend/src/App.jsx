import { useState, useEffect } from "react";
import Calculator from "./Calculator";
import { getHistory } from "./api";

function App() {
  const [history, setHistory] = useState([]);

  async function loadHistory() {
    const data = await getHistory();
    setHistory(data);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="app">
      <h1>Calculator</h1>
      <Calculator onHistoryUpdate={loadHistory} />

      <h2>History</h2>
      <ul>
        {history.map(h => (
          <li key={h.id}>
            {h.expression} = {h.result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
