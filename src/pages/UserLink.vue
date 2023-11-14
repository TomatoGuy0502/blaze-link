<template>
  <div class="h-screen w-full" :class="backgroundColors[theme.background_color]" v-if="userExists">
    <div class="mx-auto max-w-3xl p-8">
      <IconMockAvatar class="mx-auto mb-6 h-16 w-16 rounded-full border-4 border-white" />
      <TransitionGroup tag="ul" name="fade" class="flex flex-col gap-y-4 text-center font-bold">
        <li v-for="link in links" :key="link.id">
          <a
            :href="link.url"
            class="block truncate border-2 p-2 px-4 transition-all duration-300"
            :class="buttonClass"
            target="_blank"
            >{{ link.title }}</a
          >
        </li>
      </TransitionGroup>
    </div>
  </div>
  <div v-else>User not exist</div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'
import IconMockAvatar from '@/assets/mock-avatar.svg'
import { useLinksStore } from '../store/links'
import { Theme } from '../composables/useAppearance'
import { getButtonClass } from '../utils'
import { backgroundColors } from '../data'

const props = defineProps({
  userName: { type: String, required: true }
})

const { getLinksAndThemeByName } = useLinksStore()

const links = ref<any>([])
const theme = ref() as Ref<Theme>
const userExists = ref<boolean>(false)

const res = await getLinksAndThemeByName(props.userName)
console.log(res)
if (res) {
  userExists.value = true
  links.value = res.links
  theme.value = res.theme
}

const buttonClass = getButtonClass(
  theme.value.filled,
  theme.value.background_color,
  theme.value.button_color,
  theme.value.radius,
  theme.value.shadow
)
</script>

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
