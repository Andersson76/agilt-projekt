import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Boot } from './game/scenes/Boot';
import { Game } from './game/scenes/Game';
import { GameOver } from './game/scenes/GameOver';
import { MainMenu } from './game/scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './game/scenes/Preloader';

createApp(App).use(router).mount('#app')

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
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
