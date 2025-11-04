const choices = document.querySelectorAll(".choice");
const resultDiv = document.getElementById("result");
const userScoreSpan = document.getElementById("userScore");
const computerScoreSpan = document.getElementById("computerScore");

let userScore = 0;
let computerScore = 0;

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    // Display the result
    let alertMessage;
    if (result === "You win!") {
      alertMessage = `You chose: ${userChoice}, Computer chose: ${computerChoice}. ${result}`;
    } else {
      alertMessage = `You chose: ${userChoice}, Computer chose: ${computerChoice}. ${result}`;
    }
    resultDiv.textContent = alertMessage;
    updateScore(result);
  });
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(user, computer) {
  if (user === computer) {
    return "It's a tie!";
  } else if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    return "You win!";
  } else {
    return "You lose!";
  }
}

function updateScore(result) {
  if (result === "You win!") {
    userScore++;
  } else if (result === "You lose!") {
    computerScore++;
  }
  userScoreSpan.textContent = userScore;
  computerScoreSpan.textContent = computerScore;
}
