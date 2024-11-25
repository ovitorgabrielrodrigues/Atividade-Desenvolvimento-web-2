const jogo = document.querySelector('.jogo');
const placarJogador1 = document.getElementById('placar-jogador1');
const placarJogador2 = document.getElementById('placar-jogador2');
const botaoReiniciar = document.getElementById('botao-reiniciar');

let jogadorAtual = 'X';
let tabuleiro = Array(9).fill(null);
let placarMagoNegro = 0;
let placarDragaoBranco = 0;

// Imagens das cartas
const imagens = {
  X: 'https://www.cardtrader.com/uploads/blueprints/image/247549/dark-magician-2020-legend-of-blue-eyes-white-dragon-25th-anniversary-edition.png',
  O: 'https://img.mypcards.com/img/3/761/yugioh_sdk_001/yugioh_sdk_001_en.jpg',
};

// Geração do tabuleiro
function criarTabuleiro() {
  jogo.innerHTML = '';
  tabuleiro.forEach((_, index) => {
    const quadrante = document.createElement('div');
    quadrante.classList.add('Quadrante');
    quadrante.setAttribute('data-index', index);
    quadrante.addEventListener('click', clicarQuadrante);
    jogo.appendChild(quadrante);
  });
}

// Manipula clique no quadrante
function clicarQuadrante(evento) {
  const quadrante = evento.target;
  const index = quadrante.getAttribute('data-index');

  if (tabuleiro[index] === null) {
    tabuleiro[index] = jogadorAtual;
    quadrante.classList.add('ocupado');
    quadrante.innerHTML = `<img src="${imagens[jogadorAtual]}" alt="${jogadorAtual}">`;

    if (verificarVitoria()) {
      setTimeout(() => {
        alert(`Jogador ${jogadorAtual === 'X' ? '1 (Mago Negro)' : '2 (Dragão Branco)'} venceu!`);
        atualizarPlacar();
        reiniciarTabuleiro();
      }, 200);
      return;
    }

    if (tabuleiro.every(celula => celula !== null)) {
      setTimeout(() => {
        alert('Empate!');
        reiniciarTabuleiro();
      }, 200);
      return;
    }

    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
  }
}

// Verifica se houve vitória
function verificarVitoria() {
  const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  return combinacoesVitoria.some(combinacao =>
    combinacao.every(index => tabuleiro[index] === jogadorAtual)
  );
}

// Atualiza o placar
function atualizarPlacar() {
  if (jogadorAtual === 'X') {
    placarMagoNegro++;
    placarJogador1.textContent = placarMagoNegro;
  } else {
    placarDragaoBranco++;
    placarJogador2.textContent = placarDragaoBranco;
  }
}

// Reinicia apenas o tabuleiro
function reiniciarTabuleiro() {
  tabuleiro = Array(9).fill(null);
  jogadorAtual = 'X';
  criarTabuleiro();
}

// Reinicia o jogo inteiro
botaoReiniciar.addEventListener('click', () => {
  placarMagoNegro = 0;
  placarDragaoBranco = 0;
  placarJogador1.textContent = placarMagoNegro;
  placarJogador2.textContent = placarDragaoBranco;
  reiniciarTabuleiro();
});

// Inicialização
criarTabuleiro();
