<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { isValidEmail } from '@/utils'
import IconAtSymbol from '~icons/heroicons-solid/at-symbol/'
import IconKey from '~icons/heroicons-solid/key/'
import IconGoogle from '~icons/logos/google-icon'
import IconLockClosed from '~icons/heroicons-solid/lock-closed/'

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
})

const loading = ref(false)

async function login() {
  try {
    loading.value = true
    formData.emailError = ''
    formData.passwordError = ''
    if (!isValidEmail(formData.email))
      formData.emailError = '請輸入有效的電子郵件地址'
    if (formData.password.length < 6)
      formData.passwordError = '密碼長度至少為6個字元'
    if (formData.emailError || formData.passwordError)
      return

    await authStore.login({
      email: formData.email,
      password: formData.password,
    })
    router.push({
      name: 'Links',
      query: { email: formData.email },
    })
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
    <div class="flex w-[420px] flex-col gap-y-4 rounded-xl bg-white p-6 py-8 text-center text-gray-800 shadow-xl">
      <h1 class="text-3xl font-bold">
        登入
      </h1>
      <p class="text-gray-400">
        歡迎回來，登入後即可開始使用！
      </p>
      <button
        class="flex w-full items-center justify-center gap-x-2 rounded-lg bg-gray-100 p-2 font-medium text-gray-500 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        @click="loginWithGoogle()"
      >
        <IconGoogle />
        使用 Google 帳戶登入
      </button>
      <div class="relative flex h-6 items-center">
        <hr class="w-full">
        <p class="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 bg-white px-2">
          or
        </p>
      </div>
      <form class="flex flex-col gap-6" @submit.prevent="login">
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
              placeholder="電子郵件 Email"
            >
          </label>
          <p v-if="formData.emailError" class="mt-1 text-left text-sm text-red-500">
            {{ formData.emailError }}
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
              placeholder="密碼 Password"
            >
          </label>
          <p v-if="formData.passwordError" class="mt-1 text-left text-sm text-red-500">
            {{ formData.passwordError }}
          </p>
        </div>
        <button
          class="flex w-full items-center justify-center gap-x-1 rounded-lg bg-brand-2 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          :disabled="loading"
        >
          <IconLockClosed class="-ml-5 h-5 w-5" />
          {{ loading ? '登入中...' : '登入' }}
        </button>
        <p class="text-gray-400">
          還沒有帳戶嗎？
          <router-link class="font-medium text-blue-400" :to="{ name: 'Register' }">
            註冊
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
