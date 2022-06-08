<template>
  <div class="flex h-full w-72 flex-none flex-col bg-gray-100 p-4">
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
        <transition
          enter-active-class="duration-300 ease-out origin-center"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class=""
          leave-active-class="duration-100 ease-out origin-center"
          leave-from-class=""
          leave-to-class="transform opacity-0 -translate-y-2"
        >
          <DisclosurePanel as="ul" class="flex flex-col gap-y-2 text-gray-500">
            <router-link :to="{ name: 'Links' }" custom v-slot="{ navigate, isActive }">
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
            <router-link :to="{ name: 'Appearance' }" custom v-slot="{ navigate, isActive }">
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
        </transition>
      </Disclosure>
    </nav>
    <div class="mt-auto flex">
      <MockAvatar class="h-16 w-16 rounded-l-lg" />
      <div
        class="flex flex-1 flex-col justify-between truncate rounded-r-lg border-2 border-l-0 border-gray-200 px-4 py-2 leading-none"
      >
        <p class="truncate font-bold text-gray-500" :title="authStore.profile?.user_name">Hi! {{ authStore.profile?.user_name }}</p>
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
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
</script>

<style scoped></style>
