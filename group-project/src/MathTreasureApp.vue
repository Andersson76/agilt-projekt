<script setup>
import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from './game/PhaserGame.vue';
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue' 

const canMoveSprite = ref();
const phaserRef = ref();




const playGame = () => {
    const scene = toRaw(phaserRef.value.scene);
    if (scene) {
        
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
      <Header />
  <Navbar />

<PhaserGame ref="phaserRef" @current-active-scene="handleSceneChange" />
    <div>
        <div class="flex justify-center  -translate-y-3">
            <button class="button bg-green-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 mt-4" @click="playGame()">Play Game</button>
    <div>
        </div>
        </div>
        </div>
        <Footer /> 
</template>
