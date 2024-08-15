// Inicializa o Kaboom
console.log("Iniciando Kaboom...");
kaboom();
console.log("Kaboom iniciado.");

// Carrega os sprites
console.log("Carregando sprites...");
loadSprite("mario", "https://i.imgur.com/Wb1qfhK.png");
loadSprite("ground", "https://i.imgur.com/H29CAdh.png");
loadSprite("coin", "https://i.imgur.com/CoY3E7P.png");
loadSprite("enemy", "https://i.imgur.com/KPO3fR1.png");
console.log("Sprites carregados.");

// Define o nível do jogo
const level = [
    "                                    ",
    "                                    ",
    "                                    ",
    "                                    ",
    "                                    ",
    "       $$$                          ",
    "                                    ",
    "==============================  ===="
];

// Adiciona o mapa ao Kaboom
console.log("Adicionando nível...");
addLevel(level, {
    width: 32,
    height: 32,
    "=": () => [
        sprite("ground"),
        area(),
        solid()
    ],
    "$": () => [
        sprite("coin"),
        area(),
        "coin"
    ]
});
console.log("Nível adicionado.");

// Adiciona o jogador ao Kaboom
console.log("Adicionando jogador...");
const player = add([
    sprite("mario"),
    pos(30, 0),
    area(),
    body()
]);
console.log("Jogador adicionado.");

// Configura os controles do jogador
keyDown("left", () => {
    player.move(-120, 0);
});

keyDown("right", () => {
    player.move(120, 0);
});

keyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(400);
    }
});

// Adiciona um inimigo ao jogo
console.log("Adicionando inimigo...");
const enemy = add([
    sprite("enemy"),
    pos(200, 0),
    area(),
    body(),
    "enemy"
]);
console.log("Inimigo adicionado.");

// Movimento simples para o inimigo
enemy.onUpdate(() => {
    enemy.move(-20, 0);
});

// Colisão entre jogador e moeda
player.onCollide("coin", (coin) => {
    destroy(coin);
    // Aqui você pode adicionar lógica para aumentar a pontuação
});

// Colisão entre jogador e inimigo
player.onCollide("enemy", (enemy) => {
    destroy(player);
    // Aqui você pode adicionar lógica para o fim do jogo
});
