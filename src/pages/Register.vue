<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBrowserLocation } from '@vueuse/core'
import { useAuthStore } from '../store/auth'
import { isValidEmail } from '../utils'
import { preservedIds } from '../router'
import IconAtSymbol from '~icons/heroicons-solid/at-symbol/'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import IconKey from '~icons/heroicons-solid/key/'
import IconLockClosed from '~icons/heroicons-solid/lock-closed/'
import IconGoogle from '~icons/logos/google-icon'
import HeroiconsInformationCircle20Solid from '~icons/heroicons/information-circle-20-solid'

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
  email: '',
  name: '',
  password: '',
  emailError: '',
  nameError: '',
  passwordError: '',
})
const location = useBrowserLocation()

const loading = ref(false)
async function register() {
  try {
    loading.value = true
    formData.emailError = ''
    formData.nameError = ''
    formData.passwordError = ''
    if (!isValidEmail(formData.email))
      formData.emailError = 'Please enter a valid email address.'
    if (!formData.name)
      formData.nameError = 'Please enter your name.'
    if (formData.password.length < 6)
      formData.passwordError = 'Password must be at least 6 characters'
    if (formData.emailError || formData.nameError || formData.passwordError)
      return

    if (preservedIds.includes(formData.name)) {
      formData.nameError = 'This name is not available.'
      return
    }
    if (await authStore.isUserExists(formData.name)) {
      formData.nameError = 'This name is already taken.'
      return
    }
    await authStore.register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    })
    router.push({ name: 'Dashboard' })
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
async function loginWithGoogle() {
  try {
    loading.value = true
    await authStore.loginWithGoogle()
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="pattern flex h-dvh items-center justify-center p-4">
    <div class="flex w-[420px] flex-col gap-y-3 rounded-xl bg-white p-6 py-8 text-center text-gray-800 shadow-xl">
      <h1 class="text-3xl font-bold">
        Getting Started
      </h1>
      <p class="text-gray-400">
        Create an account to continue!
      </p>
      <button
        class="flex w-full items-center justify-center gap-x-2 rounded-lg bg-gray-100 p-2 font-medium text-gray-500 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        @click="loginWithGoogle()"
      >
        <IconGoogle />
        Sign Up with Google
      </button>
      <div class="relative flex h-6 items-center">
        <hr class="w-full">
        <p class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 bg-white px-2">
          or
        </p>
      </div>
      <form class="flex flex-col gap-4" @submit.prevent="register">
        <div>
          <label
            for="email"
            class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
          >
            <IconAtSymbol class="h-5 w-5 text-gray-400 group-focus-within:text-brand-2" />
            <input
              id="email"
              v-model="formData.email"
              class="w-full font-medium autofill:bg-clip-text focus:outline-none"
              type="text"
              placeholder="Your Email"
            >
          </label>
          <p v-if="formData.emailError" class="text-red-500 text-sm text-left mt-1">
            {{ formData.emailError }}
          </p>
        </div>
        <!-- TODO: Add tooltip to introduce the relation between username and user links -->
        <div class="text-left">
          <div class="inline-flex items-center gap-0.5 mb-0.5 text-green-500">
            <HeroiconsInformationCircle20Solid class="w-4 h-4" />
            <p class="text-sm text-left leading-none text-nowrap">
              This will be your share url
            </p>
          </div>
          <label
            for="name"
            class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
          >
            <IconEmojiHappy class="h-5 w-5 shrink-0 text-gray-400 group-focus-within:text-brand-2" />
            <!-- FIXME: When click on string, p element will flash -->
            <p
              class="w-0 max-w-min shrink-0 overflow-hidden text-nowrap transition-all group-focus-within:block group-focus-within:w-full group-focus-within:text-brand-2"
            >
              {{ `${location.origin}/` }}
            </p>
            <input
              id="name"
              v-model="formData.name"
              class="shrink-1 -ml-2 w-full font-medium transition-[width] autofill:bg-clip-text focus:outline-none"
              type="text"
              placeholder="User ID"
              autocomplete="off"
            >
          </label>
          <p v-if="formData.nameError" class="text-red-500 text-sm text-left mt-1">
            {{ formData.nameError }}
          </p>
        </div>
        <div>
          <label
            for="password"
            class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
          >
            <IconKey class="h-5 w-5 text-gray-400 group-focus-within:text-brand-2" />
            <input
              id="password"
              v-model="formData.password"
              class="w-full font-medium autofill:bg-clip-text focus:outline-none"
              type="password"
              placeholder="Password"
            >
          </label>
          <p v-if="formData.passwordError" class="text-red-500 text-sm text-left mt-1">
            {{ formData.passwordError }}
          </p>
        </div>
        <button
          class="flex w-full items-center justify-center gap-x-1 rounded-lg bg-brand-2 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          :disabled="loading"
        >
          <IconLockClosed class="-ml-5 w-5 h-5" />
          {{ loading ? 'Loading' : 'Sign Up' }}
        </button>
        <p class="text-gray-400">
          Already have an account?
          <router-link class="font-medium text-blue-400" :to="{ name: 'Login' }">
            Sign In
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
