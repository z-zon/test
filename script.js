const GAME_COUNT = 5;
const NUMBERS_PER_GAME = 6;
const MAX_NUMBER = 45;

const generateButton = document.getElementById("generate-btn");
const lottoContainer = document.getElementById("lotto-container");

function generateGame() {
    const numbers = new Set();

    while (numbers.size < NUMBERS_PER_GAME) {
        numbers.add(Math.floor(Math.random() * MAX_NUMBER) + 1);
    }

    return [...numbers].sort((a, b) => a - b);
}

function getBallColorClass(number) {
    if (number <= 10) return "yellow";
    if (number <= 20) return "blue";
    if (number <= 30) return "red";
    if (number <= 40) return "gray";
    return "green";
}

function createBall(number) {
    const ball = document.createElement("span");
    ball.className = `ball ${getBallColorClass(number)}`;
    ball.textContent = number;
    return ball;
}

function createGameRow(numbers, index) {
    const row = document.createElement("div");
    row.className = "game-row";

    const label = document.createElement("span");
    label.className = "game-label";
    label.textContent = `${index + 1}게임`;
    row.appendChild(label);

    numbers.forEach((number) => {
        row.appendChild(createBall(number));
    });

    return row;
}

function renderGames() {
    lottoContainer.replaceChildren();

    for (let i = 0; i < GAME_COUNT; i += 1) {
        lottoContainer.appendChild(createGameRow(generateGame(), i));
    }
}

generateButton.addEventListener("click", renderGames);
