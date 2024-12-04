const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const btnDicas = document.querySelector(".btnDicas");

// Toast para exibir a dica
const toast = document.getElementById("toast");
const toast2 = document.getElementById("toast2");


const modalDica = document.getElementById('modalDica');
const modalDicaText = document.getElementById('modalDicaText');
const closeModal = document.querySelector('.close')

let currentIndex = 0;
let questionsCorrect = 0;
let questions = [];  // Agora as questões serão carregadas aqui
let dicaCounter =0;
let pontos = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";
  pontos = 0;
  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

// Função para exibir o toast com a mensagem
function showToast(message) {
  toast.textContent = message;  // Define o texto da dica
  toast.classList.add("show");   // Torna o toast visível

  // Esconde o toast após 3 segundos
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function showModalDica(message) {
  modalDicaText.textContent = message;  // Define o texto da dica no modal
  modalDica.style.display = "block";    // Torna o modal visível
}

// Função para fechar o modal
closeModal.onclick = function() {
  modalDica.style.display = "none";
}

// Fecha o modal quando o clique for fora da área do modal
window.onclick = function(event) {
  if (event.target === modalDica) {
    modalDica.style.display = "none";
  }
}

// Modificação no evento de clique para exibir a dica
btnDicas.addEventListener("click", () => {
  // Verifica se temos mais dicas para mostrar
  if (dicaCounter < 3) {
    const dica = questions[currentIndex].dicas[`dica${dicaCounter + 1}`]; // Pega a dica com base no contador
    showModalDica(dica);  // Exibe a dica no modal
    dicaCounter++; // Incrementa o contador para a próxima dica
  } else {
    dicaCounter = 0;
    const dica = questions[currentIndex].dicas[`dica${dicaCounter + 1}`];
    showModalDica(dica); // Exibe a dica no modal
  }});

function nextQuestion() {

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

// Função para carregar a questão anterior
function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
    
  }
}

function corretorQuestão(e){
  const correct = e.target.getAttribute("data-correct") === "true";
  const falso = e.target.getAttribute("data-correct") === "false";
  document.querySelectorAll(".answer").forEach(item => {
    item.classList.remove("correct-answer", "incorrect-answer");
  });


  if (correct) {
    e.target.classList.add("correct-aswer");
    questionsCorrect++;
    pontos += 1;
    showToast("Excelente! Você está no caminho certo. Continue assim! ");
  }
  else if (falso) {
    e.target.classList.add("incorrect-aswer")
    showToast("Interessante! Parece que há algo que pode ser ajustado na sua resposta. Que tal revisar novamente e tentar uma abordagem diferente? Tente pedir uma dica");
  }
}


// Função para enviar a pontuação ao PHP
async function enviarPontuacao(pontos) {
  try {
    const response = await fetch('verificar_conquista.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pontos: pontos })
    });

    const data = await response.json();

    // Exibe a conquista se houver
    showToast(`Parabéns! Você conseguiu finalizar o nosso quiz de Programação Básica`);

  } catch (error) {
    console.error('Erro ao enviar pontuação:', error);
  }
}

// Função para exibir a tela de finalização
function finish() {
  // Exibe a pontuação final
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}.`;

  // Envia a pontuação para o servidor
  enviarPontuacao(pontos);

  content.style.display = "none";
  contentFinish.style.display = "flex";
  dicaCounter = 0
}

// Função para carregar a questão atual
function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
    `;

    answers.appendChild(div);
  });

  // Adiciona o evento de clique para as opções de resposta
  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", corretorQuestão);
  });
}

// Função para obter as questões via requisição HTTP
async function obterQuestoes() {
  try {
    // Faz a requisição HTTP para o script PHP
    const response = await fetch('lista_questoes_pro.php'); // Substitua pelo caminho correto

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error('Falha na requisição');
    }

    // Converte a resposta JSON
    const questoes = await response.json();

    // Define a variável questions com as questões recebidas
    questions = questoes;

    // Chama a função para carregar a primeira questão
    loadQuestion();

  } catch (error) {
    console.error('Erro ao carregar questões:', error);
  }
}

// Chama a função para obter as questões ao carregar a página
obterQuestoes();

btnPrev.addEventListener("click", prevQuestion);
btnNext.addEventListener("click", nextQuestion);
