<script setup>
import {
  ref,
  // reactive,
  // computed,
  // onMounted
} from 'vue'
import { RouterLink } from 'vue-router'

let gameStats

// let gameStats = JSON.parse(localStorage.getItem('gameStats'))
// console.log(gameStats)
const player = ref("User1")

if (!JSON.parse(localStorage.getItem('gameStats'))) {
gameStats = {
  User1: {
    ProgressData: {
      "RyansGame": {
        level: 0,
        score: 0
      },
      "MartinBGame": {
        level: 0,
        score: 0
      },
      "MartinAGame": {
        level: 0,
        score: 0
      },
      "MustafsGame": {
        level: 0,
        score: 0

      }
    }
  },
  User2: {
    ProgressData: {
      "RyansGame": {
        level: 0,
        score: 0
      },
      "MartinBGame": {
        level: 0,
        score: 0
      },
      "MartinAGame": {
        level: 0,
        score: 0
      },
      "MustafsGame": {
        level: 0,
        score: 0
      }
    }
  },
}
console.log('No data found, creating new data')
localStorage.setItem('gameStats', JSON.stringify(gameStats))
  }
  else {
    try {
      gameStats = JSON.parse(localStorage.getItem('gameStats'))
      importLocalStorage(gameStats)
      console.log('Data found, importing data')
    }
    catch (e) {
      console.log('Error importing data')
    }

  }



// let gameStats = JSON.parse(localStorage.getItem('gameStats'))

function importLocalStorage(stats) {
    for (let player in stats) {
      for (let game in stats[player].ProgressData) {
        console.log(game)
        console.log(stats[player].ProgressData[game])
      }
    }
    console.log(stats)
}


// Function to set the player and update current player progress data
function setPlayer(playerName) {
  player.value = playerName
}

// function currentPlayerProgressData() {
// if (!gameStats[player.value]) {
//   console.log('No data found here, no serri')
//   return
// }
// else {
//   return computed(() => gameStats[player.value].ProgressData)
//   }
// }

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
          v-if="gameStats"
          class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 rounded-2xl text-center"
        >
          <RouterLink
            v-for="(details, game) in gameStats[player].ProgressData"
            :key="game"
            to="/StatisticsPage"
            class="flex items-center bg-gray-400/5 max-h-40"
          >
            <img :src="`Trophylvl${details.score > 4 ? 2 : 1}.jpg`" alt="Trophy Level" class="max-w-32 p-5" />
            <div class="p-5">
              <p class="text-2xl font-semibold tracking-tight text-gray-900">
                {{ game }}
              </p>
              <p v-if="details" class="text-3xl font-semibold leading-6 text-gray-600">
                Score: {{ details.score }}, Level: {{ details.level }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
