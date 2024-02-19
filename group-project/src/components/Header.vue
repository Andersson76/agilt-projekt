<template>
  <Disclosure as="nav" class="bg-headerGreen" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="absolute inset-y-0 left-0 flex items-center sm:hidden"
        ></div>
        <div class="flex flex-1 items-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-8 w-auto" src="/LVL.png" alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <h1 class="font-Jua text-3xl">LEVL</h1>
          </div>
        </div>
        <div
          class="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <p class="">{{ userStatus }}</p>
          <HeaderMenu
            @loginStatusChanged="handleLoginStatusChanged"
            class="ml-8"
          ></HeaderMenu>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure } from "@headlessui/vue";
import HeaderMenu from "./HeaderMenu.vue";
import { ref } from "vue";

const userStatus = ref("");

const handleLoginStatusChanged = (isLoggedIn) => {
  userStatus.value = isLoggedIn ? "User is logged in" : "User is logged out";
};
</script>
