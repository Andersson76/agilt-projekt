<template>
  <Header />
  <Navbar />
  <div>
    <canvas ref="gameChartCanvas"></canvas>
  </div>
  <Footer />
</template>

<script setup>
import Header from './Header.vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const gameChartCanvas = ref(null);

onMounted(() => {
  // Retrieve gameStats from local storage
  const gameStats = JSON.parse(localStorage.getItem('gameStats'));
  console.log('gameStats:', gameStats); // Log the retrieved gameStats

  // Retrieve the active player
  const activePlayer = localStorage.getItem('activeplayer');

  // Extract data for the active player's progress
  const activePlayerProgress = gameStats.User1.ProgressData;
  console.log('activePlayerProgress:', activePlayerProgress); // Log the retrieved activePlayerProgress

  if (activePlayerProgress) {
    // Extract high scores for the active player's games
    const highScores = {};

    for (const game in activePlayerProgress) {
      if (activePlayerProgress.hasOwnProperty(game)) {

        console.log('Processing game:', game); // Log the current game being processed

        const scores = activePlayerProgress[game]?.score; // Ensure scores exists and is iterable
        if (scores && scores.length > 0) {

          console.log('Scores for', game, ':', scores); // Log the scores for the current game

          const maxScore = activePlayerProgress[game].Maxscore;
          const highScore = Math.max(...scores) / maxScore * 100; // Normalize to percentage
          highScores[game] = highScore;
        }
      }
    }

    console.log('High scores:', highScores); // Log the extracted high scores

    // Create a new Chart.js chart
    const ctx = gameChartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(highScores),
        datasets: [
          {
            label: 'High Scores',
            data: Object.values(highScores),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)','rgba(255, 206, 186, 0.2)'],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%'; // Append '%' to y-axis ticks
              }
            }
          }
        }
      }
    });
  }
});
</script>
