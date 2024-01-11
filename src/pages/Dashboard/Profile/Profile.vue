<script setup lang="ts">
import { computed, ref } from 'vue'
import ProfileAvatar from './ProfileAvatar.vue'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import IconAtSymbol from '~icons/heroicons-solid/at-symbol/'
import { useAuthStore } from '@/store/auth'
import { useConfirmModal } from '@/composables/useConfirmModal'
import UsernameCheckList from '@/components/UsernameCheckList.vue'
import { useUsername } from '@/composables/useUsername'

const authStore = useAuthStore()
const { openModal } = useConfirmModal()

const userName = ref(authStore.userName ?? '')
const loading = ref(false)
const error = ref('')

const { isValidLength, isValidCharacters, isValidStartEnd } = useUsername(userName)
const isChanged = computed(() => userName.value !== authStore.userName)
const isChangeable = computed(() => isChanged.value && isValidLength.value && isValidCharacters.value && isValidStartEnd.value && !loading.value)

async function handleUpdateUsername() {
  if (!isChangeable.value || loading.value)
    return
  loading.value = true
  error.value = ''
  openModal(
    async () => {
      try {
        await authStore.updateUsername(userName.value)
      }
      catch (err) {
        if (err instanceof Error)
          error.value = err.message
      }
      finally {
        loading.value = false
      }
    },
    {
      title: `將名稱改為: ${userName.value}`,
      description: `注意:這個動作會更改你的分享連結與QRCode`,
      confirm: '更改',
      cancel: '取消',
    },
    () => {
      loading.value = false
    },
  )
}
</script>

<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-auto rounded-t-2xl bg-gray-100 px-6 py-4 scrollbar-hide">
    <h2 class="text-xl font-bold text-gray-400">
      Profile
    </h2>
    <section>
      <h3 class="mb-1 text-lg font-bold text-gray-400">
        Avatar
      </h3>
      <ProfileAvatar size="12" />
    </section>
    <section>
      <h3 class="mb-1 text-lg font-bold text-gray-400">
        Email
      </h3>
      <label
        for="email"
        class="group flex w-full items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-brand-2"
      >
        <IconAtSymbol class="h-5 w-5 text-gray-400 group-focus-within:text-brand-2" />
        <input
          id="email"
          disabled
          :value="authStore.user?.email"
          class="w-full bg-transparent font-medium text-gray-400 autofill:bg-clip-text focus:outline-none"
          type="text"
          placeholder="Your Email"
        >
      </label>
    </section>
    <section class="flex flex-col gap-1">
      <h3 class="text-lg font-bold text-gray-400">
        User Name
      </h3>
      <div class="flex">
        <label
          for="userName"
          class="group flex w-full items-center gap-2 rounded-l-lg border border-gray-200 p-2 focus-within:border-brand-2"
        >
          <IconEmojiHappy class="h-5 w-5 text-gray-400 group-focus-within:text-brand-2" />
          <input
            id="userName"
            v-model="userName"
            class="w-full bg-transparent font-medium text-gray-800 autofill:bg-clip-text focus:outline-none"
            type="text"
            placeholder="User Name"
          >
        </label>
        <button
          class="block cursor-pointer rounded-r-lg bg-brand-2 p-2 px-4 text-center text-white transition disabled:cursor-not-allowed disabled:bg-gray-300"
          :disabled="!isChangeable"
          @click="handleUpdateUsername"
        >
          Update
        </button>
      </div>
      <p v-if="error" class="mt-1 text-sm text-red-500">
        {{ error }}
      </p>
      <UsernameCheckList :username="userName" />
    </section>
  </div>
</template>
