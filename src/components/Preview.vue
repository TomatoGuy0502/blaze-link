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
        <div class="h-full w-full rounded-[40px] bg-brand-4 p-3 pt-8 truncate">
          <IconMockAvatar class="h-16 w-16 rounded-full mx-auto mb-6 border-white border-4" />
          <ul class="flex flex-col gap-y-4 text-center font-bold">
            <li v-for="link in validLinks" :key="link.id">
              <a :href="link.url" class="block p-2 border-2 rounded-md border-white text-white transition hover:bg-brand-3/60" target="_blank">{{ link.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLinksStore } from '../store/links'
import IconMockAvatar from '@/assets/mock-avatar.svg'

const store = useLinksStore()
const { validLinks } = storeToRefs(store)
</script>

<style></style>
