<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-hidden rounded-t-2xl bg-gray-100 py-4 px-6">
    <h3 class="text-xl font-bold text-gray-400">Color</h3>
    <ul class="flex flex-wrap gap-6 rounded-xl bg-white p-6">
      <li
        v-for="(itemClass, color) in colors"
        :key="color"
        class="flex rounded-xl ring-offset-2 transition-all"
        :class="`${itemClass} ${selectedColor === color && 'ring'}`"
      >
        <button class="h-20 w-20 font-bold" @click="changeColor(color)">{{ color }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'
import { useTempColors } from '../../composables/useTempColors'

const title = useTitle('Appearance | BlazeLink')

const { colors, changeColor, selectedColor } = useTempColors()
</script>

<style scoped></style>
