<!-- eslint-disable vue/multi-word-component-names -->
<!-- MathMaster -->

<template>
  <Header />
  <Navbar />
  <div class="p-4 mt-16">
    <div v-if="!gameOver" class="text-center">
      <h2 class="text-2xl font-semibold">
        {{ currentQuestion.question }}
      </h2>
      <ul class="mt-4">
        <li
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          class="mb-2"
        >
          <button
            @click="checkAnswer(option)"
            class="px-4 py-2 bg-headerGreen border-x-2 text-white rounded"
            :class="{
              'bg-yellow-300':
                correctAnswer !== null &&
                correctAnswer !== option &&
                option === currentQuestion.answer
            }"
          >
            {{ option }}
          </button>
        </li>
      </ul>
      <p v-if="correctAnswer !== null" class="mt-4">{{ feedback }}</p>
    </div>
    <div v-else class="text-center">
      <h2 class="text-2xl font-semibold">Game Over!</h2>
      <p class="mt-2">Your score: {{ score }} / 10</p>
      <button
        @click="restartGame"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Play Again
      </button>
    </div>
  </div>
  <Footer class="fixed h-20" />
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  import Header from './Header.vue'
  import Navbar from './Navbar.vue'
  import Footer from './Footer.vue'

  const questions = ref([])
  const currentQuestionIndex = ref(0)
  const correctAnswer = ref(null)
  const score = ref(0)
  const gameOver = ref(false)
  const currentQuestion = ref({})
  const askedQuestions = ref([])
  let questionCount = 0

  let activePlayer = JSON.parse(localStorage.getItem('activeplayer'))

  const feedback = computed(() =>
    correctAnswer.value ? 'Correct!' : 'Wrong! Try next question.'
  )

  const fetchData = async () => {
    try {
      const response = await axios.get('questions.json')
      questions.value = response.data
      nextQuestion()
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  const checkAnswer = (answer) => {
    if (answer === currentQuestion.value.answer) {
      score.value++
      correctAnswer.value = true
      saveScoreToLocalStorage()
    } else {
      correctAnswer.value = false
    }
    questionCount++
    if (questionCount >= 10) {
      gameOver.value = true
      return
    }
    setTimeout(() => {
      nextQuestion()
    }, 1000)
  }

  const nextQuestion = () => {
    let randomIndex = Math.floor(Math.random() * questions.value.length)
    while (randomIndex === currentQuestionIndex.value) {
      randomIndex = Math.floor(Math.random() * questions.value.length)
    }
    askedQuestions.value.push(randomIndex)
    currentQuestionIndex.value = randomIndex
    currentQuestion.value = questions.value[randomIndex]
    correctAnswer.value = null
  }

  const saveScoreToLocalStorage = () => {
    let storedData = JSON.parse(localStorage.getItem('gameStats'))

    storedData[activePlayer].ProgressData.MathMaster.score[0] = score.value

    localStorage.setItem('gameStats', JSON.stringify(storedData))

    return storedData[activePlayer].ProgressData.MathMaster.score[0]
  }

  const restartGame = () => {
    gameOver.value = false
    questionCount = 0
    askedQuestions.value = []
    saveScoreToLocalStorage()
    nextQuestion()
  }

  onMounted(fetchData)
</script>
