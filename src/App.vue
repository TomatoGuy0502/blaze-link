<template>
  <div class="flex h-screen">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

<style></style>
