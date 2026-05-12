const GAME_COUNT = 5;
const NUMBERS_PER_GAME = 6;
const MAX_NUMBER = 45;
const THEME_STORAGE_KEY = "lotto-theme";
const HISTORY_STORAGE_KEY = "lotto-history";
const MAX_HISTORY_COUNT = 10;

const generateButton = document.getElementById("generate-btn");
const lottoContainer = document.getElementById("lotto-container");
const historyList = document.getElementById("history-list");
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

function createGames() {
    return Array.from({ length: GAME_COUNT }, () => generateGame());
}

function renderGames(games) {
    lottoContainer.replaceChildren();

    games.forEach((numbers, index) => {
        lottoContainer.appendChild(createGameRow(numbers, index));
    });
}

function loadHistory() {
    try {
        const history = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
        return Array.isArray(history) ? history.slice(0, MAX_HISTORY_COUNT) : [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY_COUNT)));
}

function formatSavedTime(isoDate) {
    return new Intl.DateTimeFormat("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(new Date(isoDate));
}

function createHistoryItem(record) {
    const item = document.createElement("article");
    item.className = "history-item";

    const time = document.createElement("time");
    time.className = "history-time";
    time.dateTime = record.createdAt;
    time.textContent = formatSavedTime(record.createdAt);
    item.appendChild(time);

    const gamesWrap = document.createElement("div");
    gamesWrap.className = "history-games";

    record.games.forEach((numbers, index) => {
        const game = document.createElement("div");
        game.className = "history-game";

        const label = document.createElement("span");
        label.className = "history-game-label";
        label.textContent = `${index + 1}게임`;
        game.appendChild(label);

        numbers.forEach((number) => {
            const numberBall = document.createElement("span");
            numberBall.className = `history-number ${getBallColorClass(number)}`;
            numberBall.textContent = number;
            game.appendChild(numberBall);
        });

        gamesWrap.appendChild(game);
    });

    item.appendChild(gamesWrap);
    return item;
}

function renderHistory() {
    const history = loadHistory();
    historyList.replaceChildren();

    if (history.length === 0) {
        const empty = document.createElement("p");
        empty.className = "history-empty";
        empty.textContent = "아직 저장된 기록이 없습니다.";
        historyList.appendChild(empty);
        return;
    }

    history.forEach((record) => {
        historyList.appendChild(createHistoryItem(record));
    });
}

function addHistory(games) {
    const history = loadHistory();
    history.unshift({
        createdAt: new Date().toISOString(),
        games
    });

    saveHistory(history);
    renderHistory();
}

function handleGenerateClick() {
    const games = createGames();
    renderGames(games);
    addHistory(games);
}

generateButton.addEventListener("click", handleGenerateClick);
themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
});

applyTheme(getPreferredTheme());
renderHistory();
