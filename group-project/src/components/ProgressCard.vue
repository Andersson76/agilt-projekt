<script setup>
  import {
    ref,
  } from 'vue'
  import { RouterLink } from 'vue-router'

  let gameStats

  const player = ref('')

// Here the "activeplayer" is created in local storage unless it already exists. If it does, it is set to the value of the player ref.

  if (!JSON.parse(localStorage.getItem("activeplayer"))) {
    localStorage.setItem('activeplayer', JSON.stringify('User1'))
  } else {
    player.value = JSON.parse(localStorage.getItem('activeplayer'))
  }

// Sets up the gameStats object and imports the data from local storage. If no data is found, it creates a new gameStats object and stores it in local storage.

  if (!JSON.parse(localStorage.getItem('gameStats'))) {
    gameStats = {
      User1: {
        ProgressData: {
          DivisibleWizard: {
            name: 'Divisible Wizard',
            level: 0,
            score: [0, 0],
            Maxscore: 500
          },
          QuizzyTime: {
            name: 'Quizzy Time',
            level: 0,
            score: [0, 0],
            Maxscore: 10
          },
          MathMaster: {
            name: 'Math Master',
            level: 0,
            score: [0, 0],
            Maxscore: 50
          },
          TreasureMathHunt: {
            name: 'Treasure Math Hunt',
            level: 0,
            score: [0, 0],
            Maxscore: 70
          }
        }
      },
      User2: {
        ProgressData: {
          DivisibleWizard: {
            name: 'Divisible Wizard',
            level: 0,
            score: [0, 0],
            Maxscore: 500
          },
          QuizzyTime: {
            name: 'Quizzy Time',
            level: 0,
            score: [0, 0],
            Maxscore: 10
          },
          MathMaster: {
            name: 'Math Master',
            level: 0,
            score: [0, 0],
            Maxscore: 50
          },
          TreasureMathHunt: {
            name: 'Treasure Math Hunt',
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

// This function resets the local storage and reloads the page. Used for testing purposes.

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
  value="Reset Local Storage"
  class="px-5 hover:bg-gray-300 focus:bg-blue-700 focus:outline-none rounded-md transition-colors duration-150 ease-in-out"
  @click="ResetLocalStorage()"
/>
    <div>

      <!-- Here i show for what player the stats are shown -->

      <p class="border border-black px-1">
        Current player: {{ player }}
    </p>
  </div>
  </div>
  <div class="flex bg-white justify-center">
    <div class="max-w-7xl px-6 lg:px-8">
      <div class="flex justify-center items-center mx-auto">

        <!-- Without any values in "gameStats", there are no scores to list ;). There should probably be an element showing for when the data is loading in but we didnt have that issue using local storage since we all allowed for local storage to be used -->
        <div
          v-if="gameStats"
          class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 rounded-2xl text-center"
        >

        <!-- The link below is the achivement card. its made dynamic to be able to list any number of games and their scores based on the object structure in the "gameStats" local storage object -->
          <RouterLink
            v-for="(details, game) in gameStats[player].ProgressData"
            :key="game"
            to="/StatisticsPage"
            class="flex items-center bg-gray-400/5 max-h-50"
          >
            <img
              :src="`Trophylvl${details.score[0] > 4 ? 2 : 1}.jpg`"
              alt="Trophy Level"
              class="max-w-32 p-5"
            />
            <div class="p-5">
              <p class="text-2xl font-semibold tracking-tight text-gray-900">
                {{ details.name }}
              </p>
              <p v-if="details" class="text-xl font-semibold leading-6">
                &starf; {{ details.score[0] }} / {{ details.Maxscore }}
              </p>
              <div class="border-2 border-black">

                <!-- This is the progress bar that uses score and Maxscore to shop % progression
                This can propably be made with a little less code but at-least it works! -->

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
                />
              </div>

              <!-- The element below shows the what level the player has acheived if the game uses the "level" keyword for values -->

              <p v-if="details.level > 0" class="text-xl font-semibold leading-6">
                Level: {{ details.level }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
