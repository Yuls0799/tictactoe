document.addEventListener('DOMContentLoaded', () => {
    const playerVsCpuButton = document.getElementById('player-vs-cpu');
    const playerVsPlayerButton = document.getElementById('player-vs-player');
    const nameForm = document.getElementById('name-form');
    const player1NameInput = document.getElementById('player1-name');
    const player2NameInput = document.getElementById('player2-name');
    
    playerVsCpuButton.addEventListener('click', () => {
        player2NameInput.classList.add('hidden');
        nameForm.classList.remove('hidden');
    });

    playerVsPlayerButton.addEventListener('click', () => {
        player2NameInput.classList.remove('hidden');
        nameForm.classList.remove('hidden');
    });

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const player1Name = player1NameInput.value.trim();
        const player2Name = player2NameInput.value.trim() || 'CPU';

        localStorage.setItem('player1Name', player1Name);
        localStorage.setItem('player2Name', player2Name);

        window.location.href = 'game.html';
    });

    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const player1ScoreElement = document.getElementById('player1-score');
    const player2ScoreElement = document.getElementById('player2-score');

    let player1Score = parseInt(localStorage.getItem('player1Score')) || 0;
    let player2Score = parseInt(localStorage.getItem('player2Score')) || 0;
    let currentPlayer = 'X';
    let gameActive = true;
    let movesCount = 0;

    player1ScoreElement.textContent = `${localStorage.getItem('player1Name')}: ${player1Score}`;
    player2ScoreElement.textContent = `${localStorage.getItem('player2Name')}: ${player2Score}`;

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.textContent === '' && gameActive) {
                cell.textContent = currentPlayer;
                movesCount++;
                checkWinner();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        });
    });

    resetButton.addEventListener('click', resetGame);

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        winningCombinations.forEach(combination => {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                gameActive = false;
                updateScore(cells[a].textContent);
                setTimeout(resetGame, 1000);
            }
        });

        if (movesCount === 9 && gameActive) {
            gameActive = false;
            setTimeout(resetGame, 1000);
        }
    }

    function updateScore(winner) {
        if (winner === 'X') {
            player1Score++;
            player1ScoreElement.textContent = `${localStorage.getItem('player1Name')}: ${player1Score}`;
            localStorage.setItem('player1Score', player1Score);
        } else {
            player2Score++;
            player2ScoreElement.textContent = `${localStorage.getItem('player2Name')}: ${player2Score}`;
            localStorage.setItem('player2Score', player2Score);
        }
    }

    function resetGame() {
        cells.forEach(cell => cell.textContent = '');
        gameActive = true;
        movesCount = 0;
        currentPlayer = 'X';
    }
});
