 // manejar las alertas
 document.getElementById('nextRound').addEventListener('click', function() {
    document.getElementById('victoryAlert').style.display = 'none';
    // Para iniciar el próximo round
  });

  document.getElementById('exitGame').addEventListener('click', function() {
    document.getElementById('exitConfirm').style.display = 'flex';
  });

  document.getElementById('confirmExit').addEventListener('click', function() {
    window.location.href = 'exit-url'; // URL para salir o redirigir
  });

  document.getElementById('cancelExit').addEventListener('click', function() {
    document.getElementById('exitConfirm').style.display = 'none';
  });

  document.getElementById('nextRoundLoser').addEventListener('click', function() {
    document.getElementById('loserAlert').style.display = 'none';
    // Para iniciar el próximo round
  });

  document.getElementById('exitGameLoser').addEventListener('click', function() {
    document.getElementById('exitConfirm').style.display = 'flex';
  });