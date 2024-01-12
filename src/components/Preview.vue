<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useLinksStore } from '@/store/links'
import { useAppearance } from '@/composables/useAppearance'
import { useAuthStore } from '@/store/auth'
import IconMockAvatar from '@/assets/mock-avatar.svg'
import TablerLoader from '~icons/tabler/loader'
import TablerExternalLink from '~icons/tabler/external-link'
import TablerPlaystationX from '~icons/tabler/playstation-x'
import TablerDeviceMobile from '~icons/tabler/device-mobile'

const { userName, avatarSrc } = storeToRefs(useAuthStore())
const { validLinks } = storeToRefs(useLinksStore())
const { width: windowWidth } = useWindowSize()
const userLink = computed(() => `${window.location.origin}/${userName.value}`)

const { backgroundColors, selectedBackgroundColor, buttonClass, isLoading } = useAppearance()
const showPreview = ref(false)
</script>

<template>
  <div class="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
    <div v-show="!showPreview" class="bottom-8 flex items-center gap-2 rounded-full border-2 border-brand-3/50 bg-brand-3/10 px-4 py-2 font-bold leading-none shadow-md backdrop-blur-sm backdrop-filter sm:p-6 sm:py-3" @click="showPreview = true">
      <TablerDeviceMobile class="h-5 w-5 sm:h-6 sm:w-6" />Preview
    </div>
  </div>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-show="windowWidth >= 768 || showPreview"
      class="flex flex-shrink-0 flex-grow-0 flex-col gap-y-4 rounded-tl-2xl bg-gray-100 px-6 py-4 max-md:absolute max-md:inset-x-1/2 max-md:bottom-0 max-md:top-20 max-md:h-auto max-md:w-full max-md:-translate-x-1/2 max-md:rounded-t-2xl max-md:bg-white/50 max-md:ring-4 max-md:ring-inset max-md:ring-brand-3/50 max-md:backdrop-blur-sm max-md:backdrop-filter max-sm:top-36 md:flex md:h-full md:w-[308px] lg:w-[334px] xl:w-[360px]"
    >
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-bold text-gray-700 md:text-gray-400">
          Preview
        </h2>
        <a :href="userLink" target="_blank">
          <TablerExternalLink class="h-6 w-6 text-gray-700 md:text-gray-400" />
        </a>
        <TablerPlaystationX class="ml-auto h-6 w-6 text-gray-700 md:hidden" @click="showPreview = false" />
      </div>
      <div class="-m-1 flex flex-1 items-center justify-center overflow-hidden">
        <div
          class="relative flex aspect-[13/25] h-full max-h-[500px] rounded-[42px] border-4 border-brand-2 bg-black p-2 before:absolute before:left-full before:top-1/4 before:z-10 before:h-[10%] before:w-2 before:rounded-r-md before:bg-brand-2 lg:max-h-[550px] lg:rounded-[46px] xl:max-h-[600px] xl:rounded-[50px]"
        >
          <div
            class="absolute inset-x-1/2 top-0 z-50 mx-auto h-8 w-1/2 -translate-x-1/2 rounded-b-2xl bg-black before:absolute before:inset-1/2 before:h-1.5 before:w-1/4 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-md before:bg-gray-800 after:absolute after:inset-y-1/2 after:right-[20%] after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:bg-gray-800"
          />
          <div
            class="relative w-full overflow-auto truncate rounded-[32px] px-1 transition scrollbar-hide lg:rounded-[36px] xl:rounded-[40px]"
            :class="backgroundColors[selectedBackgroundColor]"
          >
            <Transition name="fade">
              <div v-if="!isLoading" class="h-full overflow-auto px-2 py-4 pt-10 scrollbar-hide">
                <img v-if="avatarSrc" :src="avatarSrc" alt="User avatar" class="mx-auto mb-5 h-14 w-14 rounded-full border-4 border-white xl:mb-6 xl:h-16 xl:w-16">
                <IconMockAvatar v-else class="mx-auto mb-5 h-14 w-14 rounded-full border-4 border-white xl:mb-6 xl:h-16 xl:w-16" />
                <ul class="flex flex-col gap-y-3 text-center font-bold xl:gap-y-4">
                  <li v-for="link in validLinks" :key="link.id">
                    <a
                      :href="link.url"
                      class="block truncate border-4 p-2 px-4 transition-all duration-300"
                      :class="buttonClass"
                      target="_blank"
                    >{{ link.title }}</a>
                  </li>
                </ul>
              </div>
              <div v-else class="absolute inset-0 grid place-items-center bg-gray-100">
                <TablerLoader class="h-8 w-8 animate-[spin_1.5s_linear_infinite]" />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(-20px);
}
</style>
