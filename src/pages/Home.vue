<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementBounding, useMouse, useScroll, useWindowSize } from '@vueuse/core'
import HeroiconsFireSolid from '~icons/heroicons/fire-solid'
import TablerBrandDiscord from '~icons/tabler/brand-discord'
import TablerBrandSpotify from '~icons/tabler/brand-spotify'
import TablerBrandInstagram from '~icons/tabler/brand-instagram'
import TablerBrandYoutube from '~icons/tabler/brand-youtube'
import HeroiconsLink16Solid from '~icons/heroicons/link-16-solid'
import TablerQrcode from '~icons/tabler/qrcode'
import IconMockAvatar from '@/assets/mock-avatar.svg'

const { width, height } = useWindowSize()
const { x, y } = useMouse({ touch: false })

const rootRef = ref<HTMLElement | null>(null)
const { y: scrollY } = useScroll(rootRef)

const section1Ref = ref<HTMLElement | null>(null)
const { height: section1Height } = useElementBounding(section1Ref)
const isSection1Visible = computed(() => {
  return scrollY.value < section1Height.value
})

const styleObject = computed(() => {
  if (!isSection1Visible.value) {
    return {
      transform: 'perspective(1200px) rotateY(0deg) rotateX(0deg)',
    }
  }
  const rotationX = (x.value - width.value / 2) / 25
  const rotationY = (height.value / 2 - y.value) / 30
  return {
    transform: `perspective(1200px) rotateY(${rotationX}deg) rotateX(${rotationY}deg)`,
  }
})
</script>

