<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
  import Header from '../components/Header.vue'
  import Navbar from '../components/Navbar.vue'
  import ProgressCard from '../components/ProgressCard.vue'
  import Footer from '../components/Footer.vue'
</script>

<template>
  <Header />
  <Navbar />
  <ProgressCard />
  <Footer class="sm:static md:fixed lg:fixed" />
</template>

<style>
  * {
    font-family: Jua;
  }
</style>
