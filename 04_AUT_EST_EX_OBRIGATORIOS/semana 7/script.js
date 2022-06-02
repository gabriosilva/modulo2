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

// exercise 5---------------------------
let studentList = [];

let examGrades = [];
let homeworkGrades = [];
let studentGrades = [];

let gradeObj = {
  averageGrade: 0,
  averageExamGrades: 0,
  averageHomeworkGrades: 0,
  smallestExamGrade: 0,
  biggestExamGrade: 0,
  smallestHomeworkGrade: 0,
  biggestHomeworkGrade: 0,
};

class Student {
  constructor(id, name, homeworkGrade, examGrade, averageGrade) {
    this.id = id;
    this.name = name;
    this.homeworkGrade = homeworkGrade;
    this.examGrade = examGrade;
    this.averageGrade = averageGrade;
  }
}

function studentFactory(studentAmount) {
  studentList = [];
  const studentIdArray = [...Array(studentAmount).keys()];
  studentIdArray.forEach((studentId) => {
    const studentObj = new Student(
      studentId,
      `Estudante-${studentId}`,
      0,
      0,
      0
    );
    studentList.push(studentObj);
  });
  return studentList;
}

function generateStudentViewElement(studentObj) {
  const tableContentElement = document.createElement("tr");
  const htmlContent = `
  <th scope="row">${studentObj.id}</th>
  <td>${studentObj.name}</td>
  <td>
    <div class="row">
      <span class="col-6"> <input type="text" class="form-control" aria-label="Default"
          aria-describedby="inputGroup-sizing-default" id="studentHomeworkGrade${studentObj.id}"
          placeholder="Valor"></span>
    </div>
  </td>
  <td>
    <div class="row">
      <span class="col-6"> <input type="text" class="form-control" aria-label="Default"
          aria-describedby="inputGroup-sizing-default" id="studentExamGrade${studentObj.id}"
          placeholder="Valor"></span>
    </div>
  </td>   
  <td><span id="averageGrade${studentObj.id}"> -- </span></td>
  `;

  tableContentElement.innerHTML = htmlContent;
  return tableContentElement;
}

function calculateStudentAverageGrade(examGrade, homeworkGrade) {
  return (examGrade * 2 + homeworkGrade * 3) / 5;
}

function processStudentGrades(studentsArray) {
  examGrades = [];
  homeworkGrades = [];
  studentGrades = [];
  studentsArray.map((student) => {
    // gets the grade values
    let homeworkGrade = parseInt(
      document.getElementById(`studentHomeworkGrade${student.id}`).value
    );
    let examGrade = parseInt(
      document.getElementById(`studentExamGrade${student.id}`).value
    );

    // calculates the student average
    student.examGrade = examGrade;
    student.homeworkGrade = homeworkGrade;

    student.averageGrade = calculateStudentAverageGrade(
      examGrade,
      homeworkGrade
    );

    // loads the grades to the list
    examGrades.push(examGrade);
    homeworkGrades.push(homeworkGrade);
    studentGrades.push(student.averageGrade);

    document.getElementById(`averageGrade${student.id}`).textContent =
      student.averageGrade;
  });
}

function processAndShowGeneralGrades() {
  examGrades.sort(function (a, b) {
    return a - b;
  });
  homeworkGrades.sort(function (a, b) {
    return a - b;
  });
  studentGrades.sort(function (a, b) {
    return a - b;
  });
  let result = {
    averageGrade: 0,
    averageExamGrade: 0,
    averageHomeworkGrade: 0,
    lowestExamGrade: examGrades[0],
    highestExamGrade: examGrades[examGrades.length - 1],
    lowestHomeworkGrade: homeworkGrades[0],
    highestHomeworkGrade: homeworkGrades[homeworkGrades.length - 1],
  };

  result.averageExamGrade =
    examGrades.reduce((a, b) => {
      return a + b;
    }) / examGrades.length;

  result.averageHomeworkGrade =
    homeworkGrades.reduce((a, b) => {
      return a + b;
    }) / homeworkGrades.length;
  result.averageGrade =
    studentGrades.reduce((a, b) => {
      return a + b;
    }) / studentGrades.length;

  // sets the html elements values accordingly
  document.getElementById("averageGradeResult").textContent =
    result.averageGrade;
  document.getElementById("averageExamGradeResult").textContent =
    result.averageExamGrade;
  document.getElementById("averageHomeworkGradeResult").textContent =
    result.averageHomeworkGrade;
  document.getElementById("highestExamGradeResult").textContent =
    result.highestExamGrade;
  document.getElementById("lowestExamGradeResult").textContent =
    result.lowestExamGrade;
  document.getElementById("highestHomeworkGradeResult").textContent =
    result.highestHomeworkGrade;
  document.getElementById("lowestHomeworkGeralResult").textContent =
    result.lowestHomeworkGrade;
}

function appendStudentsToTableBody(studentsArray, tableBodyId) {
  const tableBody = document.getElementById(tableBodyId);
  tableBody.innerHTML = "";
  // iterates over the students object array
  studentsArray.forEach((studentObj) => {
    const studentElement = generateStudentViewElement(studentObj);
    tableBody.append(studentElement);
  });
}

function addStudentsHandler() {
  const studentAmount = parseInt(
    document.getElementById("studentAmountInput").value || 0
  );
  studentFactory(studentAmount);
  appendStudentsToTableBody(studentList, "studentTableBody");
}

function processStudentsHandler() {
  processStudentGrades(studentList);
  processAndShowGeneralGrades();
}

// -------------------------------------
