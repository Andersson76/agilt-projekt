import { createRouter, createWebHistory } from "vue-router";


import Home from './Pages/Home.vue'
import Achievement from './Pages/Achievement.vue'
import Login from './Pages/Login.vue'
import Adventure from './Pages/Adventure.vue'
import BergsQuiz from './Pages/MartinQuiz.vue'
import Andersson from "./components/Andersson.vue";
import ProductBoxPage from './Pages/ProductBoxPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Home,
      path: "/",
    },
    {
      component: Achievement,
      path: "/Achievements",
    },
    {
      component: Login,
      path: "/Login",
    },
    {
      component: Andersson,
      path: "/Andersson",
    },
    {
      component: BergsQuiz,
      path: '/Bergsquiz',
    },
    {
      component: Adventure,
      path: '/Adventure',
    },
    {
      component: ProductBoxPage,
      path: '/ProductBox',
    },
  ],
});
