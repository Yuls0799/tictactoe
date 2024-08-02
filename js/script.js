document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading");
    const gameScreen = document.getElementById("game");
    const playerOptions = document.getElementById("player-options");
    const playerNames = document.getElementById("player-names");
    const ticTacToe = document.getElementById("tic-tac-toe");
    const vsPlayerButton = document.getElementById("vsPlayer");
    const vsAIButton = document.getElementById("vsAI");
    const startGameButton = document.getElementById("start-game");
    const p1nameInput = document.getElementById("player1-name");
    const p2nameInput = document.getElementById("player2-name");
    const cells = document.querySelectorAll("[data-cell]");
    const resetButton = document.getElementById("reset");
    const p1scoreElement = document.getElementById("player1-score");
    const p2scoreElement = document.getElementById("player2-score");
    const canvas = document.getElementById('canvas');
    const contexto = canvas.getContext('2d');
    
    let p1name = "";
    let p2name = "";
    let p1score = 0;
    let p2score = 0;
    let isPlayer1Turn = true;
    let movesCount = 0;
    let vsAI = false;

    setTimeout(() => {
        loadingScreen.style.display = "none";
        gameScreen.style.display = "block";
    }, 1000);

    vsPlayerButton.addEventListener("click", () => {
        vsAI = false;
        playerOptions.style.display = "none";
        playerNames.style.display = "block";
        p2nameInput.style.display = "inline-block";
    });

    vsAIButton.addEventListener("click", () => {
        vsAI = true;
        playerOptions.style.display = "none";
        playerNames.style.display = "block";
        p2nameInput.style.display = "none";
    });

    startGameButton.addEventListener("click", () => {
        p1name = p1nameInput.value;
        p2name = vsAI ? "Máquina" : p2nameInput.value;
        localStorage.setItem("p1name", p1name);
        localStorage.setItem("p2name", p2name);
        playerNames.style.display = "none";
        ticTacToe.style.display = "block";
        updateScoreboard();
    });

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    resetButton.addEventListener("click", resetGame);

    function handleCellClick(e) {
        const cell = e.target;
        if (cell.textContent || movesCount >= 9) return;
        cell.textContent = isPlayer1Turn ? "X" : "O";
        movesCount++;
        if (checkWin()) {
            if (isPlayer1Turn) {
                p1score++;
                localStorage.setItem("p1score", p1score);
            } else {
                p2score++;
                localStorage.setItem("p2score", p2score);
            }
            updateScoreboard();
            resetBoard();
        } else if (movesCount === 9) {
            resetBoard();
        }
        isPlayer1Turn = !isPlayer1Turn;
        if (vsAI && !isPlayer1Turn) {
            aiMove();
        }
    }

    function aiMove() {
        const emptyCells = [...cells].filter(cell => !cell.textContent);
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = "O";
        movesCount++;
        if (checkWin()) {
            p2score++;
            localStorage.setItem("p2score", p2score);
            updateScoreboard();
            resetBoard();
        } else if (movesCount === 9) {
            resetBoard();
        }
        isPlayer1Turn = true;
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return cells[index].textContent && cells[index].textContent === cells[pattern[0]].textContent;
            });
        });
    }

    function resetBoard() {
        cells.forEach(cell => cell.textContent = "");
        movesCount = 0;
    }

    function resetGame() {
        resetBoard();
        p1score = 0;
        p2score = 0;
        localStorage.setItem("p1score", p1score);
        localStorage.setItem("p2score", p2score);
        updateScoreboard();
    }

    function updateScoreboard() {
        p1scoreElement.textContent = localStorage.getItem("p1score") || 0;
        p2scoreElement.textContent = localStorage.getItem("p2score") || 0;

        if (p1score >= 5 || p2score >= 5) {
            let winner = p1score >= 5 ? p1name : p2name;
            let loser = p1score >= 5 ? p2name : p1name;
            alert(`${winner} ha ganado con 5 puntos! ${loser} ha perdido.`);
            resetGame();
        }
    }
});
