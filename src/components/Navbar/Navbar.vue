<template>
  <div class="relative flex items-center gap-x-8 rounded-bl-2xl bg-gray-100 py-4 px-6">
    <h1 class="text-3xl font-bold text-gray-700">{{ $route.meta.headingChinese }} {{ $route.name }}</h1>
    <div class="ml-auto flex gap-x-4">
      <div class="relative">
        <IconBell class="h-12 w-12 cursor-pointer p-2 text-gray-500" />
        <span class="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-500/90"></span>
      </div>
      <ThemeToggle />
    </div>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import Avatar from './Avatar.vue'
import IconBell from '~icons/heroicons-outline/bell/'
import ThemeToggle from './ThemeToggle.vue';
</script>

<style lang="scss" scoped></style>
