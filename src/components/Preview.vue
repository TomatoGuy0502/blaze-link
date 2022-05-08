<template>
  <div
    class="flex h-full min-w-[360px] max-w-[360px] flex-grow-0 flex-col gap-y-4 rounded-tl-2xl bg-gray-100 py-4 px-6"
  >
    <h2 class="text-xl font-bold text-gray-400">Preview</h2>
    <div class="flex flex-1 items-center">
      <div
        class="relative aspect-[13/25] max-h-[600px] w-full rounded-[50px] border-4 border-brand-2 bg-black p-2 before:absolute before:top-36 before:left-full before:z-10 before:h-16 before:w-2 before:rounded-r-md before:bg-brand-2"
      >
        <div
          class="absolute inset-x-1/2 top-0 mx-auto h-8 w-[150px] -translate-x-1/2 rounded-b-2xl bg-black before:absolute before:inset-1/2 before:h-1.5 before:w-10 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-md before:bg-gray-800 after:absolute after:inset-y-1/2 after:right-8 after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-gray-800"
        ></div>
        <div
          class="h-full w-full overflow-auto truncate rounded-[40px] px-1 pt-6 transition scrollbar-hide"
          :class="backgroundColors[selectedBackgroundColor]"
        >
          <div class="h-full overflow-auto py-4 px-2 scrollbar-hide">
            <IconMockAvatar class="mx-auto mb-6 h-16 w-16 rounded-full border-4 border-white" />
            <ul class="flex flex-col gap-y-4 text-center font-bold">
              <li v-for="link in validLinks" :key="link.id">
                <a
                  :href="link.url"
                  class="block truncate border-2 p-2 px-4 transition-all duration-300"
                  :class="buttonClass"
                  target="_blank"
                  >{{ link.title }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLinksStore } from '../store/links'
import IconMockAvatar from '@/assets/mock-avatar.svg'
import { useAppearance } from '../composables/useAppearance'
import { computed } from 'vue'

const store = useLinksStore()
const { validLinks } = storeToRefs(store)

const {
  backgroundColors,
  selectedBackgroundColor,
  buttonColors,
  selectedButtonColor,
  selectedRadius,
  selectedShadow,
  filled
} = useAppearance()

const buttonClass = computed(() => {
  return [
    selectedRadius.value,
    selectedShadow.value,
    filled.value ? 
      buttonColors[selectedButtonColor.value] : 
      buttonColors[selectedButtonColor.value].match(/((?<!:)border-\S+)|(text-\S+)/g)!.join(' ')
  ]
})
</script>

<style></style>
