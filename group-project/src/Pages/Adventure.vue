<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
  import Header from '../components/Header.vue'
  import Navbar from '../components/Navbar.vue'
  import RyansGame from '../components/RyansGame.vue'
</script>

<template>
  <Header />
  <Navbar class="hidden lg:block" />

  <RyansGame />

</template>
