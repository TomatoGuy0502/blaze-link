<script setup lang="ts">
import ProfileAvatar from './ProfileAvatar.vue'
</script>

<template>
  <div class="flex h-full flex-auto flex-col gap-y-4 overflow-auto rounded-t-2xl bg-gray-100 py-4 px-6 scrollbar-hide">
    <h2 class="text-xl font-bold text-gray-400">
      Profile
    </h2>
    <ProfileAvatar size="12" />
  </div>
</template>
