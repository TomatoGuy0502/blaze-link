<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import IconSun from '~icons/akar-icons/sun-fill/'
import IconMoon from '~icons/akar-icons/moon-fill/'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    class="relative inline-flex items-center self-center rounded-full py-1.5 px-2 text-slate-400 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    :class="
      isDark
        ? 'bg-slate-700 text-cyan-400 focus-visible:ring-slate-500'
        : 'bg-cyan-500 text-cyan-200 focus-visible:ring-cyan-600'
    "
    type="button"
    @click="() => toggleDark()"
  >
    <IconSun
      class="h-6 w-6 transform transition-transform"
      :class="isDark ? 'scale-100 duration-300' : 'scale-0 duration-500'"
    />
    <IconMoon
      class="ml-3.5 h-6 w-6 transform transition-transform"
      :class="isDark ? 'scale-0 duration-500' : 'scale-100 duration-300'"
    />
    <span
      class="absolute top-0.5 left-0.5 flex h-8 w-8 transform items-center justify-center rounded-full bg-white transition duration-500"
      :class="isDark ? 'translate-x-[2.625rem]' : ''"
    >
      <IconSun
        class="h-6 w-6 flex-none transform text-cyan-500 transition duration-500"
        :class="isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100'"
      />
      <IconMoon
        class="-ml-6 h-6 w-6 flex-none transform text-slate-700 transition duration-500"
        :class="isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
      />
    </span>
  </button>
</template>

<style scoped></style>
