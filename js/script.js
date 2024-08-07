document.getElementById('player-vs-cpu').addEventListener('click', function() {
    showNameEntry(false);
    localStorage.setItem('isCpu', true);
});

document.getElementById('player-vs-player').addEventListener('click', function() {
    showNameEntry(true);
    localStorage.setItem('isCpu', false);
});

document.getElementById('name-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value || 'CPU';

    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player2Name', player2Name);

    alert(`Juego iniciado: ${player1Name} vs ${player2Name}`);
    
    window.location.href = 'tictac.html';
});

function showNameEntry(showPlayer2) {
    document.getElementById('button-container').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');
    if (showPlayer2) {
        document.getElementById('player2-name').classList.remove('hidden');
    } else {
        document.getElementById('player2-name').classList.add('hidden');
    }
}
