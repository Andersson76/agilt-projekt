<script setup>
  import Header from '../components/Header.vue'
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <Navbar />
    <div class="flex justify-center items-center h-full py-8">
      <iframe
        class="w-full h-full"
        src="adVideo.mp4"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
    <Footer />
  </div>
</template>
