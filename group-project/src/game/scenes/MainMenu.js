
import { EventBus } from './EventBus';
import { Scene } from 'phaser';


export class MainMenu extends Scene {
    logoTween;


    constructor() {
        super('MainMenu');
    }


    create() {
       
        this.add.image(256, 256, 'background');

        
       // this.logo = this.add.image(256, 150, 'platform').setDepth(100);

        // Add main menu text
       
        const playGameButton = this.add.text(256, 300, '', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        })

       
        .setInteractive() 
        .setOrigin(0.5) 
        .on('pointerdown', () => {
            console.log("Play Game button clicked");
            
            this.scene.start('Preloader');
        });

       
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
