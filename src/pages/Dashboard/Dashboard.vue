<template>
  <div class="flex h-screen gap-x-4">
    <Sidebar />
    <div class="flex flex-1 flex-col gap-y-4 overflow-x-hidden">
      <Navbar />
      <div class="flex h-full gap-x-4 overflow-hidden">
        <router-view></router-view>
        <Preview />
      </div>
    </div>
  </div>
  <template>
    <ConfirmModal />
  </template>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Preview from '@/components/Preview.vue'

import ConfirmModal from '../../components/ConfirmModal.vue'
</script>

<style></style>
