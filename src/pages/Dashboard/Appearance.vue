<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-hidden rounded-t-2xl bg-gray-100 py-4 px-6">
    <h2 class="text-xl font-bold text-gray-400">Themes</h2>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const title = useTitle('Appearance | BlazeLink')
</script>

<style scoped></style>
