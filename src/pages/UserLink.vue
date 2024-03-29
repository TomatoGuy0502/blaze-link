<script lang="ts" setup>
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'
import type { Tables } from '../../database.types'
import { useLinksStore } from '@/store/links'
import { getButtonClass, isValidUrl } from '@/utils'
import { backgroundColors } from '@/data'

import IconMockAvatar from '@/assets/mock-avatar.svg'
import { useSupabase } from '@/composables/useSupabase'

const props = defineProps({
  userName: { type: String, required: true },
})

useTitle(`${props.userName} | Blaze Link`)

const { supabase } = useSupabase()
const { getLinksAndThemeByName } = useLinksStore()

const links = ref<any>([])
const theme = ref<Tables<'theme'>>()
const userExists = ref<boolean>(false)
const buttonClass = ref<string[]>([])
const registerUrl = `${window.location.origin}/register`
const avatarSrc = ref<string>('')

async function downloadAvatar(avatarUrl: string) {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(avatarUrl)
    if (error)
      throw error
    return URL.createObjectURL(data)
  }
  catch (error) {
    if (error instanceof Error)
      console.error('Error downloading image: ', error.message)
    return ''
  }
}

const res = await getLinksAndThemeByName(props.userName)

if (res) {
  userExists.value = true
  links.value = res.links.filter(link => link.url && isValidUrl(link.url) && !!link.title?.length)
  theme.value = res.theme
  buttonClass.value = getButtonClass(
    theme.value.filled,
    theme.value.background_color!,
    theme.value.button_color!,
    theme.value.radius,
    theme.value.shadow,
  )
  if (res.avatar_url)
    avatarSrc.value = await downloadAvatar(res.avatar_url)
}
</script>

<template>
  <div v-if="userExists" class="flex h-dvh w-full flex-col overflow-auto pb-8" :class="backgroundColors[theme!.background_color!]">
    <div class="mx-auto w-full max-w-3xl">
      <div class="sticky top-0 pt-8 backdrop-blur-sm backdrop-filter">
        <img v-if="avatarSrc" :src="avatarSrc" alt="User avatar" class="mx-auto mb-2 h-20 w-20 rounded-full border-4 border-white">
        <IconMockAvatar v-else class="mx-auto mb-2 h-20 w-20 rounded-full border-4 border-white" />
        <p class="mb-6 text-center text-xl font-bold">
          @{{ props.userName }}
        </p>
      </div>
      <TransitionGroup tag="ul" name="fade" class="flex flex-col gap-y-4 px-8 pb-8 text-center font-bold">
        <li v-for="link in links" :key="link.id">
          <a
            :href="link.url"
            class="block truncate border-2 p-2 px-4 transition-all duration-300"
            :class="buttonClass"
            target="_blank"
          >{{ link.title }}</a>
        </li>
      </TransitionGroup>
    </div>
    <a :href="registerUrl" class="mx-auto mt-auto grid h-12 place-items-center rounded-full bg-white p-4 px-6 font-bold leading-none text-gray-800 shadow-md transition-all hover:shadow-sm">Create your Blaze Link</a>
  </div>
  <div v-else>
    User not exist
  </div>
</template>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(15px, 0);
}
</style>
