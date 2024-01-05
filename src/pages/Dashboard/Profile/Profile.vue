<script setup lang="ts">
import { computed, ref } from 'vue'
import ProfileAvatar from './ProfileAvatar.vue'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import IconAtSymbol from '~icons/heroicons-solid/at-symbol/'
import { useAuthStore } from '@/store/auth'
import { useConfirmModal } from '@/composables/useConfirmModal'

const authStore = useAuthStore()
const { openModal } = useConfirmModal()

const userName = ref(authStore.userName ?? '')
const loading = ref(false)
const error = ref('')

const isChanged = computed(() => userName.value !== authStore.userName)

async function handleUpdateUsername() {
  loading.value = true
  error.value = ''
  openModal(
    async () => {
      try {
        await authStore.updateUsername(userName.value)
      }
      catch (err: any) {
        error.value = err.message
      }
      finally {
        loading.value = false
      }
    },
    {
      title: `將名稱改為: ${userName.value}`,
      description: `注意:這個動作會更改你的分享連結`,
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
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-auto rounded-t-2xl bg-gray-100 py-4 px-6 scrollbar-hide">
    <h2 class="text-xl font-bold text-gray-400">
      Profile
    </h2>
    <section>
      <h3 class="text-lg font-bold text-gray-400 mb-1">
        Avatar
      </h3>
      <ProfileAvatar size="12" />
    </section>
    <section>
      <h3 class="text-lg font-bold text-gray-400 mb-1">
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
          class="w-full font-medium autofill:bg-clip-text focus:outline-none bg-transparent text-gray-400"
          type="text"
          placeholder="Your Email"
        >
      </label>
    </section>
    <section>
      <h3 class="text-lg font-bold text-gray-400 mb-1">
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
            class="w-full font-medium autofill:bg-clip-text focus:outline-none bg-transparent"
            type="text"
            placeholder="User Name"
          >
        </label>
        <button
          class="block rounded-r-lg bg-brand-2 py-2 text-white transition disabled:bg-gray-300 p-2 px-4 cursor-pointer text-center"
          :disabled="!isChanged || loading"
          @click="handleUpdateUsername"
        >
          Update
        </button>
      </div>
      <p v-if="error" class="text-red-500 text-sm mt-1">
        {{ error }}
      </p>
    </section>
  </div>
</template>
