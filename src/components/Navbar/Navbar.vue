<script setup lang="ts">
import NavbarAvatar from './NavbarAvatar.vue'
import NavbarShare from './NavbarShare.vue'
import HeroiconsFireSolid from '~icons/heroicons/fire-solid'
import IconCursorClick from '~icons/heroicons-solid/cursor-click'
import IconSparkles from '~icons/heroicons-solid/sparkles'
import HeroiconsUserCircleSolid from '~icons/heroicons/user-circle-solid'

function handleNavigate(e: MouseEvent, navigate: () => void) {
  (e.target as HTMLLIElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  navigate()
}
</script>

<template>
  <div class="relative flex flex-wrap-reverse items-center gap-4 bg-gray-100 px-4 py-2 sm:flex-nowrap md:gap-x-8 md:px-6 md:py-4 xl:rounded-bl-2xl">
    <HeroiconsFireSolid class="hidden h-10 w-10 shrink-0 text-brand-1 sm:block xl:hidden" />
    <h1 class="hidden text-3xl font-bold text-gray-700 xl:block">
      {{ $route.meta.headingChinese }}
    </h1>
    <ul class="grid w-full grid-flow-col grid-cols-2 gap-2 overflow-x-auto sm:flex sm:w-auto xl:hidden">
      <router-link v-slot="{ navigate, isActive }" :to="{ name: 'Links' }" custom>
        <li
          class="group flex cursor-pointer items-center justify-center gap-x-2 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1"
          :class="[isActive ? 'bg-brand-1/10 text-brand-1' : 'text-gray-500']"
          @click.self="handleNavigate($event, navigate)"
        >
          <IconCursorClick class="pointer-events-none h-6 w-6" />
          <p class="pointer-events-none flex items-center gap-x-2 text-lg font-bold leading-none">
            編輯連結
          </p>
        </li>
      </router-link>
      <router-link v-slot="{ navigate, isActive }" :to="{ name: 'Appearance' }" custom>
        <li
          class="group flex cursor-pointer items-center justify-center gap-x-2 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1"
          :class="[isActive ? 'bg-brand-1/10 text-brand-1' : 'text-gray-500']"
          @click.self="handleNavigate($event, navigate)"
        >
          <IconSparkles class="pointer-events-none h-6 w-6" />
          <p class="pointer-events-none flex items-center gap-x-2 text-lg font-bold leading-none">
            外觀
          </p>
        </li>
      </router-link>
      <router-link v-slot="{ navigate, isActive }" :to="{ name: 'Profile' }" custom>
        <li
          class="group hidden cursor-pointer items-center justify-center gap-x-2 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1 sm:flex"
          :class="[isActive ? 'bg-brand-1/10 text-brand-1' : 'text-gray-500']"
          @click.self="handleNavigate($event, navigate)"
        >
          <HeroiconsUserCircleSolid class="pointer-events-none h-6 w-6" />
          <p class="pointer-events-none flex items-center gap-x-2 text-lg font-bold leading-none">
            用戶設定
          </p>
        </li>
      </router-link>
    </ul>
    <HeroiconsFireSolid class="block h-10 w-10 shrink-0 text-brand-1 sm:hidden" />
    <NavbarShare />
    <NavbarAvatar />
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
