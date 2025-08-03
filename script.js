const board = document.getElementById("board");
const resultDisplay = document.getElementById("result");
const scoreboard = document.getElementById("scoreboard");
let currentPlayer = "X";
let cells = Array(9).fill(null);
let scores = { X: 0, O: 0 };

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell", `cell-${i}`);
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] || checkWinner()) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.dataset.value = currentPlayer;

  if (checkWinner()) {
    resultDisplay.textContent = `${currentPlayer} Wins! 🎉`;
    scores[currentPlayer]++;
    updateScoreboard();
    return;
  }

  if (!cells.includes(null)) {
    resultDisplay.textContent = `It's a Draw!`;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    if (pattern.every(index => cells[index] === currentPlayer)) {
      pattern.forEach(index => {
        document.querySelector(`[data-index="${index}"]`)?.classList.add("winning");
      });
      return true;
    }
  }
  return false;
}

function resetGame() {
  currentPlayer = "X";
  cells.fill(null);
  resultDisplay.textContent = "";

  // 🔄 Remove winning highlight if present
  document.querySelectorAll(".cell.winning").forEach(cell => {
    cell.classList.remove("winning");
  });

  createBoard();
}

function updateScoreboard() {
  scoreboard.textContent = `X: ${scores.X} | O: ${scores.O}`;
}

createBoard();
