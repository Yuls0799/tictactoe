document.getElementById('player-vs-cpu').addEventListener('click', function() {
    document.getElementById('name-form').classList.remove('hidden');
    document.getElementById('player2-name').classList.add('hidden');
});

document.getElementById('player-vs-player').addEventListener('click', function() {
    document.getElementById('name-form').classList.remove('hidden');
    document.getElementById('player2-name').classList.remove('hidden');
});

document.getElementById('name-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Lógica para iniciar el juego con los nombres proporcionados
    const player1Name = document.getElementById('player1-name').value;
    const player2Name = document.getElementById('player2-name').value || 'CPU';
    alert(`Juego iniciado: ${player1Name} vs ${player2Name}`);
    // Aquí puedes redirigir a la página del juego o iniciar el juego directamente
});
