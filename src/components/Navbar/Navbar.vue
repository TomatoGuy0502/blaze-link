<script setup lang="ts">
import NavbarAvatar from './NavbarAvatar.vue'
import NavbarShare from './NavbarShare.vue'
import HeroiconsFireSolid from '~icons/heroicons/fire-solid'
import IconCursorClick from '~icons/heroicons-solid/cursor-click'
import IconSparkles from '~icons/heroicons-solid/sparkles'

function handleNavigate(e: MouseEvent, navigate: () => void) {
  (e.target as HTMLLIElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  navigate()
}
</script>

<template>
  <div class="flex-wrap-reverse sm:flex-nowrap relative flex items-center gap-4 md:gap-x-8 xl:rounded-bl-2xl bg-gray-100 py-2 px-4 md:py-4 md:px-6">
    <HeroiconsFireSolid class="hidden sm:block xl:hidden text-brand-1 w-10 h-10 shrink-0" />
    <h1 class="hidden xl:block text-3xl font-bold text-gray-700">
      {{ $route.meta.headingChinese }}
    </h1>
    <ul class="grid grid-flow-col sm:flex xl:hidden gap-2 overflow-x-auto w-full sm:w-auto">
      <router-link v-slot="{ navigate, isActive }" :to="{ name: 'Links' }" custom>
        <li
          class="group flex justify-center cursor-pointer items-center gap-x-2 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1"
          :class="[isActive ? 'bg-brand-1/10 text-brand-1' : 'text-gray-500']"
          @click.self="handleNavigate($event, navigate)"
        >
          <IconCursorClick class="h-6 w-6 pointer-events-none" />
          <p class="flex items-center gap-x-2 text-lg font-bold leading-none pointer-events-none">
            編輯連結
          </p>
        </li>
      </router-link>
      <router-link v-slot="{ navigate, isActive }" :to="{ name: 'Appearance' }" custom>
        <li
          class="group flex justify-center cursor-pointer items-center gap-x-2 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1"
          :class="[isActive ? 'bg-brand-1/10 text-brand-1' : 'text-gray-500']"
          @click.self="handleNavigate($event, navigate)"
        >
          <IconSparkles class="h-6 w-6 pointer-events-none" />
          <p class="flex items-center gap-x-2 text-lg font-bold leading-none pointer-events-none">
            外觀
          </p>
        </li>
      </router-link>
    </ul>
    <HeroiconsFireSolid class="block sm:hidden text-brand-1 w-10 h-10 shrink-0" />
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
