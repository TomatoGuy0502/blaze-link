<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import { useConfirmModal } from '../../composables/useConfirmModal'
import { useAuthStore } from '../../store/auth'
import TablerLogout from '~icons/tabler/logout'
import IconMockAvatar from '@/assets/mock-avatar.svg'
import TablerUserCircle from '~icons/tabler/user-circle'

const { openModal } = useConfirmModal()
const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  openModal(
    async () => {
      await authStore.logout()
      router.push({ name: 'Login' })
    },
    {
      title: '登出',
      description: '確定要登出嗎？',
      confirm: '登出',
      cancel: '取消',
    },
  )
}
</script>

<template>
  <Popover v-slot="{ open }" as="div" class="relative shrink-0">
    <PopoverButton class="block outline-none">
      <img v-if="authStore.avatarSrc" :src="authStore.avatarSrc" alt="User avatar" class="h-12 w-12 cursor-pointer rounded-full ring-brand-2 ring-offset-2" :class="{ 'ring-2': open }">
      <IconMockAvatar v-else class="h-12 w-12 cursor-pointer rounded-full ring-brand-2 ring-offset-2" :class="{ 'ring-2': open }" />
    </PopoverButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <PopoverPanel
        v-slot="{ close }"
        class="absolute right-0 z-[100] mt-2 w-80 origin-top-right rounded-md bg-white p-1 shadow focus:outline-none max-[374px]:w-72"
      >
        <div class="mt-auto flex gap-2 p-3 px-4">
          <img v-if="authStore.avatarSrc" :src="authStore.avatarSrc" alt="User avatar" class="h-12 w-12 rounded-full">
          <IconMockAvatar v-else class="h-12 w-12 rounded-full" />
          <div class="flex flex-1 flex-col justify-center gap-2 truncate leading-none">
            <p class="truncate font-bold text-gray-500">
              @{{ authStore.profile?.user_name }}
            </p>
            <p class="truncate text-xs text-gray-600">
              {{ authStore.user?.email }}
            </p>
          </div>
        </div>
        <router-link
          :to="{ name: 'Profile' }"
          class="flex w-full items-center rounded p-3 px-4 text-left hover:bg-brand-1/10 hover:text-brand-1 focus:bg-brand-1/10 focus:text-brand-1 sm:hidden"
          @click="close"
        >
          <TablerUserCircle class="mr-2 h-6 w-6 cursor-pointer text-gray-500" />
          <span>用戶設定</span>
          <span class="ml-1 inline-block text-sm">Profile</span>
        </router-link>
        <button
          class="flex w-full items-center rounded p-3 px-4 text-left hover:bg-brand-1/10 hover:text-brand-1 focus:bg-brand-1/10 focus:text-brand-1"
          @click="handleLogout"
        >
          <TablerLogout class="mr-2 h-6 w-6 cursor-pointer text-gray-500" />
          <span>登出</span>
          <span class="ml-1 inline-block text-sm">Logout</span>
        </button>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<style></style>
