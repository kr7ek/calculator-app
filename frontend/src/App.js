import React, { useState, useEffect } from "react";
import { calculate, saveCalculation, getHistory } from "./api";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await getHistory();
    setHistory(res.data);
  };

  const handleCalculate = async () => {
    const res = await calculate({ number1: +number1, number2: +number2, operation });
    setResult(res.data.result);
  };

  const handleSave = async () => {
    await saveCalculation({ number1, number2, operation, result });
    loadHistory();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Calculator</h2>

      <input
        type="number"
        value={number1}
        onChange={(e) => setNumber1(e.target.value)}
        placeholder="Number 1"
      />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option>+</option>
        <option>-</option>
        <option>*</option>
        <option>/</option>
      </select>
      <input
        type="number"
        value={number2}
        onChange={(e) => setNumber2(e.target.value)}
        placeholder="Number 2"
      />

      <br /><br />

      <button onClick={handleCalculate}>Calculate</button>

      {result !== null && (
        <>
          <h3>Result: {result}</h3>
          <button onClick={handleSave}>Save to History</button>
        </>
      )}

      <h3>History:</h3>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {item.number1} {item.operation} {item.number2} = {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
