<template>
  <div class="pattern flex h-screen flex-col items-center justify-center">
    <div class="flex flex-col items-center gap-y-4 rounded-xl bg-white/90 p-6 text-center shadow-md">
      <template v-if="!!authStore.userName">
        <div class="flex items-center gap-x-2 text-4xl font-bold text-brand-2">
          <IconCheck />
          <h1>Authorized</h1>
        </div>
        <p class="text-2xl font-medium text-gray-500">Redirecting...</p>
      </template>
      <template v-else>
        <h1 class="text-4xl font-bold text-brand-2">Last step</h1>
        <p class="text-gray-400 -mt-2">Input your name</p>
        <label
          for="name"
          class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
        >
          <IconEmojiHappy class="h-5 w-5 shrink-0 text-gray-400 group-focus-within:text-brand-2" />
          <p class="shrink-0 overflow-hidden text-gray-400 transition-all group-focus-within:text-brand-2">
            {{ location.origin + '/' }}
          </p>
          <input
            class="shrink-1 -ml-2 w-full bg-transparent font-medium transition-[width] autofill:bg-clip-text focus:outline-none"
            type="text"
            placeholder="Your Name"
            id="name"
            v-model="name"
            autocomplete="off"
          />
        </label>
        <div class="flex flex-col w-full gap-y-1">
          <button
            class="w-full rounded-lg bg-brand-2 py-2 text-white transition hover:bg-brand-2/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            :disabled="isLoading"
            @click="handleSubmit"
          >
            {{ isLoading ? 'Loading' : 'Finish' }}
          </button>
          <p v-if="error" class="text-red-400 font-semibold">{{ error }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBrowserLocation } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import IconCheck from '~icons/heroicons-outline/check-circle'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const router = useRouter()
const location = useBrowserLocation()

const name = ref('')
const isLoading = ref(false)
const error = ref('')

if (!authStore.isLoggedIn) router.push({ name: 'Login' })

// FIXME: 頁面讀取完畢時，username不一定讀取到了，要確認他們的順序
watch(() => authStore.userName, (userName) => {
  if (!userName) router.push({ name: 'Links' })
}, { immediate: true })

const handleSubmit = async () => {
  if (isLoading.value || !name.value) return

  isLoading.value = true
  const userExists = await authStore.isUserExists(name.value)
  if (userExists) {
    error.value = 'Username already exists'
    isLoading.value = false
    return
  }
  await authStore.updateUsername(name.value)
  router.push({ name: 'Links' })
}
</script>

<style scoped>
.pattern {
  background-image: url('@/assets/pattern.svg');
}
</style>
