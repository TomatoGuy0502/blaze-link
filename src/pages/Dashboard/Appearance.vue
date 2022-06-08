<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-auto rounded-t-2xl bg-gray-100 py-4 px-6 scrollbar-hide">
    <div>
      <h3 class="mb-4 text-xl font-bold text-gray-400">Background Color</h3>
      <ul class="relative grid grid-cols-[repeat(auto-fit,_minmax(48px,_1fr))] gap-4 rounded-xl bg-white p-6">
        <li
          v-for="(_, color) in backgroundColors"
          :key="color"
          class="grid h-12 cursor-pointer place-items-center rounded-xl font-bold ring-offset-2 transition-all"
          :class="`${buttonColors[color]} ${selectedBackgroundColor === color && 'ring'}`"
          @click="changeBackgroundColor(color)"
        ></li>
        <Transition name="fade">
          <div class="absolute inset-0 overflow-hidden rounded-xl bg-gray-100" v-if="isLoading">
            <div class="h-full w-full animate-pulse bg-gray-200"></div>
          </div>
        </Transition>
      </ul>
    </div>
    <div>
      <h3 class="mb-4 text-xl font-bold text-gray-400">Button Type</h3>
      <SwitchGroup as="div" class="relative inline-flex flex-row items-center gap-x-2 rounded-xl bg-white p-6">
        <SwitchLabel
          class="flex flex-col items-center gap-x-2 transition"
          :class="isFilled ? 'text-gray-800' : 'text-gray-400'"
          ><IconsSquareFill />Filled</SwitchLabel
        >
        <Switch
          v-model="isFilled"
          :class="isFilled ? 'bg-teal-900' : 'bg-teal-700'"
          class="relative h-10 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent ring-teal-400/75 ring-offset-2 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2"
        >
          <span class="sr-only"> Filled or Outlined</span>
          <span
            :class="isFilled ? 'translate-x-0' : 'translate-x-10'"
            class="pointer-events-none absolute top-0.5 left-0.5 h-8 w-8 transform rounded-full bg-white transition duration-300 ease-in-out"
          />
        </Switch>
        <SwitchLabel
          class="flex flex-col items-center gap-x-2 transition"
          :class="isFilled ? 'text-gray-400' : 'text-gray-800'"
        >
          <IconsSquare />Outlined</SwitchLabel
        >
        <Transition name="fade">
          <div class="absolute inset-0 overflow-hidden rounded-xl bg-gray-100" v-if="isLoading">
            <div class="h-full w-full animate-pulse bg-gray-200"></div>
          </div>
        </Transition>
      </SwitchGroup>
    </div>
    <div>
      <h3 class="mb-4 text-xl font-bold text-gray-400">Button Color</h3>
      <ul class="relative grid grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] gap-4 rounded-xl bg-white p-6">
        <li
          v-for="(itemClass, color) in buttonColors"
          :key="color"
          class="grid h-12 cursor-pointer place-items-center rounded-xl font-bold ring-offset-2 transition-all"
          :class="`${itemClass} ${selectedButtonColor === color && 'ring'}`"
          @click="changeButtonColor(color)"
        >
          {{ color }}
        </li>
        <Transition name="fade">
          <div class="absolute inset-0 overflow-hidden rounded-xl bg-gray-100" v-if="isLoading">
            <div class="h-full w-full animate-pulse bg-gray-200"></div>
          </div>
        </Transition>
      </ul>
    </div>
    <div>
      <h3 class="mb-4 text-xl font-bold text-gray-400">Corner</h3>
      <ul class="relative grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-6 rounded-xl bg-white p-6">
        <li
          v-for="radius in radiusList"
          :key="radius"
          class="grid h-20 cursor-pointer place-items-center rounded-xl p-4 font-bold ring-offset-2 transition-all"
          :class="`${buttonColors[selectedBackgroundColor]} ${selectedRadius === radius && 'ring'}`"
          @click="changeRadius(radius)"
        >
          <button
            class="h-10 w-full border-2 border-gray-800 transition-all"
            :class="[radius, selectedShadow]"
          ></button>
        </li>
        <Transition name="fade">
          <div class="absolute inset-0 overflow-hidden rounded-xl bg-gray-100" v-if="isLoading">
            <div class="h-full w-full animate-pulse bg-gray-200"></div>
          </div>
        </Transition>
      </ul>
    </div>
    <div>
      <h3 class="mb-4 text-xl font-bold text-gray-400">Shadow</h3>
      <ul class="relative grid grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))] gap-6 rounded-xl bg-white p-6">
        <li
          v-for="shadow in shadowList"
          :key="shadow"
          class="grid h-20 cursor-pointer place-items-center rounded-xl p-4 font-bold ring-offset-2 transition-all"
          :class="[buttonColors[selectedBackgroundColor], selectedShadow === shadow && 'ring']"
          @click="changeShadow(shadow)"
        >
          <button
            class="h-10 w-full border-2 border-gray-800 transition-all"
            :class="[selectedRadius, shadow]"
          ></button>
        </li>
        <Transition name="fade">
          <div class="absolute inset-0 overflow-hidden rounded-xl bg-gray-100" v-if="isLoading">
            <div class="h-full w-full animate-pulse bg-gray-200"></div>
          </div>
        </Transition>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import IconsSquare from '~icons/akar-icons/square'
import IconsSquareFill from '~icons/akar-icons/square-fill'
import { useAppearance } from '../../composables/useAppearance'

useTitle('Appearance | BlazeLink')

const {
  buttonColors,
  selectedButtonColor,
  changeButtonColor,
  backgroundColors,
  changeBackgroundColor,
  selectedBackgroundColor,
  radiusList,
  selectedRadius,
  changeRadius,
  shadowList,
  selectedShadow,
  changeShadow,
  isFilled,
  isLoading
} = useAppearance()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
