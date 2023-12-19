<template>
  <div class="relative flex items-center gap-x-8 rounded-bl-2xl bg-gray-100 py-4 px-6">
    <h1 class="text-3xl font-bold text-gray-700">{{ $route.meta.headingChinese }}</h1>
    <div class="ml-auto flex gap-x-4">
      <!-- <ThemeToggle /> -->
      <div class="flex items-center bg-gray-200 p-2 px-4 rounded-lg gap-2 cursor-copy" @click="copyUrl">
        <Transition name="fade" mode="out-in">
          <HeroiconsClipboardDocumentCheck20Solid class="w-6 h-6 text-brand-2" v-if="showCopied" />
          <HeroiconsLink20Solid class="text-gray-600 w-6 h-6" v-else />
        </Transition>
        <div class="w-[2px] bg-gray-400 rounded-full h-full"></div>
        <p class="text-gray-600 font-medium">http://localhost:8080/Tomato</p>
      </div>
    </div>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Avatar from './Avatar.vue'
import ThemeToggle from './ThemeToggle.vue'
import HeroiconsLink20Solid from '~icons/heroicons/link-20-solid'
import HeroiconsClipboardDocumentCheck20Solid from '~icons/heroicons/clipboard-document-check-20-solid'

const showCopied = ref(false)

const copyUrl = () => {
  const url = 'http://localhost:8080/Tomato'
  navigator.clipboard.writeText(url)
  showCopied.value = true
  setTimeout(() => {
    showCopied.value = false
  }, 1500)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
