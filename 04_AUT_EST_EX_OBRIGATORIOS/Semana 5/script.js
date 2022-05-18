// +, -, *, /, // e %

function calc(v1, v2, operation) {
  switch (operation) {
    case "+":
      return v1 + v2;
    case "-":
      return v1 - v2;
    case "*":
      return v1 * v2;
    case "/":
      return v1 / v2;
    case "//":
      return Math.floor(v1 / v2);
    case "%":
      return v1 % v2;
    default:
      return 0;
  }
}

function showTextResult(message) {
  document.getElementById("resultadoText").textContent = message;
}

function buttonHandler(operation) {
  const numberInput = Number(document.getElementById("numberInput").value);
  const numberInput2 = Number(document.getElementById("numberInput2").value);
  const result = calc(numberInput, numberInput2, operation);
  showTextResult(result);
}
