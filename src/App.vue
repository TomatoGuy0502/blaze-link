<template>
  <div class="flex h-screen gap-x-4">
    <Sidebar />
    <div class="flex flex-1 flex-col gap-y-4">
      <Navbar />
      <div class="flex h-full gap-x-4">
        <router-view class="h-full flex-1"> </router-view>
        <Preview />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Preview from '@/components/Preview.vue'
</script>

<style></style>
