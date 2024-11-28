// Select necessary elements
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X"; // X goes first
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Empty board
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell clicks
cells.forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

// Handle cell click
function handleCellClick(cell) {
  const index = cell.getAttribute("data-index");

  if (gameBoard[index] === "" && isGameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if (checkWinner()) {
      status.textContent = `${currentPlayer} wins!`;
      isGameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    status.textContent = `${currentPlayer}'s turn`;
  }
}

// Check for winner
function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  if (!gameBoard.includes("")) {
    status.textContent = "It's a tie!";
    isGameActive = false;
  }
  return false;
}

// Restart the game
restartBtn.addEventListener("click", restartGame);

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  status.textContent = `${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = "";
  });
}
