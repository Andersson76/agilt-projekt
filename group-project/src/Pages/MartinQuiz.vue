<script setup>

import {ref, computed} from 'vue'
import Header from '../components/Header.vue'
import Navbar from '../components/Navbar.vue'

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

//Function to collect score and put it in local storage
/* It will loop trough the questions each time it runs and check for how many
answers is correct and update the score */
const score = computed(() => {

  const storedData = JSON.parse(localStorage.getItem('gameStats'))
  storedData.User1.ProgressData.MartinBGame.score = 0

  questions.value.map(q => {
    if (q.selected == q.answer) {
      storedData.User1.ProgressData.MartinBGame.score++
      localStorage.setItem('gameStats', JSON.stringify(storedData))
    }
  })
  return storedData.User1.ProgressData.MartinBGame.score
})

//Function to update to new question continuously
const getCurrentQuestion = computed (() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

//Set answer to corresponding event target value
const setAnswer = e => {
  questions.value[currentQuestion.value].selected = e.target.value
  //Reset value
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

/* Function that evaluates if the option is correct or wrong and then hands the
correct class for the element */
function correctOrWrong(selectedIndex, currentIndex, correctIndex) {
  if (selectedIndex == currentIndex) {
        if (currentIndex == correctIndex) {
            return 'correct'
        } else {
            return 'wrong'
        }
    } else {
        return ''
    }
}

/* Function that looks at all none chosen options and disables them as soon as
an option is selected */
function disableOptions(selectedIndex, currentIndex) {
    if (selectedIndex != null && currentIndex != selectedIndex) {
        return 'disabled'
    } else {
        return ''
    }
}

</script>

<template>
  <!-- <Header />
  <Navbar /> -->
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
        <!-- This for loop goes trough the options in each question and sets the values
        for each label accordingly. It also binds the index value to a "special" attribute :key
        to prevent rendering issues. This is to let Vue keep track of elements when rendering lists.
        -->
        <label
          v-for="(option, index) in getCurrentQuestion.options" :key="index"
          :class="`option
          ${correctOrWrong(getCurrentQuestion.selected, index, getCurrentQuestion.answer)}
          ${disableOptions(getCurrentQuestion.selected, index)}`">
        <!-- Here we use v-model to check if user has selected an answer, if that
        returns true we disable the other inputs -->
        <!-- We also use @change event to set our answer. So as soon as there is
        a change we run our setAnswer function -->
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
      <!-- Next question button that is disabled as long as there is currently no answer selected -->
      <!-- We also change the button text to "Finish" if user is at last question, if not we
      use the text "Select an option", and as soon as the user selects an option
      we use the text "Next question" as long as the user is not at the final question -->
      <button @click="nextQuestion" :disabled="!getCurrentQuestion.selected" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      {{
        getCurrentQuestion.index == questions.length - 1
        ? 'Finish'
        : getCurrentQuestion.selected == null
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
