<template>
  <div class="pattern flex h-screen items-center justify-center">
    <div class="flex w-[420px] flex-col gap-y-3 rounded-xl bg-white p-6 py-8 text-center text-gray-800 shadow-xl">
      <h1 class="text-3xl font-bold">Getting Started</h1>
      <p class="text-gray-400">Create an account to continue!</p>
      <button
        class="flex w-full items-center justify-center gap-x-2 rounded-lg bg-gray-100 p-2 font-medium text-gray-500 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        @click="loginWithGoogle()"
      >
        <IconGoogle />
        Sign Up with Google
      </button>
      <div class="relative flex h-6 items-center">
        <hr class="w-full" />
        <p class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 bg-white px-2">or</p>
      </div>
      <form class="flex flex-col gap-4" @submit.prevent="register">
        <label
          for="email"
          class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
        >
          <IconAtSymbol class="h-5 w-5 text-gray-400 group-focus-within:text-brand-2" />
          <input
            class="w-full font-medium autofill:bg-clip-text focus:outline-none"
            type="text"
            placeholder="Your Email"
            id="email"
            v-model="formData.email"
          />
        </label>
        <label
          for="name"
          class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
        >
          <IconEmojiHappy class="h-5 w-5 shrink-0 text-gray-400 group-focus-within:text-brand-2" />
          <p
            class="w-0 max-w-min shrink-0 overflow-hidden transition-all group-focus-within:block group-focus-within:w-full group-focus-within:text-brand-2"
          >
            {{ location.origin + '/' }}
          </p>
          <input
            class="shrink-1 -ml-2 w-full font-medium transition-[width] autofill:bg-clip-text focus:outline-none"
            type="text"
            placeholder="Your Name"
            id="name"
            v-model="formData.name"
          />
        </label>
        <label
          for="password"
          class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
        >
          <IconKey class="h-5 w-5 text-gray-400 group-focus-within:text-brand-2" />
          <input
            class="w-full font-medium autofill:bg-clip-text focus:outline-none"
            type="password"
            placeholder="Create Password"
            id="password"
            v-model="formData.password"
          />
        </label>
        <button
          class="flex w-full items-center justify-center gap-x-1 rounded-lg bg-brand-2 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          :disabled="loading"
        >
          <IconLockClosed class="-ml-5 w-5 h-5" />
          {{ loading ? 'Loading' : 'Sign Up' }}
        </button>
        <p class="text-gray-400">
          Already have an account?
          <router-link class="font-medium text-blue-400" :to="{ name: 'Login' }">Sign In</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBrowserLocation } from '@vueuse/core'
import IconAtSymbol from '~icons/heroicons-solid/at-symbol/'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import IconKey from '~icons/heroicons-solid/key/'
import IconLockClosed from '~icons/heroicons-solid/lock-closed/'
import IconGoogle from '~icons/logos/google-icon'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
  email: '',
  name: '',
  password: ''
})
const location = useBrowserLocation()

const loading = ref(false)
const register = async () => {
  try {
    loading.value = true
    const res = await authStore.register({
      email: formData.email,
      password: formData.password,
      name: formData.name
    })
    router.push({ name: 'Dashboard' })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
const loginWithGoogle = async () => {
  try {
    loading.value = true
    await authStore.loginWithGoogle()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.pattern {
  background-image: url('@/assets/pattern.svg');
}
</style>
