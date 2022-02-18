<template>
  <div class="relative flex items-center gap-x-8 rounded-bl-2xl bg-gray-100 py-4 px-6">
    <h1 class="text-3xl font-bold text-gray-700">{{ $route.meta.headingChinese }} {{ $route.name }}</h1>
    <div class="ml-auto flex gap-x-4">
      <div class="relative">
        <IconBell class="h-12 w-12 cursor-pointer p-2 text-gray-500" />
        <span class="absolute top-2 right-2 h-3 w-3 rounded-full bg-red-500/90"></span>
      </div>
      <IconAdjustments class="h-12 w-12 cursor-pointer p-2 text-gray-500" />
    </div>
    <IconMockAvatar class="h-12 w-12 rounded-full" />
  </div>
</template>

<script setup lang="ts">
import IconAdjustments from '~icons/heroicons-outline/adjustments/'
import IconBell from '~icons/heroicons-outline/bell/'
import IconMockAvatar from '@/assets/mock-avatar.svg'
</script>

<style lang="scss" scoped></style>
