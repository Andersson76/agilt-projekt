<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { EventBus } from './scenes/EventBus.js';
import StartGame from '../main.js';










const scene = ref()
const game = ref(null);
const showQuestion = ref(false)
const questionText = ref('Loading question...')
let currentChestId = ref(null)
const score = ref(0)


const questions = [
    { id: 1, text: '5 * 1 = 6', correctAnswer: 'No' },
    { id: 2, text: '6 * 3 = 9', correctAnswer: 'No' },
    { id: 3, text: '9 * 7 = 63', correctAnswer: 'Yes' },
    { id: 4, text: '8 * 8 = 48', correctAnswer: 'No' },
    { id: 5, text: '9 * 8 = 72', correctAnswer: 'Yes' },
    { id: 6, text: '10 * 10 = 100', correctAnswer: 'Yes' },
    { id: 7, text: '12 * 2 = 22', correctAnswer: 'No' },


];


const emit = defineEmits(['current-active-scene'])


const saveGameScore = () => {
  let gameStats = JSON.parse(localStorage.getItem('gameStats')) || {};

 gameStats.User1 = gameStats.User1 || {};
  gameStats.User1.ProgressData = gameStats.User1.ProgressData || {};
  gameStats.User1.ProgressData.MustafsGame = gameStats.User1.ProgressData.MustafsGame || {};
  gameStats.User1.ProgressData.MustafsGame.score = gameStats.User1.ProgressData.MustafsGame.score || [];

  gameStats.User1.ProgressData.MustafsGame.score[0] = score.value;

  localStorage.setItem('gameStats', JSON.stringify(gameStats));

  return gameStats.User1.ProgressData.MustafsGame.score;
};



onMounted(() => {


    game.value = StartGame('game-container')
    saveGameScore()
    EventBus.on('current-scene-ready', (currentScene) => {
        emit('current-active-scene', currentScene)
        scene.value = currentScene
 });




    EventBus.on('chest-collided', ({ id }) => {
        const question = questions.find(q => q.id === id)
        if (question) {
            questionText.value = question.text;
            showQuestion.value = true
            currentChestId.value = id
        }


    })
    EventBus.on('game-over', () => {
    score.value = 0;
    saveGameScore()
})
})


onUnmounted(() => {
    if (game.value) {
        game.value.destroy(true);
        game.value = null;
    }
})




const submitAnswer = (answer) => {
    const question = questions.find(q => q.id === currentChestId.value)
    if (question && answer === question.correctAnswer) {
        console.log("Correct!")
        score.value += 10
        saveGameScore()
        EventBus.emit('answer-submitted', { isCorrect: true, chestId: currentChestId.value })
    } else {
        console.log("Incorrect. Game over.")
        EventBus.emit('answer-submitted', { isCorrect: false, chestId: currentChestId.value })


    }
    showQuestion.value = false


}
defineExpose({ scene, game })


</script>

<template>
   
  <!--  <div id="game-container"></div>
  <div class="score-display">Score: {{ score }}</div> -->
  <div id="game-container" class="relative">
    <div class="score-display absolute top-0" style="left: 510px; margin: 1rem; background-color: rgba(75, 85, 99, 0.5); color: white; padding: 0.5rem; border-radius: 0.25rem;">
        Score: {{ score }}

    </div>
  </div>


  <div v-if="showQuestion" class="fixed inset-0 flex justify-center items-center">
      <div class="modal bg-gray-800 text-gray-200 p-5 rounded-md font-sans z-50">
          <p>{{ questionText }}</p>
          <div class="flex space-x-4 mt-4">
              <button @click="submitAnswer('Yes')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Yes
              </button>
              <button @click="submitAnswer('No')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  No
              </button>
          </div>
      </div>
  </div>
  
 
 

</template>


<style>
.modal {
    position: fixed;
  left: 50%;
  top: 50%;


  padding: 20px;
  background: #222222;
  border-radius: 5px;
  color: #eee;
  font: caption;
  z-index: 100;
}
</style>