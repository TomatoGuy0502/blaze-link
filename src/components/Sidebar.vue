<template>
  <div class="flex flex-col h-full p-4 bg-gray-50 w-72">
    <IconBrand class="w-48 mx-auto mb-8 fill-brand-1" />
    <nav>
      <Disclosure defaultOpen v-slot="{ open }">
        <DisclosureButton
          as="h2"
          class="flex items-center justify-between mb-4 text-xl font-bold text-gray-700 cursor-pointer"
        >
          <span>Pages</span>
          <IconChevronDown
            class="w-8 h-8 transition"
            :class="[!open && 'transform rotate-180']"
          />
        </DisclosureButton>
        <DisclosurePanel as="ul" class="flex flex-col text-gray-500 gap-y-2">
          <router-link to="/links" custom v-slot="{ navigate, isActive }">
            <li
              class="flex items-center p-3 transition rounded-lg cursor-pointer gap-x-4 group hover:bg-brand-1/10 hover:text-brand-1"
              :class="[isActive && 'bg-brand-1/10 text-brand-1']"
              @click="navigate"
            >
              <IconCursorClick class="w-6 h-6" />
              <p
                class="flex items-center text-lg font-bold leading-none gap-x-2"
              >
                連結<span class="inline-block text-base font-normal"
                  >Links</span
                >
              </p>
            </li>
          </router-link>
          <router-link to="/appearance" custom v-slot="{ navigate, isActive }">
            <li
              class="flex items-center p-3 transition rounded-lg cursor-pointer gap-x-4 group hover:bg-brand-1/10 hover:text-brand-1"
              :class="[isActive && 'bg-brand-1/10 text-brand-1']"
              @click="navigate"
            >
              <IconSparkles class="w-6 h-6" />
              <p
                class="flex items-center text-lg font-bold leading-none gap-x-2"
              >
                外觀<span class="inline-block text-base font-normal"
                  >Appearance</span
                >
              </p>
            </li>
          </router-link>
        </DisclosurePanel>
      </Disclosure>
    </nav>
    <div class="flex mt-auto">
      <IconMockAvatar class="w-16 h-16 rounded-l-lg" />
      <div
        class="flex flex-col justify-between flex-1 px-4 py-2 leading-none border-2 border-l-0 border-gray-200 rounded-r-lg"
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
import IconMockAvatar from '@/assets/mock-avatar.svg'
import IconCursorClick from '~icons/heroicons-solid/cursor-click/'
import IconSparkles from '~icons/heroicons-solid/sparkles'
import IconChevronDown from '~icons/heroicons-solid/chevron-down/'
</script>

<style scoped></style>
