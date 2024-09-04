"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cells = document.querySelectorAll(".cell");
var messageElement = document.getElementById("message");
var resetBtn = document.getElementById("resetBtn");
var currentPlayer = "X";
var gameActive = true;
var boardState = ["", "", "", "", "", "", "", "", ""];
var winningConditions = [[0, 1, 2], // Horizontal
[3, 4, 5], // Horizontal
[6, 7, 8], // Horizontal
[0, 3, 6], // Vertical
[1, 4, 7], // Vertical
[2, 5, 8], // Vertical
[0, 4, 8], // Diagonal
[2, 4, 6] // Diagonal
];

function checkWinner() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = winningConditions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var condition = _step.value;

      var _condition = _slicedToArray(condition, 3),
          a = _condition[0],
          b = _condition[1],
          c = _condition[2];

      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        messageElement.textContent = "".concat(currentPlayer, " Wins!");
        gameActive = false;
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
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
  var cell = e.target;
  var index = cell.getAttribute("data-index");
  if (boardState[index] !== "" || !gameActive) return;
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  messageElement.textContent = "Player ".concat(currentPlayer, "'s turn");
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  messageElement.textContent = "Player ".concat(currentPlayer, "'s turn");
  cells.forEach(function (cell) {
    cell.textContent = "";
  });
}

cells.forEach(function (cell) {
  cell.addEventListener("click", handleCellClick);
});
resetBtn.addEventListener("click", resetGame);
messageElement.textContent = "Player ".concat(currentPlayer, "'s turn");
//# sourceMappingURL=script.dev.js.map
