/* =========================================================
   SustentaAgro – script.js
   Responsável pelo Quiz interativo e animações de scroll
   ========================================================= */

// =========================================================
// 1. BANCO DE PERGUNTAS
// =========================================================
const perguntas = [
  {
    texto: "Qual prática agrícola reduz o consumo de água em até 60% comparada à irrigação convencional?",
    opcoes: [
      "Irrigação por aspersão",
      "Irrigação por inundação",
      "Irrigação por gotejamento",
      "Irrigação por sulcos"
    ],
    correta: 2
  },
  {
    texto: "Qual percentual da água doce mundial é consumida pela agricultura?",
    opcoes: ["30%", "50%", "70%", "90%"],
    correta: 2
  },
  {
    texto: "O plantio direto é uma técnica que ajuda principalmente a:",
    opcoes: [
      "Aumentar o uso de defensivos químicos",
      "Preservar a estrutura e a vida no solo",
      "Eliminar pragas com maior eficiência",
      "Reduzir o tempo de colheita"
    ],
    correta: 1
  },
  {
    texto: "Os polinizadores como as abelhas são responsáveis por qual porcentagem da produção global de alimentos?",
    opcoes: ["10%", "20%", "35%", "50%"],
    correta: 2
  },
  {
    texto: "O que é rotação de culturas?",
    opcoes: [
      "Usar o mesmo tipo de cultura em todas as estações",
      "Alternar diferentes culturas na mesma área ao longo do tempo",
      "Cultivar apenas uma espécie por propriedade",
      "Trocar o solo de um campo para outro"
    ],
    correta: 1
  },
  {
    texto: "Qual fonte de energia renovável pode ser gerada a partir de dejetos animais na propriedade rural?",
    opcoes: [
      "Energia solar fotovoltaica",
      "Energia eólica",
      "Biogás",
      "Energia hidrelétrica"
    ],
    correta: 2
  },
  {
    texto: "As matas ciliares são vegetações localizadas:",
    opcoes: [
      "No topo de montanhas",
      "Nas margens de rios, lagos e nascentes",
      "Em áreas desérticas",
      "No interior de grandes pastagens"
    ],
    correta: 1
  },
  {
    texto: "O que é compostagem?",
    opcoes: [
      "Um tipo de adubo químico sintético",
      "A queima controlada de resíduos agrícolas",
      "A decomposição de matéria orgânica para gerar adubo natural",
      "O processo de irrigação subsuperficial"
    ],
    correta: 2
  },
  {
    texto: "Qual prática ajuda a combater a erosão do solo e o assoreamento dos rios?",
    opcoes: [
      "Desmatamento das encostas",
      "Plantio em curvas de nível",
      "Uso intensivo de máquinas pesadas",
      "Queimadas controladas"
    ],
    correta: 1
  },
  {
    texto: "O que significa o conceito de 'Reserva Legal' na legislação ambiental brasileira?",
    opcoes: [
      "Uma área de pastagem exclusiva para gado leiteiro",
      "Uma zona industrial próxima à propriedade rural",
      "Uma área de vegetação nativa que deve ser mantida pelo produtor rural",
      "Um registro público de produção orgânica"
    ],
    correta: 2
  }
];

// =========================================================
// 2. ESTADO DO QUIZ
// =========================================================
let indiceAtual   = 0;
let pontuacao     = 0;
let respondida    = false;

// =========================================================
// 3. SELETORES DO DOM
// =========================================================
const progressBar       = document.getElementById('progressBar');
const questionCounter   = document.getElementById('questionCounter');
const scoreDisplay      = document.getElementById('scoreDisplay');
const questionText      = document.getElementById('questionText');
const optionsContainer  = document.getElementById('optionsContainer');
const nextBtn           = document.getElementById('nextBtn');
const quizContent       = document.getElementById('quizContent');
const quizResult        = document.getElementById('quizResult');
const resultIcon        = document.getElementById('resultIcon');
const resultTitle       = document.getElementById('resultTitle');
const resultScore       = document.getElementById('resultScore');
const resultPercent     = document.getElementById('resultPercent');
const resultMsg         = document.getElementById('resultMsg');
const restartBtn        = document.getElementById('restartBtn');

// =========================================================
// 4. FUNÇÕES DO QUIZ
// =========================================================

/**
 * Renderiza a pergunta atual e suas opções na tela.
 */
function renderizarPergunta() {
  respondida = false;
  nextBtn.disabled = true;

  const pergunta = perguntas[indiceAtual];
  const letras   = ['A', 'B', 'C', 'D'];

  // Atualiza progresso
  const progresso = ((indiceAtual) / perguntas.length) * 100;
  progressBar.style.width = progresso + '%';
  questionCounter.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  scoreDisplay.textContent    = `✅ Pontos: ${pontuacao}`;

  // Exibe o texto da pergunta
  questionText.textContent = pergunta.texto;

  // Limpa e cria as opções
  optionsContainer.innerHTML = '';
  pergunta.opcoes.forEach((opcao, idx) => {
    const btn = document.createElement('button');
    btn.classList.add('quiz-option');
    btn.innerHTML = `
      <span class="option-letter">${letras[idx]}</span>
      <span>${opcao}</span>
    `;
    btn.addEventListener('click', () => verificarResposta(idx, btn));
    optionsContainer.appendChild(btn);
  });
}

