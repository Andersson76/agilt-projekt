<template>
  <nav class="bg-gray-800 py-4 fixed top-0 w-full z-10">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
    >
      <div>
        <a href="#" class="text-white font-bold text-xl">LEVL</a>
      </div>
      <div class="hidden md:block">
        <div class="ml-10 flex items-baseline space-x-4">
          <a href="#" class="text-gray-300 hover:text-white">Home</a>
          <a href="#" class="text-gray-300 hover:text-white">About</a>
          <a href="#" class="text-gray-300 hover:text-white">Contact</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>