<template>
  <div ref="rootRef" class="before:pattern h-dvh snap-y overflow-auto before:absolute before:inset-0 before:-z-10 before:opacity-30">
    <div class="absolute inset-x-0 top-0 z-50 px-6 pt-10">
      <nav
        class="group container mx-auto flex gap-2 rounded-full px-6 py-2 font-bold transition-colors duration-300 sm:px-10 sm:py-3"
        :class="[isSection1Visible ? 'bg-brand-2' : 'is-white bg-white shadow']"
      >
        <a href="/" class="flex select-none items-center gap-1 text-white group-[.is-white]:text-brand-2">
          <HeroiconsFireSolid class="h-10 w-10" />
          <span class="mb-1 hidden text-3xl min-[480px]:block sm:text-4xl">BlazeLink</span>
        </a>
        <a href="/login" class="ml-auto rounded-full px-5 py-2 text-white transition hover:bg-white/20 group-[.is-white]:text-brand-2 group-[.is-white]:hover:bg-brand-2/20">
          登入
        </a>
        <a href="/register" class="rounded-full bg-white px-5 py-2 text-brand-2 transition hover:bg-white/90 group-[.is-white]:bg-brand-2 group-[.is-white]:text-white group-[.is-white]:hover:bg-brand-2/90">
          免費註冊
        </a>
      </nav>
    </div>
    <section ref="section1Ref" class="container mx-auto flex flex-col px-5 py-32 sm:px-10 lg:h-dvh lg:flex-row lg:pb-0 lg:pt-28">
      <div class="flex h-full flex-col items-center justify-center py-12 text-center lg:w-[55%] lg:items-start lg:py-0 lg:text-start">
        <h1 class="text-3xl font-black leading-none text-brand-2 min-[410px]:text-4xl min-[520px]:text-5xl min-[580px]:text-[54px] sm:text-6xl lg:text-[54px] xl:text-6xl 2xl:text-7xl">
          創建，分享，<br>都從這一個連結開始
        </h1>
        <h2 class="mt-6 text-lg font-bold leading-none text-brand-2 sm:text-xl lg:text-lg xl:text-xl 2xl:text-2xl">
          輕鬆管理多個社交媒體連結，BlazeLink讓你一鍵分享，將你在Instagram、Spotify、Twitter等地方的所有創意和資訊集中呈現。
        </h2>
        <a href="/register" class="mt-8 rounded-full bg-brand-2 px-8 py-3 font-bold text-white transition hover:brightness-95 xl:mt-12 xl:text-xl 2xl:text-2xl">
          開始使用
        </a>
      </div>
      <div class="relative flex origin-center items-center justify-center p-5 sm:p-10 xl:w-[45%]">
        <div class="preserve-3d h-[420px] max-h-[min(75%,_580px)] transition-transform duration-300 ease-out sm:h-[540px] lg:h-full" :style="styleObject">
          <p
            class="leading-0 absolute left-1/2 top-[5%] flex items-center whitespace-nowrap rounded-full bg-brand-1/20 px-4 py-0.5 text-gray-800 backdrop-blur-sm"
            :style="{ transform: 'translate(-50%, -50%) translateZ(25px)' }"
          >
            <HeroiconsLink16Solid class="mr-2 inline-block h-6 w-6" />
            blaze-link.vercel.app/<span class="relative before:absolute before:inset-x-0 before:bottom-0 before:-z-10 before:block before:h-1/3 before:-translate-y-1/2 before:bg-brand-3/70">Your Name</span>
          </p>
          <div class="preserve-3d flex aspect-[11/20] h-full flex-col gap-y-2 rounded-[32px] bg-green-200 px-4 pt-6 text-center font-bold text-gray-800/80 shadow-xl">
            <IconMockAvatar class="mx-auto h-16 w-16 rounded-full border-4 border-white" :style="{ transform: 'translateZ(10px)' }" />
            <p>@Your Name</p>
            <ul class="mt-2 flex flex-col gap-y-3 overflow-hidden" :style="{ transform: 'translateZ(25px)' }">
              <li class="cursor-pointer truncate rounded-full bg-white p-2 px-4 shadow hover:bg-gray-50">
                🧳 | New Travel Vlog
              </li>
              <li class="cursor-pointer truncate rounded-full bg-white p-2 px-4 shadow hover:bg-gray-50">
                🎧 | Listen on Spotify
              </li>
              <li class="cursor-pointer truncate rounded-full bg-white p-2 px-4 shadow hover:bg-gray-50">
                Instagram
              </li>
              <li class="cursor-pointer truncate rounded-full bg-white p-2 px-4 shadow hover:bg-gray-50">
                Twitter
              </li>
              <li class="cursor-pointer truncate rounded-full bg-white p-2 px-4 shadow hover:bg-gray-50">
                Discord Server
              </li>
            </ul>
          </div>
          <div
            class="social-block absolute left-[110%] top-[40%] flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-2 shadow-xl sm:h-32 sm:w-32 lg:h-28 lg:w-28 xl:h-32 xl:w-32"
            :style="{ transform: 'translate(-50%, -50%) translateZ(-35px)' }"
          >
            <TablerBrandSpotify class="h-12 w-12 text-white sm:h-16 sm:w-16" />
          </div>
          <div
            class="social-block absolute left-[0%] top-[70%] flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-1 shadow-xl sm:h-32 sm:w-32 lg:h-28 lg:w-28 xl:h-32 xl:w-32"
            :style="{ transform: 'translate(-50%, -50%) translateZ(70px)' }"
          >
            <TablerBrandDiscord class="h-12 w-12 text-white sm:h-16 sm:w-16" />
          </div>
          <div
            class="social-block absolute left-[100%] top-[99%] flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-3 shadow-xl sm:h-32 sm:w-32 lg:h-28 lg:w-28 xl:h-32 xl:w-32"
            :style="{ transform: 'translate(-50%, -50%) translateZ(35px)' }"
          >
            <TablerBrandInstagram class="h-12 w-12 text-white sm:h-16 sm:w-16" />
          </div>
          <div
            class="social-block absolute left-[75%] top-[85%] flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-4 shadow-xl sm:h-32 sm:w-32 lg:h-28 lg:w-28 xl:h-32 xl:w-32"
            :style="{ transform: 'translate(-50%, -50%) translateZ(70px)' }"
          >
            <TablerBrandYoutube class="h-12 w-12 text-white sm:h-16 sm:w-16" />
          </div>
        </div>
      </div>
    </section>
    <section class="bg-brand-2 pb-14 pt-40 md:snap-start lg:h-dvh">
      <div class="container mx-auto flex h-full flex-col gap-6 px-5 text-center max-lg:grid-rows-2 sm:grid sm:px-10 lg:grid-cols-2 xl:gap-12">
        <div class="flex flex-col gap-4 overflow-hidden rounded-xl bg-white p-5 shadow-lg sm:p-10">
          <h3 class="text-2xl font-bold text-brand-2">
            簡單管理，輕鬆分享
          </h3>
          <p class="text-lg text-gray-800">
            在管理頁面中，快速編輯你的連結。並將你的專屬頁面透過網址或是QRcode分享出去！
          </p>
          <div class="relative flex flex-1 flex-col-reverse items-center justify-center gap-3 xl:flex-row xl:gap-6">
            <div class="flex w-full max-w-72 select-none flex-col justify-stretch gap-3 rounded-lg bg-brand-4/80 p-6 shadow xl:flex-1">
              <div class="rounded-lg bg-brand-2 py-2 text-center font-bold text-white">
                新增連結
              </div>
              <div v-for="i in 3" :key="i" class="flex flex-col gap-2 rounded-lg bg-white p-3">
                <div class="h-3 w-2/3 rounded-full bg-brand-4/80" />
                <div class="h-3 w-full rounded-full bg-brand-4/80" />
              </div>
            </div>
            <div class="flex items-center gap-2 rounded-full bg-brand-2 p-1 pl-4 xl:flex-col xl:gap-0 xl:rounded-none xl:bg-transparent xl:p-0">
              <div class="z-10 cursor-pointer text-nowrap rounded-full font-bold text-white xl:bg-brand-2 xl:px-6 xl:py-4 xl:shadow-lg">
                blaze-link.vercel.app/you
              </div>
              <div class="select-none rounded-full bg-brand-4/80 p-2 font-bold text-brand-2 xl:-mt-2 xl:rounded-lg xl:p-6 xl:shadow-lg">
                <TablerQrcode class="h-6 w-6 text-brand-2 xl:h-32 xl:w-32" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="bg-white rounded-xl row-span-2 col-span-2 shadow-lg" /> -->
        <!-- <div class="bg-white rounded-xl row-span-2 col-start-2 col-span-2 shadow-lg" /> -->
        <div class="flex flex-col gap-4 rounded-xl bg-white p-5 text-center shadow-lg sm:p-10">
          <h3 class="text-2xl font-bold text-brand-2">
            展現個人特色
          </h3>
          <p class="text-lg text-gray-800">
            用獨特風格打造專屬頁面，透過個性化設計，營造屬於你的品牌氛圍！
          </p>
          <div class="flex flex-1 flex-col justify-center">
            <div class="grid grid-rows-2 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-3">
              <div class="flex flex-1 select-none flex-col gap-3 rounded-lg bg-brand-4/80 p-6 shadow">
                <div v-for="i in [3, 1]" :key="i" class="flex cursor-pointer flex-col gap-2 rounded-full bg-white p-5">
                  <div class="h-3 rounded-full bg-brand-4/80" :style="{ width: `${10 + 30 * i}%` }" />
                </div>
              </div>
              <div class="flex flex-1 select-none flex-col gap-3 rounded-lg bg-brand-4/80 p-6 shadow">
                <div v-for="i in [1, 2]" :key="i" class="flex cursor-pointer flex-col gap-2 rounded-md bg-brand-2/80 p-5">
                  <div class="h-3 rounded-full bg-brand-4/80" :style="{ width: `${15 + 20 * i}%` }" />
                </div>
              </div>
              <div class="flex flex-1 select-none flex-col gap-3 rounded-lg bg-brand-3/80 p-6 shadow">
                <div v-for="i in [2, 3]" :key="i" class="flex cursor-pointer flex-col gap-2 bg-white p-5 shadow-[4px_4px] shadow-gray-800">
                  <div class="h-3 rounded-full bg-brand-3/80" :style="{ width: `${5 + 30 * i}%` }" />
                </div>
              </div>
              <div class="hidden flex-1 select-none flex-col gap-3 rounded-lg bg-brand-2/80 p-6 shadow xl:flex">
                <div v-for="i in [2, 3]" :key="i" class="flex cursor-pointer flex-col gap-2 bg-white p-5 shadow-[4px_4px] shadow-gray-800">
                  <div class="h-3 rounded-full bg-brand-2/80" :style="{ width: `${15 + 25 * i}%` }" />
                </div>
              </div>
              <div class="flex flex-1 select-none flex-col gap-3 rounded-lg bg-brand-3/80 p-6 shadow">
                <div v-for="i in [2, 1]" :key="i" class="flex cursor-pointer flex-col gap-2 rounded-lg bg-white p-5 ring-4 ring-inset ring-brand-2">
                  <div class="h-3 rounded-full bg-brand-3/80" :style="{ width: `${5 + 30 * i}%` }" />
                </div>
              </div>
              <div class="hidden flex-1 cursor-pointer select-none flex-col gap-3 rounded-lg bg-brand-1/80 p-6 shadow xl:flex">
                <div v-for="i in [2, 3]" :key="i" class="flex flex-col gap-2 rounded-full bg-white p-5">
                  <div class="h-3 rounded-full bg-brand-1/80" :style="{ width: `${5 + 30 * i}%` }" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
