<template>
  <!-- class="correct" -->
  <div id="content-wrapper">
    <div class="container">
      <div id="question-container" class="hide">
        <div id="question">Question</div>
        <div id="answer-buttons" class="btn-grid">
          <button
            type="button"
            class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Answer 1
          </button>
          <button
            type="button"
            class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Answer 2
          </button>
          <button
            type="button"
            class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Answer 3
          </button>
          <button
            type="button"
            class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Answer 4
          </button>
        </div>
      </div>
      <div class="controls">
        <button id="start-btn" class="start-btn btn">Start</button>
        <button id="next-btn" class="next-btn btn hide">Next</button>
      </div>
    </div>
  </div>
</template>

<script></script>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
  }

  :root {
    --hue-neutral: 200;
    --hue-wrong: 0;
    --hue-correct: 145;
  }

  #content-wrapper {
    --hue: var(--hue-neutral);
    width: 100vw;
    height: 100vh;

    margin: 0;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: hsl(var(--hue), 100%, 20%);
  }

  #content-wrapper.correct {
    --hue: var(--hue-correct);
  }

  #content-wrapper.wrong {
    --hue: var(--hue-wrong);
  }

  .container {
    width: 800px;
    max-width: 80%;
    background-color: white;
    border-radius: 5px;
    padding: 12px;
    box-shadow: 0 0 10px 2px;
  }

  .btn-grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    margin: 20px 0;
  }
</style>
