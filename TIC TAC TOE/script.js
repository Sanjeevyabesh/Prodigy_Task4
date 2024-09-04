const cells = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], // Horizontal
  [3, 4, 5], // Horizontal
  [6, 7, 8], // Horizontal
  [0, 3, 6], // Vertical
  [1, 4, 7], // Vertical
  [2, 5, 8], // Vertical
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      messageElement.textContent = `${currentPlayer} Wins!`;
      gameActive = false;
      return true;
    }
  }

  if (!boardState.includes("")) {
    messageElement.textContent = "It's a Tie!";
    gameActive = false;
    return true;
  }

  return false;
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (boardState[index] !== "" || !gameActive) return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  messageElement.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = "";
  });
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);

messageElement.textContent = `Player ${currentPlayer}'s turn`;
