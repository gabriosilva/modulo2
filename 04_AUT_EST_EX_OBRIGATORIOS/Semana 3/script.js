let isShown = false;

// formula constants
const gravity = 10;

// calculates the max height
const calculateHmax = (speed) => {
  let hMax = speed ** 2 / (2 * gravity);
  return hMax;
};

// calculates the time amount
const calculateTime = (speed) => {
  let time = speed / gravity;
  return time;
};

// shows an element by its Id
const showElement = (elementId) => {
  document.getElementById(elementId).classList.remove("d-none");
  isShown = true;
};

// hides an element by its Id
const hideElement = (elementId) => {
  document.getElementById(elementId).classList.add("d-none");
};

// handles the button logic
const calcButtonHandler = () => {
  const initialSpeed = Number(document.getElementById("initialSpeed").value);
  const hMax = calculateHmax(initialSpeed);
  const totalTime = calculateTime(initialSpeed);

  // updates the html elements' text content accordingly
  document.getElementById("maxHeightAnswer").textContent = hMax;
  document.getElementById("totalTimeAnswer").textContent = totalTime;

  // shows the alert element
  !isShown ? showElement("answerAlert") : null;
};
