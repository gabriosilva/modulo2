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

function cardFactory(title, type, duration, logo) {
  return `<div class="card work-card col-md-2" id="card${title}">
  <img class="card-img-top" src="${logo}">
  <div class="card-body">
    <p class="card-text">${title} · ${type}</p>
    <small class="text-muted">${duration}</small>
  </div>
</div>`;
}

async function fetchStudyCards() {
  const responseRaw = await fetch("http://localhost:5000/studyExperience");
  const responseJson = await responseRaw.json();
  studyCards = responseJson.studyExperiences;
  return studyCards;
}

async function fetchWorkCards() {
  const responseRaw = await fetch("http://localhost:5000/workExperience");
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

// Appends a new card in the "Work" section
$(document).ready(function () {
  fetchWorkCards().then((workExperiences) => {
    workExperiences.forEach((workCard) => {
      let duration = parseCardDate(
        new Date(workCard.startDate),
        new Date(workCard.endDate)
      );
      let newCard = cardFactory(
        workCard.title,
        workCard.workType,
        duration,
        workCard.logoPath
      );
      $("#workCardBox").append(newCard);
    });
  });

  fetchStudyCards().then((studyExperiences) => {
    studyExperiences.forEach((studyCard) => {
      let duration = parseCardDate(
        new Date(studyCard.startDate),
        new Date(studyCard.endDate)
      );
      let newCard = cardFactory(
        studyCard.title,
        studyCard.studyType,
        duration,
        studyCard.logoPath
      );
      $("#studyCardBox").append(newCard);
    });
  });
});
