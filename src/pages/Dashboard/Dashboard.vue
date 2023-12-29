<script setup lang="ts">
import { onMounted } from 'vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { useLinksStore } from '../../store/links'
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar/Navbar.vue'
import Preview from '@/components/Preview.vue'

const store = useLinksStore()
const { getLinks } = store

onMounted(async () => {
  await getLinks()
})
</script>

<template>
  <div class="flex h-dvh gap-x-4">
    <Sidebar />
    <div class="flex flex-1 flex-col gap-y-4 overflow-x-hidden">
      <Navbar />
      <div class="flex h-full gap-x-4 overflow-hidden">
        <router-view />
        <Preview />
      </div>
    </div>
    <ConfirmModal />
  </div>
</template>

<style></style>
