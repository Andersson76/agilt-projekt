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

const quizCompleted = ref(false)
const currentQuestion = ref(0)

const score = computed(() => {
  let value = 0
  questions.value.map(q => {
    if (q.selected == q.answer) {
      value++
    }
  })
  return value
})

const getCurrentQuestion = computed (() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const setAnswer = e => {
  questions.value[currentQuestion.value].selected = e.target.value
  e.target.value = null
}

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
  } else {
    quizCompleted.value = true
  }
}

</script>

<template>
  <main class="app">
    <h1>Quiz</h1>

    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question"> {{ getCurrentQuestion.question }}</span>
        <span class="score">Score {{ score }}/{{ questions.length }}</span>
      </div>

      <div class="options">
        <label v-for="(option, index) in getCurrentQuestion.options" :key="index" :class="`${
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
          @change="setAnswer">
          <span>{{ option }}</span>
        </label>

      </div>
      <button @click="nextQuestion" :disabled="!getCurrentQuestion.selected">
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
  background-color: #271C36;
  color: #FFF;
}

</style>
