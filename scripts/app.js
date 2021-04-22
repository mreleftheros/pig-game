let scores, activePlayer, currentScore, isPlaying = false;
const rollBtn = document.getElementById("btn-roll");
const holdBtn = document.getElementById("btn-hold");
const newBtn = document.getElementById("btn-new");
const diceElement = document.querySelector(".dice");

const resetUI = () => {
  document.querySelector(".player-score-0").textContent = scores[0];
  document.querySelector(".player-score-1").textContent = scores[1];
  document.querySelector(".current-score-0").textContent = currentScore;
  document.querySelector(".current-score-1").textContent = currentScore;
  document.getElementById("player-1").classList.remove("active");
  document.getElementById("player-2").classList.remove("active");
  diceElement.classList.add("hidden");
  document.getElementById("player-" + (activePlayer + 1)).classList.add("active");
};

const init = () => {
  currentScore = 0;
  scores = [0, 0];
  isPlaying = true;
  activePlayer = Math.floor(Math.random() * 2);
  resetUI();
};

const changeTurn = () => {
  currentScore = 0;
  document.querySelector(".current-score-" + activePlayer).textContent = currentScore;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.getElementById("player-1").classList.toggle("active");
  document.getElementById("player-2").classList.toggle("active");
};

window.addEventListener("DOMContentLoaded", () => {
  init();
});

rollBtn.addEventListener("click", () => {
  if (isPlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;
    diceElement.src = "assets/dice-" + dice + ".png";
    diceElement.classList.remove("hidden");
    
    if(dice !== 1) {
      currentScore += dice;
    } 
    else {
      changeTurn();
    }

    document.querySelector(".current-score-" + activePlayer).textContent = currentScore;
    }
});

holdBtn.addEventListener("click", () => {
  if(isPlaying) {
    let scoreElement = document.querySelector(".player-score-" + activePlayer);
    scores[activePlayer] += currentScore;

    if(scores[activePlayer] >= 100) {
      scoreElement.textContent = "Winner!";
      isPlaying = false;
    }
    else {
      scoreElement.textContent = scores[activePlayer];
      changeTurn();
    }
  }
});

newBtn.addEventListener("click", () => {
  if(isPlaying) {
    let newGame = confirm("Start New Game");
    if(newGame) init();
  } 
  else {
    init();
  }
})