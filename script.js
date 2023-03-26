const bingoBoard = document.getElementById("bingo-board");
const restartButton = document.getElementById("restart-button");
const bingoButton = document.getElementById("bingo-button");
const lineButton = document.getElementById("line-button");
const numberInput = document.getElementById("number-input");
const submitNumberButton = document.getElementById("submit-number-button");
const bingoOrLine = document.getElementById("bingoOrLine");
const inputs = document.getElementById("inputs");
const buttons = document.getElementById("buttons");
const backButton = document.getElementById("back-button");
const bingoImage = document.getElementById("img-bingo");
const lineImage = document.getElementById("img-line");
const confirm = document.getElementById("confirm");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const rows = 6;
const cols = 15;

window.addEventListener("load", startGame);
restartButton.addEventListener("click", confirmRestart);
bingoButton.addEventListener("click", bingo);
lineButton.addEventListener("click", line);
backButton.addEventListener("click", swithToTable);
noButton.addEventListener("click", notRestart);

yesButton.addEventListener("click", () => {
  localStorage.removeItem("cellsStatus");
  startGame();
});

numberInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    submitNumberButton.click();
  }
});

submitNumberButton.addEventListener("click", () => {
  if (numberInput.value.length == 0) return

  let number = parseInt(numberInput.value);
  if (number >= 1 && number <= rows*cols) {
    let found = false;
    bingoBoard.querySelectorAll(".bingo-cell").forEach(cell => {
      if (cell.innerHTML == number) {
        cell.classList.toggle("marked");
        found = cell.classList.contains("marked");
      }
    });
    saveCellsStatus();
    if (!found) {
      alert("El nombre " + number + " ja estava marcat i ha estat esborrat.");
    }
  }
  else alert("Nombre incorrecte!");
  numberInput.value = "";
});

function startGame() {
  bingoOrLine.style.display = "none";
  confirm.style.display = "none";

  createBingoBoard();
  loadCellsStatus();

  inputs.style.display = "flex";
  numberInput.focus();
  buttons.style.display = "flex";
}

function confirmRestart() {
  confirm.style.display = "flex";
  buttons.style.display = "none";
}

function notRestart() {
  confirm.style.display = "none";
  buttons.style.display = "flex";
}

function bingo() {
    switchToImage();
    bingoImage.style.display = "block";
    lineImage.style.display = "none";
}

function line() {
    switchToImage();
    lineImage.style.display = "block";
    bingoImage.style.display = "none";
}

function switchToImage() {
    bingoOrLine.style.display = "block";
    bingoBoard.style.display = "none";
    inputs.style.display = "none";
    buttons.style.display = "none";
}

function swithToTable() {
    bingoOrLine.style.display = "none";
    bingoBoard.style.display = "table";
    inputs.style.display = "flex";
    buttons.style.display = "flex";
}

function saveCellsStatus() {
  const cellsStatus = Array.from(bingoBoard.querySelectorAll(".bingo-cell")).map(cell => cell.classList.contains("marked"));
  localStorage.setItem("cellsStatus", JSON.stringify(cellsStatus));
}

function loadCellsStatus() {
  const cellsStatus = JSON.parse(localStorage.getItem("cellsStatus"));
  if (cellsStatus) {
    const cells = bingoBoard.querySelectorAll(".bingo-cell");
    cellsStatus.forEach((marked, index) => {
      if (marked) {
        cells[index].classList.add("marked");
      } else {
        cells[index].classList.remove("marked");
      }
    });
  }
}

function createBingoBoard() {
  bingoBoard.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.classList.add("bingo-cell");
      cell.textContent = i*cols + j + 1;
      cell.addEventListener("click", () => {
        cell.classList.toggle("marked");
        saveCellsStatus();
      });
      row.appendChild(cell);
    }

    bingoBoard.appendChild(row);
  }
}