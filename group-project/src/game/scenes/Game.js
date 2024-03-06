import { EventBus } from './EventBus';
import { Scene } from 'phaser';




export class Game extends Scene {
    constructor() {
        super('Game');
        this.correctAnswersCount = 0; 
        this.totalChests = 0;
       
    }




    create() {
   
   const map = this.make.tilemap({ key: 'map' })
   this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
   const floorTiles = map.addTilesetImage('Floor', 'floorTiles')
   const wallTiles = map.addTilesetImage('Walls', 'wallTiles')
   const doorTiles = map.addTilesetImage('DoubleDoor', 'doorTiles')
   const rutlagerLayer = map.createLayer('Rutlager 1', [ floorTiles, wallTiles, doorTiles])
   
   //this.scoreText = this.add.text(0, 0, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
   //this.score = 0;
 
    this.player = this.physics.add.sprite(560, 1385, 'archer', 'archer_idle_1')
    rutlagerLayer.setCollisionByProperty({ collides: true })
    this.physics.add.collider(this.player, rutlagerLayer);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
    rutlagerLayer.renderDebug
       

    

    this.chests = this.physics.add.staticGroup();
    const chestLayer = map.getObjectLayer('Objektlager 1')
    chestLayer.objects.forEach((obj, index) => {
    const chest = this.chests.create(obj.x, obj.y - 16, 'chestTiles', 4).setOrigin(0, 1)
    chest.setData('id', index + 1);
    this.totalChests = this.chests.getChildren().length;
    this.physics.add.overlap(this.player, chest, this.handleChestCollision, null, this);  
})

    this.physics.add.collider(this.player, this.chests, (player, chest) => {
    console.log('Player has collided with a chest!')
    this.physics.pause(); 
     EventBus.emit('chest-collided', { id: chest.getData('id') })
       
 }),


    EventBus.on('answer-submitted', ({ isCorrect, chestId }) => {
            this.physics.resume();
            if (isCorrect) {
              const chest =  this.chests.getChildren().find(chest => chest.getData ('id') === chestId); 
              if (chest) {
                chest.destroy()
                this.correctAnswersCount++;
                if (this.correctAnswersCount === this.totalChests) {
                    // All chests collected and questions answered correctly, player wins
                    this.scene.start('YouWin');
                }
            }
            } else {
                this.scene.start('GameOver')
                EventBus.emit('game-over')
            }
 });

 this.enemies = this.physics.add.group({
    classType: Phaser.Physics.Arcade.Sprite,
});

const enemyObjects = map.getObjectLayer('enemies').objects;
enemyObjects.forEach((enemyObj) => {
    let spriteKey = 'enemies'; 
    let animKey;

    
    switch (enemyObj.name) {
        case 'knight':
            animKey = 'knight_walk';
            break;
        case 'eliteknight':
            animKey = 'eliteknight_walk';
            break;
        case 'largeknight':
            animKey = 'largeknight_walk';
            break;
        default:
            console.warn('Unknown enemy type:', enemyObj.name);
            return; 
    }

    
    const enemy = this.enemies.create(enemyObj.x, enemyObj.y, spriteKey).setOrigin(0, 1)
    enemy.play(animKey)
});


    this.physics.add.collider(this.player, this.enemies, this.onPlayerEnemyCollision, null, this)
    this.physics.world.createDebugGraphic()
    this.cameras.main.setZoom(1.6)

    this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
         EventBus.emit('current-scene-ready', this)
       
         if (this.physics && this.physics.world) {
            this.physics.world.resume()
        }

        }

      

   update() {
       
        this.player.anims.play('archer_idle', true)
        const speed = 170
        let playerVelocity = new Phaser.Math.Vector2()

       if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1
        }
        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1
        }

        playerVelocity.normalize().scale(speed);
        this.player.setVelocity(playerVelocity.x, playerVelocity.y)

       

       this.enemies.getChildren().forEach((enemy) => {
            const distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, this.player.x, this.player.y)
            if (distance < 100) { 
                this.physics.moveToObject(enemy, this.player, 40)
            } else {
                enemy.setVelocity(0)
            }
            
        })
    }
   
    onPlayerEnemyCollision(player, enemy) {
        console.log('Enemy has collided with the player!');
        this.scene.start('GameOver');
    }
    
       
  changeScene() {
     
        this.scene.start('GameOver')
    }
}

