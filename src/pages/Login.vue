<template>
  <div class="pattern flex h-screen items-center justify-center">
    <div class="flex w-[420px] flex-col gap-y-3 rounded-xl bg-white p-6 py-8 text-center shadow-xl">
      <h1 class="text-3xl font-bold text-gray-800">Getting Started</h1>
      <p class="text-gray-400">Create an account to continue!</p>
      <button
        class="flex w-full items-center justify-center gap-x-2 rounded-lg bg-gray-100 p-2 font-medium text-gray-400 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
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
            v-model="loginFormData.email"
          />
        </label>
        <label
          for="name"
          class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
        >
          <IconEmojiHappy class="h-5 w-5 text-gray-400 group-focus-within:text-brand-2" />
          <input
            class="w-full font-medium autofill:bg-clip-text focus:outline-none"
            type="text"
            placeholder="Your Name"
            id="name"
            v-model="loginFormData.name"
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
            v-model="loginFormData.password"
          />
        </label>
        <button class="flex w-full items-center justify-center gap-x-1 rounded-lg bg-brand-2 py-2 text-white">
          <IconLockClosed />
          Sign Up
        </button>
        <p class="text-gray-400">Already have an account? <a href="#" class="font-medium text-blue-400">Sign in</a></p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import IconAtSymbol from '~icons/heroicons-solid/at-symbol/'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import IconKey from '~icons/heroicons-solid/key/'
import IconLockClosed from '~icons/heroicons-solid/lock-closed/'
import IconGoogle from '~icons/logos/google-icon'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

const loginFormData = reactive({
  email: '',
  name: '',
  password: '',
})

const register = async () => {
  console.log('register', loginFormData)
  const res = await supabase.auth.signUp({
    email: loginFormData.email,
    password: loginFormData.password
  }, {
    data: {
      name: loginFormData.name,
      email: loginFormData.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  })
  console.log(res)
}

const user = supabase.auth.user()
console.log(user)
</script>

<style scoped>
.pattern {
  background-image: url('@/assets/pattern.svg');
}
</style>
