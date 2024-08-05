document.addEventListener('DOMContentLoaded', function() {
    const buttonOrange = document.getElementById('button-orange');
    const restartButton = document.getElementById('restart-button');
    const homeButton = document.getElementById('home-button');
    const returnButton = document.querySelector('.button-container-blue');
    const resultModal = document.getElementById('result-modal');
    const resultMessage = document.getElementById('result-message');
    const player1Wins = document.getElementById('player1-wins');
    const player2Wins = document.getElementById('player2-wins');
    const draws = document.getElementById('draws');
    const gameStatus = document.getElementById('game-status');
    const player1ShortName = document.getElementById('player1-shortname');
    const player2ShortName = document.getElementById('player2-shortname');

    const isCpu = localStorage.getItem('isCpu') === 'true';

    if (buttonOrange) {
        buttonOrange.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    } else {
        console.error('No se encontró el elemento con id "button-orange".');
    }

    if (returnButton) {
        returnButton.addEventListener('click', function() {
            showResultModal('¿Seguro que desea reiniciar la partida?');
        });
    } else {
        console.error('No se encontró el elemento con clase "button-container-blue".');
    }

    class Matrix {
        constructor() {
            this.board = Array.from(Array(3), () => Array(3).fill(null));
        }

        check(name, player) {
            const [row, col] = name.split('').map(Number);
            this.board[row][col] = player;
            return this.checkVictory(player);
        }

        checkVictory(player) {
            for (let i = 0; i < 3; i++) {
                if (this.board[i].every(cell => cell === player)) {
                    return { player: player, type: 'linea', index: i };
                }
                if (this.board.map(row => row[i]).every(cell => cell === player)) {
                    return { player: player, type: 'columna', index: i };
                }
            }
            if (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) {
                return { player: player, type: 'diagonal', index: 0 };
            }
            if (this.board[0][2] === player && this.board[1][1] === player && this.board[2][0] === player) {
                return { player: player, type: 'diagonal', index: 1 };
            }
            return false;
        }
    }

    class Player {
        constructor() {
            this.turn = 1;
            this.round = 0;
            this.names = [localStorage.getItem('player1Name') || 'Player 1', localStorage.getItem('player2Name') || 'Player 2'];
            player1ShortName.textContent = this.names[0][0].toUpperCase();
            player2ShortName.textContent = this.names[1][0].toUpperCase();
        }

        getTurn() {
            return this.turn;
        }

        play() {
            this.round++;
            this.turn = this.turn === 1 ? 2 : 1;
        }

        getName() {
            return this.names[this.turn - 1];
        }
    }

    const matrix = new Matrix();
    const player = new Player();
    const boxes = document.querySelectorAll('input');

    function updateStatus(message) {
        gameStatus.textContent = message;
    }

    function updateScore(player) {
        if (player === 1) {
            player1Wins.textContent = parseInt(player1Wins.textContent) + 1 + " GANADAS";
        } else if (player === 2) {
            player2Wins.textContent = parseInt(player2Wins.textContent) + 1 + " GANADAS";
        } else {
            draws.textContent = parseInt(draws.textContent) + 1 + " EMPATES";
        }
    }

    function showResultModal(message) {
        resultMessage.textContent = message;
        updateModalStats();
        resultModal.classList.remove('hidden');
    }

    function updateModalStats() {
        document.getElementById('modal-player1-shortname').textContent = player1ShortName.textContent;
        document.getElementById('modal-player2-shortname').textContent = player2ShortName.textContent;
        document.getElementById('modal-player1-wins').textContent = player1Wins.textContent;
        document.getElementById('modal-player2-wins').textContent = player2Wins.textContent;
        document.getElementById('modal-draws').textContent = draws.textContent;
    }

    function cpuMove() {
        const emptyBoxes = Array.from(boxes).filter(box => !box.checked);
        if (emptyBoxes.length > 0) {
            const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            randomBox.checked = true;
            randomBox.classList.add("p2");
            randomBox.disabled = true;
            const result = matrix.check(randomBox.name, 2);
            if (result) {
                updateStatus(`${player.names[1]} gana en un ${result.type} en el índice ${result.index}!`);
                updateScore(2);
                showResultModal(`${player.names[1]}`);
            } else if (player.round === 9) {
                updateStatus('Es un empate');
                updateScore(null);
                showResultModal('Es un empate');
            } else {
                player.play();
                updateStatus(`Es el turno de ${player.getName()}`);
            }
        }
    }

    boxes.forEach(box => {
        box.addEventListener('click', function() {
            if (this.disabled) return;

            const result = matrix.check(this.name, player.getTurn());
            this.classList.add("p" + player.getTurn());

            if (result) {
                boxes.forEach(b => b.disabled = true);
                updateStatus(`${player.getName()} gana en un ${result.type} en el índice ${result.index}!`);
                updateScore(result.player);
                showResultModal(`${player.getName()}`);
                return;
            }

            this.disabled = true;
            player.play();
            updateStatus(`Es el turno de ${player.getName()}`);

            if (player.round === 9) {
                updateStatus('Es un empate');
                updateScore(null);
                showResultModal('Es un empate');
            } else if (isCpu && player.getTurn() === 2) {
                setTimeout(cpuMove, 500);  // Espera medio segundo antes de que el CPU haga su movimiento
            }
        });
    });

    restartButton.addEventListener('click', function() {
        boxes.forEach(box => {
            box.disabled = false;
            box.checked = false;
            box.classList.remove('p1', 'p2');
        });
        matrix.board = Array.from(Array(3), () => Array(3).fill(null));
        player.turn = 1;
        player.round = 0;
        updateStatus(`Es el turno de ${player.getName()}`);
        resultModal.classList.add('hidden');
    });

    homeButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    updateStatus(`Es el turno de ${player.getName()}`);
});
