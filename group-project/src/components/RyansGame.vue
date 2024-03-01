<template>
  <div>
    <div ref="game" />
  </div>
  <div class="justify-center flex md:flex-grow text-5xl">
    <span class="justify-center flex"><img src="/leftRight.png" alt="left right arrow">Move</span>
    <span class="justify-center flex"><img src="/up.png" alt="up arrow">Jump</span>
    <span class="justify-center flex"><img src="/space.png" alt="spacebar">Shoot</span>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, onUnmounted } from 'vue';
import Phaser from 'phaser';

// Game variables
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
let direction = 'turn';
let lastDirection = 'right';

// Phaser configuration
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

// Reference to the Phaser game instance
const game = ref(null);

// Initialize the game on mount
onMounted(() => {
  game.value = new Phaser.Game(config);
  console.log('Game created');
});

// Destroy the game on unmount
onBeforeUnmount(() => {
  if (game.value) {
    game.value.destroy(true);
    console.log('Game destroyed');
  }
});

// Preload game assets
function preload() {
  // Load images
  this.load.image('sky', 'sky.png');
  this.load.image('ground', 'platform.png');
  this.load.image('star', 'star.png');
  this.load.image('lazer', 'lazer.png');
  this.load.image('overlay','overlay.png');
  // Load spritesheet
  this.load.spritesheet('dude', 'dude.png', {
    frameWidth: 40,
    frameHeight: 52,
  });
  this.load.spritesheet('bomb', 'bomb.png',{
    frameWidth: 30,
    frameHeight: 27,
  });
}

