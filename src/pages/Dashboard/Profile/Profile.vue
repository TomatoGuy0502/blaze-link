<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ProfileAvatar from './ProfileAvatar.vue'
import IconEmojiHappy from '~icons/heroicons-solid/emoji-happy/'
import IconAtSymbol from '~icons/heroicons-solid/at-symbol/'
import { useAuthStore } from '@/store/auth'
import { useConfirmModal } from '@/composables/useConfirmModal'
import TablerCircleDashed from '~icons/tabler/circle-dashed'
import TablerCircleCheck from '~icons/tabler/circle-check'

const authStore = useAuthStore()
const { openModal } = useConfirmModal()

const userName = ref(authStore.userName ?? '')
const loading = ref(false)
const error = ref('')

const isValidLength = computed(() => userName.value.length >= 3 && userName.value.length <= 20)
const isValidCharacters = computed(() => /^[a-zA-Z0-9_.-]+$/.test(userName.value))
const isValidStartEnd = computed(() => /^[a-zA-Z0-9_].*[a-zA-Z0-9_]$/.test(userName.value))
const isChanged = computed(() => userName.value !== authStore.userName)

const isChangeable = computed(() => isChanged.value && isValidLength.value && isValidCharacters.value && isValidStartEnd.value && !loading.value)

async function handleUpdateUsername() {
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
            class="w-full font-medium autofill:bg-clip-text focus:outline-none bg-transparent text-gray-800"
            type="text"
            placeholder="User Name"
          >
        </label>
        <button
          class="block rounded-r-lg bg-brand-2 py-2 text-white transition disabled:bg-gray-300 disabled:cursor-not-allowed p-2 px-4 cursor-pointer text-center"
          :disabled="!isChangeable"
          @click="handleUpdateUsername"
        >
          Update
        </button>
      </div>
      <p v-if="error" class="text-red-500 text-sm mt-1">
        {{ error }}
      </p>
      <ul class="flex flex-col gap-0.5 pl-2">
        <li class="flex items-center gap-1 text-gray-600 text-sm">
          <Transition name="fade" mode="out-in">
            <TablerCircleCheck v-if="isValidLength" class="w-4 h-4 text-brand-2" />
            <TablerCircleDashed v-else class="w-4 h-4" />
          </Transition>
          長度必須在 3 ~ 20 之間
        </li>
        <li class="flex items-center gap-1 text-gray-600 text-sm">
          <Transition name="fade" mode="out-in">
            <TablerCircleCheck v-if="isValidCharacters" class="w-4 h-4 text-brand-2" />
            <TablerCircleDashed v-else class="w-4 h-4" />
          </Transition>
          只能包含英文、數字、底線(_)、點(.)、減號(-)
        </li>
        <li class="flex items-center gap-1 text-gray-600 text-sm">
          <Transition name="fade" mode="out-in">
            <TablerCircleCheck v-if="isValidStartEnd" class="w-4 h-4 text-brand-2" />
            <TablerCircleDashed v-else class="w-4 h-4" />
          </Transition>
          開頭與結尾必須是英文、數字或底線(_)
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease-in;
}

.fade-enter-from {
  opacity: .2;
  transform: rotate(-60deg);
}
.fade-leave-to {
  opacity: .2;
  transform: rotate(60deg);
}
</style>
