// Common functions

function changeElementText(elementId, content) {
  document.getElementById(elementId).textContent = content;
}

// exercise 1---------------------------

function increaseInput(inputId) {
  const htmlElement = document.getElementById(inputId);
  let value = parseInt(htmlElement.value);
  const newValue = value + 1;
  htmlElement.value = newValue;
}

function decreaseInput(inputId) {
  const htmlElement = document.getElementById(inputId);
  let value = parseInt(htmlElement.value);
  const newValue = value > 0 ? value - 1 : 0;
  htmlElement.value = newValue;
}

function plusHandler() {
  increaseInput("numberInput");
}

function minusHandler() {
  decreaseInput("numberInput");
}

// -------------------------------------

// exercise 2---------------------------

function swapInputs(inputAid, inputBid) {
  const elementA = document.getElementById(inputAid);
  const elementB = document.getElementById(inputBid);
  const elementAvalue = elementA.value;
  elementA.value = elementB.value;
  elementB.value = elementAvalue;
}

function swapHandler() {
  swapInputs("numberInputA", "numberInputB");
}

// -------------------------------------

// exercise 3---------------------------
function validateNumber(phoneNumber) {
  let re = /^\({1}(\d{2})\){1}[\- ]?(\d{5})[- ]{1}(\d{4})$/;
  return re.test(phoneNumber);
}

function validatePhoneHandler() {
  const phoneNumber = document.getElementById("numberInputPhone").value;
  const isValid = validateNumber(phoneNumber);
  isValid
    ? changeElementText("phoneValidationResult", "Número Válido")
    : changeElementText("phoneValidationResult", "Número Inválido");
}

// -------------------------------------

// exercise 4---------------------------
function purchaseFlight(peopleAmount, isDayTimeShift) {
  let pricePerPerson, discountPercentage;
  if (isDayTimeShift) {
    pricePerPerson = 200;
    discountPercentage = peopleAmount > 50 ? 0.4 : 0;
  } else {
    pricePerPerson = 100;
    discountPercentage = peopleAmount > 50 ? 0.2 : 0;
  }
  const totalPrice = peopleAmount * pricePerPerson;
  const totalDiscount = discountPercentage * peopleAmount * pricePerPerson;
  const totalWithDiscount = totalPrice - totalDiscount;
  return totalWithDiscount;
}

function flightPurchaseHandler() {
  let isDayTimeShift = Boolean(
    parseInt(document.getElementById("flightShiftSelector").value)
  );
  console.log(isDayTimeShift);
  const peopleAmount = document.getElementById("flightPersonAmountInput").value;
  const totalPurchase = purchaseFlight(peopleAmount, isDayTimeShift);
  changeElementText("flightPurchaseResult", `$${totalPurchase}`);
}

// -------------------------------------