<template>
  <div class="pattern flex h-screen items-center justify-center">
    <h1 class="rounded-xl bg-white p-6 py-8 text-center text-6xl font-bold text-gray-800 shadow-xl">Redirecting</h1>
  </div>
</template>

<script setup lang="ts">
import { debouncedWatch } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const router = useRouter()
debouncedWatch(
  () => authStore.isLoggedIn,
  (isLoggedIn) => isLoggedIn && router.push({ name: 'Links' }),
  { debounce: 1000 }
)
</script>

<style scoped>
.pattern {
  background-image: url('@/assets/pattern.svg');
}
</style>
