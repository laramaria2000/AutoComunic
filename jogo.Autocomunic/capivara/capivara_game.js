const startsong = document.getElementById("startsong");
const music = document.getElementById("trilhaSonora");
music.volume = 0.04;


document.addEventListener("DOMContentLoaded", () => {
  const pauseButton = document.getElementById("pause-btn");
  const despauseButton = document.getElementById("despause-btn");
  const reco = document.getElementById("round-button3");
  const toastContainer = document.getElementById("toast-container");


  let isGamePaused = false;
  let gameLoopInterval;

  const startGameLoop = () => {
    gameLoopInterval = setInterval(gameLoop, 1000 / 60);
  };

  const pauseGame = () => {
    if (isGamePaused) return; // Se o jogo já estiver pausado, não faz nada

    isGamePaused = true; // Define que o jogo está pausado
    clearInterval(gameLoopInterval); // Para o intervalo do loop do jogo
    showPauseToast(); // Mostra o toast de pausa
  };

  let isPaused = false;
  const pipe = document.querySelector(".pipe");
  const pauseButton2 = document.getElementById("pause-btn");
  const despauseButton2 = document.getElementById("despause-btn");
  const vitoriaDisplay = document.getElementById("vitoria");

  function pauseAnimation() {
    pipe.style.animationPlayState = "paused";
    capivara.style.animationPlayState = "paused";
  }

  function resumeAnimation() {
    pipe.style.animationPlayState = "running";
    capivara.style.animationPlayState = "running";
  }

  pauseButton.addEventListener("click", () => {
    isPaused = true;
    pauseAnimation();
    // Mostrar a tela de pausa
    document.getElementById("toast-container").style.display = "block";
  });

  despauseButton.addEventListener("click", () => {
    isPaused = false;
    resumeAnimation();
    // Esconder a tela de pausa
    document.getElementById("toast-container").style.display = "none";
  });

  const showPauseToast = () => {
    toastContainer.style.display = "flex"; // Mostra o toast
    if (isPaused) {
      speak("Você acionou o pause, para voltar o jogo clique no botão.");
    }

    // Verificação da posição do pipe e atualização de pontuação
    if (pipePosition < 0 && !pipe.classList.contains("scored")) {
      pipe.classList.add("scored");
      score += 5;
      updateScore();

      if (score % 30 === 0) {
        criarLetra(pipePosition);
      }
    } else if (pipePosition >= 120) {
      pipe.classList.remove("scored");
    }
  };

  const hidePauseToast = () => {
    toastContainer.style.display = "none"; // Esconde o toast
  };

  // Adiciona o evento de clique ao botão de pausar
  pauseButton.addEventListener("click", pauseGame);

  const gameLoop = () => {
    if (isGamePaused) return; // Se o jogo estiver pausado, não faz nada

    updateGame(); // Atualiza o estado do jogo
    renderGame(); // Renderiza o jogo
  };

  const updateGame = () => {
    // Lógica para atualizar o estado do jogo
  };

  const renderGame = () => {
    // Lógica para renderizar a tela
  };

  // Inicia o jogo quando a página é carregada
  window.onload = () => {
    startGameLoop();
  };
});

const capivara = document.querySelector(".capivara");
const pipe = document.querySelector(".pipe");
const start = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");
const scoreDisplay = document.querySelector(".score");
const livesDisplay = document.querySelector(".lives");
const letrasColetadasDisplay = document.querySelector(".letras-coletadas");
const vitoriaDisplay = document.getElementById("vitoria");

let score = 0;
let lives = 3;
let gameInterval;
let gameInterval2;
let allLivesLost = false;
let letrasElementos = [];
let letrasColetadas = [];
let ignoreCollision = false;
let falou_reiniciar = false;

//letrasColetadas = ["C", "A", "P", "I", "V", "AA", "R", "AAA"];
const letras = ["C", "A", "P", "I", "V", "AA", "R", "AAA"];
let proximaLetra = 0;

startsong.addEventListener("click", () => music.play());

const resetarcapivara = () => { 
  capivara.src = "img.capivara/capivara.gif";
  capivara.style.width = "150px";
  capivara.style.bottom = "0";
  capivara.style.marginLeft = "0";
};

const resetarpedra = () => {
  pipe.classList.remove("pipe-animation");
  pipe.offsetWidth; // Trigger reflow
  pipe.classList.add("pipe-animation");
  pipe.style.right = "-80px";
};

