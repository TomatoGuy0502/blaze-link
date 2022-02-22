<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-hidden rounded-t-2xl bg-gray-100 py-4 px-6">
    <h2 class="text-xl font-bold text-gray-600">Edit</h2>
    <ul class="flex flex-col gap-y-4">
      <LinkItem v-for="link in links" v-model:title="link.title" v-model:url="link.url" :key="link.id" :id="link.id" />
      <button class="w-full rounded-lg bg-brand-2 py-2 text-white" @click="addLink">Add new link</button>
    </ul>
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

<style scoped></style>
