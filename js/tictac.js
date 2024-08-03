
document.addEventListener('DOMContentLoaded', function() {
    const buttonOrange = document.getElementById('button-orange');

    if (buttonOrange) {

        buttonOrange.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    } else {
        console.error('No se encontró el elemento con id "button-orange".');
    }
});



class Matrix {
    constructor() {
        this.board = Array.from(Array(3), () => Array(3).fill(null));
    }

    check(name, player) {
        const [row, col] = name.split('').map(Number);
        this.board[row][col] = player;

        // Checks for a winning condition
        return this.checkVictory(player);
    }

    checkVictory(player) {
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (this.board[i].every(cell => cell === player)) {
                return { player: player, type: 'line', index: i };
            }
            if (this.board.map(row => row[i]).every(cell => cell === player)) {
                return { player: player, type: 'column', index: i };
            }
        }
        // Check diagonals
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
    }

    getTurn() {
        return this.turn;
    }

    play() {
        this.round++;
        this.turn = this.turn === 1 ? 2 : 1;
    }
}

// Initialize the game
const matrix = new Matrix();
const player = new Player();
const boxes = document.querySelectorAll('input');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

function updateStatus(message) {
    gameStatus.textContent = message;
}

boxes.forEach(box => {
    box.addEventListener('click', function() {
        if (this.disabled) return;

        const result = matrix.check(this.name, player.getTurn());
        this.classList.add("p" + player.getTurn());

        if (result) {
            boxes.forEach(b => b.disabled = true);
            updateStatus(`Player ${result.player} wins on a ${result.type} at index ${result.index}!`);
            highlightVictory(result);
            resetButton.disabled = false;
            return;
        }

        this.disabled = true;
        player.play();
        updateStatus(player.round === 9 ? "It's a draw!" : `It's player ${player.getTurn()}'s turn`);
    });
});

function highlightVictory(result) {
    const { type, index } = result;
    let selector = '';

    if (type === 'line') {
        selector = `.line${index} .checkmark`;
    } else if (type === 'column') {
        selector = `.column${index} .checkmark`;
    } else if (type === 'diagonal') {
        if (index === 0) {
            selector = `.diagonal0 .checkmark`;
        } else {
            selector = `.diagonal1 .checkmark`;
        }
    }

    document.querySelectorAll(selector).forEach(el => {
        el.classList.add("victory");
    });
}

resetButton.addEventListener('click', function() {
    boxes.forEach(box => {
        box.checked = false;
        box.disabled = false;
        box.classList.remove('p1', 'p2', 'victory');
    });

    matrix = new Matrix();
    player = new Player();
    updateStatus("It's player 1's turn");
    this.disabled = true;
});


//* Redirección */
