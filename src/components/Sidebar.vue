<template>
  <div class="flex h-full w-72 flex-col bg-gray-100 p-4">
    <IconBrand class="mx-auto mb-8 w-48 fill-brand-1" />
    <nav>
      <Disclosure defaultOpen v-slot="{ open }">
        <DisclosureButton
          as="h2"
          class="mb-4 flex cursor-pointer items-center justify-between text-xl font-bold text-gray-700"
        >
          <span>Pages</span>
          <IconChevronDown class="h-8 w-8 transition" :class="[!open && 'rotate-180 transform']" />
        </DisclosureButton>
        <DisclosurePanel as="ul" class="flex flex-col gap-y-2 text-gray-500">
          <router-link to="/links" custom v-slot="{ navigate, isActive }">
            <li
              class="group flex cursor-pointer items-center gap-x-4 whitespace-nowrap rounded-lg p-3 transition hover:bg-brand-1/10 hover:text-brand-1"
              :class="[isActive && 'bg-brand-1/10 text-brand-1']"
              @click="navigate"
            >
              <IconCursorClick class="h-6 w-6" />
              <p class="flex items-center gap-x-2 text-lg font-bold leading-none">
                連結<span class="inline-block text-base font-normal">Links</span>
              </p>
            </li>
          </router-link>
          <router-link to="/appearance" custom v-slot="{ navigate, isActive }">
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
        </DisclosurePanel>
      </Disclosure>
    </nav>
    <div class="mt-auto flex">
      <MockAvatar class="h-16 w-16 rounded-l-lg" />
      <div
        class="flex flex-1 flex-col justify-between rounded-r-lg border-2 border-l-0 border-gray-200 px-4 py-2 leading-none"
      >
        <p class="font-bold text-gray-500">Hi! TomatoGuy</p>
        <p class="font-bold text-gray-400">ID: 1234567</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import IconBrand from '@/assets/brand-white.svg'
import MockAvatar from '@/assets/mock-avatar.svg'
import IconCursorClick from '~icons/heroicons-solid/cursor-click/'
import IconSparkles from '~icons/heroicons-solid/sparkles'
import IconChevronDown from '~icons/heroicons-solid/chevron-down/'
</script>

<style scoped></style>
