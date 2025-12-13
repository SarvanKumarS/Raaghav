// Basic math calculator for 5 inputs with print-friendly output

document.addEventListener("DOMContentLoaded", () => {
  const inputs = [
    document.getElementById("n1"),
    document.getElementById("n2"),
    document.getElementById("n3"),
    document.getElementById("n4"),
    document.getElementById("n5")
  ];
  const operation = document.getElementById("operation");
  const calculateBtn = document.getElementById("calculateBtn");
  const clearBtn = document.getElementById("clearBtn");
  const printBtn = document.getElementById("printBtn");
  const resultEl = document.getElementById("result");
  const inputsList = document.getElementById("inputsList");
  const historyEl = document.getElementById("history");

  function readNumbers(){
    // Read values, ignoring empty fields
    const vals = inputs
      .map(i => i.value.trim())
      .filter(v => v !== "")
      .map(v => Number(v))
      .filter(n => !Number.isNaN(n));
    return vals;
  }

  function showInputs(vals){
    inputsList.innerHTML = "";
    if(vals.length === 0){
      inputsList.textContent = "—";
      return;
    }
    vals.forEach(v => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = v;
      inputsList.appendChild(chip);
    });
  }

  function addHistory(text){
    const li = document.createElement("li");
    li.textContent = text;
    historyEl.insertBefore(li, historyEl.firstChild);
  }

  function calculate(){
    const vals = readNumbers();
    if(vals.length === 0){
      resultEl.textContent = "Please enter at least one number.";
      return;
    }

    let res;
    const op = operation.value;

    if(op === "sum"){
      res = vals.reduce((a,b) => a + b, 0);
    } else if(op === "average"){
      res = vals.reduce((a,b) => a + b, 0) / vals.length;
    } else if(op === "product"){
      res = vals.reduce((a,b) => a * b, 1);
    } else if(op === "min"){
      res = Math.min(...vals);
    } else if(op === "max"){
      res = Math.max(...vals);
    } else {
      res = "Unknown operation";
    }

    // format to avoid long floats
    const formatted = (typeof res === "number") ? formatNumber(res) : res;
    resultEl.textContent = formatted;
    showInputs(vals);
    addHistory(`${op.toUpperCase()} of [${vals.join(", ")}] = ${formatted}`);
  }

  function formatNumber(n){
    // Show up to 6 decimal places if needed, remove trailing zeros
    if(!Number.isFinite(n)) return String(n);
    const rounded = Math.round((n + Number.EPSILON) * 1e6) / 1e6;
    return String(rounded);
  }

  function clearAll(){
    inputs.forEach(i => i.value = "");
    resultEl.textContent = "No calculation yet.";
    inputsList.textContent = "—";
  }

  calculateBtn.addEventListener("click", calculate);
  clearBtn.addEventListener("click", clearAll);

  // Print only the result area (CSS @media print hides other elements)
  printBtn.addEventListener("click", () => {
    // If no result yet, still print inputs & instructions
    window.print();
  });

  // Allow Enter in any input to trigger calculation
  inputs.forEach(i => {
    i.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        e.preventDefault();
        calculate();
      }
    });
  });
});
