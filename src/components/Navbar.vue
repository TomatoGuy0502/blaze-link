<template>
  <div class="py-4 px-8 flex items-center gap-x-8">
    <h1 class="text-3xl font-bold text-gray-900">{{ $route.meta.headingChinese }} {{ $route.name }}</h1>
    <div class="flex gap-x-4 ml-auto">
      <div class="relative">
        <IconBell class="w-12 h-12 text-gray-500 p-2 cursor-pointer" />
        <span class="absolute h-3 w-3 top-2 right-2 rounded-full bg-red-500/90"></span>
      </div>
      <IconAdjustments class="w-12 h-12 text-gray-500 p-2 cursor-pointer" />
    </div>
    <IconMockAvatar class="rounded-full w-12 h-12" />
  </div>
</template>

<script setup lang="ts">
import IconAdjustments from '~icons/heroicons-outline/adjustments/'
import IconBell from '~icons/heroicons-outline/bell/'
import IconMockAvatar from '@/assets/mock-avatar.svg'
</script>

<style lang="scss" scoped>

</style>