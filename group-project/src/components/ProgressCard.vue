<template>
  <div class="flex justify-center text-4xl py-3">
  <h2>Your Achievements</h2>
</div>
<div class="flex justify-center text-l py-3">
<input type="button" value="Player1" class="px-5" @click="setPlayer1()" />
<input type="button" value="Player2" class="px-5" @click="setPlayer2()" />
</div>
  <div class="flex bg-white justify-center">
    <div class="max-w-7xl px-6 lg:px-8">
      <div class="flex justify-center items-center mx-auto "
      >
      <div
  v-if="currentPlayerProgressData"
  class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 rounded-2xl text-center"
>
  <RouterLink
    v-for="(score, game) in currentPlayerProgressData"
    :key="game"
    to="/StatisticsPage"
    class="flex items-center bg-gray-400/5 max-h-40"
  >
          <img :src="`Throphylvl${score > 4 ? 2 : 1}.jpg`" alt="Throphy Level" class="max-w-32 p-5" />

          <div class="p-5">
            <p class="text-2xl font-semibold tracking-tight text-gray-900">
              {{ game }}
            </p>


            <p class="text-3xl font-semibold leading-6 text-gray-600">
              {{ score }}
            </p>
          </div>
          </RouterLink>
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
      player: "User1"
    }
  },
  computed: {
    currentPlayerProgressData() {
      return this.data.Data && this.data.Data[this.player] ? this.data.Data[this.player].ProgressData : {};
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('/data.json');
        const Data = await response.json();
        this.data = Data; // Assuming 'Data' is the object structure you've shown
        console.log(this.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    },
    setPlayer1() {
      this.player = "User1";
    },
    setPlayer2() {
      this.player = "User2";
    },
  }
}
</script>
