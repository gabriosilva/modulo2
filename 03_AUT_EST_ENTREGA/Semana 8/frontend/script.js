let workCards = [
  {
    title: "Preview",
    type: "Preview",
    duration: "Abr de 2022 - abr de 2022",
    logo: "./assets/brasaHacksLogo.png",
  },
];

let studyCards = [
  {
    title: "Preview",
    type: "Preview",
    duration: "Abr de 2022 - abr de 2022",
    logo: "./assets/brasaHacksLogo.png",
  },
];

function cardFactory(title, id, workDescription, duration, logo, type) {
  return `<div class="card work-card col-md-2" id="card${title}">
  <img class="card-img-top" src="${logo}">
  <div class="card-body">
    <p class="card-text" id="">${title} · ${workDescription}</p>
    <div><small class="text-muted">${duration}</small></div>
    <div class="row">

    <button type="button" class="btn btn-primary col-2 m-2" id="processCard${type}${id}"><i class="fa-solid fa-minus"></i></button>
    </div>
    <div>
    </div>
  </div>
</div>`;
}

// async function fetchStudyCards() {
//   const responseRaw = await fetch("/studyExperience");
//   const responseJson = await responseRaw.json();
//   studyCards = responseJson.studyExperiences;
//   return studyCards;
// }

async function fetchWorkCards() {
  const responseRaw = await fetch("http://localhost/workExperience");
  const responseJson = await responseRaw.json();
  workCards = responseJson.workExperiences;
  return workCards;
}

function parseCardDate(startDate, endDate) {
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dec",
  ];
  console.log(endDate);
  console.log(startDate, endDate);
  return `${months[startDate.getMonth()]} de ${startDate.getFullYear()} - ${
    months[endDate.getMonth()]
  } de ${endDate.getFullYear()}`;
}

function postCreateNewStudyCard(
  title,
  studyType,
  startDate,
  endDate,
  logoPath
) {
  $.ajax({
    url: "http://localhost:5000/studyExperience/add",
    type: "POST",
    data: { title, studyType, startDate, endDate, logoPath },
    success: (response) => {
      alert("New Experience Added!");
    },
  });
}

function createNewStudyHandler() {
  postCreateNewStudyCard(
    "New Study Experience",
    "Additional Info",
    "10-10-10",
    "10-20-10",
    "./assets/studyExperiencePlaceholder.png"
  );
}

function createNewWorkHandler() {
  postCreateNewWorkCard(
    "New Work Experience",
    "Additional Info",
    "10-10-10",
    "10-20-10",
    "./assets/workExperiencePlaceholder.png"
  );
}

function postCreateNewWorkCard(title, workType, startDate, endDate, logoPath) {
  $.ajax({
    url: "http://localhost:5000/workExperience/add",
    type: "POST",
    data: { title, workType, startDate, endDate, logoPath },
    success: (response) => {
      alert("New Experience Added!");
    },
  });
}

function removeWorkCard(cardId) {
  $.ajax({
    url: "http://localhost:5000/workExperience/delete",
    type: "POST",
    data: { id: cardId },
    success: (data) => {
      console.log("Card removed successfully");
    },
  });
}

function removeStudyCard(cardId) {
  $.ajax({
    url: "http://localhost:5000/studyExperience/delete",
    type: "POST",
    data: { id: cardId },
    success: (data) => {
      console.log("Card removed successfully");
    },
  });
}

// Appends a new card in the "Work" section
$(document).ready(function () {
  $.ajax({
    url: "http://localhost:5000/workExperience",
    type: "GET",
    success: function (data) {
      let { workExperiences } = data;
      workExperiences.forEach((workCard) => {
        let duration = parseCardDate(
          new Date(workCard.startDate),
          new Date(workCard.endDate)
        );
        let newCard = cardFactory(
          workCard.title,
          workCard.id,
          workCard.workType,
          duration,
          workCard.logoPath,
          "Work"
        );
        $("#workCardBox").append(newCard);
        $(`#processCardWork${workCard.id}`).click(() => {
          removeWorkCard(workCard.id);
        });
      });
    },
  });
  // fetchWorkCards().then((workExperiences) => {

  // });

  $.ajax({
    url: "http://localhost:5000/studyExperience",
    type: "GET",
    success: function (data) {
      let { studyExperiences } = data;
      studyExperiences.forEach((studyCard) => {
        let duration = parseCardDate(
          new Date(studyCard.startDate),
          new Date(studyCard.endDate)
        );
        let newCard = cardFactory(
          studyCard.title,
          studyCard.id,
          studyCard.studyType,
          duration,
          studyCard.logoPath,
          "Study"
        );
        $("#studyCardBox").append(newCard);
        $(`#processCardStudy${studyCard.id}`).click(() => {
          removeStudyCard(studyCard.id);
        });
      });
    },
  });

  // fetchStudyCards().then((studyExperiences) => {

  // });
});
