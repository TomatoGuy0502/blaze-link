<script setup lang="ts">
import { defineProps, ref, toRefs, watch, withDefaults } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useSupabase } from '@/composables/useSupabase'
import TablerUpload from '~icons/tabler/upload'

export interface Props {
  size: string
}

const prop = withDefaults(defineProps<Props>(), {
  size: '12',
})

const { size } = toRefs(prop)

const { supabase } = useSupabase()
const authStore = useAuthStore()

const uploading = ref(false)
const files = ref<FileList | null>(null)

async function uploadAvatar(evt: Event) {
  files.value = (evt.target as HTMLInputElement).files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0)
      throw new Error('You must select an image to upload.')

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError)
      throw uploadError
    authStore.profile!.avatar_url = filePath
    authStore.updateAvatar(filePath)
  }
  catch (error: any) {
    console.error('Error downloading image: ', error.message)
  }
  finally {
    uploading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <img
      v-if="authStore.avatarSrc"
      :src="authStore.avatarSrc"
      alt="User avatar"
      :style="{ height: `${size}em`, width: `${size}em` }"
    >
    <div v-else :style="{ height: `${size}em`, width: `${size}em` }" />

    <div :style="{ width: `${size}em` }">
      <label class="block rounded-lg bg-brand-2 py-2 text-white transition disabled:bg-gray-300 p-2 px-4 cursor-pointer text-center" for="single">
        <span v-if="uploading">Uploading...</span>
        <span v-else class="flex justify-center items-center gap-1"><TablerUpload class="w-5 h-5" />Upload</span>
      </label>
      <input
        id="single"
        class="hidden"
        type="file"
        accept="image/*"
        :disabled="uploading"
        @change="uploadAvatar"
      >
    </div>
  </div>
</template>
