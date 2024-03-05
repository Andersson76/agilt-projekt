<script setup>
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from './game/PhaserGame.vue';

const canMoveSprite = ref();
const phaserRef = ref();




const playGame = () => {
    const scene = toRaw(phaserRef.value.scene);
    if (scene) {
        // Assuming 'Game' is the key for your main game scene
        scene.scene.start('Game')
    }
}




const currentScene = (scene) => {
    canMoveSprite.value = (scene.scene.key !== 'MainMenu')
}


const handleSceneChange = (scene) => {
    console.log("Scene changed to:", scene);

}




</script>




<template>

    <PhaserGame ref="phaserRef" @current-active-scene="handleSceneChange" />
    <div>
        <button class="button" @click="playGame()">Play Game</button>
        <div>

    </div>
    </div>
</template>