// Create game elements
function create() {
  storageCheck();
  const sky = this.add.image(400, 300, 'sky');
  const overlay = this.add.image(400,300,'overlay');
  overlay.setDepth(1);
  platforms = this.physics.add.staticGroup();

  // Create ground platforms
  platforms.create(400, 582, 'ground').setScale(1).refreshBody();//floor
  platforms.create(630,405, 'ground').setScale(0.30).refreshBody();//bottom right
  platforms.create(130, 260, 'ground').setScale(0.15).refreshBody();//left
  platforms.create(710, 225, 'ground').setScale(0.22).refreshBody();//top right

  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);

  // Create on-screen buttons for controls
  const buttonL = this.add.sprite(50, 575, 'buttonL').setInteractive();
  const buttonR = this.add.sprite(140, 575, 'buttonR').setInteractive();
  const buttonJump = this.add.sprite(740, 575, 'buttonJump').setInteractive();
  const buttonShoot = this.add.sprite(620, 575, 'Shoot').setInteractive();

  buttonL.setOrigin(1,0.5);
  buttonL.input.hitArea.width *= 2;
  buttonR.setOrigin(1,0.5);
  buttonR.input.hitArea.width *= 2;
  buttonJump.setOrigin(1.5,0.5);
  buttonJump.input.hitArea.width *= 3;
  buttonShoot.setOrigin(1.75,0.5);
  buttonShoot.input.hitArea.width *= 3.5;

  // Add text labels to buttons
  this.add.text(buttonL.x, buttonL.y, '<', {
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#000000',
    align: 'center',
    fixedWidth: 80,
    fixedHeight: 40,
    backgroundColor: '#A5CC61'
  }).setPadding(3).setOrigin(0.5).setDepth(1);
  this.add.text(buttonR.x, buttonR.y, '>', {
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#000000',
    align: 'center',
    fixedWidth: 80,
    fixedHeight: 40,
    backgroundColor: '#A5CC61'
  }).setPadding(3).setOrigin(0.5).setDepth(1);
  this.add.text(buttonJump.x, buttonJump.y, 'JUMP', {
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#000000',
    align: 'center',
    fixedWidth: 100,
    fixedHeight: 40,
    backgroundColor: '#A5CC61'
  }).setPadding(3).setOrigin(0.5).setDepth(1);
  this.add.text(buttonShoot.x, buttonShoot.y, 'SHOOT', {
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#000000',
    align: 'center',
    fixedWidth: 120,
    fixedHeight: 40,
    backgroundColor: '#A5CC61'
  }).setPadding(3).setOrigin(0.5).setDepth(1);

  // Event listeners for buttons
  buttonL.on('pointerdown', () => {
    isLeftButtonDown = true;
    isRightButtonDown = false;
  });
  buttonL.on('pointerup', () => {
    isLeftButtonDown = false;
  });
  buttonR.on('pointerdown', () => {
    isRightButtonDown = true;
    isLeftButtonDown = false;
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

  // Player animation
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'bombLeft',
    frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'bombRight',
    frames: this.anims.generateFrameNumbers('bomb', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys(); // Arrow key controls

  // Stars
  stars = this.physics.add.group({ key: 'star', repeat: 8, setXY: { x: 15, y: 0, stepX: 90 } });
  const sceneContext = this;

  // Text over stars and physics
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

  // Bombs
  bombs = this.physics.add.group();

  // Text boxes
  scoreText = this.add.text(10, 10, 'Score:0', {
    fontSize: '26px',
    fill: '#000000',
    backgroundColor: '#A5CC61',
    padding:2,
  });
  levelText = this.add.text(10, 40, 'Level:1', {
    fontSize: '26px',
    fill: '#000000',
    backgroundColor: '#A5CC61',
    padding:2,
  });
  highScoreText = this.add.text(555, 10, 'High Score:' + (storedData?.score || 0), {
    fontSize: '26px',
    fill: '#000000',
    backgroundColor: '#A5CC61',
    fixedWidth: 230,
    padding:2,
  });
  HighestLevelText = this.add.text(555, 40, 'Best Level:' + (storedData?.level || 0), {
    fontSize: '26px',
    fill: '#000000',
    backgroundColor: '#A5CC61',
    fixedWidth: 230,
    padding:2,
  });
  InstructionText = this.add.text(250, 10, 'Collect Divisibles of ' + level, {
    fontSize: '20px',
    fill: '#000000',
    backgroundColor: '#A5CC61',
    fixedWidth: 285,
    padding:2,
    borderRadius: '100px'
  });

  // Collisions
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
  this.physics.add.overlap(player, stars, collectStar, null, this);
}

// Update game logic
function update() {
  // Update text positions
  stars.children.iterate(function (child) {
    child.textObj.setPosition(child.x, child.y - 20);
  });

  // Check if game over
  if (gameOver) {
    return;
  }

  // Player movement and animation
  if ((cursors.left.isDown || isLeftButtonDown) && !(cursors.right.isDown || isRightButtonDown)) {
    player.setVelocityX(-160);
    direction = 'left';
    lastDirection = 'left';
  } else if ((cursors.right.isDown || isRightButtonDown) && !(cursors.left.isDown || isLeftButtonDown)) {
    player.setVelocityX(160);
    direction = 'right';
    lastDirection = 'right';
  } else {
    player.setVelocityX(0);
    direction = 'turn';
    player.anims.play(direction, false);
  }

  // Set animation based on direction
  if (player.body.velocity.x !== 0) {
    player.anims.play(direction, true);
  }

  // Player jump
  if ((cursors.up.isDown || isJumpButtonDown) && player.body.touching.down) {
    player.setVelocityY(-330);
  }
  // Check and update bomb animation direction
  bombs.children.iterate(function (bomb) {
    if (bomb.body.velocity.x > 0) {
      bomb.anims.play('bombRight', true);
    } else if (bomb.body.velocity.x < 0) {
      bomb.anims.play('bombLeft', true);
    }
  });
}

// Fire laser
function lazerFired(scene) {
  const x = player.x;
  const y = player.y;
  const lazer = scene.physics.add.sprite(x, y, 'lazer');
  lazer.setVelocityY(0);
  const velocityX = lastDirection === 'right' ? 500 : -500;
  lazer.setVelocityX(velocityX);
  lazer.setDepth(1);
  lazer.setScale(0.5);
  scene.physics.add.collider(lazer, stars, (lazer, star) => {
    destroyStar(lazer, star);
    if (stars.countActive(true) === 0) {
      nextLevel();
    }
  }, null, scene);
  scene.physics.add.collider(lazer, bombs, destroyBomb, null, scene);
}

// Destroy star
function destroyStar(lazer, star) {
  star.disableBody(true, true);
  star.textObj.setVisible(false);
  lazer.destroy();
}

// Destroy bomb
function destroyBomb(lazer, bomb) {
  bomb.disableBody(true, true);
  lazer.destroy();
}

// Collect star
function collectStar(player, star) {
  star.disableBody(true, true);
  star.textObj.setVisible(false);
  if (star.textObj.text % level === 0) {
    score += 10;
    scoreText.setText('Score: ' + score);
  } else {
    score -= 10;
    scoreText.setText('Score: ' + score);
  }
  if (stars.countActive(true) === 0) {
    nextLevel();
  }
}

// Move to next level
function nextLevel() {
  level += 1;

  levelText.setText('Level: ' + level);
  InstructionText.setText('Collect Divisibles of ' + level);
  stars.children.iterate(function (child) {
    child.enableBody(true, child.x, 0, true, true);
    child.textObj.setVisible(true);
  });
  const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  const bomb = bombs.create(x, 16, 'bomb');
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  bomb.allowGravity = false;
  bomb.setScale(2);
  bomb.anims.play(bomb.velocity > 0 ? 'bombRight' : 'bombLeft');
}

// Handle bomb collision
function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xd011c4);
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

// Check and update stored game data
function storageCheck() {
  storedData = JSON.parse(localStorage.getItem('RyansGameData'));

  let gameStats = JSON.parse(localStorage.getItem('gameStats'));

  if (!storedData) {
    storedData = { score: 0, level: 0 };

  }
  if (level > (storedData.level || 0)) {
    storedData.level = level
    gameStats.User1.ProgressData.RyansGame.level = level
  }
  if (score > (storedData.score || 0)) {
    storedData.score = score
    gameStats.User1.ProgressData.RyansGame.score = score
  }

  localStorage.setItem('gameStats', JSON.stringify(gameStats));
  console.log(gameStats.User1);

  localStorage.setItem('RyansGameData', JSON.stringify(storedData));

}
</script>
