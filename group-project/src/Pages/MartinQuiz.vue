<script setup>

import {ref, computed} from 'vue'

const questions = ref([
  {
    question: 'How many apples is 2.5 apples?',
    answer: 1,
    options: [
      3,
      2.5,
      2
    ],
    selected: null
  },
  {
    question: 'What is 3 * 5?',
    answer: 0,
    options: [
      15,
      35,
      2
    ],
    selected: null
  },
  {
    question: 'What is 5 * 3?',
    answer: 2,
    options: [
      53,
      10,
      15
    ],
    selected: null
  },
])

let quizCompleted = ref(false)
const currentQuestion = ref(0)

//Function to collect score
const score = computed(() => {
  let value = 0
  questions.value.map(q => {
    if (q.selected == q.answer) {
      value++
    }
  })
  return value
})

//Function to update to new question continuously
const getCurrentQuestion = computed (() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const setAnswer = e => {
  //Set answer to corresponding event target value
  questions.value[currentQuestion.value].selected = e.target.value
  e.target.value = null
}

const nextQuestion = () => {
  console.log(questions.value)
  //If user is not at the end of the quiz, continue to iterate forward
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
  } else {
    quizCompleted.value = true
  }
}

//Reset quiz by resetting values
function resetQuiz() {

  questions.value.forEach(question => {
    question.selected = null
  })

  currentQuestion.value = 0

  quizCompleted.value = false

  return
}

</script>

<template>
  <main class="app">
    <h1 class="header">Quiz</h1>
    <!-- Only render quiz if quiz isnt already completed -->
    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question"> {{ getCurrentQuestion.question }}</span>
        <span class="score">Score {{ score }}/{{ questions.length }}</span>
      </div>

      <div class="options">
        <!-- Loop trough questions and assign the value of options keys to the "choices" -->
        <label
          v-for="(option, index) in getCurrentQuestion.options" :key="index" :class="`option ${
          getCurrentQuestion.selected == index
          ? index == getCurrentQuestion.answer
          ? 'correct'
          : 'wrong'
          : ''
        } ${
          getCurrentQuestion.selected != null &&
          index != getCurrentQuestion.selected
          ? 'disabled'
          : ''
        }`">
          <input
          type="radio"
          :name="getCurrentQuestion.index"
          :value="index"
          v-model="getCurrentQuestion.selected"
          :disabled="getCurrentQuestion.selected"
          @change="setAnswer" />
          <span>{{ option }}</span>
        </label>

      </div>
      <button @click="nextQuestion" :disabled="!getCurrentQuestion.selected" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      {{
        getCurrentQuestion.index == questions.length - 1
        ? 'Finish'
        :getCurrentQuestion.selected == null
        ? 'Select an option'
        : 'Next question'
        }}
      </button>
    </section>

    <section v-else>
      <h2>You have finished the quiz!</h2>
      <p>Your score is {{ score }} / {{ questions.length }}</p>
      <button @click="resetQuiz" type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Try again</button>
    </section>
  </main>
</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background-color: #A5CC61;
  color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  font-size: 2.5rem;
  margin-bottom: 4rem;
}

.quiz {
  background-color: #FDDE9A;
  padding: 2rem;
  width: 100%;
  max-width: 640px;
  border-radius: 0.5rem;
}

.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.quiz-info .question {
  color: #271C36;
  font-size: 1.25rem;
}

.quiz-info .score {
  color: #271C36;
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}

.option {
  display: block;
  padding: 1rem;
  background-color: #16C6FB;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  background-color: #85E0FC;
}

.option.correct {
  background-color: #A5CC61;
}

.option.wrong {
  background-color: #FD4261;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

</style>