const startGame = () => {
  falou_reiniciar = false;
  pipe.classList.add("pipe-animation");
  start.style.display = "none";
  updateScore();
  updateLives();
  criarLetrasColetadas();

  gameInterval = setInterval(loop, 10);
  gameInterval2 = setInterval(loop, 10);
};

const restartGame = () => {
  falou_reiniciar = false;
  gameOver.style.display = "none";

  resetarcapivara();

  resetarpedra();

  if (allLivesLost) {
    score = 0;
    lives = 3;
    allLivesLost = false;
    // Limpar letras coletadas
    letrasColetadas = [];
    letrasColetadasDisplay.innerHTML = "";
  }

  updateScore();
  updateLives();

  gameInterval = setInterval(loop, 10);
  gameInterval2 = setInterval(loop, 10);
};

const recomeçar = () => {
  falou_reiniciar = false;
  gameOver.style.display = "none";

  resetarcapivara();

  resetarpedra();

  if (allLivesLost) {
    score = 0;
    lives = 3;
    allLivesLost = false;
    // Limpar letras coletadas
    letrasColetadas = [];
    letrasColetadasDisplay.innerHTML = "";
  }

  updateScore();
  updateLives();

  gameInterval = setInterval(loop, 10);
  gameInterval2 = setInterval(loop, 10); 
};

const restart = () => {
  // Recarregar a página para reiniciar o jogo
  location.reload();
};


const adicionarLetraColetada = (letra) => {
  // Encontre o índice correto para a nova letra
  const index = letras.indexOf(letra);

  // Adiciona a letra na posição correta
  letrasColetadas[index] = letra;

  // Atualiza a exibição das letras coletadas
  atualizarLetrasColetadas();
};

const atualizarLetrasColetadas = () => {
  letrasColetadasDisplay.innerHTML = "";
  letrasColetadas.forEach((letra) => {
    if (letra) {
      const letraColetada = document.createElement("img");
      letraColetada.src = `img.capivara/letra${letra}.png`;
      letraColetada.alt = letra;
      letraColetada.classList.add("letra-coletada");
      letrasColetadasDisplay.appendChild(letraColetada);
    }
  });
};

const verificarColisaoLetras2 = () => {
  letrasElementos.forEach((letraElemento, index) => {
    const letraPosition = letraElemento.getBoundingClientRect();
    const capivaraPosition = capivara.getBoundingClientRect();

    if (
      letraPosition.left < capivaraPosition.right &&
      letraPosition.right > capivaraPosition.left &&
      letraPosition.top < capivaraPosition.bottom &&
      letraPosition.bottom > capivaraPosition.top
    ) {
      // Coletar a letra
      letraElemento.style.display = "none"; // Oculta a letra
      letrasElementos.splice(index, 1); // Remove da lista

      // Adiciona a letra na posição correta
      adicionarLetraColetada(letraElemento.alt);

      score += 10;
      updateScore();
    } else if (letraPosition.right < 0) {
      // Reposiciona a letra ao lado direito da tela
      letraElemento.style.right = "-80px"; // Ajuste conforme necessário para reposicionar a letra
    }
  });
};
const criarletra2 = (pipePosition) => {
  const letra = letras[proximaLetra];
  const letraElemento = document.createElement("img");
  letraElemento.src = `img.capivara/letra${letra}.png`;
  letraElemento.alt = letra;
  letraElemento.classList.add("letra", "letra-animacao");
  letraElemento.style.bottom = "200px"; // Ajuste conforme necessário para a posição acima da pedra

  // Centralizar a letra em relação ao pedra
  const pipeWidth = pipe.offsetWidth;
  const letraWidth = 50; // Largura da imagem da letra
  letraElemento.style.right = `${
    window.innerWidth - pipePosition - pipeWidth / 2 + letraWidth / 2
  }px`;

  document.querySelector(".game").appendChild(letraElemento);
  letrasElementos.push(letraElemento);

  proximaLetra = (proximaLetra + 1) % letras.length;
};


const updateScore = () => {
  scoreDisplay.textContent = score;
};

const updateLives = () => {
  livesDisplay.innerHTML = "";
  for (let i = 0; i < lives; i++) {
    const img = document.createElement("img");
    img.src = "img.capivara/cori1.png";
    img.alt = "vida";
    livesDisplay.appendChild(img);
  }
};

