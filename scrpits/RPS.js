let randomNumber,
  cMove = "";

function pickCMove() {
  randomNumber = Math.random();
  if (randomNumber > 0 && randomNumber <= 1 / 3) {
    cMove = "rock";
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    cMove = "paper";
  } else {
    cMove = "scissor";
  }
  return cMove;
}

let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
  score = {
    win: 0,
    lose: 0,
    tie: 0,
  };
}

function updateScoreElement() {
  document.querySelector(".score").innerHTML = `
        Total Wins: ${score.win}, Total Losses: ${score.lose}, Total Ties: ${score.tie}`;
}

updateScoreElement();

function playGame(playerMove) {
  let result = "";
  let cMove = pickCMove();

  document.querySelector(
    ".moves"
  ).innerHTML = `You <img class="n" src="images/${playerMove}.png" alt="" />                  
    <img class="rockimg"  src="images/${cMove}.png" alt="" /> Computer `;

  if (cMove === "paper") {
    if (playerMove === "paper") {
      result = "TIE";
      score.tie++;
    } else if (playerMove === "rock") {
      result = "LOSE";
      score.lose++;
    } else {
      result = "WIN";
      score.win++;
    }
  }

  if (cMove === "rock") {
    if (playerMove === "paper") {
      result = "WIN";
      score.win++;
    } else if (playerMove === "rock") {
      result = "TIE";
      score.tie++;
    } else {
      result = "LOSE";
      score.lose++;
    }
  }

  if (cMove === "scissor") {
    if (playerMove === "paper") {
      result = "LOSE";
      score.lose++;
    } else if (playerMove === "rock") {
      result = "WIN";
      score.win++;
    } else {
      result = "TIE";
      score.tie++;
    }
  }

  document.querySelector(".res").innerHTML = `YOU ${result}!!!`;

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
}

function reset() {
  score.lose = 0;
  score.tie = 0;
  score.win = 0;
  localStorage.removeItem(score);
  updateScoreElement();
  document.querySelector(".moves").innerHTML = "";
  document.querySelector(".res").innerHTML = "";
  alert("All scores reset to 0");
}

let isAutoPlay = false;
let id;
let autoPlayButton = document.querySelector(".autoPlay");

function autoPlay() {
  if (isAutoPlay === true) {
    clearInterval(id);
    autoPlayButton.innerHTML = "Auto Play";
    isAutoPlay = false;
  } else {
    id = setInterval(function () {
      isAutoPlay = true;
      const pMove = pickCMove();
      playGame(pMove);
      isAutoPlay = true;
      autoPlayButton.innerHTML = "Auto Playing";
    }, 1000);
  }
}

let body = document.querySelector(".body");
let rockButton = document.querySelector(".rock");
let paperButton = document.querySelector(".paper");
let scissorButton = document.querySelector(".scissor");

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissor");
  }
});

rockButton.addEventListener("click", () => {
  playGame("rock");
});

paperButton.addEventListener("click", () => {
  playGame("paper");
});

scissorButton.addEventListener("click", () => {
  playGame("scissor");
});
