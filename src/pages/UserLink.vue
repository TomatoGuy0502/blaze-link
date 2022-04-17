<template>
  <div class="h-screen w-full bg-brand-4" v-if="userExist">
    <div class="mx-auto max-w-3xl p-8">
      <IconMockAvatar class="mx-auto mb-6 h-16 w-16 rounded-full border-4 border-white" />
      <TransitionGroup tag="ul" name="fade" class="flex flex-col gap-y-4 text-center font-bold">
        <li v-for="link in links" :key="link.id">
          <a
            :href="link.url"
            class="block truncate rounded-md border-2 border-white p-2 text-white transition hover:bg-brand-3/60"
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
import { onMounted, ref } from 'vue'
import IconMockAvatar from '@/assets/mock-avatar.svg'
import { useLinksStore } from '../store/links'
import { useAuthStore } from '../store/auth'

const props = defineProps({
  userName: { type: String, required: true }
})

const { getLinksByName } = useLinksStore()
const { checkIfUserExists } = useAuthStore()

const links = ref<any>([])
const userExist = ref<boolean>(false)

userExist.value = await checkIfUserExists(props.userName)

onMounted(async () => {
  if (userExist.value) {
    links.value = await getLinksByName(props.userName)
  }
})
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
