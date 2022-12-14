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
const bingoText = document.getElementById("text-bingo");
const lineText = document.getElementById("text-line");
const confirm = document.getElementById("confirm");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");


window.addEventListener("load", startGame);
restartButton.addEventListener("click", confirmRestart);
bingoButton.addEventListener("click", bingo);
lineButton.addEventListener("click", line);
backButton.addEventListener("click", swithToTable);
yesButton.addEventListener("click", startGame);
noButton.addEventListener("click", notRestart);

bingoBoard.querySelectorAll(".bingo-cell").forEach(cell => {
  cell.addEventListener("click", () => {
    cell.classList.toggle("marked");
  });
});

numberInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    submitNumberButton.click();
  }
});

submitNumberButton.addEventListener("click", () => {
  if (numberInput.value.length == 0) return

  let number = parseInt(numberInput.value);
  if (number >= 1 && number <= 90) {
    let found = false;
    bingoBoard.querySelectorAll(".bingo-cell").forEach(cell => {
      if (cell.innerHTML == number) {
        cell.classList.toggle("marked");
        found = cell.classList.contains("marked");
      }
    });
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
  buttons.style.display = "flex";

  let number = 1;
  bingoBoard.querySelectorAll(".bingo-cell").forEach(cell => {
    cell.innerHTML = number;
    cell.classList.remove("marked");
    number++;
  }); 
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
    bingoText.style.display = "block";
    lineText.style.display = "none";
}

function line() {
    switchToImage();
    lineText.style.display = "block";
    bingoText.style.display = "none";
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