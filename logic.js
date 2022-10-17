const box = document.querySelectorAll(".box");
const board = document.querySelector(".board");
const msg_txt = document.querySelector(".winning-msg");
const reset = document.querySelector(".reset");
const boxes = [...box];
const pO = "O";
const pX = "X";
let currentPlayer = pX;
let empty = Array(9).fill(null);

const gameStart = () => {
  setTimeout(() => {
    msg_txt.innerText = "Player X turn";
  }, 1000);

  setTimeout(() => {
    msg_txt.innerText = "";
  }, 2500);

  boxes.forEach((box) => {
    box.addEventListener("click", choosenBox);
  });
};

const gameStop = () => {
  boxes.forEach((box) => {
    box.removeEventListener("click", choosenBox);
  });
};

reset.addEventListener("click", resetGame);

function resetGame() {
  boxes.forEach((box) => {
    box.innerHTML = "";
  });
  empty = Array(9).fill(null);
  msg_txt.innerText = "";
  currentPlayer = pX;
  gameStart();
}

function choosenBox(e) {
  const id = e.target.id;
  if (!empty[id]) {
    empty[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;
    if (playerWon()) {
      msg_txt.innerText = `${currentPlayer} has won the game!`;
      gameStop();
    } else if (playerWon() === false && !empty.includes(null)) {
      msg_txt.innerText = `It's a draw`;
    }
  }
  if (currentPlayer === pX) {
    currentPlayer = pO;
  } else {
    currentPlayer = pX;
  }
}

const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerWon() {
  for (const combo of winCombination) {
    let [a, b, c] = combo;
    if (empty[a] && empty[a] === empty[b] && empty[a] === empty[c]) {
      return true;
    }
  }
  return false;
}

gameStart();
