const workCards = [
  {
    title: "Brasa",
    type: "Hackathon",
    duration: "Abr de 2022 - abr de 2022",
    logo: "./assets/brasaHacksLogo.png",
  },
  {
    title: "Descomplica",
    type: "Meio período",
    duration: "Abr de 2021 - jan de 2022",
    logo: "./assets/descoLogo.jpg",
  },
  {
    title: "IABC - Instituto Adventista Brasil Central",
    type: "Freelance Cybersecurity",
    duration: "Mar de 2020 - dez de 2020",
    logo: "./assets/iabcLogo.png",
  },
  {
    title: "IABC - Instituto Adventista Brasil Central",
    type: "Marketing",
    duration: "Fev de 2019 - dez de 2020",
    logo: "./assets/iabcLogo.png",
  },
];

const studyCards = [
  {
    title: "Inteli",
    type: "Computer Science",
    duration: "Fev de 2022 - Fev de 2025",
    logo: "./assets/inteliLogo.jpg",
  },
  {
    title: "IABC",
    type: "High School",
    duration: "Fev de 2018 - fev de 2020",
    logo: "./assets/iabcLogo.png",
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

// Appends a new card in the "Work" section
$(document).ready(function () {
  workCards.forEach((workCard) => {
    let newCard = cardFactory(
      workCard.title,
      workCard.type,
      workCard.duration,
      workCard.logo
    );
    $("#workCardBox").append(newCard);
  });

  // Appends a new card in the "Study" section
  studyCards.forEach((studyCard) => {
    let newCard = cardFactory(
      studyCard.title,
      studyCard.type,
      studyCard.duration,
      studyCard.logo
    );
    $("#studyCardBox").append(newCard);
  });
});
