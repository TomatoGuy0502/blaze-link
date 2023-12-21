<template>
  <Popover v-slot="{ open }" as="div" class="relative">
    <PopoverButton as="template">
      <IconMockAvatar class="h-12 w-12 cursor-pointer rounded-full ring-offset-2 ring-brand-2" :class="{ 'ring-2': open }" />
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
        class="absolute right-0 mt-2 w-80 z-[100] origin-top-right rounded-md bg-white p-1 shadow focus:outline-none"
      >
        <div class="mt-auto flex p-3 px-4 gap-2">
          <IconMockAvatar class="h-12 w-12 rounded-full" />
          <div class="flex flex-1 flex-col justify-center gap-2 truncate leading-none">
            <p class="truncate font-bold text-gray-500">@{{ authStore.profile?.user_name }}</p>
            <p class="text-gray-600 text-xs">http://localhost:8080/{{ authStore.userName }}</p>
          </div>
        </div>
        <button
          class="w-full rounded p-3 px-4 text-left hover:bg-brand-1/10 hover:text-brand-1 focus:bg-brand-1/10 focus:text-brand-1 flex items-center"
        >
          <IconsSettings class="h-6 w-6 cursor-pointer text-gray-500 mr-2" />
          <span>設定</span>
          <span class="inline-block text-sm ml-1">Setting</span>
        </button>
        <button
          @click="handleLogout"
          class="w-full rounded p-3 px-4 text-left hover:bg-brand-1/10 hover:text-brand-1 focus:bg-brand-1/10 focus:text-brand-1 flex items-center"
        >
          <IconLogout class="h-6 w-6 cursor-pointer text-gray-500 mr-2" />
          <span>登出</span>
          <span class="inline-block text-sm ml-1">Logout</span>
        </button>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import IconLogout from '~icons/akar-icons/sign-out'
import IconsSettings from '~icons/akar-icons/settings-horizontal'
import IconMockAvatar from '@/assets/mock-avatar.svg'
import { useConfirmModal } from '../../composables/useConfirmModal'
import { useAuthStore } from '../../store/auth'

const { openModal } = useConfirmModal()
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  openModal(
    async () => {
      await authStore.logout()
      router.push({ name: 'Login' })
    },
    {
      title: '登出',
      description: '確定要登出嗎？',
      confirm: '登出',
      cancel: '取消'
    }
  )
}
</script>

<style></style>
