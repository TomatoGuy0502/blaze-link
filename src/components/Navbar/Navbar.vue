<template>
  <div class="relative flex items-center gap-x-8 rounded-bl-2xl bg-gray-100 py-4 px-6">
    <h1 class="text-3xl font-bold text-gray-700">{{ $route.meta.headingChinese }}</h1>
    <div class="ml-auto flex gap-x-4">
      <!-- <ThemeToggle /> -->
      <div class="flex items-center bg-brand-2/15 p-2 px-4 rounded-lg gap-2 cursor-pointer" @click="copyUrl">
        <TablerShare class="text-brand-2 w-6 h-6" />
        <!-- <Transition name="fade" mode="out-in">
          <HeroiconsClipboardDocumentCheck20Solid class="w-6 h-6 text-brand-2" v-if="showCopied" />
          <HeroiconsLink20Solid class="text-gray-600 w-6 h-6" v-else />
        </Transition> -->
        <!-- <div class="w-[2px] bg-gray-400 rounded-full h-3/4"></div> -->
        <p class="text-gray-800 font-medium">http://localhost:8080/{{ authStore.userName }}</p>
        <div class="p-1.5 rounded-full bg-white">
          <Transition name="fade" mode="out-in">
            <TablerCopyCheck class="text-brand-2 w-5 h-5" v-if="showCopied" />
            <TablerCopy class="text-gray-600 w-5 h-5" v-else />
          </Transition>
        </div>
        <Popover v-slot="{ open }" class="relative" @click.stop>
          <PopoverButton as="template">
            <div class="p-1.5 rounded-full bg-white">
              <TablerQrcode class="text-gray-600 w-5 h-5" />
            </div>
          </PopoverButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <PopoverPanel static class="absolute flex flex-col gap-2 right-0 mt-2 z-[100] rounded-md shadow p-2 bg-white" v-show="open">
              <canvas ref="canvasEl" class="p-2 cursor-default"></canvas>
              <button @click="downloadQRCodePNG" class="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
                <div class="flex flex-col items-start">
                  <p class="font-bold text-gray-700">Download PNG</p>
                  <p class="text-sm text-gray-400">高清圖片</p>
                </div>
                <p class="ml-auto text-xs text-gray-400">.PNG</p>
                <TablerDownload class="w-6 h-6 text-gray-700" />
              </button>
              <button @click="downloadQRCodeSVG" class="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
                <div class="flex flex-col items-start">
                  <p class="font-bold text-gray-700">Download SVG</p>
                  <p class="text-sm text-gray-400">可縮放向量圖形</p>
                </div>
                <p class="ml-auto text-xs text-gray-400">.SVG</p>
                <TablerDownload class="w-6 h-6 text-gray-700" />
              </button>
            </PopoverPanel>
          </transition>
        </Popover>
        
      </div>
    </div>
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Avatar from './Avatar.vue'
import TablerShare from '~icons/tabler/share'
import TablerCopy from '~icons/tabler/copy'
import TablerCopyCheck from '~icons/tabler/copy-check'
import TablerQrcode from '~icons/tabler/qrcode'
import TablerDownload from '~icons/tabler/download'
import { useAuthStore } from '../../store/auth'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import QRCode from 'qrcode'

const authStore = useAuthStore()

const showCopied = ref(false)
const timeoutId = ref(0)
const canvasEl = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  await QRCode.toCanvas(canvasEl.value!, 'http://localhost:8080/Tomato', {
    width: 240,
    margin: 0
  })
})

const downloadQRCodePNG = () => {
  const link = document.createElement('a')
  link.download = 'qrcode.png'
  link.href = canvasEl.value!.toDataURL()
  link.click()
}
const downloadQRCodeSVG = async () => {
  const svgString = await QRCode.toString('http://localhost:8080/Tomato', {
    type: 'svg',
    width: 240,
    margin: 0
  })
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const link = document.createElement('a')
  link.download = 'qrcode.svg'
  link.href = URL.createObjectURL(blob)
  link.click()
}

const copyUrl = () => {
  window.clearTimeout(timeoutId.value)
  const url = `http://localhost:8080/${authStore.userName}`
  navigator.clipboard.writeText(url)
  showCopied.value = true
  timeoutId.value = window.setTimeout(() => {
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
