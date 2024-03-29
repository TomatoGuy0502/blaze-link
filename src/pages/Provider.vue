<script setup lang="ts">
import { useBrowserLocation } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { preservedIds } from '@/router'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import IconCheck from '~icons/heroicons-outline/check-circle'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const location = useBrowserLocation()

const name = ref('')
const isLoading = ref(false)
const error = ref('')

// 狀況：
// 1. 還沒登入，然後帶著access_token來到這個頁面 => 正常，檢查是否有username
if (!authStore.isLoggedIn && isValidHash(route.hash)) {
  // console.log('還沒登入，然後帶著access_token來到這個頁面')
  watch(
    () => authStore.isLoggedIn,
    (isLoggedIn) => {
      // console.log('isLoggedIn:', isLoggedIn)
      if (isLoggedIn) {
        // access_token是對的 => 檢查是否有userName
        watch(
          () => authStore.userName,
          (userName) => {
            // console.log('userName:', userName)
            if (userName) {
              // console.log('已經有userName了，正常跳轉')
              router.push({ name: 'Links' })
            }
            else {
              // console.log('還沒有取過userName，留在這個頁面')
            }
          },
        )
      }
      else {
        // FIXME: 要如何檢查access_token是錯的？
        // console.log('access_token是錯的')
        router.push({ name: 'Login' })
      }
    },
  )
}
// 2. 還沒登入，然後沒事來到這個頁面 => 跳轉到Login頁面
if (!authStore.isLoggedIn && !isValidHash(route.hash)) {
  // console.log('還沒登入，然後沒事來到這個頁面')
  router.push({ name: 'Login' })
}
// 3. 已經登入(authStore.isLoggedIn===true)
if (authStore.isLoggedIn) {
  watch(
    () => authStore.userName,
    (userName) => {
      // console.log('userName:', userName)
      if (userName) {
        // console.log('已經登入，然後沒事來到這個頁面')
        router.push({ name: 'Links' })
      }
      else {
        // console.log('已經登入，但還沒有username')
      }
    },
  )
}

async function handleSubmit() {
  if (isLoading.value || !name.value)
    return

  isLoading.value = true
  if (preservedIds.includes(name.value.toLowerCase())) {
    error.value = 'Username not available'
    isLoading.value = false
    return
  }
  const userExists = await authStore.isUserExists(name.value)
  if (userExists) {
    error.value = 'Username already exists'
    isLoading.value = false
    return
  }
  await authStore.updateUsername(name.value)
  await authStore.createTheme(name.value)
  router.push({ name: 'Links' })
}

function isValidHash(hash: string) {
  const params = new URLSearchParams(hash.slice(1))
  const accessToken = params.get('access_token')
  const expiresAt = params.get('expires_at')
  const expiresIn = params.get('expires_in')
  const refreshToken = params.get('refresh_token')
  const providerToken = params.get('provider_token')
  const tokenType = params.get('token_type')

  if (!accessToken || !expiresAt || !expiresIn || !refreshToken || !providerToken || !tokenType)
    return false

  return true
}
</script>

<template>
  <div class="pattern flex h-dvh flex-col items-center justify-center">
    <div class="flex flex-col items-center gap-y-4 rounded-xl bg-white/90 p-6 text-center shadow-md">
      <template v-if="!!authStore.userName">
        <div class="flex items-center gap-x-2 text-4xl font-bold text-brand-2">
          <IconCheck />
          <h1>登入成功</h1>
        </div>
        <p class="ext-gray-500 text-2xl font-medium">
          重新導向中
          <span class="inline-block animate-bounce">.</span>
          <span class="inline-block animate-bounce animation-delay-[50ms]">.</span>
          <span class="inline-block animate-bounce animation-delay-100">.</span>
        </p>
        <p class="text-lg text-gray-500">
          或是
          <router-link to="/dashboard/links" class="underline">
            {{ "點擊此處" }}
          </router-link>
          重新導向
        </p>
      </template>
      <template v-else>
        <h1 class="text-4xl font-bold text-brand-2">
          最後一步
        </h1>
        <p class="-mt-2 text-gray-400">
          輸入你的使用者名稱
        </p>
        <label
          for="name"
          class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
        >
          <IconEmojiHappy class="h-5 w-5 shrink-0 text-gray-400 group-focus-within:text-brand-2" />
          <p class="shrink-0 overflow-hidden text-gray-400 transition-all group-focus-within:text-brand-2">
            {{ `${location.origin}/` }}
          </p>
          <input
            id="name"
            v-model="name"
            class="shrink-1 -ml-2 w-full bg-transparent font-medium transition-[width] autofill:bg-clip-text focus:outline-none"
            type="text"
            placeholder="使用者名稱 Username"
            autocomplete="off"
          >
        </label>
        <div class="flex w-full flex-col gap-y-1">
          <button
            class="w-full rounded-lg bg-brand-2 py-2 text-white transition hover:bg-brand-2/90 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
            :disabled="isLoading"
            @click="handleSubmit"
          >
            {{ isLoading ? '處理中...' : '完成' }}
          </button>
          <p v-if="error" class="font-semibold text-red-400">
            {{ error }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.pattern {
  background-image: url('@/assets/pattern.svg');
}
</style>
