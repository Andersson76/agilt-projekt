
import { EventBus } from './EventBus';
import { Scene } from 'phaser';

export class YouWin extends Scene {
    constructor() {
        super('YouWin');
    }

    create() {
        this.cameras.main.setBackgroundColor(0x00FF30); 

        this.add.image(256, 256, 'background').setAlpha(0.5); 

        this.add.text(256, 230, 'You Win!', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('MainMenu'); 
    }
}
