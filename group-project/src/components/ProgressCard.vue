<script setup>
  import {
    ref,
    // reactive,
    //computed
    // onMounted
  } from 'vue'
  import { RouterLink } from 'vue-router'

  let gameStats

  const player = ref('')

  if (!JSON.parse(localStorage.getItem("activeplayer"))) {
    localStorage.setItem('activeplayer', JSON.stringify('User1'))
  } else {
    player.value = JSON.parse(localStorage.getItem('activeplayer'))
  }

  if (!JSON.parse(localStorage.getItem('gameStats'))) {
    gameStats = {
      User1: {
        ProgressData: {
          RyansGame: {
            level: 0,
            score: [0, 0],
            Maxscore: 500
          },
          MartinBGame: {
            level: 0,
            score: [0, 0],
            Maxscore: 10
          },
          MartinAGame: {
            level: 0,
            score: [0, 0],
            Maxscore: 50
          },
          MustafsGame: {
            level: 0,
            score: [0, 0],
            Maxscore: 70
          }
        }
      },
      User2: {
        ProgressData: {
          RyansGame: {
            level: 0,
            score: [0, 0],
            Maxscore: 500
          },
          MartinBGame: {
            level: 0,
            score: [0, 0],
            Maxscore: 10
          },
          MartinAGame: {
            level: 0,
            score: [0, 0],
            Maxscore: 50
          },
          MustafsGame: {
            level: 0,
            score: [0, 0],
            Maxscore: 70
          }
        }
      }
    }
    console.log('No data found, creating new data')
    localStorage.setItem('gameStats', JSON.stringify(gameStats))
  } else {
    try {
      gameStats = JSON.parse(localStorage.getItem('gameStats'))
      importLocalStorage(gameStats)
      console.log('Data found, importing data')
    } catch (e) {
      console.log('Error importing data')
    }
  }

  function importLocalStorage(stats) {
    for (let player in stats) {
      for (let game in stats[player].ProgressData) {
        console.log(game)
        console.log(stats[player].ProgressData[game])
      }
    }
    console.log(stats)
  }

  // const percentage = computed(() => {
  //   return (details.score[0] / details.Maxscore[0]) * 100
  // })

  function setPlayer(playerName) {
    player.value = playerName
    localStorage.setItem('activeplayer', JSON.stringify(playerName))
  }

  function ResetLocalStorage() {
    localStorage.removeItem('gameStats')
    location.reload()
  }
</script>

<template>
  <div class="flex justify-center text-4xl py-3">
    <h2>Your Achievements</h2>
  </div>
  <div class="flex justify-center text-l py-3">
    <input
      type="button"
      value="Player1"
      class="px-5"
      @click="setPlayer('User1')"
    />
    <input
      type="button"
      value="Player2"
      class="px-5"
      @click="setPlayer('User2')"
    />
    <input
      type="button"
      value="Reset Local Storage"
      class="px-5"
      @click="ResetLocalStorage()"
    />
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
            <img
              :src="`Trophylvl${details.score[0] > 4 ? 2 : 1}.jpg`"
              alt="Trophy Level"
              class="max-w-32 p-5"
            />
            <div class="p-5">
              <p class="text-2xl font-semibold tracking-tight text-gray-900">
                {{ game }}
              </p>
              <p v-if="details" class="text-xl font-semibold leading-6">
                Score: {{ details.score[0] }} / {{ details.Maxscore }}
              </p>
              <div class="border-2 border-black">
                <p
                  v-if="details"
                  class="h-5 text-xl font-semibold leading-6 bg-green-500 p-0 m-0 progress-bar"
                  role="progressbar"
                  :style="{
                    width: `${
                      (parseInt(details.score[0]) /
                        parseInt(details.Maxscore)) *
                      100
                    }%`
                  }"
                  aria-valuenow="{{ (parseInt(details.score[0]) / parseInt(details.Maxscore)) * 100 }}"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></p>
              </div>
              <p v-if="details" class="text-xl font-semibold leading-6">
                Level: {{ details.level }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
