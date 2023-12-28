<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useLinksStore } from '../../../store/links'
import LinkItem from './LinkItem.vue'
import MockLinkItem from './MockLinkItem.vue'

useTitle('Links | BlazeLink')

const store = useLinksStore()
const { addLink } = store
const { links, isFirstTimeLoading } = storeToRefs(store)

const isLoading = ref(false)
async function handleAddLink() {
  isLoading.value = true
  await addLink()
  isLoading.value = false
}
</script>

<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-hidden rounded-tr-2xl xl:rounded-t-2xl bg-gray-100 py-4 px-6">
    <h2 class="text-xl font-bold text-gray-400">
      Edit
    </h2>
    <TransitionGroup
      tag="ul"
      name="fade"
      class="relative h-full space-y-4 overflow-hidden overflow-y-auto scrollbar-hide"
    >
      <button
        key="BUTTON"
        class="w-full rounded-lg bg-brand-2 py-2 text-white transition disabled:bg-gray-300"
        :disabled="isLoading || isFirstTimeLoading"
        @click="handleAddLink"
      >
        Add new link
      </button>
      <LinkItem v-for="link in links" :id="link.id" :key="link.id" v-model:title="link.title" v-model:url="link.url" />
      <p
        v-if="!isFirstTimeLoading && !links.length"
        key="HINT"
        class="w-full rounded-lg bg-white p-4 text-center text-gray-400"
      >
        這裡什麼都沒有，創建第一個連結吧！
      </p>
      <div v-if="isFirstTimeLoading" key="LOADING" class="w-full space-y-4">
        <MockLinkItem v-for="n in 3" :key="n" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
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

.fade-leave-active {
  position: absolute;
}
</style>
