<script setup lang="ts"></script>

<template>
  <div class="text-center font-sans text-gray-700 antialias pt-5">
    <router-link
      class="font-bold text-gray-700"
      exact-active-class="text-green-500"
      :to="{ name: 'home' }"
      >Home</router-link
    >
    <router-view />
  </div>
</template>

<style scoped></style>
