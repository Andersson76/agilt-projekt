
import { EventBus } from './EventBus';
import { Scene } from 'phaser';


export class MainMenu extends Scene {
    logoTween;


    constructor() {
        super('MainMenu');
    }


    create() {
        // Add a background image to the scene
        this.add.image(256, 256, 'background');
   
        // Add a game logo to the scene
        this.logo = this.add.image(256, 150, 'logo').setDepth(100);
   
        // Add main menu text
        this.add.text(256, 230, 'Main Menu', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
   
       
        const playGameButton = this.add.text(256, 300, 'Play Game', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        })
        .setInteractive() // Make the text interactive, enabling it to respond to clicks/taps
        .setOrigin(0.5) // Center the origin to make positioning and interaction more intuitive
        .on('pointerdown', () => {
            console.log("Play Game button clicked");
            // On clicking the button, transition to the 'Preloader' scene to load game assets
            // If your game doesn't need a preloader, you can change this to directly start the 'Game' scene
            this.scene.start('Preloader');
        });
   
        // Notify any system listening (like your Vue app) that the current scene is ready
        // This is useful if your Vue app needs to adjust UI based on the active Phaser scene
        EventBus.emit('current-scene-ready', this);
    }
   


    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }


        this.scene.start('Game');
    }


    moveLogo(vueCallback) {
        if (this.logoTween) {
            if (this.logoTween.isPlaying()) {
                this.logoTween.pause();
            } else {
                this.logoTween.play();
            }
        } else {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    vueCallback({
                        x: Math.floor(this.logo.x),
                        y: Math.floor(this.logo.y)
                    });
                }
            });
        }
    }
}


