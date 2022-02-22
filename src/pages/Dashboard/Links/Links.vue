<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-hidden rounded-t-2xl bg-gray-100 py-4 px-6">
    <h2 class="text-xl font-bold text-gray-600">Edit</h2>
    <TransitionGroup
      tag="ul"
      name="fade"
      class="relative h-full space-y-4 overflow-hidden overflow-y-auto scrollbar-hide"
    >
      <button class="w-full rounded-lg bg-brand-2 py-2 text-white" @click="addLink" key="BUTTON">Add new link</button>
      <LinkItem v-for="link in links" v-model:title="link.title" v-model:url="link.url" :key="link.id" :id="link.id" />
      <p class="text-center w-full p-4 bg-white rounded-lg text-gray-400" v-if="!links.length" key="HINT">這裡什麼都沒有，創建第一個連結吧！</p>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useLinksStore } from '../../../store/links'
import LinkItem from './LinkItem.vue'

const title = useTitle('Links | BlazeLink')

const store = useLinksStore()
const { addLink } = store
const { links } = storeToRefs(store)
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
