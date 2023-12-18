<template>
  <div class="relative flex items-center gap-x-8 rounded-bl-2xl bg-gray-100 py-4 px-6">
    <h1 class="text-3xl font-bold text-gray-700">{{ $route.meta.headingChinese }} {{ $route.name }}</h1>
    <div class="ml-auto flex gap-x-4">
      <ThemeToggle />
    </div>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import Avatar from './Avatar.vue'
import ThemeToggle from './ThemeToggle.vue';
</script>

<style lang="scss" scoped></style>
