<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz lógica</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <main>

    <div class="modal" id="modalDica">
      <div class="modal-content">
        <span class="close"></span>
        <p id="modalDicaText"></p>
      </div>
    </div>

    <div class="content">
      <span class="spnQtd"></span>
      <span class="question"></span>
      <div class="answers"></div>
    </div>

    <div class="finish">
      <span></span>
      <button>Reiniciar</button>
    </div>

  </main>
  <div class="navigation">
    <button class="btn-prev">Voltar</button>
    <button class="btn-next">Próxima</button>
    <button class="btnDicas">Dicas</button> 
  </div>
  <!-- Toast para exibir as dicas -->
  <div id="toast" class="toast"></div>
  <div id="toast2" class="toast2"></div>
  <script src="script.js" type="module"></script>

  <div class="floating-image"></div>
</body>
</html>