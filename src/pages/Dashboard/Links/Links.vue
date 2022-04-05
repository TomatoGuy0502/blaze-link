<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-hidden rounded-t-2xl bg-gray-100 py-4 px-6">
    <h2 class="text-xl font-bold text-gray-600">Edit</h2>
    <TransitionGroup
      tag="ul"
      name="fade"
      class="relative h-full space-y-4 overflow-hidden overflow-y-auto scrollbar-hide"
    >
      <button
        class="w-full rounded-lg bg-brand-2 py-2 text-white transition disabled:bg-gray-300"
        @click="handleAddLink"
        key="BUTTON"
        :disabled="isLoading || isLinksLoading"
      >
        Add new link
      </button>
      <LinkItem v-for="link in links" v-model:title="link.title" v-model:url="link.url" :key="link.id" :id="link.id" />
      <p
        class="w-full rounded-lg bg-white p-4 text-center text-gray-400"
        v-if="!isLinksLoading && !links.length"
        key="HINT"
      >
        這裡什麼都沒有，創建第一個連結吧！
      </p>
      <div class="w-full space-y-4" v-if="isLinksLoading" key="LOADING">
        <MockLinkItem v-for="n in 3" />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useLinksStore } from '../../../store/links'
import LinkItem from './LinkItem.vue'
import MockLinkItem from './MockLinkItem.vue'

const title = useTitle('Links | BlazeLink')

const store = useLinksStore()
const { addLink, getLinks } = store
const { links } = storeToRefs(store)

const isLinksLoading = ref(true)
onMounted(async () => {
  await getLinks(isLinksLoading)
})

const isLoading = ref(false)
const handleAddLink = async () => {
  isLoading.value = true
  await addLink()
  isLoading.value = false
}
</script>

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
