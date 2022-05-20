// defined note list
const noteList = [1, 2, 5, 10, 20, 50, 100];

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

function showNewProductNote(message) {
  const p = document.createElement("p");
  p.textContent = message;
  document.getElementById("notasText").appendChild(p);
}

/* recursive function for calculating the amount and which notes
   to use for the product exchange */

function productExchange(productValue, nList, hMap) {
  if (productValue <= 0) {
    return hMap;
  } else {
    for (let i = nList.length - 1; i >= 0; i--) {
      const currentChar = nList[i];
      if (currentChar <= productValue) {
        const nDivision = Math.floor(productValue / currentChar);
        hMap[`Nota(s) de R$${currentChar}`] = nDivision;
        const rest = productValue % currentChar;
        return productExchange(rest, nList.slice(0, i), hMap);
      }
    }
  }
}

// insertion sort algorithm for sorting arrays

function insertionSortArray(array) {
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let currentChar = array[i];
    let previousIndex = i - 1;
    while (previousIndex > -1 && currentChar < array[previousIndex]) {
      array[previousIndex + 1] = array[previousIndex];
      previousIndex--;
    }
    array[previousIndex + 1] = currentChar;
  }
  return array;
}

// binarySearch recursive algorithm

function binarySearch(array, low, high, element) {
  if (low > high) {
    return null;
  }
  let half = Math.floor((low + high) / 2);

  if (element == array[half]) {
    return half;
  } else if (element < array[half]) {
    return binarySearch(array, low, half - 1, element);
  } else {
    return binarySearch(array, half + 1, high, element);
  }
}

function buttonHandler(operation) {
  const numberInput = Number(document.getElementById("numberInput").value);
  const numberInput2 = Number(document.getElementById("numberInput2").value);
  const result = calc(numberInput, numberInput2, operation);
  showTextResult(result);
}

function productExchangeHandler() {
  document.getElementById("notasText").innerHTML = "";
  const valueInput = Number(document.getElementById("productInput").value);
  const notes = productExchange(valueInput, noteList, {});
  Object.keys(notes).map((noteKey) => {
    const message = `${notes[noteKey]} ` + noteKey;
    showNewProductNote(message);
  });
}

function positionButtonHandler() {
  let valueList = document.getElementById("numberListInput").value.split(",");
  valueList = valueList.map((element) => {
    return Number(element);
  });
  const targetValue = Number(
    document.getElementById("targetNumberInput").value
  );
  insertionSortArray(valueList);
  const resultPos = binarySearch(valueList, 0, valueList.length, targetValue);
  document.getElementById(
    "positionText"
  ).textContent = `Na lista Ordenada ${valueList}, O elemento ${targetValue} está na ${
    resultPos + 1
  }ª posição`;
}
