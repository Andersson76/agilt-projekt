<!-- eslint-disable vue/multi-word-component-names -->
<!-- MathQuiz -->

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
          >
            {{ option }}
          </button>
        </li>
      </ul>
      <p v-if="correctAnswer !== null" class="mt-4">{{ feedback }}</p>
    </div>
    <div v-else class="text-center">
      <h2 class="text-2xl font-semibold">Game Over!</h2>
      <p class="mt-2">Your score: {{ score }}</p>
      <button
        @click="restartGame"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Play Again
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import axios from 'axios'
  import Header from './Header.vue'
  import Navbar from './Navbar.vue'

  const questions = ref([])
  const currentQuestionIndex = ref(0)
  const correctAnswer = ref(null)
  const score = ref(0)
  const gameOver = ref(false)
  const currentQuestion = ref({})

  const feedback = computed(() =>
    correctAnswer.value ? 'Correct!' : 'Wrong! Try again.'
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
    } else {
      correctAnswer.value = false
    }
    setTimeout(() => {
      nextQuestion()
    }, 1000)
  }

  const nextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.value.length)
    currentQuestionIndex.value = randomIndex
    currentQuestion.value = questions.value[randomIndex]
    correctAnswer.value = null
  }

  const restartGame = () => {
    score.value = 0
    gameOver.value = false
    nextQuestion()
  }

  onMounted(fetchData)
</script>