const loop = () => {
  const pipePosition = pipe.offsetLeft;
  const capivaraPosition = parseInt(
    window.getComputedStyle(capivara).bottom.replace("px", "")
  );

  if (
    pipePosition <= 120 &&
    pipePosition > 0 &&
    capivaraPosition < 80 &&
    !ignoreCollision
  ) {
    pipe.classList.remove("pipe-animation");

    capivara.classList.remove("jump");
    capivara.style.bottom = `${capivaraPosition}px`;

    capivara.src = "./src/img/game-over.png";
    capivara.style.width = "10px";
    capivara.style.marginLeft = "50px";

    gameOver.style.display = "flex";
    lives--;

    clearInterval(gameInterval);
    clearInterval(gameInterval2);

    updateLives();
    // Supondo que esta variável indica se o jogador coletou todas as letras
    let allLettersCollected = false;

    // Quando o jogador perde uma vida
    if (lives >= 0 && !allLettersCollected) {
      allLivesLost = false;
      clearInterval(gameInterval2);

      // Reproduz o som do pulo desde o início e pausa ao final
      loser_sound.currentTime = 0; // Reinicia o som do início
      loser_sound.play();
      
      setTimeout(() => {
        loser_sound.pause(); 
      }, 800); 
      speak(
        `Você tem ${lives} vida${lives === 1 ? "" : "s"} restante${
          lives === 1 ? "" : "s"
        }, clique no botão para reiniciar`
      );
    }

    if (lives <= 0) {
      allLivesLost = true;
      gameOver.querySelector("h1").textContent = "Fim de Jogo";
      letrasElementos = [];
      letrasColetadas = [];
      proximaLetra = 0;
    } else {
      gameOver.querySelector(
        "h1"
      ).textContent = `Você tem ${lives} vidas restantes`;
    }
  } else if (pipePosition < 0 && !pipe.classList.contains("scored")) {
    pipe.classList.add("scored");
    score += 5;
    updateScore();

    if (score % 30 === 0) {
      criarLetra(pipePosition);
    }
  } else if (pipePosition >= 120) {
    pipe.classList.remove("scored");
  }

  verificarColisaoLetras();

  if (verificarPalavracapivara()) {
    clearInterval(gameInterval);
    vitoriaDisplay.style.display = "block";
    pipe.classList.remove("pipe-animation");

    capivara.classList.remove("jump");
    resetarcapivara();
    if (!falou_reiniciar) {
      speak(
        "Clique no botão para reiniciar o reconhecimento de voz. Repita a palavra...capivara"
      );
      falou_reiniciar = true;
    }
  }
};

// Função para verificar se todas as 5 letras foram coletadas
const verificarPalavracapivara = () => {
  for (let i = 0; i < letras.length; i++) {
    if (!letrasColetadas.includes(letras[i])) {
      return false;
    }
  }
  return true;
};

// Função para criar uma letra no jogo
const criarLetra = (pipePosition) => {
  const letra = letras[proximaLetra];
  const letraElemento = document.createElement("img");
  letraElemento.src = `img.capivara/letra${letra}.png`;
  letraElemento.alt = letra;
  letraElemento.classList.add("letra", "letra-animacao");
  letraElemento.style.bottom = "200px"; // Ajuste conforme necessário para a posição acima do pedra

  // Centralizar a letra em relação ao pedra
  const pipeWidth = pipe.offsetWidth;
  const letraWidth = 50; // Largura da imagem da letra
  letraElemento.style.right = `${
    window.innerWidth - pipePosition - pipeWidth / 2 + letraWidth / 2
  }px`;

  document.querySelector(".game").appendChild(letraElemento);
  letrasElementos.push(letraElemento);

  proximaLetra = (proximaLetra + 1) % letras.length;
};

// Função para exibir as letras coletadas na tela
const criarLetrasColetadas = () => {
  letrasColetadas.forEach((letra) => {
    const letraColetada = document.createElement("img");
    letraColetada.src = `img.capivara/letra${letra}.png`;
    letraColetada.alt = letra;
    letraColetada.classList.add("letra-coletada");
    letrasColetadasDisplay.appendChild(letraColetada);
  });
};

