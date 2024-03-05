import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';


const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true, 
        },
        matter: {
        debug: true,
        gravity: {y: 0}
        }
    },
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        
    ]
};


const StartGame = (parent) => {

    return new Phaser.Game({...config, parent: parent});
}

export default StartGame;
