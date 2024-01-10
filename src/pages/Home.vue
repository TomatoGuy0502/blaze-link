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
  <div ref="rootRef" class="h-dvh overflow-auto snap-y before:pattern before:inset-0 before:absolute before:opacity-30 before:-z-10">
    <div class="absolute top-0 inset-x-0 pt-10 px-6 z-50">
      <nav
        class="container mx-auto px-6 py-2 sm:px-10 sm:py-3 rounded-full flex gap-2 font-bold transition-colors duration-300 group"
        :class="[isSection1Visible ? 'bg-brand-2' : 'bg-white is-white shadow']"
      >
        <a href="/" class="flex items-center gap-1 select-none text-white group-[.is-white]:text-brand-2">
          <HeroiconsFireSolid class="w-10 h-10" />
          <span class="text-3xl sm:text-4xl mb-1 hidden min-[480px]:block">BlazeLink</span>
        </a>
        <a href="/login" class="transition ml-auto rounded-full text-white hover:bg-white/20 group-[.is-white]:text-brand-2 group-[.is-white]:hover:bg-brand-2/20 px-5 py-2">
          登入
        </a>
        <a href="/register" class="transition rounded-full bg-white text-brand-2 hover:bg-white/90 group-[.is-white]:bg-brand-2 group-[.is-white]:text-white group-[.is-white]:hover:bg-brand-2/90 px-5 py-2">
          免費註冊
        </a>
      </nav>
    </div>
    <section ref="section1Ref" class="container mx-auto lg:h-dvh py-32 lg:pb-0 lg:pt-28 px-5 sm:px-10 flex flex-col lg:flex-row">
      <div class="flex flex-col lg:w-[55%] h-full justify-center lg:items-start text-center lg:text-start items-center py-12 lg:py-0">
        <h1 class="text-3xl min-[410px]:text-4xl min-[520px]:text-5xl min-[580px]:text-[54px] sm:text-6xl lg:text-[54px] xl:text-6xl 2xl:text-7xl font-black text-brand-2 leading-none">
          創建，分享，<br>都從這一個連結開始
        </h1>
        <h2 class="text-lg sm:text-xl lg:text-lg xl:text-xl 2xl:text-2xl mt-6 font-bold text-brand-2 leading-none">
          輕鬆管理多個社交媒體連結，BlazeLink讓你一鍵分享，將你在Instagram、Spotify、Twitter等地方的所有創意和資訊集中呈現。
        </h2>
        <a href="/register" class="mt-8 xl:mt-12 transition rounded-full bg-brand-2 text-white px-8 py-3 xl:text-xl 2xl:text-2xl font-bold hover:brightness-95">
          開始使用
        </a>
      </div>
      <div class="p-5 sm:p-10 xl:w-[45%] relative flex items-center justify-center origin-center">
        <div class="max-h-[min(75%,_580px)] h-[420px] sm:h-[540px] lg:h-full preserve-3d transition-transform ease-out duration-300" :style="styleObject">
          <p
            class="absolute top-[5%] left-1/2 flex items-center whitespace-nowrap px-4 py-0.5 rounded-full bg-brand-1/20 backdrop-blur-sm text-gray-800 leading-0"
            :style="{ transform: 'translate(-50%, -50%) translateZ(25px)' }"
          >
            <HeroiconsLink16Solid class="w-6 h-6 inline-block mr-2" />
            blaze-link.vercel.app/<span class="relative before:-z-10 before:absolute before:inset-x-0 before:bottom-0 before:-translate-y-1/2 before:block before:h-1/3 before:bg-brand-3/70">Your Name</span>
          </p>
          <div class="flex flex-col gap-y-2 h-full rounded-[32px] shadow-xl aspect-[11/20] bg-green-200 pt-6 px-4 text-center text-gray-800/80 font-bold preserve-3d">
            <IconMockAvatar class="mx-auto h-16 w-16 rounded-full border-4 border-white" :style="{ transform: 'translateZ(10px)' }" />
            <p>@Your Name</p>
            <ul class="flex flex-col gap-y-3 mt-2 overflow-hidden" :style="{ transform: 'translateZ(25px)' }">
              <li class="p-2 px-4 bg-white rounded-full shadow cursor-pointer hover:bg-gray-50 truncate">
                🧳 | New Travel Vlog
              </li>
              <li class="p-2 px-4 bg-white rounded-full shadow cursor-pointer hover:bg-gray-50 truncate">
                🎧 | Listen on Spotify
              </li>
              <li class="p-2 px-4 bg-white rounded-full shadow cursor-pointer hover:bg-gray-50 truncate">
                Instagram
              </li>
              <li class="p-2 px-4 bg-white rounded-full shadow cursor-pointer hover:bg-gray-50 truncate">
                Twitter
              </li>
              <li class="p-2 px-4 bg-white rounded-full shadow cursor-pointer hover:bg-gray-50 truncate">
                Discord Server
              </li>
            </ul>
          </div>
          <div
            class="social-block absolute w-20 h-20 sm:w-32 sm:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center rounded-2xl bg-brand-2 top-[40%] left-[110%] shadow-xl"
            :style="{ transform: 'translate(-50%, -50%) translateZ(-35px)' }"
          >
            <TablerBrandSpotify class="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          <div
            class="social-block absolute w-20 h-20 sm:w-32 sm:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center rounded-2xl bg-brand-1 top-[70%] left-[0%] shadow-xl"
            :style="{ transform: 'translate(-50%, -50%) translateZ(70px)' }"
          >
            <TablerBrandDiscord class="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          <div
            class="social-block absolute w-20 h-20 sm:w-32 sm:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center rounded-2xl bg-brand-3 top-[99%] left-[100%] shadow-xl"
            :style="{ transform: 'translate(-50%, -50%) translateZ(35px)' }"
          >
            <TablerBrandInstagram class="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          <div
            class="social-block absolute w-20 h-20 sm:w-32 sm:h-32 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center rounded-2xl bg-brand-4 top-[85%] left-[75%] shadow-xl"
            :style="{ transform: 'translate(-50%, -50%) translateZ(70px)' }"
          >
            <TablerBrandYoutube class="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
        </div>
      </div>
    </section>
    <section class="md:snap-start lg:h-dvh pb-14 pt-40 bg-brand-2">
      <div class="container mx-auto px-5 sm:px-10 h-full flex flex-col sm:grid max-lg:grid-rows-2 lg:grid-cols-2 gap-6 xl:gap-12 text-center">
        <div class="bg-white rounded-xl shadow-lg p-5 sm:p-10 flex flex-col gap-4 overflow-hidden">
          <h3 class="font-bold text-brand-2 text-2xl">
            簡單管理，輕鬆分享
          </h3>
          <p class="text-gray-800 text-lg">
            在管理頁面中，快速的編輯你的連結。並將你的專屬頁面透過網址或是QRcode分享出去！
          </p>
          <div class="flex relative items-center justify-center gap-3 xl:gap-6 flex-1 flex-col-reverse xl:flex-row">
            <div class="xl:flex-1 bg-brand-4/80 rounded-lg p-6 flex flex-col justify-stretch gap-3 select-none shadow max-w-72 w-full">
              <div class="bg-brand-2 text-center font-bold py-2 text-white rounded-lg">
                新增連結
              </div>
              <div v-for="i in 3" :key="i" class="flex flex-col gap-2 p-3 bg-white rounded-lg">
                <div class="w-2/3 h-3 bg-brand-4/80 rounded-full" />
                <div class="w-full h-3 bg-brand-4/80 rounded-full" />
              </div>
            </div>
            <div class="flex xl:flex-col items-center rounded-full bg-brand-2 p-1 pl-4 gap-2 xl:gap-0 xl:p-0 xl:rounded-none xl:bg-transparent">
              <div class="text-nowrap xl:py-4 xl:px-6 rounded-full text-white xl:bg-brand-2 font-bold cursor-pointer xl:shadow-lg z-10">
                blaze-link.vercel.app/you
              </div>
              <div class="p-2 xl:p-6 rounded-full xl:rounded-lg bg-brand-4/80 text-brand-2 font-bold select-none xl:shadow-lg xl:-mt-2">
                <TablerQrcode class="w-6 h-6 xl:w-32 xl:h-32 text-brand-2" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="bg-white rounded-xl row-span-2 col-span-2 shadow-lg" /> -->
        <!-- <div class="bg-white rounded-xl row-span-2 col-start-2 col-span-2 shadow-lg" /> -->
        <div class="bg-white rounded-xl shadow-lg p-5 sm:p-10 flex flex-col gap-4 text-center">
          <h3 class="font-bold text-brand-2 text-2xl">
            展現個人特色
          </h3>
          <p class="text-gray-800 text-lg">
            用獨特風格打造專屬頁面，透過個性化設計，營造屬於你的品牌氛圍！
          </p>
          <div class="flex-1 flex flex-col justify-center">
            <div class="grid min-[480px]:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-3">
              <div class="flex-1 bg-brand-4/80 rounded-lg p-6 flex flex-col gap-3 select-none shadow">
                <div v-for="i in [3, 1]" :key="i" class="flex flex-col gap-2 py-5 px-5 bg-white rounded-full cursor-pointer">
                  <div class="h-3 bg-brand-4/80 rounded-full" :style="{ width: `${10 + 30 * i}%` }" />
                </div>
              </div>
              <div class="flex-1 bg-brand-4/80 rounded-lg p-6 flex flex-col gap-3 select-none shadow">
                <div v-for="i in [1, 2]" :key="i" class="flex flex-col gap-2 py-5 px-5 bg-brand-2/80 rounded-md cursor-pointer">
                  <div class="h-3 bg-brand-4/80 rounded-full" :style="{ width: `${15 + 20 * i}%` }" />
                </div>
              </div>
              <div class="flex-1 bg-brand-3/80 rounded-lg p-6 flex flex-col gap-3 select-none shadow">
                <div v-for="i in [2, 3]" :key="i" class="flex flex-col gap-2 py-5 px-5 bg-white shadow-[4px_4px] shadow-gray-800 cursor-pointer">
                  <div class="h-3 bg-brand-3/80 rounded-full" :style="{ width: `${5 + 30 * i}%` }" />
                </div>
              </div>
              <div class="flex-1 bg-brand-2/80 rounded-lg p-6 flex-col gap-3 select-none shadow hidden xl:flex">
                <div v-for="i in [2, 3]" :key="i" class="flex flex-col gap-2 py-5 px-5 bg-white shadow-[4px_4px] shadow-gray-800 cursor-pointer">
                  <div class="h-3 bg-brand-2/80 rounded-full" :style="{ width: `${15 + 25 * i}%` }" />
                </div>
              </div>
              <div class="flex-1 bg-brand-3/80 rounded-lg p-6 flex-col gap-3 select-none shadow flex">
                <div v-for="i in [2, 1]" :key="i" class="flex flex-col gap-2 py-5 px-5 bg-white ring-4 ring-inset ring-brand-2 rounded-lg cursor-pointer">
                  <div class="h-3 bg-brand-3/80 rounded-full" :style="{ width: `${5 + 30 * i}%` }" />
                </div>
              </div>
              <div class="flex-1 bg-brand-1/80 rounded-lg p-6 flex-col gap-3 select-none shadow cursor-pointer hidden xl:flex">
                <div v-for="i in [2, 3]" :key="i" class="flex flex-col gap-2 py-5 px-5 bg-white rounded-full">
                  <div class="h-3 bg-brand-1/80 rounded-full" :style="{ width: `${5 + 30 * i}%` }" />
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
