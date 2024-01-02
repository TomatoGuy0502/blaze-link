<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useAuthStore } from '../../store/auth'
import TablerShare from '~icons/tabler/share'
import TablerCopy from '~icons/tabler/copy'
import TablerCopyCheck from '~icons/tabler/copy-check'
import TablerQrcode from '~icons/tabler/qrcode'
import TablerDownload from '~icons/tabler/download'

const authStore = useAuthStore()

const showCopied = ref(false)
const timeoutId = ref(0)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const userLink = computed(() => `${window.location.origin}/${authStore.userName}`)

onMounted(async () => {
  await QRCode.toCanvas(canvasEl.value!, userLink.value, {
    width: 240,
    margin: 0,
  })
})

function copyUrl() {
  window.clearTimeout(timeoutId.value)
  navigator.clipboard.writeText(userLink.value)
  showCopied.value = true
  timeoutId.value = window.setTimeout(() => {
    showCopied.value = false
  }, 1500)
}

function downloadQRCodePNG() {
  const link = document.createElement('a')
  link.download = 'qrcode.png'
  link.href = canvasEl.value!.toDataURL()
  link.click()
}

async function downloadQRCodeSVG() {
  const svgString = await QRCode.toString(userLink.value, {
    type: 'svg',
    width: 240,
    margin: 0,
  })
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const link = document.createElement('a')
  link.download = 'qrcode.svg'
  link.href = URL.createObjectURL(blob)
  link.click()
}
</script>

<template>
  <div class="ml-auto flex items-center bg-brand-2/15 p-2 px-4 rounded-full lg:rounded-lg gap-2 cursor-pointer" @click="copyUrl">
    <TablerShare class="text-brand-2 w-6 h-6" />
    <p class="hidden md:block text-gray-800 font-medium whitespace-nowrap text-sm lg:text-base">
      {{ userLink }}
    </p>
    <div class="p-1.5 rounded-full bg-white">
      <Transition name="fade" mode="out-in">
        <TablerCopyCheck v-if="showCopied" class="text-brand-2 w-5 h-5" />
        <TablerCopy v-else class="text-gray-600 w-5 h-5" />
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
        <PopoverPanel v-show="open" static class="absolute flex flex-col gap-2 right-0 mt-2 z-[100] rounded-md shadow p-2 bg-white">
          <canvas ref="canvasEl" class="p-2 cursor-default" />
          <button class="flex items-center gap-2 p-2 rounded hover:bg-gray-200" @click="downloadQRCodePNG">
            <div class="flex flex-col items-start">
              <p class="font-bold text-gray-700">
                Download PNG
              </p>
              <p class="text-sm text-gray-400">
                高清圖片
              </p>
            </div>
            <p class="ml-auto text-xs text-gray-400">
              .PNG
            </p>
            <TablerDownload class="w-6 h-6 text-gray-700" />
          </button>
          <button class="flex items-center gap-2 p-2 rounded hover:bg-gray-200" @click="downloadQRCodeSVG">
            <div class="flex flex-col items-start">
              <p class="font-bold text-gray-700">
                Download SVG
              </p>
              <p class="text-sm text-gray-400">
                可縮放向量圖形
              </p>
            </div>
            <p class="ml-auto text-xs text-gray-400">
              .SVG
            </p>
            <TablerDownload class="w-6 h-6 text-gray-700" />
          </button>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>