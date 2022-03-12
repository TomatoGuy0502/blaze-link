<template>
  <div class="pattern flex h-screen flex-col items-center justify-center">
    <div class="flex flex-col items-center gap-y-12 rounded-xl bg-white p-8 text-center shadow-md">
      <div class="flex items-center gap-x-4 text-5xl font-bold text-brand-2">
        <IconCheck />
        <h1>Authorized</h1>
      </div>
      <Rocket class="w-[400px] opacity-90" />
      <p class="text-2xl font-medium text-gray-500">Redirecting...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { debouncedWatch } from '@vueuse/core'
import { useRouter } from 'vue-router'
import IconCheck from '~icons/heroicons-outline/check-circle'
import { useAuthStore } from '../store/auth'
import Rocket from '@/assets/rocket.svg'

const authStore = useAuthStore()
const router = useRouter()
debouncedWatch(
  () => authStore.isLoggedIn,
  (isLoggedIn) => isLoggedIn && router.push({ name: 'Links' }),
  { debounce: 1000, immediate: true }
)
</script>

<style scoped>
.pattern {
  background-image: url('@/assets/pattern.svg');
}
</style>
