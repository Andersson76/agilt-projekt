<template>
  <div class="bg-white">
    <div class="py-0 sm:py-1  xl:mx-auto xl:max-w-7xl xl:px-0">
      <!-- <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
        <a href="#" class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
          Browse all categories
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div> -->

      <div class="flow-root">
        <div>
          <div class="relative box-content h-56 overflow-x-auto xl:overflow-visible">
            <div class="absolute flex space-x-1 sm:px-1 lg:px-1 xl:relative xl:grid xl:grid-cols-6 xl:gap-x-1 xl:space-x-0 xl:px-0">
              <a v-for="category in categories" :key="category.name" :href="category.href" class="relative flex h-56 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto">

                <span aria-hidden="true" class="absolute inset-0">
                  <img :src="category.imageSrc" alt="" class="h-full w-full object-cover object-center" />
                </span>

                <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
                <span class="relative mt-auto text-center text-xl font-bold text-black bg-headerGreen rounded-lg">{{ category.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="mt-6 px-4 sm:hidden">
        <a href="#" class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
          Browse all categories
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    name: 'Adventure',
    href: '#',
    imageSrc: 'public/category1.jpg',
  },
  {
    name: 'Puzzle',
    href: '#',
    imageSrc: 'public/category11.jpg',
  },
  {
    name: 'Logic',
    href: '#',
    imageSrc: 'public/category1111.jpg',
  },
  {
    name: 'Sport',
    href: '#',
    imageSrc: 'public/category111.jpg',
  },
  { name: 'Math', href: '#', imageSrc: 'public/calc.jpg' },
  {
    name: 'All Games',
    href: '#',
    imageSrc: 'public/nvey the concept .png',
  },
]
</script>
