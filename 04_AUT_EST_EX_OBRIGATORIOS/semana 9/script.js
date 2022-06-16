// Common functions

function showErrorMessage(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
}

function updateHtmlElementText(elementId, text) {
  document.getElementById(elementId).textContent = text;
}

// Exercício 1

function verifyInput(inputValue) {
  if (!inputValue) {
    showErrorMessage("Nenhum valor inserido!");
    return false;
  }
  if (inputValue.length != 3) {
    showErrorMessage("Numero de caracteres inválido!");
    return false;
  }

  return true;
}

function isHundredEven(inputNumber) {
  const hundredNumber = Math.floor(inputNumber / 100);
  const isEven = hundredNumber % 2 == 0;
  return isEven;
}

function exercise1Handler() {
  const inputValue = parseInt(
    document.getElementById("numerInputEx1").value || 0.0
  );
  const verified = verifyInput(inputValue.toString());
  if (verified) {
    const isEven = isHundredEven(inputValue);
    const newText = isEven ? "A centena é Par" : "A centena é Impar";
    updateHtmlElementText("resultadoEx1", newText);
  }
}

// Exercicio 2
function verifyInput2(inputValue) {
  if (!parseInt(inputValue)) {
    showErrorMessage("Nenhum valor inserido!");
    return false;
  }
  if (parseInt(inputValue) < 0) {
    showErrorMessage("O número inserido deve ser positivo!");
    return false;
  }

  return true;
}

function sumDigits(inputNumberStr) {
  const digitsArray = Array.from(inputNumberStr.toString(), (v) => {
    return Number(v);
  });
  let total = 0;
  digitsArray.forEach((element) => {
    total += element;
  });
  return total;
}

function exercise2Handler() {
  const inputValue = document.getElementById("numerInputEx2").value || 0.0;

  const verified = verifyInput2(inputValue);
  if (verified) {
    const sumOfDigits = sumDigits(inputValue);
    const newText = `Resultado da soma: ${sumOfDigits}`;
    updateHtmlElementText("resultadoEx2", newText);
  }
}

// Exercicio 3
function verifyInput3(inputText) {
  if (!inputText) {
    showErrorMessage("Um ou mais nomes não foram inseridos!");
    return false;
  }

  return true;
}

function sortNamesAlphabetically(nameList, asc = true) {
  return nameList.sort((a, b) => {
    return a > b ? (asc ? 1 : -1) : asc ? -1 : 1;
  });
}

function exercise3Handler() {
  const name1 = document.getElementById("textInputEx3Nome1").value;
  const name2 = document.getElementById("textInputEx3Nome2").value;
  const name3 = document.getElementById("textInputEx3Nome3").value;

  const verified1 = verifyInput3(name1);
  const verified2 = verifyInput3(name2);
  const verified3 = verifyInput3(name3);

  if (verified1 && verified2 && verified3) {
    const nameList = [name1, name2, name3];
    sortNamesAlphabetically(nameList);
    let newText = "";
    nameList.forEach((name) => (newText += `\n ${name}`));
    updateHtmlElementText("resultadoEx3", newText);
  }
}

// Exercicio 4
function verifyInput4(inputValue) {
  if (!parseInt(inputValue)) {
    showErrorMessage("Nenhum valor inserido!");
    return false;
  }
  if (parseInt(inputValue) <= 0) {
    showErrorMessage("O número inserido deve ser positivo e maior que 0!");
    return false;
  }

  return true;
}

function calculateFibonacci(maxPosition) {
  const fibonacciSequence = [];
  for (let i = 0; i < maxPosition; i++) {
    let currentNumber =
      (fibonacciSequence[i - 1] || 0) + (fibonacciSequence[i - 2] || 0);
    fibonacciSequence.push(i != 1 ? currentNumber : 1);
  }
  return fibonacciSequence;
}

function exercise4Handler() {
  const inputValue = document.getElementById("numerInputEx4").value || 0;

  const verified = verifyInput4(inputValue);
  if (verified) {
    const fibonacciSequence = calculateFibonacci(parseInt(inputValue));
    const newText = fibonacciSequence.join(", ");
    updateHtmlElementText("resultadoEx4", newText);
  }
}

// Exercicio 5
function verifyInput5(inputValue) {
  if (inputValue.toString().length <= 0) {
    showErrorMessage("Nenhum valor inserido!");
    return false;
  }
  if (parseInt(inputValue) < 0) {
    showErrorMessage("O número inserido deve ser positivo!");
    return false;
  }

  return true;
}

function isPrime(numberInput) {
  let maxRange = numberInput;
  let divisionCount = 0;

  if (numberInput > 20) {
    maxRange = Math.floor(Math.sqrt(numberInput));
    divisionCount += 1;
  }
  for (let i = 0; i <= maxRange; i++) {
    numberInput % i == 0 && divisionCount++;
  }
  return divisionCount == 2;
}

function findPrimeNumbers(min, max) {
  const primeNumbers = [];
  for (let i = min; i <= max; i++) {
    isPrime(i) ? primeNumbers.push(i) : null;
  }
  console.log(min,max)
  return primeNumbers;
}

function exercise5Handler() {
  const inputValueMin =
    document.getElementById("numberInputEx5Number1").value || 0;
  const inputValueMax =
    document.getElementById("numberInputEx5Number2").value || 0;

  const verifiedMin = verifyInput5(inputValueMin);
  const verifiedMax = verifyInput5(inputValueMax);
  if (verifiedMin && verifiedMax) {
    const primeNumbers = findPrimeNumbers(
      parseInt(inputValueMin),
      parseInt(inputValueMax)
    );
    const newText = primeNumbers.join(" , ");
    updateHtmlElementText("resultadoEx5", primeNumbers);
  }
}
