<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-white">
    <div class="py-0 sm:py-1 xl:mx-auto xl:max-w-7xl xl:px-0">

      <div class="flow-root">
        <div>
          <div
            class="relative box-content h-40 lg:h-56 overflow-x-auto xl:overflow-visible"
          >
            <div
              class="absolute flex space-x-1 sm:px-1 lg:px-1 xl:relative xl:grid xl:grid-cols-6 xl:gap-x-1 xl:space-x-0 xl:px-0"
            >
              <RouterLink
                v-for="category in categories"
                :key="category.name"
                :to="`/${category.href}`"
                class="relative flex h-40 w-40 lg:h-56 lg:w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
              >
                <span aria-hidden="true" class="absolute inset-0">
                  <img
                    :src="category.imageSrc"
                    alt=""
                    class="h-full w-full object-cover object-center"
                  />
                </span>

                <span
                  aria-hidden="true"
                  class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                />
                <span
                  class="relative mt-auto text-center text-xl font-bold text-black bg-headerGreen rounded-lg"
                  >{{ category.name }}</span
                >
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
  const categories = [
    {
      name: 'Divisible Wizard',
      href: 'Adventure',
      imageSrc: 'category1.jpg'
    },

    {
      name: 'Quizzy Time',
      href: 'BergsQuiz',
      imageSrc: 'category1111.jpg'
    },
    { name: 'Math Master',
    href: 'Andersson',
    imageSrc: 'calc.jpg' },
    {
      name: 'Treasure Math Hunt',
      href: 'MathTreasure',
      imageSrc: 'nvey the concept .png'
    },
    {
      name: 'Product Box',
      href: 'ProductBox',
      imageSrc: 'hem.png'
    },
    {
      name: 'Why Levl',
      href: 'why',
      imageSrc: 'category111.jpg'
    }
  ]
</script>
