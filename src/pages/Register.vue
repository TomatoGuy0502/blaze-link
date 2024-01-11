<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBrowserLocation } from '@vueuse/core'
import { useAuthStore } from '../store/auth'
import { isValidEmail as isValidEmailUtil } from '../utils'
import { preservedIds } from '../router'
import IconAtSymbol from '~icons/heroicons-solid/at-symbol/'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import IconKey from '~icons/heroicons-solid/key/'
import IconLockClosed from '~icons/heroicons-solid/lock-closed/'
import IconGoogle from '~icons/logos/google-icon'
import HeroiconsInformationCircle20Solid from '~icons/heroicons/information-circle-20-solid'
import UsernameCheckList from '@/components/UsernameCheckList.vue'
import { useUsername } from '@/composables/useUsername'
import CheckListItem from '@/components/CheckListItem.vue'

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

const isValidEmail = computed(() => isValidEmailUtil(formData.email))
const { isValidLength, isValidCharacters, isValidStartEnd } = useUsername(() => formData.name)
const isValidPassword = computed(() => formData.password.length >= 6)

// Disable register button when:
const isRegistrable = computed(() => {
  if (!formData.email || !isValidPassword.value)
    return false
  if (!isValidLength.value || !isValidCharacters.value || !isValidStartEnd.value)
    return false
  return true
})

async function register() {
  if (loading.value)
    return
  try {
    loading.value = true
    formData.emailError = ''
    formData.nameError = ''
    formData.passwordError = ''
    if (!isValidLength.value || !isValidCharacters.value || !isValidStartEnd.value) {
      formData.nameError = '未滿足使用者名稱規則'
      return
    }
    if (!isValidEmail.value)
      formData.emailError = '請輸入有效的電子郵件地址'
    if (!isValidPassword.value)
      formData.passwordError = '密碼長度至少為6個字元'
    if (preservedIds.includes(formData.name.toLowerCase()))
      formData.nameError = '此名稱不可使用(保留字)'
    if (formData.emailError || formData.nameError || formData.passwordError)
      return

    if (await authStore.isUserExists(formData.name)) {
      formData.nameError = '此名稱已被其他用戶使用'
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
        讓我們開始吧
      </h1>
      <p class="text-gray-400">
        創建一個帳戶以繼續！
      </p>
      <button
        class="flex w-full items-center justify-center gap-x-2 rounded-lg bg-gray-100 p-2 font-medium text-gray-500 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        @click="loginWithGoogle()"
      >
        <IconGoogle />
        使用 Google 帳戶註冊
      </button>
      <div class="relative flex h-6 items-center">
        <hr class="w-full">
        <p class="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 bg-white px-2">
          or
        </p>
      </div>
      <form class="flex flex-col gap-4" @submit.prevent="register">
        <div>
          <label
            for="email"
            class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
            :class="formData.emailError ? 'border-red-500 ring-red-500 ring-2' : ''"
          >
            <IconAtSymbol class="h-5 w-5 text-gray-400 group-focus-within:text-brand-2" />
            <input
              id="email"
              v-model="formData.email"
              class="w-full font-medium autofill:bg-clip-text focus:outline-none"
              type="email"
              placeholder="電子郵件 Email"
            >
          </label>
          <p v-if="formData.emailError" class="mt-1 text-left text-sm text-red-500">
            {{ formData.emailError }}
          </p>
        </div>
        <div class="flex flex-col gap-0.5 text-left">
          <label
            for="name"
            class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
            :class="formData.nameError ? 'border-red-500 ring-red-500 ring-2' : ''"
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
              placeholder="使用者名稱 Username"
              autocomplete="off"
            >
          </label>
          <p v-if="formData.nameError" class="text-left text-sm text-red-500">
            {{ formData.nameError }}
          </p>
          <p class="flex items-center gap-1 pl-2 text-sm font-bold text-brand-2">
            <HeroiconsInformationCircle20Solid v-if="true" class="h-4 w-4 text-brand-2" />
            這將會是你的分享連結的網址
          </p>
          <UsernameCheckList :username="formData.name" />
        </div>
        <div class="flex flex-col gap-0.5">
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
          <CheckListItem :check-condition="isValidPassword" class="pl-2">
            長度必須大於等於 6 個字元
          </CheckListItem>
        </div>
        <button
          class="flex w-full items-center justify-center gap-x-1 rounded-lg bg-brand-2 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          :disabled="!isRegistrable || loading"
        >
          <IconLockClosed class="-ml-5 h-5 w-5" />
          {{ loading ? '註冊中...' : '註冊' }}
        </button>
        <p class="text-gray-400">
          已經有帳戶了嗎？
          <router-link class="font-medium text-blue-400" :to="{ name: 'Login' }">
            登入
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
