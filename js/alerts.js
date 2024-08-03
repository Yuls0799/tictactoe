document.getElementById('alertButton').addEventListener('click', function() {
  fetch('alerts.html')
    .then(response => response.text())
    .then(data => {
      // Asume que `alerts.html` contiene el contenido que deseas mostrar en el diálogo
      const dialog = document.getElementById('ShowAgainDialog');
      dialog.innerHTML = data + '<button onclick="closeDialog()">Cerrar</button>';
      ShowAgainDialog(true);
    })
    .catch(error => console.error('Error loading alerts.html:', error));
});

const ShowAgainDialog = (show) => {
  const dialog = document.getElementById('ShowAgainDialog');
  if (show) {
    dialog.showModal();
  } else {
    dialog.close();
  }
}

const closeDialog = () => {
  ShowAgainDialog(false);
}

 
 
 
 
 
 
 
 
 /* manejar las alertas
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
  });*/