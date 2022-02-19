<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-hidden rounded-t-2xl bg-gray-100 py-4 px-6">
    <h2 class="text-xl font-bold text-gray-600">Edit</h2>
    <ul class="flex flex-col gap-y-4">
      <LinkItem v-for="link in links" v-model:title="link.title" v-model:url="link.url" :key="link.id" />
      <button class="w-full rounded-lg bg-brand-2 py-2 text-white" @click="addLink">Add new link</button>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTitle } from '@vueuse/core'
import LinkItem from './LinkItem.vue'

const title = useTitle('Links | BlazeLink')

const links = ref([
  { title: '', url: '', id: 1 },
  { title: '', url: '', id: 2 },
  { title: '', url: '', id: 3 },
  { title: '', url: '', id: 4 },
  { title: '', url: '', id: 5 }
])

const addLink = () => {
  const newLink = { title: '', url: '', id: new Date().getTime() }
  links.value.push(newLink)
}
</script>

<style scoped></style>
