<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import IconCursorClick from '~icons/heroicons-solid/cursor-click/'
import IconSparkles from '~icons/heroicons-solid/sparkles'
import IconChevronDown from '~icons/heroicons-solid/chevron-down/'
import HeroiconsFireSolid from '~icons/heroicons/fire-solid'
import HeroiconsUserCircleSolid from '~icons/heroicons/user-circle-solid'
</script>

<template>
  <div class="hidden h-full w-72 flex-none flex-col bg-gray-100 p-4 xl:flex">
    <p class="mx-auto mb-8 flex select-none items-center gap-1">
      <HeroiconsFireSolid class="h-10 w-10 text-brand-1" />
      <span class="mb-1 inline-block  text-4xl font-bold text-brand-1">Blaze Link</span>
    </p>
    <nav>
      <Disclosure v-slot="{ open }" default-open>
        <DisclosureButton
          as="h2"
          class="mb-4 flex cursor-pointer items-center justify-between text-xl font-bold text-gray-700"
        >
          <span>導覽列</span>
          <IconChevronDown class="h-8 w-8 transition" :class="[!open && 'rotate-180 transform']" />
        </DisclosureButton>
        <transition
          enter-active-class="duration-300 ease-out origin-center"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class=""
          leave-active-class="duration-100 ease-out origin-center"
          leave-from-class=""
          leave-to-class="transform opacity-0 -translate-y-2"
        >
          <DisclosurePanel as="ul" class="flex flex-col gap-y-2 text-gray-500">
            <router-link v-slot="{ navigate, isActive }" :to="{ name: 'Links' }" custom>
              <li
                class="group flex cursor-pointer items-center gap-x-4 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1"
                :class="[isActive && 'bg-brand-1/10 text-brand-1']"
                @click="navigate"
              >
                <IconCursorClick class="h-6 w-6" />
                <p class="flex items-center gap-x-2 text-lg font-bold leading-none">
                  編輯連結<span class="inline-block text-base font-normal">Links</span>
                </p>
              </li>
            </router-link>
            <router-link v-slot="{ navigate, isActive }" :to="{ name: 'Appearance' }" custom>
              <li
                class="group flex cursor-pointer items-center gap-x-4 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1"
                :class="[isActive && 'bg-brand-1/10 text-brand-1']"
                @click="navigate"
              >
                <IconSparkles class="h-6 w-6" />
                <p class="flex items-center gap-x-2 text-lg font-bold leading-none">
                  外觀<span class="inline-block text-base font-normal">Appearance</span>
                </p>
              </li>
            </router-link>
            <router-link v-slot="{ navigate, isActive }" :to="{ name: 'Profile' }" custom>
              <li
                class="group flex cursor-pointer items-center gap-x-4 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1"
                :class="[isActive && 'bg-brand-1/10 text-brand-1']"
                @click="navigate"
              >
                <HeroiconsUserCircleSolid class="h-6 w-6" />
                <p class="flex items-center gap-x-2 text-lg font-bold leading-none">
                  用戶設定<span class="inline-block text-base font-normal">Profile</span>
                </p>
              </li>
            </router-link>
          </DisclosurePanel>
        </transition>
      </Disclosure>
    </nav>
  </div>
</template>

<style scoped></style>
