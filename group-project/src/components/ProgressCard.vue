<template>
  <div class="flex bg-white justify-center">
    <div class="max-w-7xl px-6 lg:px-8">
      <div class="flex justify-center items-center mx-auto max-w-2xl">


          <div v-if="data.Data && data.Data.User1.ProgressData" class="mt-5 grid grid-cols-2 gap-10  rounded-2xl text-center">
        <a href="#" v-for="(score, game) in data.Data.User2.ProgressData" :key="game" class="flex flex-col bg-gray-400/5 p-8">
          <p class="text-3xl font-semibold tracking-tight text-gray-900">{{ game }}</p>

          <img src="/throphies11.jpg" alt="" class="">
          <p class="text-3xl font-semibold leading-6 text-gray-600">{{ score }}</p>

        </a>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* div {
  font-family: 'Jua', sans-serif;
} */
/* p{
  background-color: black;
} */
</style>

<script>
export default {
  name: 'AchievementsCard',
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
  try {
    const response = await fetch('/data.json');
    const Data = await response.json();
    this.data = Data; // Assuming 'Data' is the object structure you've shown
    console.log(this.data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
},
  },
};
</script>
