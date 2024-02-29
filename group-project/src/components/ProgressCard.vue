<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted
} from 'vue'
import { RouterLink } from 'vue-router'

// Ref for reactive current player
const player = ref("User1")
// const gameStats = reactive({})

onMounted(importLocalStorage)



const gameStats = reactive({
  User1: {
    ProgressData: {
      "RyansGame": {
        level: 1,
        score: 3
      },
      "MartinBGame": {
        level: 1,
        score: 3
      },
      "MartinAGame": {
        level: 1,
        score: 3
      },
      "MustafsGame": {
        level: 1,
        score: 3

      }
    }
  },
  User2: {
    ProgressData: {
      "RyansGame": {
        level: 1,
        score: 3

      },
      "MartinBGame": {
        level: 1,
        score: 3

      },
      "MartinAGame": {
        level: 1,
        score: 3

      },
      "MustafsGame": {
        level: 1,
        score: 3

      }
    }
  },
})

// localStorage.setItem('gameStats', JSON.stringify(gameStats))

function importLocalStorage() {
  let currentStats = JSON.parse(localStorage.getItem('gameStats'))
  if (!currentStats) {
    console.log('No data found in local storage')
  }
  else {
    localStorage.setItem("gameStats", JSON.stringify(currentStats))
}
}


// Function to set the player and update current player progress data
function setPlayer(playerName) {
  player.value = playerName
}

function currentPlayerProgressData() {
if (!gameStats[player.value]) {
  console.log('No data found for this player')
  return
}
else {
  return computed(() => gameStats[player.value].ProgressData)
}
}

</script>

<template>
  <div class="flex justify-center text-4xl py-3">
    <h2>Your Achievements</h2>
  </div>
  <div class="flex justify-center text-l py-3">
    <input type="button" value="Player1" class="px-5" @click="setPlayer('User1')" />
    <input type="button" value="Player2" class="px-5" @click="setPlayer('User2')" />
  </div>
  <div class="flex bg-white justify-center">
    <div class="max-w-7xl px-6 lg:px-8">
      <div class="flex justify-center items-center mx-auto">
        <div
          v-if="currentPlayerProgressData"
          class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 rounded-2xl text-center"
        >
          <RouterLink
            v-for="(details, game) in currentPlayerProgressData()"
            :key="game"
            to="/StatisticsPage"
            class="flex items-center bg-gray-400/5 max-h-40"
          >
            <img :src="`Trophylvl${details.Score > 4 ? 2 : 1}.jpg`" alt="Trophy Level" class="max-w-32 p-5" />
            <div class="p-5">
              <p class="text-2xl font-semibold tracking-tight text-gray-900">
                {{ game }}
              </p>
              <p v-if="details.score" class="text-3xl font-semibold leading-6 text-gray-600">
                Score: {{ details.score }}, Level: {{ details.level }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
