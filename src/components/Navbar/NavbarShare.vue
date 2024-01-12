<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import QRCode from 'qrcode'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useAuthStore } from '@/store/auth'
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

async function generateQRCode() {
  await QRCode.toCanvas(canvasEl.value!, userLink.value, {
    width: 240,
    margin: 0,
  })
}

onMounted(async () => {
  await generateQRCode()
  watch(userLink, generateQRCode)
})

function copyUrl() {
  window.clearTimeout(timeoutId.value)
  navigator.clipboard.writeText(userLink.value)
  showCopied.value = true
  timeoutId.value = window.setTimeout(() => {
    showCopied.value = false
  }, 1500)
}

async function downloadQRCodePNG() {
  const link = document.createElement('a')
  link.download = 'BlazeLink_qrcode.png'
  link.href = await QRCode.toDataURL(userLink.value, {
    width: 240,
    margin: 2,
  })
  link.click()
}

async function downloadQRCodeSVG() {
  const svgString = await QRCode.toString(userLink.value, {
    type: 'svg',
    width: 240,
    margin: 2,
  })
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const link = document.createElement('a')
  link.download = 'BlazeLink_qrcode.svg'
  link.href = URL.createObjectURL(blob)
  link.click()
}
</script>

<template>
  <div class="ml-auto flex cursor-pointer items-center gap-2 rounded-full bg-brand-2/15 p-2 px-4 lg:rounded-lg" @click="copyUrl">
    <TablerShare class="h-6 w-6 text-brand-2" />
    <p class="hidden whitespace-nowrap text-sm font-medium text-gray-800 md:block lg:text-base">
      {{ userLink }}
    </p>
    <div class="rounded-full bg-white p-1.5">
      <Transition name="fade" mode="out-in">
        <TablerCopyCheck v-if="showCopied" class="h-5 w-5 text-brand-2" />
        <TablerCopy v-else class="h-5 w-5 text-gray-600" />
      </Transition>
    </div>
    <Popover v-slot="{ open }" class="relative" @click.stop>
      <PopoverButton as="template">
        <div class="rounded-full bg-white p-1.5">
          <TablerQrcode class="h-5 w-5 text-gray-600" />
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
        <PopoverPanel v-show="open" static class="absolute right-0 z-[100] mt-2 flex origin-top-right flex-col gap-2 rounded-md bg-white p-2 shadow max-[374px]:scale-[.8]">
          <canvas ref="canvasEl" class="h-60 w-60 cursor-default p-2" />
          <button class="flex items-center gap-2 rounded p-2 hover:bg-gray-200" @click="downloadQRCodePNG">
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
            <TablerDownload class="h-6 w-6 text-gray-700" />
          </button>
          <button class="flex items-center gap-2 rounded p-2 hover:bg-gray-200" @click="downloadQRCodeSVG">
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
            <TablerDownload class="h-6 w-6 text-gray-700" />
          </button>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

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
