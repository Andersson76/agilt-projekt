<template>
  <div>
    <div ref="game" />
  </div>
  <div class="justify-center flex md:flex-grow text-3xl">
    <span class="justify-center flex"><img src="/leftRight.jpg" alt="left right arrow">Move</span>
    <span class="justify-center flex"><img src="/up.jpg" alt="up arrow">Jump</span>
    <span class="justify-center flex"><img src="/space.jpg" alt="spacebar">Shoot</span>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import Phaser from 'phaser';

let player;
let stars;
let bombs;
let platforms;
let cursors;
let score = 0;
let level = 1;
let gameOver = false;
let scoreText;
let levelText;
let highScoreText;
let HighestLevelText;
let isLeftButtonDown = false;
let isRightButtonDown = false;
let isJumpButtonDown = false;
let isShootButtonDown = false;
let InstructionText;
let storedData = JSON.parse(localStorage.getItem('RyansGameData'));
let direction = 'right'; // Initialize direction variable

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  input: {
    activePointers: 2,
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = ref(null);

onMounted(() => {
  game.value = new Phaser.Game(config);
  console.log('Game created');
});

onBeforeUnmount(() => {
  if (game.value) {
    game.value.destroy(true);
    console.log('Game destroyed');
  }
});

function preload() {
  this.load.image('sky', 'sky.png');
  this.load.image('ground', 'platform.png');
  this.load.image('star', 'star.png');
  this.load.image('bomb', 'bomb.png');
  this.load.image('lazer', 'lazer.png');
  this.load.spritesheet('dude', 'dude.png', {
    frameWidth: 31,
    frameHeight: 72,
  });
}

function create() {
  storageCheck();
  const sky = this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.1);
  player.setCollideWorldBounds(true);

  const buttonL = this.add.sprite(80, 570, 'buttonL').setInteractive();
  const buttonR = this.add.sprite(130, 570, 'buttonR').setInteractive();
  const buttonJump = this.add.sprite(700, 570, 'buttonJump').setInteractive();
  const buttonShoot = this.add.sprite(580, 570, 'Shoot').setInteractive();

  buttonL.setOrigin(0.5);
  buttonR.setOrigin(0.5);
  buttonJump.setOrigin(0.5);
  buttonShoot.setOrigin(0.5);

  this.add.text(buttonL.x, buttonL.y, '<', {
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#ffffff',
    align: 'center',
    fixedWidth: 40,
    fixedHeight: 40,
    backgroundColor: '#2d2d2d'
  }).setPadding(3).setOrigin(0.5);

  this.add.text(buttonR.x, buttonR.y, '>', {
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#ffffff',
    align: 'center',
    fixedWidth: 40,
    fixedHeight: 40,
    backgroundColor: '#2d2d2d'
  }).setPadding(3).setOrigin(0.5);

  this.add.text(buttonJump.x, buttonJump.y, 'JUMP', {
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#ffffff',
    align: 'center',
    fixedWidth: 100,
    fixedHeight: 40,
    backgroundColor: '#2d2d2d'
  }).setPadding(3).setOrigin(0.5);

  this.add.text(buttonShoot.x, buttonShoot.y, 'SHOOT', {
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#ffffff',
    align: 'center',
    fixedWidth: 120,
    fixedHeight: 40,
    backgroundColor: '#2d2d2d'
  }).setPadding(3).setOrigin(0.5);

  buttonL.on('pointerdown', () => {
    isLeftButtonDown = true;
  });
  buttonL.on('pointerup', () => {
    isLeftButtonDown = false;
  });

  buttonR.on('pointerdown', () => {
    isRightButtonDown = true;
  });
  buttonR.on('pointerup', () => {
    isRightButtonDown = false;
  });

  buttonJump.on('pointerdown', () => {
    isJumpButtonDown = true;
  });
  buttonJump.on('pointerup', () => {
    isJumpButtonDown = false;
  });
  buttonShoot.on('pointerdown', () => {
    isShootButtonDown = true;
  });
  buttonShoot.on('pointerup', () => {
    isShootButtonDown = false;
    lazerFired(this);
  });
  this.input.keyboard.on('keydown-SPACE', () => {
    lazerFired(this);
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
    key: 'star',
    repeat: 8,
    setXY: { x: 15, y: 0, stepX: 90 },
  });

  const sceneContext = this;

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));

    const numText = sceneContext.add.text(child.x, child.y, Math.floor(Math.random() * (50) + 1), {
      fontSize: '20px',
      fill: '#ffffff',
      backgroundColor: 'rgba(208, 17, 196, 0.5)'
    });
    numText.setOrigin(0.5);
    numText.setDepth(1);

    child.textObj = numText;
  });

  bombs = this.physics.add.group();
  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    fill: '#ffffff',
    backgroundColor: '#2d2d2d',
  });
  levelText = this.add.text(16, 50, 'level: 1', {
    fontSize: '32px',
    fill: '#ffffff',
    backgroundColor: '#2d2d2d',
  });

  highScoreText = this.add.text(525, 16, 'High Score:' + (storedData?.score || 0), {
    fontSize: '32px',
    fill: '#ffffff',
    backgroundColor: '#2d2d2d',
  });
  HighestLevelText = this.add.text(525, 50, 'best level:' + (storedData?.level || 0), {
    fontSize: '32px',
    fill: '#ffffff',
    backgroundColor: '#2d2d2d',
  });
  InstructionText = this.add.text(200, 16, 'Collect Divisibles of ' + level, {
    fontSize: '20px',
    fill: '#ffffff',
    backgroundColor: '#2d2d2d',
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
  this.physics.add.overlap(player, stars, collectStar, null, this);
}

function update() {
  stars.children.iterate(function (child) {
    child.textObj.setPosition(child.x, child.y - 20);
  });

  if (gameOver) {
    return;
  }

  // Updated the player movement and animation logic
  if ((cursors.left.isDown || isLeftButtonDown) && !(cursors.right.isDown || isRightButtonDown)) {
    player.setVelocityX(-160);
    direction = 'left';
  } else if ((cursors.right.isDown || isRightButtonDown) && !(cursors.left.isDown || isLeftButtonDown)) {
    player.setVelocityX(160);
    direction = 'right';
  } else {
    player.setVelocityX(0);
  }

  // Set the player's animation based on direction
  if (player.body.velocity.x !== 0) {
    player.anims.play(direction, true);
  } else {
    player.anims.play('turn');
  }

  if ((cursors.up.isDown || isJumpButtonDown) && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function lazerFired(scene) {
  const x = player.x;
  const y = player.y;
  const lazer = scene.physics.add.sprite(x, y, 'lazer');
  lazer.setVelocityY(0);

  const velocityX = direction === 'right' ? 700 : -700;
  lazer.setVelocityX(velocityX);

  lazer.setDepth(1);

  scene.physics.add.collider(lazer, stars, (lazer, star) => {
    destroyStar(lazer, star);
    // Check if all stars are collected after destroying a star
    if (stars.countActive(true) === 0) {
      nextLevel();
    }
  }, null, scene);
  scene.physics.add.collider(lazer, bombs, destroyBomb, null, scene);
}

function destroyStar(lazer, star) {
  star.disableBody(true, true);
  star.textObj.setVisible(false);
  lazer.destroy();
}

function destroyBomb(lazer, bomb) {
  bomb.disableBody(true, true);
  lazer.destroy();
}

function collectStar(player, star) {
  star.disableBody(true, true);
  star.textObj.setVisible(false);
  if (star.textObj.text % level === 0) {
    score += 10;
    scoreText.setText('Score: ' + score);
  } else {
    score -= 10;
    scoreText.setText('Score:' + score);
  }

  // Check if all stars are collected
  if (stars.countActive(true) === 0) {
    nextLevel();
  }
}

function nextLevel() {
  level += 1;
  levelText.setText('level: ' + level);
  InstructionText.setText('Collect Divisibles of ' + level);

  // Respawn stars and bombs
  stars.children.iterate(function (child) {
    child.enableBody(true, child.x, 0, true, true);
    child.textObj.setVisible(true);
  });
  const x =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  const bomb = bombs.create(x, 16, 'bomb');
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  bomb.allowGravity = false;
}

function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
  storageCheck();
  score = 0;
  level = 1;
  setTimeout(() => {
    this.scene.stop();
    setTimeout(() => {
      this.scene.start();
      gameOver = false;
    }, 500);
  }, 500);
}

function storageCheck() {
  storedData = JSON.parse(localStorage.getItem('RyansGameData'));

  if (!storedData) {
    storedData = {
      score: 0,
      level: 0
    };
  }

  if (level > (storedData.level || 0)) {
    storedData.level = level;
  }

  if (score > (storedData.score || 0)) {
    storedData.score = score;
  }

  localStorage.setItem('RyansGameData', JSON.stringify(storedData));
}
</script>
