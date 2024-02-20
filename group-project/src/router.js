import { createRouter, createWebHistory } from 'vue-router'


import Home from './Pages/Home.vue'
import Achievement from './Pages/Achievement.vue'
import Login from './Pages/Login.vue'
import MartinQuiz from './Pages/MartinQuiz.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Home,
      path: '/',
    },
    {
      component: Achievement,
      path: '/Achievements',
    },
    {
      component: Login,
      path: '/Login',
    },
    {
      component: MartinQuiz,
      path: '/Martinquiz',
    },
  ],
})