const verificarColisaoLetras = () => {
  letrasElementos.forEach((letraElemento, index) => {
    const letraPosition = letraElemento.getBoundingClientRect();
    const capivaraPosition = capivara.getBoundingClientRect();

    if (
      letraPosition.left < capivaraPosition.right &&
      letraPosition.right > capivaraPosition.left &&
      letraPosition.top < capivaraPosition.bottom &&
      letraPosition.bottom > capivaraPosition.top
    ) {
      // Coletar a letra
      letraElemento.style.display = "none"; // Oculta a letra
          // Reproduz o som do pulo desde o início e pausa ao final
          collect_sound.currentTime = 0; // Reinicia o som do início
          collect_sound.play();

          setTimeout(() => {
            collect_sound.pause(); 
          }, 800); 
      letrasElementos.splice(index, 1); // Remove da lista

      // Mostra a letra coletada no topo
      const letraColetada = document.createElement("img");
      letraColetada.src = letraElemento.src;
      letraColetada.alt = letraElemento.alt;
      letraColetada.classList.add("letra-coletada");
      letrasColetadasDisplay.appendChild(letraColetada);

      letrasColetadas.push(letraElemento.alt); // Adiciona à lista de letras coletadas

      score += 10;
      updateScore();

      if (verificarPalavracapivara()) {
        console.log("Você coletou todas as letras!");
      }
    } else if (letraPosition.right < 0) {
      letraElemento.style.right = "-80px"; 
    }
  });
};

let lastClickTime = 0; 

document.addEventListener("keypress", (e) => {
  const tecla = e.key;
  if (tecla === " ") {
    jump();
  } else if (tecla === "Enter") {
    startGame();
  }
});

document.addEventListener("touchstart", (e) => {
  if (e.touches.length) {
    jump();
  }
});

document.addEventListener("dblclick", (e) => {
  const currentTime = new Date().getTime();
  if (currentTime - lastClickTime < 5) {
    jump();
  }
  lastClickTime = currentTime;
});

let isJumping = false; 

function jump() {
  if (!isJumping) {
    isJumping = true;
    capivara.classList.add("jump");

    jump_sound.currentTime = 0; 
    jump_sound.play();

    setTimeout(() => {
      jump_sound.pause(); 
    }, 800); 

    setTimeout(() => {
      capivara.classList.remove("jump");
      isJumping = false;
    }, 800);
  }
}

const startButton = document.getElementById("start-btn");
const resultPara = document.getElementById("result");
const statusPara = document.getElementById("status");

const expectedWord = "capivara";

if ("webkitSpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    statusPara.textContent = "";
    console.log();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    resultPara.textContent = ` ${transcript}`;
    console.log(` ${transcript}`);

    if (transcript === expectedWord) {
      vitoriaDisplay.style.display = "block";
      speak("Você venceu! Parabéns!");
      console.log("Palavra correta reconhecida.");
    } else {
      console.log("Palavra incorreta reconhecida.");
    }
  };

  recognition.onerror = (event) => {
    statusPara.textContent = `Erro no reconhecimento: ${event.error}`;
    console.error(`Erro no reconhecimento de voz: ${event.error}`);
  };

  recognition.onend = () => {
    console.log();

    if (resultPara.textContent.includes(expectedWord)) {
      speak("Parabéns! Você comcluiu todas as fases");
      const canvas = document.getElementById('confettiCanvas');
      const ctx = canvas.getContext('2d');

      // Ajusta o tamanho do canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Função para redimensionar o canvas quando a janela for redimensionada
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      // Criação dos confetes
      const confetti = [];
      const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd'];

      function ConfettiPiece() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;

        this.update = function () {
          this.y += this.speed;
          this.angle += this.rotationSpeed;
          if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
          }
        };

        this.draw = function () {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate((this.angle * Math.PI) / 180);
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
          ctx.restore();
        };
      }

      function createConfetti() {
        for (let i = 0; i < 150; i++) {
          confetti.push(new ConfettiPiece());
        }
      }

      function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((confetto) => {
          confetto.update();
          confetto.draw();
        });
        requestAnimationFrame(animateConfetti);
      }

      createConfetti();
      animateConfetti();
    } else {
      speak("Tente novamente!");
      console.log("Palavra incorreta reconhecida.");
    }
  };

  startButton.addEventListener("click", () => {
    recognition.start();
  });
} else {
  statusPara.textContent = "Seu navegador não suporta reconhecimento de voz.";
  console.log("API de reconhecimento de voz não suportada.");
}

function speak(message) {
  let last_volume = music.volume;
  music.volume = 0.1;

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "pt-BR";

  window.speechSynthesis.speak(utterance);

  utterance.onend = () => {
    music.volume = last_volume;
  };
}

$(document).ready(function () {
  $(".toast").toast("show");
});
