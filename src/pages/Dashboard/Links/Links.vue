<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-hidden rounded-t-2xl bg-gray-100 py-4 px-6">
    <h2 class="text-xl font-bold text-gray-600">Edit</h2>
    <TransitionGroup tag="ul" name="fade" class="relative space-y-4 overflow-hidden">
      <LinkItem v-for="link in links" v-model:title="link.title" v-model:url="link.url" :key="link.id" :id="link.id" />
      <button class="w-full rounded-lg bg-brand-2 py-2 text-white" @click="addLink" key="BUTTON">Add new link</button>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core'
import LinkItem from './LinkItem.vue'
import { useLinksStore } from '../../../store/links'
import { storeToRefs } from 'pinia'

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
