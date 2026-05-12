const GAME_COUNT = 5;
const NUMBERS_PER_GAME = 6;
const MAX_NUMBER = 45;
const THEME_STORAGE_KEY = "lotto-theme";

const generateButton = document.getElementById("generate-btn");
const lottoContainer = document.getElementById("lotto-container");
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const themeIcon = document.querySelector(".theme-icon");

function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const isDark = theme === "dark";
    themeLabel.textContent = isDark ? "다크모드" : "화이트모드";
    themeIcon.textContent = isDark ? "☾" : "☀";
    themeToggle.setAttribute("aria-label", isDark ? "화이트모드로 변경" : "다크모드로 변경");
}

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
themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
});

applyTheme(getPreferredTheme());
