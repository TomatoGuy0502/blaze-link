<template>
  <Menu as="div" class="relative">
    <MenuButton as="template">
      <IconMockAvatar class="h-12 w-12 cursor-pointer rounded-full" />
    </MenuButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-1 shadow focus:outline-none"
      >
        <MenuItem v-slot="{ active }">
          <button
            :class="{ 'bg-brand-1/10 text-brand-1': active }"
            class="w-full rounded p-2 text-left hover:bg-brand-1/10 hover:text-brand-1 focus:bg-brand-1/10 focus:text-brand-1 flex items-center"
          >
            <IconsSettings class="h-6 w-6 cursor-pointer text-gray-500 mr-2" />
            <span>設定</span>
            <span class="inline-block text-sm">Setting</span>
          </button>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <button
            @click="handleLogout"
            :class="{ 'bg-brand-1/10 text-brand-1': active }"
            class="w-full rounded p-2 text-left hover:bg-brand-1/10 hover:text-brand-1 focus:bg-brand-1/10 focus:text-brand-1 flex items-center"
          >
            <IconLogout class="h-6 w-6 cursor-pointer text-gray-500 mr-2" />
            <span>登出</span>
            <span class="inline-block text-sm">Logout</span>
          </button>
        </MenuItem>
        
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
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
