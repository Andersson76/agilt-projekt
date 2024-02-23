<template>
  <div ref="game"/>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import Phaser from 'phaser';

let player;
let stars;
let bombs;
let platforms;
let cursors;
let score = 0;
let level = 0;
let gameOver = false;
let scoreText;
let levelText;
let isLeftButtonDown = false;
let isRightButtonDown = false;
let isJumpButtonDown = false;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  autoCenter: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

const gameContainer = ref(null);

function preload() {
  this.load.image('sky', 'sky.png');
  this.load.image('ground', 'platform.png');
  this.load.image('star', 'star.png');
  this.load.image('bomb', 'bomb.png');
  this.load.spritesheet('dude', 'dude.png', {
    frameWidth: 31,
    frameHeight: 72,
  });
}

function create() {
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
  const buttonJump = this.add.sprite(680, 570, 'buttonJump').setInteractive();

  buttonL.setOrigin(0.5);
  buttonR.setOrigin(0.5);
  buttonJump.setOrigin(0.5);

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

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
    key: 'star',
    repeat: 8,
    setXY: { x: 12, y: 0, stepX: 90 },
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));
  });

  bombs = this.physics.add.group();

  scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    fill: '#ffffff',
    backgroundColor: '#2d2d2d',
  });
  levelText = this.add.text(16, 50, 'level: 0', {
    fontSize: '32px',
    fill: '#ffffff',
    backgroundColor: '#2d2d2d',
  });


  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  this.physics.add.overlap(player, stars, collectStar, null, this);

  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
  if (gameOver) {
    return;
  }

  if ((cursors.left.isDown || isLeftButtonDown) && !(cursors.right.isDown || isRightButtonDown)) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if ((cursors.right.isDown || isRightButtonDown) && !(cursors.left.isDown || isLeftButtonDown)) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if ((cursors.up.isDown || isJumpButtonDown) && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
    level += 1
    levelText.setText('level: ' + level)
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
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
}

function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
  score = 0;
  level = 0;
  setTimeout(() => {
    this.scene.stop();
    setTimeout(() => {
      this.scene.start();
      gameOver = false;
    }, 500);
  }, 500);
}

onBeforeUnmount(() => {
  game.destroy(true);
});
</script>