/**
 * Verifica se a resposta clicada está correta e atualiza a UI.
 * @param {number} indiceEscolhido - Índice da opção clicada
 * @param {HTMLElement} btnClicado - Botão clicado
 */
function verificarResposta(indiceEscolhido, btnClicado) {
  if (respondida) return; // Evita duplo clique
  respondida = true;

  const pergunta    = perguntas[indiceAtual];
  const botoes      = optionsContainer.querySelectorAll('.quiz-option');
  const estaCorreta = indiceEscolhido === pergunta.correta;

  // Desabilita todos os botões
  botoes.forEach(b => (b.disabled = true));

  // Marca correto ou errado
  if (estaCorreta) {
    btnClicado.classList.add('correct');
    pontuacao++;
  } else {
    btnClicado.classList.add('wrong');
    // Revela a resposta correta
    botoes[pergunta.correta].classList.add('correct');
  }

  // Habilita próximo
  nextBtn.disabled = false;

  // Atualiza placar imediatamente se acertou
  scoreDisplay.textContent = `✅ Pontos: ${pontuacao}`;
}

/**
 * Avança para a próxima pergunta ou exibe resultado final.
 */
function avancarPergunta() {
  indiceAtual++;

  if (indiceAtual < perguntas.length) {
    renderizarPergunta();
  } else {
    exibirResultado();
  }
}

/**
 * Exibe a tela de resultado com pontuação e mensagem personalizada.
 */
function exibirResultado() {
  // Barra 100%
  progressBar.style.width = '100%';

  // Esconde o conteúdo do quiz e mostra resultado
  quizContent.style.display = 'none';
  quizResult.classList.remove('hidden');

  const total     = perguntas.length;
  const pct       = Math.round((pontuacao / total) * 100);

  // Define ícone e título conforme desempenho
  let icone, titulo, mensagem;

  if (pct === 100) {
    icone    = '🏆';
    titulo   = 'Excelente!';
    mensagem = 'Parabéns! Você demonstrou domínio completo sobre sustentabilidade agrícola. O planeta agradece o seu conhecimento e compromisso com o futuro!';
  } else if (pct >= 70) {
    icone    = '🌟';
    titulo   = 'Muito Bom!';
    mensagem = 'Ótimo desempenho! Você conhece bem as práticas sustentáveis no campo. Continue aprofundando seus conhecimentos para contribuir ainda mais com o meio ambiente.';
  } else if (pct >= 50) {
    icone    = '🌱';
    titulo   = 'Bom!';
    mensagem = 'Você está no caminho certo! Ainda há muito para aprender sobre sustentabilidade agrícola. Explore o conteúdo do site e volte para melhorar sua pontuação.';
  } else {
    icone    = '📚';
    titulo   = 'Continue Aprendendo!';
    mensagem = 'Não desanime! A jornada pelo conhecimento sustentável começa com o primeiro passo. Leia as boas práticas desta página e tente novamente — você vai se surpreender!';
  }

  resultIcon.textContent    = icone;
  resultTitle.textContent   = titulo;
  resultScore.textContent   = `${pontuacao} de ${total} acertos`;
  resultPercent.textContent = `${pct}% de aproveitamento`;
  resultMsg.textContent     = mensagem;

  // Atualiza contador final
  questionCounter.textContent = 'Quiz concluído!';
  scoreDisplay.textContent    = `✅ Pontos: ${pontuacao}`;
}

/**
 * Reinicia o quiz do zero sem recarregar a página.
 */
function reiniciarQuiz() {
  indiceAtual = 0;
  pontuacao   = 0;
  respondida  = false;

  // Restaura visibilidade
  quizContent.style.display = 'block';
  quizResult.classList.add('hidden');

  renderizarPergunta();
}

// =========================================================
// 5. EVENTOS
// =========================================================
nextBtn.addEventListener('click', avancarPergunta);
restartBtn.addEventListener('click', reiniciarQuiz);

// =========================================================
// 6. ANIMAÇÃO DE SCROLL (Intersection Observer)
//    Anima os cards de práticas ao entrar na viewport
// =========================================================
const animatedEls = document.querySelectorAll('.animate-in');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeno delay escalonado por posição no DOM
        const delay = Array.from(animatedEls).indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

animatedEls.forEach(el => observer.observe(el));

// =========================================================
// 7. INICIALIZAÇÃO
// =========================================================
renderizarPergunta();
