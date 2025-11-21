import { useState } from "react";
import { saveCalculation } from "./api";

export default function Calculator({ onHistoryUpdate }) {
  const [input, setInput] = useState("");

  function handleClick(value) {
    setInput(prev => prev + value);
  }

  async function handleEquals() {
    try {
      const result = eval(input).toString();
      await saveCalculation(input, result);
      onHistoryUpdate();
      setInput(result);
    } catch {
      alert("Invalid expression");
    }
  }

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>

      <div className="buttons">
        {"1234567890+-*/".split("").map((btn, i) => (
          <button key={i} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}

        <button onClick={handleEquals}>=</button>
        <button onClick={() => setInput("")}>Clear</button>
      </div>
    </div>
  );
}
