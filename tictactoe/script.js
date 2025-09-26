// Scores persist across games
let scores = { X: 0, O: 0, Tie: 0 };

// Update scoreboard UI
function updateScoreboard(playerXName, playerOName) {
  document.getElementById("scoreX").textContent = `${playerXName}: ${scores.X}`;
  document.getElementById("scoreO").textContent = `${playerOName}: ${scores.O}`;
  document.getElementById("scoreTie").textContent = `Ties: ${scores.Tie}`;
}

// Show modal
function showModal() {
  document.getElementById("setup").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");
  document.getElementById("scoreboard").classList.add("hidden");
  document.getElementById("results").classList.add("hidden");

  document.getElementById("board").innerHTML = "";
  document.getElementById("status").textContent = "Click Start to Begin";
  document.getElementById("results").textContent = "Game Winner";
}

// Hide modal
function hideModal() {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("scoreboard").classList.remove("hidden");
  document.getElementById("results").classList.remove("hidden");
}

// Game board factory
function createBoard() {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  return {
    board,
    draw(handleClick) {
      const container = document.getElementById("board");
      container.innerHTML = "";

      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          let cellElement = document.createElement("div");
          cellElement.classList.add("cell");
          cellElement.textContent = cell;

          cellElement.addEventListener("click", () => {
            if (board[rowIndex][colIndex] === "") {
              handleClick(rowIndex, colIndex);
            }
          });

          container.appendChild(cellElement);
        });
      });
    }
  };
}

const board = createBoard();

// Game Controller
function gameController(playerXName, playerOName) {
  let currentPlayer = "X";
  let gameOver = false;

  function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner() {
    const b = board.board;

    for (let i = 0; i < 3; i++) {
      if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) {
        return { winner: b[i][0], cells: [[i,0],[i,1],[i,2]] };
      }
    }
    for (let i = 0; i < 3; i++) {
      if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) {
        return { winner: b[0][i], cells: [[0,i],[1,i],[2,i]] };
      }
    }
    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      return { winner: b[0][0], cells: [[0,0],[1,1],[2,2]] };
    }
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      return { winner: b[0][2], cells: [[0,2],[1,1],[2,0]] };
    }

    if (b.flat().every(cell => cell !== "")) return { winner: "Tie", cells: [] };
    return null;
  }

  function updateStatus(message) {
    document.getElementById("status").textContent = message;
  }

  function showResults(message) {
    document.getElementById("results").textContent = message;
  }

  function handleClick(row, col) {
    if (gameOver) return;

    board.board[row][col] = currentPlayer;
    const result = checkWinner();
    board.draw(handleClick);

    if (result) {
      gameOver = true;

      if (result.winner === "Tie") {
        updateStatus("Good Battle!!! ");
        showResults("Result: Tie Game!");
        scores.Tie++;
      } else {
        let winnerName = result.winner === "X" ? playerXName : playerOName;
        updateStatus("Good Game!!!");
        showResults(`Result: ${winnerName} is the winner!`);
        scores[result.winner]++;

        const container = document.getElementById("board");
        const cells = container.querySelectorAll(".cell");

        result.cells.forEach(([r, c]) => {
          let index = r * 3 + c;
          let cell = cells[index];
          if (result.winner === "X") {
            cell.classList.add("winner-x");
          } else {
            cell.classList.add("winner-o");
          }
        });
      }
      updateScoreboard(playerXName, playerOName);
    } else {
      switchPlayer();
      let currentName = currentPlayer === "X" ? playerXName : playerOName;
      updateStatus(`${currentName}'s Turn`);
    }
  }

  function resetGame() {
    board.board.forEach(row => row.fill(""));
    currentPlayer = "X";
    gameOver = false;

    document.querySelectorAll(".cell").forEach(cell => {
      cell.classList.remove("winner-x", "winner-o");
    });

    board.draw(handleClick);
    updateStatus(`${playerXName}'s Turn: Click Board to Start`);
    document.getElementById("results").textContent = "Winner of this Game";
  }

  document.getElementById("restart").addEventListener("click", resetGame);

  resetGame();
}

// New Game button
document.getElementById("newGame").addEventListener("click", () => {
  scores = { X: 0, O: 0, Tie: 0 };
  showModal();
});

// Start Game
document.getElementById("start").addEventListener("click", () => {
  const playerXName = document.getElementById("playerX").value || "Player X";
  const playerOName = document.getElementById("playerO").value || "Player O";

  hideModal();
  updateScoreboard(playerXName, playerOName);
  gameController(playerXName, playerOName);
});

// Initial
showModal();
