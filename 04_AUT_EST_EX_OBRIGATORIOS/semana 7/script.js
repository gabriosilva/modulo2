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

function swapInputs(inputAid, inputBid) {
  const elementA = document.getElementById(inputAid);
  const elementB = document.getElementById(inputBid);
  const elementAvalue = elementA.value;
  elementA.value = elementB.value;
  elementB.value = elementAvalue;
}

function validateNumber(phoneNumber) {
  let re = /^\({1}(\d{2})\){1}[\- ]?(\d{5})[- ]{1}(\d{4})$/;
  return re.test(phoneNumber);
}

function plusHandler() {
  increaseInput("numberInput");
}

function minusHandler() {
  decreaseInput("numberInput");
}

function swapHandler() {
  swapInputs("numberInputA", "numberInputB");
}

function changeElementText(elementId, content) {
  document.getElementById(elementId).textContent = content;
}

function validatePhoneHandler() {
  const phoneNumber = document.getElementById("numberInputPhone").value;
  const isValid = validateNumber(phoneNumber);
  isValid
    ? changeElementText("phoneValidationResult", "Número Válido")
    : changeElementText("phoneValidationResult", "Número Inválido");
}
